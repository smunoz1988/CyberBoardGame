import { ScrollView, Text } from 'react-native';
import EnemyInitiative from "../Components/EnemyInitiative";

const MissionIntro = ({ route }) => {
  const { selectedMercenaries, mission } = route.params;
  const enemies = mission.enemies;
  let counter = 0;

// Convert mercenaries object to an array with type annotation
const mercenaryArray = Object.keys(selectedMercenaries).map(key => ({
  type: 'mercenary',
  name: selectedMercenaries[key]
}));

// Convert enemies array to include a type property
const typedEnemies = enemies.map(enemy => ({
  ...enemy,
  type: 'enemy'
}));

// Combine both arrays into one
const combinedArray = [...typedEnemies, ...mercenaryArray];

// Output the combined array to console
console.log(combinedArray);

  return (
    <ScrollView>
      <Text style={style.clock}>tiempo atras</Text>
      {combinedArray.map((character, index) => {
        if (character.type === 'enemy') {
          return Array.from({ length: character.quantity }).map((_, i) => {
            return <EnemyInitiative key={`${index}-${i}`} id={i + 1} enemy={character} />;
          });
        } else {
          return <Text key={index}>{character.name}</Text>;
        }
      })}
      <Text>Objective:</Text>
    </ScrollView>
  )
}

const style = {
  clock: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50
  }
}

export default MissionIntro;
