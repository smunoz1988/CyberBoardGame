import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';

const NeonText = ({ children }) => {
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
    padding: 10,
    backgroundColor: '#000',
    alignItems: 'center',
    margin: 10,
  },
  neonText: {
    color: '#0FF', 
    fontSize: 20,
    fontFamily: 'Orbitron_900Black',
    textShadowColor: 'cyan',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default NeonText;
