import React, { createElement } from 'react'
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler'
import { Text, Image, View } from 'react-native'

import { AntDesign } from '@expo/vector-icons';

export default class ListView extends React.Component {
    constructor(props) {
        super(props);

    }
    actionOnRow = (items) => {
        console.log('selected item: ', items)
        this.props.onClick(items)
    }
    getImageById = (id) => {
        if (id == '38') {
            return 'https://img.icons8.com/carbon-copy/2x/new.png'
        }
        else if (id == '11') {
            return 'https://image.flaticon.com/icons/png/512/236/236831.png'
        }
        else if (id == '20') {
            return 'https://www.pinclipart.com/picdir/middle/167-1674167_top-causes-of-infertility-in-women-icon-design.png'
        }
        else if (id == '3') {
            return 'https://thumbs.dreamstime.com/z/thermo-clothes-icon-outline-style-thermo-clothes-icon-outline-illustration-thermo-clothes-vector-icon-web-design-isolated-118124770.jpg'
        } else if (id == '7') {
            return 'https://st4.depositphotos.com/17714924/20094/v/1600/depositphotos_200940504-stock-illustration-clothes-icons-set-sneakers-icon.jpg'
        } else if (id == '9') {
            return 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcS3o3oak_LukxnZyyAWc0RcsREUCyB5XXbqzg&usqp=CAU'
        } else if (id == '29') {
            return 'https://cdn3.iconfinder.com/data/icons/discount-and-promotion/500/prices-512.png'
        } else if (id == '37') {
            return 'https://img.icons8.com/carbon-copy/2x/sale.png'
        }
        else {
            return 'https://cdn.iconscout.com/icon/premium/png-256-thumb/search-product-8-837099.png'
        }
    }
    render() {
        return this.props.dizi.map((data, index) =>

            <TouchableOpacity key={index} style={{
                backgroundColor: "#ccc", margin: 2,
                padding: 10
            }} onPress={() => this.actionOnRow(data.id)}>
                <View style={{ flexDirection: "row" }}>
                    <Image
                        style={{ height: 40, width: 40, resizeMode: "cover",borderWidth:1,borderRadius:50 }}
                        source={{ uri: this.getImageById(data.id) }} />
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
