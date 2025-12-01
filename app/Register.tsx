import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button, Checkbox, TextInput, Title } from 'react-native-paper';

export default function RegisterScreen() {
  const router = useRouter();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleRegister = () => {
    if (!username || !email || !phone || !password || !confirmPassword) {
      Alert.alert('خطأ', 'يرجى ملء جميع الحقول');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('خطأ', 'كلمة المرور وتأكيدها غير متطابقين');
      return;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      Alert.alert('خطأ', 'يرجى إدخال بريد إلكتروني صحيح');
      return;
    }
    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(phone)) {
      Alert.alert('خطأ', 'يرجى إدخال رقم هاتف صحيح');
      return;
    }
    if (!agreeTerms) {
      Alert.alert('خطأ', 'يرجى الموافقة على الشروط والأحكام');
      return;
    }

    Alert.alert('نجاح', 'تم تسجيل المستخدم بنجاح');
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingVertical: 20 }}>
      <Title style={styles.title}>تسجيل مستخدم جديد</Title>

      {/* حقل اسم المستخدم */}
      <TextInput
        label="اسم المستخدم"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        mode="outlined"
        right={<TextInput.Icon icon={() => <Ionicons name="person-outline" size={20} color="#6c5ce7" />} />}
        textAlign="right"
      />

      {/* البريد الإلكتروني */}
      <TextInput
        label="البريد الإلكتروني"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        mode="outlined"
        keyboardType="email-address"
        autoCapitalize="none"
        right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="email-outline" size={20} color="#ffa502" />} />}
        textAlign="right"
      />

      {/* رقم الهاتف */}
      <TextInput
        label="رقم الهاتف"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        mode="outlined"
        keyboardType="phone-pad"
        right={<TextInput.Icon icon={() => <Ionicons name="call-outline" size={20} color="#00b894" />} />}
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

      {/* تأكيد كلمة المرور */}
      <TextInput
        label="تأكيد كلمة المرور"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        mode="outlined"
        secureTextEntry
        right={<TextInput.Icon icon={() => <Ionicons name="lock-closed-outline" size={20} color="#e17055" />} />}
        textAlign="right"
      />

      {/* الشروط والأحكام */}
      <View style={styles.termsContainer}>
        <Checkbox
          status={agreeTerms ? 'checked' : 'unchecked'}
          onPress={() => setAgreeTerms(!agreeTerms)}
          color="#6c5ce7"
        />
        <Text style={styles.termsText}>
          أوافق على{' '}
          <Text style={styles.link} onPress={() => Linking.openURL('https://example.com/terms')}>
            الشروط والأحكام
          </Text>
        </Text>
      </View>

      {/* زر التسجيل */}
      <Button mode="contained" onPress={handleRegister} style={styles.button}>
        تسجيل
      </Button>

      {/* رابط تسجيل الدخول */}
      <View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>لديك حساب بالفعل؟ </Text>
        <TouchableOpacity onPress={() => router.push('/Login')}>
          <Text style={[styles.loginText, styles.loginLink]}>تسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
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
  termsContainer: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginVertical: 12,
  },
  termsText: {
    color: '#555',
    fontSize: 14,
  },
  link: {
    color: '#6c5ce7',
    textDecorationLine: 'underline',
  },
  loginTextContainer: {
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    marginTop: 16,
  },
  loginText: {
    color: '#555',
    fontSize: 14,
  },
  loginLink: {
    color: '#6c5ce7',
    fontWeight: '600',
    marginLeft: 4,
  },
});
