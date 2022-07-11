import React, { Component } from 'react'
import { Image, FlatList, Modal, Text, TouchableOpacity, View, RefreshControl } from 'react-native'
import Header1 from '../Common/Header1'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { firebaseprovider, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText, notification } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Provider_InstantJobs_Inprogress_Jobs_Details extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post_detail_arr: [],
      //  arr: this.props.route.params.arr,
      status: '',
      modalVisible: false,
      EndBtn: false,
      startBtn: true,
      refresh: false,
      provider_id: '',
      job_number: '',
      provider_name: ''

    }

  }

  componentDidMount() {
   // this.focusListener = this.props.navigation.addListener('focus', () => {
      this.get_data(0)
  //  });
  }

  get_data = async (loading) => {
    let user_details = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "post_detail.php?user_id=" + user_details.user_id + "&job_id=" + this.props.route.params.job_id;
    console.log(url)
    apifuntion.getApi(url, loading).then((obj) => {

      console.log('obj', obj);
      if (obj.success == "true") {
        let arr = obj.post_detail_arr[0];
        consolepro.consolelog('objjjjjj', obj.post_detail_arr[0]);
        consolepro.consolelog('obj.post_detail_arr[0].user_job_status[config.language]', obj.post_detail_arr[0].user_job_status[config.language]);
        consolepro.consolelog('provider_id', arr.get_provider_data.user_id);

        this.setState({
          refresh: false, post_detail_arr: obj.post_detail_arr[0],
          status: obj.post_detail_arr[0].job_status, provider_id: arr.get_provider_data.user_id,
          job_number: obj.post_detail_arr[0].job_number, provider_name: arr.get_provider_data.name
        })



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

  updateJobStatus = async (user_id, job_status) => {
    let user_details = await localStorage.getItemObject('user_arr');
    console.log('this.state.user_id',user_id)
    console.log('this.state.provider_id', this.state.provider_id)
    console.log('this.state.job_number', this.state.job_number)
    console.log('this.state.provider_name', this.state.provider_name)
  //  return false;
    let new_job_number = this.state.job_number;
    let new_job_number1 =  new_job_number.replace(/[^\w\s]/gi, '');
    
    let url = config.baseURL + "update_job_status.php?user_id=" + user_id + "&job_id=" + this.props.route.params.job_id + '&job_status='
      + job_status + '&provider_id=' + this.state.provider_id + '&player_id=' + config.player_id + '&device_type=' + config.device_type + '&job_number=' + new_job_number1 + '&provider_name=' + this.state.provider_name
    console.log(url)
    // return false;
    apifuntion.getApi(url).then((obj) => {
      console.log('obj', obj);
      if (obj.success == "true") {
        let notification_arr = obj.notification_arr
        if (notification_arr != 'NA') {
          notification.notification_arr(notification_arr)
        }

        this.get_data(1)

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

  _onRefresh = () => {
    this.setState({ refresh: true })
    this.get_data()
  }


  render() {
    let arr = this.state.post_detail_arr
    console.log('arr', arr)
    console.log('this.state.status', this.state.status)
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header1
          goBack={() => { this.props.navigation.goBack() }}
          title={arr.job_number}
          showback={true}
          icon={<TouchableOpacity  ><Image source={require('../icons/menu_white.png')} resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} /></TouchableOpacity>}

        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}
          refreshControl={
            <RefreshControl refreshing={this.state.refresh} onRefresh={() => { this._onRefresh() }} />
          }
        >
          <View style={{ width: '100%', paddingVertical: mobileW * 7 / 100, backgroundColor: Colors.themecolor }}>
            <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
              <View style={{ width: '75%' }}>
                <Text style={{
                  width: '100%', fontFamily: Font.semibold_font, color: Colors.whiteColor
                  , fontSize: mobileW * 6 / 100
                }}>{((arr != '') && (arr != [])) ? arr.category_name[config.language] : ''}</Text>
              </View>
              <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <View style={{ width: mobileW * 1.5 / 100, height: mobileW * 1.5 / 100, marginTop: mobileW * 1 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: Colors.whiteColor }}></View>
                <Text style={{
                  width: '98%', marginLeft: mobileW * 1 / 100, fontFamily: Font.semibold_font, color: Colors.whiteColor
                  , fontSize: mobileW * 4 / 100
                }}>
                  {((arr != '') && (arr != [])) ? arr.user_job_status[config.language] : ''}
                </Text>

              </View>
            </View>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <Text style={{ width: '100%', color: Colors.whiteColor, paddingHorizontal: mobileW * 1 / 100, fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100 }}>Kr {arr.total_price == 0.00 ? arr.job_price : arr.total_price}/Hr</Text>



            </View>
          </View>
          <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between', marginTop: mobileW * 4 / 100 }}>
            <Text style={{
              width: '70%', fontSize: mobileW * 4 / 100,
              color: Colors.black_color, fontFamily: Font.bold_font
            }}>{Lang_chg.user_Information[config.language]}</Text>
            {arr.job_status == 2 && <Text style={{
              width: '30%', fontSize: mobileW * 4 / 100,
              color: Colors.themecolor, fontFamily: Font.semibold_font, textAlign: 'right'
            }}>{arr.service_start_time}</Text>}
          </View>
          <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
            <View style={{ width: '90%', paddingVertical: mobileW * 3 / 100, alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}>
              <View style={{ width: '15%' }}>
                <Image
                  source={arr.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url3 + arr.image }}
                  style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, borderRadius: mobileW * 7 / 100 }} />
              </View>
              <View style={{ width: '65%', alignSelf: 'center', marginLeft: mobileW * -2 / 100 }}>
                <Text style={{
                  width: '100%', fontFamily: Font.semibold_font, color: Colors.black_color
                  , fontSize: mobileW * 4 / 100
                }}>
                  {arr.name}
                </Text>
              </View>
              <TouchableOpacity disabled={true} onPress={() => this.props.navigation.navigate('Conversion')} style={{ width: '20%', alignItems: 'flex-end' }}>
                <Image source={require('../icons/message.png')} resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, alignSelf: 'flex-end' }} />
              </TouchableOpacity>

            </View>
          </View>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingVertical: mobileW * 3 / 100 }}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Image source={require('../icons/job.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                </View>
                <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                  <Text style={{
                    width: '100%', fontSize: mobileW * 3.8 / 100,
                    fontFamily: Font.semibold_font, color: Colors.black_color
                  }}>{Lang_chg.service[config.language]}</Text>
                </View>

              </View>
              <View style={{ width: '100%', paddingVertical: mobileW * 1 / 100 }}>
                <Text style={{
                  width: '100%', fontFamily: Font.regular_font,
                  fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                }}> {((arr != '') && (arr != [])) ? arr.service_name[config.language] : ''}</Text>
              </View>
            </View>
            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingVertical: mobileW * 3 / 100 }}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Image source={require('../icons/title2.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                </View>
                <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                  <Text style={{
                    width: '100%', fontSize: mobileW * 3.8 / 100,
                    fontFamily: Font.semibold_font, color: Colors.black_color
                  }}>{Lang_chg.title[config.language]}</Text>
                </View>

              </View>
              <View style={{ width: '100%', paddingVertical: mobileW * 1 / 100 }}>
                <Text style={{
                  width: '100%', fontFamily: Font.regular_font,
                  fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                }}>{arr.job_title}</Text>
              </View>
            </View>
            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingVertical: mobileW * 3 / 100 }}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Image source={require('../icons/description.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                </View>
                <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                  <Text style={{
                    width: '100%', fontSize: mobileW * 3.8 / 100,
                    fontFamily: Font.semibold_font, color: Colors.black_color
                  }}>{Lang_chg.descriptiontitle[config.language]}</Text>
                </View>

              </View>
              <View style={{ width: '100%', paddingVertical: mobileW * 1 / 100 }}>
                <Text style={{
                  width: '100%', fontFamily: Font.regular_font,
                  fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                }}> {arr.description}</Text>
              </View>
            </View>
            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingVertical: mobileW * 3 / 100 }}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Image source={require('../icons/location_black.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                </View>
                <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                  <Text style={{
                    width: '100%', fontSize: mobileW * 3.8 / 100,
                    fontFamily: Font.semibold_font, color: Colors.black_color
                  }}>{Lang_chg.locationtitle[config.language]}</Text>
                </View>

              </View>
              <View style={{ width: '100%', paddingVertical: mobileW * 1 / 100 }}>
                <Text style={{
                  width: '100%', fontFamily: Font.regular_font,
                  fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                }}>{arr.job_location}</Text>
              </View>
            </View>
            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingVertical: mobileW * 3 / 100 }}>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '10%', justifyContent: 'center' }}>
                  <Image source={require('../icons/time_date.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                </View>
                <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                  <Text style={{
                    width: '100%', fontSize: mobileW * 3.8 / 100,
                    fontFamily: Font.semibold_font, color: Colors.black_color
                  }}>{Lang_chg.bookingtitle[config.language]}</Text>
                </View>

              </View>
              <View style={{ width: '100%', paddingVertical: mobileW * 1 / 100 }}>
                <Text style={{
                  width: '100%', fontFamily: Font.regular_font,
                  fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                }}>{arr.join_date_time}</Text>
              </View>
            </View>
            <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 3 / 100 }}>
              <View style={{ width: '10%', justifyContent: 'center' }}>
                <Image source={require('../icons/upload.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
              </View>
              <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                <Text style={{
                  width: '100%', fontSize: mobileW * 3.8 / 100,
                  fontFamily: Font.semibold_font, color: Colors.black_color
                }}>{Lang_chg.pending_work_photos[config.language]}</Text>
              </View>

            </View>

            {((arr.post_image_arr != '') && (arr.post_image_arr != []) && arr.post_image_arr != 'NA') && <FlatList
              data={arr.post_image_arr}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => {
                return (
                  <View style={{}}>
                    <Image source={{ uri: config.img_url1 + item.image }} style={{ marginLeft: mobileW * 2 / 100, width: mobileW * 27 / 100, height: mobileW * 27 / 100, borderRadius: mobileW * 1 / 100 }} />
                  </View>
                );
              }}
            />}

            {this.state.EndBtn == true && <View style={{ width: '100%', alignSelf: 'center' }}>
              <View style={{ width: '100%', paddingVertical: mobileW * 2 / 100 }}>
                <Text style={{
                  fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font,
                  color: Colors.themecolor
                }}>{Lang_chg.working_hours_of_provider[config.language]}</Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '80%' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.semibold_font
                    , color: Colors.black_color, fontSize: mobileW * 4 / 100
                  }}>{Lang_chg.work_start_time[config.language]}</Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.regular_font, color: Colors.black_color, fontSize: mobileW * 3.5 / 100, textAlign: 'right'
                  }}>{Lang_chg.start_time[config.language]}</Text>
                </View>
              </View>

              <TouchableOpacity onPress={() => {
                // var dataa = this.state.arr;
                // dataa.status = "End Job";
                // this.setState({ EndBtn: false, arr: dataa })
              }} activeOpacity={0.9} style={{
                width: '100%', marginTop: mobileW * 8 / 100,
                backgroundColor: 'red', borderRadius: mobileW * 2 / 100, paddingVertical: mobileW * 3 / 100,
                alignSelf: 'center'
              }} >
                <Text style={{
                  textAlign: 'center', fontSize
                    : mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.whiteColor
                }}>{Lang_chg.endBtn[config.language]}</Text>
              </TouchableOpacity>
            </View>}

          </View>
          {(arr.job_status == 1) && <View style={{ width: '95%', alignSelf: 'center', marginTop: mobileW * 8 / 100 }}>
            <CustomButton
              navigate={() => {
                this.updateJobStatus(arr.user_id, 2)

              }}
              title={Lang_chg.start_jobBtn[config.language]}
            />
          </View>}

          {(arr.job_status == 2) && <View style={{ width: '95%', alignSelf: 'center', marginTop: mobileW * 8 / 100 }}>
            <CustomButton btnColour='red' navigate={() => {
              this.updateJobStatus(arr.user_id, 3)
            }}
              title={Lang_chg.endBtn[config.language]}
            />
          </View>}



          {(arr.job_status == 3) && <View style={{ width: '100%' }}>
            <View style={{ width: '90%', alignSelf: 'center' }}>
              <View style={{ width: '100%', paddingVertical: mobileW * 2 / 100 }}>
                <Text style={{
                  fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font,
                  color: Colors.themecolor
                }}>{Lang_chg.working_hours_of_provider[config.language]}</Text>
              </View>
              <View style={{ width: '100%', flexDirection: 'row' }}>
                <View style={{ width: '60%' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.semibold_font
                    , color: Colors.black_color, fontSize: mobileW * 4 / 100
                  }}>{Lang_chg.work_start_time[config.language]}</Text>
                </View>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.regular_font
                    , color: Colors.black_color, fontSize: mobileW * 3.5 / 100, textAlign: 'right'
                  }}>{arr.job_start_time}</Text>
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 4 / 100 }}>
                <View style={{ width: '60%' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.semibold_font
                    , color: Colors.black_color, fontSize: mobileW * 4 / 100
                  }}>{Lang_chg.work_end_time[config.language]}</Text>
                </View>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.regular_font
                    , color: Colors.black_color, fontSize: mobileW * 3.5 / 100, textAlign: 'right'
                  }}>{arr.job_end_time}</Text>
                </View>
              </View>
              <View style={{ width: '100%', flexDirection: 'row', paddingBottom: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                <View style={{ width: '80%' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.semibold_font
                    , color: Colors.black_color, fontSize: mobileW * 4 / 100
                  }}>{Lang_chg.extra_work_hour[config.language]}</Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.regular_font
                    , color: Colors.black_color, fontSize: mobileW * 3.5 / 100, textAlign: 'right'
                  }}>{arr.extra_working_hours}</Text>
                </View>
              </View>
            </View>
            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingBottom: mobileW * 4 / 100 }}>
              <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', paddingVertical: mobileW * 2 / 100 }}>
                <View style={{ width: '80%' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.bold_font
                    , color: Colors.black_color, fontSize: mobileW * 4 / 100
                  }}>{Lang_chg.total_working_hour[config.language]}</Text>
                </View>
                <View style={{ width: '20%', justifyContent: 'center' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.bold_font
                    , color: Colors.black_color, fontSize: mobileW * 4 / 100, textAlign: 'right'
                  }}>{arr.total_working_hour}</Text>
                </View>
              </View>
            </View>
            <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
              <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', paddingVertical: mobileW * 3 / 100 }}>
                <View style={{ width: '60%' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.bold_font
                    , color: Colors.themecolor, fontSize: mobileW * 4 / 100
                  }}>{Lang_chg.completed_total_amount_text[config.language]}</Text>
                </View>
                <View style={{ width: '40%', justifyContent: 'center' }}>
                  <Text style={{
                    width: '100%', fontFamily: Font.bold_font
                    , color: Colors.themecolor, fontSize: mobileW * 4 / 100, textAlign: 'right'
                  }}>Kr {arr.total_price == 0.00 ? arr.job_price : arr.total_price}/Hr</Text>
                </View>
              </View>
            </View>
          </View>}


        </KeyboardAwareScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {
          }}
        >
          <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
            <View style={{ width: '85%', position: 'absolute', bottom: mobileW * 3 / 100, alignSelf: 'center', alignItems: 'center', }}>
              <View style={{ width: '100%', backgroundColor: '#FFFFFF', alignSelf: 'center', borderRadius: mobileW * 3 / 100 }}>
                <View style={{ width: '100%', borderBottomColor: Colors.lightGray_color, borderBottomWidth: 1, paddingVertical: mobileW * 5 / 100 }}>
                  <Text style={{ width: '100%', textAlign: 'center', fontFamily: Font.bold_font, fontSize: mobileW * 4 / 100, color: Colors.black_color }}>{Lang_chg.selectoption[config.language]}</Text>
                </View>
                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }), this.props.navigation.navigate('Report_Complaint') }} activeOpacity={.7} style={{ width: '100%', borderBottomColor: Colors.lightGray_color, borderBottomWidth: 1, paddingVertical: mobileW * 5 / 100 }}>
                  <Text style={{
                    width: '100%', textAlign: 'center',
                    fontFamily: Font.bold_font,
                    fontSize: mobileW * 4 / 100, color: Colors.black_color
                  }}>{Lang_chg.report_complaint[config.language]}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }), this.props.navigation.navigate('Cancel_Job_Reason') }} style={{ width: '100%', alignItems: 'center', alignSelf: 'center', paddingVertical: mobileW * 5 / 100 }}>
                  <Text style={{ width: '100%', textAlign: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font, color: Colors.black_color }}>{Lang_chg.cancel_job[config.language]}</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFFFFF', paddingVertical: mobileW * 5 / 100, alignSelf: 'center', borderRadius: mobileW * 3 / 100, marginTop: mobileW * 3 / 100 }} onPress={() => { this.setState({ modalVisible: false }) }} >
                <Text style={{ width: '100%', textAlign: 'center', color: Colors.red_Color, fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font }}>{Lang_chg.cancel[config.language]}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </Container>
    )
  }
}

