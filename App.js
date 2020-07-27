import React, { Component } from 'react';
import { Text, Image, Alert, Button, View, StyleSheet, TouchableOpacity, ListView, AsyncStorage } from 'react-native';
import { TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './Screens/LoginScreen';
import DashboardScreen from './Screens/DashboardScreen';
import SignUpScreen from './Screens/SignUpScreen';
import CategoriesScreen from './Screens/CategoriesScreen';
import BasketScreen from './Screens/BasketScreen';
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
            options={({ navigation }) => ({
              headerRight: (props) => (
                <TouchableOpacity onPress={() => navigation.push('Basket', {})}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/bubbles/2x/add-shopping-cart.png' }}
                    style={{ flex: 1, height: 10, width: 50, resizeMode: "cover", right: 10 }}
                  />
                </TouchableOpacity>
              )
            })} />
          <Stack.Screen name="CardScreen" component={CardScreen}
            options={({ navigation }) => ({
              headerRight: (props) => (
                <TouchableOpacity onPress={() => navigation.push('Basket', {})}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/bubbles/2x/add-shopping-cart.png' }}
                    style={{ flex: 1, height: 10, width: 50, resizeMode: "cover", right: 10 }}
                  />
                </TouchableOpacity>
              )
            })} />
          <Stack.Screen name="Basket" component={BasketScreen}
            options={({ navigation }) => ({
              headerRight: (props) => (
                <TouchableOpacity onPress={() => AsyncStorage.clear()}>
                  <Image
                    source={{ uri: 'https://img.icons8.com/clouds/2x/delete-sign.png' }}
                    style={{ flex: 1, height: 10, width: 50, resizeMode: "cover", right: 10 }}
                  />
                </TouchableOpacity>
              )
            })} />
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