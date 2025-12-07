

import 'react-native-reanimated';

import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider } from 'react-native-paper';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { FCMTokenHandler } from '@/hooks/FCMTokenHandler';
import { persistor, store } from '@/store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();


  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FCMTokenHandler>

          <GestureHandlerRootView style={{ flex: 1 }}>
            <PaperProvider>
              <BottomSheetModalProvider>
                <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                  <Stack>
                    <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                    <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
                    <Stack.Screen name="Register" options={{ title: 'Register' }} />
                    <Stack.Screen name="Login" options={{ title: 'Login' }} />
                    <Stack.Screen name="updateUser" options={{ title: 'updateUser' }} />
                    <Stack.Screen name="add" options={{ title: 'إضافة عقار' }} />
                    <Stack.Screen
                      name="contact-owner/[propertyId]"
                      options={{ title: 'اتصل بالمالك' }}
                    />
                    <Stack.Screen
                      name="users/list"
                      options={{ title: 'users ' }}
                    />
                    <Stack.Screen name="notifications" options={{ title: 'notifications' }} />
                    <Stack.Screen name="notification/list" options={{ title: 'list' }} />
                  </Stack>
                  <StatusBar style="auto" />
                </ThemeProvider>
              </BottomSheetModalProvider>
            </PaperProvider>
          </GestureHandlerRootView>
        </FCMTokenHandler>

      </PersistGate>
    </Provider>
  );
}
