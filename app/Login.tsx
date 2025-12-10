

import LoadingOverlay from '@/components/LoadingOverlay';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { login } from '@/store/authSlice';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { Button, Snackbar, TextInput, Title } from 'react-native-paper';
// أعلى الملف مع باقي الاستيرادات

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.auth);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');

  const [agreedLocation, setAgreedLocation] = useState(false); // موافقة الموقع
  const [modalVisible, setModalVisible] = useState(false); // الشروط والمودال

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

  if (!agreedLocation) {
    showSnackbar('يجب الموافقة على مشاركة الموقع أولاً', true);
    return;
  }

  let latitude = 0;
  let longitude = 0;
  let country = '';
  let city = '';

  try {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === 'granted') {
      const location = await Location.getCurrentPositionAsync({});
      latitude = location.coords.latitude;
      longitude = location.coords.longitude;

      const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
      if (geocode.length > 0) {
        country = geocode[0].country || '';
        city = geocode[0].city || geocode[0].region || '';
      }
    }
  } catch (err) {
    console.log("Location error:", err);
  }

  const payload = { 
    email: emailOrPhone, 
    password, 
    latitude, 
    longitude,
    country,
    city
  };

  const res = await dispatch(login(payload));

  if (res.meta.requestStatus === 'fulfilled') {
    showSnackbar('تم تسجيل الدخول بنجاح');

    // ✅ حفظ Device Token بعد تسجيل الدخول
    // try {
    //   const expoPushToken = await Notifications.getExpoPushTokenAsync();
    //   if (expoPushToken && res.payload?.token) {
    //     await saveDeviceToken(res.payload.token, expoPushToken.data);
    //     console.log('✅ Device token saved on backend');
    //   }
    // } catch (err) {
    //   console.error('❌ Failed to save device token:', err);
    // }

    setTimeout(() => router.replace('/(tabs)'), 1000);
  } else {
    showSnackbar(res.payload || 'حدث خطأ أثناء تسجيل الدخول', true);
  }
};


// const handleLogin = async () => {
//   if (!emailOrPhone || !password) {
//     showSnackbar('يرجى ملء جميع الحقول', true);
//     return;
//   }

//   if (!agreedLocation) {
//     showSnackbar('يجب الموافقة على مشاركة الموقع أولاً', true);
//     return;
//   }

//   let latitude = 0;
//   let longitude = 0;
//   let country = '';
//   let city = '';

//   try {
//     const { status } = await Location.requestForegroundPermissionsAsync();
//     if (status === 'granted') {
//       const location = await Location.getCurrentPositionAsync({});
//       latitude = location.coords.latitude;
//       longitude = location.coords.longitude;

//       // الحصول على الدولة والمدينة باستخدام reverse geocoding
//       const geocode = await Location.reverseGeocodeAsync({ latitude, longitude });
//       if (geocode.length > 0) {
//         country = geocode[0].country || '';
//         city = geocode[0].city || geocode[0].region || '';
//       }
//     }
//   } catch (err) {
//     console.log("Location error:", err);
//   }

//   const payload = { 
//     email: emailOrPhone, 
//     password, 
//     latitude, 
//     longitude,
//     country,
//     city
//   };

//   const res = await dispatch(login(payload));

//   if (res.meta.requestStatus === 'fulfilled') {
//     showSnackbar('تم تسجيل الدخول بنجاح');
//     setTimeout(() => router.replace('/(tabs)'), 1000);
//   } else {
//     showSnackbar(res.payload || 'حدث خطأ أثناء تسجيل الدخول', true);
//   }
// };
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

      {/* موافقة مشاركة الموقع */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 12 }}>
        <Pressable onPress={() => setAgreedLocation(!agreedLocation)} style={{ marginRight: 8 }}>
          <View style={{
            width: 20, height: 20, borderWidth: 1, borderColor: '#2e7d32',
            backgroundColor: agreedLocation ? '#2e7d32' : 'transparent'
          }} />
        </Pressable>
        <Text>أوافق على مشاركة موقعي</Text>
        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{ color: '#2e7d32', marginLeft: 6 }}>الشروط والأحكام</Text>
        </Pressable>
      </View>

      <Button
        mode="contained"
        onPress={handleLogin}
        labelStyle={{ color: '#fff' }}
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

      {/* مودال الشروط */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View style={{ margin: 20, backgroundColor: '#fff', borderRadius: 8, padding: 20 }}>
            <Text style={{ fontWeight: 'bold', marginBottom: 12 }}>شروط مشاركة الموقع</Text>
            <ScrollView style={{ maxHeight: 300 }}>
              <Text>
                عند الموافقة على مشاركة موقعك، سيتم استخدام الموقع لتقديم إشعارات مخصصة وعروض قريبة منك...
              </Text>
            </ScrollView>
            <Pressable onPress={() => setModalVisible(false)} style={{ marginTop: 12, alignSelf: 'flex-end' }}>
              <Text style={{ color: '#2e7d32', fontWeight: 'bold' }}>حسناً</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

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
  registerTextContainer: { flexDirection: 'row-reverse', justifyContent: 'center', marginTop: 16 },
  registerText: { fontSize: 14 },
  registerLink: { fontWeight: '600', marginLeft: 4 },
});
