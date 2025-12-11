// ThreeSplashScreens.tsx
import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface SplashItemProps {
  title: string;
  subtitle: string;
  image?: ImageSourcePropType;
  onNext: () => void;
  showButton: boolean;
}

const SplashItem: React.FC<SplashItemProps> = ({
  title,
  subtitle,
  image,
  onNext,
  showButton,
}) => {
  return (
    <View style={styles.splashContainer}>
      {image ? (
        <Image source={image} style={styles.image} resizeMode="contain" />
      ) : null}

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>

      {showButton ? (
        <TouchableOpacity style={styles.button} onPress={onNext}>
          <Text style={styles.buttonText}>التالي</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

interface ThreeSplashScreensProps {
  onFinish: () => void;
}

const ThreeSplashScreens: React.FC<ThreeSplashScreensProps> = ({ onFinish }) => {
  const [index, setIndex] = useState<number>(0);
  const fade = useRef(new Animated.Value(0)).current;

const items = [
  {
    title: 'مرحباً بك في التطبيق',
    subtitle: 'شاشة سبلاش 1 — مقدمة قصيرة',
    image: require('@/assets/images/splash.png'),
  },
  {
    title: 'المزايا',
    subtitle: 'شاشة سبلاش 2 — شرح المزايا الأساسية',
    image: require('@/assets/images/splash.png'),
  },
  {
    title: 'لنبدأ',
    subtitle: 'شاشة سبلاش 3 — استعد للاستخدام',
    image: require('@/assets/images/splash.png'),
  },
];


  const DURATION = 2000;

  useEffect(() => {
    Animated.timing(fade, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      goNext();
    }, DURATION);

    return () => {
      clearTimeout(timer);
      fade.setValue(0);
    };
  }, [index]);

  const goNext = () => {
    Animated.timing(fade, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      if (index < items.length - 1) {
        setIndex((i) => i + 1);
      } else {
        onFinish();
      }
    });
  };

  return (
    <Animated.View style={[styles.wrapper, { opacity: fade }]}>
      <SplashItem
        title={items[index].title}
        subtitle={items[index].subtitle}
        image={items[index].image}
        onNext={goNext}
        showButton={index === items.length - 1}
      />

      <View style={styles.dots}>
        {items.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i === index ? styles.dotActive : styles.dotInactive,
            ]}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.skip} onPress={onFinish}>
        <Text style={styles.skipText}>تخطي</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default ThreeSplashScreens;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashContainer: {
    width,
    height,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: width * 0.6,
    height: height * 0.35,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 30,
    backgroundColor: '#0b5cff',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
  },
  dots: {
    position: 'absolute',
    bottom: 80,
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 10,
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#0b5cff',
  },
  dotInactive: {
    backgroundColor: '#ddd',
  },
  skip: {
    position: 'absolute',
    top: 40,
    right: 16,
    padding: 8,
  },
  skipText: {
    fontSize: 14,
    color: '#555',
  },
});
