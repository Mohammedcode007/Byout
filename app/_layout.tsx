

// import 'react-native-reanimated';

// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import { Provider as PaperProvider } from 'react-native-paper';

// import { useColorScheme } from '@/hooks/use-color-scheme';
// import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
// import { GestureHandlerRootView } from 'react-native-gesture-handler';

// import { FCMTokenHandler } from '@/hooks/FCMTokenHandler';
// import { persistor, store } from '@/store/store';
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// export const unstable_settings = {
//   anchor: '(tabs)',
// };

// export default function RootLayout() {
//   const colorScheme = useColorScheme();


//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         <FCMTokenHandler>

//           <GestureHandlerRootView style={{ flex: 1 }}>
//             <PaperProvider>
//               <BottomSheetModalProvider>
//                 <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//                   <Stack>
//                     <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//                     <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
//                     <Stack.Screen name="Register" options={{ title: 'Register' }} />
//                     <Stack.Screen name="Login" options={{ title: 'Login' }} />
//                     <Stack.Screen name="updateUser" options={{ title: 'updateUser' }} />
//                     <Stack.Screen name="add" options={{ title: 'إضافة عقار' }} />
//                     <Stack.Screen
//                       name="contact-owner/[propertyId]"
//                       options={{ title: 'اتصل بالمالك' }}
//                     />
//                     <Stack.Screen
//                       name="users/list"
//                       options={{ title: 'users ' }}
//                     />
//                     <Stack.Screen name="notifications" options={{ title: 'notifications' }} />
//                     <Stack.Screen name="notification/list" options={{ title: 'list' }} />
//                   </Stack>
//                   <StatusBar style="auto" />
//                 </ThemeProvider>
//               </BottomSheetModalProvider>
//             </PaperProvider>
//           </GestureHandlerRootView>
//         </FCMTokenHandler>

//       </PersistGate>
//     </Provider>
//   );
// }

// RootLayout.tsx
import * as Notifications from 'expo-notifications';
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
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

// إعداد Notification Handler لعرض الإشعارات على الشاشة

Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldShowAlert: true,      // عرض الإشعار على الشاشة
    shouldPlaySound: true,      // تشغيل الصوت
    shouldShowBanner: true,     // ظهور بانر (iOS 14+)
    shouldShowList: true,       // ظهور في قائمة الإشعارات (iOS 16+)
    shouldSetBadge: false,      // تغيير badge على أيقونة التطبيق
  }),
});
export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // مستمع للإشعارات أثناء فتح التطبيق
  useEffect(() => {
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received:', notification);
    });

    const responseSubscription = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('User tapped notification:', response);
    });

    return () => {
      subscription.remove();
      responseSubscription.remove();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <FCMTokenHandler> {/* تسجيل التوكن وحفظه على السيرفر */}
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
                    <Stack.Screen name="contact-owner/[propertyId]" options={{ title: 'اتصل بالمالك' }} />
                    <Stack.Screen name="users/list" options={{ title: 'users ' }} />
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
