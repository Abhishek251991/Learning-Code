import React from 'react'
import { View, Text, SafeAreaView, StatusBar } from 'react-native'
import { Colors } from '../Provider/utilslib/Utils'

export default function Status_bar() {
    return (
        <>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.statusbarcolor }} />
            <StatusBar backgroundColor={Colors.statusbarcolor} barStyle='light-content' hidden={false} translucent={false}
                networkActivityIndicatorVisible={true} />
        </>
    )
}