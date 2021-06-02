import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

const Stack = createStackNavigator();

import recordScreen from './screens/record'
import playScreen from './screens/playback'

const App = () => {

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{
    headerShown: true
  }}>
        <Stack.Screen style="styles.screen"
          name="Record"
          component={recordScreen}
          options={{ title: 'Recording studio' }} 
          />
        <Stack.Screen style="styles.screen"
          name="Playback"
          component={playScreen}
          options={{ title: 'Work it play it harder faster' }}
        />
      </Stack.Navigator>

      <View style={styles.container}>
        <SafeAreaView>
        </SafeAreaView>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  screen: {
    textAlign: 'center'
  },

});
export default App