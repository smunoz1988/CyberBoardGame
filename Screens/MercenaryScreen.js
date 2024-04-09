import { Text, ScrollView, StyleSheet, View } from "react-native";
import mercenaries from "../GameData/mercenaries";

const MercenaryScreen = ({ route }) => {
  const { playerNames, mission } = route.params;
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text>Players:</Text>
        {playerNames.map((name, index) => (
          <Text key={index} style={styles.playerName}>
            Player {index + 1}: {name}
          </Text>
        ))}
      <Text>Mission: {mission.name}</Text>
      <Text>Objective: {mission.objective}</Text>
      <Text>Choose your Mercenary</Text>
      {mercenaries.map((mercenary) => (
        <View key={mercenary.id} style={styles.heroCard}>
          <Text>{mercenary.name}</Text>
          <Text>Health: {mercenary.health}</Text>
          {mercenary.styles.map((style, index) => (
            <View key={index}>
              <Text>{style}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: 20,
  },
  playerName: {
    color: 'black',
    fontSize: 20,
  },
  heroCard: {
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    padding: 10,
    width: '90%',
  },
});

export default MercenaryScreen;
