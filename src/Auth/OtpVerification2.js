import React, { useState, useEffect, useRef } from 'react'
import { Alert, StyleSheet, Keyboard, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import CustomButton from '../Common/CustomButton'
import Header from '../Common/Header'
import Container from '../Common/Container'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import CountDown from 'react-native-countdown-component';
import OTPTextInput from 'react-native-otp-textinput';

export default function OtpVerification2() {
  const navigation = useNavigation();
  const [otp1, setOtp1] = useState('');
  const [otp2, setOtp2] = useState('');
  const [otp3, setOtp3] = useState('');
  const [otp4, setOtp4] = useState('');
  const [countshow, setcountshow] = useState(true);
  const otpInput = useRef(null);


  const clearText = () => {
    otpInput.current.clear();
  }

  const setText = () => {
    otpInput.current.setValue("1234");
  }
  useEffect(() => {

    get_userData()


  }, [])
  const get_userData = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    let otp_text1 = user_details.otp;
    let otp_text = otp_text1.toString();
    var myArray = otp_text.split("");
    // setOtp1(myArray[0])
    // setOtp2(myArray[1])
    // setOtp3(myArray[2])
    // setOtp4(myArray[3])
    Alert.alert(Lang_chg.otpVerifyText[config.language] + myArray[0] + myArray[1] + myArray[2] + myArray[3])
  }

  const verify_click = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    Keyboard.dismiss()

    if (otp1.length <= 0) {
      msgProvider.toast(msgText.lengthOtp[config.language], 'center')
      return false;
    }
    if (otp1.length < 4) {
      msgProvider.toast(msgText.lengthFourOtp[config.language], 'center')
      return false;
    }

    let url = config.baseURL + "otp_verify.php";
    console.log('url', url)
    console.log('otp', otp1)
    console.log('user_id', user_details.user_id)
    var data = new FormData();
    data.append('user_id', user_details.user_id)
    data.append('otp', otp1)

    apifuntion.postApi(url, data).then((obj) => {

      console.log('obj12345', obj)
      if (obj.success == 'true') {
        var user_details = obj.user_details;
        localStorage.setItemObject('user_arr', user_details);
        navigation.navigate('Change_Password2')

      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      console.log("-------- error ------- " + error);

    });


  }

  const resend_click = async () => {
    let user_details = await localStorage.getItemObject('user_arr');

    let url = config.baseURL + "resend_otp.php";
    var data = new FormData();
    consolepro.consolelog('url', url)
    consolepro.consolelog('data', data)
    data.append('user_id', user_details.user_id)

    apifuntion.postApi(url, data).then((obj) => {
      consolepro.consolelog('obj', obj)
      if (obj.success == 'true') {
        localStorage.setItemObject('user_arr', obj.user_details)
        get_userData()
        // msgProvider.toast(obj.msg[config.language], 'center')
        setcountshow(true)
      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);

    });
  }
  return (
    <Container backgroundColor={Colors.whiteColor}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '15%', alignItems: 'center', marginTop: mobileW * 10 / 100 }}>
              <TouchableOpacity onPress={() => { navigation.goBack() }} activeOpacity={0.9} >
                <Image source={require('../icons/back.png')} resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </TouchableOpacity>
            </View>
            <View style={{ width: '85%', alignItems: 'flex-end' }}>
              <Image source={require('../icons/forget_2.png')} style={{ width: mobileW * 45 / 100, height: mobileW * 25 / 100, }} />
            </View>
          </View>

          <View style={{ width: '95%', alignSelf: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center', alignSelf: 'center', marginTop: mobileW * -10 / 100, marginBottom: mobileW * -4 / 100 }}>
              <Image source={require('../icons/logo.png')} resizeMode='contain' style={{ width: mobileW * 35 / 100, height: mobileW * 35 / 100 }} />
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginTop: mobileW * 5 / 100 }}>
              <Text style={{ width: '100%', textAlign: 'center', fontSize: mobileW * 6 / 100, fontFamily: Font.semibold_font }}>{Lang_chg.otpverification[config.language]}</Text>
            </View>
            <View style={{ width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: mobileW * 3 / 100 }}>
              <Text style={{
                width: '75%', textAlign: 'center', fontSize: mobileW * 4 / 100,
                fontFamily: Font.medium_font, color: Colors.black_color
              }}>{Lang_chg.otpdescription[config.language]}</Text>
            </View>

            <View style={{ width: '100%', marginTop: mobileW * 4 / 100, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <OTPTextInput
                // handleChange={(code) => console.log(code)}
                // numberOfInputs={4}
                // ref={e => (otpInput = e)}
                // defaultValue={totp1}
                containerStyle={styles.textInputContainer}
                handleTextChange={text => setOtp1(text)}
                textInputStyle={styles.roundedTextInput}
                numberOfInputs={4}
                cellTextLength={1}
                tintColor="#f5f5ff"
                offTintColor="#f5f5ff"
                keyboardType={'number-pad'}
              />
              {/* <TextInput
                style={styles.textInput}
                onChangeText={(otp1) => setOtp1(otp1)}
                placeholderTextColor={Colors.placeholdertextcolor}
                keyboardType='number-pad'
                returnKeyLabel='done'
                returnKeyType='done'
                maxLength={1}
                value={otp1}
                onSubmitEditing={() => { Keyboard.dismiss() }}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={(otp2) => setOtp2(otp2)}
                placeholderTextColor={Colors.placeholdertextcolor}
                keyboardType='number-pad'
                returnKeyLabel='done'
                returnKeyType='done'
                maxLength={1}
                value={otp2}
                onSubmitEditing={() => { Keyboard.dismiss() }}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={(otp3) => setOtp3(otp3)}
                placeholderTextColor={Colors.placeholdertextcolor}
                keyboardType='number-pad'
                returnKeyLabel='done'
                returnKeyType='done'
                maxLength={1}
                value={otp3}
                onSubmitEditing={() => { Keyboard.dismiss() }}
              />
              <TextInput
                style={styles.textInput}
                onChangeText={(otp4) => setOtp4(otp4)}
                placeholderTextColor={Colors.placeholdertextcolor}
                keyboardType='number-pad'
                returnKeyLabel='done'
                returnKeyType='done'
                maxLength={1}
                value={otp4}
                onSubmitEditing={() => { Keyboard.dismiss() }}
              /> */}
            </View>
            <View style={{ width: '100%', alignItems: 'center', marginTop: mobileW * 6 / 100 }}>
              {countshow == false && <Text onPress={() => resend_click()} style={{ fontFamily: Font.regular_font, fontSize: mobileW * 3.8 / 100, color: Colors.msg_color }}>{Lang_chg.resettext[config.language]}</Text>}
              {countshow == true &&
                <CountDown
                  until={60 * 2}
                  size={16}
                  onFinish={() => { setcountshow(false) }}
                  digitStyle={{ backgroundColor: '#FFF' }}
                  digitTxtStyle={{ color: '#eb133a' }}
                  timeLabelStyle={{ color: '#eb133a', fontSize: 1, }}
                  timeToShow={['M', 'S']}
                  timeLabels={{ m: '', s: '' }}
                  showSeparator={true}
                />
              }
            </View>
            <View style={{ width: '100%', marginTop: mobileW * 8 / 100 }}>
              <CustomButton
                navigate={() => { verify_click() }}
                title={Lang_chg.verifybtn[config.language]}
              />


            </View>
          </View>


        </TouchableOpacity>

      </KeyboardAwareScrollView>
      <HideWithKeyboard>
        <View style={{ width: '50%', }}>
          <Image source={require('../icons/forget_1.png')} resizeMode='stretch' style={{ width: mobileW * 50 / 100, height: mobileH * 20 / 100 }} />
        </View>
      </HideWithKeyboard>
    </Container>
  )
}

const styles = StyleSheet.create({
  textInput: {
    width: '20%',
    borderBottomWidth: 1,
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.regular_font,
    color: Colors.textinputcolor,
    borderBottomColor: Colors.placeholderbordercolor
  },
  container_otp: {
    width: mobileW * 60 / 100,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: mobileW * 7 / 100

  },
  textInputContainer: {
    alignSelf: 'center',

  },
  roundedTextInput: {
    //  borderRadius: mobileW * 6 / 100,
    borderBottomWidth: mobileW * 1 / 100,
    borderBottomColor: '#727272',
    // color: Colors.theme_color,
    height: mobileW * 12 / 100,
    width: mobileW * 20 / 100,
    fontSize: mobileW * 5 / 100,
    fontFamily: Font.fontbold
    // borderStyle:'double'
  },
})
