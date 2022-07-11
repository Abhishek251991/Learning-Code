import React, { Component } from 'react'
import { Text, RefreshControl, Keyboard, Platform, View, TouchableOpacity, Alert, Image, FlatList, BackHandler, TextInput } from 'react-native'
import Container from '../Common/Container'
import { Cameragallery, mediaprovider, mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Common/Header';
import { Nodata_foundimage } from '../Provider/Nodata_foundimage'
import StarRating from 'react-native-star-rating';



export default class Provider_Reviews extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post_detail_arr: [],
      status: '',
      modalVisible: false,
      player_id: '12345',
      job_number_get: '',
      rating_arr: [],
      rating_status: '',
      avg_rat: '',

    }
  }

  componentDidMount() {

    this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );

    this.props.navigation.addListener('focus', payload => {
    this.get_data()
    });
  }



  get_data = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');

    let url = config.baseURL + "get_all_reviews.php?user_id=" + userdetails.user_id;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        this.setState({ rating_arr: obj.rating_arr })


      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(this.props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);

    });
  }
  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          showback={true}
          title={Lang_chg.reviews_header[config.language]}
          goBack={() => { this.props.navigation.goBack() }}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '100%' }}>
            {this.state.rating_arr != 'NA' && <FlatList
              data={this.state.rating_arr}
              contentContainerStyle={{ paddingBottom: mobileW * 20 / 100 }}
              renderItem={({ item, index }) => {
                return (
                  <View style={{
                    width: '100%', borderBottomWidth: 1,
                    borderBottomColor: Colors.gray_color, paddingVertical: mobileW * 4 / 100
                  }}>
                    <View style={{ width: '90%', flexDirection: 'row', alignSelf: 'center' }}>
                      <View style={{ width: '10%' }}>
                        <Image source={item.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url1 + item.image }} style={{ width: mobileW * 10 / 100, borderRadius: mobileW * 6 / 100, height: mobileW * 10 / 100 }} />
                      </View>
                      <View style={{ width: '60%', paddingHorizontal: mobileW * 2 / 100 }}>
                        <Text style={{
                          width: '100%', fontFamily: Font.medium_font,
                          fontSize: mobileW * 4 / 100, color: Colors.black_color
                        }}>{item.name}</Text>
                        <View style={{ width: '100%', flexDirection: 'row', marginTop: mobileW * 0.5 / 100, justifyContent:'space-between' }}>
                          <View style={{ width: '48%' }}>
                            <StarRating
                             // containerStyle={{ paddingRight: 2 }}
                              fullStar={require('../icons/star.png')}
                              emptyStar={require('../icons/blank_star.png')}
                              halfStar={require('../icons/half_star.png')}
                              disabled={false}
                              maxStars={5}
                              rating={item.rating}
                              starSize={mobileH * 2 / 100}
                            //  selectedStar={(rating) => this.onStarRatingPress(rating)}
                            />

                          </View>
                          <View style={{ width: '52%', marginTop: mobileW * -1 / 100, paddingHorizontal: mobileW * 1 / 100 }}>
                            <Text style={{marginLeft:2, width: '100%', fontFamily: Font.medium_font, color: Colors.black_color }}>({item.rating})</Text>
                          </View>
                        </View>
                      </View>
                      <View style={{ width: '30%', alignItems: 'flex-end', paddingTop: mobileW * 1 / 100, marginLeft: mobileW * 2 / 100 }}>
                        <Text style={{
                          width: '100%', textAlign: 'right',
                          fontFamily: Font.regular_font, color: Colors.msg_color, fontSize: mobileW * 3 / 100
                        }}>{item.createtime}</Text>
                      </View>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', paddingVertical: mobileW * 2 / 100 }}>
                      <Text style={{
                        width: '100%', fontFamily: Font.medium_font,
                        fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                      }}>{item.review}</Text>
                    </View>

                  </View>
                )
              }}
            />}
            {this.state.rating_arr == 'NA' &&
              <Nodata_foundimage />
            }
          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}
