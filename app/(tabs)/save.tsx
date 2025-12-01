import AuthGate from '@/components/AuthGate';
import React from 'react';
import { Text, View } from 'react-native';

export default function SaveScreen() {
  return (
    <AuthGate>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>save Screen</Text>
      </View>
    </AuthGate>
  );
}
