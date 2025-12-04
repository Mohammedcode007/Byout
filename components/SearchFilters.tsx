

import { useAppDispatch } from '@/hooks/useAuth';
import { fetchProperties } from '@/store/propertieSlice';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useMemo, useRef, useState } from 'react';
import { I18nManager, Pressable, ScrollView, StyleSheet, Text, TextInput, useColorScheme, View } from 'react-native';
import { Portal } from 'react-native-paper';
import LocationFilter from './LocationFilter';
import TagBox from './TagBox';

interface Props {
  onFilterPress?: (label: string) => void;
  onClearFilters?: () => void;
}
// ...استمرار الكود الحالي قبل BottomSheet

const housingOptions = {
  سكني: [
    { label: 'شقة', icon: <Ionicons name="home-outline" size={28} color="#444" /> },
    { label: 'فيلا', icon: <Ionicons name="business-outline" size={28} color="#444" /> },
    { label: 'دوبلكس', icon: <Ionicons name="git-branch-outline" size={28} color="#444" /> },
    { label: 'بنتهاوس', icon: <Ionicons name="aperture-outline" size={28} color="#444" /> },
    { label: 'شاليه', icon: <Ionicons name="sunny-outline" size={28} color="#444" /> },
    { label: 'غرفة', icon: <Ionicons name="bed-outline" size={28} color="#444" /> },
    { label: 'تاون هاوس', icon: <Ionicons name="home-outline" size={28} color="#444" /> },
    { label: 'أرض سكنية', icon: <Ionicons name="map-outline" size={28} color="#444" /> },
    { label: 'شقة فندقية', icon: <Ionicons name="bed-outline" size={28} color="#444" /> },
  ],
  تجاري: [
    { label: 'مكتب', icon: <Ionicons name="business-outline" size={28} color="#444" /> },
    { label: 'مجمع تجاري', icon: <Ionicons name="layers-outline" size={28} color="#444" /> },
    { label: 'مستودع', icon: <Ionicons name="cube-outline" size={28} color="#444" /> },
    { label: 'عيادة', icon: <Ionicons name="medkit-outline" size={28} color="#444" /> },
    { label: 'مصنع', icon: <Ionicons name="construct-outline" size={28} color="#444" /> },
    { label: 'جراج', icon: <Ionicons name="car-outline" size={28} color="#444" /> },
    { label: 'مطعم وكافيه', icon: <Ionicons name="restaurant-outline" size={28} color="#444" /> },
    { label: 'محلات تجارية', icon: <Ionicons name="storefront-outline" size={28} color="#444" /> },
    { label: 'زراعية', icon: <Ionicons name="leaf-outline" size={28} color="#444" /> },
    { label: 'صناعية', icon: <Ionicons name="hammer-outline" size={28} color="#444" /> },
    { label: 'عقارات أخرى', icon: <Ionicons name="cube-outline" size={28} color="#444" /> },
    { label: 'صيدلية', icon: <Ionicons name="medkit-outline" size={28} color="#444" /> },
  ],
};

// داخل BottomSheetView


