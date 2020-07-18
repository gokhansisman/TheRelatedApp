// SignUp.js
import React, { Component } from 'react';
import { TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native'
import Button from 'react-native-pure-button'
import { Euromessage } from '../Euromessage'
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { NavigationContainer } from '@react-navigation/native';

export default class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            token: this.props.route.params.token,
            KEY_ID: '',
            expoToken: ''

        };
        this.signUp = this.signUp.bind(this)
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    signUp = async () => {
        try {
            fetch('https://store.therelated.com/rest/V1/customers', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    customer: {
                        email: this.state.email,
                        firstname: this.state.firstname,
                        lastname: this.state.lastname
                    },
                    password: this.state.password
                })
            }).then(res => res.json()).then(res => {
                this.setState({
                    KEY_ID: res.id
                })
                console.log(res.id)
                this.navigateToLoginScreen()
            });
            console.log('user successfully signed up!: ')
            // this.navigateToLoginScreen()
        } catch (err) {
            console.log('error signing up: ', err)
        }
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
    navigateToLoginScreen = () => {
        this.registerForPushNotificationsAsync()
        var user = { keyID: this.state.KEY_ID, email: this.state.email, token: this.state.expoToken };
        let api = Euromessage()
        api.euromsg.setUser(user);

        this.props.navigation.navigate('Login', {

        })
    }
    render() {
        return (
            <View style={styles.container}>
                 <Image
            source={require("../assets/logo.png")}
            style={{ height: 60, width: 200, marginBottom: 20, right: 2, resizeMode: 'stretch' }}
          />
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('email', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Firstname'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('firstname', val)}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Lastname'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('lastname', val)}
                />
                <Button
                    title='Sign Up'
                    onPress={this.signUp}
                    style={styles.register}
                ><Text style={{ fontSize: 16, color: "#fff", fontFamily: "sans-serif" }} >Sign Up!</Text></Button>
            </View>
        )
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
});

