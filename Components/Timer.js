import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Timer = ({sec, title}) => {

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
  
    let formattedTime = '';
    if (time < 31) {
      formattedTime = seconds.toString().padStart(2, '0');
    } else {
      formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
  
    return formattedTime;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{title}</Text>
      <Text style={styles.timerNums}>{formatTime(sec)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  timerText: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 15, // Adjust text size as needed
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
  timerNums: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 50, // Adjust text size as needed
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default Timer;
