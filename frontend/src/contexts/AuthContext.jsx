import { createContext, useContext, useState, useEffect } from 'react';
// import { getCurrentUser, signOut as amplifySignOut } from "aws-amplify/auth"; // You can comment this out for now

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // HARDCODED USER for UI testing
  const [user, setUser] = useState({
    username: "testuser",
    attributes: {
      email: "testuser@example.com"
    }
  });

  // Comment out the useEffect and sign out logic for now
  /*
  useEffect(() => {
    const checkCurrentUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        setUser(null);
      }
    };
    checkCurrentUser();
  }, []);

  const handleSignOut = async () => {
    try {
      await amplifySignOut();
      setUser(null);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };
  */

  // Simple sign out to clear the user
  const handleSignOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signOut: handleSignOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
