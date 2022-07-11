import React, { useState, useEffect } from 'react'
import { Image, RefreshControl, BackHandler, ImageBackground, StyleSheet, FlatList, Text, View, TouchableOpacity } from 'react-native'
import { Cameragallery, mediaprovider, mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Nodata_foundimage } from '../Provider/Nodata_foundimage';

cleaning_data = [
  { 'image': require('../icons/backbone-visuals-L4iRkKL5dng-unsplash.jpg'), 'title': 'Bathroom Cleaning', 'hour': 'Kr 23/Hr', 'description': 'Intense deep Cleaning for 10X stain removal.Targets hard strains & difficult to reach places...' },
  { 'image': require('../icons/sidekix-media-1vMz2_MclrM-unsplash.jpg'), 'title': 'Full Home Cleaning', 'hour': 'Kr 100/Hr', 'description': 'Be clean and efficient at home. OJS arrives and in a carefully integrated routine, totally cleans your home in a fraction of the normal time...' },
  { 'image': require('../icons/kam-idris-wF9NH87U-2E-unsplash.jpg'), 'title': 'Sofa & Carpet Cleaning', 'hour': 'Kr 15/Hr', 'description': 'Sofa Shampoo Services The shampooing and cleaning process includes the injection/spray and extraction method which covers stain, smell and...' },
  { 'image': require('../icons/naomi-hebert-MP0bgaS_d1c-unsplash.jpg'), 'title': 'Kitchen Cleaning', 'hour': 'Kr 35/Hr', 'description': 'Between hurried breakfasts, weeknight meals, and food-centric get-togethers, kitchens take a messy beating. Crumbs, spills,activities, making it difficult to keep up with cleaning....' },

];

 const Cleaning = (props) => {

  const navigation = useNavigation();
  const [category_detail_arr, setcategory_detail_arr] = useState([])
  const [category_name, setcategory_name] = useState('')
  const [category_description, setcategory_description] = useState('')
  const [category_image, setcategory_image] = useState('')
  const [refresh, setrefresh] = useState(false);
  const [user_id, setuser_id] = useState('');



  const category_id = props.route.params.category_id;
  console.log('category_id', category_id)
  useEffect(() => {
    props.navigation.addListener('focus', () => {
      // console.log('user_id', user_id)
      // console.log('props.route.params.category_id', props.route.params.category_id)
      // if (user_id == props.route.params.category_id) {
      //   setData()
      // } else {
      //   get_data()
      // }
     // checkCategoryId()
     get_data()


    });

  }, [])

  const checkCategoryId = async () => {
    var category_detail_arr = await localStorage.getItemObject('category_detail_arr')
    console.log('category_detail_arr', category_detail_arr)
    console.log('category_detail_arr[0].category_id', category_detail_arr[0].category_id)
    console.log('props.route.params.category_id', props.route.params.category_id)
    if (category_detail_arr == null) {
      console.log('hello')
      get_data()
    } else {
      if (category_detail_arr[0].category_id == props.route.params.category_id) {
        console.log('hello1')
        setData()
      } else if (category_detail_arr[0].category_id == undefined) {
        setData()
      } else {
        console.log('hello2')
        get_data()
      }
    }
  }

  const setData = async () => {
    var category_detail_arr = await localStorage.getItemObject('category_detail_arr')
    var description = await localStorage.getItemObject('description')
    var background_image = await localStorage.getItemObject('background_image')
    var category_name = await localStorage.getItemObject('category_name')
    consolepro.consolelog('category_detail_arr', category_detail_arr)
    if (category_detail_arr == null) {
      get_data()

    } else {
      setcategory_description(description)
      setcategory_image(background_image)
      setcategory_name(category_name)
      setcategory_detail_arr(category_detail_arr)
    }
  }

  const get_data = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    consolepro.consolelog('userr', userdetails)
    if (userdetails == null) {
      setuser_id(0)
    }
    else {
      setuser_id(userdetails.user_id)
    }
    let url = config.baseURL + "homedetail.php?user_id=" + user_id + '&category_id=' + category_id;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        let category_detail_arr = obj.category_detail_arr
        setcategory_detail_arr(category_detail_arr)
        setcategory_description(obj.description)
        setcategory_image(obj.background_image)
        setcategory_name(obj.category_name)
        localStorage.setItemObject('description', obj.description)
        localStorage.setItemObject('background_image', obj.background_image)
        localStorage.setItemObject('category_name', obj.category_name)
        localStorage.setItemObject('category_detail_arr', category_detail_arr)


        setrefresh(false)
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
  return (
    <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: mobileW * 20 / 100, backgroundColor: '#fff', flex: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refresh}
          onRefresh={() => { _onRefresh() }}

        />
      }
    >
      <View style={{ backgroundColor: 'black', width: '100%' }}>
        <ImageBackground
          source={{ uri: config.img_url3 + category_image }}
          resizeMode='stretch'
          style={{ width: mobileW * 100 / 100, height: mobileH * 30 / 100, opacity: 0.4 }}
        >
        </ImageBackground>
        <View style={{ width: '100%', position: 'absolute', top: mobileW * 2 / 100 }}>
          <View style={{ width: '100%', marginTop: mobileW * 7 / 100, flexDirection: 'row' }}>
            <TouchableOpacity onPress={() => { props.navigation.goBack() }} style={{ width: '15%', alignItems: 'center' }}>
              <Image source={require('../icons/white_back.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
            </TouchableOpacity>
            <View style={{ width: '70%', alignSelf: 'center' }}>
              <Text numberOfLines={2} style={{ fontFamily: Font.bold_font, textAlign: 'center', color: Colors.whiteColor, fontSize: Font.headerfont }}>{category_name[config.language]}</Text>
            </View>
            <View style={{ width: '15%' }}>
            </View>
          </View>
          <View style={{ width: '90%', alignSelf: 'center', marginTop: mobileW * 10 / 100 }}>
            <Text numberOfLines={4} style={{ fontFamily: Font.bold_font, textAlign: 'center', color: Colors.whiteColor, fontSize: mobileW * 4 / 100, lineHeight: 22 }}>{category_description[config.language]}</Text>
          </View>
        </View>
      </View>
      <View style={{ width: '100%', position: 'relative', bottom: mobileW * 4 / 100, borderTopLeftRadius: mobileW * 5 / 100, borderTopRightRadius: mobileW * 5 / 100, backgroundColor: '#FFFFFF' }}>
        <View style={{ width: '100%', marginTop: mobileW * 5 / 100 }}>
          {category_detail_arr == 'NA' && <Nodata_foundimage />}
          {category_detail_arr != 'NA' && <FlatList
            data={category_detail_arr}
            contentContainerStyle={{ paddingBottom: mobileW * 40 / 100 }}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity activeOpacity={0.9} onPress={() => { navigation.navigate('Title_Description', { 'category_id': item.category_id, 'service_id': item.service_id }) }} style={{ width: '90%', alignSelf: 'center', paddingHorizontal: mobileW * 3 / 100, paddingVertical: mobileW * 3 / 100, marginTop: mobileW * 2 / 100, flexDirection: 'row', borderWidth: 1, borderRadius: mobileW * 1.5 / 100, borderColor: Colors.themecolor }}>
                  <View style={{ width: '20%', alignItems: 'center', alignSelf: 'center' }}>
                    <Image source={{ uri: config.img_url2 + item.service_image }} resizeMode='contain' style={{ width: mobileW * 18 / 100, height: mobileW * 18 / 100, borderRadius: Platform.OS == 'ios' ? mobileW * 4 / 100 : mobileW * 8 / 100 }} />
                  </View>
                  <View style={{ width: '70%', paddingHorizontal: mobileW * 2 / 100 }}>
                    <Text style={{ width: '100%', fontSize: mobileW * 4 / 100, fontFamily: Font.bold_font, color: Colors.black_color }}>{item.service_name[config.language]}</Text>
                    <View style={{ width: '100%', paddingHorizontal: mobileW * 0.5 / 100 }}>
                      <Text style={{ width: '100%', fontFamily: Font.semibold_font, color: Colors.themecolor, fontSize: mobileW * 3 / 100 }}>{item.price}</Text>

                      <View>
                        <Text style={{
                          width: '100%', fontFamily: Font.medium_font, color: Colors.black_color
                          , fontSize: mobileW * 3 / 100
                        }} >{item.description[config.language]} 
                        {/* <Text style={{fontSize: mobileW * 3 / 100, color: Colors.themecolor,fontFamily: Font.light_font}}>More</Text> */}
                        
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )
            }}

          />}
        </View>
      </View>
    </KeyboardAwareScrollView>


  )
}

const styles = StyleSheet.create({})

 export default Cleaning;
