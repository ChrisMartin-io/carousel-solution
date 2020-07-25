import * as React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Animated,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const { height, width } = Dimensions.get('window');

export default class CircularCarouselItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Animated.View
        style={[
          styles.item,
          {
            width: this.props.width,
            height: this.props.height,
            borderRadius: this.props.borderRadius,
          },
          this.props.itemAnimationsXY,
        ]}>
        {/*Inner Box*/}
        <TouchableOpacity
          style={{
            backgroundColor: '#ccccff',
            width: this.props.width - 5,
            height: this.props.height - 5,
            borderRadius: this.props.borderRadius,
          }}>
          <View
            style={{
              flexDirection: 'row',
              overflow: 'hidden',
              flexWrap: 'nowrap',
            }}>
            {/*Image*/}
            <Image
              source={{
                uri: this.props.matchUserData.matchImageUrl,
              }}
              style={{
                width: width * 0.22,
                height: width * 0.22,
                borderRadius: width * 0.108,
                borderWidth: 3,
                right: width * 0.012,
                bottom: width * 0.007,
                borderColor: '#fff',
              }}
            />

            <View
              style={{
                flexDirection: 'column',
                overflow: 'hidden',
                margin: 5,
              }}>
              {/*First Row*/}
              <View
                style={{
                  flexDirection: 'row',
                  overflow: 'hidden',
                  justifyContent: 'space-between',
                  width: this.props.width - width * 0.36,
                }}>
                {/*Name*/}
                <Text
                  style={{
                    fontSize: 18,
                  }}>
                  {this.props.matchUserData.matchFirstName}
                </Text>

                {/*Age and Address*/}
                <Text style={{ fontSize: width * 0.038 }}>
                  {this.props.matchUserData.matchAge} ,
                  {this.props.matchUserData.matchCity}
                </Text>
              </View>

              <View style={{ padding: 2 }} />
            </View>
          </View>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  item: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
