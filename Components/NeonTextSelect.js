import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const NeonTextSelect = ({ children }) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.5,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Text
        style={[
          styles.neonText,
          {
            opacity,
          },
        ]}
      >
        {children}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
    backgroundColor: 'black',
    paddingVertical: 5,
  },
  neonText: {
    color: '#39FF14', 
    fontSize: 25,
    fontFamily: 'Orbitron_900Black',
    textShadowColor: 'cyan',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },
});

export default NeonTextSelect;
