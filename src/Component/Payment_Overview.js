import React, { Component } from 'react'
import { Modal, SafeAreaView, StatusBar, Image, Keyboard, Text, StyleSheet, TextInput, View, TouchableOpacity, Platform } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText, mobileH, notification } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import WebView from 'react-native-webview';


export default class Payment_Overview extends Component {
  constructor(props) {
    super(props)
    this.state = {
      coupon_code: false,
      code: '',
      user_id: '',
      job_prize: '',
      job_id: this.props.route.params.job_id,
      provider_id: this.props.route.params.provider_id,
      provider_name: this.props.route.params.provider_name,
      discount_percent: '',
      discount_amount: '',
      amount_after_discount: '',
      discountTextManage: false,
      webviewshow: false
    }
  }


  componentDidMount() {
    this.props.navigation.addListener('focus', payload => {
      this.get_data()
    });
  }

  get_data = async () => {
    var user_details = await localStorage.getItemObject('user_arr');
    this.setState({ user_id: user_details.user_id })
    var job_price = this.props.route.params.job_prize;
    var provider_id = this.props.route.params.provider_id;
    var job_price_new = job_price.replace(/[^\d.-]/g, '');
    this.setState({ job_prize: job_price_new })
    console.log('this.state.user_id', this.state.user_id)
    console.log('this.state.job_id', this.state.job_id)
    console.log('this.state.job_prize', this.state.job_prize)
    console.log('this.state.provider_id', this.state.provider_id)
    console.log('provider_id', provider_id)
  }

  apply_coupon_code = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    Keyboard.dismiss()
    var job_price = this.state.job_prize;
    var job_price_new = job_price.replace(/[^\d.-]/g, '');

    if (this.state.code.trim().length <= 0) {
      msgProvider.toast(msgText.emptyCoupon[config.language], 'center')
      return false;
    }
    let url = config.baseURL + "apply_coupon.php";

    var data = new FormData();
    data.append('user_id', user_details.user_id)
    data.append('coupon_code', this.state.code)
    data.append('job_id', this.state.job_id)
    data.append('job_prize', job_price_new)
    console.log('this.state.job_id', this.state.job_id)


