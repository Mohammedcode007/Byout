import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface Props {
  saleType: 'للبيع' | 'للايجار' | null;
  onSelect: (type: 'للبيع' | 'للايجار') => void;
}

export default function SaleTypeSelector({ saleType, onSelect }: Props) {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
      {['للبيع', 'للايجار'].map(type => (
        <Pressable
          key={type}
          onPress={() => onSelect(type as 'للبيع' | 'للايجار')}
          style={[
            styles.optionButton,
            saleType === type && styles.optionButtonSelected
          ]}
        >
          <Text style={styles.optionText}>{type}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  optionButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 65,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  optionText: { color: '#333', fontWeight: '600' },
  optionButtonSelected: { backgroundColor: '#d4f5d4' },
});
