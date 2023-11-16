import React, { useEffect, useState } from 'react';
import { View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { width } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Text } from '~/components';
import { useAsyncStorage } from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '../components';

const keyExtractor = (item, index) => item + index;

const ListHeaderComponent = () => {
  return <Text style={styles.title}>Learned Words</Text>;
};

const ListFooterComponent = () => {
  return <View style={styles.footer} />;
};

const renderItem = ({ item }) => {
  return (
    <View style={styles.itemContainer}>
      <Text style={styles.item}>{item}</Text>
    </View>
  );
};

const Settings = ({ navigation }) => {
  const { getItem, removeItem } = useAsyncStorage('removedWords');
  const [words, setWords] = useState([]);
  const isFocused = useIsFocused();

  const clean = () => {
    Alert.alert('Are you sure?', 'Do you want to delete all learned words?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          removeItem();
          setWords([]);
        },
      },
    ]);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ opacity: !words?.length ? 0.5 : 1 }}
          disabled={!words?.length}
          onPress={clean}>
          <Icon style={styles.icon} name="trash" type="ionicons" size={20} color={'#fff'} />
        </TouchableOpacity>
      ),
    });
  }, [words]);

  useEffect(() => {
    const getWords = async () => {
      const removedWords = await getItem();
      if (!removedWords) {
        setWords([]);
      }

      if (JSON.stringify(words) !== removedWords) {
        setWords(JSON.parse(removedWords));
      }
    };

    getWords();
  }, [isFocused]);

  return (
    <FlatList
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      data={words}
      // ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      style={styles.container}
      numColumns={3}
    />
  );
};

export default Settings;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: '20@s',
    paddingBottom: 0,
  },
  item: {
    color: '#fff',
    fontSize: '16@s',
    textTransform: 'capitalize',
  },
  title: {
    color: '#fff',
    fontSize: '18@s',
    textTransform: 'capitalize',
    fontWeight: 'bold',
    marginBottom: '20@s',
  },
  itemContainer: {
    width: width / 3,
    justifyContent: 'center',
    marginTop: '20@s',
  },
  footer: {
    height: '40@s',
  },
  icon: {
    marginRight: '16@s',
  },
});
