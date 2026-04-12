import { createContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth, db } from "../auth/Firebase";
import { doc, getDoc } from "firebase/firestore";

interface AuthContextType {
  user: User | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  userData: any;
  loading: boolean;
}

 export const AuthContext = createContext<AuthContextType>({
  user: null,
  userData: null,
  loading: true,
});

/**
 * Provides context for authentication state.
 * Includes user, userData, and loading states.
 * Uses Firebase's onAuthStateChanged hook to update the user state.
 * Loads userData from Firestore if a user is logged in.
 * @param {ReactNode} children - The children components to render.
 * @returns {React.ReactNode} - The AuthContext.Provider component.
 */
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<unknown>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const snap = await getDoc(docRef);

        if (snap.exists()) setUserData(snap.data());
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <AuthContext.Provider value={{ user, userData, loading }}>
      {children}
    </AuthContext.Provider>
  );
};


