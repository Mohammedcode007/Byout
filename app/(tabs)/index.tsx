// import { MaterialIcons } from '@expo/vector-icons'; // أيقونة البحث
// import { Image } from 'expo-image';
// import { useState } from 'react';
// import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// export default function HomeScreen() {
//   const [selectedMain, setSelectedMain] = useState<'aqarat' | 'projects'>('projects');
//   const [selectedOption, setSelectedOption] = useState<'sale' | 'rent' | null>("sale");

//   return (
//     <ScrollView style={{ flex: 1 }}>

//       {/* الهيدر */}
//       <Image
//         source={{
//           uri: 'https://i.pinimg.com/1200x/db/62/41/db62413910729e4e33d15d30e57a112a.jpg',
//         }}
//         style={styles.headerImage}
//       />

//       {/* الكارد الرئيسي */}
//       <View style={styles.floatingCard}>
//         <View style={styles.buttonRow}>
//           <Pressable
//             onPress={() => setSelectedMain('aqarat')}
//             style={[
//               styles.mainButton,
//               selectedMain === 'aqarat' && styles.activeBtnGreen,
//             ]}
//           >
//             <Text style={[styles.btnText, selectedMain === 'aqarat' && { color: '#fff' }]}>
//               عقارات
//             </Text>
//           </Pressable>

//           <Pressable
//             onPress={() => setSelectedMain('projects')}
//             style={[
//               styles.mainButton,
//               selectedMain === 'projects' && styles.activeBtnGreen,
//             ]}
//           >
//             <Text style={[styles.btnText, selectedMain === 'projects' && { color: '#fff' }]}>
//               مشاريع جديدة
//             </Text>
//           </Pressable>
//         </View>
//       </View>

//       {/* كارد الخيارات */}
//       {selectedMain === 'aqarat' && (
//         <View style={styles.optionsCard}>
//           <View style={styles.buttonRow}>
//          <Pressable
//               onPress={() => setSelectedOption('sale')}
//               style={[
//                 styles.subButton,
//                 selectedOption === 'sale' ? styles.subButtonActive : styles.subButtonInactive,
//               ]}
//             >
//               <Text style={[
//                 styles.btnText,
//                 selectedOption === 'sale' ? styles.subBtnTextActive : styles.subBtnTextInactive
//               ]}>
//                 للبيع
//               </Text>
//             </Pressable>

//             <Pressable
//               onPress={() => setSelectedOption('rent')}
//               style={[
//                 styles.subButton,
//                 selectedOption === 'rent' ? styles.subButtonActive : styles.subButtonInactive,
//               ]}
//             >
//               <Text style={[
//                 styles.btnText,
//                 selectedOption === 'rent' ? styles.subBtnTextActive : styles.subBtnTextInactive
//               ]}>
//                 للإيجار
//               </Text>
//             </Pressable>
//           </View>
//           {selectedMain === 'aqarat' && (
//               <View style={styles.divider} />
//           )}
            


//             <View style={styles.searchContainer}>
//             <MaterialIcons name="search" size={20} color="#2e7d32" style={{ marginRight: 8 }} />
//             <TextInput
//               placeholder="بحث..."
//               style={styles.searchInputWithIcon}
//               placeholderTextColor="#2e7d32"
//             />
//           </View>
//         </View>
//       )}

//       {selectedMain === 'projects' && (
//         <View style={styles.optionsCard}>
//           <TextInput
//             placeholder="بحث..."
//             style={styles.searchInput}
//             placeholderTextColor="#666"
//           />
//         </View>
//       )}

//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   headerImage: {
//     height: 250,
//     width: '100%',
//     resizeMode: 'cover',
//   },

//   floatingCard: {
//     backgroundColor: 'white',
//     padding: 10,
//     borderRadius: 16,
//     marginTop: -120,
//     marginHorizontal: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.15,
//     shadowRadius: 10,
//     elevation: 6,
//   },

