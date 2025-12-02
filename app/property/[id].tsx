import { Feather, FontAwesome5, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useRef } from 'react';
import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const params = useLocalSearchParams();
  const id = params.id;
  
  const features = [
    { icon: 'bed-outline', label: '3 غرف نوم' },
    { icon: 'water-outline', label: '2 حمام' },
    { icon: 'resize-outline', label: '120 م²' },
    { icon: 'pricetag-outline', label: 'السعر: 2,500,000 جنيه' },
    { icon: 'cash-outline', label: 'مقدم: 200,000 جنيه' },
    { icon: 'calendar-outline', label: 'تاريخ الإضافة: 12/2025' },
    { icon: 'home-outline', label: 'نوع العقار: للبيع' },
    { icon: 'construct-outline', label: 'الحالة: قيد الإنشاء' },
    { icon: 'shield-checkmark-outline', label: 'الملكية: أول سكن' },
  ];

  const services = [
    { icon: 'car-sport', label: 'مواقف مغطاة' },
    { icon: 'paw', label: 'مسموح بالحيوانات' },
    { icon: 'flash', label: 'عداد كهرباء' },
    { icon: 'water', label: 'مياه' },
    { icon: 'fire', label: 'غاز' },
    { icon: 'phone', label: 'خط هاتف' },
    { icon: 'pool', label: 'جاكوزي' },
    { icon: 'sauna', label: 'ساونا' },
    { icon: 'baby', label: 'رعاية أطفال' },
    { icon: 'steam', label: 'بخار' },
    { icon: 'trash', label: 'مكب نفايات' },
    { icon: 'tree', label: 'حديقة' },
    { icon: 'coffee', label: 'كافتريا' },
    { icon: 'broom', label: 'خدمات تنظيف' },
    { icon: 'tools', label: 'صيانه' },
    { icon: 'swimming-pool', label: 'مسبح' },
    { icon: 'dumbbell', label: 'صالة رياضية' },
    { icon: 'hospital', label: 'مستشفى' },
  ];

  const bottomSheetRef = useRef<BottomSheet>(null);

  // Snap points: الثلث السفلي و 3/4 الشاشة
  const snapPoints = useMemo(() => [height / 3, (height * 3) / 4], []);

  const images = [
    'https://www.contemporist.com/wp-content/uploads/2017/05/modern-house-design-swimming-pool-160517-950-01-800x533.jpg',
    'https://res.cloudinary.com/stannard-homes/image/fetch/c_fill,g_auto,f_auto,dpr_auto,w_1170,h_617/https://stannard-homes-assets.s3.ap-southeast-2.amazonaws.com/app/uploads/2021/09/19134557/042.jpg',
    'https://www.thithithara.com/storage/property/images/2656_image_1708220798.jpg',
  ];

  return (
    <View style={styles.container}>
      {/* الصور أعلى */}
      <ScrollView style={{ flex: 1 ,marginBottom:height /3}}>
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>
    <View style={styles.topIcons}>
  {/* أيقونتان في اليمين */}
  <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
    <Pressable style={styles.iconButton} onPress={() => console.log('Heart')}>
      <Ionicons name="heart-outline" size={28} color="#fff" />
    </Pressable>
    <Pressable style={styles.iconButton} onPress={() => console.log('Share')}>
      <Feather name="share-2" size={28} color="#fff" />
    </Pressable>
  </View>

  {/* أيقونة على اليسار */}
  <Pressable style={styles.iconButton} onPress={() => console.log('Back')}>
    <Ionicons name="arrow-back" size={28} color="#fff" />
  </Pressable>
</View>

      {/* Bottom Sheet */}
<BottomSheet
  ref={bottomSheetRef}
  index={0}
  snapPoints={snapPoints}
  enablePanDownToClose={false}
  backgroundStyle={styles.bottomSheet}
  handleIndicatorStyle={styles.pullIcon}
>
  <BottomSheetScrollView contentContainerStyle={{ padding: 16 }}>
    {/* العنوان والوصف */}
    <Text style={styles.title}>شقة للبيع في القاهرة</Text>
    <Text style={styles.address}>العنوان: حي الزمالك، القاهرة</Text>  {/* ← هنا العنوان */}

    <Text style={styles.description}>
      شقة رائعة بموقع ممتاز، قريبة من الخدمات، تصميم عصري، ومناسبة للعائلات.
    </Text>

    <View style={styles.divider} />

    {/* مميزات العقار */}
    <Text style={styles.sectionTitle}>مميزات العقار</Text>
    <View style={styles.featuresGrid}>
      {features.map((item, i) => (
        <View key={i} style={styles.featureItem}>
          <Ionicons name={item.icon as any} size={18} color="#003366" style={{ marginLeft: 4 }} />
          <Text style={styles.featureText}>{item.label}</Text>
        </View>
      ))}
    </View>

    <View style={styles.divider} />

    {/* الخدمات والمرافق */}
    <Text style={styles.sectionTitle}>الخدمات والمرافق</Text>
<View style={styles.servicesGrid}>
  {services.map((item, i) => (
    <View key={i} style={styles.serviceItem}>
      <MaterialCommunityIcons name={item.icon as any} size={18} color="#003366" style={{ marginLeft: 4 }} />
      <Text style={styles.serviceText}>{item.label}</Text>
    </View>
  ))}
</View>


    <View style={styles.divider} />

    {/* أزرار الاتصال */}
    <View style={styles.buttonsRow}>
      <View style={styles.contactButton}>
        <FontAwesome5 name="whatsapp" size={16} color="#fff" />
        <Text style={styles.buttonText}>واتس آب</Text>
      </View>
      <View style={styles.contactButton}>
        <Ionicons name="call-outline" size={16} color="#fff" />
        <Text style={styles.buttonText}>اتصال</Text>
      </View>
      <View style={styles.contactButton}>
        <Ionicons name="mail-outline" size={16} color="#fff" />
        <Text style={styles.buttonText}>إيميل</Text>
      </View>
    </View>
  </BottomSheetScrollView>
</BottomSheet>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: height / 3, resizeMode: 'cover',marginBottom:10 },
   bottomSheet: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#F7F8FA',
  },
  pullIcon: {
    width: 40,
    height: 5,
    backgroundColor: '#aaa',
    borderRadius: 3,
    alignSelf: 'center',
    marginVertical: 8,
  },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 10, textAlign: 'right' },
  description: { fontSize: 16, color: '#333', marginBottom: 12, textAlign: 'right' },
  sectionTitle: { fontWeight: '700', marginVertical: 10, fontSize: 18, textAlign: 'right' },
  divider: { height: 1, backgroundColor: '#ccc', marginVertical: 10 },

  // مميزات العقار: شبكة 2x
  featuresGrid: {
    flexDirection: 'row-reverse',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  featureItem: {
    width: '48%',
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: '#E0E4FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  featureText: { fontSize: 14, color: '#003366', fontWeight: '500', textAlign: 'right' },

  // الخدمات والمرافق: قائمة عادية
 

  // أزرار الاتصال
  buttonsRow: { flexDirection: 'row-reverse', justifyContent: 'space-between', marginTop: 10 },
  contactButton: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 200, 0, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: { color: '#003366', fontWeight: '600', marginRight: 6 },
  servicesGrid: {
  flexDirection: 'row-reverse',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: 12,
},
serviceItem: {
  width: '48%',
  flexDirection: 'row-reverse',
  alignItems: 'center',
  paddingVertical: 8,
  paddingHorizontal: 12,
  borderRadius: 12,
  marginBottom: 8,
},
serviceText: { fontSize: 14, color: '#003366', fontWeight: '700', textAlign: 'right' },
 topIcons: {
  position: 'absolute',
  top: 10,
  width: '100%',
  flexDirection: 'row-reverse',
  justifyContent: 'space-between', // أيقونات اليمين واليسار متباعدة
  paddingHorizontal: 16,
},

  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 6,
    borderRadius: 30,
  },
  address: {
  fontSize: 14,
  color: '#666',
  marginBottom: 6,
  textAlign: 'right', // من اليمين لليسار
},

});
