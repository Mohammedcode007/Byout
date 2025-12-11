import AuthGate from '@/components/AuthGate';

import LoadingOverlay from '@/components/LoadingOverlay';
import PropertyCard from '@/components/PropertyCard';
import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { fetchFavorites, selectFavorites } from '@/store/favoritesSlice';
import { fetchProperties } from '@/store/propertieSlice';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useRouter } from 'expo-router';
import { useCallback, useContext, useEffect } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollYContext } from './_layout';
export default function SaveScreen() {
   const router = useRouter();
    const colorScheme = useColorScheme();
    const isDark = colorScheme === 'dark';
    const backgroundColor = isDark ? '#121212' : '#fff';
    const scrollY = useContext(ScrollYContext); 
  
    const dispatch = useAppDispatch();
    const token = useAppSelector(state => state.auth.token);
    const { properties, loading, error } = useAppSelector((state) => state.property);
  
    // جلب العقارات والمفضلة عند تحميل الشاشة
    useFocusEffect(
      useCallback(() => {
        dispatch(fetchProperties());
        if (token) {
          dispatch(fetchFavorites(token));
        }
      }, [dispatch, token])
    );
  const favorites = useAppSelector(selectFavorites);
  
 
  return (
    <AuthGate>
            <View style={{
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 20,
  paddingVertical: 28,
  backgroundColor: isDark ? '#1f1f1f' : '#e6f7e6', // لون فاتح محسّن
  borderBottomWidth: 1,
  borderBottomColor: isDark ? '#333' : '#ccc',
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3, // لظلال على أندرويد
}}>
  <Text style={{ 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginTop:15,
    color: isDark ? '#fff' : '#2e7d32' // لون أكثر وضوحًا للخلفية الفاتحة
  }}>
    المحفوظات
  </Text>

  <TouchableOpacity
    style={{
      padding: 6,
      borderRadius: 20,
      backgroundColor: isDark ? '#2a2a2a' : '#c8e6c9', // خلفية للأيقونة
      justifyContent: 'center',
      alignItems: 'center',
    }}
    onPress={() => console.log("Icon Pressed")}
  >
    <Ionicons
      name="heart"
      size={26} // أكبر قليلًا
      color={isDark ? '#ff6b6b' : '#388e3c'} // لون أيقونة مناسب للخلفية
    />
  </TouchableOpacity>
</View>
      <SafeAreaView style={{ flex: 1, backgroundColor }}>
 

           <Animated.ScrollView
             style={{ flex: 1, backgroundColor, paddingTop: 20 }}
             onScroll={Animated.event(
               [{ nativeEvent: { contentOffset: { y: scrollY } } }],
               { useNativeDriver: true }
             )}
             scrollEventThrottle={16}
           >
             {/* <LocationBar onSaveLocation={() => console.log("تم حفظ الموقع")} /> */}
     
             {/* <View>
               <SearchFilters
                 onFilterPress={(label) => console.log("اخترت:", label)}
                 onClearFilters={() => console.log("تم مسح الفلاتر")}
               />
             </View> */}
     
             <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 50 }}>
               <LoadingOverlay visible={loading} />
     
               {error && <Text style={{ textAlign: 'center', marginTop: 50, color: 'red' }}>{error}</Text>}
     
               { favorites.length === 0 && (
                 <Text style={{ textAlign: 'center', marginTop: 50 }}>لا توجد عقارات</Text>
               )}
     
               {favorites.map((property) => {
                 const propertyImages = property.images?.[0]
                   ? property.images[0].includes(',')
                     ? property.images[0].split(',').map((img: string) => img.trim())
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
    </AuthGate>
  );
}
