// // Fallback for using MaterialIcons on Android and web.

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// import { SymbolWeight, SymbolViewProps } from 'expo-symbols';
// import { ComponentProps } from 'react';
// import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native';

// type IconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>;
// type IconSymbolName = keyof typeof MAPPING;

// /**
//  * Add your SF Symbols to Material Icons mappings here.
//  * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
//  * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
//  */
// const MAPPING = {
//   'house.fill': 'home',
//   'paperplane.fill': 'send',
//   'chevron.left.forwardslash.chevron.right': 'code',
//   'chevron.right': 'chevron-right',
// } as IconMapping;

// /**
//  * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
//  * This ensures a consistent look across platforms, and optimal resource usage.
//  * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
//  */
// export function IconSymbol({
//   name,
//   size = 24,
//   color,
//   style,
// }: {
//   name: IconSymbolName;
//   size?: number;
//   color: string | OpaqueColorValue;
//   style?: StyleProp<TextStyle>;
//   weight?: SymbolWeight;
// }) {
//   return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
// }

// src/components/ui/icon-symbol.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

/**
 * خريطة الأيقونات:
 * - SF Symbols (iOS) -> MaterialIcons (Android/Web)
 */
const MAPPING = {
  'house.fill': 'home',
  'magnifyingglass': 'search',       // Search tab
  'bookmark.fill': 'bookmark',       // Save tab
  'ellipsis.horizontal': 'more-horiz', // More tab
  'gearshape.fill': 'settings',      // Settings tab
} as const;

export type IconSymbolName = keyof typeof MAPPING;

interface IconSymbolProps {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
}

/**
 * IconSymbol component
 * يستخدم SF Symbols على iOS، وMaterial Icons على Android/Web
 */
export function IconSymbol({ name, size = 24, color, style }: IconSymbolProps) {
  return <MaterialIcons name={MAPPING[name]} size={size} color={color} style={style} />;
}
