

import PropertyCard from '@/components/PropertyCard';
import { useAppSelector } from '@/hooks/useAuth';
import { selectFavorites } from '@/store/favoritesSlice';
import { RootState } from '@/store/store';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector } from 'react-redux';

export default function HomeScreen() {
  const [selectedMain, setSelectedMain] = useState<'aqarat' | 'projects'>('projects');
  const [selectedOption, setSelectedOption] = useState<'sale' | 'rent' | null>("sale");
  const [showMiniHeader, setShowMiniHeader] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const role = useSelector((state: RootState) => state.auth.role);
console.log(role);

  const router = useRouter();

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 200) { // لو تجاوز التمرير 200، أظهر الـHeader الجديد
      setShowMiniHeader(true);
    } else {
      setShowMiniHeader(false);
    }
  };
  const favorites = useAppSelector(selectFavorites);
  const firstFavorite = favorites[0]; // أول عنصر في المفضلة
  return (
    <View style={{ flex: 1,backgroundColor:'#fff' }}>

      {/* Header صغير يظهر عند التمرير */}
      {showMiniHeader && (
        <SafeAreaView style={styles.miniHeader}>
          <View style={styles.searchContainer}>
            <MaterialIcons name="search" size={20} color="#2e7d32" style={{ marginRight: 8 }} />
            <TextInput
              placeholder="بحث..."
              style={styles.searchInputWithIcon}
              placeholderTextColor="#2e7d32"
            />
          </View>
        </SafeAreaView >
      )}

     <ScrollView style={{ flex: 1 }} onScroll={handleScroll} scrollEventThrottle={16}>
  {/* الهيدر الكبير */}
  <Image
    source={{
      uri: 'https://i.pinimg.com/1200x/db/62/41/db62413910729e4e33d15d30e57a112a.jpg',
    }}
    style={styles.headerImage}
  />

  {/* الكارد الرئيسي */}
  {!showMiniHeader && (
    <View style={styles.floatingCard}>
      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => setSelectedMain('aqarat')}
          style={[styles.mainButton, selectedMain === 'aqarat' && styles.activeBtnGreen]}
        >
          <Text style={[styles.btnText, selectedMain === 'aqarat' && { color: '#fff' }]}>
            عقارات
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedMain('projects')}
          style={[styles.mainButton, selectedMain === 'projects' && styles.activeBtnGreen]}
        >
          <Text style={[styles.btnText, selectedMain === 'projects' && { color: '#fff' }]}>
            مشاريع جديدة
          </Text>
        </Pressable>
      </View>
    </View>
  )}

  {/* كارد الخيارات */}
  {!showMiniHeader && selectedMain === 'aqarat' && (
    <View style={styles.optionsCard}>
      <View style={styles.buttonRow}>
        <Pressable
          onPress={() => setSelectedOption('sale')}
          style={[styles.subButton, selectedOption === 'sale' ? styles.subButtonActive : styles.subButtonInactive]}
        >
          <Text style={[styles.btnText, selectedOption === 'sale' ? styles.subBtnTextActive : styles.subBtnTextInactive]}>
            للبيع
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setSelectedOption('rent')}
          style={[styles.subButton, selectedOption === 'rent' ? styles.subButtonActive : styles.subButtonInactive]}
        >
          <Text style={[styles.btnText, selectedOption === 'rent' ? styles.subBtnTextActive : styles.subBtnTextInactive]}>
            للإيجار
          </Text>
        </Pressable>
      </View>
      <View style={styles.divider} />

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#2e7d32" style={{ marginRight: 8 }} />
        <TextInput
          placeholder="بحث..."
          style={styles.searchInputWithIcon}
          placeholderTextColor="#2e7d32"
        />
      </View>
    </View>
  )}

  {!showMiniHeader && selectedMain === 'projects' && (
    <View style={styles.optionsCard}>
      <TextInput
        placeholder="بحث..."
        style={styles.searchInput}
        placeholderTextColor="#666"
      />
    </View>
  )}

  {/* مساحة افتراضية للتمرير */}
  <View style={{ height: 20 }} />

  {/* عنصر المفضلة وزر المحفوظات - دائم الظهور */}
  {firstFavorite && (
    <View style={{ padding: 16, marginBottom: 80 }}>
      <View key={firstFavorite._id} style={{ marginBottom: 20 }}>
        <PropertyCard
          item={{
            ...firstFavorite,
            images: firstFavorite.images?.[0]
              ? firstFavorite.images[0].includes(',')
                ? firstFavorite.images[0].split(',').map((img: string) => img.trim())
                : firstFavorite.images
              : [],
            bedrooms: firstFavorite.bedrooms ?? 0,
            bathrooms: firstFavorite.bathrooms ?? 0,
            area: firstFavorite.area ?? 0,
            price: firstFavorite.price ?? 0,
            id: firstFavorite._id,
            deliveryDate: firstFavorite.deliveryDate ?? new Date().toISOString(),
            advancePayment: firstFavorite.advancePayment ?? 0,
            contact: {
              phone: firstFavorite.contact?.phone ?? 'غير متوفر',
              email: firstFavorite.contact?.email ?? 'غير متوفر',
            },
          }}
          onPress={() => router.push(`/property/${firstFavorite._id}`)}
        />
      </View>

      <Pressable
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingVertical: 10,
          backgroundColor: '#2e7d32',
          borderRadius: 8,
        }}
        onPress={() => router.push('/save')}
      >
        <Ionicons name="heart" size={20} color="#fff" style={{ marginRight: 6 }} />
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>عرض المحفوظات</Text>
      </Pressable>
    </View>
  )}

