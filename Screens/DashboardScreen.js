import React, { Component } from 'react';
import { Text, Alert, Button, View, StyleSheet } from 'react-native';
import 'react-native-gesture-handler';
import { createAppContainer } from 'react-navigation'
import { createDrawerNavigator } from 'react-navigation-drawer'
import { Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { ProfileScreen, MessageScreen, ActivityScreen, ListScreen, ReportScreen, StatisticScreen, SignOutScreen }
    from '../components/index'
import SideBar from '../components/SideBar.js'
import { decode as atob, encode as btoa } from 'base-64'




export default class DashboardScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: ''
            //name: this.props.name,
        }
    }
    static username = ''
    render() {
        return (
            <AppContainer />
        );
    }
    componentDidMount() {
        fetch('https://store.therelated.com/rest/V1/customers/me', {
            method: 'get',
            headers: new Headers({
                'Authorization': 'Bearer ' + this.props.route.params.token
                //'Content-Type': 'application/x-www-form-urlencoded'
            }),
            // body: ''
        }).then(res => res.json())
            .then(json => {
                this.setState({
                    data: json,
                })
                DashboardScreen.username = json.firstname
                this.showData()
            });
    }
    showData() {

    }
}



const DrawerNavigator = createDrawerNavigator({
    ListScreen:
    {
        screen: ListScreen, navigationOptions:
        {
            title: "Lists", drawerIcon: ({ tintColor }) =>
                <Feather name="list" size={16} color={tintColor} />
        }
    },
    MessageScreen:
    {
        screen: MessageScreen,
        
        navigationOptions:
        {
            title: "Message", drawerIcon: ({ tintColor }) =>
                <Feather name="message-square" size={16} color={tintColor} />
    
        }
    }, ActivityScreen:
    {
        screen: ActivityScreen, navigationOptions:
        {
            title: "Activities", drawerIcon: ({ tintColor }) =>
                <Feather name="activity" size={16} color={tintColor} />
        }
    },
    ProfileScreen:
    {
        screen: ProfileScreen,
        navigationOptions:
        {
            title:
                "Profile", drawerIcon: ({ tintColor }) =>
                    <Feather name="user" size={16} color={tintColor} />
        }
    },
    ReportScreen:
    {
        screen: ReportScreen, navigationOptions:
        {
            title: "Reports", drawerIcon: ({ tintColor }) =>
                <Feather name="bar-chart" size={16} color={tintColor} />
        }
    },
    StatisticScreen: {
        screen: StatisticScreen, navigationOptions:
            { title: "Statistics", drawerIcon: ({ tintColor }) => <Feather name="trending-up" size={16} color={tintColor} /> }
    }, SignOutScreen:
    {
        screen: SignOutScreen, navigationOptions:
        {
            title: "SignOut", drawerIcon: ({ tintColor }) =>
                <Feather name="log-out" size={16} color={tintColor} />
        }
    }
}, {
    contentComponent: props => <SideBar {...props} data={DashboardScreen.username} />,
    drawerWidth: Dimensions.get("window").width * 0.85,
    hideStatusBar: true, contentOptions:
    {
        activeBackgroundColor: "rgba(212,118,207,0.2)",
        activeTintColor: "#53115B", itemsContainerStyle:
            { marginTop: 16, marginHorizantal: 8 }, itemStyle: { borderRadius: 4 }
    }
})
const AppContainer = createAppContainer(DrawerNavigator);