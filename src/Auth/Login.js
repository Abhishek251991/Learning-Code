import React, { useState } from 'react'
import { StyleSheet, Keyboard, Text, Platform, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import firebase from './../Config1';
import Firebase from 'firebase';
import { firebaseprovider } from '../Provider/FirebaseProvider';

export default function Login() {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [check, setcheck] = useState(false)
  const [player_id, setplayer_id] = useState('12345')
  const [notification_arr, setnotification_arr] = useState([])
  const [language, setlanguage] = useState(0)

  console.log('config.language', config.language)
  const login_click = async () => {
    //alert('hello')
    Keyboard.dismiss()

    if (mobile.length <= 0) {
      msgProvider.toast(msgText.emptymobileNumber[config.language], 'center')
      return false;
    }
    // if (config.regeMobile.test(mobile) !== true) {
    //   msgProvider.toast(msgText.emptyMobiledigit[config.language], 'center')
    //   return false;
    // }
     if (mobile.length < 7) {
       msgProvider.toast(msgText.emptyMobiledigit[config.language], 'center')
       return false;
     }

    let url = config.baseURL + "login.php";

    var data = new FormData();
    data.append('mobile', mobile)
    data.append('action', 'normal_login')
    data.append("device_type", config.device_type)
    data.append("player_id", player_id)
    data.append("language_id", config.language)
    console.log('data', data);

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj);
      if (obj.success == 'true') {
        var user_details = obj.user_details;
        

        setTimeout(()=>{
          console.log('user_details.otp_verify', user_details.otp_verify)
          localStorage.setItemObject('user_arr', user_details);
          firebaseprovider.firebaseUserCreate();
          firebaseprovider.getMyInboxAllData();


          if ((user_details.otp_verify == 1) && (user_details.profile_complete == 1)) {
            navigation.navigate('Password')
          } else if((user_details.otp_verify == 1) && (user_details.profile_complete == 0)){
            navigation.navigate('PersonalDetails')
          } else {
            navigation.navigate('OtpVerification')
          }
          
        },500)

        // var user_details = obj.user_details;
        // localStorage.setItemObject('user_arr', user_details);
        // if (obj.otp_verify == 0) {

        //   navigation.navigate('OtpVerification')
        // } else {
        //   consolepro.consolelog('user_details123456', user_details)
        //   const uservalue = { login_type: user_details.login_type, mobile: mobile,  'login_type': 'normal' };
        //   localStorage.setItemObject('user_login', uservalue);
        //   localStorage.setItemObject('user_arr', user_details);

        //   // firebaseprovider.firebaseUserCreate();
        //   // firebaseprovider.getMyInboxAllData();
        // }
        setMobile('')

      } else {
        console.log('entered in else')
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      console.log('entered in catch', error)
    });

  }



  const setLanuguage = async () => {
    var lang = 0
    if (language == 0) {
      lang = 1  // Danish
    } else {
      lang = 0   // English
    }
    config.language = lang
    consolepro.consolelog('config.language', config.language)
    setlanguage(config.language)
    setcheck(false)
  }

  const setUserDetailsNull = async () =>{
    localStorage.clear()

    navigation.navigate('Home');
  }

  return (
    <Container backgroundColor={Colors.whiteColor}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} >
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
          <View style={{ width: mobileW * 100 / 100, height: mobileH * 30 / 100 }}>
            <ImageBackground source={require('../icons/login_1.png')} resizeMode='stretch' style={{ width: '100%', height: '100%' }} >
              <View style={{ width: '100%', height: mobileH * 7 / 100 }}>
                <TouchableOpacity onPress={() => { setcheck((prev) => !prev); }} style={{ width: '30%', paddingVertical: mobileW * 1 / 100, marginLeft: mobileW * 3 / 100, justifyContent: 'space-evenly', alignItems: 'center', flexDirection: 'row', borderWidth: 2, borderColor: Colors.whiteColor, borderRadius: mobileW * 1.5 / 100, marginTop: mobileW * 2 / 100 }}>
                  <Image source={require('../icons/language_white.png')} style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} />
                  {config.language == 0 && <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.whiteColor }}>{Lang_chg.english[config.language]}</Text>}
                  {config.language == 1 && <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.whiteColor }}>{Lang_chg.danish[config.language]}</Text>}
                  <TouchableOpacity onPress={() => { setcheck((prev) => !prev); }} >
                    <Image source={require('../icons/dropdown_white.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                  </TouchableOpacity>
                </TouchableOpacity>
                {check == true && <TouchableOpacity onPress={() => setLanuguage()} style={{ width: '30%', top: -2, marginLeft: mobileW * 3 / 100, justifyContent: 'space-evenly', alignItems: 'center', borderWidth: 2, borderColor: Colors.whiteColor, borderBottomLeftRadius: mobileW * 1.5 / 100, borderBottomRightRadius: mobileW * 1.5 / 100 }}>
                  {config.language == 1 && <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.whiteColor }}>{Lang_chg.english[config.language]}</Text>}
                  {config.language == 0 && <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.whiteColor }}>{Lang_chg.danish[config.language]}</Text>}
                </TouchableOpacity>}
              </View>
              <View style={{ width: '50%', alignItems: 'center', alignSelf: 'center' }}>
                <Image source={require('../icons/1024_1024_without_transparent.png')} style={{ width: mobileW * 30 / 100, height: mobileW * 30 / 100 }} />
              </View>
            </ImageBackground>
          </View>

          <View style={{ width: '95%', alignSelf: 'center', backgroundColor: Colors.whiteColor }}>
            <View style={{ width: '100%', marginTop: mobileW * 14 / 100, alignSelf: 'center', alignItems: 'center' }}>
              <Text style={{ fontFamily: Font.bold_font, fontSize: mobileW * 6 / 100 }}>{Lang_chg.Title[config.language]}</Text>
            </View>
            <View style={styles.container}>
              <View style={{ width: '7%', justifyContent: 'center' }}>
                <Image source={require('../icons/flag.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '10%', }}>
                <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 4.0 / 100, color: Colors.black_color }}>+45</Text>
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '80%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  placeholder={Lang_chg.mobile[config.language]}
                  onChangeText={(mobile) => setMobile(mobile)}
                  value={mobile}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  maxLength={15}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'number-pad'}
                />
                {/* <Text>mobile number</Text> */}
              </View>
            </View>
            <View style={{ width: '100%', paddingVertical: mobileW * 6 / 100 }}>
              <CustomButton
                navigate={() => { login_click() }}
                title={Lang_chg.loginbtn[config.language]}
              />
            </View>

            <View style={{
              flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
              width: '95%', alignSelf: 'center'
            }}>
              <View style={{ width: '43%', height: 0.8, backgroundColor: Colors.placeholderbordercolor }} />
              <View style={{ width: '14%', }}>
                <Text style={{
                  fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100,
                  color: Colors.black_color, textAlign: 'center',
                }}>{Lang_chg.or_text[config.language]}</Text>
              </View>
              <View style={{ width: '43%', height: 0.8, backgroundColor: Colors.placeholderbordercolor }} />
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Login_Provider') }} style={{
              width: '95%', alignSelf: 'center', borderWidth: 2,
              borderColor: Colors.themecolor, paddingVertical: mobileW * 3 / 100, borderRadius: mobileW * 1.5 / 100, marginTop: mobileW * 8 / 100
            }}>
              <Text style={{
                width: '50%', alignSelf: 'center', textAlign: 'center', fontSize: mobileW * 4 / 100,
                fontFamily: Font.bold_font, color: Colors.themecolor
              }}>{Lang_chg.loginproviderbtn[config.language]}</Text>
            </TouchableOpacity>

            <TouchableOpacity disabled={false} onPress={() => { setUserDetailsNull() }} style={{
              width: '95%', alignSelf: 'center', borderWidth: 2,
              borderColor: Colors.themecolor, paddingVertical: mobileW * 3 / 100, borderRadius: mobileW * 1.5 / 100, marginTop: mobileW * 5 / 100
            }}>
              <Text style={{
                width: '50%', alignSelf: 'center', textAlign: 'center', fontSize: mobileW * 4 / 100,
                fontFamily: Font.bold_font, color: Colors.themecolor
              }}>{Lang_chg.skipbtn[config.language]}</Text>
            </TouchableOpacity>

          </View>
          <View style={{ width: '100%', alignItems: 'flex-end', marginTop: mobileW * 8 / 100 }}>
            <Image source={require('../icons/login_2.png')} resizeMode='cover' style={{ width: mobileW * 45 / 100, height: mobileW * 30 / 100 }} />
          </View>
        </TouchableOpacity>
      </KeyboardAwareScrollView>

    </Container>
  )
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
    width: mobileW * 100 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.regular_font,
    color: Colors.textinputcolor,

  },
})
