import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Animated,
  Button,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import CircularCarouselItem from './CircularCarouselItem';

export function degToRad(degree) {
  return (degree * Math.PI) / 180;
}

export default class CircularCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayItems: [],
    };
    this.circleSize = width * 1.7;
    this.itemSize = width * 0.2;
  }

  setDisplayItems = () => {
    let temp = [];
    for (let i = 0; i < this.props.matchlist.length; i++) {
      if (this.props.matchlist[i] !== undefined) {
        temp.push(this.props.matchlist[i]);
      }
    }
    this.setState({
      displayItems: temp,
    });
  };

  setDisplayItemAnimations = () => {
    this.itemAnimations = [];
    for (let i = 0; i < this.props.matchlist.length; i++) {
      this.itemAnimations.push({
        value: new Animated.ValueXY(this.returnItemsXY(i)),
        index: i,
      });
    }
  };

  componentDidMount() {
    //CircularCarousel has its own state (displayItems), 
    
    //load all items into diplsayItems 
    this.setDisplayItems();

    //load all items Animations into diplsayItems 
    this.setDisplayItemAnimations();
  }

  returnItemsXY = index => {
    //below degree can fit all items on th CircularCarousel, but no margin
    //let degree = (index * 360) / this.props.matchUsersList.length;
    let degree = 240 - index * 30;
    let angleRad = degToRad(degree);
    let radius = this.circleSize / 2;
    let center = radius;
    let x = radius * Math.cos(angleRad) + center - this.itemSize / 2;
    let y = radius * Math.sin(angleRad) + center - this.itemSize / 2;
    return { x, y };
  };

  goUp = () => {
    let temp = [];
    for (let i = 0; i < this.state.displayItems.length; i++) {
      let { x, y } = this.returnItemsXY(--this.itemAnimations[i].index);
      let animation = Animated.spring(this.itemAnimations[i].value, {
        toValue: { x, y },
      });
      temp.push(animation);
    }
    Animated.parallel(temp).start();
  };

  goDown = () => {
    let temp = [];
    for (let i = 0; i < this.state.displayItems.length; i++) {
      let { x, y } = this.returnItemsXY(++this.itemAnimations[i].index);
      let animation = Animated.spring(this.itemAnimations[i].value, {
        toValue: { x, y },
      });
      temp.push(animation);
    }
    Animated.parallel(temp).start();
  };

  createCircularItems = () => {
    let object = [];
    for (let i = 0; i < this.state.displayItems.length; i++) {
      let itemAnimationsXY = this.itemAnimations[i].value.getLayout();
      object.push(
        <CircularCarouselItem
          key={i}
          width={this.itemSize * 4}
          height={this.itemSize * 1.1}
          borderRadius={this.itemSize / 2}
          itemAnimationsXY={itemAnimationsXY}
          matchUserData={this.state.displayItems[i]}
          navigation={this.props.navigation}
        />
      );
    }
    return object;
  };

  render() {
    //Call the createCiruclaritem which setup the display and animations View
    let displayItems = this.createCircularItems();
    return (
      <FlingGestureHandler
        direction={Directions.UP}
        numberOfPointers={1}
        onHandlerStateChange={({ nativeEvent }) => {
          if (nativeEvent.state === State.ACTIVE) {
            this.goUp();
          }
        }}>
        <FlingGestureHandler
          direction={Directions.DOWN}
          numberOfPointers={1}
          onHandlerStateChange={({ nativeEvent }) => {
            if (nativeEvent.state === State.ACTIVE) {
              this.goDown();
            }
          }}>
          <View
            style={[
              styles.circularCarousel,
              {
                width: this.circleSize,
                height: this.circleSize,
                borderRadius: this.circleSize / 2,
              },
            ]}>
            {displayItems}
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
  circularCarousel: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderRadius: 500,
    borderStyle: 'dotted',
    borderColor: '#fff',
    left: '20%',
  },
});
