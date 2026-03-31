import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db } from '../firebase/config';

const normalizeEmail = (email) => email?.trim().toLowerCase() ?? '';

export const getAdminEmail = () =>
    normalizeEmail(import.meta.env.VITE_ADMIN_EMAIL || 'sales.yatrago@gmail.com');

export const getDefaultRoleForEmail = (email) =>
    normalizeEmail(email) === getAdminEmail() ? 'admin' : 'user';

export const ensureUserProfile = async (user, extraData = {}) => {
    if (!db || !user) return null;

    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
        const role = getDefaultRoleForEmail(user.email);

        const payload = {
            name: extraData.name || user.displayName || user.email?.split('@')[0] || 'Traveler',
            email: user.email || '',
            phone: extraData.phone || '',
            role,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        await setDoc(userRef, payload);
        return payload;
    }

    const existingData = userSnap.data();
    const updates = {
        updatedAt: serverTimestamp(),
    };

    if (!existingData.email && user.email) {
        updates.email = user.email;
    }

    if (!existingData.name && (extraData.name || user.displayName)) {
        updates.name = extraData.name || user.displayName;
    }

    if (Object.keys(updates).length > 1) {
        await setDoc(userRef, updates, { merge: true });
    }

    return existingData;
};
