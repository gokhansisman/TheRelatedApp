import React from 'react'
import { View,Text } from 'react-native'

export default class TemplatePage extends React.Component {

    constructor(props) {
        super(props)

    }
    render() {
        return (
            <View><Text>{this.props.tabName}</Text></View>
        )
    }
}