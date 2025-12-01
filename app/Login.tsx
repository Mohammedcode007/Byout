import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, TextInput, Title } from 'react-native-paper';

export default function LoginScreen() {
  const router = useRouter();

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (!emailOrPhone || !password) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }

    // منطق تسجيل الدخول عبر API أو قاعدة بيانات
    Alert.alert('نجاح', 'تم تسجيل الدخول بنجاح');
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 20 }}>
      <Title style={styles.title}>تسجيل الدخول</Title>

      {/* البريد الإلكتروني أو الهاتف */}
      <TextInput
        label="البريد الإلكتروني أو رقم الهاتف"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        style={styles.input}
        mode="outlined"
        right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account-outline" size={20} color="#6c5ce7" />} />}
        textAlign="right"
      />

      {/* كلمة المرور */}
      <TextInput
        label="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        right={<TextInput.Icon icon={() => <Ionicons name="lock-closed-outline" size={20} color="#e17055" />} />}
        textAlign="right"
      />

      {/* زر تسجيل الدخول */}
      <Button mode="contained" onPress={handleLogin} style={styles.button}>
        تسجيل الدخول
      </Button>

      {/* رابط التسجيل */}
      <View style={styles.registerTextContainer}>
        <Text style={styles.registerText}>لا تملك حساب؟ </Text>
        <TouchableOpacity onPress={() => router.push('/Register')}>
          <Text style={[styles.registerText, styles.registerLink]}>تسجيل مستخدم جديد</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fdf6fb',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
    color: '#6c5ce7',
    fontWeight: '700',
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#f0f4f8',
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    backgroundColor: '#6c5ce7',
  },
  registerTextContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginTop: 16,
  },
  registerText: {
    color: '#555',
    fontSize: 14,
  },
  registerLink: {
    color: '#6c5ce7',
    fontWeight: '600',
    marginLeft: 4,
  },
});
