import React, { Component } from 'react'
import { Text, View, TouchableOpacity, BackHandler, Alert, ScrollView, SafeAreaView, StatusBar, StyleSheet, Dimensions, Image, Keyboard, TextInput, keyboardType, ImageBackground, KeyboardAvoidingView } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors, Font, mobileH, config, mobileW, Lang_chg, } from '../utilslib/Utils';
import LinearGradient from 'react-native-linear-gradient'
import MaskedView from '@react-native-community/masked-view';
import { Platform } from 'react-native';

const CustomButtom = ({ onPress, title, icon, platform }) => (
    <TouchableOpacity style={{
        height: mobileH * 6.0 / 100,
        alignSelf: 'flex-end',
        width: mobileW * 35.0 / 100,
        backgroundColor: '#ffffff',
        borderRadius: mobileW * 2.0 / 100,
        shadowColor: '#000000',
        shadowOffset: {
            width: 5.0,
            height: 5.0,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,
        elevation: platform == 'ios' ? 0 : 5,
    }} activeOpacity={.7}
        onPress={onPress}>
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0.6, y: 0.1 }}
            locations={[0, 0.5, 0.9]}
            colors={['#0139ff', '#019fff', '#3FE8FF',]}
            style={{
                height: mobileH * 6.0 / 100,
                width: mobileW * 35.0 / 100,
                justifyContent: 'center',
                borderRadius: mobileW * 2.0 / 100,
                alignSelf: 'flex-end',
            }} >
            <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 0.6, y: 0.1 }}
                locations={[0, 0.5, 0.9]}
                colors={['#0139ff', '#019fff', '#40F0FF',]}
                style={{
                    height: mobileH * 5.0 / 100,
                    width: mobileW * 33.0 / 100,
                    justifyContent: 'center',
                    borderRadius: mobileW * 2.0 / 100,
                    alignSelf: 'center',
                }} >
                <Text style={{
                    fontSize: mobileW * 5.0 / 100,
                    color: 'blue',
                    textAlign: 'center',
                    fontFamily: Font.fontbold,
                }}>{title}</Text>
            </LinearGradient>
        </LinearGradient>
    </TouchableOpacity>
);
