import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { images, fonts, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon, Text } from '~/components';
import { words as _words, width, height } from 'res';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-community/async-storage';
import { getWordInformation } from '~/api/Word';
import ContentLoader, { Rect, Circle } from 'react-content-loader/native';

const Details = ({
  route: {
    params: { word },
  },
  navigation,
}) => {
  const [detail, setDetail] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigation.setOptions({ title: word.name });

    getWordInformation(word.name).then((res) => {
      setDetail(res);
      console.log(res);
    });
  }, []);

  useEffect(() => {
    if (detail) {
      // setLoading(false);
    }
  }, [detail]);

  if (!detail) {
    return (
      <View style={styles.flex}>
        <MyLoader />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.flex}>
      <ScrollView style={styles.flex}>
        <View style={styles.container}>
          {/* <Text style={styles.word}>{word.name}</Text> */}
          {detail ? (
            detail?.[0]?.meanings?.map((item) => {
              return (
                <View key={item.partOfSpeech} style={styles.meanings}>
                  <Text style={styles.partOfSpeech}>{item.partOfSpeech}</Text>
                  {item?.definitions?.map((i, index) => (
                    <View key={index} style={styles.definations}>
                      <Text style={styles.title}>Defination</Text>
                      <Text style={styles.defination}>{i.definition}</Text>
                      <Text style={styles.title}>Examples</Text>
                      <Text style={styles.defination}>{i.example}</Text>
                      {i?.synonyms?.length ? (
                        <>
                          <Text style={styles.title}>Synonyms</Text>
                          <Text style={styles.defination}>
                            {JSON.stringify(i.synonyms)
                              .replace(/["[]/g, '')
                              .replace(']', '')
                              .replace(/[,]/g, ', ')}
                          </Text>
                        </>
                      ) : null}
                      {i?.antonyms?.length ? (
                        <>
                          <Text style={styles.title}>Antonyms</Text>
                          <Text style={styles.defination}>
                            {JSON.stringify(i.antonyms)
                              .replace(/["[]/g, '')
                              .replace(']', '')
                              .replace(/[,]/g, ', ')}
                          </Text>
                        </>
                      ) : null}
                    </View>
                  ))}
                </View>
              );
            })
          ) : (
            <MyLoader />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Details;

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: '20@s',
    justifyContent: 'center',
  },
  flex: {
    flex: 1,
    backgroundColor: '#000',
  },
  meanings: {
    width: '100%',
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: '20@s',
    marginTop: '20@s',
    borderRadius: '10@s',
  },
  definations: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: '20@s',
    paddingTop: '10@s',
    marginTop: '10@s',
    borderRadius: '10@s',
  },
  word: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: '25@s',
    marginTop: '20@s',
  },
  partOfSpeech: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: '18@s',
    marginBottom: '20@s',
  },
  title: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontSize: '15@s',
    marginTop: '10@s',
  },
  defination: {
    color: '#fff',
    fontWeight: 'normal',
    textTransform: 'capitalize',
    fontSize: '12@s',
    marginTop: '10@s',
  },
});

const MyLoader = (props) => (
  <ContentLoader
    speed={2}
    width={width - 40}
    height={height}
    viewBox={`0 0 ${width - 40} ${height - 40}`}
    backgroundColor={colors.secondary}
    foregroundColor={colors.primary}
    {...props}>
    <Rect x="20" y="0" rx="3" ry="3" width="50" height="11" />
    <Rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
    <Rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
    <Rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
    <Rect x="20" y="48" rx="3" ry="3" width="100" height="11" />
    <Rect x="20" y="71" rx="3" ry="3" width="37" height="11" />
    <Rect x="30" y="23" rx="3" ry="3" width="130" height="11" />
    <Rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
    <Rect x="20" y="97" rx="3" ry="3" width="140" height="11" />
    <Rect x="20" y="132" rx="3" ry="3" width="140" height="11" />
    <Rect x="30" y="167" rx="3" ry="3" width="53" height="11" />
    <Rect x="149" y="114" rx="3" ry="3" width="140" height="11" />
    <Rect x="132" y="72" rx="3" ry="3" width="173" height="11" />
    <Rect x="65" y="72" rx="3" ry="3" width="37" height="11" />
    <Rect x="123" y="167" rx="3" ry="3" width="173" height="11" />
    <Rect x="30" y="255" rx="3" ry="3" width="173" height="11" />
    <Rect x="20" y="200" rx="3" ry="3" width="173" height="11" />
    <Rect x="88" y="232" rx="3" ry="3" width="173" height="11" />
    <Rect x="20" y="232" rx="3" ry="3" width="53" height="11" />
    <Rect x="205" y="200" rx="3" ry="3" width="53" height="11" />
    <Rect x="182" y="145" rx="3" ry="3" width="53" height="11" />
    <Rect x="207" y="276" rx="3" ry="3" width="53" height="11" />
    <Rect x="30" y="300" rx="3" ry="3" width="173" height="11" />
    <Rect x="59" y="368" rx="3" ry="3" width="53" height="11" />
    <Rect x="20" y="337" rx="3" ry="3" width="173" height="11" />
    <Rect x="148" y="367" rx="3" ry="3" width="173" height="11" />
    <Rect x="110" y="482" rx="3" ry="3" width="173" height="11" />
    <Rect x="30" y="389" rx="3" ry="3" width="173" height="11" />
    <Rect x="20" y="456" rx="3" ry="3" width="173" height="11" />
    <Rect x="123" y="409" rx="3" ry="3" width="173" height="11" />
    <Rect x="224" y="311" rx="3" ry="3" width="53" height="11" />
    <Rect x="225" y="340" rx="3" ry="3" width="53" height="11" />
    <Rect x="20" y="428" rx="3" ry="3" width="53" height="11" />
    <Rect x="206" y="461" rx="3" ry="3" width="53" height="11" />
    <Rect x="249" y="432" rx="3" ry="3" width="53" height="11" />
    <Rect x="58" y="278" rx="3" ry="3" width="53" height="11" />
    <Rect x="20" y="483" rx="3" ry="3" width="37" height="11" />
    <Rect x="88" y="510" rx="3" ry="3" width="173" height="11" />
    <Rect x="30" y="510" rx="3" ry="3" width="53" height="11" />
    <Rect x="127" y="540" rx="3" ry="3" width="53" height="11" />
    <Rect x="200" y="540" rx="3" ry="3" width="63" height="11" />
    <Rect x="20" y="540" rx="3" ry="3" width="80" height="11" />
    <Rect x="280" y="540" rx="3" ry="3" width="40" height="11" />
    <Rect x="20" y="570" rx="3" ry="3" width="140" height="11" />
    <Rect x="190" y="570" rx="3" ry="3" width="80" height="11" />
    <Rect x="205" y="600" rx="3" ry="3" width="53" height="11" />
    <Rect x="100" y="600" rx="3" ry="3" width="53" height="11" />
    <Rect x="30" y="600" rx="3" ry="3" width="53" height="11" />
    <Rect x="182" y="630" rx="3" ry="3" width="53" height="11" />
    <Rect x="50" y="630" rx="3" ry="3" width="70" height="11" />
  </ContentLoader>
);
