import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { Colors, Font, mobileH, mobileW } from '../utilslib/Utils';

const commonStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.whiteColor,
    },
    appBarStyle: {
        flexDirection: 'row',
        width: '100%',
        paddingHorizontal: 10,
        alignItems: 'center',
        backgroundColor: Colors.whiteColor,
        height: mobileH * 8 / 100,
    },
    leadingContainerStyle: {
        width: '15%',
    },
    leadingIcon: {
        marginLeft: mobileW * 3 / 100,
        width: mobileW * 7 / 100,
        height: mobileW * 7 / 100,
        resizeMode: 'contain'
    },
    centerContainerStyle: {
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    centerTitleText: {
        width: '100%',
        fontSize: Font.fontSize5,
        color: Colors.textColor,
        fontFamily: Font.montserrat_Bold,
        textAlign: 'center'
    },
    actionContainerStyle: {
        width: '15%'
    },
    actionButtons: {
        alignSelf: 'center',
        width: mobileW * 7.5 / 100,
        height: mobileW * 7.5 / 100,
        resizeMode: 'contain'
    },
    screenBody: {
        width: mobileW * 90 / 100,
        alignSelf: 'center',
    }
});
export { commonStyle }