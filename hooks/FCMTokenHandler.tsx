// FCMTokenHandler.tsx
import { usePushNotificationsWithFCM } from '@/usePushNotifications';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

export const FCMTokenHandler = ({ children }: Props) => {
  // هذا سيعمل تلقائيًا عند تحميل التطبيق
  const { expoPushToken, notification } = usePushNotificationsWithFCM();

  // يمكن هنا عمل أي شيء إضافي مع notification أو expoPushToken إذا احتجت
  // console.log(notification);

  return <>{children}</>;
};
