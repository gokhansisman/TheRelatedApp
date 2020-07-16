import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';
import { Font } from 'expo';
import { Euromessage } from '../Euromessage'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';
import { create_api } from '@relateddigital/visilabs-react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input } from 'react-native-elements';
import TextField from '../components/TextField'
import { AsyncStorage } from 'react-native';


export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: null,
      expoToken: null,
      isLogin: '',
      error: ''
    };
    this.onLogin = this.onLogin.bind(this)
    this.registerForPushNotificationsAsync = this.registerForPushNotificationsAsync.bind(this)
  }
  componentDidMount() {
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
          token: res
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
          <Text style={styles.inputext}>Store The Related</Text>
          <TextInput
            value={this.state.username}
            onChangeText={(username) => this.setState({ username })}
            label='Email'
            style={styles.input}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(password) => this.setState({ password })}
            label='Password'
            secureTextEntry={true}
            style={styles.input}
          />

          <Button
            title={'SendMember'}
            style={styles.input}
            onPress={this.sendMember.bind(this)}
          />
          <Button
            title={'Login'}
            style={styles.input}
            onPress={this.onLogin.bind(this)}
          />
          <Button
            title={'Register'}
            style={styles.register}
            onPress={this.navigateToSignUp}
          />

        </View>
      )
    }
    else {
      return (
        <View>
          <Text>Welcome {this.state.username}</Text>
          <Button
            title={'Contunie'}
            style={styles.input}
            onPress={this.navigateToDashboard}
          />
          <Button
            title={'Log Out'}
            style={styles.input}
            onPress={this.logOut.bind(this)}
          />
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
    backgroundColor: '#00FFFF',
  },
  register: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 3,
    borderColor: 'black',
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 44,
    padding: 10,
    borderWidth: 1,
    borderColor: 'black',
    marginBottom: 3,
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