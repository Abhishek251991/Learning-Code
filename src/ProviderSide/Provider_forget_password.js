
import React, { Component } from 'react'
import { StyleSheet, Keyboard, Text, Platform, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HideWithKeyboard from 'react-native-hide-with-keyboard';

export default class Provider_forget_password extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            securePassword: true,
            notification_arr: [],
            player_id: '12345'
        }
    }

    textClearInput = () => {
        // this.email.clear();
        // this.password.clear();
        this.setState({ email: '', password: '' })
    }
    backpress = () => {
        this.props.navigation.goBack();
    }

    submit_click = async () => {

        if (this.state.email.length <= 0) {
            msgProvider.toast(msgText.emptyEmail[config.language], 'center')
            return false;
        }
        if (config.regemail.test(this.state.email) !== true) {
            msgProvider.toast(msgText.validEmail[config.language], 'center')
            return false
        }
        let url = config.baseURL + "forget_password_provider.php";
        var data = new FormData();
        data.append('email', this.state.email)
        apifuntion.postApi(url, data).then((obj) => {
            console.log('obj12345', obj)
            if (obj.success == 'true') {
                msgProvider.toast(msgText.title_resetlink1[config.language], 'center')
                this.backpress();
            }
            else {
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
                    config.checkUserDeactivate(this.props.navigation);
                }
                return false;
            }
        }).catch((error) => {
            console.log("-------- error ------- " + error);

        });

    }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                        <View style={{ width: mobileW * 100 / 100, height: mobileH * 30 / 100 }}>
                            <ImageBackground source={require('../icons/login_1.png')} resizeMode='stretch' style={{ width: '100%', height: '100%' }} >
                                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} style={{ width: '15%', alignItems: 'center', marginTop: mobileW * 6 / 100 }}>
                                    <Image source={require('../icons/white_back.png')} resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />

                                </TouchableOpacity>
                                <View style={{ width: '50%', alignItems: 'center', alignSelf: 'center', marginTop: mobileW * 4 / 100 }}>
                                    <Image source={require('../icons/1024_1024_without_transparent.png')} style={{ width: mobileW * 30 / 100, height: mobileW * 30 / 100 }} />
                                </View>
                            </ImageBackground>
                        </View>

                        <View style={{ width: '95%', alignSelf: 'center', backgroundColor: Colors.whiteColor, height: mobileH * 52 / 100 }}>
                            <View style={{ width: '100%', marginTop: mobileW * 12 / 100, alignSelf: 'center', alignItems: 'center' }}>
                                <Text style={{ fontFamily: Font.bold_font, fontSize: mobileW * 6 / 100 }}>{Lang_chg.forget_password_text[config.language]}</Text>
                            </View>
                            <View style={{ width: '100%', marginTop: mobileW * 4 / 100 }}>
                                <View style={styles.container}>
                                    <View style={{ width: '9%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../icons/email.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                                    </View>
                                    <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
                                    </View>
                                    <View style={{ width: '90%', paddingHorizontal: mobileW * 1 / 100 }} >
                                        <TextInput style={styles.TextInput}
                                            placeholder={Lang_chg.email[config.language]}
                                            onChangeText={(txt) => { this.setState({ email: txt }) }}
                                            value={this.state.email}
                                            placeholderTextColor={Colors.placeholdertextcolor}
                                            returnKeyLabel='done'
                                            returnKeyType='done'
                                            onSubmitEditing={() => { Keyboard.dismiss() }}
                                            keyboardType={'default'}
                                            maxLength={50}
                                        />
                                    </View>

                                </View>

                            </View>

                            <View style={{  width: '100%', marginTop: mobileW * 6 / 100 }}>
                                <CustomButton
                                    navigate={() => { this.submit_click() }}
                                    title={Lang_chg.submitbtn[config.language]}
                                />
                            </View>







                        </View>
                        <HideWithKeyboard>
                            <View style={{  width: '100%', alignItems: 'flex-end' }}>
                                <Image source={require('../icons/login_2.png')} resizeMode='cover' style={{ width: mobileW * 45 / 100, height: mobileW * 30 / 100 }} />
                            </View>
                        </HideWithKeyboard>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>

            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        width: '95%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.placeholderbordercolor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: mobileW * 6 / 100,
        paddingBottom: Platform.OS == 'ios' ? mobileW * 2 / 100 : 0,






        // paddingHorizontal:mobileW*4/100,

    },
    TextInput: {
        width: '100%',
        fontSize: mobileW * 4 / 100,
        fontFamily: Font.regular_font,
        color: Colors.textinputcolor,

    },
})
