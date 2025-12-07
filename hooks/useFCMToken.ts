import { updateDeviceTokenAPI } from '@/services/authService';
import { updateDeviceToken } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

export function useFCMToken() {
  const token = useAppSelector(state => state.auth.token); // JWT
  const dispatch = useAppDispatch();

  useEffect(() => {
    const registerForPushNotifications = async () => {
      if (!Constants.isDevice) {
        console.log('Push notifications only work on physical devices');
        return;
      }

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Notification permission not granted');
        return;
      }

      const tokenData = await Notifications.getExpoPushTokenAsync();
      console.log('FCM / Expo Push Token:', tokenData.data);

      if (token && tokenData.data) {
        await updateDeviceTokenAPI(token, tokenData.data); // حفظ التوكن على السيرفر
        dispatch(updateDeviceToken(tokenData.data));       // تحديث محليًا
        console.log('Device token updated on backend and Redux');
      }
    };

    registerForPushNotifications().catch(console.error);
  }, [token, dispatch]);
}
