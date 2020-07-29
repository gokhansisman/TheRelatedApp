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

    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    signUp = () => {
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
           
            if (res.message != null) {
                alert(res.message)
            }
            this.setState({
                KEY_ID: res.id
            })
            alert(this.state.KEY_ID)
            this.registerForPushNotificationsAsync()
        });
        // this.navigateToLoginScreen()
    }
    registerForPushNotificationsAsync = async () => {
     
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
        let token2 = await Notifications.getExpoPushTokenAsync();
       
        this.setState({
            expoToken: token2
        })
        alert(token2)
        var user = { keyID: this.state.KEY_ID, email: this.state.email, token: token2 };
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
                    theme={{ colors: { text: '#2d3e50', primary: '#d6951a' } }}
                    placeholder='Email'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('email', val)}
                />
                <TextInput
                    style={styles.input}
                    theme={{ colors: { text: '#2d3e50', primary: '#d6951a' } }}
                    placeholder='Password'
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('password', val)}
                />
                <TextInput
                    theme={{ colors: { text: '#2d3e50', primary: '#d6951a' } }}
                    style={styles.input}
                    placeholder='Firstname'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('firstname', val)}
                />
                <TextInput
                    theme={{ colors: { text: '#2d3e50', primary: '#d6951a' } }}
                    style={styles.input}
                    placeholder='Lastname'
                    autoCapitalize="none"
                    placeholderTextColor='white'
                    onChangeText={val => this.onChangeText('lastname', val)}
                />
                <View style={{ top: 40 }}>
                    <Button
                        title='Sign Up'
                        onPress={this.signUp}
                        style={styles.register}
                    ><Text style={{ fontSize: 16, color: "#fff" }} >Sign Up!</Text></Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0efeb',

    },
    register: {
        width: 130,
        height: 44,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#2d3e50",
        borderWidth: 1,
        borderRadius: 4,
        borderColor: '#2d3e50',
        color: "#cddc39",
        margin: 6
    },
    input: {
        borderWidth: 0,
        borderRadius: 0,
        borderColor: '#d6951a',
        borderLeftWidth: 0,
        paddingLeft: 10,
        width: 250,
        height: 50,
        backgroundColor: "#f0efeb",
        marginBottom: 0,
        overflow: 'hidden'

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
        color: '#2d3e50'
    },
});

