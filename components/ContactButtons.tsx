// components/ContactButtons.tsx
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Alert, Linking, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

type ContactButtonsProps = {
  subTextColor?: string;
  contactBackground?: string;
  ownerEmail?: string;
  ownerName?: string;
  propertyTitle?: string;
  onPressEmail?: () => void;
  onPressCall?: () => void;
  whatsappNumber?: string; // الرقم هنا
  uniqueId?: string;
};

export default function ContactButtons({
  subTextColor = '#003366',
  contactBackground = 'rgba(217, 248, 217, 0.7)',
  onPressEmail,
  ownerEmail,
  ownerName,
  propertyTitle,
  onPressCall,
  uniqueId,
  whatsappNumber = '+201001186472',
}: ContactButtonsProps) {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // الألوان الافتراضية بناءً على الوضع الليلي
  const textClr = subTextColor ?? (isDark ? '#66c0ff' : '#003366');
  const bgClr = contactBackground ?? (isDark ? '#1C1C1E' : 'rgba(217, 248, 217, 0.7)');
 const handleEmailPress = () => {
  if (!ownerEmail || !uniqueId) {
    Alert.alert('خطأ', 'لا يوجد بريد إلكتروني أو معرف العقار غير متوفر');
    return;
  }

  router.push({
    pathname: '/contact-owner/[propertyId]',
    params: {
      propertyId: uniqueId,
      ownerEmail,
      ownerName: ownerName || '',
      propertyTitle: propertyTitle || '',
    },
  });
};



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
        style={[styles.contactTag, { backgroundColor: bgClr }]}
        onPress={handleEmailPress}
      >
        <Ionicons name="mail-outline" size={16} color={textClr} />
        <Text style={[styles.contactText, { color: textClr }]}>إيميل</Text>
      </Pressable>

      <Pressable
        style={[styles.contactTag, { backgroundColor: bgClr }]}
        onPress={() => onPressCall && onPressCall()}
      >
        <Ionicons name="call-outline" size={16} color={textClr} />
        <Text style={[styles.contactText, { color: textClr }]}>اتصال</Text>
      </Pressable>

      <Pressable
        style={[styles.contactTag, { backgroundColor: bgClr }]}
        onPress={handleWhatsAppPress}
      >
        <FontAwesome name="whatsapp" size={16} color={textClr} />
        <Text style={[styles.contactText, { color: textClr }]}>واتساب</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  infoRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginVertical: 5,
    marginHorizontal:10
  },
  contactTag: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 5,
    marginLeft: 5,
    flex: 1,
    justifyContent: 'center',
  },
  contactText: {
    marginRight: 5,
    textAlign: 'right',
    fontWeight: 'bold',
    fontSize: 15
  },
});
