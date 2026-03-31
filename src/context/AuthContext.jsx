import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { ensureUserProfile, getAdminEmail, getDefaultRoleForEmail } from '../lib/userProfile';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userProfile, setUserProfile] = useState(null);
    const [loading, setLoading] = useState(isFirebaseConfigured);

    useEffect(() => {
        if (!isFirebaseConfigured || !auth || !db) {
            setLoading(false);
            return undefined;
        }

        let isMounted = true;
        let unsubscribe;

        try {
            unsubscribe = onAuthStateChanged(auth, async (user) => {
                if (!isMounted) return;

                if (user) {
                    setCurrentUser(user);
                    try {
                        await ensureUserProfile(user);
                        const userDoc = await getDoc(doc(db, 'users', user.uid));
                        const fallbackRole = getDefaultRoleForEmail(user.email);
                        const profile = userDoc.exists()
                            ? { ...userDoc.data(), role: userDoc.data().role || fallbackRole }
                            : { role: fallbackRole };

                        const emailIsAdmin = user.email?.trim().toLowerCase() === getAdminEmail();
                        const resolvedIsAdmin = emailIsAdmin || profile.role === 'admin';

                        setUserProfile({
                            ...profile,
                            role: resolvedIsAdmin ? 'admin' : 'user',
                        });
                        setIsAdmin(resolvedIsAdmin);
                    } catch (error) {
                        console.error('Error fetching user role: ', error);
                        const emailIsAdmin = user.email?.trim().toLowerCase() === getAdminEmail();
                        setUserProfile({ role: emailIsAdmin ? 'admin' : 'user' });
                        setIsAdmin(emailIsAdmin);
                    }
                } else {
                    setCurrentUser(null);
                    setUserProfile(null);
                    setIsAdmin(false);
                }
                setLoading(false);
            });
        } catch (error) {
            console.error('Firebase Auth Initialization Error:', error);
            setLoading(false);
        }

        return () => {
            isMounted = false;
            if (unsubscribe) unsubscribe();
        };
    }, []);

    const value = {
        currentUser,
        isAdmin,
        userProfile,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
