import React, { Component } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, Switch, Modal, TouchableOpacity, Dimensions, Alert, FlatList, BackHandler } from 'react-native';
// import Styles from '../Provider/Coustomstyle'
// import Loader from './Loader';
// import {firebaseprovider}  from './providers/FirebaseProvider';
import { localStorage, msgProvider, config, msgText, msgTitle, Colors, Font, mobileH, mobileW, localimag, Lang_chg } from './utilslib/Utils';
import { firebaseprovider } from './FirebaseProvider';
import firebase from '../Config1';
import Firebase from 'firebase';

let navigation = '';
let userid = 0;
export default class Footer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: '',
            modalVisible1: false,
            loading: false,
            isConnected: true,
            userimage: ''
        }

    }

    componentDidMount() {
        firebaseprovider.firebaseUserGetInboxCount()
    }
    Checkuser = () => {

        Alert.alert(
            'Confirm',
            'Please first login',
            [
                {
                    text: msgTitle.cancel[0],
                },
                {
                    text: msgTitle.ok[0],
                    // onPress: () =>  this.btnPageLoginCall(),
                    onPress: () => {
                        localStorage.setItemObject('skip_status', 'no');
                        navigation.navigate('Login')
                    }
                },
            ],
            { cancelable: false },
        );
    }

    My_Jobs = () => {
        if (userid == 0) {
            this.Checkuser()
        } else {
            navigation.navigate('My_Jobs')
        }
    }
    newpost = () => {
        if (userid == 0) {
            this.Checkuser()
        } else {
            category_id = '';
            navigation.navigate('Newpost')
        }
    }
    inbox = () => {
        if (userid == 0) {
            this.Checkuser()
        } else {
            navigation.navigate('Inbox')
        }
    }
    profile = () => {
        if (userid == 0) {
            this.Checkuser()
        } else {
            navigation.navigate('Profile')
        }
    }
    render() {
        // console.log('foter page count_inbox',count_inbox)
        console.log('this.props.page', this.props.page + '/n')
        navigation = this.props.navigation;
        userid = this.props.user_id;

        return (
            <View style={{ width: '100%', position: 'absolute', bottom: 0, justifyContent: 'center', alignItems: 'center', height: mobileH * 8 / 100 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignSelf: 'center', backgroundColor: Colors.themecolor, alignItems: 'center', paddingVertical: mobileW * 2 / 100, justifyContent: 'center' }}>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { this.props.navigation.navigate('Home') }}>
                        {this.props.page == 'Home' ? <View style={Styles.imageview}>
                            <Image source={require('../icons/home_Active.png')} style={Styles.footerimage} />
                            <Text style={Styles.txthead}>{Lang_chg.home[config.language]}</Text>
                        </View> :
                            <View style={Styles.imageview}>
                                <Image source={require('../icons/home_deactivate.png')} style={Styles.footerimage} />
                                <Text style={Styles.txthead1}>{Lang_chg.home[config.language]}</Text>
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { config.guestUserCheck(this.props.navigation, 'My_Jobs') }}>
                        {this.props.page == 'My_Jobs' ?
                            <View style={Styles.imageview}>
                                <Image source={require('../icons/my_job_active.png')} style={Styles.footerimage} />
                                <Text style={Styles.txthead}>{Lang_chg.my_jobHeader[config.language]}</Text>
                            </View> :
                            <View style={Styles.imageview}>
                                <Image source={require('../icons/my_job.png')} style={Styles.footerimage} />
                                <Text style={Styles.txthead1}>{Lang_chg.my_jobHeader[config.language]}</Text>
                            </View>}
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { config.guestUserCheck(this.props.navigation, 'Post_Job') }}>
                        <View style={[Styles.imageview, { position: 'absolute', top: -mobileH * 3.7 / 100 }]}>
                            <Image source={require('../icons/plus-footer.png')} style={Styles.footerimageaddbotton} />

                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { config.guestUserCheck(this.props.navigation, 'Chat') }}>
                        {this.props.page == 'Chat' ? <View style={Styles.imageview}>
                            <Image source={require('../icons/chat_active.png')} style={Styles.footerimage} />
                            <Text style={Styles.txthead}>{Lang_chg.chathead[config.language]}</Text>
                        </View> :
                        count_inbox <= 0 ?
                            <View style={Styles.imageview}>
                                <Image source={require('../icons/chat.png')} style={Styles.footerimage} />
                                <Text style={Styles.txthead1}>{Lang_chg.chathead[config.language]}</Text>
                            </View>
                            :
                            <View style={Styles.imageview}>
                                <Image source={require('../icons/notification_with_dot.png')} style={Styles.footerimage} />
                                <Text style={Styles.txthead1}>{Lang_chg.chathead[config.language]}</Text>
                            </View>
                            
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { config.guestUserCheck(this.props.navigation, 'Profile') }}>
                        {this.props.page == 'Profile' ? <View style={Styles.imageview}>
                            <Image source={require('../icons/profile_active.png')} style={Styles.footerimage} />
                            <Text style={Styles.txthead}>{Lang_chg.profile_header[config.language]}</Text>
                        </View> :
                            <View style={Styles.imageview}>
                                <Image source={require('../icons/profile_footer.png')} style={Styles.footerimage} />
                                <Text style={Styles.txthead1}>{Lang_chg.profile_header[config.language]}</Text>
                            </View>}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}
const Styles = StyleSheet.create({
    txthead1: { marginTop: 3, fontSize: mobileW * 3.5 / 100, color: Colors.whiteColor, fontFamily: Font.regular_font },
    txthead: { marginTop: 3, fontSize: mobileW * 3.5 / 100, color: Colors.whiteColor, fontFamily: Font.regular_font },
    footericoncontainer: {
        width: '20%', height: mobileH * 7 / 100, alignItems: 'center', justifyContent: 'center'
    },
    imageview: {
        width: '100%', alignItems: 'center', justifyContent: 'center'
    },
    footerimage: {
        width: mobileW * 6 / 100, height: mobileW * 6 / 100, resizeMode: 'contain'
    },
    footerimageaddbotton: {
        width: mobileW * 16 / 100, height: mobileW * 16 / 100, resizeMode: 'contain'
    }
})