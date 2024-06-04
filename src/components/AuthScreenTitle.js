import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


import { responsiveFontSize, responsivePadding } from './Responsive'
import Colors from './Colors'

export default function AuthScreenTitle({ title, subTitle }) {
    return (
        <View style={styles.Container}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.subTitleText}>{subTitle}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    Container: {
        margin: responsivePadding(20),
    },
    titleText: {
        color: Colors.black,
        textAlign: 'center',
        fontSize: responsiveFontSize(30),
        fontWeight: 'bold',
    },
    subTitleText: {
        color: Colors.black,
        textAlign: 'center',
        fontSize:responsiveFontSize(16),
        paddingVertical: responsivePadding(15),
        color: Colors.text_grey,
    }
})