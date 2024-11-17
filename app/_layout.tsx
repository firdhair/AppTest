import React, { useEffect } from 'react';
import { Slot, useRouter } from 'expo-router';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <InitialRouteHandler>
        <Slot />
      </InitialRouteHandler>
    </Provider>
  );
}

const InitialRouteHandler: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const token = useSelector((state: RootState) => state.auth.token);

  useEffect(() => {
    if (token) {
      router.replace('/(tabs)'); 
    } else {
      router.replace('/auth/login');
    }
  }, [token]);

  return <>{children}</>;
};
