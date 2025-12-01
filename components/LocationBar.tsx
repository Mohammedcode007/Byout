// components/LocationBar.tsx
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  onSelectLocation?: () => void;
  onSaveLocation?: () => void;
}

export default function LocationBar({ onSelectLocation, onSaveLocation }: Props) {
  return (
    <View style={styles.locationBar}>
      
      {/* زر تحديد الموقع */}
      <Pressable style={styles.locationSection} onPress={onSelectLocation}>
        <Ionicons name="location-outline" size={22} color="#4A90E2" />
        <Text style={styles.locationText}>حدد الموقع</Text>
      </Pressable>

      {/* زر حفظ الموقع */}
      <Pressable style={styles.saveSection} onPress={onSaveLocation}>
        <Ionicons name="bookmark-outline" size={22} color="#4A90E2" />
        <Text style={styles.saveText}>حفظ الموقع</Text>
      </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  locationBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#F7F8FA',
    padding: 15,
    margin: 15,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 3,
  },
  locationSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
    color: '#333',
  },
  saveSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveText: {
    fontSize: 15,
    fontWeight: '500',
    marginLeft: 6,
    color: '#4A90E2',
  },
});
