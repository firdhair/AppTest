// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import * as SplashScreen from 'expo-splash-screen';
// import { StatusBar } from 'expo-status-bar';
// import { useEffect } from 'react';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// // Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   useEffect(() => {
//     if (loaded) {
//       SplashScreen.hideAsync();
//     }
//   }, [loaded]);

//   if (!loaded) {
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

// import { Slot } from 'expo-router';
// import { Provider } from 'react-redux';
// import { store } from '../store';

// export default function Layout() {
//   return (
//     <Provider store={store}>
//       <Slot />
//     </Provider>
//   );
// }

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
    // Redirect logic based on authentication status
    if (token) {
      router.replace('/(tabs)'); // Redirect to Home if logged in
    } else {
      router.replace('/auth/login'); // Redirect to Login if not logged in
    }
  }, [token]);

  return <>{children}</>;
};
