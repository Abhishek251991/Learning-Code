import React, { Component } from 'react'
import { StyleSheet, Keyboard, Text, Platform, View, TouchableOpacity, TextInput, ImageBackground, Image } from 'react-native'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText,firebaseprovider } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import firebase from './../Config1';
import Firebase from 'firebase';


export default class Login_Provider extends Component {
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

  login_click = async () => {
    //alert('hello')
    Keyboard.dismiss()
    let email = this.state.email;
    if (email.length <= 0) {
      msgProvider.toast(msgText.emptyEmail[config.language], 'center')
      return false;
    }
    if (config.regemail.test(email) !== true) {
      msgProvider.toast(msgText.validEmail[config.language], 'center')
      return false
    }
    let password = this.state.password;
    if (password.length <= 0) {
      msgProvider.toast(msgText.emptyPassword[config.language], 'center')
      return false;
    }
    if (password.length < 6) {
      msgProvider.toast(msgText.emptypasswordsize[config.language], 'center')
      return false;
    }
    console.log('obj', this.state.password);

    //this.textClearInput()
    let url = config.baseURL + "login_provider.php";

    var data = new FormData();
    data.append('email', this.state.email)
    data.append('password', this.state.password)
    data.append('action', 'normal_login')
    data.append("device_type", config.device_type)
    data.append("player_id", config.player_id)

    console.log('data', data);

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj);
      this.setState({ notification_arr: obj.notification_arr })
      consolepro.consolelog('obj.notification', obj.notification_arr);
      if (obj.success == 'true') {
        this.authuser();
        var user_details = obj.user_details;
        localStorage.setItemObject('user_arr', user_details);
        setTimeout(()=>{

          //  notification.notification_arr(this.state.notification_arr)
          this.textClearInput()
          firebaseprovider.firebaseUserCreate();
          firebaseprovider.getMyInboxAllData();
          this.props.navigation.navigate('Provider_Home');
        })
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

  authuser=()=>{
    Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
    .then(() => {
      console.log('vikas');
      return Firebase.auth().signInAnonymously();
    })
    .catch((error) => {
        var errorCode = error.code;
         var errorMessage = error.message;
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

            <View style={{ width: '95%', alignSelf: 'center', backgroundColor: Colors.whiteColor }}>
              <View style={{ width: '100%', marginTop: mobileW * 12 / 100, alignSelf: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: Font.bold_font, fontSize: mobileW * 6 / 100 }}>{Lang_chg.login_Provider_text[config.language]}</Text>
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
                <View style={styles.container}>
                  <View style={{ width: '8%', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                  </View>
                  <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
                  </View>
                  <View style={{ width: '75%', paddingHorizontal: mobileW * 1 / 100 }} >
                    <TextInput style={styles.TextInput}
                      secureTextEntry={this.state.securePassword}
                      placeholder={Lang_chg.password_personal[config.language]}
                      onChangeText={(txt) => { this.setState({ password: txt }) }}
                      value={this.state.password}
                      maxLength={16}
                      placeholderTextColor={Colors.placeholdertextcolor}
                      returnKeyLabel='done'
                      returnKeyType='done'
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                      keyboardType={'default'}
                    />
                  </View>
                  <TouchableOpacity onPress={() => { this.setState({ securePassword: !this.state.securePassword }) }} style={{ width: '15%', justifyContent: 'center', }}>
                    <Text style={{ fontFamily: Font.semibold_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{this.state.securePassword ? Lang_chg.show_text[config.language] : Lang_chg.hide_text[config.language]}</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{ width: '100%', marginTop: mobileW * 6 / 100 }}>
                <CustomButton
                  navigate={() => { this.login_click() }}
                  title={Lang_chg.loginbtn[config.language]}
                />
              </View>
              <TouchableOpacity onPress={() => this.props.navigation.navigate('Provider_forget_password')} style={{ width: '50%', marginTop: mobileW * 3 / 100, alignItems: 'center', alignSelf: 'center' }}>
                <Text style={{
                  width: '100%', fontFamily: Font.medium_font,
                  textAlign: 'center', fontSize: mobileW * 4 / 100
                }}>{Lang_chg.forget_password[config.language]}</Text>
              </TouchableOpacity>






            </View>



          </TouchableOpacity>

        </KeyboardAwareScrollView>
        <HideWithKeyboard>
          <View style={{ width: '100%', alignItems: 'flex-end', position: 'absolute', bottom: 0 }}>
            <Image source={require('../icons/login_2.png')} resizeMode='cover' style={{ width: mobileW * 45 / 100, height: mobileW * 30 / 100 }} />
          </View>
        </HideWithKeyboard>
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
