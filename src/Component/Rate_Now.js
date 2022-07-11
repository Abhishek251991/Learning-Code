import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, TextInput, TouchableOpacity, Platform,Keyboard } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { mobileW, mobileH, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import StarRating from 'react-native-star-rating';
export default class Rate_Now extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: this.props.route.params.data,
      job_id: this.props.route.params.job_id,
      review: '',
      rating:''
    }
  }

  componentDidMount() {
    console.log('this.props.route.params.data', this.props.route.params.data)
  }

  addRating = async () => {
    Keyboard.dismiss();
    let userdetails = await localStorage.getItemObject('user_arr')
    if (this.state.rating.length <= 0) {
        msgProvider.toast(msgText.emptyRating[config.language], 'center')
        return false;
    }
    if (this.state.review.trim().length <= 0) {
        msgProvider.toast(msgText.emptyReview[config.language], 'center')
        return false;
    }
    let url = config.baseURL + "add_rating.php";
    console.log("url", url)
    var data = new FormData();
    data.append('user_id', userdetails.user_id)
    data.append('provider_id', this.state.data.user_id)
    data.append('job_id', this.state.job_id)
    data.append('rating', this.state.rating)
    data.append('review', this.state.review)
    consolepro.consolelog("data", data)
    apifuntion.postApi(url, data).then((obj) => {
        consolepro.consolelog("obj", obj)

        if (obj.success == 'true') {
            this.props.navigation.goBack() 
         

        } else {
            msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

            if (obj.active_status == 'deactivate') {
                config.checkUserDeactivate(this.props.navigation);
            }
            return false;

        }
    }).catch((error) => {
        consolepro.consolelog("-------- error ------- " + error);

    });
}

  onStarRatingPress(rating) {
    this.setState({
      rating: rating
    });
  }
  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          goBack={() => { this.props.navigation.goBack() }}
          title={Lang_chg.rate_now_header[config.language]}
          showback={true}

        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <View style={{ width: '50%', alignSelf: 'center', marginTop: mobileW * 8 / 100, alignItems: 'center', }}>
              <Image source={{ uri: config.img_url3 + this.state.data.image }} style={{ width: mobileW * 33 / 100, height: mobileW * 33 / 100, borderRadius: mobileW * 20 / 100 }} />
            </View>
            <View style={{ width: '50%', alignSelf: 'center', marginTop: mobileW * 4 / 100, alignItems: 'center' }}>
              <Text style={{
                fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font, color: Colors.black_color,
                color: Colors.black_color
              }}>{this.state.data.name}</Text>
            </View>
            <View style={{ width: '100%', height: mobileH, marginTop: mobileW * 4 / 100, backgroundColor: Colors.themecolor, borderTopLeftRadius: mobileW * 10 / 100, borderTopRightRadius: mobileW * 10 / 100 }}>
              <View style={{ width: mobileW * 70 / 100, alignSelf: 'center',marginTop:mobileH*6/100 }} >
                <StarRating
                  containerStyle={{ paddingRight: 2 }}
                  fullStar={require('../icons/star.png')}
                  emptyStar={require('../icons/blank_star.png')}
                  halfStar={require('../icons/half_star.png')}
                  disabled={false}
                  maxStars={5}
                  rating={this.state.rating}
                  starSize={mobileH * 5.5 / 100}
                  selectedStar={(rating) => this.onStarRatingPress(rating)}
                />

              </View>
           
              <View style={{ width: '80%', paddingVertical: mobileW * 2 / 100, marginTop: mobileW * 8 / 100, alignSelf: 'center', backgroundColor: Colors.whiteColor, borderRadius: mobileW * 4 / 100 }}>
                <View style={{ width: '100%', flexDirection: 'row' }}>
                  <View style={{ width: '15%', marginTop: Platform.OS == 'ios' ? mobileW * 1.5 / 100 : mobileW * 3.5 / 100, alignItems: 'center' }}>
                    <Image source={require('../icons/pen_black.png')} style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, alignSelf: 'center' }} />
                  </View>
                  <View style={{ width: '85%', height: mobileH * 20 / 100 }}>
                    <TextInput
                      style={styles.TextInput}
                      placeholder={Lang_chg.message[config.language]}
                      placeholderTextColor={Colors.placeholdertextcolor}
                      onChangeText={(text) => this.setState({ review: text })}
                      maxLength={250}
                      multiline={true}
                      returnKeyLabel='done'
                      returnKeyType='done'
                      onSubmitEditing={() => { Keyboard.dismiss() }}
                      keyboardType={'default'}
                    />
                  </View>
                </View>
              </View>
              <View style={{ width: '80%', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => {
                 this.addRating()
                  // this.props.navigation.navigate('After_rate_Job_Completed_Details') 
                  }} style={{
                  width: '100%', marginTop: mobileW * 6 / 100, borderRadius: mobileW * 2 / 100, paddingVertical: mobileW * 3 / 100,
                  backgroundColor: Colors.whiteColor
                }}>
                  <Text style={{
                    fontFamily: Font.semibold_font, fontSize: mobileW * 3.8 / 100, color: Colors.themecolor
                    , textAlign: 'center'
                  }}>{Lang_chg.submitbtn[config.language]}</Text>
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}
const styles = StyleSheet.create({

  TextInput: {
    width: '100%',
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.semibold_font,
    color: Colors.black_color,
    marginLeft: mobileW * -1 / 100



  },
})