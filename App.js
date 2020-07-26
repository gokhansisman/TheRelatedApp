import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet, TouchableOpacity, ListView } from 'react-native';
import { TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import DashboardScreen from './Screens/DashboardScreen';
import SignUpScreen from './Screens/SignUpScreen';
import CategoriesScreen from './Screens/CategoriesScreen';
import CardScreen from './Screens/CardScreen'
import Euromessage from './Euromessage'
import { Asset } from 'expo-asset'
import { FontAwesome5 } from '@expo/vector-icons'
const Stack = createStackNavigator();


export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
    };
  }


  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: 'Related Digital', left: null
            }}
          />
          <Stack.Screen name="Dashboard" component={DashboardScreen}
            defaultNavigationOptions={({ navigation }) => ({
              /* headerRight: (props) => <TouchableOpacity style={{
                alignItems: "flex-end", margin: 16
              }}
                onPress={() => navigation.openDrawer()}>
                <FontAwesome5 name="bars" size={24} color="#161924" />
              </TouchableOpacity>, */
              title: 'Dashboard', headerLeft: null,
              gesturesEnabled: false
            })}
          />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="CategoriesScreen" component={CategoriesScreen}
          defaultNavigationOptions={({ navigation }) => ({
            /* headerRight: (props) => <TouchableOpacity style={{
              alignItems: "flex-end", margin: 16
            }}
              onPress={() => navigation.openDrawer()}>
              <FontAwesome5 name="bars" size={24} color="#161924" />
            </TouchableOpacity>, */
            title: 'Categories', headerLeft: null,
            gesturesEnabled: false
          })} />
          <Stack.Screen name="CardScreen" component={CardScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00FFFF',
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  inputext: {
    width: 200,
    height: 44,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
});