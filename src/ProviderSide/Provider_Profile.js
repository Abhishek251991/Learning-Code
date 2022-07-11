import React, { Component } from 'react'
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native'
import Container from '../Common/Container'
import Header1 from '../Common/Header1'
import { Colors, Font, mobileH, mobileW, config, apifuntion, consolepro, msgProvider, msgTitle, msgText, localimag, Currentltlg, localStorage, Lang_chg } from '../Provider/utilslib/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Footer1 from '../Provider/Footer1';
import { NavigationContainer, CommonActions } from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

export default class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      name: '',
      image: 'NA',
      avg_rat:'',

    }

  }

  componentDidMount() {

  //  this.props.navigation.addListener('focus', payload => {
      this.get_userData()

 //   });
  }

  


  get_userData = async () => {

    let user_details = await localStorage.getItemObject('user_arr');
    console.log('user_details1234', user_details)
    this.setState({ name: user_details.name, image: user_details.image })
    consolepro.consolelog('config.img_url3 + this.state.image', config.img_url3 + this.state.image)
    this.get_data(1)
  }
  get_data = async (status_get) => {
    let user_details = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "profile.php?user_id=" + user_details.user_id;
    console.log(url)
    apifuntion.getApi(url, status_get).then((obj) => {
      console.log('obj', obj);
      if (obj.success == "true") {
        this.setState({avg_rat:obj.avg_rat})


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

  logout = async () => {

    //let user_detail =await localStorage.getItemObject('user_login');
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
      // this.props.navigation.navigate('Login');

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
          <View style={{ width: '100%', height: mobileH * 28 / 100, backgroundColor: Colors.themecolor }}>

          </View>
          <View style={{ width: '100%', height: mobileH, backgroundColor: Colors.whiteColor }}>


            <View style={{ width: '100%', position: 'absolute', top: -mobileW * 10 / 100, height: mobileW * 90 / 100, alignSelf: 'center', backgroundColor: '#FFFFFF', }}>
              <View style={{ width: '100%', position: 'absolute', top: -mobileW * 20 / 100, alignSelf: 'center', }}>
                <Image source={this.state.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url3 + this.state.image }} style={{ width: mobileW * 30 / 100, height: mobileW * 30 / 100, borderRadius: mobileW * 15 / 100, alignSelf: 'center' }} />

                <Text style={{ width: '100%', marginTop: mobileW * 2 / 100, textAlign: 'center', fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100 }}>{this.state.name}</Text>
                <View style={{ width: '35%', marginTop: mobileW * 0.5 / 100, alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}>
                  <View style={{ width: '70%', justifyContent: 'space-evenly', flexDirection: 'row' }}>
                    <StarRating
                      // containerStyle={{ paddingRight: 2 }}
                      fullStar={require('../icons/star.png')}
                      emptyStar={require('../icons/blank_star.png')}
                      halfStar={require('../icons/half_star.png')}
                      disabled={false}
                      maxStars={5}
                      rating={this.state.avg_rat}
                      starSize={mobileH * 2 / 100}
                    //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                    />
                  </View>
                  <View style={{ width: '30%' }}>
                    <Text style={{ width: '100%', fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>({this.state.avg_rat})</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Provider_Edit_Profile') }} style={{ width: '100%', marginTop: mobileW * 6 / 100, paddingVertical: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '10%' }}>
                      <Image source={require('../icons/edit_profile_profile_page.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.Edit_profile[config.language]}</Text>
                    </View>
                    <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center', }}>
                      <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100, alignSelf: 'flex-end' }} />
                    </View>


                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Setting') }} style={{ width: '100%', marginTop: mobileW * 6 / 100, paddingVertical: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '10%' }}>
                      <Image source={require('../icons/setting_profile.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.settings[config.language]}</Text>
                    </View>
                    <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100, alignSelf: 'flex-end' }} />
                    </View>


                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Provider_Reviews') }} style={{ width: '100%', marginTop: mobileW * 6 / 100, paddingVertical: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '10%' }}>
                      <Image source={require('../icons/reviews.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.reviews[config.language]}</Text>
                    </View>
                    <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100, alignSelf: 'flex-end' }} />
                    </View>


                  </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.setState({ modalVisible: true }) }} style={{ width: '100%', paddingVertical: mobileW * 2 / 100, marginTop: mobileW * 6 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                    <View style={{ width: '10%' }}>
                      <Image source={require('../icons/logout_profile.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                    </View>
                    <View style={{ width: '80%' }}>
                      <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.profile_logout[config.language]}</Text>
                    </View>
                    <View style={{ width: '10%', alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100, alignSelf: 'flex-end' }} />
                    </View>


                  </View>
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
              <View style={{ width: '100%', marginTop: mobileW * 4 / 100 }}>
                <Text style={{
                  width: '100%', color: Colors.black_color
                  , fontFamily: Font.bold_font, fontSize: mobileW * 5 / 100
                }}>{Lang_chg.log_out[config.language]}</Text>

              </View>

              <View style={{ width: '100%', marginTop: mobileW * 2 / 100 }}>
                <Text style={{
                  width: '100%', color: Colors.black_color
                  , fontFamily: Font.medium_font, fontSize: mobileW * 3.8 / 100
                }}>{Lang_chg.sure_text[config.language]}</Text>

              </View>
              <View style={{ width: '35%', marginTop: mobileW * 8 / 100, flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                <TouchableOpacity style={{ width: '50%' }} onPress={() => { this.logout() }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.medium_font, fontSize: mobileW * 3.5 / 100,
                    color: 'red', textAlign: 'right'
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
        <Footer1 navigation={this.props.navigation} page={'Provider_Profile'} user_id={1} />
      </Container>


    )
  }
}
