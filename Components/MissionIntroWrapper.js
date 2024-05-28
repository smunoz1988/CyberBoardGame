import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import MissionIntro from '../Screens/MissionIntro';

const MissionIntroWrapper = ({ navigation, route }) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Warning", "If you exit, you will lose the game. Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => navigation.navigate('CyberBoardGame') },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [navigation]);

  return <MissionIntro navigation={navigation} route={route} />;
};

export default MissionIntroWrapper;
