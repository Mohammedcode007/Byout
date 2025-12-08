// useFCMToken.ts
import { saveDeviceToken } from '@/services/userService';
import { useAppSelector } from '@/store/store';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';
import { Platform } from 'react-native';

export function useFCMToken() {
  const token = useAppSelector(state => state.auth.token);

  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        if (!Constants.isDevice) {
          console.log('❌ Push notifications تعمل فقط على جهاز حقيقي');
          return;
        }

        let { status } = await Notifications.getPermissionsAsync();

        if (status !== 'granted') {
          const req = await Notifications.requestPermissionsAsync();
          status = req.status;
        }

        if (status !== 'granted') {
          console.log('❌ لم يتم منح صلاحية الإشعارات');
          return;
        }

        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });

        const expoToken = tokenData.data;

        // ✅ طباعة التوكن بشكل واضح
        console.log('📱 Expo Push Token:', expoToken);

        // Android channel
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
          });
        }

        // حفظ التوكن على السيرفر إذا كان متوفر
        if (token && expoToken) {
          await saveDeviceToken(token, expoToken);
          console.log('✅ تم حفظ التوكن في الباك اند');
        }
      } catch (err) {
        console.error('❌ خطأ أثناء تسجيل الإشعارات:', err);
      }
    };

    // تسجيل التوكن عند توفر توكن المستخدم
    registerForPushNotifications();
  }, [token]);
}
