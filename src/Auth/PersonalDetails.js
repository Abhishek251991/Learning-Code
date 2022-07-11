import React, { useState, useEffect } from 'react'
import { StyleSheet, Alert, addListener, Modal, BackHandler, Text, TextInput, Keyboard, View, TouchableOpacity, Image, Touchable } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText, mediaprovider, Cameragallery } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CustomButton from '../Common/CustomButton'
import { useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import { notification } from '../Provider/NotificationProvider'
import { useFocusEffect } from '@react-navigation/native';
import { firebaseprovider } from '../Provider/FirebaseProvider';



export default function PersonalDetails(props) {
  const navigation = useNavigation();
  const [name, setname] = useState('');
  const [modalVisible, setModalVisible] = useState(false)
  const [mobile, setmobile] = useState('');
  const [password, setpassword] = useState('');
  const [securepass, setsecurepass] = useState(true)
  const [conpass, setconpass] = useState('');
  const [secureconpass, setsecureconpass] = useState(true)
  const [mediamodal, setmediamodal] = useState(false)
  const [player_id, setplayer_id] = useState('12345')
  const [user_id, setuser_id] = useState()
  const [selectImage, setselectImage] = useState('NA')
  const [cameraOn, setcameraOn] = useState('')

  useEffect(() => {
    get_userData()
    OneSignal.init(config.onesignalappid, {
      kOSSettingsKeyAutoPrompt: true,
    });
    const willFocusSubscription = props.navigation.addListener('focus', () => {

      BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    },[]);




    OneSignal.setLogLevel(6, 0);
    OneSignal.setLocationShared(true);
    OneSignal.inFocusDisplaying(2);
    OneSignal.addEventListener('ids', onIds.bind(this));
    return willFocusSubscription;

  })

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

  const onIds = (device) => {
    console.log('Device inf111o:', device)
    setplayer_id(device.userId)
    //    this.setState({player_id: device.userId});  
    //    player_id_me1 = device.userId;
    console.log('player_id', player_id)
  }

  const get_userData = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    setmobile(user_details.mobile)
    setuser_id(user_details.user_id)
  }
  const signup_click = async () => {
    //alert('hello')
    Keyboard.dismiss();
    if (name.trim().length <= 0) {
      msgProvider.toast(msgText.emptyName[config.language], 'center')
      return false;
    }


    if (password.length <= 0) {
      msgProvider.toast(msgText.emptyPassword[config.language], 'center')
      return false;
    }

    if (password.indexOf(' ') != -1) {
      msgProvider.toast(msgText.PasswordSpace[config.language], 'center')
      return false
    }

    if (password.length < 5) {
      msgProvider.toast(msgText.emptypasswordsize[config.language], 'center')
      return false;
    }
    if (conpass.length <= 0) {
      msgProvider.toast(msgText.emptyConfirmPassword[config.language], 'center')
      return false;
    }
    if (conpass.indexOf(' ') != -1) {
      msgProvider.toast(msgText.PasswordSpace[config.language], 'center')
      return false
    }
    if (password != conpass) {
      msgProvider.toast(msgText.matchPassword[config.language], 'center')
      return false;
    }
    consolepro.consolelog('password', password)
    consolepro.consolelog('conpass', conpass)
    let url = config.baseURL + 'signup.php';
    consolepro.consolelog('url', url)
    var data = new FormData();
    data.append('user_id', user_id)
    data.append('name', name)
    data.append('mobile', mobile)
    data.append('password', password)
    data.append('device_type', config.device_type)
    data.append('player_id', player_id)
    data.append('user_sign_type', 0)
    consolepro.consolelog('data', data)
    if (cameraOn == true) {
      data.append('file', {
        uri: selectImage,
        type: 'image/jpg',
        name: 'image.jpg'
      })
      //   console.log('image_append', image);
    }
    apifuntion.postApi(url, data).then((obj) => {

      consolepro.consolelog('obj', obj);

      if (obj.success == 'true') {
        localStorage.setItemObject('user_arr', obj.user_details);

        var user_details = obj.user_details;
        consolepro.consolelog('user_details', user_details)
        firebaseprovider.firebaseUserCreate();
        firebaseprovider.getMyInboxAllData();

        const uservalue = { name: name, mobile: mobile, password: password, 'login_type': 'normal' };
        localStorage.setItemObject('user_login', uservalue);
        localStorage.setItemObject('user_arr', user_details);
        notification.notification_arr(obj.notification_arr)
        navigation.navigate('Home')
        // this.props.navigation.navigate('home', { user_id: obj.user_details.user_id })
      } else {
        console.log('entered in else')
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      //alert('error1')
      consolepro.consolelog('error6')
      consolepro.consolelog("-------- error ------- " + error);

    });

  }

  const Camerapopen = async () => {
    mediaprovider.launchCamera(true).then((obj) => {
      setselectImage(obj.path)
      setcameraOn(true)
      setmediamodal(false)
    }).catch((error) => {
      setmediamodal(false)

    })
  }
  const Galleryopen = () => {
    mediaprovider.launchGellery(true).then((obj) => {
      setselectImage(obj.path)
      setcameraOn(true)
      setmediamodal(false)
    }).catch((error) => {
      setmediamodal(false)

    })
  }


  return (
    <Container backgroundColor={Colors.whiteColor}>
      <Header showback={true} title={Lang_chg.personaldetailhead[config.language]} goBack={() => { handleBackPress() }} />
      <Modal
        animationType="slide"
        transparent={true}
        visible={mediamodal}
        onRequestClose={() => {
        }}>
        <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
          <View style={{ width: '90%', position: 'absolute', bottom: mobileW * 6 / 100, alignSelf: 'center', alignItems: 'center', }}>
            <View style={{ width: '100%', backgroundColor: Colors.whiteColor, alignSelf: 'center', borderRadius: mobileW * 3 / 100 }}>
              <View style={{ width: '100%', borderBottomColor: Colors.gray_color, borderBottomWidth: 1, paddingVertical: mobileW * 3 / 100 }}>
                <Text style={{ width: '100%', textAlign: 'center', fontFamily: Font.bold_font, fontSize: mobileW * 4 / 100, color: Colors.black_color }}>{Lang_chg.selectoption[config.language]}</Text>
              </View>
              <TouchableOpacity onPress={() => Camerapopen()} style={{ width: '100%', borderBottomColor: Colors.gray_color, borderBottomWidth: 1, paddingVertical: mobileW * 4 / 100 }}>
                <Text style={{ width: '100%', textAlign: 'center', fontFamily: Font.bold_font, fontSize: mobileW * 4 / 100, color: Colors.black_color }}>{Lang_chg.camera[config.language]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Galleryopen()} activeOpacity={.7}
                style={{ width: '100%', alignItems: 'center', alignSelf: 'center', paddingVertical: mobileW * 4 / 100 }}>
                <Text style={{ width: '100%', textAlign: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font, color: Colors.black_color }}>{Lang_chg.gallery[config.language]}</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ width: '100%', backgroundColor: Colors.whiteColor, paddingVertical: mobileW * 4 / 100, alignSelf: 'center', borderRadius: mobileW * 3 / 100, marginTop: mobileW * 3 / 100 }} onPress={() => { setmediamodal(false) }}>
              <Text style={{ width: '100%', textAlign: 'center', color: 'red', fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font }}>{Lang_chg.cancel[config.language]}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
          <View style={{ width: '95%', alignSelf: 'center' }}>
            <TouchableOpacity onPress={() => { setmediamodal(!modalVisible); }} style={{ width: '100%', alignSelf: 'center', alignItems: 'center', marginTop: mobileW * 10 / 100 }} >
              <View >
                <Image source={selectImage == 'NA' ? require('../icons/profile_with_bg.png') : { uri: selectImage }} style={{ width: mobileW * 30 / 100, height: mobileW * 30 / 100, borderRadius:100,resizeMode:'cover' }} />
              </View>
              <View style={{ width: '100%', alignItems: 'center', paddingVertical: mobileW * 3 / 100 }}>
                <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.black_color }}>{Lang_chg.personalimage[config.language]}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.container}>
              <View style={{ width: '9%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../icons/filter_notifi.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '90%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  placeholder={Lang_chg.person_name[config.language]}
                  onChangeText={(name) => setname(name)}
                  value={name}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  maxLength={50}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'default'}
                />
              </View>
            </View>

            <View style={styles.container}>
              <View style={{ width: '9%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../icons/flag.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '10%' }}>
                <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 4.0 / 100, color: Colors.black_color }}>+45</Text>
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '80%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  placeholder={Lang_chg.mobile[config.language]}
                  onChangeText={(mobile) => setmobile(mobile)}
                  value={mobile}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  maxLength={15}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'number-pad'}
                  editable={false}
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
                  secureTextEntry={securepass}
                  placeholder={Lang_chg.password_personal[config.language]}
                  onChangeText={(pass) => setpassword(pass)}
                  value={password}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  maxLength={16}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'default'}
                />
              </View>
              <TouchableOpacity onPress={() => {
                setsecurepass((prev) => !prev);
              }} style={{ width: '15%', justifyContent: 'center', }}>
                <Text style={{ fontFamily: Font.regular_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{securepass ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <View style={{ width: '8%', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={require('../icons/password.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '75%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  secureTextEntry={secureconpass}
                  placeholder={Lang_chg.conpass[config.language]}
                  onChangeText={(conpass) => setconpass(conpass)}
                  value={conpass}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  maxLength={16}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'default'}
                />
              </View>
              <TouchableOpacity onPress={() => {
                setsecureconpass((prev) => !prev);
              }} style={{ width: '15%', justifyContent: 'center', }}>
                <Text style={{ fontFamily: Font.regular_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100 }}>{secureconpass ? 'Show' : 'Hide'}</Text>
              </TouchableOpacity>
            </View>
            <View style={{ width: '100%', marginTop: mobileW * 8 / 100 }}>
              <CustomButton
                navigate={() => { signup_click() }}
                title={Lang_chg.continuebtn[config.language]}
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
    paddingHorizontal: mobileW * 4 / 100,
    paddingBottom: Platform.OS == 'ios' ? mobileW * 2 / 100 : 0,

  },
  container1: {
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
