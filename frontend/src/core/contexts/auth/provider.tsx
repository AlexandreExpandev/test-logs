import { useState, useMemo } from 'react';
import { AuthContext } from './context';
import { AuthProviderProps, User } from './types';

export const AuthProvider = ({ children }: AuthProviderProps) => {
  // SIMULATE a logged-in admin user for demonstration
  const [user, setUser] = useState<User | null>({
    id: 'admin-user',
    name: 'Admin',
    email: 'admin@guessnumber.com',
  });
  const [isLoading, setIsLoading] = useState(false);

  // In a real app, you would have an effect here to check for an existing session
  // useEffect(() => { ... check session ...; setIsLoading(false); }, []);

  const login = (userData: User) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      isLoading,
      login,
      logout,
    }),
    [user, isLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
