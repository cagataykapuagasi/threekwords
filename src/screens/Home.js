import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon, Text } from '~/components';
import { words as _words } from 'res';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage, { useAsyncStorage } from '@react-native-community/async-storage';

const Home = ({ navigation }) => {
  const [word, setWord] = useState({ name: null, index: null });
  const [words, setWords] = useState([]);
  const { getItem, setItem } = useAsyncStorage('removedWords');

  useEffect(() => {
    AsyncStorage.getItem('words').then((res) => {
      if (res) {
        setWords(JSON.parse(res));
      } else {
        AsyncStorage.setItem('words', JSON.stringify(_words));
        setWords(_words);
      }
    });
  }, []);

  useEffect(() => {
    if (words.length) {
      getRandomWord();
    }
  }, [words]);

  const getRandomWord = () => {
    const number = Math.floor(Math.random() * words.length);

    if (!words[number]) {
      return getRandomWord();
    }

    setWord({ name: words[number], index: number });
  };

  const removeFromList = async () => {
    const newWords = [...words];
    const removedWord = newWords.splice(word.index, 1);

    setWords(newWords);

    AsyncStorage.setItem('words', JSON.stringify(newWords));

    let removedWords = JSON.parse(await getItem());

    if (!removedWords) {
      removedWords = [];
    }

    setItem(JSON.stringify([...removedWords, ...removedWord]));
  };

  const openDetails = () => {
    navigation.navigate('Details', { word });
    //
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.word}>{word.name}</Text>
        <TouchableOpacity style={styles.removeButton} onPress={removeFromList}>
          <Icon name="close-circle" type="ionicons" size={25} color={'#fff'} />
        </TouchableOpacity>
      </View>
      <LinearGradient style={styles.randomButton} colors={['#F17285', '#F26177', colors.primary]}>
        <TouchableOpacity style={styles.button} onPress={openDetails}>
          <Icon name="information-circle-outline" type="ionicons" size={30} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
      <LinearGradient style={styles.randomButton} colors={['#F17285', '#F26177', colors.primary]}>
        <TouchableOpacity style={styles.button} onPress={getRandomWord}>
          <Icon name="reload" type="ionicons" size={25} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Home;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: '20@s',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  word: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: '20@s',
  },
  randomButton: {
    width: '100@s',
    height: '50@s',
    backgroundColor: colors.primary,
    borderRadius: '30@s',
    alignSelf: 'center',
    marginBottom: '40@s',
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeButton: {
    marginLeft: '8@s',
    bottom: '8@s',
  },
});
