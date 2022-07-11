import React, { Component } from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import Container from '../Common/Container'
import Header1 from '../Common/Header1'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Footer from '../Provider/Footer';
import { NavigationContainer,CommonActions } from '@react-navigation/native';
import { firebaseprovider}  from '../Provider/FirebaseProvider';
import firebase from '../Config1';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      name: '',
      mobile: '',
      image: 'NA',

    }

  }

  componentDidMount() {

    this.props.navigation.addListener('focus', payload => {
      this.get_userData()

    });


  }


  get_userData = async () => {

    let user_details = await localStorage.getItemObject('user_arr');
    console.log('user_details', user_details)
    this.setState({ name: user_details.name, mobile: user_details.mobile, image: user_details.image })

  }

  LogoutPress = () => {
    Alert.alert(
      'Logout',
      'Are You Sure, You Want to logout', [{
        text: 'No',
        onPress: () => {

        },
        style: 'Yes',
      }, {
        text: 'Yes',
        onPress: () => this.logout()
      }], {
      cancelable: false
    }
    ); // works best when the goBack is async 
    return true;
  };

  logout = async () => {
    this.setState({ modalVisible: false })
    let user_detail =await localStorage.getItemObject('user_arr');
    var id='u_'+user_detail.user_id;
    var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/');
    queryOffinbox.off();
    FirebaseInboxJson=[];

    let uservalue = await localStorage.getItemObject('user_login');
    if (uservalue != null) {
      if (uservalue.login_type == 'apple') {
        consolepro.consolelog('googlelogout')
        SocialLogin.socaillogout('google', this.props.navigation)
      } else if (uservalue.login_type == 'facebook') {
        consolepro.consolelog('googlelogout')
        await SocialLogin.socaillogout('facebook', this.props.navigation)
      } else if (uservalue.login_type == 'google') {
        consolepro.consolelog('googlelogout')
        consolepro.consolelog('successfull')
        await SocialLogin.socaillogout('google', this.props.navigation)
      }
    }
    setTimeout(() => {
      localStorage.removeItem('user_arr');
      localStorage.removeItem('user_login');
      localStorage.clear();
      this.props.navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'Login',

            },
          ],
        })
      );

    }, 500);
    this.setState({ modalVisible: false })
  }

  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header1
          title={Lang_chg.profile_header[config.language]}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '100%', height: mobileH * 22 / 100, backgroundColor: Colors.themecolor }}>

          </View>
          <View style={{ width: '100%', height: mobileH, backgroundColor: Colors.whiteColor }}>


            <View style={{ width: '90%', marginTop: -mobileW * 7 / 100, height: mobileW * 90 / 100, alignSelf: 'center', backgroundColor: '#FFFFFF', borderRadius: mobileW * 2 / 100, borderWidth: 1, borderColor: Colors.gray_color }}>
              <View style={{ width: '100%', position: 'absolute', top: -mobileW * 15 / 100, alignSelf: 'center', }}>
                <Image source={this.state.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url3 + this.state.image }} style={{ width: mobileW * 30 / 100, height: mobileW * 30 / 100, borderRadius: mobileW * 15 / 100, alignSelf: 'center' }} />

                {/* <Text style={{width:'100%',marginTop:mobileW*2/100,textAlign:'center',fontFamily:Font.bold_font,fontSize:mobileW*5.3/100}}>{Lang_chg.samuel_jackson[config.language]}</Text> */}
                <Text style={{ width: '100%', marginTop: mobileW * 2 / 100, textAlign: 'center', fontFamily: Font.bold_font, fontSize: mobileW * 5.3 / 100 }}>{this.state.name}</Text>
                <View style={{
                  width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.gray_color,
                  paddingBottom: mobileW * 7 / 100
                }}>
                  {/* <Text style={{width:'100%',marginTop:mobileW*1/100,textAlign:'center',fontFamily:Font.medium_font,fontSize:mobileW*4/100}}>{Lang_chg.contact_no[config.language]}</Text> */}
                  <Text style={{ width: '100%', marginTop: mobileW * 1 / 100, textAlign: 'center', fontFamily: Font.medium_font, fontSize: mobileW * 4 / 100 }}>{this.state.mobile}</Text>
                </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Manage_Address') }} style={{ width: '100%', paddingVertical: mobileW * 6 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '10%' }}>
                      <Image source={require('../icons/location_profile.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: mobileW * 3.8 / 100, fontFamily: Font.medium_font, color: Colors.black_color }}>{Lang_chg.manage_address[config.language]}</Text>
                    </View>
                    <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                    </View>


                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '100%', paddingVertical: mobileW * 6 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '10%' }}>
                      <Image source={require('../icons/wallet_profile.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: mobileW * 3.8 / 100, fontFamily: Font.medium_font, color: Colors.black_color }}>{Lang_chg.payment_detail[config.language]}</Text>
                    </View>
                    <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                    </View>


                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }} style={{ width: '100%', paddingVertical: mobileW * 6 / 100 }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '10%' }}>
                      <Image source={require('../icons/logout_profile.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: mobileW * 3.8 / 100, fontFamily: Font.medium_font, color: Colors.black_color }}>{Lang_chg.profile_logout[config.language]}</Text>
                    </View>
                    <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                    </View>


                  </View>
                </TouchableOpacity>

              </View>
              <View style={{ width: '100%', justifyContent: 'space-between', marginTop: mobileW * 7 / 100, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Setting') }}
                  style={{ width: '20%', alignItems: 'center', }}>
                  <Image source={require('../icons/setting_profile.png')} style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Edit_Profile') }}
                  style={{ width: '10%', }}>
                  <Image source={require('../icons/edit_profile_profile_page.png')} style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </KeyboardAwareScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}>
          <View style={{ flex: 1, backgroundColor: '#00000aaa' }}>
            <View style={{
              width: '90%', paddingVertical: mobileW * 3 / 100, paddingHorizontal: mobileW * 6 / 100, alignSelf: 'center', position: 'absolute', top: mobileH * 40 / 100,
              borderRadius: mobileW * 2.5 / 100, backgroundColor: Colors.whiteColor
            }}>
              <TouchableOpacity disabled={true} onPress={() => this.logout()} style={{ width: '100%', marginTop: mobileW * 4 / 100 }}>
                <Text style={{
                  width: '100%', color: Colors.black_color
                  , fontFamily: Font.bold_font, fontSize: mobileW * 5 / 100
                }}>{Lang_chg.log_out[config.language]}</Text>
              </TouchableOpacity>

              <View style={{ width: '100%', marginTop: mobileW * 2 / 100 }}>
                <Text style={{
                  width: '100%', color: Colors.black_color
                  , fontFamily: Font.medium_font, fontSize: mobileW * 3.8 / 100
                }}>{Lang_chg.sure_text[config.language]}</Text>

              </View>
              <View style={{ width: '35%', marginTop: mobileW * 8 / 100, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={() => { this.logout() }} style={{ width: '50%' }} >
                  <Text style={{
                    width: '100%', fontFamily: Font.medium_font, fontSize: mobileW * 3.5 / 100,
                    color: Colors.red_Color,textAlign:'right'
                  }}>{Lang_chg.yes[config.language]}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ width: '50%' }} onPress={() => { this.setState({ modalVisible: false }) }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.medium_font, fontSize: mobileW * 3.5 / 100,
                    color: Colors.themecolor, textAlign: 'right'
                  }}>{Lang_chg.no[config.language]}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

        </Modal>
        <Footer navigation={this.props.navigation} page={'Profile'} user_id={1} />
      </Container>


    )
  }
}
