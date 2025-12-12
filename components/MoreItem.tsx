import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

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
      {/* أيقونة + نص */}
      <View style={styles.leftContainer}>
        <Ionicons
          name={icon}
          size={26}
          color={isDark ? '#fff' : '#444'}
          style={{ opacity: iconOpacity }}
        />
        <Text style={[styles.title, { color: isDark ? '#fff' : '#333' }]}>{title}</Text>
      </View>

      {/* السهم على أقصى اليسار */}
      {showArrow && (
        <Ionicons
          name="chevron-back-sharp"
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
    flexDirection: 'row-reverse', // ترتيب RTL: أيقونة + نص على اليمين، السهم على اليسار
    alignItems: 'center',
    justifyContent: 'space-between', // تفصل بين النص + الأيقونة والسهم
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
  },
  leftContainer: {
    flexDirection: 'row-reverse', // الأيقونة ثم النص بجانبها
    alignItems: 'center',
  },
  title: {
    marginRight: 12, // المسافة بين الأيقونة والنص
    fontSize: 16,
    fontWeight: '500',
  },
});
