
// import { FontAwesome5, Ionicons } from '@expo/vector-icons';
// import FontAwesome from '@expo/vector-icons/FontAwesome';
// import React, { useState } from 'react';
// import { Dimensions, Image, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
// import ContactButtons from './ContactButtons';
// const { width } = Dimensions.get('window');

// interface PropertyAPI {
//   images?: string[];
//   price?: number;
//   bedrooms?: number;
//   bathrooms?: number;
//   area?: number;
//   description?: string;
//   title?: string;
//   status?:string;
//     id?:string;

//   deliveryDate?: string;
//   featured?:boolean;
//   advancePayment?: number;
//   amenities?: Record<string, boolean>;
//   contact?: { email?: string; phone?: string };
//   location?: { address?: string; city?: string };
//   owner?: { name?: string; email?: string; phone?: string };
// }

// interface PropertyProps {
//   item: PropertyAPI;
//   onPress?: () => void;
// }

// const PropertyCard: React.FC<PropertyProps> = ({ item, onPress }) => {
//   const {
//     images = [],
//     price = 0,
//     bedrooms = 0,
//     bathrooms = 0,
//     area = 0,
//     id='',
//     description = '',
//     title = '',
//     status='',
//     deliveryDate,
//     advancePayment = 0,
//     featured=false,
//     contact = {},
//     owner
//   } = item;

//   const colorScheme = useColorScheme();
//   const isDark = colorScheme === 'dark';

//   const [liked, setLiked] = useState(false);

//   const textColor = isDark ? '#fff' : '#333';
//   const subTextColor = isDark ? '#ccc' : '#003366';
//   const backgroundColor = isDark ? '#1c1c1c' : '#fff';
//   const contactBackground = isDark ? 'rgba(50, 50, 50, 0.7)' : 'rgba(217, 248, 217, 0.7)';
//   const infoTagBackground = isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0, 122, 255, 0.15)';

//   // التأكد من عدم تمرير undefined إلى Date
//   const formattedDeliveryDate = deliveryDate
//     ? new Date(deliveryDate).toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
//     : 'غير محدد';

//   return (
//     <ScrollView style={[styles.container, { backgroundColor }]}>
//       {/* Slider للصور */}
//    <ScrollView
//   horizontal
//   pagingEnabled
//   showsHorizontalScrollIndicator={false}
//   contentContainerStyle={{ paddingRight: 16 }}
// >
//   {images.map((img, index) => (
//     <Pressable onPress={onPress} key={index} style={styles.imageWrapper}>
//       <Image source={{ uri: img }} style={styles.image} />

//       {/* Tags أعلى الصورة */}
//       <View style={styles.tagsContainer}>
//         {featured && (
//           <View style={[styles.tag, { backgroundColor: '#fff' }]}>
//             <Text style={[styles.tagText,{color:'#ee8f97'}]}>مميز</Text>
//           </View>
//         )}
//         {status  && (
//           <View style={[styles.tag, { backgroundColor: '#eaf5f9' }]}>
//             <Text style={[styles.tagText]}>{status}</Text>
//           </View>
//         )}
//       </View>

//       {/* قلب الإعجاب */}
//       <Pressable style={styles.heartIcon} onPress={() => setLiked(!liked)}>
//         <Ionicons name={liked ? "heart" : "heart-outline"} size={28} color="#fff" />
//       </Pressable>
//     </Pressable>
//   ))}
// </ScrollView>

//       <Text style={{ fontWeight: '700', fontSize: 20, textAlign: 'right', color: textColor,marginTop:10 }}>  {price} ج.م
//  </Text>

//       {/* معلومات العقار */}
//       <View style={[styles.infoRow, { justifyContent: 'flex-end' }]}>
//         <View style={styles.infoItem}>
//             <FontAwesome name="bed" size={16} color='grey' />
//           <Text style={[styles.infoText, { color: textColor }]}>{bedrooms}</Text>
//         </View>
//         <View style={styles.infoItem}>
//             <FontAwesome5 name="bath" size={16} color='grey' />
//           <Text style={[styles.infoText, { color: textColor }]}>{bathrooms}</Text>
//         </View>
//         <View style={styles.infoItem}>
// <FontAwesome name="cubes" size={16} color='grey' />
//           <Text style={[styles.infoText, { color: textColor }]}>{area} م²</Text>
//         </View>
//       </View>
//     {/* العنوان */}
//       <Text style={{ fontWeight: '700', fontSize: 16, textAlign: 'right', color: textColor }}>{title}</Text>

