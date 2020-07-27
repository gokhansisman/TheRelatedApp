import React, { Component } from 'react'
import { View, Button, TouchableWithoutFeedback, Text, Image, StyleSheet } from 'react-native'
import { Card } from 'react-native-paper'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { color } from 'react-native-reanimated'
import { AsyncStorage } from 'react-native';


export default class CardScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: this.props.route.params.title,
            itemID: this.props.route.params.itemID,
            products: [],
            basketProducts: []
        }
        this.props.navigation.setOptions({ title: this.state.title })

    }

    actionOnRow = async (items) => {
        console.log('selected item: ', items)
        
        let basketProducts = this.state.basketProducts
        basketProducts.push(items)
        this.setState({
            basketProducts: basketProducts
        })
        console.log(this.state.basketProducts)
        try {
            await AsyncStorage.setItem('ProductsInBasket', JSON.stringify(this.state.basketProducts));
        } catch (error) {

        }
        
        alert("Product Added to Basket!")
    }
    getProductfromStorage = async () => {
        try {
            await AsyncStorage.getItem('ProductsInBasket', (error, result) => {
                this.setState({ basketProducts: JSON.parse(result) }, function () {
                });
            });
        } catch (error) {
        }
    }
    componentDidMount = async () => {
        let itemID = this.state.itemID
        fetch(`https://store.therelated.com/rest/V1/products?fields=items[id,sku,name,price,visibility,custom_attributes,extension_attributes]&searchCriteria[pageSize]=100&searchCriteria[filter_groups][0][filters][0][field]=category_id&searchCriteria[filter_groups][0][filters][0][value]=${itemID}&searchCriteria[filter_groups][0][filters][0][condition_type]=eq`, {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        }).then(res => res.json())
            .then(json => {
                this.setState({
                    products: json.items
                })
                //  console.log(this.state.products[0].name)
            });
            try {
                await AsyncStorage.setItem('ProductsInBasket', JSON.stringify(this.state.basketProducts));
            } catch (error) {
    
            }
            this.getProductfromStorage()

    }

    render() {
        let title = this.state.title
        let imageURL = 'https://store.therelated.com/media/catalog/product'
        return (
            <View style={{ flex: 1, padding: 2, borderRadius: 2, borderWidth: 2, borderTopColor: "orange" }}>
                <FlatList
                    data={this.state.products}

                    renderItem={({ item }) =>
                        <TouchableWithoutFeedback >
                            <Card >
                                <View style={styles.container
                                }>
                                    <Image style={{ flex: 1, height: 100, width: 100 }} resizeMode='cover'
                                        source={{ uri: imageURL + item.custom_attributes[0].value }}></Image>
                                    <Text style={styles.paragraph}>SKU : {item.sku}</Text>
                                    <Text style={styles.paragraph}>{item.name}</Text>
                                    <Text style={styles.paragraph}>Price : {item.price}$</Text>

                                    <Button title="Add Basket" onPress={() => this.actionOnRow(item.sku)}></Button>
                                </View>
                            </Card>
                        </TouchableWithoutFeedback>}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )
        /* return this.state.products.map((data, index) =>
            
                <Card>
                    <TouchableOpacity key={index} style={{
                        backgroundColor: "#ccc",
                        height:60
                    }} onPress={() => this.actionOnRow(data.id)}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.cardText}>{data.name}</Text>
                            <Text style={styles.cardText}>Sku : {data.sku}</Text>
                            <Text style={styles.cardText}>Price : {data.price}</Text>
                        </View>
                    </TouchableOpacity>
                </Card>
        ) */
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        borderBottomColor: "orange",
        borderBottomWidth: 1,
        justifyContent: 'center',
        paddingTop: 40,
        backgroundColor: '#FFFFFF',
    },
    paragraph: {
        margin: 24,
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#34495e',
    },
});
