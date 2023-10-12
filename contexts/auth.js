import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
   const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

   useEffect(() => {
      // You can implement a more robust user authentication check here,
      // e.g., checking a token or other authentication data.
      // For simplicity, we'll just set it to true.
      // setIsUserAuthenticated(false);
   }, []);

   return (
      <AuthContext.Provider value={{ isUserAuthenticated, setIsUserAuthenticated }}>
         {children}
      </AuthContext.Provider>
   );
}

export function useAuth() {
   return useContext(AuthContext);
}