//       {/* الوصف */}
// <Text
//   style={{ marginVertical: 10, textAlign: 'right', color: textColor }}
//   numberOfLines={2}        // يحدد عدد الأسطر المعروضة
//   ellipsizeMode="tail"     // يضيف ... في نهاية النص إذا تجاوز السطرين
// >
//   {description}
// </Text>


//       {/* أزرار التواصل */}
//       <ContactButtons
//         subTextColor='#005d64'
//         contactBackground='#e5eff0'
//         onPressEmail={() => console.log(contact.email ?? 'لا يوجد بريد')}
//         onPressCall={() => console.log(contact.phone ?? 'لا يوجد رقم')}
//       />

//     </ScrollView>
//   );
// };

// export default PropertyCard;

// const styles = StyleSheet.create({
//   container: { flex: 1,marginBottom:20 },
//   imageWrapper: {
//     width: width - 32,
//     height: 200,
//     borderRadius: 12,
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   image: { width: '100%', height: '100%' },
//   heartIcon: {
//     position: 'absolute',
//     bottom: 10,
//     left: 10,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 5,

//   },
//   infoItem: {
//     flexDirection: 'row-reverse',
//     alignItems: 'center',
//     marginLeft: 15,
//   },
//   infoText: {
//     marginRight: 4,
//     textAlign: 'right',
//   },
//   infoTagRow: {
//     flexDirection: 'row-reverse',
//     alignItems: 'center',
//     paddingHorizontal: 10,
//     paddingVertical: 6,
//     borderRadius: 4,
//     marginBottom: 6,
//   },
//   infoTagText: {
//     fontSize: 12,
//     fontWeight: '600',
//     textAlign: 'right',
//   },
//   tagsContainer: {
//   position: 'absolute',
//   top: 10,
//   left: '65%',
//   flexDirection: 'row',
//   gap: 5, // أو marginRight بين الـ tags
//   zIndex: 2,
// },
// tag: {
//   paddingHorizontal: 8,
//   paddingVertical: 4,
//   borderRadius: 6,
// },
// tagText: {
//   color: 'black',
//   fontSize: 12,
//   fontWeight: '700',
// },

// });


