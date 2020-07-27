import React, { Component } from 'react'
import { Text, View, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import { AsyncStorage } from 'react-native';
import { Card } from 'react-native-paper'
import { FlatList, ScrollView } from 'react-native-gesture-handler'


export default class BasketScreen extends Component {

    constructor(props) {
        super(props)
        this.state = {
            basketProducts: [],
            listProducts: []
        }
    }
    componentDidMount = async () => {
        this.getProductFromStorage()
        this.fetchProducts()
    }
    getProductFromStorage = async () => {
        try {
            AsyncStorage.getItem('ProductsInBasket', (error, result) => {
                this.setState({ basketProducts: JSON.parse(result) }, function () {
                    this.fetchProducts()
                });
            });
        } catch (error) {

        }
    }
    fetchProducts = () => {
        console.log({ fetchProducts: this.state.basketProducts })
        if (this.state.basketProducts != null) {
            this.state.basketProducts.map((data, index) => {
                fetch(`https://store.therelated.com/rest/V1/products/${data}`, {
                    method: 'get',
                    headers: new Headers({
                        'Content-Type': 'application/json'
                    }),
                }).then(res => res.json())
                    .then(json => {
                        this.setState(prevState => ({
                            listProducts: [...prevState.listProducts, json]
                        }))
                        console.log({ listProducts: this.state.listProducts })
                    });
            })
        }
    }
    render() {
        let imageURL = 'https://store.therelated.com/media/catalog/product'
        if(this.state.listProducts != null) {
        return (
            <View style={{ flex: 1, padding: 2, borderRadius: 2, borderWidth: 2, borderTopColor: "orange" }}>
                <FlatList
                    data={this.state.listProducts}

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
                                </View>
                            </Card>
                        </TouchableWithoutFeedback>}
                    keyExtractor={item => item.id.toString()}
                />
            </View>
        )}
    else {
        return (
            <View><Text>No products in your basket..</Text></View>
        )
    }

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
