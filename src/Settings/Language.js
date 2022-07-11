import React, { Component } from 'react'
import { Text, Keyboard, View, BackHandler, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Language extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            english: false,
            danish: false

        }
    }
    componentDidMount() {

        this.props.navigation.addListener('focus', payload => {
            this.checkLanguage();
        });
    }


    checkLanguage = () => {
        if (config.language == 0) {
            this.setState({ english: true })
        } else {
            this.setState({ danish: true })
        }
    }

    update_language = async () => {
        var user_details = await localStorage.getItemObject('user_arr');
        var language = 0;
        if (this.state.english == true) {
            language = 0;
        } else {
            language = 1;
        }
        let url = config.baseURL + "language_update.php";
        var data = new FormData();
        data.append("user_id", user_details.user_id)
        data.append("language_id", language)
        console.log('data', data);
        apifuntion.postApi(url, data).then((obj) => {
            console.log('obj', obj);
            if (obj.success == 'true') {
                var user_details = obj.user_details;
                localStorage.setItemObject('user_arr', user_details);
                config.language = language;
                this.props.navigation.goBack();
            } else {
                console.log('entered in else')
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

                if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
                    config.checkUserDeactivate(this.props.navigation);
                }
                return false;
            }
        }).catch((error) => {
            console.log('entered in catch', error)
        });

    }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                <Header
                    showback={true}
                    title={Lang_chg.languagehead[config.language]}
                    goBack={() => { this.props.navigation.goBack() }}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                        <View style={{ width: '95%', alignSelf: 'center', marginTop: mobileW * 5 / 100 }}>
                            <TouchableOpacity onPress={() => { this.setState({ danish: true, english: false }) }} style={styles.container}>
                                <View style={{ width: '9%', justifyContent: 'center' }}>
                                    <Image source={require('../icons/language.png')} style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} />
                                </View>

                                <View style={{ width: '85%', paddingHorizontal: mobileW * 1 / 100 }} >

                                    <Text style={styles.TextInput}>{Lang_chg.danish[config.language]}</Text>
                                </View>
                                <View style={{ width: '6%', justifyContent: 'center', paddingTop: mobileW * 4 / 100 }}>
                                    {this.state.danish == true && <Ionicons name='checkmark-sharp' size={20} style={{ alignSelf: 'center', color: Colors.themecolor, }} />}
                                </View>

                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => { this.setState({ danish: false, english: true }) }} style={styles.container1}>
                                <View style={{ width: '9%', justifyContent: 'center' }}>
                                    <Image source={require('../icons/language.png')} style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} />
                                </View>

                                <View style={{ width: '85%', paddingHorizontal: mobileW * 1 / 100 }} >

                                    <Text style={styles.TextInput}>{Lang_chg.english[config.language]}</Text>
                                </View>
                                <View style={{ width: '6%', justifyContent: 'center', paddingTop: mobileW * 4 / 100 }}>
                                    {this.state.english == true && <Ionicons name='checkmark-sharp' size={20} style={{ alignSelf: 'center', color: Colors.themecolor, }} />}
                                </View>

                            </TouchableOpacity>
                            <View style={{ width: '100%', marginTop: mobileW * 15 / 100 }}>
                                <CustomButton
                                    navigate={() => { this.update_language() }}
                                    title={Lang_chg.selectbtn[config.language]}
                                />
                            </View>
                        </View>
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
        marginTop: mobileW * 7 / 100,
        paddingHorizontal: mobileW * 1 / 100,
        paddingBottom: mobileW * 2.5 / 100,

    },
    container1: {
        width: '95%',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: Colors.placeholderbordercolor,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: mobileW * 7 / 100,
        paddingHorizontal: mobileW * 1 / 100,
        paddingBottom: mobileW * 1 / 100


    },
    TextInput: {
        width: mobileW * 100 / 100,
        fontSize: mobileW * 4 / 100,
        fontFamily: Font.regular_font,
        color: Colors.textinputcolor,
        justifyContent: 'center',
    },

})