import React, { Component } from 'react'
import ListView from '../components/ListView'
import { View,Text,Button } from 'react-native'


export default class CategoriesScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: this.props.route.params.dizi != null ? this.props.route.params.dizi : []
        }

        this.props.navigation.setOptions({ title: this.props.route.params.title })
    }
    render() {
        return (
          
                <ListView dizi={this.state.categories} onClick={this.onClick} />
               )
    }
    onClick = (itemID) => {
        this.navigateToDashboard(itemID)
    }
    navigateToDashboard = (itemID) => {
        //let _token = await AsyncStorage.getItem('token')
        let currentData = this.state.categories.filter(data => data.id == itemID)[0]
        let newDizi = currentData.children_data
        if (newDizi.length >= 1) {
            this.props.navigation.push('CategoriesScreen', {
                itemID: itemID,
                dizi: newDizi,
                title: currentData.name
            })
        }
        else {
            this.props.navigation.push('CardScreen', {
                itemID: itemID,
                dizi: newDizi,
                title: currentData.name
            })
        }

    }

    componentDidMount() {
        console.log("props" + this.props.route.params.dizi)
        if (this.props.route.params.dizi != null) return;

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
}
