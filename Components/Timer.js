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
    marginBottom: 40,
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
    marginBottom: 20,
  },
  TouchableOpacityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    backgroundColor: '#bb00ff',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
    width: 80,
  },
  buttonText: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 16, // Adjust text size as needed
    textShadowColor: 'white',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },
});

export default Timer;
