import React, { Component } from 'react';
import { Text, View, Image, TextInput, StyleSheet, ScrollView, Switch, Modal, TouchableOpacity, Dimensions, Alert, FlatList, BackHandler } from 'react-native';
// import Styles from '../Provider/Coustomstyle'
// import Loader from './Loader';
// import {firebaseprovider}  from './providers/FirebaseProvider';
import { localStorage, msgProvider, config, msgText, msgTitle, Colors, Font, mobileH, mobileW, localimag, Lang_chg } from './utilslib/Utils';
let navigation = '';
let userid =0;
export default class Footer1 extends Component {
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

    // usercheckbtn = async (page) => {

    //     this.props.functionremove
    //     const navigation = this.props.navigation;
    //     let userdata = await localStorage.getItemObject('user_arr')
    //     console.log('userdata', userdata)
    //     if (userdata == null) {

    //         if (this.props.usertype == 1) {
    //             navigation.navigate(page)
    //         }
    //         else {
    //             if (userdata.profile_complete == 0 && userdata.otp_verify == 1) {
    //                 for (let i = 0; i < this.props.footerpage.length; i++) {
    //                     if (page == this.props.footerpage[i].name) {
    //                         navigation.navigate(page)
    //                     }
    //                 }
    //             }
    //             else {
    //                 this.setState({ modalVisible1: true })
    //             }
    //         }
    //     } else {
    //         this.setState({ modalVisible1: true })
    //     }
    // }
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
                        localStorage.setItemObject('skip_status','no'); 
                        navigation.navigate('Login') }
                },
            ],
            { cancelable: false },
        );
    }

    //  checklimitpost=async()=>{
    //     let userdata=await localStorage.getItemObject('user_arr')
    //    console.log('userada',userdata)
    //     let user_id=0
    //     selleraddress1='NA'
    //     if(userdata!=null)
    //       {
    //         user_id=userdata.user_id
    //       }
    //  if(this.state.isConnected===true)
    //     {
    //         this.setState({loading:true})
    //      var url = config.baseURL+'post_limit.php?user_id='+user_id+'&action=today_post'
    //      console.log("url:"+url);


    //      fetch(url,{
    //         method: 'Get',
    //         headers: new Headers(config.headersapi),

    //         }).then((obj)=>{ console.log('obj',obj); this.setState({loading:false,refresh:false});    return  obj.json();}).then((obj)=>{
    //      console.log('obj',obj)
    //          if(obj.success == 'true'){
    //          if(obj.today_limit!="no")
    //          {
    //             this.props.navigation.navigate('AddPost')
    //          }
    //          else{
    //              msgProvider.toast(Languageprovider.Your_limit_for_adding_posts[language_key],"center")
    //          }



    //           } 

    //           else{
    //             msgProvider.alert(msgTitle.error[config.language], obj.msg[config.language], false);
    //             if(obj.active_status=="deactivate")
    //             {
    //              this.props.navigation.navigate('Logout')
    //             }

    //             return false;
    //        }
    //      }).catch((error)=> {
    //        console.log("-------- error ------- "+error);
    //        msgProvider.alert(msgTitle.server[config.language],msgText.servermessage[config.language], false);
    //          this.setState({loading: false,refresh:false});
    //    });
    //   }
    //   else{
    //      msgProvider.alert(msgTitle.internet[config.language], msgText.networkconnection[config.language], false);
    //    }  
    //     }
    // My_Jobs=()=>{
    //     if(userid==0){
    //         this.Checkuser()
    //     }else{
    //         navigation.navigate('My_Jobs')
    //     }
    // }
    newpost=()=>{
        if(userid==0){
            this.Checkuser()
        }else{
            category_id='';
             navigation.navigate('Newpost')
        }
    }
    inbox=()=>{
        if(userid==0){
            this.Checkuser()
        }else{
            navigation.navigate('Inbox')
        }
    }
    profile=()=>{
        if(userid==0){
            this.Checkuser()
        }else{
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
                <View style={{ width: '100%', flexDirection: 'row', alignSelf: 'center', backgroundColor: Colors.themecolor, alignItems: 'center',paddingVertical:mobileW*2/100, justifyContent: 'center' }}>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { this.props.navigation.navigate('Provider_Home') }}>
                        {this.props.page == 'Provider_Home' ? <View style={Styles.imageview}>
                            <Image source={require('../icons/home_Active.png')} style={Styles.footerimage} />
                            <Text style={Styles.txthead}>{Lang_chg.home[config.language]}</Text>
                        </View> :
                            <View style={Styles.imageview}>
                                <Image source={require('../icons/home_deactivate.png')} style={Styles.footerimage} />
                                <Text style={Styles.txthead1}>{Lang_chg.home[config.language]}</Text>
                            </View>
                        }
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { this.props.navigation.navigate('Provider_Chat') }}>
                    {this.props.page=='Provider_Chat'? 
                        <View style={Styles.imageview}>
                            <Image source={require('../icons/chat_active.png')} style={Styles.footerimage} />
                            <Text style={Styles.txthead}>{Lang_chg.chathead[config.language]}</Text>
                        </View>:
                        <View style={Styles.imageview}>
                        <Image source={require('../icons/notification_with_dot.png')} style={Styles.footerimage} />
                        <Text style={Styles.txthead1}>{Lang_chg.chathead[config.language]}</Text>
                    </View>}
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => {this.props.navigation.navigate('Provider_MyJobs') }}>
                        <View style={[Styles.imageview, { position: 'absolute', top: -mobileH * 3.7 / 100 }]}>
                            <Image source={require('../icons/job_provider.png')} style={Styles.footerimageaddbotton} />
                           
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { this.props.navigation.navigate('Provider_Earnings') }}>
                    {this.props.page=='Provider_Earnings'? <View style={Styles.imageview}>
                            <Image source={require('../icons/wallet_active.png')} style={Styles.footerimage} />
                            <Text style={Styles.txthead}>Earnings</Text>
                        </View>:
                        <View style={Styles.imageview}>
                        <Image source={require('../icons/wallet_provider.png')} style={Styles.footerimage} />
                        <Text style={Styles.txthead1}>Earnings</Text>
                    </View>}
                    </TouchableOpacity>
                    <TouchableOpacity style={Styles.footericoncontainer} onPress={() => { this.props.navigation.navigate('Provider_Profile') }}>
                    {this.props.page=='Provider_Profile'? <View style={Styles.imageview}>
                            <Image source={require('../icons/profile_active.png')} style={Styles.footerimage} />
                            <Text style={Styles.txthead}>Profile</Text>
                        </View>:
                         <View style={Styles.imageview}>
                         <Image source={require('../icons/profile_footer.png')} style={Styles.footerimage} />
                         <Text style={Styles.txthead1}>Profile</Text>
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