    console.log('data', data)
    apifuntion.postApi(url, data).then((obj) => {

      console.log('data', data)
      console.log('obj12345', obj)
      if (obj.success == 'true') {
        if (obj.check_promocode_status == true) {
          var data2 = '';
          data2 = job_price_new - obj.post_detail_arr.job_prize_new;
          this.setState({
            discount_percent: obj.post_detail_arr.discount_percent_get,
            discount_amount: obj.post_detail_arr.job_prize_new, amount_after_discount: data2,
            discountTextManage: true
          })
          console.log('data2', data2)
        } else {
          this.setState({ code: '' })
          msgProvider.toast(msgText.inValidCoupon[config.language], 'center')
        }


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


  payJobAmount = async (transaction_id) => {
    let user_details = await localStorage.getItemObject('user_arr');
    Keyboard.dismiss()
    var job_price = this.state.job_prize;
    var job_price_new = job_price.replace(/[^\d.-]/g, '');

    // if (this.state.code.trim().length <= 0) {
    //   msgProvider.toast(msgText.emptyCoupon[config.language], 'center')
    //   return false;
    // }
    let url = config.baseURL + "pay_job_amount.php";

    var data = new FormData();
    data.append('user_id', user_details.user_id)
    data.append('job_id', this.state.job_id)
    data.append('job_status', '4')
    data.append('coupon_code', this.state.code)
    data.append('discount_percent', this.state.discount_percent)
    data.append('discount_amount', this.state.discount_amount)
    data.append('total_price', this.state.amount_after_discount)
    data.append('provider_id', this.state.provider_id)
    data.append('provider_name', this.state.provider_name)
    data.append('transaction_id', transaction_id)
    console.log('data', data)
    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj12345', obj)
      if (obj.success == 'true') {
        let notification_arr = obj.notification_arr;
        if (notification_arr != 'NA') {
          notification.notification_arr(notification_arr)
        }

        this.props.navigation.navigate('Payment_Success')
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

  addSubscription = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "UserSubscription.php";
    console.log("url", url)
    var data = new FormData();
    data.append('user_id', userdetails.user_id)
    data.append('amount', this.state.job_prize)
    data.append('status', 0)
    consolepro.consolelog("data", data)
    apifuntion.postApi(url, data).then((obj) => {
      consolepro.consolelog("obj", obj)
      if (obj.success == 'true') {
        // this.props.navigation.navigate('Viewrating')
        this.setState({ webviewshow: true })

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

  payment_status_update = async (payment_id) => {
    let userdetails = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "payment_status_update.php";
    console.log("url", url)
    var data = new FormData();
    data.append('user_id', userdetails.user_id)
    data.append('transaction_id', payment_id)
    data.append('status', 1)
    consolepro.consolelog("data", data)
    apifuntion.postApi(url, data).then((obj) => {
      consolepro.consolelog("obj", obj)
      if (obj.success == 'true') {
        var user_details = obj.user_details;
        localStorage.setItemObject('user_arr', user_details);
        this.get_data()
        this.props.navigation.navigate('Welcome')

        // this.setState({ webviewshow: true })
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
  _onNavigationStateChange(webViewState) {
    webViewState.canGoBack = false
    if (webViewState.loading == false) {
      console.log('webViewState', webViewState);
      console.log(webViewState.url)
      var t = webViewState.url.split('/').pop().split('?')[0]
      if (typeof (t) != null) {
        var p = webViewState.url.split('?').pop().split('&')
        console.log('file name', t);
        if (t == 'payment_success_subscription.php') {
          // console.log('parameter', p);
          // this.notifcationSendSubscribe()
          var payment_id = 0;
          var payment_date = '';
          var payment_time = '';
          console.log('p.length', p.length);
          for (var i = 0; i < p.length; i++) {
            var val = p[i].split('=');
            console.log('val', val);
            if (val[0] == 'payment_id') {
              payment_id = val[1]
            }

          }
          console.log('payment_id', payment_id);
          this.payJobAmount(payment_id)
          // this.payment_status_update(payment_id)
          // let datetime = payment_date+' '+payment_time
          this.setState({ webviewshow: false })

          // this._submitOffer(payment_id,datetime);
        } else if (t == 'payment_cancel.php') {
          // msgProvider.toast(Lang_chg.payment_failed[config.language], 'center');
          // this.setState({ webviewshow: false })
          return false;
        }
      }
    }
  }



  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          goBack={() => { this.props.navigation.goBack() }}
          title={Lang_chg.payment_overview_header[config.language]}
          showback={true}
        />
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.webviewshow}
          onRequestClose={() => {
            this.setState({ webviewshow: false })
          }}>

          <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 0, backgroundColor: Colors.statusbarcolor }} />
            <StatusBar barStyle='dark-content' hidden={false} translucent={false}
              networkActivityIndicatorVisible={true} backgroundColor={Colors.statusbarcolor} />
            <View style={{ width: mobileW * 100 / 100, backgroundColor: Colors.statusbarcolor, paddingVertical: mobileH * 3 / 100, alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', alignSelf: 'center', width: mobileW * 90 / 100 }} >
                <TouchableOpacity activeOpacity={0.9} onPress={() => { this.setState({ webviewshow: false }) }}>
                  <Image resizeMode="contain" style={{ width: 25, height: 25 }} source={require('../icons/back.png')}></Image>
                </TouchableOpacity>
                <Text style={{ fontFamily: Font.Nexa_bold, fontSize: mobileH * 2.5 / 100, color: Colors.whiteColor }}>Payment</Text>

                <Text></Text>
              </View>
            </View>


            <View style={{ flex: 1, backgroundColor: 'white' }}>
              <View style={{ marginTop: mobileH * 1 / 100, width: mobileW * 95 / 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }} >
                <Text style={{ fontFamily: Font.Nexa_bold, fontSize: mobileH * 2 / 100, color: '#FF0000', }}>Please don't press back untill the payment process</Text>
              </View>
              {
                this.state.webviewshow == true &&
                <WebView
                  source={{
                    //  uri: config.baseURL + 'stripe_payment/payment_url.php?user_id=' + this.state.user_id + '&order_id=' + this.state.user_subscription_id + '&descriptor_suffix=campligo&transfer_user_id=0&transfer_amount=0&amount=' + this.state.plan_prize }}
                    uri: config.baseURL + 'stripe_payment/payment_url_subscription.php?user_id=' + this.state.user_id + '&order_id=' + this.state.job_id + '&descriptor_suffix=campligo&transfer_user_id=0&transfer_amount=0&amount=' + this.state.job_prize + '&charge_type=now'
                  }}
                  onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                  startInLoadingState={false}
                  containerStyle={{ marginTop: 20, flex: 1 }}
                  textZoom={100}
                />
              }
            </View>
          </View>
        </Modal>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 6 / 100 }}>
              <View style={{ width: '60%' }}>
                <Text style={{
                  width: '100%', fontSize: mobileW * 4 / 100,
                  fontFamily: Font.semibold_font, color: (this.state.coupon_code == false ? Colors.themecolor : Colors.black_color)
                }}>{Lang_chg.paymentoverview_total_payment[config.language]}</Text>
              </View>
              <View style={{ width: '40%' }}>
                <Text style={{
                  width: '100%', fontSize: mobileW * 4 / 100,
                  fontFamily: Font.semibold_font, textAlign: 'right', color: Colors.themecolor
                }}>{this.state.job_prize}</Text>
              </View>
            </View>


          </View>
          {this.state.coupon_code == true && <View style={{
            width: '100%', borderTopWidth: 1, borderTopColor: Colors.placeholderbordercolor
            , borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingVertical: mobileW * 4 / 100
          }}>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <View style={{ width: '100%' }}>
                <Text style={{
                  width: '100%', color: Colors.black_color
                  , fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100
                }}>{Lang_chg.coupon_code[config.language]}</Text>
              </View>

              <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 4 / 100 }}>
                <View style={{ width: '75%', borderWidth: 1, borderColor: Colors.themecolor, borderRadius: mobileW * 1.5 / 100 }}>
                  <TextInput
                    style={styles.TextInput}
                    placeholder={Lang_chg.enter_coupon_code[config.language]}
                    onChangeText={(txt) => { this.setState({ code: txt, discountTextManage: false }) }}
                    //  value={code}
                    placeholderTextColor={Colors.msg_color}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    keyboardType={'default'}
                  />

                </View>
                <TouchableOpacity activeOpacity={0.8} onPress={() => this.apply_coupon_code()} style={{ width: '25%', paddingVertical: Platform.OS == 'ios' ? mobileW * 4 / 100 : mobileW * 2 / 100, alignItems: 'center', right: mobileW * 2 / 100, justifyContent: 'center', borderTopRightRadius: mobileW * 1.5 / 100, borderBottomRightRadius: mobileW * 1.5 / 100, backgroundColor: Colors.themecolor }}>
                  <Text style={{ fontSize: mobileW * 3.8 / 100, color: Colors.whiteColor, textAlign: 'center', fontFamily: Font.semibold_font }}>{Lang_chg.apply_btn[config.language]}</Text>
                </TouchableOpacity>

              </View>
              {this.state.discountTextManage == true && <View>
                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 2 / 100 }}>
                  <View style={{ width: '70%' }}>
                    <Text style={{
                      width: '100%', fontFamily: Font.semibold_font,
                      fontSize: mobileW * 4 / 100, color: Colors.black_color
                    }}>{Lang_chg.discount[config.language] + ' (' + this.state.discount_percent + '%)'}</Text>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Text style={{
                      width: '100%', fontFamily: Font.semibold_font,
                      fontSize: mobileW * 4 / 100, color: Colors.themecolor, textAlign: 'right'
                    }}>{'Kr ' + this.state.discount_amount + '/-'}</Text>
                  </View>
                </View>
                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 2 / 100 }}>
                  <View style={{ width: '70%' }}>
                    <Text style={{
                      width: '100%', fontFamily: Font.semibold_font,
                      fontSize: mobileW * 4 / 100, color: Colors.black_color
                    }}>{Lang_chg.total_payment_to_pay[config.language]}</Text>
                  </View>
                  <View style={{ width: '30%' }}>
                    <Text style={{
                      width: '100%', fontFamily: Font.semibold_font,
                      fontSize: mobileW * 4 / 100, color: Colors.themecolor, textAlign: 'right'
                    }}>{'Kr ' + this.state.amount_after_discount + '/-'}</Text>
                  </View>
                </View>
              </View>}

            </View>


          </View>}
          {this.state.coupon_code == true && <View style={{ width: '95%', alignSelf: 'center', marginTop: mobileW * 10 / 100 }}>
            <CustomButton
              navigate={() => {
                //   this.props.navigation.navigate('Payment_Success') 
                // this.payJobAmount();
                this.setState({ webviewshow: true })
              }}
              title={Lang_chg.paynowbtn[config.language]}
            />
          </View>}
          {this.state.coupon_code == false && <View style={{ width: '95%', alignSelf: 'center', marginTop: mobileW * 3 / 100 }}>
            <CustomButton
              navigate={() => { this.setState({ coupon_code: true }) }}
              title={Lang_chg.applycouponbtn[config.language]}
            />
          </View>}

        </KeyboardAwareScrollView>
      </Container>
    )
  }
} const styles = StyleSheet.create({

  TextInput: {
    width: '100%',
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.semibold_font,
    color: Colors.black_color,
    justifyContent: 'center',
    paddingHorizontal: mobileW * 4 / 100,
    paddingVertical: Platform.OS == 'ios' ? mobileW * 4 / 100 : mobileW * 2 / 100

  },
})
