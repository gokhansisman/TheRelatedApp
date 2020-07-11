import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';

export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //name: this.props.name,
        }
    }
    render() {
        return (
            <View>
                <Text>selam</Text>
                <Text>{this.props.route.params.userName}</Text>
                <Text>token : {this.props.route.params.token}</Text>
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