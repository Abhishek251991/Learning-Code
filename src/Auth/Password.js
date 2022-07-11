import React, { Component } from 'react'
import { Text, View, StyleSheet, Image, ImageBackground, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import CustomButton from '../Common/CustomButton'
import Header from '../Common/Header'
import Container from '../Common/Container'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText, firebaseprovider } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import HideWithKeyboard from 'react-native-hide-with-keyboard';
export default class Password extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      securepassword: true,
      player_id: '123456',
      mobile:''
    }
    this.get_userData()
  }
  componentDidUpdate = () => {
    this.props.navigation.addListener('focus', payload => {
     
      this.get_userData()
    });

  }


  get_userData = async () => {

    let user_details = await localStorage.getItemObject('user_arr');
    console.log('user_details', user_details)
    this.setState({ name: user_details.name, mobile: user_details.mobile })

  }

   continue_click = async () => {
    //alert('hello')
    Keyboard.dismiss()

    if (this.state.password.length <= 0) {
      msgProvider.toast(msgText.emptyPassword[config.language], 'center')
      return false;
    }

    if (this.state.password.length < 6) {
      msgProvider.toast(msgText.emptypasswordsize[config.language], 'center')
      return false;
    }
  

    let url = config.baseURL + "check_password.php";

    var data = new FormData();
    data.append('mobile', this.state.mobile)
    data.append('password', this.state.password)
    data.append('action', 'normal_login')
    data.append("device_type", config.device_type)
    data.append("player_id", config.player_id)
    console.log('data', data);

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj);
      if (obj.success == 'true') {
        var user_details = obj.user_details;
        this.setState({password:''})
        localStorage.setItemObject('user_arr', user_details);
        
        firebaseprovider.firebaseUserCreate();
        firebaseprovider.getMyInboxAllData();
        this.props.navigation.navigate('Home');
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

  forgot_password_click = async () => {
    //alert('hello')
    Keyboard.dismiss()
    let url = config.baseURL + "forget_password.php";

    var data = new FormData();
    data.append('mobile', this.state.mobile)
    
    console.log('data', data);

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj);
      if (obj.success == 'true') {
        var user_details = obj.user_details;
        this.setState({password:''})
        localStorage.setItemObject('user_arr', user_details);
       this.props.navigation.navigate('OtpVerification2');
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
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{}}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
            <View style={{ width: '100%', flexDirection: 'row' }}>
              <View style={{ width: '15%', alignItems: 'center', marginTop: mobileW * 4 / 100 }}>
                <TouchableOpacity onPress={() => { this.props.navigation.goBack() }} activeOpacity={0.9} >
                  <Image source={require('../icons/back.png')} resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                </TouchableOpacity>
              </View>
              <View style={{ width: '85%', alignItems: 'flex-end' }}>
                <Image source={require('../icons/forget_2.png')} style={{ width: mobileW * 45 / 100, height: mobileW * 25 / 100, }} />
              </View>
            </View>

            <View style={{ width: '95%', alignSelf: 'center' }}>
              <View style={{ width: '100%', alignItems: 'center', alignSelf: 'center' }}>
                <Image source={require('../icons/logo.png')} resizeMode='contain' style={{ width: mobileW * 35 / 100, height: mobileW * 35 / 100 }} />
              </View>
              <View style={styles.container}>
                <View style={{ width: '8%', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                </View>
                <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
                </View>
                <View style={{ width: '70%', paddingHorizontal: mobileW * 1 / 100 }} >
                  <TextInput style={styles.TextInput}
                    secureTextEntry={this.state.securepassword}
                    placeholder={Lang_chg.password[config.language]}
                 
                    value={this.state.password}
                    onChangeText={(txt) => { this.setState({ password: txt }) }}
                    placeholderTextColor={Colors.placeholdertextcolor}
                    maxLength={16}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    keyboardType={'default'}
                  />
                </View>
                <TouchableOpacity style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ securepassword: !this.state.securepassword }) }}>


                  <Text style={{ fontFamily: Font.semibold_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{this.state.securepassword ? Lang_chg.show_text[config.language] : Lang_chg.hide_text[config.language]}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={() => { this.forgot_password_click() }} style={{ width: '40%', marginTop: mobileW * 2 / 100, alignItems: 'flex-end', alignSelf: 'flex-end' }}>
                <Text style={{
                  width: '100%', textAlign: 'center', fontFamily: Font.semibold_font, color: Colors.black_color
                  , fontSize: mobileW * 3.8 / 100
                }}>{Lang_chg.forget_password[config.language]}</Text>
              </TouchableOpacity>




              <View style={{ width: '100%', marginTop: mobileW * 10 / 100 }}>
                <CustomButton
                  navigate={() => { this.continue_click() }}
                  title={Lang_chg.continuebtn[config.language]}
                />


              </View>
            </View>


          </TouchableOpacity>

       
        
        </KeyboardAwareScrollView>
        <HideWithKeyboard>
        <View style={{ width: '50%'}}>
          <Image source={require('../icons/forget_1.png')} resizeMode='stretch' style={{ width: mobileW * 50 / 100, height: mobileH * 20 / 100 }} />
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
    marginTop: mobileW * 7 / 100,
    paddingHorizontal: mobileW * 1.5 / 100

  },
  TextInput: {
    width: '80%',
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.semibold_font,
    color: Colors.textinputcolor,
    justifyContent: 'center',
    paddingHorizontal: mobileW * 2 / 100



  },

})

