import React, { Component } from 'react'
import { View, Text } from 'react-native'

export default class CardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.route.params.title
        }
        this.props.navigation.setOptions({ title: this.state.title })

    }
    render() {
        let title = this.state.title
        return (
            <View><Text>{title}</Text></View>
        )
    }
}
