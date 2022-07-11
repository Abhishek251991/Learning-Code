import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Keyboard, Image, TextInput, } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { msgProvider, msgText, msgTitle, localStorage, apifuntion, config, Lang_chg, AppProvider, Mapprovider, validation, Font, Colors, consolepro, mobileH,mobileW } from '../Provider/utilslib/Utils'

export default class Change_Password extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user_id:'',
      password_old: '',
      password_new: '',
      confirm_password_new: '',
      secureOldpass: true,
      secureNewpass: true,
      secureConpass: true,

    }
  }

  componentDidMount() {
    this.props.navigation.addListener('focus', payload => {
      this.getdetail();
    });

  }

  backpress = () => {
    this.props.navigation.goBack();
  }

  getdetail = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    if (user_details != null) {
      console.log('useer', user_details)
      this.setState({ user_id: user_details.user_id })
    }
  }

  submit_click = async () => {

    if (this.state.password_old.length <= 0) {
      msgProvider.toast(msgText.emptyOldPassword[config.language], 'center')
      return false;
    }
    if (this.state.password_old.indexOf(' ') != -1) {
      msgProvider.toast(msgText.PasswordSpace[config.language], 'center')
      return false
    }
    if (this.state.password_old.length < 6) {
      msgProvider.toast(msgText.emptyOldpasswordsize[config.language], 'center')
      return false;
    }
    if (this.state.password_new.length <= 0) {
      msgProvider.toast(msgText.emptyNewPassword[config.language], 'center')
      return false;
    }
    if (this.state.password_new.length < 6) {
      msgProvider.toast(msgText.emptypasswordsize[config.language], 'center')
      return false;
    }
    if (this.state.password_new.indexOf(' ') != -1) {
      msgProvider.toast(msgText.PasswordSpace[config.language], 'center')
      return false
    }
    if (this.state.confirm_password_new.length <= 0) {
      msgProvider.toast(msgText.emptyConfirmPassword[config.language], 'center')
      return false;
    }
    if (this.state.confirm_password_new.length < 6) {
      msgProvider.toast(msgText.emptyConfirmpasswordsize[config.language], 'center')
      return false;
    }
    if (this.state.confirm_password_new.indexOf(' ') != -1) {
      msgProvider.toast(msgText.PasswordSpace[config.language], 'center')
      return false
    }
    if (this.state.password_new != this.state.confirm_password_new) {
      msgProvider.toast(msgText.newmatchPassword[config.language], 'center')
      return false;
    }
   


    let url = config.baseURL + "change_password.php";
    var data = new FormData();
    data.append('password_old', this.state.password_old)
    data.append('password_new', this.state.password_new)
    data.append('user_id', this.state.user_id)
    console.log('data',data)

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj',obj)
      if (obj.success == 'true') {
        msgProvider.toast(obj.msg[config.language], 'center')
        var user_details = obj.user_details;
        consolepro.consolelog('user_details', user_details)
        var uservalue = { login_type: user_details.login_type, email: user_details.email, password: this.state.password_new, player_id: 12345, 'login_type': 'normal' };
        localStorage.setItemObject('user_login', uservalue);
        localStorage.setItemObject('user_arr', user_details);
        this.backpress()
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
          title={Lang_chg.changehead[config.language]}
          goBack={() => { this.props.navigation.goBack() }}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>

            <View style={{ width: '95%', alignSelf: 'center' }}>
              <View style={styles.container}>
                <View style={{ width: '8%', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                </View>
                <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
                </View>
                <View style={{ width: '70%', paddingHorizontal: mobileW * 1 / 100 }} >
                  <TextInput style={styles.TextInput}
                    secureTextEntry={this.state.secureOldpass}
                    placeholder={Lang_chg.oldpass[config.language]}
                    onChangeText={(txt) => { this.setState({ password_old: txt }) }}
                    value={this.state.password_old}
                    placeholderTextColor={Colors.placeholdertextcolor}
                    maxLength={16}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    keyboardType={'default'}
                  />
                </View>
                <TouchableOpacity onPress={() => { this.setState({ secureOldpass: !this.state.secureOldpass }) }} style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                  <Text style={{ fontFamily: Font.regular_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{this.state.secureOldpass ? Lang_chg.show_text[config.language] : Lang_chg.hide_text[config.language]}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.container}>
                <View style={{ width: '8%', alignItems: 'center', justifyContent: 'center' }}>
                  <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                </View>
                <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
                </View>
                <View style={{ width: '70%', paddingHorizontal: mobileW * 1 / 100 }} >
                  <TextInput style={styles.TextInput}
                    placeholder={Lang_chg.newpass[config.language]}
                    onChangeText={(txt) => { this.setState({ password_new: txt }) }}
                    value={this.state.password_new}
                    secureTextEntry={this.state.secureNewpass}
                    placeholderTextColor={Colors.placeholdertextcolor}
                    maxLength={16}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    keyboardType={'default'}
                  />
                </View>
                <TouchableOpacity onPress={() => { this.setState({ secureNewpass: !this.state.secureNewpass }) }}
                  style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: Font.regular_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{this.state.secureNewpass ? 'Show' : 'Hide'}</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.container}>
                <View style={{ width: '8%', alignItems: 'center', justifyContent: 'center', }}>
                  <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                </View>
                <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
                </View>
                <View style={{ width: '70%', paddingHorizontal: mobileW * 1 / 100 }} >
                  <TextInput style={styles.TextInput}
                    placeholder={Lang_chg.Conpss[config.language]}
                    onChangeText={(txt) => { this.setState({ confirm_password_new: txt }) }}
                    value={this.state.confirm_password_new}
                    secureTextEntry={this.state.secureConpass}
                    placeholderTextColor={Colors.placeholdertextcolor}
                    maxLength={16}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    keyboardType={'default'}
                  />
                </View>
                <TouchableOpacity onPress={() => { this.setState({ secureConpass: !this.state.secureConpass }) }}
                  style={{ width: '20%', justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: Font.regular_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{this.state.secureConpass ? 'Show' : 'Hide'}</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: '100%', marginTop: mobileW * 15 / 100 }}>
                <CustomButton
                  navigate={() => { this.submit_click() }}
                  title={Lang_chg.chngpassbtn[config.language]}
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
    paddingBottom: Platform.OS == 'ios' ? mobileW * 2 / 100 : 0,


  },
  TextInput: {
    width: mobileW * 100 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.semibold_font,
    color: Colors.textinputcolor,
    justifyContent: 'center',



  },

})
