import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Animated, TouchableOpacity, ImageBackground } from 'react-native';
import PagerView from 'react-native-pager-view';
import missions from '../GameData/missions';
import Enemy1Image from '../assets/tech-soldier.png';
import Enemy2Image from '../assets/iron-caveman.png';
// import TemploMap from '../assets/templo-map.png';

function MissionScreen({ route, navigation }) {
  const { playerNames } = route.params;
  const [mission, setMission] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const moveAnimation = useRef(new Animated.Value(0)).current;

  const onPageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const renderPagination = () => {
    return mission.enemies.map((_, index) => (
      <Text key={index} style={index === currentPage ? styles.activeDot : styles.dot}>{index+1}</Text>
    ));
  };

  useEffect(() => {
    const loadMission = () => {
      const selectedMission = missions[Math.floor(Math.random() * missions.length)];
      const selectedObjective = selectedMission.objectives[Math.floor(Math.random() * selectedMission.objectives.length)];

      const enemiesWithImages = selectedObjective.enemies.map(enemy => {
        let image;
        switch (enemy.image) {
          case 'Enemy1Image':
            image = Enemy1Image;
            break;
          case 'Enemy2Image':
            image = Enemy2Image;
            break;
          default:
            image = Enemy1Image;
        }
        return { ...enemy, image };
      });

      setMission({
        ...selectedMission,
        objective: selectedObjective.objective,
        enemies: enemiesWithImages, 
      });
    };

    loadMission();
  }, [route.params]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(moveAnimation, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        }),
        Animated.timing(moveAnimation, {
          toValue: 0,
          duration: 10000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [moveAnimation]);

  const movingMargin = moveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 50], 
  });

  return (
    <ScrollView style={styles.container}>
      <Animated.Image
        source={require('../assets/mission-background.jpg')}
        style={[
          styles.backgroundImage,
          {
            transform: [
              {
                translateX: movingMargin,
              },
            ],
          },
        ]}
        resizeMode="cover"
      />
        {mission && (
          <View style={styles.missionContainer}>
            <Text style={styles.missionTitle}>Mission: {mission.name}</Text>
            <Text style={styles.missionDescription}>{mission.description}</Text>
            <Text style={styles.missionObjective}>Objective:</Text>
            <Text style={styles.missionDescription}>{mission.objective}</Text>
            <Text style={styles.missionObjective}>Enemy units:</Text>
            {/* {mission.enemies.map((enemy, index) => (
              <ImageBackground 
                key={index}
                source={require('../assets/enemies_cards_background.png')} 
                style={styles.enemyContainer}
                resizeMode="contain"
              >
                <Text style={styles.enemyInfo}>{enemy.name}</Text>
                <Image source={enemy.image} style={styles.enemyImage} />
                <Text style={styles.enemyInfo}>Quantity: {enemy.quantity}</Text>
                <Text style={styles.enemyInfo}>HP: {enemy.hp} </Text>
              </ImageBackground>
            ))} */}
            <View style={styles.containerPager}>
              <PagerView style={styles.pageCont} initialPage={0} onPageSelected={onPageSelected}>
                {mission.enemies.map((enemy, index) => (
                  <View style={styles.page} key={index}>
                    <ImageBackground 
                      source={require('../assets/enemies_cards_background.png')} 
                      style={styles.enemyContainer}
                      resizeMode="contain"
                    >
                      <Text style={styles.enemyInfo}>{enemy.name}</Text>
                      <Image source={enemy.image} style={styles.enemyImage} />
                      <Text style={styles.enemyInfo}>Quantity: {enemy.quantity}</Text>
                      <Text style={styles.enemyInfo}>HP: {enemy.hp}</Text>
                    </ImageBackground>
                  </View>
                ))}
              </PagerView>
              <View style={styles.paginationWrapper}>
                {renderPagination()}
              </View>
            </View>
            <Text style={styles.missionObjective}>Map:</Text>
            <Image source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRspkQWM_CO2-MTC0bedTLyMe5z0_6rI_S1g7PdvbY_zQ&s' }} style={styles.level} />
          </View>
        )}
        <TouchableOpacity
          style={[styles.startButton, playerNames.includes('') ? styles.buttonDisabled : null]}
          onPress={() => navigation.navigate('Mercenary', { playerNames, mission })}
          disabled={playerNames.includes('')}>
          <Text style={styles.startButtonText}>Select Mercenaries</Text>
        </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  pageCont: {
    flex: 1,
  },
  page: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#121212', 
  },
  containerPager: {
    flex: 1,
    height: '100%',
  },
  paginationWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  dot: {
    color: 'gray',
    margin: 3,
  },
  activeDot: {
    color: '#0f0',
    marginHorizontal: 3,
    fontSize: 20,
    fontWeight: 'bold',
  },
  backgroundImage: {
    position: 'absolute', 
    width: '150%', 
    height: '100%', 
    top: 0,
    left: '-20%',
    right: 0,
    bottom: 0,
    zIndex: -1,
    opacity: 0.5,
  },
  missionContainer: {
    marginTop: 50,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#1e1e1e', // Slightly lighter dark shade for the panel
    borderRadius: 8,
    borderStyle: 'solid',
    borderColor: '#39FF14', // Neon green border
    borderWidth: 2,
    opacity: 0.8,
  },
  missionTitle: {
    padding: 10,
    paddingBottom: 20,
    fontSize: 25,
    fontFamily: 'Orbitron_900Black',
    color: '#0f0',
    textAlign: 'center',
  },
  missionDescription: {
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    color: 'white',
    width: '100%',
  },
  missionObjective: {
    paddingVertical: 20,
    fontSize: 16,
    fontFamily: 'Orbitron_400Regular',
    color: '#0f0',
    width: '100%',
  },
  enemyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    width: 250,
    height: 250,
  },
  enemyInfo: {
    fontFamily: 'Orbitron_400Regular',
    color: 'white',
    fontSize: 12,
    textAlign: 'center',
  },
  enemyImage: {
    width: 50,
    height: 50,
    marginTop: 5,
  },
  level: {
    marginTop: 20,
    width: 250,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  startButton: {
    backgroundColor: '#39FF14',
    opacity: 0.8,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center', // Center text horizontally
    justifyContent: 'center', // Center text vertically
    height: 50, // Set a fixed height
    opacity: 0.8, // You can adjust the opacity for disabled state as needed
    margin: 20,
  },
  startButtonText: {
    fontFamily: 'Orbitron_900Black',
    color: 'white',
    fontSize: 16, // Adjust text size as needed
  },
  buttonDisabled: {
    backgroundColor: '#ccc'
  },
});

export default MissionScreen;
