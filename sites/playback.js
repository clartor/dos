import * as React from 'react';
import {Component} from 'react';
import { Text, View, StyleSheet, Button, TouchableNativeFeedback } from 'react-native';
import { Audio } from 'expo-av';

class Playback extends Component {

  constructor(props) {
    super(props);
    this.state = { isPlaying: false };

    this.loadAudio = this.loadAudio.bind(this);
    this.toggleAudioPlayback = this.toggleAudioPlayback.bind(this);
  }

  componentDidMount() {
    this.loadAudio();
  }

  componentWillUnmount() {
    this.soundObject.stopAsync();
  }

  async loadAudio() {
    this.soundObject = new Audio.Sound();
    try {
      await this.soundObject.loadAsync({ uri: this.props.source /* url for your audio file */ });
    } catch (e) {
      console.log('ERROR Loading Audio', e);
    }
  }

  toggleAudioPlayback() {
    this.setState({
      isPlaying: !this.state.isPlaying,
    }, () => (this.state.isPlaying
      ? this.soundObject.playAsync()
      : this.soundObject.stopAsync()));
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={this.toggleAudioPlayback}>
        <View style={this.props.style}>
          {this.props.children}
        </View>
      </TouchableNativeFeedback>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

// constructor(props) {
//   super(props);
//   this.state = { isPlaying: false };

//   this.loadAudio = this.loadAudio.bind(this);
//   this.toggleAudioPlayback = this.toggleAudioPlayback.bind(this);
// }

// componentDidMount() {
//   this.loadAudio();
// }

// componentWillUnmount() {
//   this.soundObject.stopAsync();
// }

// async loadAudio() {
//   this.soundObject = new Audio.Sound();
//   try {
//     await this.soundObject.loadAsync({ uri: this.props.source /* url for your audio file */ });
//   } catch (e) {
//     console.log('ERROR Loading Audio', e);
//   }
// }

// toggleAudioPlayback() {
//   this.setState({
//     isPlaying: !this.state.isPlaying,
//   }, () => (this.state.isPlaying
//     ? this.soundObject.playAsync()
//     : this.soundObject.stopAsync()));
// }

// render() {
//   return (
//     <TouchableNativeFeedback onPress={this.toggleAudioPlayback}>
//       <View style={this.props.style}>
//         {this.props.children}
//       </View>
//     </TouchableNativeFeedback>
//   );
// }
// }
export default Playback;
