
// // FCMTokenHandler.tsx
// import { saveDeviceToken } from '@/services/userService';
// import * as Notifications from 'expo-notifications';
// import { ReactNode, useEffect } from 'react';
// import { Alert, Platform } from 'react-native';
// import { useAppSelector } from './useAuth';

// interface Props {
//   children: ReactNode;
// }

// export function FCMTokenHandler({ children }: Props) {
//   const token = useAppSelector(state => state.auth.token); // توكن المستخدم من Redux

//   useEffect(() => {
//     if (token) {
//       getPushToken(token).catch((error) => {
//         Alert.alert(
//           'خطأ غير متوقع',
//           error?.message || JSON.stringify(error) || 'Unknown Error'
//         );
//       });
//     }
//   }, [token]);

//   return <>{children}</>;
// }

// async function getPushToken(token: string) {
//   try {
//     // طلب صلاحية الإشعارات
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;

//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }

//     if (finalStatus !== 'granted') {
//       Alert.alert('خطأ في الإذن', 'لم يتم منح إذن الإشعارات');
//       return null;
//     }

//     // جلب توكن الجهاز من FCM
//     const response = await Notifications.getDevicePushTokenAsync();
//     if (!response?.data) {
//       Alert.alert('خطأ في التوكن', 'لم يتم استرجاع FCM Token');
//       return null;
//     }

//     const deviceToken = response.data;
//     console.log('✅ FCM Token:', deviceToken);

//     // إعداد قناة إشعارات أندرويد
//     if (Platform.OS === 'android') {
//       await Notifications.setNotificationChannelAsync('default', {
//         name: 'default',
//         importance: Notifications.AndroidImportance.MAX,
//       });
//     }

//     // إرسال التوكن للباك لحفظه
//     await saveDeviceToken(token, deviceToken);

//     Alert.alert('نجاح', 'تم استخراج التوكن وحفظه بنجاح ✅');
//     return deviceToken;
//   } catch (error: any) {
//     Alert.alert(
//       'خطأ أثناء تسجيل الإشعارات',
//       error?.message || JSON.stringify(error) || 'Unknown error'
//     );
//     return null;
//   }
// }

// FCMTokenHandler.tsx
import { saveDeviceToken } from '@/services/userService';
import * as Notifications from 'expo-notifications';
import { ReactNode, useEffect } from 'react';
import { Alert, Platform } from 'react-native';
import { useAppSelector } from './useAuth';

// إعداد الإشعارات عند foreground
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,     // عرض الإشعار على الشاشة
      shouldPlaySound: true,     // تشغيل صوت
      shouldSetBadge: true,      // تحديث رقم البادج على أيقونة التطبيق
      shouldShowBanner: true,    // iOS: عرض شريط الإشعار العلوي
      shouldShowList: true,      // iOS: إضافة الإشعار لقائمة Notification Center
    };
  },
});

interface Props {
  children: ReactNode;
}

export function FCMTokenHandler({ children }: Props) {
  const token = useAppSelector(state => state.auth.token); // توكن المستخدم من Redux

  useEffect(() => {
    if (token) {
      getPushToken(token).catch((error) => {
    
      });
    }

    // Listener للإشعارات أثناء foreground
const subscription = Notifications.addNotificationReceivedListener((notification) => {
  console.log('📩 إشعار وارد أثناء التطبيق مفتوح:', notification);

  const title = notification.request.content.title ?? 'إشعار';
  const body = notification.request.content.body ?? '';

  Alert.alert(title, body);
});

return () => {
  subscription.remove();
};

  }, [token]);

  return <>{children}</>;
}

async function getPushToken(token: string) {
  try {
    // طلب صلاحية الإشعارات
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      return null;
    }

    // جلب توكن الجهاز من FCM
    const response = await Notifications.getDevicePushTokenAsync();
    if (!response?.data) {
      return null;
    }

    const deviceToken = response.data;
    console.log('✅ FCM Token:', deviceToken);

    // إعداد قناة إشعارات أندرويد بصوت عالي
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        sound: 'default',  // الصوت الافتراضي
        vibrationPattern: [0, 250, 250, 250], // اهتزاز عند الإشعار
      });
    }

    // إرسال التوكن للباك لحفظه
    await saveDeviceToken(token, deviceToken);

    console.log('🎉 تم استخراج التوكن وحفظه بنجاح');
    return deviceToken;
  } catch (error: any) {
   
    return null;
  }
}
