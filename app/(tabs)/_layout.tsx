import { Tabs } from 'expo-router';
import React from 'react';

import AnimatedTabIcon from '@/components/AnimatedTabIcon';
import { HapticTab } from '@/components/haptic-tab';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >

      {/* HOME */}
    <Tabs.Screen
  name="index"
  options={{
        title: 'الرئيسية',

    tabBarIcon: ({ color, focused }) => (
      <AnimatedTabIcon
        name="house.fill"
        color={color}
        size={28}
        focused={focused}
      />
    ),
  }}
/>


      {/* SEARCH */}
   <Tabs.Screen
  name="search"
  options={{
    title: 'البحث',
    tabBarIcon: ({ color, focused }) => (
      <AnimatedTabIcon
        name="magnifyingglass"
        color={color}
        size={28}
        focused={focused}
      />
    ),
  }}
/>


      {/* SAVE */}
    <Tabs.Screen
  name="save"
  options={{
    title: 'المحفوظ',
    tabBarIcon: ({ color, focused }) => (
      <AnimatedTabIcon
        name="bookmark.fill"
        color={color}
        size={28}
        focused={focused}
      />
    ),
  }}
/>


      {/* MORE */}
<Tabs.Screen
  name="more"
  options={{
    title: 'المزيد',
    tabBarIcon: ({ color, focused }) => (
      <AnimatedTabIcon
        name="ellipsis.horizontal"
        color={color}
        size={28}
        focused={focused}
      />
    ),
  }}
/>


    </Tabs>
  );
}
