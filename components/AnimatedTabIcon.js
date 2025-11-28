import { IconSymbol } from '@/components/ui/icon-symbol';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

export default function AnimatedTabIcon({ name, color, size, focused }) {

  // الأيقونة
  const iconScale = useSharedValue(1);
  const iconOpacity = useSharedValue(1);

  // المربعات
  const squareOpacity = useSharedValue(0);
  const squareScale = useSharedValue(0.4);
  const squareShift = useSharedValue(14);     // حركة أقوى

  // النجمة
  const starOpacity = useSharedValue(0);
  const starScale = useSharedValue(0.4);
  const starY = useSharedValue(0);

  useEffect(() => {
    if (focused) {

      // الأيقونة
      iconScale.value = withSpring(1.18);
      iconOpacity.value = withTiming(0.75, { duration: 220 }); // شفافية بسيطة

      // المربعات تتحرك + تكبر
      squareOpacity.value = withTiming(1, { duration: 200 });
      squareScale.value = withSpring(1);
      squareShift.value = withSpring(0); // انزلاق للمركز

      // النجمة
      starOpacity.value = withTiming(1, { duration: 250 });
      starScale.value = withSpring(1);

      // حركة مستمرة لأعلى ولأسفل
      starY.value = withRepeat(
        withTiming(-12, { duration: 900 }),
        -1,
        true
      );

    } else {

      iconScale.value = withSpring(1);
      iconOpacity.value = withTiming(1);

      squareOpacity.value = withTiming(0, { duration: 150 });
      squareScale.value = withTiming(0.4);
      squareShift.value = withTiming(14);

      starOpacity.value = withTiming(0, { duration: 150 });
      starScale.value = withTiming(0.4);
      starY.value = withTiming(0);
    }
  }, [focused]);


  // ستايل الأيقونة
  const iconStyle = useAnimatedStyle(() => ({
    opacity: iconOpacity.value,
    transform: [{ scale: iconScale.value }],
  }));


  // مربع يسار
  const squareLeft = useAnimatedStyle(() => ({
    opacity: squareOpacity.value,
    transform: [
      { scale: squareScale.value },
      { translateX: -squareShift.value }, // يتحرك من اليسار
      { rotate: '-22deg' }
    ],
  }));

  // مربع يمين
  const squareRight = useAnimatedStyle(() => ({
    opacity: squareOpacity.value,
    transform: [
      { scale: squareScale.value },
      { translateX: squareShift.value }, // يتحرك من اليمين
      { rotate: '22deg' }
    ],
  }));

  // النجمة
  const starStyle = useAnimatedStyle(() => ({
    opacity: starOpacity.value,
    transform: [
      { scale: starScale.value },
      { translateY: starY.value }
    ],
  }));


  return (
    <View style={{ width: size + 40, height: size + 40, justifyContent: 'center', alignItems: 'center' }}>

      {/* مربع يسار */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: size + 10,
            height: size + 10,
            borderRadius: 10,
            backgroundColor: '#FFD86B',
          },
          squareLeft,
        ]}
      />

      {/* مربع يمين */}
      <Animated.View
        style={[
          {
            position: 'absolute',
            width: size + 10,
            height: size + 10,
            borderRadius: 10,
            backgroundColor: '#6BD6FF',
          },
          squareRight,
        ]}
      />

      {/* النجمة */}
      <Animated.Text
        style={[
          {
            position: 'absolute',
            fontSize: size - 6,
            color: '#FFB800',
          },
          starStyle,
        ]}
      >
        ★
      </Animated.Text>

      {/* الأيقونة */}
      <Animated.View style={iconStyle}>
        <IconSymbol name={name} size={size} color={color} />
      </Animated.View>

    </View>
  );
}
