import React, { Component } from 'react'
import { Text, View, Image, TextInput, StyleSheet, Platform, Keyboard, TouchableOpacity } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { Cameragallery, mediaprovider, mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class Edit_Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      image: 'NA',
      selectImage: 'NA',
      name: '',
      mobile: '',
      email: '',
      description: '',
      userdetails: '',
      mediamodal: false,
      cameraOn: false
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

    let usser = await localStorage.getItemObject('user_arr');
    console.log('userr', usser)
    if (usser != null) {

      this.setState({
        userdetails: usser, image: usser.image, name: usser.name, email: usser.email,
        mobile: usser.mobile, description: usser.description
      })
    }

  }

  update_click = async () => {
    Keyboard.dismiss()
    let usser1 = await localStorage.getItemObject('user_arr');
    if (this.state.name.trim().length <= 0) {
      msgProvider.toast(msgText.emptyName[config.language], 'center')
      return false;
    }

    

    let url = config.baseURL + "edit_profile.php";
    var data = new FormData();
    data.append('user_id', usser1.user_id)
    data.append('name', this.state.name)
    console.log('data', data)
    if (this.state.cameraOn == true) {
      data.append('file', {
        uri: this.state.selectImage,
        type: 'image/jpg',
        name: 'image.jpg'
      })
    }
    apifuntion.postApi(url, data).then((obj) => {
      consolepro.consolelog('obj', obj)
      if (obj.success == 'true') {
        var user_details = obj.user_details;
        localStorage.setItemObject('user_arr', user_details);
        //firebaseprovider.firebaseUserCreate();
        msgProvider.toast(msgText.updateProfile[config.language], 'center')
        setTimeout(() => {
          this.backpress()
        }, 1000);

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
  Camerapopen = async () => {
    mediaprovider.launchCamera(true).then((obj) => {
      console.log('obj',obj)
      this.setState({
        selectImage: obj.path,
        cameraOn: true,
        mediamodal: false,
      })
    }).catch((error) => {
      this.setState({ mediamodal: false })

    })
  }
  Galleryopen = () => {
    mediaprovider.launchGellery(true).then((obj) => {
      this.setState({
        selectImage: obj.path,
        cameraOn: true,
        mediamodal: false,
      })
    }).catch((error) => {
      this.setState({ mediamodal: false })

    })
  }
  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header goBack={() => { this.props.navigation.goBack() }} title={Lang_chg.edit_profile_header[config.language]} showback={true} />

        <Cameragallery mediamodal={this.state.mediamodal} Camerapopen={() => { this.Camerapopen() }}
          Galleryopen={() => { this.Galleryopen() }}
          Canclemedia={() => { this.setState({ mediamodal: false }) }}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '95%', alignSelf: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center', marginTop: mobileW * 12 / 100 }}>
              {this.state.cameraOn == true && <TouchableOpacity onPress={() => { this.setState({ mediamodal: true }) }} >
                <Image source={this.state.selectImage == 'NA' ? require('../icons/profile_with_bg.png') : { uri: this.state.selectImage }} style={{ width: mobileW * 32 / 100, height: mobileW * 32 / 100, borderRadius: mobileW * 20 / 100, alignSelf: 'center' }} />
              </TouchableOpacity>}
              {this.state.cameraOn == false && <TouchableOpacity onPress={() => { this.setState({ mediamodal: true }) }} >
                <Image source={this.state.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url3 + this.state.image }} style={{ width: mobileW * 32 / 100, height: mobileW * 32 / 100, borderRadius: mobileW * 20 / 100, alignSelf: 'center' }} />
              </TouchableOpacity>}
              <Text style={{
                width: '100%', fontFamily: Font.semibold_font, color: Colors.themecolor
                , fontSize: mobileW * 4 / 100, textAlign: 'center', paddingVertical: mobileW * 4 / 100
              }}>{Lang_chg.change_profile_picture[config.language]}</Text>
            </View>
            <View style={styles.container}>
              <View style={{ width: '9%', justifyContent: 'center' }}>
                <Image source={require('../icons/filter_notifi.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '90%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  placeholder={Lang_chg.henry_michael[config.language]}
                  onChangeText={(text) => this.setState({ name: text })}
                  value={this.state.name}
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
              <View style={{ width: '8%', justifyContent: 'center' }}>
                <Image source={require('../icons/flag.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
              </View>
              <View style={{ width: '10%', }}>
                <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 4.0 / 100, color: Colors.black_color }}>+45</Text>
              </View>
              <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 7 / 100, borderRightColor: Colors.placeholderbordercolor }}>
              </View>
              <View style={{ width: '80%', paddingHorizontal: mobileW * 1 / 100 }} >
                <TextInput style={styles.TextInput}
                  placeholder={Lang_chg.edit_Contact[config.language]}
                  value={this.state.mobile}
                  placeholderTextColor={Colors.placeholdertextcolor}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'number-pad'}
                  editable={false}
                />
              </View>
            </View>

            <View style={{ width: '100%', marginTop: mobileW * 12 / 100 }}>
              <CustomButton
                navigate={() => { this.update_click() }}
                title={Lang_chg.updatebtn[config.language]}
              />
            </View>
          </View>
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
    width: mobileW * 75 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.regular_font,
    color: Colors.textinputcolor,
    justifyContent: 'center',
  },

})
