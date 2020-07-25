import React, { createElement } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, Image, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dizi: []
        }

    }
    actionOnRow = (items) => {
        
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
                    dizi: json.children_data
                })
            });
    }
    render() {
        return this.state.dizi.map((data, index) =>
        
            <TouchableOpacity key={index} style={{
                backgroundColor: "whitesmoke", margin: 2,
                padding: 10
            }} onPress={() => this.actionOnRow(data.id)}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={{ height: 40, width: 40, resizeMode: "cover" }}
                        source={{ uri: 'https://www.johnrichardo.com/wp-content/uploads/2019/08/men-category-640x400.jpg' }} />
                    <Text style={{
                        marginLeft: 10, fontSize: 20,
                        fontFamily: "sans-serif", textAlignVertical:
                            "center"
                    }}>{data.name}</Text>
                    <AntDesign name="right" size={24} color="gray"
                        style={{ right: 10, position: "absolute", alignSelf: "center" }} />
                </View>
            </TouchableOpacity>
        )


    }

}
