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
  Dimensions
} from 'react-native';

class cameraroll extends Component {

  constructor(props) {
     super(props);
     this.state = {
       images: []
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

  render() {
    let height = Dimensions.get('window').height;
    let width = Dimensions.get('window').width;
    let calculated = width/3;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.imageGrid}>
          {this.state.images.map((image) => <Image style={[styles.image,{width:calculated,height:calculated}]} key={image.uri} source={{ uri: image.uri }} /> )}
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
  },
  image: {
    // width: 76,
    // height: 76,
    // width: 102,
    // height: 102,
    //margin: 2,
  },
});

AppRegistry.registerComponent('cameraroll', () => cameraroll);
