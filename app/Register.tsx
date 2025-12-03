

import LoadingOverlay from '@/components/LoadingOverlay';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { register } from "@/store/authSlice";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Button, Checkbox, Snackbar, TextInput, Title } from 'react-native-paper';

export default function RegisterScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const { loading } = useAppSelector(state => state.auth);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState(false);

  const showSnackbar = (message: string, error = false) => {
    setSnackbarMessage(message);
    setSnackbarError(error);
    setSnackbarVisible(true);
  };

  const handleRegister = async () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      showSnackbar('يرجى ملء جميع الحقول', true);
      return;
    }
    if (password !== confirmPassword) {
      showSnackbar('كلمة المرور غير متطابقة', true);
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) { showSnackbar('يرجى إدخال بريد إلكتروني صحيح', true); return; }
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) { showSnackbar('يرجى إدخال رقم هاتف صحيح', true); return; }
    if (!agreeTerms) { showSnackbar('يرجى الموافقة على الشروط والأحكام', true); return; }

    const payload = { name: username, email, phone, password };
    const res = await dispatch(register(payload));

    if (res.meta.requestStatus === "fulfilled") {
      showSnackbar('تم إنشاء الحساب بنجاح');
      setTimeout(() => router.replace("/Login"), 1000);
    } else {
      showSnackbar(res.payload || 'حدث خطأ أثناء إنشاء الحساب', true);
    }
  };

  const colors = {
    background: isDark ? '#121212' : '#fff',
    text: isDark ? '#fff' : '#1b4414ff',
    inputBackground: isDark ? '#1f1f1f' : '#fff',
    button: isDark ? '#6200ee' : '#1b4414ff',
    link: isDark ? '#bb86fc' : '#17171bff',
    termsText: isDark ? '#ccc' : '#1b4414ff',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingVertical: 20 }}>
      <Title style={[styles.title, { color: colors.text }]}>تسجيل مستخدم جديد</Title>

      <TextInput
        label="اسم المستخدم"
        value={username}
        onChangeText={setUsername}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        mode="outlined"
        right={<TextInput.Icon icon={() => <Ionicons name="person-outline" size={20} color={colors.text} />} />}
        textAlign="right"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
      />

      <TextInput
        label="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="email-outline" size={20} color={colors.text} />} />}
        textAlign="right"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
      />

      <TextInput
        label="رقم الهاتف"
        value={phone}
        onChangeText={setPhone}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        mode="outlined"
        keyboardType="phone-pad"
        right={<TextInput.Icon icon={() => <Ionicons name="call-outline" size={20} color={colors.text} />} />}
        textAlign="right"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
      />

      <TextInput
        label="كلمة المرور"
        value={password}
        onChangeText={setPassword}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        mode="outlined"
        secureTextEntry
        right={<TextInput.Icon icon={() => <Ionicons name="lock-closed-outline" size={20} color={colors.text} />} />}
        textAlign="right"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
      />

      <TextInput
        label="تأكيد كلمة المرور"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        mode="outlined"
        secureTextEntry
        right={<TextInput.Icon icon={() => <Ionicons name="lock-closed-outline" size={20} color={colors.text} />} />}
        textAlign="right"
        placeholderTextColor={isDark ? '#aaa' : '#888'}
      />

      <View style={styles.termsContainer}>
        <Checkbox
          status={agreeTerms ? 'checked' : 'unchecked'}
          onPress={() => setAgreeTerms(!agreeTerms)}
          color={colors.button}
        />
        <Text style={[styles.termsText, { color: colors.termsText }]}>
          أوافق على <Text style={[styles.link, { color: colors.link }]} onPress={() => Linking.openURL('https://example.com/terms')}>الشروط والأحكام</Text>
        </Text>
      </View>

      <Button
        mode="contained"
        onPress={handleRegister}
        style={[styles.button, { backgroundColor: colors.button }]}
        loading={loading}
        disabled={loading}
      >
        تسجيل
      </Button>

      <View style={styles.loginTextContainer}>
        <Text style={[styles.loginText, { color: colors.text }]}>لديك حساب بالفعل؟ </Text>
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={[styles.loginText, styles.loginLink, { color: colors.link }]}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={3000}
        style={{ backgroundColor: snackbarError ? '#d32f2f' : '#388e3c' }}
      >
        {snackbarMessage}
      </Snackbar>
      <LoadingOverlay visible={loading} />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  title: { textAlign: 'center', marginBottom: 20, fontSize: 24, fontWeight: '700' },
  input: { marginBottom: 12 },
  button: { marginTop: 20, paddingVertical: 8 },
  termsContainer: { flexDirection: 'row-reverse', alignItems: 'center', marginVertical: 12 },
  termsText: { fontSize: 14 },
  link: { textDecorationLine: 'underline' },
  loginTextContainer: { flexDirection: 'row-reverse', justifyContent: 'center', marginTop: 16 },
  loginText: { fontSize: 14 },
  loginLink: { fontWeight: '600', marginLeft: 4 },
});
