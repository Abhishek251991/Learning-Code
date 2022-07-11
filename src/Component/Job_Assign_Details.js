import React, { Component } from 'react'
import { Image, FlatList, Text, TouchableOpacity, View, Modal, Touchable, Platform } from 'react-native'
import Header1 from '../Common/Header1'
import Container from '../Common/Container'
import { mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText, notification, mobileH } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import OneSignal from 'react-native-onesignal';
import CustomButton from '../Common/CustomButton'
import { Nodata_foundimage } from '../Provider/Nodata_foundimage';
import StarRating from 'react-native-star-rating';


export default class Job_Assign_Details extends Component {
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
         avg_rat:'',

      }
      OneSignal.init(config.onesignalappid, {
         kOSSettingsKeyAutoPrompt: true,
      });

      OneSignal.setLogLevel(6, 0);
      OneSignal.setLocationShared(true);
      OneSignal.inFocusDisplaying(2);
      OneSignal.addEventListener('ids', this.onIds.bind(this));
   }

   componentDidMount() {
    
      OneSignal.init(config.onesignalappid, {
         kOSSettingsKeyAutoPrompt: true,
      });

      OneSignal.setLogLevel(6, 0);
      OneSignal.setLocationShared(true);
      OneSignal.inFocusDisplaying(2);
      OneSignal.addEventListener('ids', this.onIds.bind(this));
      this.props.navigation.addListener('focus', payload => {
         this.get_data(0)
      });
   }

   onIds = (device) => {
    
      this.setState({ player_id: device.userId })

     
   }

   get_data = async (status_get) => {
      let user_details = await localStorage.getItemObject('user_arr');
      let url = config.baseURL + "post_detail.php?user_id=" + user_details.user_id + "&job_id=" + this.props.route.params.job_id;
    
      apifuntion.getApi(url, status_get).then((obj) => {

     
         if (obj.success == "true") {
            // consolepro.consolelog("arr",obj);
            consolepro.consolelog('objjjjjj', obj.post_detail_arr[0]);
            let arr = obj.post_detail_arr[0];
            consolepro.consolelog('obj.post_detail_arr[0].user_job_status[config.language]', obj.post_detail_arr[0].user_job_status[config.language]);
            this.setState({
               post_detail_arr: arr, status: arr.job_status,
               provider_id: arr.get_provider_data.user_id, job_number_get: arr.job_number,
               rating_arr: obj.rating_arr, rating_status: obj.rating_status,avg_rat:obj.avg_rat
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

   acceptReject = async (job_id, quote_status) => {
      let user_details = await localStorage.getItemObject('user_arr');
      let arr = this.state.post_detail_arr
      let url = config.baseURL + "manage_quotes.php";
    
      var data = new FormData();
      data.append('user_id', user_details.user_id)
      data.append('provider_id', this.state.provider_id)
      data.append('job_id', job_id)
      data.append('coutation_status', quote_status)
      data.append('device_type', config.device_type)
      data.append('player_id', config.player_id)
      data.append('job_number', this.state.job_number_get)

      consolepro.consolelog("data", data)
      apifuntion.postApi(url, data).then((obj) => {
        
         if (obj.success == "true") {
            let notification_arr = obj.notification_arr
            if (notification_arr != 'NA') {
               notification.notification_arr(notification_arr);
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

   onStarRatingPress(rating) {
      this.setState({
        rating: rating
      });
    }

   render() {
      let arr = this.state.post_detail_arr
    
      return (
         <Container backgroundColor={Colors.whiteColor}>
            <Header1 goBack={() => { this.props.navigation.goBack() }} title={arr.job_number} showback={true} icon={<TouchableOpacity disabled={(this.state.status == 0) ? false : true} onPress={() => { this.setState({ modalVisible: true }) }} ><Image source={require('../icons/menu_white.png')} resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} /></TouchableOpacity>} />

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
                        <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }), this.props.navigation.navigate('Report_Complaint', { 'job_id': arr.job_id, 'provider_id': arr.provider_id }) }} activeOpacity={.7} style={{ width: '100%', borderBottomColor: Colors.lightGray_color, borderBottomWidth: 1, paddingVertical: mobileW * 5 / 100 }}>
                           <Text style={{
                              width: '100%', textAlign: 'center',
                              fontFamily: Font.bold_font,
                              fontSize: mobileW * 4 / 100, color: Colors.black_color
                           }}>{Lang_chg.report_complaint[config.language]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.setState({ modalVisible: false }), this.props.navigation.navigate('Cancel_Job_Reason', { 'job_id': arr.job_id }) }} style={{ width: '100%', alignItems: 'center', alignSelf: 'center', paddingVertical: mobileW * 5 / 100 }}>
                           <Text style={{ width: '100%', textAlign: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font, color: Colors.black_color }}>{Lang_chg.cancel_job[config.language]}</Text>
                        </TouchableOpacity>
                     </View>
                     <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFFFFF', paddingVertical: mobileW * 5 / 100, alignSelf: 'center', borderRadius: mobileW * 3 / 100, marginTop: mobileW * 3 / 100 }} onPress={() => { this.setState({ modalVisible: false }) }} >
                        <Text style={{ width: '100%', textAlign: 'center', color: Colors.red_Color, fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font }}>{Lang_chg.cancel[config.language]}</Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Modal>
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
               <View style={{ width: '100%', paddingVertical: mobileW * 6 / 100, backgroundColor: Colors.themecolor }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                     <View style={{ width: '75%' }}>
                        <Text style={{ width: '100%', fontFamily: Font.semibold_font, color: Colors.whiteColor, fontSize: mobileW * 6 / 100 }}>{((arr != '') && (arr != [])) ? arr.category_name[config.language] : ''}</Text>

                     </View>
                     <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ width: mobileW * 1.5 / 100, height: mobileW * 1.5 / 100, marginTop: mobileW * 1 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: Colors.whiteColor }}></View>
                        <Text style={{ width: '95%', marginLeft: mobileW * 1 / 100, fontFamily: Font.semibold_font, color: Colors.whiteColor, fontSize: mobileW * 4 / 100 }}>{((arr != '') && (arr != [])) ? arr.user_job_status[config.language] : ''}</Text>
                     </View>
                  </View>
                  <View style={{ width: '90%', alignSelf: 'center', paddingHorizontal: mobileW * 1 / 100, marginTop: mobileW * 1 / 100, paddingBottom: mobileW * 2 / 100 }}>
                     <Text style={{
                        width: '100%', fontFamily: Font.semibold_font, color: Colors.whiteColor
                        , fontSize: mobileW * 4 / 100
                     }}>{arr.job_price}</Text>
                  </View>
               </View>
               {((this.state.status != 0) && (this.state.status != 'Verserende') && (arr.get_provider_data != 'NA')) && <View style={{ width: '90%', alignSelf: 'center', paddingVertical: mobileW * 3 / 100, flexDirection: 'row' }}>
                  <View style={{ width: '80%', }}>
                     <Text style={{
                        width: '100%', fontSize: mobileW * 4.3 / 100, fontFamily: Font.bold_font
                        , color: Colors.black_color
                     }}>{Lang_chg.provider_Information[config.language]}</Text>
                  </View>

               </View>}
               {((this.state.status != 0) && (this.state.status != 'Verserende') && (arr.get_provider_data != 'NA')) && <View style={{ width: '100%', paddingBottom: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                  <View style={{ width: '90%', alignItems: 'center', alignSelf: 'center', flexDirection: 'row' }}>
                     <View style={{ width: '20%' }}>
                        <Image source={arr.get_provider_data.name != null ? { uri: config.img_url3 + arr.get_provider_data.image } : require('../icons/profile_with_bg.png')} style={{ width: mobileW * 18 / 100, height: mobileW * 18 / 100, borderRadius: mobileW * 9 / 100, borderWidth: 1, borderColor: Colors.gray_color }} />
                     </View>
                     <View style={{ width: '50%', paddingHorizontal: mobileW * 1 / 100, alignSelf: 'center' }}>
                        <View style={{ width: '100%' }}>
                           <Text style={{ width: '100%', fontSize: mobileW * 3.8 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{arr.get_provider_data.name}</Text>
                        </View>
                        <View style={{ width: '100%' }}>
                           <Text numberOfLines={3} style={{ width: '100%', fontSize: mobileW * 3.8 / 100, fontFamily: Font.regular_font, color: Colors.black_color }}>{arr.get_provider_data.description}</Text>
                        </View>
                     </View>
                     <View style={{ width: '30%', marginTop: Platform.OS == 'ios' ? -mobileW * 2 / 100 : -mobileW * 6 / 100 }}>
                     {this.state.rating_arr != "NA" &&     <View style={{ width: '100%', flexDirection: 'row',alignItems:'center' }}>
                           <View style={{ width: '70%', marginTop: mobileW * 1 / 100, justifyContent: 'space-around', flexDirection: 'row' }}>
                             
                              <StarRating
                                 containerStyle={{ paddingRight: 2 }}
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
                           <View style={{ width: '30%', marginLeft: mobileW * 2 / 100 }}>
                              <Text style={{ width: '100%', fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>({this.state.avg_rat})</Text>
                           </View>
                        </View>}
                        <TouchableOpacity
                           onPress={() => this.props.navigation.navigate('Conversation', { 'chatdata': { 'other_user_id': arr.get_provider_data.user_id, 'other_user_name': arr.get_provider_data.name, 'image': arr.get_provider_data.image, 'blockstatus': 'no', 'job_number': arr.job_number, 'service': arr.service_name[config.language],'job_id':arr.job_id } })}
                           style={{ width: '100%', alignItems: 'flex-end', marginTop: mobileW * 3 / 100 }}>
                           <Image source={require('../icons/message.png')} style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100 }} />
                        </TouchableOpacity>
                     </View>
                  </View>
               </View>}
               <View style={{ width: '90%', alignSelf: 'center', }}>
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
                        <Text style={{ width: '100%', fontFamily: Font.regular_font, fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>
                           {((arr != '') && (arr != [])) ? arr.service_name[config.language] : ''}
                        </Text>
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
                        }}>
                           {arr.job_title}
                        </Text>
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
                        }}>
                           {arr.description}
                        </Text>
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
                        }}>
                           {arr.job_location}
                        </Text>
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
                        }}>
                           {arr.join_date_time}
                        </Text>
                     </View>
                  </View>
                  {this.state.status != 5 && <View>
                     {((arr.post_image_arr != '') && (arr.post_image_arr != []) && arr.post_image_arr != 'NA') && <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 4 / 100 }}>
                        <View style={{ width: '10%', justifyContent: 'center' }}>
                           <Image source={require('../icons/upload.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                        </View>
                        <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                           <Text style={{
                              width: '100%', fontSize: mobileW * 3.8 / 100,
                              fontFamily: Font.semibold_font, color: Colors.black_color
                           }}>{Lang_chg.pending_work_photos[config.language]}</Text>
                        </View>
                     </View>}
                     {((arr.post_image_arr != '') && (arr.post_image_arr != []) && arr.post_image_arr != 'NA') && <FlatList
                        data={arr.post_image_arr}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {

                           return (
                              // <View style={{ width: '100%', flexDirection: 'row', marginLeft: mobileW * -2 / 100, justifyContent: 'space-evenly' }}>
                              <View style={{}}>
                                 <Image source={{ uri: config.img_url1 + item.image }} style={{ marginLeft: mobileW * 2 / 100, width: mobileW * 27 / 100, height: mobileW * 27 / 100, borderRadius: mobileW * 1 / 100 }} />
                                 {/* </View> */}
                                 {/* <View style={{ width: '30%' }}>
                                 <Image source={require('../icons/noithat-rakhoi-vF56dydV4FA-unsplash.jpg')} style={{ width: mobileW * 27 / 100, height: mobileW * 27 / 100, borderRadius: mobileW * 1.5 / 100 }} />
                              </View>
                              <View style={{ width: '30%' }}>
                                 <Image source={require('../icons/optical-shades-media-sangroha-d0WU6KSp918-unsplash.jpg')} style={{ width: mobileW * 27 / 100, height: mobileW * 27 / 100, borderRadius: mobileW * 1.5 / 100 }} />
                              </View> */}
                              </View>
                           );
                        }}
                     />}
                  </View>}
                  {/* {this.state.status == 3 && <View>
                     <View style={{ width: '100%', paddingVertical: mobileW * 4 / 100 }}>
                        <Text style={{
                           fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font,
                           color: Colors.themecolor
                        }}>{Lang_chg.working_hours_of_provider[config.language]}</Text>
                     </View>
                     <View style={{ width: '100%', flexDirection: 'row' }}>
                        <View style={{ width: '50%' }}>
                           <Text style={{
                              width: '100%', fontFamily: Font.semibold_font
                              , color: Colors.black_color, fontSize: mobileW * 4 / 100
                           }}>{Lang_chg.work_start_time[config.language]}</Text>
                        </View>
                        <View style={{ width: '50%' }}>
                           <Text style={{
                              width: '100%', fontFamily: Font.regular_font
                              , color: Colors.black_color, fontSize: mobileW * 3.5 / 100, textAlign: 'right'
                           }}>{Lang_chg.startJob_time[config.language]}</Text>
                        </View>
                     </View>
                  </View>} */}

                  {(this.state.status == 3 || this.state.status == 4) && <View>

                     <View style={{ width: '100%', paddingVertical: mobileW * 4 / 100 }}>
                        <Text style={{
                           fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font,
                           color: Colors.themecolor
                        }}>{Lang_chg.working_hours_of_provider[config.language]}</Text>
                     </View>
                     {arr.job_start_datetime != 'NA' && <View style={{ width: '100%', flexDirection: 'row' }}>
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
                     </View>}
                     {arr.job_end_datetime != 'NA' && <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 4 / 100 }}>
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
                     </View>}
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
                  </View>}
               </View>
               {(this.state.status == 3 || this.state.status == 4) && <View>
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
                  {this.state.status == 4 &&   <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}}>
                    <View style={{width:'90%',alignSelf:'center',flexDirection:'row',paddingVertical:mobileW*4/100}}>
                           <View style={{width:'60%'}}>
                               <Text style={{width:'100%',fontFamily:Font.bold_font
                              ,color:Colors.themecolor,fontSize:mobileW*4/100}}>{Lang_chg.completed_total_amount_text[config.language]}</Text>
                           </View>
                          <View style={{width:'40%',justifyContent:'center'}}>
                            <Text style={{width:'100%',fontFamily:Font.bold_font
                                ,color:Colors.themecolor,fontSize:mobileW*4/100,textAlign:'right'}}>{arr.total_price == 0.00 ? arr.job_price : arr.total_price}</Text>
                          </View>
                    </View>
                </View>}
                {this.state.status == 3 &&  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row', paddingVertical: mobileW * 8 / 100, justifyContent: 'space-between' }}>
                     <View style={{ width: '40%' }}>
                        <Text style={{
                           width: '100%', fontFamily: Font.bold_font, color: Colors.black_color, fontSize: mobileW * 5.5 / 100, textAlign: 'center'
                        }}>{arr.job_price}</Text>
                        <Text style={{
                           width: '100%', fontSize: mobileW * 4 / 100, fontFamily: Font.medium_font
                           , color: Colors.themecolor, textAlign: 'center'
                        }}>{Lang_chg.total_amount[config.language]}</Text>
                     </View>

                      <View style={{ width: '50%', justifyContent: 'center', alignSelf: 'flex-end', alignItems: 'flex-end' }}>
                        <TouchableOpacity onPress={() => { 
                           this.props.navigation.navigate('Payment_Overview', { 'job_id': arr.job_id, 'job_prize': arr.job_price, 'provider_id': this.state.provider_id,'provider_name':arr.get_provider_data.name }) }} 
                           style={{ width: '100%', borderRadius: mobileW * 1.5 / 100, backgroundColor: Colors.themecolor, paddingVertical: mobileW * 4 / 100 }}>
                           <Text style={{ textAlign: 'center', fontFamily: Font.bold_font, fontSize: mobileW * 3.8 / 100, color: Colors.whiteColor }}>{Lang_chg.PayNowbtn[config.language]}</Text>
                        </TouchableOpacity>
                     </View>
                  </View>}
               </View>}
               {(this.state.status == 5) && <View style={{ width: '100%', paddingVertical: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                  <View style={{ width: '90%', alignSelf: 'center' }}>
                     <Text style={{
                        width: '100%', fontFamily: Font.bold_font,
                        fontSize: mobileW * 4 / 100, color: Colors.red_Color
                     }}>{Lang_chg.reason_of_Cancel[config.language]}</Text>
                     <Text style={{ width: '100%', fontSize: mobileW * 3.5 / 100, fontFamily: Font.regular_font, color: Colors.black_color }}>{arr.cancellation_reason}</Text>
                  </View>
               </View>}
               {/* ----------------View Quotation Section Start-------------------- */}

               {arr.job_status == 0 && <View style={{ width: '90%', alignSelf: 'center' }}>
                  <View style={{ width: '100%', paddingVertical: mobileW * 4 / 100 }}>
                     <Text style={{
                        width: '100%', fontFamily: Font.semibold_font, color: Colors.themecolor
                        , fontSize: mobileW * 4 / 100
                     }}>{Lang_chg.quotation[config.language]}</Text>
                  </View>
                  <View style={{ width: '100%', justifyContent: 'space-between', flexDirection: 'row' }}>
                     <View style={{ width: '50%' }}>
                        <Text style={{
                           width: '100%', fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font
                           , color: Colors.black_color
                        }}>{Lang_chg.price_title[config.language]}</Text>
                     </View>
                     <View style={{ width: '50%', alignItems: 'flex-end' }}>
                        <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>{arr.coutation_price}</Text>
                     </View>
                  </View>

                  <View style={{ width: '100%', marginTop: mobileW * 2 / 100 }}>
                     <Text style={{
                        width: '100%', fontFamily: Font.semibold_font, color: Colors.black_color
                        , fontSize: mobileW * 4 / 100
                     }}>{Lang_chg.description_text[config.language]}</Text>
                  </View>
                  <View style={{ width: '100%', }}>
                     <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.regular_font }}>{arr.coutation_description}</Text>
                  </View>
               </View>}
               <View>
                  {arr.job_status == 0 && <View style={{ width: '100%', marginTop: mobileW * 4 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color, paddingBottom: mobileW * 3 / 100 }}>
                     {arr.coutation_status == 0 && <View style={{ width: '75%', flexDirection: 'row', alignSelf: 'flex-end', right: mobileW * 5 / 100, justifyContent: 'space-between', }}>
                        <TouchableOpacity onPress={() => { this.acceptReject(arr.job_id, '2') }} style={{
                           width: '47%', paddingVertical: mobileW * 1.5 / 100, borderRadius
                              : mobileW * 1.5 / 100, backgroundColor: Colors.red_Color, alignSelf: 'center'
                        }}>
                           <Text style={{
                              fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100,
                              textAlign: 'center', color: Colors.whiteColor
                           }}>{Lang_chg.rejectbtn[config.language]}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { this.acceptReject(arr.job_id, '1') }}
                           style={{ width: '47%', paddingVertical: mobileW * 1.5 / 100, borderRadius: mobileW * 1.5 / 100, backgroundColor: Colors.green_Color, alignSelf: 'center' }}>

                           <Text style={{
                              fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100,
                              textAlign: 'center', color: Colors.whiteColor
                           }}>{Lang_chg.acceptbtn[config.language]}</Text>
                        </TouchableOpacity>
                     </View>}
                     {arr.coutation_status == 1 && <TouchableOpacity disabled={true} style={{
                        width: '90%', paddingVertical: mobileW * 2.5 / 100, borderRadius
                           : mobileW * 1.5 / 100, backgroundColor: Colors.green_Color, alignSelf: 'center'
                     }}>
                        <Text style={{
                           fontFamily: Font.semibold_font, fontSize: mobileW * 4.2 / 100,
                           textAlign: 'center', color: Colors.whiteColor
                        }}>{Lang_chg.acceptedbtn[config.language]}</Text>
                     </TouchableOpacity>}
                     {arr.coutation_status == 2 && <TouchableOpacity disabled={true}
                        style={{ width: '90%', paddingVertical: mobileW * 2.5 / 100, borderRadius: mobileW * 1.5 / 100, backgroundColor: Colors.red_Color, alignSelf: 'center' }}>

                        <Text style={{
                           fontFamily: Font.semibold_font, fontSize: mobileW * 4.2 / 100,
                           textAlign: 'center', color: Colors.whiteColor
                        }}>{Lang_chg.rejectedbtn[config.language]}</Text>
                     </TouchableOpacity>}
                  </View>}
               </View>
               {(this.state.status == 4 && this.state.rating_status != 'yes') && <View style={{ width: '95%', alignSelf: 'center', marginTop: mobileW * 2 / 100 }}>
                  <CustomButton
                     navigate={() => { this.props.navigation.navigate('Rate_Now', { 'data': arr.get_provider_data, 'job_id': arr.job_id }) }}
                     title={Lang_chg.ratenowbtn[config.language]}
                  />
               </View>}
               {/* ----------------View Quotation Section End-------------------- */}
               {this.state.rating_status == 'yes' && <View style={{ backgroundColor: '#fff', width: mobileW * 100 / 100 }}>

                  {this.state.rating_arr == 'NA' &&
                     <Nodata_foundimage />
                  }
                  {this.state.rating_arr != "NA" && <FlatList
                     data={this.state.rating_arr}
                     showsVerticalScrollIndicator={false}
                     renderItem={({ item, title }) => {
                        return (

                           <View style={{ borderBottomWidth: 0.5, marginTop: 2, width: mobileW * 100 / 100, alignSelf: 'center', paddingTop: mobileH * 1 / 100 }}>
                              <TouchableOpacity disabled={true} style={{ width: mobileW * 90 / 100, alignSelf: 'center' }} onPress={() => { this.props.navigation.navigate('Homedetail', { 'user_id_get': item.other_user_id }), this.setState({ searchBarFocused: false }) }}>
                                 <View
                                    style={{
                                       flexDirection: 'row',
                                       alignItems: 'center',
                                       justifyContent: 'space-between',
                                       //height: (mobileH * 10) / 100,
                                    }}>
                                    <View style={{ flexDirection: 'row' }}>

                                       <Image
                                          source={item.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url1 + item.image }}
                                          style={{
                                             width: (mobileW * 11) / 100,
                                             height: (mobileW * 11) / 100,
                                             resizeMode: 'cover',
                                             borderRadius: 100,
                                             alignSelf: 'center',
                                             //marginLeft:10
                                          }}
                                       />

                                       <View style={{ flexDirection: 'column', justifyContent: 'center', width: mobileW * 45 / 100, marginLeft: mobileW * 2.5 / 100 }}>
                                          <Text
                                             style={{
                                                fontSize: (mobileW * 4.5) / 100,
                                                color: Colors.black_color,
                                                fontFamily: Font.Lato_Bold
                                             }}>
                                             {item.provider_name_new}
                                          </Text>
                                          <View style={{ width: mobileW * 28 / 100 }} >
                                             <StarRating
                                                containerStyle={{ paddingRight: 2 }}
                                                fullStar={require('../icons/star.png')}
                                                emptyStar={require('../icons/blank_star.png')}
                                                halfStar={require('../icons/half_star.png')}
                                                disabled={true}
                                                maxStars={5}
                                                rating={item.rating}
                                                starSize={mobileW * 4.5 / 100}
                                             // selectedStar={(rating) => this.onStarRatingPress(rating)}
                                             />
                                          </View>
                                          <Text
                                             style={{
                                                fontSize: (mobileW * 3.5) / 100,
                                                color: Colors.black_color,
                                                //backgroundColor:'red'
                                                //fontFamily: Font.Nexa_light,
                                                //marginTop: 2
                                                paddingVertical: mobileH * 0.5 / 100
                                             }}>
                                             {item.review}
                                          </Text>

                                       </View>
                                       <View style={{ flexDirection: 'column', width: mobileW * 32.5 / 100, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                                          <Text numberOfLines={1} style={{ fontSize: (mobileW * 3) / 100, color: Colors.black_color, fontFamily: Font.Nexa_light }}>
                                             {item.createtime}
                                          </Text>


                                       </View>
                                    </View>
                                 </View>
                              </TouchableOpacity>
                           </View>
                        )
                     }}
                     keyExtractor={(item, index) => index.toString()}
                  ></FlatList>}
               </View>}

            </KeyboardAwareScrollView>
         </Container>
      )
   }
}

