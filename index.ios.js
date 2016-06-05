/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  CameraRoll,
  ScrollView,
  Dimensions,
  TouchableHighlight
} from 'react-native';

class cameraroll extends Component {

  constructor(props) {
     super(props);
     this.state = {
       images: [],
       selected: []
     };
  }

  componentDidMount() {
    const fetchParams = {
      first: 25
    };
    CameraRoll.getPhotos(fetchParams).done(this.storeImages,this.logImageError);
  }


  storeImages = (data) => {
    const assets = data.edges;
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: images
    });
  }

  logImageError = (err) => {
    console.log(err);
  }

  selectImage = (uri) => {
    console.log('uri',uri);
    this.setState({
      selected: this.state.selected.concat([uri])
    });
    console.log('selected',this.state.selected);
  }

  render() {

    let imageSize = Dimensions.get('window').width/3;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
          {this.state.images.map((image) => {
              return (
                <TouchableHighlight key={image.uri} onPress={this.selectImage.bind(null,image.uri)}>
                  <Image style={[{width:imageSize,height:imageSize}]} source={{ uri: image.uri }} />
                </TouchableHighlight>
              );
            })
          }
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#F5FCFF',
  },
  imageGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start'
  }
});

AppRegistry.registerComponent('cameraroll', () => cameraroll);
