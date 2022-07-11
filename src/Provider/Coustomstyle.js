import { StyleSheet } from "react-native";
import { mobileH, mobileW, Colors } from "./utilslib/Utils";
export const comstyle = StyleSheet.create({
    footericoncontainer: {
        width: '20%', height: mobileH * 7 / 100, alignItems: 'center', justifyContent: 'center'
    },
    imageview: {
        width: '100%', alignItems: 'center'
    },
    footerimage: {
        width: mobileW * 5.7 / 100, height: mobileW * 5.7 / 100, resizeMode: 'contain'
    },
    footerimageaddbotton: {
        width: mobileW * 10.6 / 100, height: mobileW * 10.6 / 100, resizeMode: 'contain'
    },
    textinputcontainer: {
        width: '90%', flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: '#FFFFFF',
        borderWidth: 0.2,
        shadowColor: Colors.border_color,
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 1, elevation: 2,
        marginTop: mobileW * 4 / 100,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: mobileW * 2.5 / 100,
    },
})
