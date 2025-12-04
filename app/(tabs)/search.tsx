
import LoadingOverlay from '@/components/LoadingOverlay';
import LocationBar from '@/components/LocationBar';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { fetchProperties } from '@/store/propertieSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useContext } from 'react';
import { Animated, ScrollView, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollYContext } from './_layout';
export default function SearchScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#fff';
  const scrollY = useContext(ScrollYContext); // استخدم الـ scrollY من Context

  const dispatch = useAppDispatch();
  const { properties, loading, error } = useAppSelector((state) => state.property);

  // useEffect(() => {
  //   dispatch(fetchProperties());
  // }, [dispatch]);
useFocusEffect(
  useCallback(() => {
    dispatch(fetchProperties());
  }, [dispatch])
);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>
         <Animated.ScrollView
              style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff', paddingTop: 20 }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
            >

      {/* شريط الموقع */}
      <LocationBar
        onSelectLocation={() => console.log("اختيار الموقع")}
        onSaveLocation={() => console.log("تم حفظ الموقع")}
      />

      {/* الفلاتر */}
      <View>
        <SearchFilters
          onFilterPress={(label) => console.log("اخترت:", label)}
          onClearFilters={() => console.log("تم مسح الفلاتر")}
        />
      </View>

      {/* قائمة العقارات */}
      <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
        {/* Loading state */}
      <LoadingOverlay visible={loading} />

        {/* Error state */}
        {error && <Text style={{ textAlign: 'center', marginTop: 50, color: 'red' }}>{error}</Text>}

        {/* Empty state */}
        {!loading && properties.length === 0 && (
          <Text style={{ textAlign: 'center', marginTop: 50 }}>لا توجد عقارات</Text>
        )}

        {/* Render properties */}
        {properties.map((property) => {
          // تقسيم الصور لو كانت عبارة عن string مفصول بفواصل
          const propertyImages = property.images?.[0]
            ? property.images[0].includes(',')
              ? property.images[0].split(',').map(img => img.trim())
              : property.images
            : [];

          return (
            <View key={property._id} style={{ marginBottom: 20 }}>
              <PropertyCard
                item={{
                  ...property,
                  images: propertyImages,
                  bedrooms: property.bedrooms ?? 0,
                  bathrooms: property.bathrooms ?? 0,
                  area: property.area ?? 0,
                  price: property.price ?? 0,
                  deliveryDate: property.deliveryDate ?? new Date().toISOString(),
                  advancePayment: property.advancePayment ?? 0,
                  contact: {
                    phone: property.contact?.phone ?? 'غير متوفر',
                    email: property.contact?.email ?? 'غير متوفر',
                  },
                }}
                onPress={() => router.push(`/property/${property._id}`)}
              />
            </View>
          );
        })}
      </ScrollView>
                  </Animated.ScrollView>

    </SafeAreaView>
  );
}