import { useAppDispatch, useAppSelector } from '@/hooks/useAuth';
import { addToFavorites, removeFromFavorites, selectFavorites } from '@/store/favoritesSlice';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { Alert, Dimensions, Image, Linking, Pressable, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native';
import ContactButtons from './ContactButtons';
const { width } = Dimensions.get('window');

interface PropertyAPI {
  images?: string[];
  price?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  description?: string;
  title?: string;
  status?: string;
  id?: string;
  phone?: string;

  deliveryDate?: string;
  featured?: boolean;
  advancePayment?: number;
  amenities?: Record<string, boolean>;
  contact?: { email?: string; phone?: string };
  location?: { address?: string; city?: string };
  owner?: { name?: string; email?: string; phone?: string };
}

interface PropertyProps {
  item: PropertyAPI;
  onPress?: () => void;
}

const PropertyCard: React.FC<PropertyProps> = ({ item, onPress }) => {
  const {
    images = [],
    price = 0,
    bedrooms = 0,
    bathrooms = 0,
    area = 0,
    id = '',
    description = '',
    title = '',
    phone,
    status = '',
    deliveryDate,
    advancePayment = 0,
    featured = false,
    contact = {},
    owner
  } = item;

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const dispatch = useAppDispatch();
  const token = useAppSelector(state => state.auth?.token);
  const favorites = useAppSelector(selectFavorites);

  const textColor = isDark ? '#fff' : '#333';
  const backgroundColor = isDark ? '#1c1c1c' : '#fff';




  // تحقق ما إذا كان العقار موجود في المفضلة
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
      dispatch(addToFavorites({ token, property: { ...item, _id: id } }));
      console.log("تمت إضافة العقار إلى المفضلة:", id);
    }
  };

  const handleCallPress = async () => {
    console.log(contact?.phone, 'phone');

    const phoneNumber = contact?.phone; // أو استخدم رقم منفصل للاتصال إذا أحببت
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



  return (
    <ScrollView style={[styles.container, { backgroundColor }]}>
      {/* Slider للصور */}
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 16 }}
      >
        {images.map((img, index) => (
          <Pressable onPress={onPress} key={index} style={styles.imageWrapper}>
            <Image source={{ uri: img }} style={styles.image} />

            {/* Tags أعلى الصورة */}
            <View style={styles.tagsContainer}>
              {featured && (
                <View style={[styles.tag, { backgroundColor: '#fff' }]}>
                  <Text style={[styles.tagText, { color: '#ee8f97' }]}>مميز</Text>
                </View>
              )}
              {status && (
                <View style={[styles.tag, { backgroundColor: '#eaf5f9' }]}>
                  <Text style={[styles.tagText]}>{status}</Text>
                </View>
              )}
            </View>

            {
              token && (
                <Pressable style={styles.heartIcon} onPress={toggleFavorite}>
                  <Ionicons
                    name={isFavorite ? "heart" : "heart-outline"}
                    size={28}
                    color={isFavorite ? "#ee8f97" : "#fff"} // اللون الآن يعتمد مباشرة على الـ slice
                  />
                </Pressable>
              )
            }


          </Pressable>
        ))}
      </ScrollView>

      <Text style={{ fontWeight: '700', fontSize: 20, textAlign: 'right', color: textColor, marginTop: 10 }}>  {price} ج.م
      </Text>

      {/* معلومات العقار */}
      <View style={[styles.infoRow, { justifyContent: 'flex-end' }]}>
        <View style={styles.infoItem}>
          <FontAwesome name="bed" size={16} color='grey' />
          <Text style={[styles.infoText, { color: textColor }]}>{bedrooms}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome5 name="bath" size={16} color='grey' />
          <Text style={[styles.infoText, { color: textColor }]}>{bathrooms}</Text>
        </View>
        <View style={styles.infoItem}>
          <FontAwesome name="cubes" size={16} color='grey' />
          <Text style={[styles.infoText, { color: textColor }]}>{area} م²</Text>
        </View>
      </View>
      {/* العنوان */}
      <Text style={{ fontWeight: '700', fontSize: 16, textAlign: 'right', color: textColor }}>{title}</Text>

      {/* الوصف */}
      <Text
        style={{ marginVertical: 10, textAlign: 'right', color: textColor }}
        numberOfLines={2}        // يحدد عدد الأسطر المعروضة
        ellipsizeMode="tail"     // يضيف ... في نهاية النص إذا تجاوز السطرين
      >
        {description}
      </Text>


      {/* أزرار التواصل */}
      <ContactButtons
        subTextColor='#005d64'
        contactBackground='#e5eff0'
        onPressEmail={() => console.log(contact.email ?? 'لا يوجد بريد')}
        onPressCall={handleCallPress}
      />

    </ScrollView>
  );
};

export default PropertyCard;

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 20 },
  imageWrapper: {
    width: width - 32,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  image: { width: '100%', height: '100%' },
  heartIcon: {
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,

  },
  infoItem: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginLeft: 15,
  },
  infoText: {
    marginRight: 4,
    textAlign: 'right',
  },
  infoTagRow: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 4,
    marginBottom: 6,
  },
  infoTagText: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'right',
  },
  tagsContainer: {
    position: 'absolute',
    top: 10,
    left: '65%',
    flexDirection: 'row',
    gap: 5, // أو marginRight بين الـ tags
    zIndex: 2,
  },
  tag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  tagText: {
    color: 'black',
    fontSize: 12,
    fontWeight: '700',
  },

});
