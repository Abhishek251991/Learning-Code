import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { mobileH, mobileW, Colors, Font, Lang_chg, config } from '../Provider/utilslib/Utils'

export default function CustomButton(props) {
   
    return (
        <TouchableOpacity onPress={props.navigate} activeOpacity={0.9} style={props.btnColour == 'red' ? styles.button1 : styles.button} >
            <Text style={{textAlign: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.whiteColor   }}>{props.title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        width: '95%',
        backgroundColor: Colors.themecolor,
        borderRadius: mobileW * 2 / 100,
        paddingVertical: mobileW * 3.5 / 100,
        alignSelf: 'center'
    },
    button1: {
        width: '95%',
        backgroundColor: 'red',
        borderRadius: mobileW * 2 / 100,
        paddingVertical: mobileW * 3.5 / 100,
        alignSelf: 'center'
    }
})
