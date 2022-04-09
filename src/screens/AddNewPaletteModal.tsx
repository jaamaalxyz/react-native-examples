import { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../data';

const AddNewPaletteModal = ({ navigation }: any) => {
  const [name, setName] = useState('');
  const [selectedColors, setSelectedColors] = useState([]);

  const handleUpdate = useCallback(
    (color: any, newValue: boolean) => {
      if (newValue === true) {
        setSelectedColors((current: any[]): any => [...current, color]);
      } else {
        setSelectedColors((current) =>
          current.filter((c: any) => c.colorName !== color.colorName),
        );
      }
    },
    [setSelectedColors],
  );

  const handleSubmit = useCallback(() => {
    if (!name) {
      Alert.alert('Please add a name to your color palette');
    } else if (selectedColors.length < 3) {
      Alert.alert('Please choose at least 3 colors');
    } else {
      navigation.navigate('Home', {
        newPalette: { paletteName: name, colors: selectedColors },
      });
    }
  }, [name, selectedColors, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.heading}>
        <Text>Name of your color palette</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />
      </View>
      <FlatList
        style={styles.list}
        data={COLORS}
        keyExtractor={(item) => item.colorName}
        renderItem={({ item }) => (
          <View style={styles.switch}>
            <Text>{item.colorName}</Text>
            <Switch
              value={
                !!selectedColors.find(
                  (color: any) => color.colorName === item.colorName,
                )
              }
              onValueChange={(newValue) => handleUpdate(item, newValue)}
            />
          </View>
        )}
      />
      <TouchableOpacity style={styles.buttonWrapper} onPress={handleSubmit}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Submit!</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: 'grey',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  list: {
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  heading: {
    padding: 10,
  },
  buttonWrapper: {
    height: 100,
    marginHorizontal: 10,
  },
  button: {
    height: 40,
    backgroundColor: 'teal',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default AddNewPaletteModal;
