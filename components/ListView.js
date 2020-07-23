import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Text, Image, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default class ListView extends React.Component {
    constructor(props) {
        super(props)
        this.dizi = props.dizi
    }
    render() {
        return this.dizi.map((data, index) =>
            <TouchableOpacity style={{
                backgroundColor: "whitesmoke", margin: 2,
                padding: 10
            }}>
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
