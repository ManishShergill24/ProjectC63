import * as React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Header } from 'react-native-elements';

export default class Homescreen extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      isSearchpressed: false,
      word: '',
      lexCat: '',
      examp: [],
      definition: '',
    };
  }

  getWord = (word) => {
    var searchWord = word.toLowerCase();
    var url =
      'https://rupinwhitehatjr.github.io/dictionary/' + searchWord + '.json';
    return fetch(url).then((data) => {
      console.log(data.status);
      if (data.status === 200) {
        return data.json().then((a) => {
          var response = a;
          if (response && data.status === 200) {
            var wordData = response.definitions[0];
            //console.log(wordData);
            var definition = wordData.description;
            var lexCat = wordData.wordtype;
            this.setState({
              word: this.state.text,
              definition: definition,
              lexCat: lexCat,
            });
            //console.log(this.state)
          } else {
            this.setState({
              word: this.state.text,
              definition:
                'This word cannot be located\nCheck the spelling and try again',
            });
          }
        });
      } else {
        this.setState({
          word: this.state.text,
          definition:
            'This word cannot be located\nCheck the spelling and try again',
        });
      }
    });
  };

  render() {
    return (
      <SafeAreaProvider style={styles.cont}>
        <View>
          <SafeAreaProvider>
            <Header
              backgroundColor={'purple'}
              centerComponent={{
                text: 'Pocket Dictionary',
                style: {
                  color: 'white',
                  fontSize: 20,
                  fontWeight: 'bold',
                  fontStyle: 'italic',
                },
              }}
            />
            <TextInput
              style={styles.inputBox}
              onChangeText={(text) => {
                this.setState({
                  text: text,
                  isSearchpressed: false,
                  word: 'Loading...',
                  lexCat: '',
                  examp: [],
                  definition: '',
                });
              }}
              value={this.state.text}
            />
            <TouchableOpacity
              style={styles.goButton}
              onPress={() => {
                this.setState({ isSearchpressed: true });
                this.getWord(this.state.text);
              }}>
              <Text style={styles.buttonText}>Go</Text>
            </TouchableOpacity>
            <View style={{ marginTop: 60 }}>
              <View style={styles.contin}>
                <Text style={styles.title}>Word : </Text>
                <Text style={styles.descrip}>{this.state.word}</Text>
              </View>
              <View style={styles.contin}>
                <Text style={styles.title}>Type : </Text>
                <Text style={styles.descrip}>{this.state.lexCat}</Text>
              </View>
              <View style={styles.contin}>
                <Text style={styles.title}>Definition : </Text>
                <Text style={styles.descrip}>{this.state.definition}</Text>
              </View>
            </View>
          </SafeAreaProvider>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  cont: {
    backgroundColor: 'white',
  },
  inputBox: {
    marginTop: 40,
    width: '80%',
    alignSelf: 'center',
    height: 40,
    textAlign: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    width: '50%',
    height: 55,
    alignSelf: 'center',
    padding: 10,
    margin: 10,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    borderWidth: 3,
    borderRadius: 100,
  },
  contin: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  title: {
    fontSize: 18,
    color: 'gold',
    marginLeft: '8%',
  },
  descrip: {
    fontSize: 18,
  },
});