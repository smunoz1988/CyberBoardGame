import { ScrollView, Text } from 'react-native';
import EnemyInitiative from "../Components/EnemyInitiative";
import MercenaryInitiative from '../Components/MercenaryInitiative';

const MissionIntro = ({ route }) => {
  const { selectedMercenaries, mission } = route.params;
  const enemies = mission.enemies;

// Convert mercenaries object to an array with type annotation
const mercenaryArray = Object.keys(selectedMercenaries).map(key => ({
  type: 'mercenary',
  name: selectedMercenaries[key]
}));

// Convert enemies array to include a type property
const typedEnemies = enemies.flatMap(enemy =>
  Array.from({ length: enemy.quantity }).map((_, i) => ({
    type: 'enemy',
    name: enemy.name,
    enemyId: i + 1,
    hp: enemy.hp,
  }))
);

// Combine both arrays into one
const combinedArray = [...typedEnemies, ...mercenaryArray];

// Output the combined array to console
console.log(combinedArray);

  return (
    <ScrollView>
      <Text style={style.clock}>tiempo atras</Text>
      {combinedArray.map((character, index) => {
        if (character.type === 'enemy') {
          return <EnemyInitiative key={index} enemy={character} />;
        } else {
          return <MercenaryInitiative key={index} mercenary={character} />
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
