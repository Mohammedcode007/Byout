import ContactButtons from '@/components/ContactButtons';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import i18n from '@/i18n';
import { addToFavorites, removeFromFavorites, selectFavorites } from '@/store/favoritesSlice';
import { fetchProperty } from '@/store/propertieSlice';
import { Feather, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useMemo, useRef } from 'react';
import { ActivityIndicator, Alert, Dimensions, Image, Linking, Pressable, ScrollView, Share, StyleSheet, Text, useColorScheme, View } from 'react-native';

const { height } = Dimensions.get('window');

export default function PropertyDetailScreen() {
  const params = useLocalSearchParams();
  const dispatch = useAppDispatch();

  const id =
    typeof params.id === "string" ? params.id : params.id?.[0];
  const { property, loading } = useAppSelector((state) => state.property);


  useEffect(() => {
    if (id) {
      dispatch(fetchProperty(id));
    }
  }, [id]);

  const features = [
    { icon: 'bed-outline', label: `${property?.bedrooms} غرف نوم` },
    { icon: 'water-outline', label: `${property?.bathrooms} حمام` },
    { icon: 'resize-outline', label: `${property?.area} م²` },
    { icon: 'pricetag-outline', label: `السعر: ${property?.price.toLocaleString()} جنيه` },
    { icon: 'cash-outline', label: `مقدم: ${property?.advancePayment?.toLocaleString() || 0} جنيه` },
    { icon: 'calendar-outline', label: `تاريخ التسليم: ${property?.deliveryDate?.split('T')[0]}` },
    { icon: 'home-outline', label: `نوع العملية: ${property?.transactionType}` },
    { icon: 'construct-outline', label: `الحالة: ${property?.status}` },
    { icon: 'shield-checkmark-outline', label: `الملكية: ${property?.ownership}` },
  ];


  const services = Object.entries(property?.amenities || {})
    .filter(([_, value]) => value === true)
    .map(([key]) => {
      const map: Record<string, any> = {
        electricity: { icon: "flash", text: "عداد كهرباء" },
        water: { icon: "water", text: "مياه" },
        garden: { icon: "tree", text: "حديقة" },
        gym: { icon: "dumbbell", text: "صالة رياضية" },
        pool: { icon: "swimming-pool", text: "مسبح" },
        hospital: { icon: "hospital", text: "مستشفى" },
        jacuzzi: { icon: "pool", text: "جاكوزي" },
        sauna: { icon: "sauna", text: "ساونا" },
        childcare: { icon: "baby", text: "رعاية أطفال" },
        cafeteria: { icon: "coffee", text: "كافتريا" },
        garbage_disposal: { icon: "trash", text: "مكب نفايات" },
        maintenance: { icon: "tools", text: "صيانة" },
        phone_line: { icon: "phone", text: "خط هاتف" },
        steam: { icon: "steam", text: "بخار" },
      };

      return map[key]
        ? { icon: map[key].icon, label: map[key].text }
        : null;
    })
    .filter(Boolean);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#222';
  const subTextColor = isDark ? '#ccc' : '#555';
  const sectionTitleColor = isDark ? '#fff' : '#222';
  const iconColor = isDark ? '#66c0ff' : '#003366';
  const bottomSheetBg = isDark ? '#121212' : '#fff';
  // Snap points: الثلث السفلي و 3/4 الشاشة
  const snapPoints = useMemo(() => [height / 3, (height * 3) / 4], []);

  const images = property?.images?.length
    ? property.images
    : ["https://via.placeholder.com/800x600"];

  const ownerEmail = 'code.hassan.1992@gmail.com'
  const handleCallPress = async () => {

    const phoneNumber = property?.contact?.phone; // أو استخدم رقم منفصل للاتصال إذا أحببت
    const url = `tel:${phoneNumber}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('تنبيه', 'لا يمكن فتح تطبيق الاتصال على هذا الجهاز');
      }
    } catch (err) {
      console.error('Error making call', err);
      Alert.alert('حدث خطأ', 'تعذر فتح تطبيق الاتصال');
    }
  };
  const handleShare = async () => {
    try {
      if (!property) return;

      const message = `
🏠 ${property.title}
💰 السعر: ${property.price.toLocaleString()} جنيه
📍 العنوان: ${property.location.city} - ${property.location.street}

شاهد الإعلان:
https://byout.app/property/${property._id}
`;

      await Share.share({ message });
    } catch (error) {
      Alert.alert('خطأ', 'تعذر تنفيذ المشاركة');
    }
  };
  const token = useAppSelector(state => state.auth?.token);
  const favorites = useAppSelector(selectFavorites);
  const isFavorite = favorites.some(fav => fav._id === id);

  const toggleFavorite = () => {
    if (!token) {
      console.log("يجب تسجيل الدخول لإضافة المفضلة");
      return;
    }
    if (!id) {
      console.log("خطأ: لا يمكن إضافة عقار بدون معرف صحيح");
      return;
    }
    if (isFavorite) {
      dispatch(removeFromFavorites({ token, propertyId: id }));
      console.log("تم حذف العقار من المفضلة:", id);
    } else {
      dispatch(addToFavorites({ token, property: { ...property, _id: id } }));
      console.log("تمت إضافة العقار إلى المفضلة:", id);
    }
  };

  if (loading) return <ActivityIndicator size="large" />;
  if (!property) return <Text>لا يوجد بيانات</Text>;
  return (
    <View style={[styles.container,{backgroundColor:isDark ? 'black' : 'white'}]}>
      {/* الصور أعلى */}
      <ScrollView style={{ flex: 1, marginBottom: height / 3 }}>
        {images.map((img, index) => (
          <Image key={index} source={{ uri: img }} style={styles.image} />
        ))}
      </ScrollView>
      <View style={[styles.topIcons,{flexDirection : token ? 'row-reverse' :'row'}]}>
        {/* أيقونتان في اليمين */}
        {token && (
          <View style={{ flexDirection: 'row-reverse', gap: 10 }}>
            <Pressable style={styles.iconButton} onPress={toggleFavorite}>
              <Ionicons
                name={isFavorite ? "heart" : "heart-outline"}
                size={28}
                color={isFavorite ? "red" : "#fff"}
              />
            </Pressable>

            <Pressable style={styles.iconButton} onPress={handleShare}>
              <Feather name="share-2" size={28} color="#fff" />
            </Pressable>
          </View>

        )}




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
      backgroundStyle={[styles.bottomSheet, { backgroundColor: bottomSheetBg }]}
      handleIndicatorStyle={styles.pullIcon}
    >
      <BottomSheetScrollView contentContainerStyle={{ padding: 16 }}>
        {/* العنوان والوصف */}
        <Text style={[styles.title, { color: textColor }]}>{property.title}</Text>
        <Text style={[styles.address, { color: subTextColor }]}>
          {i18n.locale.startsWith('ar') ? 'العنوان' : 'Address'}: {property.location.street} - {property.location.city}
        </Text>
        <Text style={[styles.description, { color: subTextColor }]}>{property.description}</Text>

        <View style={styles.divider} />

        {/* مميزات العقار */}
        <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
          {i18n.locale.startsWith('ar') ? 'مميزات العقار' : 'Property Features'}
        </Text>
        <View style={styles.featuresGrid}>
          {features.map((item, i) => (
            <View key={i} style={styles.featureItem}>
              <Ionicons name={item.icon as any} size={18} color={iconColor} style={{ marginLeft: 4 }} />
              <Text style={[styles.featureText, { color: textColor }]}>{item.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* الخدمات والمرافق */}
        <Text style={[styles.sectionTitle, { color: sectionTitleColor }]}>
          {i18n.locale.startsWith('ar') ? 'الخدمات والمرافق' : 'Services & Facilities'}
        </Text>
        <View style={styles.servicesGrid}>
          {services?.map((item, i) => (
            <View key={i} style={styles.serviceItem}>
              <MaterialCommunityIcons
                name={item?.icon}
                size={18}
                color={iconColor}
                style={{ marginLeft: 4 }}
              />
              <Text style={[styles.serviceText, { color: textColor }]}>{item?.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        {/* أزرار الاتصال */}
        <ContactButtons
          subTextColor={isDark ? '#66c0ff' : '#005d64'}
          contactBackground={isDark ? '#1C1C1E' : '#e5eff0'}
          uniqueId={property.uniqueId}
          ownerEmail={ownerEmail}
          propertyTitle={property.title}
          onPressCall={handleCallPress}
        />
      </BottomSheetScrollView>
    </BottomSheet>

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  image: { width: '100%', height: height / 3, resizeMode: 'cover', marginBottom: 10 },
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
