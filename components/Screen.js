import React from 'react'
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native'
import { FontAwesome5 } from '@expo/vector-icons'
import Spinner from 'react-native-loading-spinner-overlay'
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-material-cards'
import { ScrollView } from 'react-native-gesture-handler'
import ListView from './ListView'
import TabScreen from './TabScreen'

export default class Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spinner: false,
            categories: [],
            level: null,
            position: null
        };

    }
    logOut = async () => {
        alert("gokh")

    }
    componentDidMount() {
        fetch('https://store.therelated.com/rest/V1/categories', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json())
            .then(json => {

                this.setState({
                    categories: json.children_data
                })
                console.log(this.state.categories)
            });
    }
    render() {
        if (this.props.name == 'Profile') {
            return (<View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{ alignItems: "flex-end", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text>Selam Gökhan</Text>
                    </View>
                </SafeAreaView>
            </View>)
        }
        else if (this.props.name == 'List') {
            return (<View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{ alignItems: "flex-end", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                    <ScrollView style={{ flex: 1, flexDirection: "column" }}>
                        <ListView dizi={this.state.categories} />
                    </ScrollView>
                </SafeAreaView>
            </View>)

        }
        else if (this.props.name == 'Activity') {
            return (<View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{ alignItems: "flex-end", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>

                    <ScrollView style={{ flex: 1, flexDirection: "column" }}>
                        <View style={styles.container}>
                            <TabScreen />
                        </View>
                    </ScrollView>
                </SafeAreaView>

            </View>)

        }
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 1 }}>
                    <TouchableOpacity style={{ alignItems: "flex-end", margin: 16 }}
                        onPress={this.props.navigation.openDrawer}>
                        <FontAwesome5 name="bars" size={24} color="#161924" />
                    </TouchableOpacity>
                    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={styles.text}>{this.props.name}
                    Screen </Text>
                    </View>
                </SafeAreaView>
            </View>)
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1, backgroundColor: "#FFF"
    }, text: { color: "#161924", fontSize: 20, fontWeight: "500" }
})
