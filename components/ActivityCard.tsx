import React, { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, useColorScheme, View } from 'react-native';

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
        toValue:  -8 ,
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
              نشاطي
          </Text>
          <Text style={[styles.description, { color: descriptionColor }]}>
              تعرف على تفاعلاتك الأخيرة داخل التطبيق
          </Text>

        </View>

        <Text style={[styles.arrow, { color: '#4A90E2' }]}>
           ←
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
    flexDirection: 'row-reverse' ,
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
    marginRight:  0 
  },
  title: {
    textAlign:'right',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 3,
            marginRight:10

  },
  description: {
    fontSize: 14,
        textAlign:'right',
        marginRight:10

  },
  arrow: {
    fontSize: 22,
    fontWeight: '900',
    marginLeft:  0
  },
});
