import React, { useState, useEffect } from 'react'
import { Alert, StyleSheet, Text, View, TouchableOpacity, Keyboard, Image, TextInput, BackHandler } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';


export default function Change_Password2(props) {
  const navigation = useNavigation();
  const [oldpass, setoldpass] = useState('');
  const [password_new, setpassword_new] = useState('');
  const [confirm_password_new, setconfirm_password_new] = useState('');
  const [secureoldpass, setsecureoldpass] = useState(true)
  const [securenewpass, setsecurenewpass] = useState(true)
  const [secureconpass, setsecureconpass] = useState(true)
  const [Editinput, seteditable] = useState(false);

  const onChange = (value, key) => {
    if (key == 'oldpass') {
      setoldpass(...value)
    }

  }

  useEffect(() => {

    get_userData()
    const willFocusSubscription = props.navigation.addListener('focus', () => {

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    }, []);

  }, [])

  useFocusEffect(() => {
    props.navigation.addListener('blur', () => {

      BackHandler.removeEventListener('hardwareBackPress', handleBackPress)
    });
  });

  const handleBackPress = () => {
    Alert.alert(
      'Login ',
      'Are you sure you want to login', [{
        text: 'No',
        onPress: () => { },
        style: 'cancel'
      }, {
        text: 'Yes',
        onPress: () => {
          {
            localStorage.clear(), props.navigation.navigate('Login')
          }
        }
      }], {
      cancelable: false
    }
    );
    return true;
  };
  const get_userData = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    let user_login = await localStorage.getItemObject('user_login');
    consolepro.consolelog('user_login', user_login)

  }
  const submit_click = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    let user_login = await localStorage.getItemObject('user_login');

    if (password_new.length <= 0) {
      msgProvider.toast(msgText.emptyNewPassword[config.language], 'center')
      return false;
    }
    if (password_new.length < 5) {
      msgProvider.toast(msgText.emptypasswordsize[config.language], 'center')
      return false;
    }
    if (password_new.indexOf(' ') != -1) {
      msgProvider.toast(msgText.PasswordSpace[config.language], 'center')
      return false
    }
    if (confirm_password_new.length <= 0) {
      msgProvider.toast(msgText.emptyConfirmPassword[config.language], 'center')
      return false;
    }
    if (confirm_password_new.indexOf(' ') != -1) {
      msgProvider.toast(msgText.PasswordSpace[config.language], 'center')
      return false
    }
    if (password_new != confirm_password_new) {
      msgProvider.toast(msgText.newmatchPassword[config.language], 'center')
      return false;
    }



    let url = config.baseURL + "change_password1.php";
    var data = new FormData();
    data.append('password_old', '123456')
    data.append('password_new', password_new)
    data.append('user_id', user_details.user_id)
    console.log('data', data)

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj)
      if (obj.success == 'true') {
        msgProvider.toast(obj.msg[config.language], 'center')
        var user_details = obj.user_details;
        consolepro.consolelog('user_details', user_details)
        var uservalue = { login_type: user_details.login_type, email: user_details.email, password: password_new, player_id: 12345, 'login_type': 'normal' };
        localStorage.setItemObject('user_login', uservalue);
        localStorage.setItemObject('user_arr', user_details);
        navigation.navigate('Password');
      } else {
        console.log('entered in else')
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
  return (
    <Container backgroundColor='#fff'>
      <Header
        showback={true}
        title={Lang_chg.changehead[config.language]}
        goBack={() => { handleBackPress() }}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>

          <View style={{ width: '95%', alignSelf: 'center' }}>
            <View style={styles.container}>
              <View style={{ width: '7%', justifyContent: 'center' }}>
                <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '70%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  placeholder={Lang_chg.newpass[config.language]}
                  onChangeText={(newpass) => setpassword_new(newpass)}
                  value={password_new}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  maxLength={16}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'default'}
                  secureTextEntry={securenewpass}
                />
              </View>
              <TouchableOpacity onPress={() => {
                setsecurenewpass((prev) => !prev);
              }} style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontFamily: Font.semibold_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{securenewpass ? Lang_chg.show_text[config.language] : Lang_chg.hide_text[config.language]}</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <View style={{ width: '7%', justifyContent: 'center' }}>
                <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '70%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  placeholder={Lang_chg.Conpss[config.language]}
                  onChangeText={(conpass) => setconfirm_password_new(conpass)}
                  value={confirm_password_new}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  maxLength={16}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'default'}
                  secureTextEntry={secureconpass}
                />
              </View>
              <TouchableOpacity onPress={() => {
                setsecureconpass((prev) => !prev);
              }} style={{ width: '20%', alignItems: 'center', justifyContent: 'center', }}>
                <Text style={{ fontFamily: Font.semibold_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{secureconpass ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', marginTop: mobileW * 15 / 100 }}>
              <CustomButton
                navigate={() => { submit_click() }}
                title={Lang_chg.chngpassbtn[config.language]}
              />
            </View>

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
    marginTop: mobileW * 7 / 100,
    // marginLeft:mobileW*-2/100

  },
  TextInput: {
    width: '80%',
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.semibold_font,
    color: Colors.textinputcolor,
    justifyContent: 'center',



  },

})
