import { useAppDispatch } from '@/hooks/useAuth';
import { fetchProperties } from '@/store/propertieSlice';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { MapMarker, Marker, Region } from 'react-native-maps';
export interface LocationData {
  latitude: number;
  longitude: number;
  country: string;
  city: string;
  district: string;
}

interface Props {
  onSaveLocation?: (location: LocationData) => void;
}

export default function LocationBar({ onSaveLocation }: Props) {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState<LocationData | null>(null);
  const [region, setRegion] = useState<Region | null>(null);

  const markerRef = useRef<MapMarker>(null);

  // تحميل الموقع المحفوظ عند بداية التطبيق
  useEffect(() => {
    const loadStoredLocation = async () => {
      try {
        const stored = await AsyncStorage.getItem('@user_location');
        if (stored) {
          const parsed: LocationData = JSON.parse(stored);
          setLocation(parsed);
          setRegion({
            latitude: parsed.latitude,
            longitude: parsed.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        }
      } catch (error) {
      }
    };
    loadStoredLocation();
  }, []);

  // جلب الموقع الحالي عند فتح الـModal إذا لم يكن هناك موقع محفوظ
  const getCurrentLocation = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('تم رفض إذن الوصول للموقع');
      setLoading(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    const place = reverseGeocode[0];

    const newLocation: LocationData = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      country: place?.country ?? 'مصر',
      city: place?.city ?? '',
      district: place?.district ?? place?.subregion ?? '',
    };

    setLocation(newLocation);
    setRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setLoading(false);
  };

  useEffect(() => {
    if (modalVisible && !location) {
      getCurrentLocation();
    }
  }, [modalVisible]);

  // حفظ الموقع في Local Storage
  // const handleSave = async () => {
  //   if (location) {
  //     await AsyncStorage.setItem('@user_location', JSON.stringify(location));
  //     if (onSaveLocation) onSaveLocation(location);
  //     setModalVisible(false);
  //   }
  // };

  // داخل LocationBar


const dispatch = useAppDispatch();
const handleSave = async () => {
  if (location) {
    await AsyncStorage.setItem('@user_location', JSON.stringify(location));

    // إعداد الفلاتر الجديدة فقط مع الموقع
    const newFilters: Record<string, any> = {
      country: location.country, // لا ترميز هنا
      // city: location.city,
      // district: location.district,
    };

    // إرسال الفلاتر للـ Redux مباشرة
    dispatch(fetchProperties(newFilters));

    if (onSaveLocation) onSaveLocation(location);
    setModalVisible(false);
  }
};


  // زر موقعي: يجلب الموقع الفعلي للجهاز
  const handleGoToCurrent = async () => {
    setLoading(true);
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('تم رفض إذن الوصول للموقع');
      setLoading(false);
      return;
    }

    const loc = await Location.getCurrentPositionAsync({});
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
    });
    const place = reverseGeocode[0];

    const currentLocation: LocationData = {
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      country: place?.country ?? 'مصر',
      city: place?.city ?? '',
      district: place?.district ?? place?.subregion ?? '',
    };

    setLocation(currentLocation);
    setRegion({
      latitude: loc.coords.latitude,
      longitude: loc.coords.longitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    });
    setLoading(false);
  };

  return (
    <View style={{ padding: 16 }}>
      {/* زر تحديد الموقع */}
      <Pressable
        style={[styles.button, { backgroundColor: 'rgba(211,211,211,0.5)' }]} // رمادي باهت شفاف
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="location-outline" size={22} color="#00606b" />
        <Text style={styles.buttonText}>
          {location
            ? `${location.country}, ${location.city}, ${location.district}`
            : 'تحديد الموقع'}
        </Text>
      </Pressable>

    

      {/* Modal للخريطة */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1 }}>
          {loading || !region ? (
            <ActivityIndicator
              size="large"
              color="#4CAF50"
              style={{ flex: 1, justifyContent: 'center' }}
            />
          ) : (
            <MapView
              style={{ flex: 1 }}
              initialRegion={region}
              onRegionChangeComplete={async (newRegion) => {
                setRegion(newRegion);
                const reverseGeocode = await Location.reverseGeocodeAsync({
                  latitude: newRegion.latitude,
                  longitude: newRegion.longitude,
                });
                const place = reverseGeocode[0];
                setLocation({
                  latitude: newRegion.latitude,
                  longitude: newRegion.longitude,
                  country: place?.country ?? 'مصر',
                  city: place?.city ?? '',
                  district: place?.district ?? place?.subregion ?? '',
                });
              }}
            >
              <Marker
                coordinate={{
                  latitude: location?.latitude || 0,
                  longitude: location?.longitude || 0,
                }}
                draggable
                onDragEnd={async (e) => {
                  const { latitude, longitude } = e.nativeEvent.coordinate;
                  const reverseGeocode = await Location.reverseGeocodeAsync({
                    latitude,
                    longitude,
                  });
                  const place = reverseGeocode[0];
                  const newLoc = {
                    latitude,
                    longitude,
                    country: place?.country ?? 'مصر',
                    city: place?.city ?? '',
                    district: place?.district ?? place?.subregion ?? '',
                  };
                  setLocation(newLoc);
                  setRegion({
                    ...region!,
                    latitude,
                    longitude,
                  });
                }}
              />
            </MapView>
          )}

          {/* أزرار موقعي وحفظ الموقع */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-around', margin: 16 }}>
            <Pressable
              style={[styles.button, { flex: 1, marginRight: 8, justifyContent: 'center', alignItems: 'center' }]}
              onPress={handleGoToCurrent}
            >
              <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>موقعي</Text>
            </Pressable>

            <Pressable
              style={[styles.button, { flex: 1, marginLeft: 8, justifyContent: 'center', alignItems: 'center' }]}
              onPress={handleSave}
            >
              <Text style={{ color: '#fff', fontWeight: '700', textAlign: 'center' }}>حفظ الموقع</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    marginLeft: 6,
  },
});
