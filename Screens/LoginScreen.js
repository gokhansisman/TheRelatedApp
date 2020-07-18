import React, { Component } from 'react';
import { Text, Alert, TouchableOpacity, View, StyleSheet, Image } from 'react-native';
import Button from 'react-native-pure-button'
import { TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';
import { Font } from 'expo';
import { Euromessage } from '../Euromessage'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { create_api } from '@relateddigital/visilabs-react-native';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import TextField from '../components/TextField'
import { AsyncStorage } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: null,
      expoToken: null,
      isLogin: '',
      error: '',
      spinner: false
    };
    this.onLogin = this.onLogin.bind(this)
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this)
  }
  componentDidMount() {
    if (AsyncStorage.getItem('isLogin') == null) {
      this._storeData()
    }
    this._retrieveData()
    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
      });
    }
  }
  _storeData = async () => {
    try {
      await AsyncStorage.setItem(
        'isLogin', 'false');
    } catch (error) {
      // Error saving data
    }
  };
  _storeTokenLocal = async () => {
    try {
      await AsyncStorage.setItem(
        'token', this.state.token);
    } catch (error) {
      // Error saving data
    }
  };
  _retrieveData = async () => {
    try {
      const isLogin = await AsyncStorage.getItem('isLogin');
      console.log(isLogin)
      if (isLogin !== null) {
        this.setState({
          isLogin: isLogin
        })
      }
    } catch (error) {
      // Error retrieving data
    }
  };
  logOut = async () => {
    {
      try {
        await AsyncStorage.setItem(
          'isLogin', 'false');
        this.setState({
          isLogin: 'false'
        })
        this.props.navigation.navigate('Login', {

        })
      } catch (error) {
        // Error saving data
      }
    };
  }
  logIn = async () => {
    {
      try {
        const isLogin = await AsyncStorage.setItem(
          'isLogin', 'true');
      } catch (error) {
        // Error saving data
      }
    };
  }

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    this.setState({
      expoToken: token
    })
  }
  go = () => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(this.state.email) === true) {
      alert('valid');
    }
    else {
      alert();
    }

  }
  keepContunie() {
    this.props.navigation.navigate('Dashboard', {
    })
  }

  onLogin() {
    // this.logIn()
    //fetch.
    //check credentials
    //navigation.
    this.setState({ spinner: true })
    fetch('https://store.therelated.com/rest/V1/integration/customer/token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json()).then(res => {
      if (res.message == null) {
        this.setState({
          token: res,
          spinner: false
        })
        this.logIn()
        this._storeTokenLocal()
        this.navigateToDashboard()
      } else {
        this.setState({
          error: res.message
        })
        // console.log(this.state.error)
      }
      // console.log(res)
    }).catch((error) => {
      // console.error(error)
      // this.navigateToDashboard()
    });
  }
  navigateToDashboard = async () => {
    console.log(this.state.token)
    let _token = await AsyncStorage.getItem('token')
    this.props.navigation.navigate('Dashboard', {
      userName: this.state.username,
      token: _token
    })
  }
  navigateToSignUp = () => {
    //navigate to Sign Up Page
    this.props.navigation.navigate('SignUp', {
      token: this.state.expoToken
    })
  }
  sendMember = () => {
    this.registerForPushNotificationsAsync()
    alert(this.state.expoToken)
    var user = { keyID: "123456", email: "abdullah2@darcin.com", token: this.state.expoToken };
    //alert(JSON.stringify(Euromessage()))
    let api = Euromessage()
    //api.euromsg.setUser(user); 
    //api.signUp("12345");
    //api.login(userID);

  }

  render() {
    const { navigate } = this.props.navigation;
    if (this.state.isLogin == 'false') {
      return (

        <View style={styles.container}>

          <Image
            source={require("../assets/logo.png")}
            style={{ height: 60, width: 200, marginBottom: 20, right: 2, resizeMode: 'stretch' }}
          />

          <Spinner
            visible={this.state.spinner}
            animation={"fade"}
            color="#9e0059"
            textStyle={styles.spinnerTextStyle}
          />
          <View style={{ flexDirection: "row" }}>
            <MaterialIcons name="email" style={{ marginLeft: -54, marginRight: 6, top: 10 }} size={48} color="#9e0059" />
            <TextInput
              autoCompleteType="email"
              value={this.state.username}
              onChangeText={(username) => this.setState({ username })}
              label='Email'
              textContentType="emailAddress"
              style={styles.input}
            />
          </View>
          <View style={{ flexDirection: "row" }}>
            <Entypo name="key" style={{ marginLeft: -54, marginRight: 6, top: 12 }} size={48} color="#9e0059" />
            <TextInput
              autoCompleteType="password"
              value={this.state.password}
              onChangeText={(password) => this.setState({ password })}
              label='Password'
              secureTextEntry={true}
              style={styles.input}
            />
          </View>
          <View >
            <TouchableOpacity style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <Button
                title="Login"
                style={
                  styles.register
                }
                onPress={this.onLogin.bind(this)}
              >
                <Text style={{ color: '#fff' }}>Login</Text>
              </Button>
              <Button
                title="Register"
                style={styles.register}
                onPress={this.navigateToSignUp}
              ><Text style={{ color: '#fff' }}>Register</Text></Button>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 24, fontFamily: "sans-serif" }}>© 2020 Related Digital </Text>
        </View>
      )
    }
    else {
      return (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1, backgroundColor: "#ffb5a7" }}>
          <Image
            source={require("../assets/logo.png")}
            style={{ height: 60, width: 200, marginBottom: 20, right: 2, resizeMode: 'stretch' }}
          />
          <Text style={{ fontSize: 18, fontFamily: "sans-serif" }}>Welcome {this.state.username}</Text>
          <Button
            title='Contunie'
            style={styles.register}
            onPress={this.navigateToDashboard}
          ><Text style={{ color: '#fff' }}>Contunie</Text></Button>
          <Button
            title='Log Out'
            style={styles.register}
            onPress={this.logOut.bind(this)}
          ><Text style={{ color: '#fff' }}>Log Out</Text></Button>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffb5a7',

  },
  register: {
    width: 110,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e91e63",
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#F9D87D',
    color: "#cddc39",
    margin: 6
  },
  input: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#F9D87D',
    width: 200,
    backgroundColor: "#e91e637a",
    marginBottom: 16
  },
  inputext: {
    width: 200,
    height: 50,
    padding: 10,
    textAlign: 'center',
    fontWeight: 'bold',
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 10,
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});