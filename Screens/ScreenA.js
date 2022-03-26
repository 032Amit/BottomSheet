import React, {useCallback, useRef, useState, useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import BottomSheet from '../components/BottomSheet';
import bottomSheetList from '../bottomSheetList';
import Screens from '../navigation/Screens';

const ScreenA = ({navigation, route}) => {
  const isDarkMode = useColorScheme() === 'dark';

  const [isBSActive, setIsBSActive] = useState(false);

  const ref = useRef(null);

  const updateOpacityCB = () => {
    const isActive = ref?.current?.isActive();
    console.log('Bottom sheet callback called...', isActive);
    if (!isActive) {
      setIsBSActive(false);
    } else {
      setIsBSActive(true);
    }
  };

  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
      setIsBSActive(false);
    } else {
      ref?.current?.scrollTo(-400);
      setIsBSActive(true);
    }
  }, []);

  const navigateNext = () => {
    navigation.navigate(Screens.ScreenB);
    ref?.current?.scrollTo(0);
    setIsBSActive(false);
  };

  return (
    <View
      style={[
        styles.container,
        isBSActive ? {backgroundColor: 'rgba(0,0,0,.6)'} : {},
      ]}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Text style={styles.btnText}>Open Sheet</Text>
      </TouchableOpacity>
      <BottomSheet ref={ref} updateOpacityCB={updateOpacityCB}>
        <View style={styles.listContainer}>
          {bottomSheetList.map(item => {
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.bottomList}
                onPress={navigateNext}>
                <Image source={item.src} />
                <View style={styles.txtContainer}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.desc}>{item.desc}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>
      </BottomSheet>
    </View>
  );
};

export default ScreenA;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    opacity: 1,
    backgroundColor: '#E8E8E8',
    alignItems: 'center',
  },
  button: {
    width: 120,
    padding: 10,
    borderRadius: 10,
    marginVertical: 100,
    backgroundColor: '#000',
  },
  btnText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
  },
  listContainer: {
    marginVertical: 30,
    marginHorizontal: 10,
  },
  bottomList: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 10,
  },
  txtContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginHorizontal: 20,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'Manrope-ExtraBold',
  },
  desc: {
    fontSize: 12,
    fontFamily: 'Manrope-Bold',
  },
});
