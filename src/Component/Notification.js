import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Alert, TouchableOpacity } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { Cameragallery, mediaprovider, mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

import { Nodata_foundimage } from '../Provider/Nodata_foundimage'
const notification_data = [
  { 'image': require('../icons/handyman_logo_notification.png'), 'title': 'Your job #8579101746 request has been accepted', 'datetime': '08/12/2021, 10:00AM' },
  { 'image': require('../icons/handyman_logo_notification.png'), 'title': 'Your job #7889111748 request is at Progress', 'datetime': '07/11/2021, 09:00AM' },
  { 'image': require('../icons/handyman_logo_notification.png'), 'title': 'Your job #9569001749 request', 'datetime': '06/11/2021, 02:00PM' },
  { 'image': require('../icons/handyman_logo_notification.png'), 'title': 'Your Payment is successfully paid', 'datetime': '05/11/2021, 11:00AM' },
  { 'image': require('../icons/handyman_logo_notification.png'), 'title': 'Your job #5556601747 request send successfully', 'datetime': '04/11/2021, 08:00AM' },
  { 'image': require('../icons/handyman_logo_notification.png'), 'title': 'Your job #4579101751 request has been Cancelled', 'datetime': '03/11/2021, 10:00AM' }
];
export default function Notification(props) {
  const navigation = useNavigation();
  const [notification_arr, setnotification_arr] = useState([]);



  useEffect(() => {
    props.navigation.addListener('focus', payload => {

      get_data()

    });
  }, [])
  const get_data = async () => {
    let user_details = await localStorage.getItemObject('user_arr')
    // this.setState({user_id:user_details.user_id})
    let url = config.baseURL + "userNotification.php?user_id=" + user_details.user_id;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {

      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        consolepro.consolelog('objjjjjj', obj.history_arr);
        setnotification_arr(obj.history_arr)


      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);

    });
  }

  const clear_notification = async () => {
    //alert('hello')
    let user_details = await localStorage.getItemObject('user_arr')
    let url = config.baseURL + "clear_notification.php?user_id=" + user_details.user_id + "&delete_flag=" + 1;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        get_data()
      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);

    });
  }

  const clear_press = (notification_message_id) => {
    Alert.alert(
      Lang_chg.notification_clear_head[config.language],
      Lang_chg.notification_clear_sub_head[config.language], [{
        text: Lang_chg.no[config.language],
        onPress: () => console.log('Cancel Pressed'),
      }, {
        text: Lang_chg.yes[config.language],
        onPress: () => { clear_notification(notification_message_id) }
      }], {
      cancelable: false
    }
    ); // works best when the goBack is async
    return true;
  };

  const delete_press = (notification_message_id) => {
    Alert.alert(
      Lang_chg.notification_delete_head[config.language],
      Lang_chg.notification_delete_sub_head[config.language], [{
        text: Lang_chg.no[config.language],
        onPress: () => console.log('Cancel Pressed'),
      }, {
        text: Lang_chg.yes[config.language],
        onPress: () => {
          delete_notification(notification_message_id)
        }
      }], {
      cancelable: false
    }
    ); // works best when the goBack is async
    return true;
  };

  const delete_notification = async (notification_message_id) => {

    let user_details = await localStorage.getItemObject('user_arr')
    let url = config.baseURL + "delete_notification.php?user_id=" + user_details.user_id + "&notification_message_id=" + notification_message_id + "&delete_flag=" + 1;
    consolepro.consolelog(url);
    apifuntion.getApi(url).then((obj) => {
      //alert('hello',notification_message_id)
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        consolepro.consolelog('objjjjjj', obj.success);
        get_data();

      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);

    });
  }
  return (
    <Container backgroundColor={Colors.whiteColor}>
      <Header
        showback={true}
        goBack={() => { navigation.goBack() }}
        title={Lang_chg.notificationhead[config.language]}
        icon={<Text onPress={() => { notification_arr == 'NA' ? ' ' : clear_press() }} style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.bold_font, color: Colors.black_color }}> {notification_arr == 'NA' ? ' ' : Lang_chg.clear[config.language]}</Text>}
      />
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        <View style={{ width: '100%' }}>
          {notification_arr != 'NA' && <FlatList
            data={notification_arr}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  disabled={(item.action == 'Payment' || item.action == 'login' || item.action == 'Signup') ? true : false}
                  onPress={() => navigation.navigate('Job_Assign_Details', { 'job_id': item.action_id })}
                  style={{ width: mobileW * 95 / 100, alignSelf: 'center', flexDirection: 'row', marginTop: mobileW * 7 / 100, paddingBottom: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.gray_color }}>
                  <View style={{ width: mobileW * 15 / 100 }}>
                    <Image source={item.notification_detail.image == 'NA' ? require('../icons/profile_with_bg.png') : { uri: config.img_url3 + item.notification_detail.image }} resizeMode='contain' style={{ width: mobileW * 13 / 100, height: mobileW * 13 / 100, borderRadius: 100, resizeMode: 'cover' }} />
                  </View>
                  <View style={{ width: mobileW * 65 / 100 }}>
                    <View style={{ width: '100%' }}>
                      <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100, color: Colors.black_color, textAlign: 'left' }}>{item.message}</Text>
                    </View>

                    <View style={{ width: '100%' }}>
                      <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 2.8 / 100, color: Colors.msg_color, textAlign: 'left' }}>{item.createtime}</Text>
                    </View>
                  </View>
                  <TouchableOpacity onPress={() => delete_press(item.notification_message_id)} style={{ width: mobileW * 15 / 100, paddingTop: mobileW * 1 / 100, alignItems: 'center' }}>
                    <Image source={require('../icons/cancel_notification.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100, resizeMode: 'contain', alignSelf: 'flex-end' }} />
                  </TouchableOpacity>
                </TouchableOpacity>
              )
            }}
          />}
          {notification_arr == 'NA' && <Nodata_foundimage />}
        </View>
      </KeyboardAwareScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({})
