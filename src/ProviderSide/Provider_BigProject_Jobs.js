import React, { Component } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Nodata_foundimage } from '../Provider/Nodata_foundimage';

const open_data = [
  {
    'heading': 'Cleaning', 'type': 'Bathroom Cleaning', 'job_status': 'Pending',
    'description': 'Bathroom Cleaning', 'datetime': '03/12/2021, 08:00AM', 'id': '#7829261420', 'bookingdate': '01/12/2021, 01:00PM', 'navigate': 'Job_Pending_Details', 'status': 0
  },
  {
    'heading': 'Laundry', 'type': 'Womens Dress ', 'job_status': 'Assign Job',
    'description': 'Casaual Wear', 'datetime': '04/12/2021, 10:00AM', 'id': '#7829261419', 'bookingdate': '02/12/2021, 02:00PM', 'navigate': 'Job_Assign_Details', 'status': 1
  },
  {
    'heading': 'Cleaning', 'type': 'Mens Dress ', 'job_status': 'Start Job',
    'description': 'Kitchen Cleaning', 'datetime': '05/12/2021, 07:00AM', 'id': '#7829261422', 'bookingdate': '04/12/2021, 09:00AM', 'navigate': 'Job_Start_Details', 'status': 2
  },
  {
    'heading': 'Laundry', 'type': 'Mens Dress ', 'job_status': 'End Job',
    'description': 'Womens Dress', 'datetime': '03/12/2021, 11:00AM', 'id': '#7829261417', 'bookingdate': '01/12/2021, 01:00PM', 'navigate': 'Job_End_Details', 'status': 3
  },
];
const past_data = [
  {
    'heading': 'Cleaning', 'type': 'Bathroom Cleaning', 'status': 'Completed',
    'description': ' Bathroom Cleaning',
    'datetime': '03/12/2021, 08:00AM', 'id': '#7829261420', 'bookingdate': '01/12/2021, 01:00PM', 'navigate': 'Job_Completed_Details'
  },
  {
    'heading': 'Laundry', 'type': 'Womens Dress ', 'status': 'Completed',
    'description': 'Casaual Wear', 'datetime': '04/12/2021, 10:00AM', 'id': '#7829261419', 'bookingdate': '02/12/2021, 09:00AM'
  },
  {
    'heading': 'Laundry', 'type': 'Mens Dress ', 'status': 'Cancel',
    'description': 'Mens Wear', 'datetime': '05/12/2021, 09:00AM', 'id': '#7829261418', 'bookingdate': '03/12/2021, 02:00PM', 'navigate': 'Job_Cancel_Details'
  },
];
export default class Provider_BigProject_Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openJobs: true,
      pastJobs: false,
      open_data: open_data,
      past_data: past_data,
      loading: false,
      Instant_Job_arr: [],
      past_jobs_arr: [],

    }
  }
  // componentDidMount(){
  //   this.focusListener = this.props.navigation.addListener('focus', () => {
  //     const open_data=[
  //       {'heading':'Cleaning','type':'Bathroom Cleaning','job_status':'Pending',
  //       'description':'Bathroom Cleaning','datetime':'03/12/2021, 08:00AM','id':'#7829261420','bookingdate':'01/12/2021, 01:00PM','navigate':'Job_Pending_Details','status':0},
  //       {'heading':'Laundry','type':'Womens Dress ','job_status':'Assign Job',
  //       'description':'Casaual Wear','datetime':'04/12/2021, 10:00AM','id':'#7829261419','bookingdate':'02/12/2021, 02:00PM','navigate':'Job_Assign_Details','status':1},
  //       {'heading':'Cleaning','type':'Mens Dress ','job_status':'Start Job',
  //       'description':'Kitchen Cleaning','datetime':'05/12/2021, 07:00AM','id':'#7829261422','bookingdate':'04/12/2021, 09:00AM','navigate':'Job_Start_Details','status':2},
  //       {'heading':'Laundry','type':'Mens Dress ','job_status':'End Job',
  //       'description':'Womens Dress','datetime':'03/12/2021, 11:00AM','id':'#7829261417','bookingdate':'01/12/2021, 01:00PM','navigate':'Job_End_Details','status':3},
  //       ];
  //     this.setState({ loading:true,open_data:open_data})
  // });
  // }

  componentDidMount() {

    this.props.navigation.addListener('focus', payload => {
      this.get_data()
      this.get_data_past_jobs()

    });
  }



  get_data = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "get_user_jobs.php?user_id=" + userdetails.user_id + "&job_type=" + 1;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        this.setState({ Instant_Job_arr: obj.instant_jobs_arr })
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

  get_data_past_jobs = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "get_user_past_jobs.php?user_id=" + userdetails.user_id + "&job_type=" + 1;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        this.setState({ past_jobs_arr: obj.past_jobs_arr })
        // let home_arr = obj.user_home_arr

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
          goBack={() => { this.props.navigation.goBack() }}
          title={Lang_chg.big_Project_Header[config.language]}
          showback={true}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '100%', borderBottomWidth: 1, paddingVertical: mobileW * 3.5 / 100, borderBottomColor: Colors.gray_color, flexDirection: 'row', justifyContent: 'space-between' }}>

            <TouchableOpacity onPress={() => { this.setState({ pastJobs: false }), this.setState({ openJobs: true }) }} style={{ width: '50%', alignSelf: 'center', alignItems: 'center' }}>
              <Text style={{ width: '100%', textAlign: 'center', fontFamily: Font.semibold_font, color: (this.state.openJobs == true ? Colors.themecolor : Colors.black_color), fontSize: mobileW * 4 / 100 }}>{Lang_chg.openjobs[config.language]}</Text>
            </TouchableOpacity>

            <View style={{ width: '1%', borderRightWidth: 1, height: mobileW * 9 / 100, borderRightColor: Colors.placeholderbordercolor }}>
            </View>
            <TouchableOpacity onPress={() => { this.setState({ pastJobs: true }), this.setState({ openJobs: false }) }} style={{ width: '50%', alignSelf: 'center', alignItems: 'center' }}>
              <Text style={{ width: '100%', textAlign: 'center', fontFamily: Font.semibold_font, color: (this.state.pastJobs == true ? Colors.themecolor : Colors.black_color), fontSize: mobileW * 4 / 100 }}>{Lang_chg.pastjobs[config.language]}</Text>
            </TouchableOpacity>
          </View>
          {this.state.openJobs == true && <View style={{ width: '95%', alignSelf: 'center' }}>
            {this.state.Instant_Job_arr != 'NA' && <FlatList
              data={this.state.Instant_Job_arr}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate('Provider_InstantJobs_Inprogress_Jobs_Details', { 'job_id': item.job_id }) }}
                    style={{
                      width: '100%', alignSelf: 'center', borderWidth: 1, borderColor: Colors.themecolor
                      , paddingVertical: mobileW * 3 / 100, marginTop: mobileW * 3.5 / 100, borderRadius: mobileW * 1.5 / 100
                    }}>
                    <View style={{ width: '90%', justifyContent: 'space-between', alignSelf: 'center', flexDirection: 'row' }}>
                      <View style={{ width: '68%' }}>
                        <Text style={{
                          width: '100%', fontSize: mobileW * 3.8 / 100, fontFamily: Font.semibold_font
                          , color: Colors.black_color
                        }}>
                          {item.category_name[config.language]}
                          </Text>
                      </View>
                      <View
                          style={{
                            width: '30%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: (mobileW * 6) / 100,
                          }}>
                          <View style={[{ width: (mobileW * 2) / 100, height: (mobileW * 2) / 100, borderRadius: (mobileW * 1) / 100, },
                          (item.user_job_status[config.language] == 'Pending') || (item.user_job_status[config.language] == 'Verserende') ? { backgroundColor: Colors.red_Color }
                            : (item.user_job_status[config.language] == 'Start Job') || (item.user_job_status[config.language] == 'Start Job') ? { backgroundColor: Colors.themecolor }
                              : (item.user_job_status[config.language] == 'Assign Job') || (item.user_job_status[config.language] == 'Tildel job') ? { backgroundColor: Colors.assignJob_color }
                                : (item.user_job_status[config.language] == 'End Job') || (item.user_job_status[config.language] == 'Afslut job') ? { backgroundColor: Colors.red_Color }
                                  : Colors.black_color,
                          ]}
                          />
                          <View
                            style={{
                              width: '98%',
                              alignItems: 'flex-end',
                              alignSelf: 'flex-end',
                              paddingHorizontal: (mobileW * 2) / 100,
                            }}>
                            <Text
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                fontFamily: Font.regular_font,
                                color: (item.user_job_status[config.language] == 'Pending') || (item.user_job_status[config.language] == 'Verserende') ? Colors.red_Color
                                  : (item.user_job_status[config.language] == 'Assign Job') || (item.user_job_status[config.language] == 'Tildel job')
                                    ? Colors.assignJob_color
                                    : (item.user_job_status[config.language] == 'Start Job') || (item.user_job_status[config.language] == 'Start Job')
                                      ? Colors.themecolor
                                      : (item.user_job_status[config.language] == 'End Job') || (item.user_job_status[config.language] == 'Afslut job')
                                        ? Colors.red_Color
                                        : Colors.black_color,
                                fontSize: (mobileW * 3.5) / 100,
                              }}>
                              {item.user_job_status[config.language]}
                            </Text>
                          </View>
                        </View>
                    </View>
                    <View style={{ width: '92%', flexDirection: 'row', paddingVertical: mobileW * 2 / 100 }}>
                      <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={require('../icons/job.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                      </View>
                      <View style={{ width: '85%', marginLeft: mobileW * -2 / 100, }}>
                        <Text style={{
                          width: '100%', fontFamily: Font.regular_font,
                          fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                        }}>
                          {item.service_name[config.language]}
                          </Text>
                      </View>
                    </View>
                    <View style={{ width: '92%', alignItems: 'center', paddingBottom: mobileW * 4 / 100, alignSelf: 'center', flexDirection: 'row', paddingVertical: mobileW * 1 / 100 }}>
                      <View style={{ width: '10%', justifyContent: 'center', paddingHorizontal: mobileW * 1 / 100 }}>
                        <Image source={require('../icons/time_date.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                      </View>
                      <View style={{ width: '90%', marginLeft: mobileW * -1.8 / 100 }}>
                        <Text style={{
                          width: '100%', fontFamily: Font.regular_font,
                          fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                        }}>{item.join_date_time}</Text>
                      </View>

                    </View>
                    <View style={{
                      width: '90%', alignSelf: 'center', borderStyle: 'dashed', borderWidth: 0.9,
                      borderRadius: 1, borderColor: Colors.dash_border_color,
                    }}></View>

                    <View style={{ width: '92%', flexDirection: 'row', paddingTop: mobileW * 2 / 100, alignSelf: 'center' }}>
                      <View style={{ width: '40%', paddingHorizontal: mobileW * 2 / 100 }}>
                        <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.regular_font, color: Colors.themecolor }}>{item.job_number}</Text>
                      </View>
                      <View style={{ width: '60%', }}>
                        <Text style={{ fontSize: mobileW * 3.0 / 100, textAlign: 'right', fontFamily: Font.regular_font, color: Colors.msg_color }}>{item.createtime}</Text>
                      </View>

                    </View>

                  </TouchableOpacity>
                )
              }}
            />}
            {this.state.Instant_Job_arr == 'NA' && <Nodata_foundimage />}
          </View>}

          {this.state.pastJobs == true && <View style={{ width: '95%', alignSelf: 'center' }}>
            {this.state.past_jobs_arr != 'NA' && <FlatList
              data={this.state.past_jobs_arr}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity
                  onPress={() => { this.props.navigation.navigate('Job_Assign_Details',{'job_id':item.job_id}); }}
                   style={{
                    width: '100%', alignSelf: 'center', borderWidth: 1, borderColor: Colors.themecolor
                    , paddingVertical: mobileW * 3 / 100, marginTop: mobileW * 3.5 / 100, borderRadius: mobileW * 1.5 / 100
                  }}>
                    <View
                        style={{
                          width: '90%',
                          alignSelf: 'center',
                          flexDirection: 'row',
                        }}>
                        <View style={{ width: '70%' }}>
                          <Text
                            style={{
                              width: '100%',
                              fontSize: (mobileW * 3.8) / 100,
                              fontFamily: Font.semibold_font,
                              color: Colors.black_color,
                            }}>
                            {item.category_name[config.language]}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: '30%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: (mobileW * 6) / 100,
                          }}>
                          <View style={[{ width: (mobileW * 2) / 100, height: (mobileW * 2) / 100, borderRadius: (mobileW * 1) / 100, },
                          (item.user_job_status[config.language] == 'Pending') || (item.user_job_status[config.language] == 'Verserende') ? { backgroundColor: Colors.red_Color }
                            : (item.user_job_status[config.language] == 'Start Job') || (item.user_job_status[config.language] == 'Start Job') ? { backgroundColor: Colors.themecolor }
                              : (item.user_job_status[config.language] == 'Assign Job') || (item.user_job_status[config.language] == 'Tildel job') ? { backgroundColor: Colors.assignJob_color }
                                : (item.user_job_status[config.language] == 'End Job') || (item.user_job_status[config.language] == 'Afslut job') ? { backgroundColor: Colors.red_Color }
                                  : (item.user_job_status[config.language] == 'Completed') || (item.user_job_status[config.language] == 'Færdiggjort') ? { backgroundColor: Colors.green_Color } : Colors.black_color,
                          ]}
                          />
                          <View
                            style={{
                              width: '98%',
                              alignItems: 'flex-end',
                              alignSelf: 'flex-end',
                              paddingHorizontal: (mobileW * 2) / 100,
                            }}>
                            <Text
                              style={{
                                width: '100%',
                                textAlign: 'left',
                                fontFamily: Font.regular_font,
                                color: (item.user_job_status[config.language] == 'Pending') || (item.user_job_status[config.language] == 'Verserende') ? Colors.red_Color
                                  : (item.user_job_status[config.language] == 'Assign Job') || (item.user_job_status[config.language] == 'Tildel job')
                                    ? Colors.assignJob_color
                                    : (item.user_job_status[config.language] == 'Start Job') || (item.user_job_status[config.language] == 'Start Job')
                                      ? Colors.themecolor
                                      : (item.user_job_status[config.language] == 'End Job') || (item.user_job_status[config.language] == 'Afslut job')
                                        ? Colors.red_Color
                                        : (item.user_job_status[config.language] == 'Completed') || (item.user_job_status[config.language] == 'Færdiggjort') ? Colors.green_Color : Colors.red_Color,
                                fontSize: (mobileW * 3.5) / 100,
                              }}>
                              {item.user_job_status[config.language]}
                            </Text>
                          </View>
                        </View>
                      </View>
                    <View style={{ width: '90%', flexDirection: 'row', paddingVertical: mobileW * 2 / 100 }}>
                      <View style={{ width: '15%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image source={require('../icons/job.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                      </View>
                      <View style={{ width: '85%', marginLeft: mobileW * -2 / 100 }}>
                        <Text style={{
                          width: '100%', fontFamily: Font.regular_font,
                          fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                        }}>{item.service_name[config.language]}</Text>
                      </View>

                    </View>
                    <View style={{ width: '92%', paddingBottom: mobileW * 4 / 100, alignSelf: 'center', flexDirection: 'row', paddingVertical: mobileW * 1 / 100 }}>
                      <View style={{ width: '10%', paddingHorizontal: mobileW * 1 / 100 }}>
                        <Image source={require('../icons/time_date.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                      </View>
                      <View style={{ width: '90%', marginLeft: mobileW * -1.8 / 100 }}>
                        <Text style={{
                          width: '100%', fontFamily: Font.regular_font,
                          fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                        }}>{item.join_date_time}</Text>
                      </View>

                    </View>
                    <View style={{
                      width: '90%', alignSelf: 'center', borderStyle: 'dashed', borderWidth: 0.9,
                      borderRadius: 1, borderColor: Colors.dash_border_color,
                    }}></View>
                    <View style={{ width: '92%', flexDirection: 'row', paddingTop: mobileW * 2 / 100, alignSelf: 'center' }}>
                      <View style={{ width: '40%', paddingHorizontal: mobileW * 2 / 100 }}>
                        <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.regular_font, color: Colors.themecolor }}>{item.job_number}</Text>
                      </View>
                      <View style={{ width: '60%', }}>
                        <Text style={{ fontSize: mobileW * 3.0 / 100, textAlign: 'right', fontFamily: Font.regular_font, color: Colors.msg_color }}>{item.createtime}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )
              }}
            />}
            {this.state.past_jobs_arr == 'NA' && <Nodata_foundimage />}
          </View>}
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}
