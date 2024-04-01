import { React, useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

const App = () => {
  const [data, setData] = useState([
    {name: 'John', age: 30, key: '1'},
    {name: 'Doe', age: 25, key: '2'},
    {name: 'Smith', age: 32, key: '3'},
    {name: 'Alex', age: 28, key: '4'},
    {name: 'Max', age: 35, key: '5'},
    {name: 'Tom', age: 27, key: '6'},
    {name: 'Jerry', age: 29, key: '7'},
    {name: 'Mickey', age: 31, key: '8'},
    {name: 'Donald', age: 33, key: '9'},
  ]);

  return (
    <View style={styles.container}>
      <ScrollView>
        {data.map((item) => (
          <View key={item.key}>
            <Text style={styles.item}>
              Name: {item.name}, Age: {item.age}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  item: {
    fontSize: 20,
    backgroundColor: 'lightgray',
    marginTop: 40,
    padding: 20,
  },
});

export default App;
