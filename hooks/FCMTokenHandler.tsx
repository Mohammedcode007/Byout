import React from 'react';
import { useFCMToken } from './useFCMToken';

interface FCMTokenHandlerProps {
  children: React.ReactNode;
}

export function FCMTokenHandler({ children }: FCMTokenHandlerProps) {
  useFCMToken(); // تسجيل التوكن عند تشغيل التطبيق
  return <>{children}</>;
}
