// import { Tabs } from 'expo-router';
// import React from 'react';

// import AnimatedTabIcon from '@/components/AnimatedTabIcon';
// import { HapticTab } from '@/components/haptic-tab';
// import { Colors } from '@/constants/theme';
// import { useColorScheme } from '@/hooks/use-color-scheme';

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//       }}
//     >

//       {/* HOME */}
//     <Tabs.Screen
//   name="index"
//   options={{
//         title: 'الرئيسية',

//     tabBarIcon: ({ color, focused }) => (
//       <AnimatedTabIcon
//         name="house.fill"
//         color={color}
//         size={28}
//         focused={focused}
//       />
//     ),
//   }}
// />


//       {/* SEARCH */}
//    <Tabs.Screen
//   name="search"
//   options={{
//     title: 'البحث',
//     tabBarIcon: ({ color, focused }) => (
//       <AnimatedTabIcon
//         name="magnifyingglass"
//         color={color}
//         size={28}
//         focused={focused}
//       />
//     ),
//   }}
// />


//       {/* SAVE */}
//     <Tabs.Screen
//   name="save"
//   options={{
//     title: 'المحفوظ',
//     tabBarIcon: ({ color, focused }) => (
//       <AnimatedTabIcon
//         name="bookmark.fill"
//         color={color}
//         size={28}
//         focused={focused}
//       />
//     ),
//   }}
// />


//       {/* MORE */}
// <Tabs.Screen
//   name="more"
//   options={{
//     title: 'المزيد',
//     tabBarIcon: ({ color, focused }) => (
//       <AnimatedTabIcon
//         name="ellipsis.horizontal"
//         color={color}
//         size={28}
//         focused={focused}
//       />
//     ),
//   }}
// />


//     </Tabs>
//   );
// }
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React from 'react';
import { GestureResponderEvent, Pressable, PressableProps } from 'react-native';

// TabBarButton بدون ref خارجي
const TabBarButton: React.FC<PressableProps> = (props) => {
  const handlePress = (event: GestureResponderEvent) => {
    Haptics.selectionAsync();
    props.onPress?.(event);
  };

  return (
    <Pressable
      {...props}
      onPress={handlePress}
      style={({ pressed }) => [
        props.style as object, // اجعل props.style من النوع الصحيح
        pressed ? { opacity: 0.7 } : {},
      ]}
    />
  );
};


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: (props) => <TabBarButton {...props} />,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: 45,
          borderRadius: 15,
          marginLeft:20,
          marginRight:20,
          backgroundColor:
            colorScheme === 'dark'
              ? 'rgba(30,30,30,0.95)'
              : 'rgba(255,255,255,0.95)',
          shadowColor: '#000',
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 6,
        },
      }}
    >

      {/* HOME */}
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="home" size={28} color={color} />
            ) : (
              <Ionicons name="home-outline" size={28} color={color} />
            ),
        }}
      />

      {/* SEARCH */}
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="search" size={28} color={color} />
            ) : (
              <Ionicons name="search-outline" size={28} color={color} />
            ),
        }}
      />

      {/* SAVE */}
      <Tabs.Screen
        name="save"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="bookmark" size={28} color={color} />
            ) : (
              <Ionicons name="bookmark-outline" size={28} color={color} />
            ),
        }}
      />

      {/* MORE */}
      <Tabs.Screen
        name="more"
        options={{
          tabBarIcon: ({ color, focused }) =>
            focused ? (
              <Ionicons name="apps" size={28} color={color} />
            ) : (
              <Ionicons name="apps-outline" size={28} color={color} />
            ),
        }}
      />

    </Tabs>
  );
}
