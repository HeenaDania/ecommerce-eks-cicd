import { createContext, useContext, useState, useEffect } from 'react';
import { signIn, getCurrentUser, signOut as amplifySignOut } from "aws-amplify/auth";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Check for current user on initial load
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        // User is not signed in
        setUser(null);
      }
    };
    checkCurrentUser();
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      await signIn({ username: email, password });
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const handleSignOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signIn: handleSignIn, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