//   optionsCard: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderRadius: 16,
//     marginTop: 16,
//     marginHorizontal: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 8,
//     elevation: 4,
//   },

//   buttonRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     gap: 2,
//   },

//   mainButton: {
//     flex: 1,
//     backgroundColor: '#f1f1f1',
//     borderRadius: 20,
//     alignItems: 'center',
//   },

//   activeBtnGreen: {
//     backgroundColor: '#4bc04dff', // أخضر داكن
//   },

//   subButton: {
//     flex: 1,
//     backgroundColor: '#c8e6c9', // أخضر فاتح
//     paddingVertical: 5,
//     borderRadius: 8,
//     alignItems: 'center',
//   },

//   btnText: {
//     color: '#000', // اللون الافتراضي
//     fontSize: 14,
//     fontWeight: '400',
//   },

//   searchInput: {
//     backgroundColor: '#fff',
//     paddingVertical: 12,
//     paddingHorizontal: 12,
//     borderRadius: 10,
//     fontSize: 16,
//   },
//     subButtonActive: {
//     backgroundColor: '#cfefd0ff',
//   },

//  subButtonInactive: {
//   backgroundColor: '#fff',
//   borderColor: '#ccc', // رمادي فاتح
//   borderWidth: 0.5,
//   borderRadius: 8,      // نصف قطر الزوايا
//   alignItems: 'center',
// },

//    subBtnTextActive: {
//     color: '#2e7d32',
//     fontWeight: '400',
//   },

//   subBtnTextInactive: {
//     color: 'black',
//     fontWeight: '400',
//   },
//   divider: {
//   height: 1,
//   backgroundColor: '#ccc',
//   marginVertical: 12, // مسافة بين الزرين والخط، والخط والبحث
//   borderRadius: 0.5,
// },

//     searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 12,
//     backgroundColor: '#fff',
//     paddingHorizontal: 12,
//     borderRadius: 10,
  
//   },

//   searchInputWithIcon: {
//     flex: 1,
//     height: 40,
//     fontSize: 16,
//   },
// });

import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const [selectedMain, setSelectedMain] = useState<'aqarat' | 'projects'>('projects');
  const [selectedOption, setSelectedOption] = useState<'sale' | 'rent' | null>("sale");
  const [showMiniHeader, setShowMiniHeader] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    if (offsetY > 200) { // لو تجاوز التمرير 200، أظهر الـHeader الجديد
      setShowMiniHeader(true);
    } else {
      setShowMiniHeader(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      
      {/* Header صغير يظهر عند التمرير */}
      {showMiniHeader && (
        <SafeAreaView  style={styles.miniHeader}>
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
                style={[
                  styles.mainButton,
                  selectedMain === 'aqarat' && styles.activeBtnGreen,
                ]}
              >
                <Text style={[styles.btnText, selectedMain === 'aqarat' && { color: '#fff' }]}>
                  عقارات
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSelectedMain('projects')}
                style={[
                  styles.mainButton,
                  selectedMain === 'projects' && styles.activeBtnGreen,
                ]}
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
                style={[
                  styles.subButton,
                  selectedOption === 'sale' ? styles.subButtonActive : styles.subButtonInactive,
                ]}
              >
                <Text style={[
                  styles.btnText,
                  selectedOption === 'sale' ? styles.subBtnTextActive : styles.subBtnTextInactive
                ]}>
                  للبيع
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setSelectedOption('rent')}
                style={[
                  styles.subButton,
                  selectedOption === 'rent' ? styles.subButtonActive : styles.subButtonInactive,
                ]}
              >
                <Text style={[
                  styles.btnText,
                  selectedOption === 'rent' ? styles.subBtnTextActive : styles.subBtnTextInactive
                ]}>
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
        <View style={{ height: 800 }} />
      </ScrollView>
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
    height:'15%',
    backgroundColor: '#dff4e3ff',
    padding: 10,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  
});
