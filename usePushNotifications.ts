import { saveDeviceToken } from '@/services/userService';
import { useAppSelector } from '@/store/store';
import Constants from 'expo-constants';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useEffect, useRef, useState } from 'react';
import { Platform } from 'react-native';

export interface PushNotificationState {
  expoPushToken?: string;
  notification?: Notifications.Notification;
}

export const usePushNotificationsWithFCM = (): PushNotificationState => {
  const [expoPushToken, setExpoPushToken] = useState<string | undefined>();
  const [notification, setNotification] = useState<Notifications.Notification | undefined>();
  const notificationListener = useRef<Notifications.Subscription | null>(null);
  const responseListener = useRef<Notifications.Subscription | null>(null);
  const token = useAppSelector(state => state.auth.token); // توكن المستخدم

  // إعداد Handler للإشعارات
Notifications.setNotificationHandler({
  handleNotification: async (): Promise<Notifications.NotificationBehavior> => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true, // جديد
    shouldShowList: true,   // جديد
  }),
});


  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        if (!Device.isDevice) {
          console.log('❌ Push notifications تعمل فقط على جهاز حقيقي');
          return;
        }

        // طلب صلاحيات الإشعارات
        let { status } = await Notifications.getPermissionsAsync();
        if (status !== 'granted') {
          const req = await Notifications.requestPermissionsAsync();
          status = req.status;
        }

        if (status !== 'granted') {
          console.log('❌ لم يتم منح صلاحية الإشعارات');
          return;
        }

        // الحصول على Expo Push Token
        const tokenData = await Notifications.getExpoPushTokenAsync({
          projectId: Constants.expoConfig?.extra?.eas?.projectId,
        });
        const expoToken = tokenData.data;

        // تخزين التوكن محليًا
        setExpoPushToken(expoToken);
        console.log('📱 Expo Push Token:', expoToken);

        // إعداد Android channel
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }

        // إرسال التوكن للباك اند إذا كان متوفر
        if (token && expoToken) {
          await saveDeviceToken(token, expoToken);
          console.log('✅ تم حفظ التوكن في الباك اند');
        }
      } catch (err) {
        console.error('❌ خطأ أثناء تسجيل الإشعارات:', err);
      }
    };

    // التسجيل عند تحميل التطبيق أو تغيّر توكن المستخدم
    if (token) {
      registerForPushNotifications();
    }

    // الاستماع للإشعارات المستلمة
    notificationListener.current = Notifications.addNotificationReceivedListener(setNotification);
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification response:', response);
    });

    return () => {
      notificationListener.current?.remove();
      responseListener.current?.remove();
    };
  }, [token]); // ✅ سيعاد التسجيل تلقائيًا عند تغيّر توكن المستخدم

  return { expoPushToken, notification };
};