</ScrollView>
{/* Floating Button & Dropdown */}
{
  role && (
    <View style={styles.fabContainer}>
  {/* القائمة المنسدلة */}
  {menuOpen && (
    <View style={styles.dropdownMenu}>
      <Pressable style={styles.menuItem} onPress={() => router.push('/add')}>
        <Text style={styles.menuText}>إضافة عقار</Text>
      </Pressable>

      {/* <Pressable style={styles.menuItem} onPress={() => router.push('/edit')}>
        <Text style={styles.menuText}>تعديل</Text>
      </Pressable>

      <Pressable style={styles.menuItem} onPress={() => router.push('/delete')}>
        <Text style={styles.menuText}>حذف</Text>
      </Pressable> */}

      <Pressable style={styles.menuItem} onPress={() => router.push('/list')}>
        <Text style={styles.menuText}>عرض القائمة</Text>
      </Pressable>
    </View>
  )}

  {/* الزر العائم */}
  <Pressable
    style={styles.fab}
    onPress={() => setMenuOpen((prev) => !prev)}
  >
    <Ionicons name={menuOpen ? "close" : "add"} size={28} color="#fff" />
  </Pressable>
</View>
  )
}


    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 250,
    width: '100%',
    resizeMode: 'cover',
  },
  floatingCard: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 20,
    marginTop: -120,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 6,
  },
  optionsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginTop: 16,
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 2,
  },
  searchInput: {
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 10,
    fontSize: 16,
  },

  mainButton: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 20,
    alignItems: 'center',
  },
  activeBtnGreen: {
    backgroundColor: '#4bc04dff',
  },
  subButton: {
    flex: 1,
    backgroundColor: '#c8e6c9',
    paddingVertical: 5,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
  },
  subButtonActive: {
    backgroundColor: '#cfefd0ff',
  },
  subButtonInactive: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 8,
    alignItems: 'center',
  },
  subBtnTextActive: {
    color: '#2e7d32',
    fontWeight: '400',
  },
  subBtnTextInactive: {
    color: 'black',
    fontWeight: '400',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 12,
    borderRadius: 0.5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  searchInputWithIcon: {
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  miniHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '15%',
    backgroundColor: '#dff4e3ff',
    padding: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  fabContainer: {
  position: 'absolute',
  bottom: 100,
  right: 20,
  alignItems: 'flex-end',
  zIndex: 100,
},

fab: {
  width: 55,
  height: 55,
  borderRadius: 30,
  backgroundColor: '#2e7d32',
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowRadius: 6,
  elevation: 8,
},

dropdownMenu: {
  backgroundColor: 'white',
  borderRadius: 12,
  marginBottom: 10,
  paddingVertical: 8,
  width: 160,
  shadowColor: '#000',
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 5,
},

menuItem: {
  paddingVertical: 10,
  paddingHorizontal: 12,
},

menuText: {
  fontSize: 15,
  color: '#2e7d32',
  fontWeight: '600',
},


});
