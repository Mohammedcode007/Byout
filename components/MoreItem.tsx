import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

type MoreItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  showArrow?: boolean;
  iconOpacity?: number;        // ⭐ هنا
  onPress?: () => void;
};

export default function MoreItem({
  icon,
  title,
  showArrow = true,
  iconOpacity = 1,
  onPress,
}: MoreItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.container}
      android_ripple={{ color: '#e5e5e5' }}
    >
      {/* Icon */}
      <Ionicons
        name={icon}
        size={26}
        color="#444"
        style={{ opacity: iconOpacity }}
      />

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Arrow */}
      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={22}
          color="#999"
          style={{ opacity: 0.6 }}
        />
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  title: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
