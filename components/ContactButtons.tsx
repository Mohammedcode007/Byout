// components/ContactButtons.tsx
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, View } from 'react-native';

type ContactButtonsProps = {
  subTextColor?: string;
  contactBackground?: string;
  onPressEmail?: () => void;
  onPressCall?: () => void;
  whatsappNumber?: string; // الرقم هنا
};

export default function ContactButtons({
  subTextColor = '#003366',
  contactBackground = 'rgba(217, 248, 217, 0.7)',
  onPressEmail,
  onPressCall,
  whatsappNumber = '+201001186472',
}: ContactButtonsProps) {
  
  const handleWhatsAppPress = async () => {
    const url = `whatsapp://send?phone=${whatsappNumber}&text=مرحبا`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('تنبيه', 'الواتساب غير مثبت على الجهاز');
      }
    } catch (err) {
      console.error('Error opening WhatsApp', err);
      Alert.alert('حدث خطأ', 'تعذر فتح الواتساب');
    }
  };

  return (
    <View style={[styles.infoRow, { justifyContent: 'center' }]}>
      <Pressable
        style={[styles.contactTag, { backgroundColor: contactBackground }]}
        onPress={onPressEmail}
      >
        <Ionicons name="mail-outline" size={16} color={subTextColor} />
        <Text style={[styles.contactText, { color: subTextColor }]}>إيميل</Text>
      </Pressable>

      <Pressable
        style={[styles.contactTag, { backgroundColor: contactBackground }]}
        onPress={onPressCall}
      >
        <Ionicons name="call-outline" size={16} color={subTextColor} />
        <Text style={[styles.contactText, { color: subTextColor }]}>اتصال</Text>
      </Pressable>

      <Pressable
        style={[styles.contactTag, { backgroundColor: contactBackground }]}
        onPress={handleWhatsAppPress} // ← هنا
      >
        <FontAwesome name="whatsapp" size={16} color={subTextColor} />
        <Text style={[styles.contactText, { color: subTextColor }]}>واتساب</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginVertical: 5,
  },
  contactTag: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 5,
    flex: 1,
    justifyContent: 'center',
  },
  contactText: {
    marginRight: 5,
    textAlign: 'right',
  },
});
