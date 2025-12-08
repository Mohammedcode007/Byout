import { useAppSelector } from '@/hooks/useAuth';
import { createProperty, PropertyData } from '@/store/propertieSlice';
import { AppDispatch } from '@/store/store';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useReducer, useState } from 'react';
import { Alert, FlatList, Platform, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

/* ====== TYPES ====== */
type AmenityKey =
  | 'water' | 'electricity' | 'sauna' | 'jacuzzi' | 'childcare' | 'steam'
  | 'garbage_disposal' | 'phone_line' | 'garden' | 'cafeteria' | 'maintenance' | 'pool' | 'gym' | 'hospital';

const amenityLabels: Record<AmenityKey, string> = {
  water: 'مياه', electricity: 'كهرباء', sauna: 'ساونا', jacuzzi: 'جاكوزي',
  childcare: 'رعاية أطفال', steam: 'غرفة بخار', garbage_disposal: 'تصريف قمامة',
  phone_line: 'خط هاتف', garden: 'حديقة', cafeteria: 'كافيتريا',
  maintenance: 'صيانة', pool: 'حمام سباحة', gym: 'جيم (صالة رياضية)',
  hospital: 'مستشفى قريب',
};

const propertyTypes = ['apartment', 'villa', 'room', 'student_housing'];
const transactionTypes = ['sale', 'rent'];
const suitableOptions = ['male', 'female', 'mixed'];
const statusTypes = ['مكتمل', 'قيد الانشاء'];
const ownershipTypes = ['owned', 'rented', 'student_housing'];
const countries = ['مصر'];
const citiesByCountry: Record<string, string[]> = {
  مصر: ['القاهرة', 'الجيزة', 'الإسكندرية', 'المنصورة', 'أسوان', 'الفيوم'],
};
const districtsByCity: Record<string, string[]> = {
  القاهرة: ['مدينة نصر', 'الزمالك', 'المهندسين', 'المقطم'],
  الجيزة: ['الهرم', 'الدقي', 'الجيزة الجديدة'],
  الإسكندرية: ['سموحة', 'المعمورة', 'بحري'],
  المنصورة: ['شرق المنصورة', 'غرب المنصورة'],
  أسوان: ['مدينة أسوان', 'أبو سمبل'],
  الفيوم: ['المدينة', 'سنورس'],
};

/* ====== REDUCER ====== */
const initialFormState = {
  title: '', description: '', type: '', installmentMonths: '',
  transactionType: '', price: '', advancePayment: '', country: 'مصر',
  city: '', district: '', street: '', postalCode: '', address: '',
  lat: '', lng: '', suitableFor: 'mixed', area: '', bedrooms: '',
  bathrooms: '', furnished: false, phone: '', email: '', deliveryDate: '',
  featured: false, status: '', ownership: '',
  amenities: Object.fromEntries(Object.keys(amenityLabels).map(k => [k, false])) as Record<AmenityKey, boolean>,
  images: '',
};

type FormAction =
  | { type: 'SET_FIELD', field: string, value: any }
  | { type: 'TOGGLE_AMENITY', field: AmenityKey }
  | { type: 'RESET_DISTRICT' };

const formReducer = (state: typeof initialFormState, action: FormAction) => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'TOGGLE_AMENITY':
      return { ...state, amenities: { ...state.amenities, [action.field]: !state.amenities[action.field] } };
    case 'RESET_DISTRICT':
      return { ...state, district: '' };
    default:
      return state;
  }
};

/* ====== AMENITY COMPONENT ====== */
const AmenityRow = React.memo(({ label, value, onToggle }: { label: string, value: boolean, onToggle: () => void }) => (
  <View style={styles.amenityRow}>
    <Text style={styles.label2}>{label}</Text>
    <Switch value={value} onValueChange={onToggle} />
  </View>
));

