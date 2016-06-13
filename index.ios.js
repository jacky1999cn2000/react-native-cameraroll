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

console.disableYellowBox = true;
console.warn('YellowBox is disabled.');

class cameraroll extends Component {

  constructor(props) {
     super(props);
     this.state = {
       cursor: null,
       hasMore: true,
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
    // console.log('data ',data);
    const assets = data.edges;
    // assets.forEach((asset) => {
    //   console.log('node ',asset.node);
    // })
    const images = assets.map((asset) => asset.node.image);
    this.setState({
      images: this.state.images.concat(images),
      hasMore: data.page_info.has_next_page,
      cursor: data.page_info.end_cursor
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

  loadMore = () => {
    if(this.state.hasMore){
      const fetchParams = {
        first: 24,
        after: this.state.cursor
      };
      CameraRoll.getPhotos(fetchParams).done(this.storeImages,this.logImageError);
    }
  }

  render() {
    console.log('this.state.images ',this.state.images);
    let imageSize = Dimensions.get('window').width/3;
    console.log('imageSize ',imageSize);

    return (
      <ScrollView style={styles.container}
        onScroll={this.loadMore}
        scrollEventThrottle={0}
      >
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
