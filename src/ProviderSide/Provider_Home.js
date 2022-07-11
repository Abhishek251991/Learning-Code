import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, BackHandler, Alert, TouchableOpacity, FlatList } from 'react-native'
import Container from '../Common/Container'
import { Cameragallery, mediaprovider, mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Footer1 from '../Provider/Footer1';
import { Nodata_foundimage } from '../Provider/Nodata_foundimage'

const job_data = [
  {
    'image': require('../icons/philip-martin.jpg'), 'name': 'Alicia Jonathan', 'heading': 'Cleaning', 'status': 'Instant Jobs',
    'description': 'Bathroom Cleaning', 'datetime': '04/12/2021, 09:00AM', 'id': '#7829261420', 'bookingdate': '02/12/2021, 03:00PM',
  },
  {
    'image': require('../icons/lisa.jpg'), 'name': 'Alicia Thomas', 'heading': 'Cleaning', 'status': 'Big Projects',
    'description': 'Sofa & Carpet Cleaning', 'datetime': '03/12/2021, 08:00AM', 'id': '#7829261419', 'bookingdate': '01/12/2021, 01:00PM',
  },

];
export default class Provider_Home extends Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props)
    this.state = {
      provider_job_arr: [],
      get_provider_total_jobs: '',
      get_provider_completed_jobs: '',
      get_provider_inprogress_jobs: '',
      total_earnings:'',
      notification_count:0,
    }
    this._didFocusSubscription = props.navigation.addListener('focus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
    );
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
    console.log('userdetails.user_id', userdetails.user_id)
    let userId = 0;
    if (userdetails == null) {
      userId = 0;
      // setuser_id(0)
    }
    else {
      userId = userdetails.user_id;
      // setuser_id(userdetails.user_id)
    }
    console.log('user_id', userId)
    let url = config.baseURL + "home_provider.php?user_id=" + userId;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
       let job_prize = config.numberWithCommas(obj.total_earnings);
        this.setState({
          provider_job_arr: obj.provider_job_arr, get_provider_total_jobs: obj.get_provider_total_jobs,
          get_provider_completed_jobs: obj.get_provider_completed_jobs, get_provider_inprogress_jobs: obj.get_provider_inprogress_jobs,
          total_earnings:job_prize,notification_count:obj.notification_count
        })
        

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


  handleBackPress = () => {
    Alert.alert(
      'Exit App',
      'Do you want to exit app', [{
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'Yes',
      }, {
        text: 'Yes',
        onPress: () => BackHandler.exitApp()
      }], {
      cancelable: false
    }
    ); // works best when the goBack is async 
    return true;
  };


  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '100%', paddingBottom: mobileW * 4 / 100, backgroundColor: Colors.themecolor }}>
            <View style={{ width: '90%', alignSelf: 'center', paddingVertical: mobileW * 3 / 100, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '15%', }}>
                <Image source={require('../icons/512_512_without_bg.png')} style={{ width: mobileW * 15 / 100, height: mobileW * 15 / 100, }} />
              </View>
              <TouchableOpacity
              onPress={()=>this.props.navigation.navigate('Provider_notification')} 
               style={{ width: '15%', alignItems: 'flex-end' }}>
               {this.state.notification_count <= 0 && <Image source={require('../icons/bell.png')} style={{ width: mobileW * 8 / 100, height: mobileW * 8 / 100, resizeMode: 'contain' }} />}
               {this.state.notification_count > 0 && <Image source={require('../icons/notification.png')} style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100 }} />}
              </TouchableOpacity>
            </View>
            <View style={{ width: '98%', marginTop: mobileW * 6 / 100, justifyContent: 'space-around', alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Provider_AllJobs',{'status':1}) }} style={styles.boxstyle}>
                <Text style={styles.countstyle}>{this.state.get_provider_total_jobs}</Text>
                <Text style={styles.textstyle}>{Lang_chg.alljobs[config.language]}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Provider_AllJobs',{'status':2,'job_status':4}) }} style={styles.boxstyle}>
                <Text style={styles.countstyle}>{this.state.get_provider_completed_jobs}</Text>
                <Text style={styles.textstyle}>{Lang_chg.completed_jobs[config.language]}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ width: '98%', marginTop: mobileW * 3 / 100, justifyContent: 'space-around', alignSelf: 'center', flexDirection: 'row' }}>
              <TouchableOpacity onPress={() => { this.props.navigation.navigate('Provider_AllJobs',{'status':3,'job_status':2}) }} style={styles.boxstyle}>
                <Text style={styles.countstyle}>{this.state.get_provider_inprogress_jobs}</Text>
                <Text style={styles.textstyle}>{Lang_chg.inprogress_jobs[config.language]}</Text>
              </TouchableOpacity>
              <TouchableOpacity disabled={true} style={styles.boxstyle}>
                <Text style={styles.countstyle}>{'Kr ' + this.state.total_earnings}</Text>
                <Text style={styles.textstyle}>{Lang_chg.total_Earnings[config.language]}</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: '100%', borderBottomWidth: 1, paddingVertical: mobileW * 3 / 100, borderBottomColor: Colors.placeholderbordercolor }}>
            <Text style={{
              width: '90%', alignSelf: 'center', fontFamily: Font.medium_font, color: Colors.themecolor
              , fontSize: mobileW * 4 / 100
            }}>{Lang_chg.recent_Jobs[config.language]}</Text>
          </View>
          <View style={{ width: '95%', alignSelf: 'center' }}>
         {this.state.provider_job_arr != 'NA' &&    <FlatList
              data={this.state.provider_job_arr}
              contentContainerStyle={{ paddingBottom: mobileW * 20 / 100 }}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('Provider_InstantJobs_Inprogress_Jobs_Details', { 'job_id': item.job_id }) }} style={{
                    width: '100%', alignSelf: 'center', borderWidth: 1, borderColor: Colors.themecolor
                    , paddingVertical: mobileW * 2 / 100, marginTop: mobileW * 3 / 100, borderRadius: mobileW * 1.5 / 100
                  }}>
                    <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                      <View style={{ width: '15%' }}>
                        <Image source={item.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url3 + item.image }} style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, borderRadius: mobileW * 7 / 100 }} />
                    </View>
                      <View style={{ width: '55%', alignSelf: 'center', marginLeft: mobileW * -1 / 100 }}>
                        <Text style={{
                          width: '100%', fontFamily: Font.semibold_font, color: Colors.black_color
                          , fontSize: mobileW * 4 / 100
                        }}>{item.name}</Text>
                      </View>
                      <View style={{ width: '30%', flexDirection: 'row', alignItems: 'center', marginLeft: mobileW * 6 / 100 }}>
                        <Text style={{ width: '100%', textAlign: 'center', fontFamily: Font.semibold_font, color: Colors.themecolor, fontSize: mobileW * 3.5 / 100 }}>{item.job_type[config.language]}</Text>
                      </View>
                    </View>
                    <View style={{ width: '90%', alignSelf: 'center', marginTop: mobileW * 2 / 100 }}>
                      <Text style={{
                        width: '100%', fontSize: mobileW * 3.8 / 100, fontFamily: Font.semibold_font
                        , color: Colors.black_color
                      }}>{item.category_name[config.language]}</Text>

                    </View>
                    <View style={{ width: '92%', flexDirection: 'row', marginTop: mobileW * 1 / 100 }}>
                      <View style={{ width: '15%', alignItems: 'center', justifyContent: 'center', }}>
                        <Image source={require('../icons/job.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                      </View>
                      <View style={{ width: '85%', marginLeft: mobileW * -2 / 100, }}>
                        <Text style={{
                          width: '100%', fontFamily: Font.regular_font,
                          fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                        }}>{item.description}</Text>
                      </View>

                    </View>
                    <View style={{ width: '92%', alignItems: 'center', marginTop: mobileW * 2 / 100, paddingBottom: mobileW * 3 / 100, borderBottomColor: Colors.placeholderbordercolor, alignSelf: 'center', flexDirection: 'row', }}>
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
          {this.state.provider_job_arr == 'NA' &&  <Nodata_foundimage/>}
          </View>
        </KeyboardAwareScrollView>
        <Footer1 navigation={this.props.navigation} page={'Provider_Home'} user_id={1} />
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  boxstyle: {
    width: '45%', backgroundColor: Colors.whiteColor,
    borderRadius: mobileW * 1.5 / 100, paddingVertical: mobileW * 6 / 100
  },
  countstyle: {
    width: '100%',
    textAlign: 'center',
    fontFamily: Font.bold_font,
    color: Colors.themecolor,
    fontSize: mobileW * 6 / 100
  },
  textstyle: {
    width: '100%',
    textAlign: 'center',
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.bold_font,
    color: Colors.black_color
  },

})