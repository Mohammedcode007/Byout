import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

interface Props {
  children?: React.ReactNode;    // يقبل كلام – أيقونة – أو الاثنين
  isSelected?: boolean;          // لحالة التحديد
  onPress?: () => void;
}

export default function TagBox({ children, isSelected = false, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.box,
        isSelected && styles.boxSelected
      ]}
    >
      <View style={styles.inner}>{children}</View>
    </Pressable>
  );
}


const styles = StyleSheet.create({
  box: {
    paddingHorizontal: 14,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  boxSelected: {
    backgroundColor: 'rgba(0,150,0,0.15)',
    borderColor: 'green',
  },
  inner: {
    flexDirection:'row-reverse' ,
    alignItems: 'center',
    justifyContent: 'center',  // ← التوسيط
  }
});
