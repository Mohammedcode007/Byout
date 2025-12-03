import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, useColorScheme } from 'react-native';

type MoreItemProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  showArrow?: boolean;
  iconOpacity?: number;
  onPress?: () => void;
};

export default function MoreItem({
  icon,
  title,
  showArrow = true,
  iconOpacity = 1,
  onPress,
}: MoreItemProps) {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { borderBottomColor: isDark ? '#333' : '#eee' }]}
      android_ripple={{ color: isDark ? '#555' : '#e5e5e5' }}
    >
      {/* Icon */}
      <Ionicons
        name={icon}
        size={26}
        color={isDark ? '#fff' : '#444'}
        style={{ opacity: iconOpacity }}
      />

      {/* Title */}
      <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>{title}</Text>

      {/* Arrow */}
      {showArrow && (
        <Ionicons
          name="chevron-forward"
          size={22}
          color={isDark ? '#aaa' : '#999'}
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
  },
  title: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
