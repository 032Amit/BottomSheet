import {View, Dimensions, StyleSheet} from 'react-native';
import React, {useCallback, useImperativeHandle} from 'react';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
const MAX_TRANSLATE_Y = -SCREEN_HEIGHT + 50;

const BottomSheet = React.forwardRef(({children, updateOpacityCB}, ref) => {
  const translateY = useSharedValue(0);
  const active = useSharedValue(false);

  const context = useSharedValue({y: 0});

  // Created scrollTo method to auto scroll up and down from some certail point of screen.
  const scrollTo = useCallback(destination => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, {damping: 50});
  }, []);

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({scrollTo, isActive}), [scrollTo, isActive]);

  const gesture = Gesture.Pan()
    .onStart(() => {
      // runOnJS(updateOpacityCB)();
      context.value = {y: translateY.value};
    })
    .onUpdate(event => {
      translateY.value = event.translationY + context.value.y;
      translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
    })
    .onEnd(() => {
      if (translateY.value > -SCREEN_HEIGHT / 2) {
        scrollTo(0);
      } else if (translateY.value < -SCREEN_HEIGHT / 1.5) {
        scrollTo(0);
      }
    });

  const bottomSheetStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.rootContainer, bottomSheetStyle]}>
        <View style={styles.lineStyle} />
        {children}
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  rootContainer: {
    opacity: Animated.add(0.1, Animated.multiply(2, 1.0)),
    height: SCREEN_HEIGHT,
    width: '100%',
    borderRadius: 20,
    position: 'absolute',
    backgroundColor: '#fff',
    top: SCREEN_HEIGHT,
  },
  lineStyle: {
    width: 110,
    height: 8,
    borderRadius: 5,
    alignSelf: 'center',
    marginVertical: -15,
    backgroundColor: '#000',
  },
});

export default BottomSheet;
