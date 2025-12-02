// import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
// import { login } from '@/store/authSlice';
// import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
// import { useRouter } from 'expo-router';
// import React, { useState } from 'react';
// import { Alert, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import { Button, TextInput, Title } from 'react-native-paper';

// export default function LoginScreen() {
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { loading } = useAppSelector(state => state.auth); // حالة التحميل

//   const [emailOrPhone, setEmailOrPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     if (!emailOrPhone || !password) {
//       Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
//       return;
//     }

//     const payload = { email: emailOrPhone, password }; // ارسال payload
//     const res = await dispatch(login(payload));

//     if (res.meta.requestStatus === 'fulfilled') {
//       Alert.alert('نجاح', 'تم تسجيل الدخول بنجاح');
//       router.replace('/(tabs)'); // الانتقال للواجهة الرئيسية
//     } else {
//       Alert.alert('خطأ', res.payload || 'حدث خطأ أثناء تسجيل الدخول');
//     }
//   };

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 20 }}>
//       <Title style={styles.title}>تسجيل الدخول</Title>

//       {/* البريد الإلكتروني أو الهاتف */}
//       <TextInput
//         label="البريد الإلكتروني أو رقم الهاتف"
//         value={emailOrPhone}
//         onChangeText={setEmailOrPhone}
//         style={styles.input}
//         mode="outlined"
//         right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account-outline" size={20} color="#1b4414ff" />} />}
//         textAlign="right"
//       />

//       {/* كلمة المرور */}
//       <TextInput
//         label="كلمة المرور"
//         value={password}
//         onChangeText={setPassword}
//         style={styles.input}
//         mode="outlined"
//         secureTextEntry
//         right={<TextInput.Icon icon={() => <Ionicons name="lock-closed-outline" size={20} color="#1b4414ff" />} />}
//         textAlign="right"
//       />

//       {/* زر تسجيل الدخول مع Loading */}
//       <Button
//         mode="contained"
//         onPress={handleLogin}
//         style={styles.button}
//         loading={loading}
//         disabled={loading}
//       >
//         تسجيل الدخول
//       </Button>

//       {/* رابط التسجيل */}
//       <View style={styles.registerTextContainer}>
//         <Text style={styles.registerText}>لا تملك حساب؟ </Text>
//         <TouchableOpacity onPress={() => router.push('/Register')}>
//           <Text style={[styles.registerText, styles.registerLink]}>تسجيل مستخدم جديد</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: 20,
//     fontSize: 24,
//     color: '#1b4414ff',
//     fontWeight: '700',
//   },
//   input: {
//     marginBottom: 12,
//     backgroundColor: '#fff',
//   },
//   button: {
//     marginTop: 20,
//     paddingVertical: 8,
//     backgroundColor: '#1b4414ff',
//   },
//   registerTextContainer: {
//     flexDirection: 'row-reverse',
//     justifyContent: 'center',
//     marginTop: 16,
//   },
//   registerText: {
//     color: '#1b4414ff',
//     fontSize: 14,
//   },
//   registerLink: {
//     color: '#1b4414ff',
//     fontWeight: '600',
//     marginLeft: 4,
//   },
// });

import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { login } from '@/store/authSlice';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState(false);

  const showSnackbar = (message: string, error = false) => {
    setSnackbarMessage(message);
    setSnackbarError(error);
    setSnackbarVisible(true);
  };

  const handleLogin = async () => {
    if (!emailOrPhone || !password) {
      showSnackbar('يرجى ملء جميع الحقول', true);
      return;
    }

    const payload = { email: emailOrPhone, password };
    const res = await dispatch(login(payload));

    if (res.meta.requestStatus === 'fulfilled') {
      showSnackbar('تم تسجيل الدخول بنجاح');
      setTimeout(() => router.replace('/(tabs)'), 1000);
    } else {
      showSnackbar(res.payload || 'حدث خطأ أثناء تسجيل الدخول', true);
    }
  };

  const colors = {
    background: isDark ? '#121212' : '#fff',
    text: isDark ? '#fff' : '#1b4414ff',
    inputBackground: isDark ? '#1f1f1f' : '#fff',
    button: isDark ? '#6200ee' : '#1b4414ff',
    link: isDark ? '#bb86fc' : '#17171bff',
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]} contentContainerStyle={{ paddingVertical: 20 }}>
      <Title style={[styles.title, { color: colors.text }]}>تسجيل الدخول</Title>

      <TextInput
        label="البريد الإلكتروني أو رقم الهاتف"
        value={emailOrPhone}
        onChangeText={setEmailOrPhone}
        style={[styles.input, { backgroundColor: colors.inputBackground, color: colors.text }]}
        mode="outlined"
        right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account-outline" size={20} color={colors.text} />} />}
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

      <Button
        mode="contained"
        onPress={handleLogin}
        style={[styles.button, { backgroundColor: colors.button }]}
        loading={loading}
        disabled={loading}
      >
        تسجيل الدخول
      </Button>

      <View style={styles.registerTextContainer}>
        <Text style={[styles.registerText, { color: colors.text }]}>لا تملك حساب؟ </Text>
        <TouchableOpacity onPress={() => router.push('/Register')}>
          <Text style={[styles.registerText, styles.registerLink, { color: colors.link }]}>تسجيل مستخدم جديد</Text>
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  title: { textAlign: 'center', marginBottom: 20, fontSize: 24, fontWeight: '700' },
  input: { marginBottom: 12 },
  button: { marginTop: 20, paddingVertical: 8 },
  registerTextContainer: { flexDirection: 'row-reverse', justifyContent: 'center', marginTop: 16 },
  registerText: { fontSize: 14 },
  registerLink: { fontWeight: '600', marginLeft: 4 },
});
