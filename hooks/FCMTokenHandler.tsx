// // FCMTokenHandler.tsx
// import { usePushNotificationsWithFCM } from '@/usePushNotifications';
// import { ReactNode } from 'react';

// interface Props {
//   children: ReactNode;
// }

// export const FCMTokenHandler = ({ children }: Props) => {
//   // هذا سيعمل تلقائيًا عند تحميل التطبيق
//   const { expoPushToken, notification } = usePushNotificationsWithFCM();

//   // يمكن هنا عمل أي شيء إضافي مع notification أو expoPushToken إذا احتجت
//   // console.log(notification);

//   return <>{children}</>;
// };

// FCMTokenHandler.tsx
// FCMTokenHandler.tsx
import * as Notifications from 'expo-notifications';
import { ReactNode, useEffect } from 'react';
import { Alert, Platform } from 'react-native';

interface Props {
  children: ReactNode;
}

export function FCMTokenHandler({ children }: Props) {
  useEffect(() => {
    getPushToken().catch((error) => {
      Alert.alert(
        'خطأ غير متوقع',
        error?.message || JSON.stringify(error) || 'Unknown Error'
      );
    });
  }, []);

  return <>{children}</>;
}

async function getPushToken() {
  try {
    // طلب صلاحية الإشعارات
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('خطأ في الإذن', 'لم يتم منح إذن الإشعارات');
      return null;
    }

    // محاولة جلب توكن الجهاز الحقيقي من FCM
    const response = await Notifications.getDevicePushTokenAsync();

    if (!response?.data) {
      Alert.alert('خطأ في التوكن', 'لم يتم استرجاع FCM Token');
      return null;
    }

    const token = response.data;

    // تسجيل التوكن في الكونسول
    console.log('✅ FCM Token:', token);

    // إعداد قناة إشعارات أندرويد
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
      });
    }

    Alert.alert('نجاح', 'تم استخراج التوكن بنجاح ✅');

    return token;
  } catch (error: any) {
    Alert.alert(
      'خطأ أثناء تسجيل الإشعارات',
      error?.message || JSON.stringify(error) || 'Unknown error'
    );
    return null;
  }
}
