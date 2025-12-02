

// import { Ionicons } from '@expo/vector-icons';
// import { Tabs } from 'expo-router';
// import React, { useRef } from 'react';
// import { Animated, Platform } from 'react-native';

// // إنشاء context لتمرير scrollY للشاشات
// export const ScrollYContext = React.createContext<Animated.Value>(new Animated.Value(0));

// export default function TabLayout() {
//   const scrollY = useRef(new Animated.Value(0)).current;

//   // تداخل translateY مع scrollY
//   const tabTranslateY = scrollY.interpolate({
//     inputRange: [0, 50], // كلما نزلت 50 بكسل
//     outputRange: [0, 80], // اختفاء التابس بمقدار 80
//     extrapolate: 'clamp',
//   });

//   return (
//     <ScrollYContext.Provider value={scrollY}>
//       <Tabs
//         screenOptions={{
//           headerShown: false,
//           tabBarShowLabel: false,
//           tabBarStyle: {
//             position: 'absolute',
//             bottom: 20,
//             left: 20,
//             right: 20,
//             height: 60,
//             borderRadius: 15,
//             backgroundColor: 'rgba(255,255,255,0.95)',
//             shadowColor: '#000',
//             shadowOpacity: 0.1,
//             shadowRadius: 10,
//             elevation: 6,
//             transform: [{ translateY: tabTranslateY }] as any,
//             // للـ iOS smooth animation
//             ...(Platform.OS === 'ios' && { zIndex: 10 }),
//           } as any,
//         }}
//       >
//         <Tabs.Screen
//           name="index"
//           options={{
//             tabBarIcon: ({ color, focused }) =>
//               focused ? (
//                 <Ionicons name="home" size={28} color={color} />
//               ) : (
//                 <Ionicons name="home-outline" size={28} color={color} />
//               ),
//         }}
//         />
//         <Tabs.Screen
//           name="search"
//           options={{
//             tabBarIcon: ({ color, focused }) =>
//               focused ? (
//                 <Ionicons name="search" size={28} color={color} />
//               ) : (
//                 <Ionicons name="search-outline" size={28} color={color} />
//               ),
//         }}
//         />
//         <Tabs.Screen
//           name="save"
//           options={{
//             tabBarIcon: ({ color, focused }) =>
//               focused ? (
//                 <Ionicons name="bookmark" size={28} color={color} />
//               ) : (
//                 <Ionicons name="bookmark-outline" size={28} color={color} />
//               ),
//         }}
//         />
//         <Tabs.Screen
//           name="more"
//           options={{
//             tabBarIcon: ({ color, focused }) =>
//               focused ? (
//                 <Ionicons name="apps" size={28} color={color} />
//               ) : (
//                 <Ionicons name="apps-outline" size={28} color={color} />
//               ),
//         }}
//         />
//       </Tabs>
//     </ScrollYContext.Provider>
//   );
// }

import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Platform, StyleSheet } from 'react-native';

// Context لتمرير scrollY
export const ScrollYContext = React.createContext<Animated.Value>(new Animated.Value(0));

// أيقونة متحركة مع تأثير الضغط على الأيقونات الأخرى
const AnimatedTabIcon = ({
  iconName,
  focused,
  isAnyFocused, // أضفتها هنا
}: {
  iconName: string;
  focused: boolean;
  isAnyFocused?: boolean; // اختياري لو مش دايمًا هيتمرر
}) => {
  const scaleAnim = useRef(new Animated.Value(focused ? 1.3 : 1)).current;
  const bgAnim = focused ? 'rgba(108,92,231,0.2)' : 'transparent';

  useEffect(() => {
    Animated.timing(scaleAnim, {
      toValue: focused ? 1.3 : 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [focused]);

  let displayIconName: any = iconName;
  if (iconName === 'home') displayIconName = focused ? 'home' : 'home-outline';
  else if (iconName === 'search') displayIconName = focused ? 'search' : 'search-outline';
  else if (iconName === 'bookmark') displayIconName = focused ? 'bookmark' : 'bookmark-outline';
  else if (iconName === 'apps') displayIconName = focused ? 'apps' : 'apps-outline';

  return (
    <Animated.View
      style={{
        width: 60,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgAnim,
      }}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <Ionicons name={displayIconName} size={28} color={focused ? '#6c5ce7' : '#333'} />
      </Animated.View>
    </Animated.View>
  );
};



export default function TabLayout() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [focusedTab, setFocusedTab] = useState<string>('index');

  // translateY للـ tabBar عند scroll
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
          tabBarStyle: {
            position: 'absolute',
            bottom: 20,
            left: 20,
            right: 20,
            height: 40,
            borderRadius: 15,
            backgroundColor: 'rgba(255,255,255,0.95)',
            shadowColor: '#000',
            shadowOpacity: 0.1,
            shadowRadius: 10,
            elevation: 6,
            transform: [{ translateY: tabTranslateY }] as any,
            ...(Platform.OS === 'ios' && { zIndex: 10 }),
          } as any,
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
                  isAnyFocused={focusedTab !== screen.name}
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
