import React, { Component } from 'react'
import { Text, Keyboard, View, TouchableOpacity, StyleSheet, Image, TextInput } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { msgProvider, msgText, msgTitle, localStorage, apifuntion, config, Lang_chg, AppProvider, Mapprovider, validation, Font, Colors, consolepro, mobileH, mobileW } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Contact_us extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            mobile: '',
            message: '',
            user_type:''
        }
    }

    componentDidMount() {

        this.props.navigation.addListener('focus', payload => {
            this.get_userData()

        });


    }


    get_userData = async () => {

        let user_details = await localStorage.getItemObject('user_arr');
        console.log('user_details', user_details)
        this.setState({email:user_details.email, mobile: user_details.mobile,user_type:user_details.user_type })

    }


    backpress = () => {
        this.props.navigation.goBack();
    }

    submit_click = async () => {
        let user_detail = await localStorage.getItemObject('user_arr');

        if (this.state.email.length <= 0) {
            msgProvider.toast(msgText.emptyEmail[config.language], 'center')
            return false;
        }
        const reg1 = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (reg1.test(this.state.email) !== true) {
            msgProvider.toast(msgText.validEmail[config.language], 'center')
            return false
        }
        if (this.state.message.trim().length <= 0) {
            msgProvider.toast(msgText.emptyMessage[config.language], 'center')
            return false;
        }

        let url = config.baseURL + "contact_us.php";
        var data = new FormData();
        data.append('user_id', user_detail.user_id)
        data.append('email', this.state.email)
        data.append('mobile', this.state.mobile)
        data.append('message', this.state.message)
        apifuntion.postApi(url, data).then((obj) => {
            if (obj.success == 'true') {
                this.backpress()
                msgProvider.toast(msgText.requestSubmit[config.language], 'center')
            } else {
                console.log('entered in else')
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
            <Container backgroundColor='#fff'>
                <Header
                    showback={true}
                    title={Lang_chg.contactushead[config.language]}
                    goBack={() => { this.props.navigation.goBack() }}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                        <View style={{ width: '95%', alignSelf: 'center' }}>
                            <View style={styles.container}>
                                <View style={{ width: '9%', justifyContent: 'center' }}>
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
                                        editable={ this.state.user_type == 1 ? true : false}
                                    />
                                </View>

                            </View>
                            <View style={styles.container}>
                                <View style={{ width: '8%', justifyContent: 'center' }}>
                                    <Image source={require('../icons/flag.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                                </View>
                                <View style={{ width: '10%', }}>
                                    <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100, color: Colors.black_color }}>+45</Text>
                                </View>
                                <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
                                </View>
                                <View style={{ width: '80%', paddingHorizontal: mobileW * 1 / 100 }} >
                                    <TextInput style={styles.TextInput}
                                        placeholder={Lang_chg.mobile[config.language]}
                                        onChangeText={(txt) => { this.setState({ mobile: txt }) }}
                                        value={this.state.mobile}
                                        placeholderTextColor={Colors.placeholdertextcolor}
                                        returnKeyLabel='done'
                                        returnKeyType='done'
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                        keyboardType={'number-pad'}
                                        editable={false}
                                    />
                                </View>

                            </View>

                            <View style={{
                                flexDirection: 'row',
                                width: '95%',
                                alignSelf: 'center',
                                marginTop: mobileW * 6 / 100,
                                alignSelf: 'center',
                                height: mobileH * 15 / 100,
                                borderBottomWidth: 1,
                                paddingHorizontal: mobileW * 1 / 100,
                                borderBottomColor: Colors.placeholderbordercolor,
                            }}>
                                <View style={{
                                    width: '12%', alignItems: "center", paddingTop: mobileW * 3 / 100
                                }}>
                                    <Image style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, resizeMode: 'contain', alignSelf: 'center', }} source={require('../icons/pen.png')}>
                                    </Image>
                                </View>
                                <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor, alignItems: 'center', marginTop: mobileW * 2 / 100 }}>
                                </View>
                                <TextInput
                                    style={{
                                        width: '87%',
                                        fontSize: mobileW * 4 / 100,
                                        paddingHorizontal: mobileW * 2 / 100,
                                        fontFamily: Font.regular_font,
                                        textAlignVertical: 'top',
                                        color: Colors.black_color,
                                    }}
                                    onChangeText={(txt) => { this.setState({ message: txt }) }}
                                    value={this.state.message}
                                    maxLength={250}
                                    multiline={true}
                                    numberOfLines={4}
                                    placeholderTextColor={Colors.placeholdertextcolor} placeholder={Lang_chg.message[config.language]}
                                />

                            </View>
                            <View style={{ width: '100%', marginTop: mobileW * 15 / 100 }}>
                                <CustomButton
                                    navigate={() => { this.submit_click() }}
                                    title={Lang_chg.submitbtn[config.language]}
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
        paddingHorizontal: mobileW * 3 / 100,
        paddingBottom: Platform.OS == 'ios' ? mobileW * 2 / 100 : 0,

    },
    TextInput: {
        width: mobileW * 100 / 100,
        fontSize: mobileW * 4 / 100,
        fontFamily: Font.regular_font,
        color: Colors.textinputcolor,
        justifyContent: 'center',
    },

})
