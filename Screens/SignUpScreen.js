// SignUp.js
import React, { Component } from 'react';
import { TextInput } from 'react-native-paper';
import 'react-native-gesture-handler';
import {
    View,
    Button,
    StyleSheet
} from 'react-native'
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
            KEY_ID: ''

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
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input: {
        width: 350,
        height: 55,
        backgroundColor: '#42A5F5',
        margin: 10,
        padding: 8,
        color: 'white',
        borderRadius: 14,
        fontSize: 18,
        fontWeight: '500',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

