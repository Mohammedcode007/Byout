// screens/ContactOwnerScreen.tsx
import { API_URL } from '@/config/api';
import axios from 'axios';
import React, { useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, TextInput } from 'react-native';

interface ContactOwnerProps {
  route: {
    params: {
      ownerName: string;
      ownerEmail: string;
      ownerPhone?: string;
      propertyTitle: string;
      propertyId: string;
    };
  };
}

const ContactOwnerScreen: React.FC<ContactOwnerProps> = ({ route }) => {
  const { ownerName, ownerEmail, ownerPhone, propertyTitle, propertyId } = route.params;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState(`السلام عليكم، أرغب بالاستفسار عن العقار: ${propertyTitle} (رقم العقار: ${propertyId})`);

  const handleSend = async () => {
    if (!name || !email || !message) {
      Alert.alert('تنبيه', 'الرجاء ملء جميع الحقول المطلوبة');
      return;
    }

    try {
      await axios.post(`${API_URL}/contact-owner`, {
        to: ownerEmail,
        fromName: name,
        fromEmail: email,
        fromPhone: phone,
        message
      });

      Alert.alert('تم الإرسال', 'تم إرسال رسالتك بنجاح');
      setMessage(`السلام عليكم، أرغب بالاستفسار عن العقار: ${propertyTitle} (رقم العقار: ${propertyId})`); // إعادة نص افتراضي
    } catch (err) {
      console.error(err);
      Alert.alert('خطأ', 'تعذر إرسال الرسالة. حاول مرة أخرى.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>اسم المرسل</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="اسمك" />

      <Text style={styles.label}>البريد الإلكتروني</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="بريدك" keyboardType="email-address" />

      <Text style={styles.label}>رقم الهاتف</Text>
      <TextInput style={styles.input} value={phone} onChangeText={setPhone} placeholder="رقم هاتفك" keyboardType="phone-pad" />

      <Text style={styles.label}>الرسالة</Text>
      <TextInput
        style={[styles.input, { height: 120 }]}
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <Button title="إرسال" onPress={handleSend} />
    </ScrollView>
  );
};

export default ContactOwnerScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  label: { fontWeight: '700', marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 16,
    backgroundColor: '#f9f9f9'
  },
});
