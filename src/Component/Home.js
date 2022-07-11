import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, Text, RefreshControl, Keyboard, Platform, View, TouchableOpacity, Alert, Image, FlatList, BackHandler, TextInput } from 'react-native'
import Container from '../Common/Container'
import { Cameragallery, mediaprovider, mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Footer from '../Provider/Footer';
import { useFocusEffect } from '@react-navigation/native';
import { Nodata_foundimage } from '../Provider/Nodata_foundimage';
import Carousel, { Pagination } from 'react-native-snap-carousel';


const service_data = [
  { 'image': require('../icons/cleaning.png'), 'title': 'Cleaning', },
  { 'image': require('../icons/plumbering.png'), 'title': 'Plumbering' },
  { 'image': require('../icons/laundry.png'), 'title': 'Laundry' },
  { 'image': require('../icons/electrician.png'), 'title': 'Electrician' },
  { 'image': require('../icons/painter.png'), 'title': 'Painting' },
  { 'image': require('../icons/cleaning.png'), 'title': 'Cleaning' },
  { 'image': require('../icons/plumbering.png'), 'title': 'Plumbering' },
  { 'image': require('../icons/laundry.png'), 'title': 'Laundry' },
  { 'image': require('../icons/electrician.png'), 'title': 'Electrician' },
];




export default function Home(props) {
  const navigation = useNavigation();
  const [mobile, setMobile] = useState('');
  const [user_home_arr, setuser_home_arr] = useState([]);
  const [banner_arr, setbanner_arr] = useState([]);
  const [activeSlide, setactiveSlide] = useState(0);
  const [refresh, setrefresh] = useState(false);
  const [user_id, setuser_id] = useState('');


  const [notification_count, setnotification_count] = useState('');


  useEffect(() => {

    props.navigation.addListener('focus', payload => {
      // get_data()
      setData()
      BackHandler.addEventListener('hardwareBackPress', backAction)
    });
  }, [])

  useFocusEffect(() => {
    props.navigation.addListener('blur', payload => {

      BackHandler.removeEventListener('hardwareBackPress', backAction)
    });
  });

  const setData = async () => {
    var home_arr = await localStorage.getItemObject('home_arr')
    var banner_arr = await localStorage.getItemObject('banner_arr')
    consolepro.consolelog('home_arr', home_arr)
    if (home_arr == null) {
      get_data()

    } else {
      setuser_home_arr(home_arr)
      setbanner_arr(banner_arr)
    }
  }

  const get_data = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');

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
    let url = config.baseURL + "home.php?user_id=" + userId;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        let home_arr = obj.user_home_arr
        let banner_arr = obj.banner_arr
        localStorage.setItemObject('home_arr', home_arr)
        localStorage.setItemObject('banner_arr', banner_arr)
        setuser_home_arr(home_arr)
        setbanner_arr(banner_arr)
        setrefresh(false)
        setnotification_count(obj.notification_count)

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

  const _onRefresh = () => {
    setrefresh(true)
    get_data()
  }
  const backAction = () => {
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

  const navigateToDetail = async (item) => {
    localStorage.setItemObject('job_type', '0')
    navigation.navigate('Cleaning', { 'category_id': item.category_id })
  }
  return (
    <Container backgroundColor={Colors.whiteColor}>
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: mobileW * 20 / 100 }}
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => { _onRefresh() }}

          />
        }
      >
        <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
          <View style={{ width: '100%', paddingVertical: mobileW * 2 / 100, flexDirection: 'row' }}>
            <View style={{ width: '20%' }}>
            </View>
            <View style={{ width: '60%', alignItems: 'center', }}>

              <Image source={require('../icons/logo.png')} resizeMode='contain' style={{ width: mobileW * 20 / 100, height: mobileW * 20 / 100 }} />
            </View>
            <TouchableOpacity onPress={() => { config.guestUserCheck(props.navigation, 'Notification') }} style={{ width: '20%', alignItems: 'center', justifyContent: 'center' }}>
              {notification_count <= 0 && <Image source={require('../icons/notification_without_background.png')} style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, resizeMode: 'contain' }} />}
              {notification_count > 0 && <Image source={require('../icons/notification.png')} style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100 }} />}
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', width: '95%', alignSelf: 'center', borderWidth: 1, borderColor: Colors.gray_color, borderRadius: mobileW * 1.5 / 100, backgroundColor: '#FFFFFF', elevation: 2, shadowColor: Colors.gray_color, shadowOffset: { width: 1, height: 1 }, shadowOpacity: 1 }}>
          <Image source={require('../icons/search.png')} style={{ marginLeft: mobileW * 3 / 100, width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
            <TextInput style={{ width: '80%', marginLeft: mobileW * 5 / 100, color: Colors.black_color, fontFamily: Font.regular_font, paddingVertical: Platform.OS == 'ios' ? mobileW * 4 / 100 : mobileW * 2 / 100, fontSize: mobileW * 4 / 100 }}
              placeholder={Lang_chg.Search_here[config.language]}
              onChangeText={(mobile) => setMobile(mobile)}
              value={mobile}
              placeholderTextColor={Colors.msg_color}
              returnKeyLabel='done'
              returnKeyType='done'
              onSubmitEditing={() => { Keyboard.dismiss() }}
              keyboardType={'default'}
              maxLength={50}
            />
          </View>
          <View style={{ width: '100%', backgroundColor: '#FFFFFF', borderBottomWidth: 6, borderBottomColor: Colors.lighbordercolor }}>
            <View style={{ width: '95%', alignSelf: 'center', paddingVertical: mobileW * 3 / 100 }}>
              <View style={{ width: '100%', alignSelf: 'center' }}>
                {/* <Image source={require('../icons/home_card.png')} resizeMode='contain' style={{ width: mobileW * 96 / 100, height: mobileH * 30 / 100, alignSelf: 'center' }} /> */}
                <View style={{backgroundColor:'#fff', width: mobileW * 100 / 100, alignSelf: 'center' }} >
                  <Carousel
                    layout='default'
                    autoplay={true}
                    autoplayDelay={500}
                    enableSnap={true}
                    loop
                    data={banner_arr}
                    sliderWidth={mobileW}
                    itemWidth={mobileW}
                    firstItem={0}
                    onSnapToItem={(index) => setactiveSlide(index)}
                    renderItem={({ item, index }) => (
                      <TouchableOpacity activeOpacity={1} style={{justifyContent:'center', width: mobileW * 96 / 100, height: mobileH * 30.2 / 100, alignSelf: 'center', borderRadius: mobileW * 2 / 100,  elevation: 2, shadowColor: '#000', shadowOffset: { width: 1, height: 1 }, shadowOpacity: 1 }}>
                      <Image
                        key={index}
                        style={{ width: mobileW * 96 / 100, height: mobileH * 30 / 100, alignSelf: 'center', borderRadius: mobileW * 1 / 100 }}
                        resizeMode='cover'
                        source={{ uri: config.img_url3 + item.image }}
                      />
                      </TouchableOpacity>
                    )}
                  />
                  {/* <View style={{width:mobileW*35/100}} > */}
                  {/* <Pagination
                                dotsLength={this.state.image_arr.length}
                                activeDotIndex={this.state.activeSlide}
                                //activeIndex={this.state.imageIndex}
                                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.75)', width: mobileW * 35 / 100, alignSelf: 'center' }}
                                dotStyle={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 50,
                                    //marginHorizontal:2,
                                    backgroundColor: '#E90A0A'

                                }}
                                dotColor={{ color: '#E90A0A' }}
                                inactiveDotStyle={{
                                    width: 10,
                                    height: 10,
                                    backgroundColor: '#6A0505'
                                    //width:mobileW*35/100
                                    // Define styles for inactive dots here
                                }}
                                inactiveDotOpacity={0.4}
                                inactiveDotScale={0.8}
                            /> */}
                  {/* </View> */}

                </View>

                {/* <View style={{ width: '100%', position: 'absolute', top: mobileW * 13 / 100 }}>
                  <Text style={{ width: '50%', fontSize: mobileW * 4.5 / 100, fontFamily: Font.semibold_font, color: Colors.black_color, paddingHorizontal: mobileW * 5 / 100, marginTop: Platform.OS == 'ios' ? mobileW * 2.4 / 100 : mobileW * 3 / 100 }}>{Lang_chg.serviceneed[config.language]}</Text>
                  <TouchableOpacity disabled={true} onPress={() => { }} style={{
                    width: '25%', flexDirection: 'row', marginTop: mobileW * 3 / 100, marginLeft: mobileW * 5 / 100, paddingVertical: mobileW * 1.5 / 100, backgroundColor: Colors.themecolor,
                    borderRadius: mobileW * 2.5 / 100, alignItems: 'center'
                  }}>
                    <Text style={{ width: '60%', textAlign: 'center', fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100, color: Colors.whiteColor }}>{Lang_chg.startbtn[config.language]}</Text>

                    <View style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, backgroundColor: '#FFFFFF', alignItems: 'center' }}>
                      <AntDesign name={'arrowright'} size={15} style={{ color: '#33B9A5' }} />
                    </View>
                  </TouchableOpacity>
                  <View style={{ width: '20%', marginLeft: mobileW * 5 / 100, alignItems: 'center', marginTop: mobileW * 4 / 100, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={{
                      width: '28%', borderRadius: mobileW * 1 / 100, paddingVertical: mobileW * 0.7 / 100
                      , backgroundColor: Colors.themecolor
                    }}></View>
                    <View style={{
                      width: '28%', borderRadius: mobileW * 1 / 100, paddingVertical: mobileW * 0.7 / 100
                      , backgroundColor: '#CAE0EB'
                    }}></View>
                    <View style={{
                      width: '28%', borderRadius: mobileW * 1 / 100, paddingVertical: mobileW * 0.7 / 100
                      , backgroundColor: '#CAE0EB'
                    }}></View>



                  </View>
                </View> */}

              </View>
            </View>
          </View>
          {user_home_arr == 'NA' && <Nodata_foundimage />}
          {user_home_arr != 'NA' && <View style={{ width: '100%', alignSelf: 'center' }}>
            <FlatList
              data={user_home_arr}
              contentContainerStyle={{ paddingBottom: mobileW * 10 / 100 }}
              numColumns={3}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => { navigateToDetail(item) }} style={{ width: '34%', paddingVertical: mobileW * 4 / 100, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderBottomColor: Colors.gray_color, borderRightColor: Colors.gray_color }}>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: mobileW * 3 / 100 }}>
                      <Image source={{ uri: config.img_url1 + item.category_image }} style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100 }} />
                    </View>
                    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: mobileW * 2 / 100 }}>
                      <Text numberOfLines={2} style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.black_color, textAlign:'center', paddingHorizontal:mobileW*1/100 }}>{item.category_name[config.language]}</Text>
                    </View>
                  </TouchableOpacity>
                )
              }}

            />
          </View>}
        </TouchableOpacity>
      </KeyboardAwareScrollView>

      <HideWithKeyboard>
        <Footer navigation={props.navigation} page={'Home'} user_id={1} />
      </HideWithKeyboard>
    </Container>

  )
}

const styles = StyleSheet.create({})
