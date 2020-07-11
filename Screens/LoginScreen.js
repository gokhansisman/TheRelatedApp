import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';

import { NavigationContainer } from '@react-navigation/native';

export default class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: null
    };
    this.onLogin = this.onLogin.bind(this)
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

  onLogin() {
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
        username: 'roni_cost@example.com',
        password: 'roni_cost3@example.com'
      })
    }).then(res => res.json()).then(res => {
      console.log(res)
      this.setState({
        token: res
      })
      this.navigateToPage()
    });
  }
  navigateToPage = () => {
    console.log(this.state.token)
    this.props.navigation.navigate('Dashboard', {
      userName: this.state.username,
      token: this.state.token
    })
  }

  render() {
    const { navigate } = this.props.navigation;
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
          title={'Login'}
          style={styles.input}
          onPress={this.onLogin.bind(this)}
        />
      </View>
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