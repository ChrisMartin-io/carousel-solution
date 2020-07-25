import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-paper';
import { fakeData } from './fakeData';
import CircularCarousel from './CircularCarousel';

//Description
//This is a circular Carousel which display match user infos
//By swiping up or down with your mouse or finger (ios/android mode), 
//the circular carousel items will be move up or down

//Issue
//This circular Carousel can only hold up to 13 items (0 ~ 12)
//If there is more than 13 items, the latest item would replace/overlay the earliest items
//For exmaple, let say we have 13 items, and I added the 14th items, the 14th item would overlay the 1st items
//If 15 items, 14th and 15th would overlay 1st and 2nd items, and so on and so on
//Another example,
//Currently the list (matchlist) is holding 16 items, list is loading data from fakeData.js
//Because the list is exceed 13 items, the 13th, 14th, 15th, 16th is overlaying the 1st, 2nd, 3rd, 4th
//If you remove the 13th, 14th, 15th, 16th, the 1st, 2nd, 3rd, 4th will be display.

//Task
//your task is to use your imagination and creative to build the Circular Carousel which can hold more than 13 items without the latest items overlaying other items


export default class App extends React.Component {
  state = { matchlist: [] };

  setMatchList = () => {
    this.setState({
      success: false,
      matchlist: fakeData,
    });
  };

  doneLoadup = () => {
    this.setState({ success: true });
  };

  async componentDidMount() {
    //Setup fakeData into matchlist
    await this.setMatchList();
    //console.log(this.props.matchlist);
    //Wait for the setState of the matchlist
    //After the setState of the matchlist is done (data is loaded),
    //set the success to true to display the main screen
    this.doneLoadup();
  }

  success = () => {
    return (
      <View style={{ flex: 1, backgroundColor: '#4d88ff' }}>
        <CircularCarousel matchlist={this.state.matchlist} />
      </View>
    );
  };

  loading = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>Loading</Text>
      </View>
    );
  };

  render() {
    return this.state.success ? this.success() : this.loading();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 0,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
