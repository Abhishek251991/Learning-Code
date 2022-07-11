import React, { Component } from 'react'
import { StyleSheet, Keyboard, Modal, Text, View, TouchableOpacity, Image, Alert, Linking } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import { Colors, Font, mobileH, mobileW, config, apifuntion, consolepro, msgProvider, msgTitle, msgText, localimag, Currentltlg, localStorage, Lang_chg } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Shareratepro } from '../Provider/Sharerateapp'
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import { Switch } from 'react-native-switch';

export default class Setting extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isEnabled: true,
            modalVisible: false,
            androidLink: '',
            iosLink: '',
            shareAppLink: '',
            notification: true,
        }

    }
    componentDidMount() {
        this.props.navigation.addListener('focus', payload => {
            this.Termsconditiondata()
            this.getdetail()
            console.log('config.language', config.language)
        });

    }
    getdetail = async () => {
        let userdetails = await localStorage.getItemObject('user_arr');
        consolepro.consolelog('userdetails', userdetails)
        if (userdetails.notification_status == 0) {
            this.setState({ notification: false, isEnabled: false })
        }

    }
    LogoutPress = () => {
        Alert.alert(
            'Logout',
            'Are You Sure, You Want to logout', [{
                text: 'No',
                onPress: () => {

                },
                style: 'Yes',
            }, {
                text: 'Yes',
                onPress: () => this.logout()
            }], {
            cancelable: false
        }
        ); // works best when the goBack is async 
        return true;
    };

    notificationbtn1 = async () => {
        let userDetails = await localStorage.getItemObject('user_arr')
        let user_id = userDetails['user_id']
        var url = config.baseURL + 'notification_on_off.php';
        console.log("url", url)
        var data = new FormData();
        data.append('user_id', user_id)
        apifuntion.postApi(url, data).then((obj) => {
            consolepro.consolelog("obj", obj)
            if (obj.success == 'true') {
                let user_details = obj.user_details;
                localStorage.setItemObject('user_arr', user_details);

            } else {
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
                if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
                    config.checkUserDeactivate(this.props.navigation);
                }
                return false;
            }
        }).catch((error) => {
            consolepro.consolelog("-------- error ------- " + error);
        });

    }


    Termsconditiondata = async () => {

        let url = config.baseURL + "get_all_content.php?user_id=" + 0;
        console.log(url)
        apifuntion.noLoaderGetApi(url).then((obj) => {
            consolepro.consolelog('objjjjjj', obj);
            if (obj.success == "true") {
                consolepro.consolelog('objjjjjj1234', obj.content_arr[5].content[0]);
                this.setState({ shareAppLink: obj.content_arr[6].content[0], androidLink: obj.content_arr[4].content[0], iosLink: obj.content_arr[5].content[0] });
            } else {
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

    shareapp = () => {
        let url = 'NA'
        consolepro.consolelog('this.state.shareAppLink', this.state.shareAppLink)
        if (this.state.shareAppLink != '') {
            url = this.state.shareAppLink
            Shareratepro.sharefunction('Handyman', url);
        }
    }
    
    rateapp = () => {
        if (Platform.OS == 'ios') {
            if (this.state.iosLink != null) {
                console.log('rate ios ==', this.state.iosLink)
                Linking.openURL(this.state.iosLink)
            } else {
                Linking.openURL('https://www.apple.com/in/app-store/')
            }

        } else {
            if (this.state.androidLink != null) {
                //console.log('rate android ==', config.content_arr[4].content[0])
                Linking.openURL(this.state.androidLink)
            } else {
                Linking.openURL('https://play.google.com/store')
            }

        }

    }
    logout = async () => {

        //let user_detail =await localStorage.getItemObject('user_login');
        let uservalue = await localStorage.getItemObject('user_login');
        if (uservalue != null) {
            if (uservalue.login_type == 'apple') {
                consolepro.consolelog('googlelogout')
                SocialLogin.socaillogout('google', this.props.navigation)
            } else if (uservalue.login_type == 'facebook') {
                consolepro.consolelog('googlelogout')
                await SocialLogin.socaillogout('facebook', this.props.navigation)
            } else if (uservalue.login_type == 'google') {
                consolepro.consolelog('googlelogout')
                consolepro.consolelog('successfull')
                await SocialLogin.socaillogout('google', this.props.navigation)
            }
        }
        setTimeout(() => {
            localStorage.removeItem('user_arr');
            localStorage.removeItem('user_login');
            localStorage.clear();
            this.props.navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'Login',

                        },
                    ],
                })
            );

        }, 500);
        this.setState({ modalVisible: false })
    }
    render() {
        return (
            <Container backgroundColor='#fff'>
                <Header
                    showback={true}
                    title={Lang_chg.settinghead[config.language]}
                    goBack={() => { this.props.navigation.goBack() }}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ width: '95%', alignItems: 'center',  paddingBottom: mobileW * 3.5 / 100, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                        <TouchableOpacity style={[styles.Container]}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/notification_setting.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.notification[config.language]}</Text>
                            </View>
                            <View style={styles.settingIconHeader}>
                                {/* <Switch
                                    trackColor={{ false: "#767577", true: "#767577" }}
                                    thumbColor={this.state.isEnabled ? "#0B628D" : "#f4f3f4"}
                                    onValueChange={() => { this.setState({ isEnabled: !this.state.isEnabled }), this.notificationbtn1() }}
                                    value={this.state.isEnabled}
                                /> */}
                                <Switch
                                    color={Colors.themecolor}
                                    value={this.state.isEnabled}
                                    onValueChange={(check) => { this.setState({ isEnabled: !this.state.isEnabled }), this.notificationbtn1() }}
                                    activeText={''}
                                    inActiveText={''}
                                    backgroundActive={Colors.themecolor}
                                    backgroundInactive={'#E9E9E9'}
                                    circleActiveColor={Colors.whiteColor}
                                    circleInActiveColor={Colors.themecolor}
                                    circleSize={25}
                                    barHeight={mobileW*5/100}
                                    circleBorderWidth={0.2}
                                    switchLeftPx={2} // denominator for logic when sliding to TRUE position. Higher number = more space from RIGHT of the circle to END of the slider
                                    switchRightPx={2}
                                />

                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Change_Password') }} style={[styles.Container]}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/password.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.changepass[config.language]}</Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Contact_us') }} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/contact_us_Setting.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.contactus[config.language]}</Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Language') }} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/language.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.language[config.language]}</Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.props.navigation.navigate('Faqs') }} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/FAQ_setting.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.faq[config.language]}</Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms_Privacy', { contantpage: 2 })} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/terms.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.termscondition[config.language]} </Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms_Privacy', { contantpage: 1 })} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/Privacy_Policy_setting.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.privacypolicy[config.language]}</Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Terms_Privacy', { contantpage: 0 })} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/about_us1_setting.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.aboutus[config.language]}</Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ width: '95%', alignSelf: 'center', paddingVertical: mobileW * 4 / 100 }}>
                        <TouchableOpacity onPress={() => { this.rateapp() }} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/rate_App_setting.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.rate_app[config.language]} </Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.shareapp() }} style={styles.Container}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/share_app_setting.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.share_app[config.language]}</Text>
                            </View>
                            <View style={styles.rightArrowHeader}>
                                <Image source={require('../icons/dropdown.png')} style={styles.rightArrowStyle} />
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.Container} onPress={() => { this.setState({ modalVisible: true }) }}>
                            <View style={styles.settingIconHeader}>
                                <Image source={require('../icons/log_out.png')} style={styles.settinIconStyle} />
                            </View>
                            <View style={styles.settingSubTextHeader}>
                                <Text style={styles.title}>{Lang_chg.log_out[config.language]} </Text>
                            </View>

                        </TouchableOpacity>
                    </View>

                </KeyboardAwareScrollView>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                    }}>
                    <View style={{ flex: 1, backgroundColor: '#00000aaa' }}>
                        <View style={{
                            width: '90%', paddingVertical: mobileW * 3 / 100, paddingHorizontal: mobileW * 6 / 100, alignSelf: 'center', position: 'absolute', top: mobileH * 40 / 100,
                            borderRadius: mobileW * 2.5 / 100, backgroundColor: Colors.whiteColor
                        }}>
                            <View style={{ width: '100%', marginTop: mobileW * 4 / 100 }}>
                                <Text style={{
                                    width: '100%', color: Colors.black_color
                                    , fontFamily: Font.bold_font, fontSize: mobileW * 5 / 100
                                }}>{Lang_chg.log_out[config.language]}</Text>

                            </View>

                            <View style={{ width: '100%', marginTop: mobileW * 2 / 100 }}>
                                <Text style={{
                                    width: '100%', color: Colors.black_color
                                    , fontFamily: Font.medium_font, fontSize: mobileW * 3.8 / 100
                                }}>{Lang_chg.sure_text[config.language]}</Text>

                            </View>
                            <View style={{ width: '35%', marginTop: mobileW * 8 / 100, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                                <TouchableOpacity style={{ width: '50%' }} onPress={() => { this.logout() }}>
                                    <Text style={{
                                        width: '100%', fontFamily: Font.medium_font, fontSize: mobileW * 3.5 / 100,
                                        color: Colors.red_Color, textAlign: 'right'
                                    }}>{Lang_chg.yes[config.language]}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{ width: '50%' }} onPress={() => { this.setState({ modalVisible: false }) }}>
                                    <Text style={{
                                        width: '100%', fontFamily: Font.medium_font, fontSize: mobileW * 3.5 / 100,
                                        color: Colors.themecolor, textAlign: 'right'
                                    }}>{Lang_chg.no[config.language]}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
            </Container>





        )
    }
}
const styles = StyleSheet.create({
    Container: {
        width: '95%',
        flexDirection: 'row',
        paddingVertical: mobileW * 3 / 100,
        alignSelf: 'center',

    },
    title: {
        fontFamily: Font.regular_font,
        fontSize: mobileW * 4 / 100,
        color: Colors.black_color
    },
    settinIconStyle: {
        width: mobileW * 5 / 100,
        height: mobileW * 5 / 100,
        resizeMode: 'contain'
    },
    settingIconHeader: {
        width: '10%'
    },
    settingSubTextHeader: {
        width: '77%'
    },
    rightArrowHeader: {
        width: '13%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightArrowStyle: {
        width: mobileW * 3.5 / 100,
        height: mobileW * 3.5 / 100,
        resizeMode: 'contain'
    },


})