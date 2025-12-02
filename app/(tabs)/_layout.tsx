

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Platform, StyleSheet } from 'react-native';

// Context لتمرير scrollY
export const ScrollYContext = React.createContext<Animated.Value>(new Animated.Value(0));

// أيقونة متحركة مع تأثير الضغط على الأيقونات الأخرى
const AnimatedTabIcon = ({
  iconName,
  focused,
}: {
  iconName: string;
  focused: boolean;
}) => {
  const scaleAnim = useRef(new Animated.Value(focused ? 1.3 : 1)).current;
  const fadeAnim = useRef(new Animated.Value(focused ? 1 : 0)).current;

  const widthAnim = useRef(new Animated.Value(focused ? 90 : 50)).current; // ضبط العرض
  const bgWidthAnim = useRef(new Animated.Value(focused ? 0 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(scaleAnim, {
        toValue: focused ? 1.3 : 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: focused ? 1 : 0,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(widthAnim, {
        toValue: focused ? 90 : 50,
        duration: 230,
        useNativeDriver: false,
      }),
      Animated.timing(bgWidthAnim, {
        toValue: focused ? 1 : 0,
        duration: 500,
        easing: Easing.out(Easing.exp),
        useNativeDriver: false,
      }),
    ]).start();
  }, [focused]);

  // تدرج عرض الخلفية
  const backgroundWidth = bgWidthAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  let displayIconName: any = iconName;
  if (iconName === 'home') displayIconName = focused ? 'home' : 'home-outline';
  else if (iconName === 'search') displayIconName = focused ? 'search' : 'search-outline';
  else if (iconName === 'bookmark') displayIconName = focused ? 'bookmark' : 'bookmark-outline';
  else if (iconName === 'apps') displayIconName = focused ? 'apps' : 'apps-outline';

  const labels: any = {
    home: "الرئيسية",
    search: "البحث",
    bookmark: "حفظ",
    apps: "المزيد",
  };

  return (
    <Animated.View
      style={{
        width: 80,
        height: 44,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* الخلفية المتحركة */}
      <Animated.View
        style={{
          position: 'absolute',
          alignItems: 'center',
          justifyContent: 'center',
          top: 0,
          bottom: 0,
          width: backgroundWidth,
          backgroundColor: 'rgba(108,92,231,0.15)',
          borderRadius: 25, // مهم لحواف ناعمة
        }}
      />

      {/* محتوى التاب */}
      <Animated.View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}
      >
        <Animated.View style={{ transform: [{ scale: scaleAnim }], marginLeft: 20 }}>
          <Ionicons
            name={displayIconName}
            size={18}
            color={focused ? '#6c5ce7' : '#333'}
          />
        </Animated.View>

        <Animated.Text
          style={{
            marginLeft: 4,
            opacity: fadeAnim,
            color: '#6c5ce7',
            fontSize: 10,
            fontWeight: '600',
          }}
        >
          {labels[iconName]}
        </Animated.Text>
      </Animated.View>
    </Animated.View>
  );
};

export default function TabLayout() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [focusedTab, setFocusedTab] = useState<string>('index');

  const tabTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, 80],
    extrapolate: 'clamp',
  });

  const screens = [
    { name: 'index', icon: 'home' },
    { name: 'search', icon: 'search' },
    { name: 'save', icon: 'bookmark' },
    { name: 'more', icon: 'apps' },
  ];

  return (
    <ScrollYContext.Provider value={scrollY}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            width: 'auto',
            paddingHorizontal: 0,
            marginHorizontal: 0,
            marginTop: 10,

            justifyContent: 'center',
            alignItems: 'center',
          },
          tabBarStyle: {
            position: 'absolute',
            bottom: 30,
            marginLeft: 10,
            marginRight: 10,
            left: 10,   // مسافة من الحافة
            right: 10,  // مسافة من الحافة
            height: 60,
            borderRadius: 25,
            backgroundColor: 'rgba(255,255,255,0.95)',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 6,
            transform: [{ translateY: tabTranslateY }] as any,
            justifyContent: 'center',
            alignItems: 'center',
            ...(Platform.OS === 'ios' && { zIndex: 10 }),
          },
        }}
      >
        {screens.map((screen) => (
          <Tabs.Screen
            key={screen.name}
            name={screen.name}
            options={{
              tabBarIcon: ({ focused }) => (
                <AnimatedTabIcon
                  iconName={screen.icon}
                  focused={focused}
                />
              ),
            }}
            listeners={{
              tabPress: () => setFocusedTab(screen.name),
            }}
          />
        ))}
      </Tabs>
    </ScrollYContext.Provider>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    height: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
