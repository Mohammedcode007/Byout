// app/contact-owner/[propertyId].tsx
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Linking, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ContactOwner() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { propertyId, ownerEmail, ownerName, propertyTitle } = params;

  const [message, setMessage] = useState(
    `مرحبًا ${ownerName || ''},\n\nأنا مهتم بمعرفة المزيد عن العقار "${propertyTitle || ''}" برقم: ${propertyId || ''}.\nالرجاء تزويدي بالمزيد من التفاصيل.\n\nشكرًا لك.`
  );

  const handleSendEmail = async () => {
    if (!ownerEmail) {
      Alert.alert('خطأ', 'البريد الإلكتروني غير متوفر');
      return;
    }

    const subject = `استفسار عن العقار: ${propertyTitle || ''}`;
    const body = encodeURIComponent(message);

    const mailtoUrl = `mailto:${ownerEmail}?subject=${encodeURIComponent(subject)}&body=${body}`;

    try {
      const supported = await Linking.canOpenURL(mailtoUrl);
      if (supported) {
        await Linking.openURL(mailtoUrl);
      } else {
        Alert.alert('خطأ', 'لا يمكن فتح تطبيق البريد الإلكتروني');
      }
    } catch (err) {
      console.error('Error opening email', err);
      Alert.alert('حدث خطأ', 'تعذر فتح البريد الإلكتروني');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen options={{ title: 'اتصال بالمالك' }} />

      <View style={styles.card}>
        <Text style={styles.label}>اسم المالك:</Text>
        <Text style={styles.text}>{ownerName || '-'}</Text>

        <Text style={styles.label}>البريد الإلكتروني:</Text>
        <Text style={styles.text}>{ownerEmail || '-'}</Text>

        <Text style={styles.label}>رقم العقار:</Text>
        <Text style={styles.text}>{propertyId || '-'}</Text>

        <Text style={styles.label}>اسم العقار:</Text>
        <Text style={styles.text}>{propertyTitle || '-'}</Text>

        <Text style={styles.label}>رسالتك:</Text>
        <TextInput
          style={styles.textInput}
          multiline
          value={message}
          onChangeText={setMessage}
          textAlign="right"
        />

        <TouchableOpacity style={styles.button} onPress={handleSendEmail}>
          <Text style={styles.buttonText}>إرسال البريد</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f7f7f7',
    flexGrow: 1,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    fontSize: 16,
    textAlign: 'right',
  },
  text: {
    fontSize: 15,
    color: '#333',
    textAlign: 'right',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    minHeight: 120,
    textAlignVertical: 'top',
    textAlign: 'right',
    backgroundColor: '#fdfdfd',
  },
  button: {
    backgroundColor: '#1b4414ff',
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 4,
    alignItems: 'center',
    shadowColor: '#1b4414ff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
