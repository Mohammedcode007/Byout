import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type LocationFilterProps = {
  onFilterPress: (city: string, district: string) => void;
};

type CitiesType = {
  [city: string]: string[];
};

const cities: CitiesType = {
  "القاهرة": ["المعادي", "مدينة نصر", "الزمالك", "الدقي"],
  "الإسكندرية": ["سموحة", "سان ستيفانو", "المنتزه", "العجمي"],
  "الجيزة": ["الهرم", "الدقي", "الشيخ زايد", "الوراق"],
  // أضف باقي المدن حسب الحاجة
};

const LocationFilter: React.FC<LocationFilterProps> = ({ onFilterPress }) => {
  const [selectedCountry] = useState<string>('مصر'); // الدولة ثابتة
  const [selectedCity, setSelectedCity] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  return (
    <View style={{ padding: 16 }}>
      {/* الدولة (ثابتة) */}
      <Text style={styles.label}>الدولة</Text>
      <View style={styles.fixedBox}>
        <Text>{selectedCountry}</Text>
      </View>

      {/* اختيار المدينة */}
      <Text style={styles.label}>المدينة</Text>
      <View style={styles.pickerBox}>
        <Picker
          selectedValue={selectedCity}
          onValueChange={(itemValue: string) => {
            setSelectedCity(itemValue);
            setSelectedDistrict(''); // إعادة تعيين المركز عند تغيير المدينة
          }}
        >
          <Picker.Item label="اختر المدينة" value="" />
          {Object.keys(cities).map((city) => (
            <Picker.Item key={city} label={city} value={city} />
          ))}
        </Picker>
      </View>

      {/* اختيار المركز */}
      {selectedCity ? (
        <>
          <Text style={styles.label}>المركز / المنطقة</Text>
          <View style={styles.pickerBox}>
            <Picker
              selectedValue={selectedDistrict}
              onValueChange={(itemValue: string) => setSelectedDistrict(itemValue)}
            >
              <Picker.Item label="اختر المركز" value="" />
              {cities[selectedCity].map((district) => (
                <Picker.Item key={district} label={district} value={district} />
              ))}
            </Picker>
          </View>
        </>
      ) : null}

      {/* أزرار تطبيق وإعادة ضبط */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
        <Pressable
          style={styles.actionButton}
          onPress={() => {
            setSelectedCity('');
            setSelectedDistrict('');
          }}
        >
          <Text style={{ fontWeight: '700' }}>إعادة الضبط</Text>
        </Pressable>

        <Pressable
          style={[styles.actionButton, { backgroundColor: '#4CAF50' }]}
          onPress={() => onFilterPress(selectedCity, selectedDistrict)}
        >
          <Text style={{ color: '#fff', fontWeight: '700' }}>تطبيق</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: { marginBottom: 6, fontWeight: '700' },
  fixedBox: { padding: 12, backgroundColor: '#f5f5f5', borderRadius: 8, marginBottom: 12 },
  pickerBox: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, marginBottom: 12 },
  actionButton: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 4,
  },
});

export default LocationFilter;
