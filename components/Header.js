import React from 'react'

import { View, Text, StyleSheet } from 'react-native'
const Header = props => {
    return (
        <View style={styles.containerHeader}>
            <View style={styles.textContainer}>
                <Text style={styles.textWhite}>Holi</Text>
                <Text style={styles.textWhite}>1,004 tweets</Text>
            </View>
            <View style={styles.tabContainer}>
                <View>
                    <Text>Tweets</Text>
                </View>
                <View>
                    <Text>Tweets & Replies</Text>
                </View>
                <View>
                    <Text>Media</Text>
                </View>
                <View>
                    <Text>Likes</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerHeader: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    textContainer: {
        marginTop: 70
    },
    textWhite: {
        color: "black",
        marginVertical: 10
    },
    tabContainer: {
        backgroundColor: "white",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        height: "20%",
        alignItems: "center",
        marginTop: 10,
        height: 40
    }
});
export default Header;