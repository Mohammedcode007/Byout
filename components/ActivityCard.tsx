import i18n from '@/i18n';
import React, { useRef } from 'react';
import { Animated, I18nManager, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

interface ActivityCardProps {
  onPress: () => void;
}

export default function ActivityCard({ onPress }: ActivityCardProps) {
  const colorScheme = useColorScheme(); // light / dark
  const translateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(translateAnim, {
        toValue: I18nManager.isRTL ? -8 : 8,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1.03,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(translateAnim, {
        toValue: 0,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const isDark = colorScheme === 'dark';
  const bgColor = isDark ? '#1C1C1E' : '#fff';
  const textColor = isDark ? '#fff' : '#222';
  const descriptionColor = isDark ? '#aaa' : '#666';

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.container}
    >
      <Animated.View
        style={[
          styles.card,
          {
            backgroundColor: bgColor,
            transform: [{ translateX: translateAnim }, { scale: scaleAnim }],
            shadowColor: isDark ? '#000' : '#000',
            shadowOpacity: isDark ? 0.3 : 0.15,
          },
        ]}
      >
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }}
          style={styles.image}
        />

        <View style={{ flex: 1 }}>
          <Text style={[styles.title, { color: textColor }]}>
            {i18n.locale.startsWith('ar')
              ? 'نشاطي'
              : 'My Activity'}
          </Text>
          <Text style={[styles.description, { color: descriptionColor }]}>
            {i18n.locale.startsWith('ar')
              ? 'تعرف على تفاعلاتك الأخيرة داخل التطبيق'
              : 'See your recent interactions inside the app'}
          </Text>

        </View>

        <Text style={[styles.arrow, { color: '#4A90E2' }]}>
          {i18n.locale.startsWith('ar') ? '←' : '→'}
        </Text>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  card: {
    flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
    padding: 16,
    borderRadius: 18,
    alignItems: 'center',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 8,
  },
  image: {
    width: 55,
    height: 55,
    marginRight: I18nManager.isRTL ? 0 : 15,
    marginLeft: I18nManager.isRTL ? 15 : 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 3,
  },
  description: {
    fontSize: 14,
  },
  arrow: {
    fontSize: 22,
    fontWeight: '900',
    marginLeft: I18nManager.isRTL ? 0 : 10,
    marginRight: I18nManager.isRTL ? 10 : 0,
  },
});