/* ====== MAIN COMPONENT ====== */
export default function AddPropertyScreen() {
  const [form, dispatchForm] = useReducer(formReducer, initialFormState);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const token = useAppSelector(state => state.auth.token);

  const handleDateChange = (event: any, date?: Date) => {
    setShowDatePicker(false);
    if (date) {
      const formatted = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      dispatchForm({ type: 'SET_FIELD', field: 'deliveryDate', value: formatted });
    }
  };

  const handleCityChange = (city: string) => {
    dispatchForm({ type: 'SET_FIELD', field: 'city', value: city });
    dispatchForm({ type: 'RESET_DISTRICT' });
    setAvailableDistricts(districtsByCity[city] || []);
  };

  const toggleAmenity = (key: AmenityKey) => dispatchForm({ type: 'TOGGLE_AMENITY', field: key });

  const handleSubmit = () => {
    const imageArray = form.images ? form.images.split(',').map(i => i.trim()) : [];
    if (imageArray.length > 10) return Alert.alert('تنبيه', 'الحد الأقصى المسموح به هو 10 صور فقط.');
    if (!token) return Alert.alert('خطأ', 'يجب تسجيل الدخول لإضافة عقار');

    const payload: PropertyData = {
      title: form.title,
      description: form.description || undefined,
      type: form.type as "apartment" | "villa" | "room" | "student_housing",
      installmentMonths: Number(form.installmentMonths),
      transactionType: form.transactionType === 'sale' ? 'للبيع' : 'للايجار',
      price: Number(form.price),
      advancePayment: form.advancePayment ? Number(form.advancePayment) : undefined,
      location: {
        country: form.country,
        city: form.city,
        district: form.district || undefined,
        street: form.street || undefined,
        postalCode: form.postalCode || undefined,
        address: form.address,
        coordinates: { lat: Number(form.lat), lng: Number(form.lng) }
      },
      suitableFor: form.suitableFor as "male" | "female" | "mixed",
      area: form.area ? Number(form.area) : undefined,
      bedrooms: form.bedrooms ? Number(form.bedrooms) : undefined,
      bathrooms: form.bathrooms ? Number(form.bathrooms) : undefined,
      furnished: form.furnished,
      contact: form.phone || form.email ? { phone: form.phone || undefined, email: form.email || undefined } : undefined,
      deliveryDate: form.deliveryDate ? new Date(form.deliveryDate + '-01').toISOString() : undefined,
      featured: form.featured,
      status: form.status === 'completed' ? 'مكتمل' : 'قيد الانشاء',
      ownership: form.ownership as "owned" | "rented" | "student_housing",
      amenities: form.amenities,
      images: imageArray,
      uniqueId: ''
    };

    dispatch(createProperty({ token, data: payload }))
      .unwrap()
      .then(() => Alert.alert('نجاح', 'تم إضافة العقار بنجاح'))
      .catch(err => {
        console.log('خطأ كامل من الباك اند:', err);
        if (err.response?.data) Alert.alert('خطأ من السيرفر', JSON.stringify(err.response.data, null, 2));
        else if (err.message) Alert.alert('خطأ', err.message);
        else Alert.alert('خطأ', JSON.stringify(err, null, 2));
      });
  };

  useEffect(() => {
    if (form.city) {
      setAvailableDistricts(districtsByCity[form.city] || []);
    } else {
      setAvailableDistricts([]);
    }
  }, [form.city]);

  /* ====== RENDER HELPERS ====== */
  const renderInput = (label: string, key: string, value: string, multiline = false, keyboard: any = 'default') => (
    <>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={v => dispatchForm({ type: 'SET_FIELD', field: key, value: v })}
        style={[styles.input, multiline ? { height: 100, textAlignVertical: 'top' } : null]}
        placeholder={label}
        multiline={multiline}
        keyboardType={keyboard}
      />
    </>
  );

  const renderDropdown = (label: string, value: string, items: string[], onChange: (val: string) => void) => (
    <View style={{ marginBottom: 12 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.pickerWrapper}>
        <Picker selectedValue={value} onValueChange={onChange} style={{ height: 55, width: '100%' }}>
          <Picker.Item label={`اختر ${label}`} value="" />
          {items.map(item => <Picker.Item key={item} label={item} value={item} />)}
        </Picker>
      </View>
    </View>
  );

  /* ====== MAIN RENDER ====== */
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <ScrollView style={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <Text style={styles.pageTitle}>إضافة عقار جديد</Text>

        {renderInput('عنوان العقار', 'title', form.title)}
        {renderInput('الوصف', 'description', form.description, true)}

        {renderDropdown('نوع العقار', form.type, propertyTypes, val => dispatchForm({ type: 'SET_FIELD', field: 'type', value: val }))}
        {renderDropdown('نوع العملية', form.transactionType, transactionTypes, val => dispatchForm({ type: 'SET_FIELD', field: 'transactionType', value: val }))}

        {renderInput('السعر', 'price', form.price, false, 'numeric')}
        {renderInput('المقدم', 'advancePayment', form.advancePayment, false, 'numeric')}
        {renderInput('عدد أشهر التقسيط', 'installmentMonths', form.installmentMonths, false, 'numeric')}

        <Text style={styles.section}>بيانات الموقع</Text>
        {renderDropdown('الدولة', form.country, countries, val => {
          dispatchForm({ type: 'SET_FIELD', field: 'country', value: val });
          dispatchForm({ type: 'SET_FIELD', field: 'city', value: '' });
          dispatchForm({ type: 'RESET_DISTRICT' });
        })}
        {renderDropdown('المدينة', form.city, form.country ? citiesByCountry[form.country] || [] : [], handleCityChange)}
        {renderDropdown('الحي / المركز', form.district, availableDistricts, val => dispatchForm({ type: 'SET_FIELD', field: 'district', value: val }))}

        {renderInput('الشارع', 'street', form.street)}
        {renderInput('الرمز البريدي', 'postalCode', form.postalCode)}
        {renderInput('العنوان التفصيلي', 'address', form.address)}
        {renderInput('خط العرض (lat)', 'lat', form.lat, false, 'numeric')}
        {renderInput('خط الطول (lng)', 'lng', form.lng, false, 'numeric')}

        {renderDropdown('السكن مناسب لـ', form.suitableFor, suitableOptions, val => dispatchForm({ type: 'SET_FIELD', field: 'suitableFor', value: val }))}
        {renderInput('المساحة (م²)', 'area', form.area, false, 'numeric')}
        {renderInput('عدد الغرف', 'bedrooms', form.bedrooms, false, 'numeric')}
        {renderInput('عدد الحمامات', 'bathrooms', form.bathrooms, false, 'numeric')}

        <Text style={styles.label}>مفروش</Text>
        <Switch value={form.furnished} onValueChange={() => dispatchForm({ type: 'SET_FIELD', field: 'furnished', value: !form.furnished })} />

        {renderInput('رقم الهاتف', 'phone', form.phone)}
        {renderInput('البريد الإلكتروني', 'email', form.email)}

        <Text style={styles.label}>تاريخ التسليم (شهر/سنة)</Text>
        <Pressable style={[styles.input, { justifyContent: 'center' }]} onPress={() => setShowDatePicker(true)}>
          <Text>{form.deliveryDate || 'اختر الشهر والسنة'}</Text>
        </Pressable>
        {showDatePicker && (
          <DateTimePicker
            value={form.deliveryDate ? new Date(form.deliveryDate + '-01') : new Date()}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={handleDateChange}
          />
        )}

        {renderDropdown('الحالة', form.status, statusTypes, val => dispatchForm({ type: 'SET_FIELD', field: 'status', value: val }))}
        {renderDropdown('نوع الملكية', form.ownership, ownershipTypes, val => dispatchForm({ type: 'SET_FIELD', field: 'ownership', value: val }))}

        <Text style={styles.label}>عقار مميز؟</Text>
        <Switch value={form.featured} onValueChange={() => dispatchForm({ type: 'SET_FIELD', field: 'featured', value: !form.featured })} />

        <Text style={styles.section}>الخدمات والمرافق</Text>
        <FlatList
          data={Object.keys(form.amenities) as AmenityKey[]}
          keyExtractor={(key) => key}
          renderItem={({ item }) => (
            <AmenityRow label={amenityLabels[item]} value={form.amenities[item]} onToggle={() => toggleAmenity(item)} />
          )}
          scrollEnabled={false}
        />

        {renderInput('روابط الصور (افصل بينهم بـ , ولا يزيد عن 10)', 'images', form.images)}

        <Pressable style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>حفظ العقار</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

/* ====== STYLES ====== */
const styles = StyleSheet.create({
  pageTitle: { fontSize: 22, fontWeight: '700', marginBottom: 20, color: '#2e7d32', textAlign: 'center' },
  label: { fontSize: 15, fontWeight: '600', marginTop: 12, marginBottom: 6, color: '#333' },
  label2: { fontSize: 14, fontWeight: '500', color: '#333' },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#c8e6c9', borderRadius: 10, paddingHorizontal: 12, paddingVertical: 10, fontSize: 15 },
  section: { marginTop: 20, fontSize: 18, fontWeight: '700', color: '#2e7d32' },
  amenityRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6, borderBottomWidth: 1, borderBottomColor: '#eee' },
  submitBtn: { backgroundColor: '#2e7d32', paddingVertical: 14, borderRadius: 12, marginTop: 30, marginBottom: 30 },
  submitText: { color: '#fff', fontWeight: '700', textAlign: 'center', fontSize: 16 },
  pickerWrapper: { borderWidth: 1, borderColor: '#c8e6c9', borderRadius: 10, overflow: 'hidden' },
});
