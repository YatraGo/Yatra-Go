import React, { createContext, useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db, isFirebaseConfigured } from '../firebase/config';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
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
        let unsubscribeAuth;
        let unsubscribeProfile;

        try {
            unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
                if (!isMounted) return;

                if (user) {
                    setCurrentUser(user);
                    
                    // Cleanup previous profile listener if any
                    if (unsubscribeProfile) unsubscribeProfile();

                    // Real-time listener for user profile
                    unsubscribeProfile = onSnapshot(doc(db, 'users', user.uid), (docSnap) => {
                        if (!isMounted) return;
                        
                        const fallbackRole = getDefaultRoleForEmail(user.email);
                        const profileData = docSnap.exists() ? docSnap.data() : {};
                        const role = profileData.role || fallbackRole;
                        
                        const emailIsAdmin = user.email?.trim().toLowerCase() === getAdminEmail();
                        const resolvedIsAdmin = emailIsAdmin || role === 'admin';

                        setUserProfile({
                            ...profileData,
                            role: resolvedIsAdmin ? 'admin' : 'user',
                        });
                        setIsAdmin(resolvedIsAdmin);
                        setLoading(false);
                    }, (error) => {
                        console.error('Profile listener error:', error);
                        setLoading(false);
                    });
                } else {
                    if (unsubscribeProfile) unsubscribeProfile();
                    setCurrentUser(null);
                    setUserProfile(null);
                    setIsAdmin(false);
                    setLoading(false);
                }
            });
        } catch (error) {
            console.error('Firebase Auth Initialization Error:', error);
            setLoading(false);
        }

        return () => {
            isMounted = false;
            if (unsubscribeAuth) unsubscribeAuth();
            if (unsubscribeProfile) unsubscribeProfile();
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
