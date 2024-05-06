import { ScrollView, Text } from 'react-native';
import EnemyInitiative from "../Components/EnemyInitiative";

const MissionIntro = ({ route }) => {
  const { selectedMercenaries, mission } = route.params;
  const enemies = mission.enemies;
  const mercenaries = selectedMercenaries;
  let counter = 0;

  console.log('mission', mission);
  console.log('enemies', enemies);
  console.log('mercenaries', mercenaries);

  return (
    <ScrollView>
      {enemies.map((enemy, index) => (
        counter = 0,
        Array.from({ length: enemy.quantity }).map((_, i) => (
          counter+=1,
          <EnemyInitiative key={`${index}-${i}`} id={counter} enemy={enemy} />
        ))
      ))}
      <Text>Objective:</Text>
    </ScrollView>
  )
}

export default MissionIntro;
