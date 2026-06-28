import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { loginApi, type LoginRequest } from '../features/auth/api/authApi';

export interface UserData {
  username: string;
  isLoggedIn: boolean;
  authStatus: 'idle' | 'pending' | 'authenticated' | 'failed';
  loginError: string;
}

interface UserContextType {
  userData: UserData;
  loginUser: (credentials: LoginRequest) => Promise<void>;
  logoutUser: () => void;
  clearLoginError: () => void;
  formatUsername: (shouldCapitalize: boolean) => string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    username: '',
    isLoggedIn: false,
    authStatus: 'idle',
    loginError: '',
  });

  const loginUser = useCallback(async (credentials: LoginRequest) => {
    setUserData((prev) => ({
      ...prev,
      authStatus: 'pending',
      loginError: '',
    }));

    try {
      const response = await loginApi(credentials);
      setUserData((prev) => ({
        ...prev,
        authStatus: 'authenticated',
        isLoggedIn: true,
        username: response.username,
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed.';
      setUserData((prev) => ({
        ...prev,
        authStatus: 'failed',
        isLoggedIn: false,
        loginError: message,
      }));
      throw error;
    }
  }, []);

  const logoutUser = useCallback(() => {
    setUserData({
      username: '',
      isLoggedIn: false,
      authStatus: 'idle',
      loginError: '',
    });
  }, []);

  const clearLoginError = useCallback(() => {
    setUserData((prev) => ({
      ...prev,
      loginError: '',
    }));
  }, []);

  const formatUsername = useCallback((shouldCapitalize: boolean) => {
    return shouldCapitalize ? userData.username.toUpperCase() : userData.username.toLowerCase();
  }, [userData.username]);

  const value: UserContextType = {
    userData,
    loginUser,
    logoutUser,
    clearLoginError,
    formatUsername,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