export default function SearchFilters({ onFilterPress, onClearFilters }: Props) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const subTextColor = isDark ? '#ccc' : 'black';
  const dispatch = useAppDispatch();

  const backgroundColor = isDark ? '#121212' : '#fff';
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [singleSelectWord, setSingleSelectWord] = useState<string | null>(null);
  const [currentBottomSheet, setCurrentBottomSheet] = useState<string | null>(null);
  const [saleType, setSaleType] = useState<'للبيع' | 'للايجار' | null>(null);
  const [housingType, setHousingType] = useState<'سكني' | 'تجاري'>('سكني');
  const [selectedHousingItem, setSelectedHousingItem] = useState<string | null>(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [selectedBath, setSelectedBath] = useState<string | null>(null); // الحمامات

  const [fromPrice, setFromPrice] = useState(0);           // الحد الأدنى
  const [toPrice, setToPrice] = useState(100_000_000);    // الحد الأعلى (100 مليون)

  const [fromArea, setFromArea] = useState(0);
  const [toArea, setToArea] = useState(1000);
  const [paymentPlan, setPaymentPlan] = useState<string>(''); // تعريف state لخطة السداد
  const [completionPercent, setCompletionPercent] = useState<number>(0);
  const [filters, setFilters] = useState<any>({});
  const [selectedCountry] = useState<string>('مصر'); // الدولة ثابتة
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const [deliveryState, setDeliveryState] = useState<'الجميع' | 'جاهز' | 'قيد الإعداد'>('الجميع');


  const bottomSheetRef = useRef<BottomSheet>(null);



  const filtersWithBottomSheet = ["للبيع", "سكني", "المكان", "المساحة", "غرف النوم", "السعر", "الحمامات", "التسليم", "خطة السداد"];
  const openBottomSheet = (label: string) => {
    if (currentBottomSheet === label) {
      // لو نفس الفلتر اللي مفتوح، بس افتحه مرة تانية
      bottomSheetRef.current?.expand();
      return;
    }

    // لو فلتر جديد، غيّر الحالة وافتح الـ BottomSheet
    setCurrentBottomSheet(label);

    // استخدم requestAnimationFrame لضمان تحديث المحتوى قبل الفتح
    requestAnimationFrame(() => {
      bottomSheetRef.current?.close();
      bottomSheetRef.current?.expand();
    });
  };



  const snapPoints = useMemo(() => ['33%'], []);
  const toggleFilter = (label: string, hasBottomSheet = false) => {
    if (hasBottomSheet) {
      setSelectedFilters(prev => {
        if (!prev.includes(label)) return [...prev, label];
        return prev;
      });

      openBottomSheet(label);
      return;
    }

    if (["جاهز", "قيد الإنشاء", "الجميع"].includes(label)) {
      setSingleSelectWord(label);
      onFilterPress?.(label);
      return;
    }

    setSelectedFilters(prev => {
      const newFilters = prev.includes(label)
        ? prev.filter(f => f !== label)
        : [...prev, label];
      return newFilters;
    });

    onFilterPress?.(label);
  };


  const selectSaleType = (type: 'للبيع' | 'للايجار') => {
    setSaleType(type);
    setCurrentBottomSheet(type);
    bottomSheetRef.current?.close();
    onFilterPress?.(type);
  };
  const getInstallmentMonths = (plan: string | null) => {
    switch (plan) {
      case 'دفعة واحدة': return 0;
      case 'تقسيط 3 أشهر': return 3;
      case 'تقسيط 6 أشهر': return 6;
      case 'تقسيط 12 شهر': return 12;
      default: return 0;
    }
  };


  // const handleFilterPress = (
  //   type: 'للبيع' | 'للايجار' | null,
  //   bedrooms: string | null = null,
  //   bathrooms: string | null = null,
  //   price?: { from: number; to: number },
  //   area?: { from: number; to: number },
  //   deliveryMonth?: number | null,
  //   deliveryYear?: number | null
  // ) => {
  //   const newFilters: Record<string, any> = { ...filters };

  //   if (type) newFilters.transactionType = type;
  //   if (bedrooms) newFilters.bedrooms = bedrooms;
  //   if (bathrooms) newFilters.bathroom = bathrooms;

  //   // السعر
  //   newFilters.price = price
  //     ? { from: price.from, to: price.to }
  //     : { from: fromPrice, to: toPrice };

  //   // المساحة
  //   newFilters.area = area
  //     ? { from: area.from, to: area.to }
  //     : { from: fromArea, to: toArea };

  //   newFilters.type = selectedHousingItem;
  //   newFilters.deliveryStatus = deliveryState;
  //   newFilters.completion = completionPercent;
  //   newFilters.paymentPlan = paymentPlan;

  //   // تاريخ التسليم
  //   if (deliveryMonth && deliveryYear) {
  //     newFilters.deliveryMonth = deliveryMonth;
  //     newFilters.deliveryYear = deliveryYear;
  //   }

  //   dispatch(fetchProperties(newFilters));
  // };

  // دالة الفلترة

  const handleFilterPress = (
  type: 'للبيع' | 'للايجار' | null,
  bedrooms: string | null = null,
  bathrooms: string | null = null,
  price?: { from: number; to: number },
  area?: { from: number; to: number },
  deliveryMonth?: number | null,
  deliveryYear?: number | null,
  plan?: string | null,
  country?: string,
  city?: string,
  district?: string
) => {
  const newFilters: Record<string, any> = { ...filters };

  // نوع المعاملة
  if (type) newFilters.transactionType = type;

  // غرف النوم والحمامات
  if (bedrooms) newFilters.bedrooms = bedrooms;
  if (bathrooms) newFilters.bathroom = bathrooms;

  // السعر
  newFilters.price = price
    ? { from: price.from, to: price.to }
    : { from: fromPrice, to: toPrice };

  // المساحة
  newFilters.area = area
    ? { from: area.from, to: area.to }
    : { from: fromArea, to: toArea };

  // نوع السكن/التجاري
  if (selectedHousingItem) newFilters.type = selectedHousingItem;

  // حالة التسليم
  if (deliveryState) newFilters.deliveryStatus = deliveryState;

  // نسبة الإنجاز
  if (completionPercent) newFilters.completion = completionPercent;

  // خطة السداد
  const installment = getInstallmentMonths(plan ?? paymentPlan);
  if (installment > 0) newFilters.installmentMonths = installment;

  // تاريخ التسليم
  if (deliveryMonth && deliveryYear) {
    newFilters.deliveryMonth = deliveryMonth;
    newFilters.deliveryYear = deliveryYear;
  }

  // الدولة والمدينة والحي
  if (country && country.trim() !== '') newFilters.country = country.trim();
  if (city && city.trim() !== '') newFilters.city = city.trim();
  if (district && district.trim() !== '') newFilters.district = district.trim();

  // إرسال الفلاتر للـ Redux
  dispatch(fetchProperties(newFilters));
};


  return (
    <View style={{ justifyContent: 'flex-start', backgroundColor: backgroundColor }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, alignItems: 'flex-start' }}
      >
        {/* أيقونات الفلاتر */}
        <TagBox isSelected={selectedFilters.includes('فلتر')} onPress={() => {
          // إعادة ضبط الحالات المحلية
          setSelectedFilters([]);
          setSingleSelectWord(null);
          setSaleType(null);

          // استدعاء دالة خارجية إذا موجودة
          onClearFilters?.();

          // تمرير فلاتر فارغة للـ Redux
          dispatch(fetchProperties({}));
        }}
        >
          {/* <MaterialCommunityIcons name="table-filter" size={18} color="#333" /> */}
          <Ionicons name="list-outline" size={24} color="#444" />
        </TagBox>

        {/* فلتر sale */}
        <TagBox
          isSelected={selectedFilters.includes('للبيع') || selectedFilters.includes('للايجار')}
          onPress={() => toggleFilter('للبيع', true)}
        >
          <View style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 15, marginHorizontal: 6 }}>{saleType ?? 'للبيع'}</Text>
            <Ionicons name="chevron-down-outline" size={10} color="#444" />
          </View>
        </TagBox>

        {/* الكلمات الثلاث */}
        {/* <MultiWordTagBox
          words={["الجميع", "جاهز", "قيد الإنشاء"]}
          selectedWord={singleSelectWord}
          onWordPress={(word) => toggleFilter(word)}
        /> */}

        {/* باقي الفلاتر */}
        {[
          { label: "سكني", icon: <Ionicons name="home-outline" size={16} color="#444" /> },
          { label: "المكان", icon: <Ionicons name="location-outline" size={16} color="#444" /> }, // هنا أضفنا المكان

          { label: "غرف النوم", icon: <Ionicons name="bed-outline" size={16} color="#444" /> },
          { label: "السعر", icon: <Ionicons name="pricetag-outline" size={16} color="#444" /> },
          { label: "الحمامات", icon: <Ionicons name="water-outline" size={16} color="#444" /> },
          { label: "المساحة", icon: <Ionicons name="resize-outline" size={16} color="#444" /> },

          { label: "التسليم", icon: <Ionicons name="timer-outline" size={16} color="#444" /> },
          { label: "خطة السداد", icon: <Ionicons name="cash-outline" size={16} color="#444" /> },

        ].map((item, index) => {
          const isSingleSelect = ["جاهز", "قيد الإنشاء", "الجميع"].includes(item.label!);
          const isSelected = isSingleSelect ? singleSelectWord === item.label : selectedFilters.includes(item.label!);
          const hasBottomSheet = filtersWithBottomSheet.includes(item.label!);

          return (
            <TagBox
              key={index}
              isSelected={isSelected}
              onPress={() => toggleFilter(item.label!, hasBottomSheet)}
            >
              <View style={{ flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row', alignItems: 'center' }}>
                {item.icon && <View style={{ marginHorizontal: 4 }}>{item.icon}</View>}
                <Text style={{ fontSize: 14 }}>{item.label}</Text>
                {!isSingleSelect && hasBottomSheet && item.label !== 'للبيع' && (
                  <Ionicons name="chevron-down-outline" size={14} color="#888" style={{ marginHorizontal: 2 }} />
                )}
              </View>
            </TagBox>
          );
        })}

        {/* مسح الفلاتر */}
        <Pressable
          onPress={() => { setSelectedFilters([]); setSingleSelectWord(null); setSaleType(null); onClearFilters?.(); }}
        >
          <Text style={{ color: 'green', fontWeight: '600' }}>مسح تصفية البحث</Text>
        </Pressable>
      </ScrollView>

      {/* BottomSheet */}
      <Portal>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1} // مغلق في البداية
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backgroundStyle={{ backgroundColor: '#fff', borderRadius: 16 }}

        >
          <BottomSheetView style={{ padding: 16 }}>
            {/* أيقونة الغلق */}
            <Pressable
              onPress={() => bottomSheetRef.current?.close()}
              style={{ alignSelf: 'flex-end', marginBottom: 10 }}
            >
              <Ionicons name="close-outline" size={24} color="#333" />
            </Pressable>
            {currentBottomSheet === 'غرف النوم' && (
              <View>
                <Text style={{ fontWeight: '700', fontSize: 16, marginBottom: 10 }}>اختر عدد غرف النوم</Text>
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                  {['1', '2', '3', '4', '5', '6', '7', '8+', 'استديو'].map((room) => {
                    const isSelected = selectedRoom === room;
                    return (
                      <Pressable
                        key={room}
                        onPress={() => setSelectedRoom(room)}
                        style={{
                          paddingVertical: 8,
                          paddingHorizontal: 14,
                          borderRadius: 20,
                          backgroundColor: isSelected ? '#d4f5d4' : '#f5f5f5',
                          borderWidth: isSelected ? 2 : 0,
                          borderColor: isSelected ? '#4CAF50' : 'transparent',
                          margin: 4,
                        }}
                      >
                        <Text style={{ fontSize: 14, textAlign: 'center' }}>{room}</Text>
                      </Pressable>
                    );
                  })}
                </View>

                <Pressable
                  onPress={() => {
                    if (selectedRoom) {
                      setSelectedFilters(prev => {
                        const cleaned = prev.filter(f => !['1', '2', '3', '4', '5', '6', '7', '8+', 'استديو'].includes(f));
                        return [...cleaned, selectedRoom];
                      });

                      handleFilterPress(saleType, selectedRoom); // لن يتم ارسال البيع تلقائياً
                    } else {
                      handleFilterPress(saleType); // فقط النوع لو موجود
                    }

                    bottomSheetRef.current?.close();
                    setCurrentBottomSheet(null);
                  }}
                  style={{ paddingVertical: 12, borderRadius: 8, alignItems: 'center' }}
                >
                  <Text style={{ color: 'green', fontWeight: '700' }}>تطبيق</Text>
                </Pressable>

              </View>
            )}
            {currentBottomSheet === 'المكان' && (
              <LocationFilter
                onFilterPress={(city, district) => {
                  // حفظ القيم أو تمريرها للفلترة
                  setSelectedCity(city);
                  setSelectedDistrict(district);

                  // تمرير الفلتر الرئيسي لو عندك دالة handleFilterPress
                  handleFilterPress(
                    null,  // type
                    null,  // bedrooms
                    null,  // bathrooms
                    undefined, // price
                    undefined, // area
                    undefined, // deliveryMonth
                    undefined, // deliveryYear
                    undefined, // plan
                    selectedCountry, // country
                    city,           // city
                    district        // district
                  );
                  // إغلاق الـ BottomSheet بعد الاختيار
                  bottomSheetRef.current?.close();
                  setCurrentBottomSheet(null);
                }}
              />
            )}

            {currentBottomSheet === 'سكني' && (
              <View>
                {/* زرين سكني / تجاري */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 12 }}>
                  {['سكني', 'تجاري'].map(type => (
                    <Pressable
                      key={type}
                      onPress={() => setHousingType(type as 'سكني' | 'تجاري')}
                      style={[
                        styles.optionButton,
                        housingType === type && styles.optionButtonSelected
                      ]}
                    >
                      <Text style={styles.optionText}>{type}</Text>
                    </Pressable>
                  ))}
                </View>

                {/* قائمة المربعات الأفقية */}
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {housingOptions[housingType].map((item, idx) => {
                    const isSelected = selectedHousingItem === item.label;

                    return (
                      <Pressable
                        key={idx}
                        onPress={() => {
                          setSelectedHousingItem(item.label); // تحديد العنصر فقط
                          onFilterPress?.(item.label); // إرسال الاختيار للفلتر الرئيسي
                        }}
                        style={{
                          width: 80,
                          height: 100,
                          backgroundColor: isSelected ? '#d4f5d4' : '#f5f5f5', // تغيير اللون عند الاختيار
                          borderRadius: 8,
                          marginRight: 10,
                          alignItems: 'center',
                          justifyContent: 'center',
                          padding: 6,
                          borderWidth: isSelected ? 2 : 0,
                          borderColor: isSelected ? '#4CAF50' : 'transparent',
                        }}
                      >
                        {item.icon}
                        <Text style={{ fontSize: 12, marginTop: 6, textAlign: 'center' }}>{item.label}</Text>
                      </Pressable>
                    );
                  })}
                </ScrollView>
              </View>
            )}
            {currentBottomSheet === 'الحمامات' && (
              <View>
                {/* أيقونة الحمام بدل النص */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                  <Ionicons name="water-outline" size={24} color="#444" />
                  <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 8 }}>الحمامات</Text>
                </View>

                {currentBottomSheet === 'الحمامات' && (
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
                      <Ionicons name="water-outline" size={24} color="#444" />
                      <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 8 }}>الحمامات</Text>
                    </View>

                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 }}>
                      {['1', '2', '3', '4', '5', '6+'].map((bath) => {
                        const isSelected = selectedBath === bath;
                        return (
                          <Pressable
                            key={bath}
                            onPress={() => setSelectedBath(bath)}
                            style={{
                              paddingVertical: 8,
                              paddingHorizontal: 14,
                              borderRadius: 20,
                              backgroundColor: isSelected ? '#d4f5d4' : '#f5f5f5',
                              borderWidth: isSelected ? 2 : 0,
                              borderColor: isSelected ? '#4CAF50' : 'transparent',
                              margin: 4,
                            }}
                          >
                            <Text style={{ fontSize: 14, textAlign: 'center' }}>{bath}</Text>
                          </Pressable>
                        );
                      })}
                    </View>

                    <Pressable
                      onPress={() => {
                        handleFilterPress(saleType, selectedRoom, selectedBath);
                        bottomSheetRef.current?.close();
                        setCurrentBottomSheet(null);
                      }}
                      style={{ paddingVertical: 12, borderRadius: 8, alignItems: 'center' }}
                    >
                      <Text style={{ color: 'green', fontWeight: '700' }}>تطبيق</Text>
                    </Pressable>
                  </View>
                )}



              </View>
            )}

            {currentBottomSheet === 'السعر' && (
              <View style={{ padding: 16 }}>
                {/* أيقونة ونص */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <Ionicons name="pricetag-outline" size={24} color="#444" />
                  <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 8 }}>نطاق السعر</Text>
                </View>

                {/* مستطيلين لإظهار القيم */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={fromPrice.toString()}
                    onChangeText={(text) => {
                      const val = Number(text);
                      if (!isNaN(val) && val <= toPrice) setFromPrice(val);
                    }}
                  />
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={toPrice.toString()}
                    onChangeText={(text) => {
                      const val = Number(text);
                      if (!isNaN(val) && val >= fromPrice) setToPrice(val);
                    }}
                  />
                </View>

                {/* Slider واحد مع نطاق مزدوج */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ marginBottom: 8, color: '#555' }}>{`من ${fromPrice} إلى ${toPrice}`}</Text>

                  <MultiSlider
                    values={[fromPrice, toPrice]}
                    min={0}             // الحد الأدنى
                    max={100_000_000}   // الحد الأعلى (100 مليون)
                    step={100_000}      // خطوة كل 100 ألف جنيه، ممكن تغيرها حسب رغبتك
                    allowOverlap={false}
                    snapped
                    sliderLength={300} // اضبط حسب العرض المطلوب
                    onValuesChange={(values) => {
                      setFromPrice(values[0]);
                      setToPrice(values[1]);
                    }}
                    selectedStyle={{ backgroundColor: '#4CAF50' }}
                    unselectedStyle={{ backgroundColor: '#ccc' }}
                    markerStyle={{ backgroundColor: '#4CAF50' }}
                  />

                </View>

                {/* أزرار إعادة الضبط وتطبيق */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Pressable
                    onPress={() => {
                      setFromPrice(0);
                      setToPrice(10000);
                    }}
                    style={[styles.actionButton,]}
                  >
                    <Text style={{ fontWeight: '700' }}>إعادة الضبط</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      onFilterPress?.(`${fromPrice} - ${toPrice}`); // حول الكائن لنص
                      handleFilterPress(saleType, selectedRoom, `${fromPrice} - ${toPrice}`);
                      bottomSheetRef.current?.close();
                      setCurrentBottomSheet(null);
                    }}
                    style={[styles.actionButton]}
                  >
                    <Text style={{ color: 'green', fontWeight: '700' }}>تطبيق</Text>
                  </Pressable>
                </View>
              </View>
            )}
            {currentBottomSheet === 'التسليم' && (
              <View style={{ padding: 16 }}>
                {/* أيقونة ونص */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <Ionicons name="calendar-outline" size={24} color="#444" />
                  <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 8 }}>تاريخ التسليم</Text>
                </View>


                {/* اختيار التاريخ */}
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <Pressable
                    onPress={() => setShowDatePicker(true)}
                    style={[styles.dateInput, { flex: 1, justifyContent: 'center', padding: 12 }]}
                  >
                    <Text style={{ color: selectedDate ? '#000' : '#888', fontWeight: '500' }}>
                      {selectedDate ? `${selectedDate.getMonth() + 1} / ${selectedDate.getFullYear()}` : 'اختر الشهر والسنة'}
                    </Text>
                  </Pressable>

                  {/* زر إعادة الضبط */}
                  <Pressable
                    onPress={() => {
                      let deliveryMonth = null;
                      let deliveryYear = null;

                      if (selectedDate) {
                        deliveryMonth = selectedDate.getMonth() + 1;
                        deliveryYear = selectedDate.getFullYear();
                      }

                      const filterLabel = selectedDate
                        ? `${deliveryMonth} / ${deliveryYear}${deliveryState !== 'الجميع' ? ` - ${deliveryState}` : ''}`
                        : deliveryState !== 'الجميع'
                          ? deliveryState
                          : '';

                      onFilterPress?.(filterLabel);

                      handleFilterPress(
                        saleType,
                        selectedRoom,
                        selectedBath,
                        undefined,
                        undefined,
                        deliveryMonth,
                        deliveryYear
                      );

                      bottomSheetRef.current?.close();
                      setCurrentBottomSheet(null);
                    }}
                    style={[styles.actionButton, { backgroundColor: '#4CAF50', marginTop: 20 }]}
                  >
                    <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>تطبيق</Text>
                  </Pressable>

                </View>

                {/* DateTimePicker */}
                {showDatePicker && (
                  <DateTimePicker
                    value={selectedDate || new Date()}
                    mode="date"
                    display="spinner"
                    onChange={(event, date) => {
                      setShowDatePicker(false);
                      if (date) setSelectedDate(date);
                    }}
                  />
                )}

                {/* زر تطبيق */}
                <Pressable
                  onPress={() => {
                    const stateText = deliveryState !== 'الجميع' ? ` - ${deliveryState}` : '';
                    onFilterPress?.(
                      selectedDate
                        ? `${selectedDate.getMonth() + 1} / ${selectedDate.getFullYear()}${stateText}`
                        : stateText
                    );
                    bottomSheetRef.current?.close();
                    setCurrentBottomSheet(null);
                  }}
                  style={[styles.actionButton, { backgroundColor: '#4CAF50', marginTop: 20 }]}
                >
                  <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>تطبيق</Text>
                </Pressable>
              </View>
            )}

            {currentBottomSheet === 'المساحة' && (
              <View style={{ padding: 16 }}>
                {/* أيقونة ونص */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <Ionicons name="resize-outline" size={24} color="#444" />
                  <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 8 }}>نطاق المساحة (م²)</Text>
                </View>

                {/* مستطيلين لإظهار القيم */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={fromArea.toString()}
                    onChangeText={(text) => {
                      const val = Number(text);
                      if (!isNaN(val) && val <= toArea) setFromArea(val);
                    }}
                  />
                  <TextInput
                    style={styles.priceInput}
                    keyboardType="numeric"
                    value={toArea.toString()}
                    onChangeText={(text) => {
                      const val = Number(text);
                      if (!isNaN(val) && val >= fromArea) setToArea(val);
                    }}
                  />
                </View>

                {/* Slider واحد مع نطاق مزدوج */}
                <View style={{ marginBottom: 20 }}>
                  <Text style={{ marginBottom: 8, color: '#555' }}>{`من ${fromArea} إلى ${toArea} م²`}</Text>

                  <MultiSlider
                    values={[fromArea, toArea]}
                    min={0}
                    max={1000} // أقصى مساحة ممكنة
                    step={10}
                    allowOverlap={false}
                    snapped
                    sliderLength={300} // أو اضبط حسب العرض المطلوب
                    onValuesChange={(values) => {
                      setFromArea(values[0]);
                      setToArea(values[1]);
                    }}
                    selectedStyle={{ backgroundColor: '#4CAF50' }}
                    unselectedStyle={{ backgroundColor: '#ccc' }}
                    markerStyle={{ backgroundColor: '#4CAF50' }}
                  />
                </View>

                {/* أزرار إعادة الضبط وتطبيق */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Pressable
                    onPress={() => {
                      setFromArea(0);
                      setToArea(1000);
                    }}
                    style={[styles.actionButton]}
                  >
                    <Text style={{ fontWeight: '700' }}>إعادة الضبط</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      handleFilterPress(
                        saleType,
                        selectedRoom,
                        selectedBath,
                        { from: fromPrice, to: toPrice }, // السعر لو مستخدم
                        { from: fromArea, to: toArea }    // ← أضفنا هنا المساحة
                      );
                      bottomSheetRef.current?.close();
                      setCurrentBottomSheet(null);
                    }}
                    style={[styles.actionButton]}
                  >
                    <Text style={{ color: 'green', fontWeight: '700' }}>تطبيق</Text>
                  </Pressable>
                </View>
              </View>
            )}

            {currentBottomSheet === 'خطة السداد' && (
              <View style={{ padding: 16 }}>
                {/* أيقونة ونص */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                  <Ionicons name="card-outline" size={24} color="#444" />
                  <Text style={{ fontSize: 16, fontWeight: '700', marginLeft: 8 }}>خطة السداد</Text>
                </View>

                {/* خيارات السداد */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginBottom: 20 }}>
                  {['دفعة واحدة', 'تقسيط 3 أشهر', 'تقسيط 6 أشهر', 'تقسيط 12 شهر'].map((plan) => (
                    <Pressable
                      key={plan}
                      onPress={() => setPaymentPlan(plan as string)}
                      style={{
                        paddingVertical: 10,
                        paddingHorizontal: 16,
                        borderRadius: 20,
                        marginRight: 8,
                        marginBottom: 10,
                        backgroundColor: paymentPlan === plan ? '#4CAF50' : '#f5f5f5',
                      }}
                    >
                      <Text style={{ color: paymentPlan === plan ? '#fff' : '#444', fontWeight: '500' }}>{plan}</Text>
                    </Pressable>
                  ))}
                </View>

                {/* أزرار إعادة الضبط وتطبيق */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Pressable
                    onPress={() => setPaymentPlan('')}
                    style={[styles.actionButton]}
                  >
                    <Text style={{ fontWeight: '700' }}>إعادة الضبط</Text>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      handleFilterPress(null, null, null, undefined, undefined, undefined, undefined, paymentPlan);
                      bottomSheetRef.current?.close();
                      setCurrentBottomSheet(null);
                    }}
                    style={[styles.actionButton]}
                  >
                    <Text style={{ color: 'green', fontWeight: '700' }}>تطبيق</Text>
                  </Pressable>
                </View>
              </View>
            )}


            {currentBottomSheet === 'للبيع' && (
              <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                <Pressable
                  onPress={() => {
                    handleFilterPress('للبيع'); // تطبيق الفلتر مباشرة

                    selectSaleType('للبيع')
                  }}

                  style={[
                    styles.optionButton,
                    saleType === 'للبيع' && styles.optionButtonSelected
                  ]}
                >
                  <Text style={styles.optionText}>للبيع</Text>
                </Pressable>

                <Pressable
                  onPress={() => {
                    handleFilterPress('للايجار'); // تطبيق الفلتر مباشرة

                    selectSaleType('للايجار')
                  }}
                  style={[
                    styles.optionButton,
                    saleType === 'للايجار' && styles.optionButtonSelected
                  ]}
                >
                  <Text style={styles.optionText}>للايجار</Text>
                </Pressable>
              </View>
            )}

          </BottomSheetView>
        </BottomSheet>
      </Portal>

    </View>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    backgroundColor: '#E53935',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    marginLeft: 8,
  },
  optionButton: {
    backgroundColor: '#fff', // الخلفية الأساسية أبيض
    paddingVertical: 10,
    paddingHorizontal: 65,
    borderRadius: 4, // زوايا مستديرة قليلاً
    borderWidth: 1,
    borderColor: '#ccc', // رمادي فاتح
  },
  optionText: {
    color: '#333', // لون النص أسود/رمادي غامق
    fontWeight: '600',
  },
  optionButtonSelected: {
    backgroundColor: '#d4f5d4', // أخضر باهت عند الاختيار
  },
  priceInput: {
    width: '45%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});
