
// import LoadingOverlay from '@/components/LoadingOverlay';
// import LocationBar from '@/components/LocationBar';
// import PropertyCard from '@/components/PropertyCard';
// import SearchFilters from '@/components/SearchFilters';
// import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
// import { fetchProperties } from '@/store/propertieSlice';
// import { useFocusEffect } from '@react-navigation/native';
// import { useRouter } from 'expo-router';
// import { useCallback, useContext } from 'react';
// import { Animated, ScrollView, Text, useColorScheme, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { ScrollYContext } from './_layout';
// export default function SearchScreen() {
//   const router = useRouter();
//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === 'dark';
//   const backgroundColor = isDark ? '#121212' : '#fff';
//   const scrollY = useContext(ScrollYContext); // استخدم الـ scrollY من Context

//   const dispatch = useAppDispatch();
//   const { properties, loading, error } = useAppSelector((state) => state.property);


// useFocusEffect(
//   useCallback(() => {
//     dispatch(fetchProperties());
//   }, [dispatch])
// );
//   return (
//     <SafeAreaView style={{ flex: 1, backgroundColor }}>
//          <Animated.ScrollView
//               style={{ flex: 1, backgroundColor: isDark ? '#121212' : '#fff', paddingTop: 20 }}
//               onScroll={Animated.event(
//                 [{ nativeEvent: { contentOffset: { y: scrollY } } }],
//                 { useNativeDriver: true }
//               )}
//               scrollEventThrottle={16}
//             >

//       {/* شريط الموقع */}
//       <LocationBar
//         onSaveLocation={() => console.log("تم حفظ الموقع")}
//       />

//       {/* الفلاتر */}
//       <View>
//         <SearchFilters
//           onFilterPress={(label) => console.log("اخترت:", label)}
//           onClearFilters={() => console.log("تم مسح الفلاتر")}
//         />
//       </View>

//       {/* قائمة العقارات */}
//       <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
//         {/* Loading state */}
//       <LoadingOverlay visible={loading} />

//         {/* Error state */}
//         {error && <Text style={{ textAlign: 'center', marginTop: 50, color: 'red' }}>{error}</Text>}

//         {/* Empty state */}
//         {!loading && properties.length === 0 && (
//           <Text style={{ textAlign: 'center', marginTop: 50 }}>لا توجد عقارات</Text>
//         )}

//         {/* Render properties */}
//         {properties.map((property) => {
//           // تقسيم الصور لو كانت عبارة عن string مفصول بفواصل
//           const propertyImages = property.images?.[0]
//             ? property.images[0].includes(',')
//               ? property.images[0].split(',').map(img => img.trim())
//               : property.images
//             : [];

//           return (
//             <View key={property._id} style={{ marginBottom: 20 }}>
//               <PropertyCard
//                 item={{
//                   ...property,
//                   images: propertyImages,
//                   bedrooms: property.bedrooms ?? 0,
//                   bathrooms: property.bathrooms ?? 0,
//                   area: property.area ?? 0,
//                   price: property.price ?? 0,
//                   id:property._id,
//                   deliveryDate: property.deliveryDate ?? new Date().toISOString(),
//                   advancePayment: property.advancePayment ?? 0,
//                   contact: {
//                     phone: property.contact?.phone ?? 'غير متوفر',
//                     email: property.contact?.email ?? 'غير متوفر',
//                   },
//                 }}
//                 onPress={() => router.push(`/property/${property._id}`)}
//               />
//             </View>
//           );
//         })}
//       </ScrollView>
//                   </Animated.ScrollView>

//     </SafeAreaView>
//   );
// }

import LoadingOverlay from '@/components/LoadingOverlay';
import LocationBar from '@/components/LocationBar';
import PropertyCard from '@/components/PropertyCard';
import SearchFilters from '@/components/SearchFilters';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { fetchFavorites, selectFavorites } from '@/store/favoritesSlice';
import { fetchProperties } from '@/store/propertieSlice';
import { MaterialIcons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useContext, useEffect, useState } from 'react';
import { Animated, Pressable, ScrollView, Text, TextInput, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollYContext } from './_layout';

export default function SearchScreen() {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#fff';
  const scrollY = useContext(ScrollYContext);

  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth.token);
  const { properties, loading, error } = useAppSelector((state) => state.property);
  const { q } = useLocalSearchParams();
  const [searchInput, setSearchInput] = useState(''); // النص داخل الحقل
  const [searchText, setSearchText] = useState('');   // النص الذي يتم به البحث
  useEffect(() => {
    if (q) {
      const value = String(q);
      setSearchInput(value);
      setSearchText(value); // أول تحميل يبحث مباشرة
    }
  }, [q]);


  // جلب العقارات والمفضلة عند تحميل الشاشة
  // useFocusEffect(
  //   useCallback(() => {
  //     dispatch(fetchProperties());
  //     if (token) {
  //       dispatch(fetchFavorites(token));
  //     }
  //   }, [dispatch, token])
  // );
  useFocusEffect(
    useCallback(() => {
      dispatch(
        fetchProperties(
          searchText
            ? { search: searchText }
            : undefined
        )
      );

      if (token) {
        dispatch(fetchFavorites(token));
      }
    }, [dispatch, token, searchText])
  );


  const favorites = useAppSelector(selectFavorites);

  useEffect(() => {
    console.log("Favorites updated:", favorites);
  }, [favorites]);
  const ownerEmail = 'code.hassan.1992@gmail.com'
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor }}>

      <Animated.ScrollView
        style={{ flex: 1, backgroundColor, paddingTop: 20 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <LocationBar onSaveLocation={() => console.log("تم حفظ الموقع")} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            borderRadius: 12,
            borderWidth: 1,
            borderColor: '#ddd',
            paddingHorizontal: 12,
            height: 45,
            marginHorizontal:17,
            marginBottom:10
          }}
        >
          <Pressable
            onPress={() => {
              setSearchText(searchInput);   // تنفيذ البحث
              router.setParams({ q: searchInput }); // تحديث الرابط
            }}
          >
            <MaterialIcons name="search" size={20} color="#2e7d32" />
          </Pressable>
          <TextInput
            value={searchInput}
            onChangeText={setSearchInput}
            placeholder="ابحث..."
            style={{ flex: 1, marginHorizontal: 10, fontSize: 16 }}
            placeholderTextColor="#888"
          />


          {/* زر مسح النص */}
          {searchText.length > 0 && (
            <Pressable
              onPress={() => {
                setSearchInput('');
                setSearchText('');
                router.setParams({ q: '' });
              }}
            >
              <MaterialIcons name="close" size={20} color="#888" />
            </Pressable>

          )}
        </View>
        <View>
          <SearchFilters
            onFilterPress={(label) => console.log("اخترت:", label)}
            onClearFilters={() => console.log("تم مسح الفلاتر")}
          />
        </View>

        <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
          <LoadingOverlay visible={loading} />

          {error && <Text style={{ textAlign: 'center', marginTop: 50, color: 'red' }}>{error}</Text>}

          {!loading && properties.length === 0 && (
            <Text style={{ textAlign: 'center', marginTop: 50 }}>لا توجد عقارات</Text>
          )}

          {properties.map((property) => {
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
                    id: property._id,
                    phone: property.phone,
                    uniqueId: property.uniqueId,
                    ownerEmail: property.contact?.email,
                    ownerName: property.title,
                    propertyTitle: property.title,
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
