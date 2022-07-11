import React, { Component } from 'react'
import { FlatList, Image, TextInput, Platform, Text, TouchableOpacity, View, Modal, StatusBar, StyleSheet } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { Colors, Font, mobileH, mobileW, config, apifuntion, consolepro, msgProvider, msgTitle, msgText, localimag, Currentltlg, localStorage, Lang_chg } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { Nodata_foundimage } from '../Provider/Nodata_foundimage';
global.addplace = 'NA';
export default class Location extends Component {

  constructor(props) {
    super(props)
    this.state = {
      check: true,
      landmark: '',
      location_data: [],
      placeaddress: global.address,
      address: 'NA',
      latitude: '',
      longitude: '',
      modalStatus: false,
      address_type: 'NA',
      landmark: 'NULL',
      address_type_arr: [
        { 'address_type_id': 0, 'addresss_type_name': 'Home', status: false },
        { 'address_type_id': 1, 'addresss_type_name': 'Office', status: false },
        { 'address_type_id': 2, 'addresss_type_name': 'others', status: false },
      ]
    }
    addplace = 'NA';


  }

  componentDidMount() {
    this.props.navigation.addListener('focus', payload => {
      this.get_data()
    });
  }
  get_data = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "get_address.php?user_id=" + userdetails.user_id;
    console.log(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('objjjjjj', obj);
      if (obj.success == "true") {

        this.setState({ location_data: obj.location_arr });
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


  selectAddress = (index) => {
    var data = this.state.location_data;

    for (var i = 0; i < data.length; i++) {
      data[i].status = false;
    }
    data[index].status = true;
    this.setState({ location_data: data })

  }

  continue_click = async () => {
    var post_detail1 = await localStorage.getItemObject('post_detail')
    var data = this.state.location_data;
    var data1 = [];
    var data2 = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i].title == 'Home') {
        data2 = 0;
      } else if (data[i].title == 'Office') {
        data2 = 1;
      } else {
        data2 = 2;
      }
      if (data[i].status == true){
        console.log('data[i].address',data[i].address)
        // data1.push({ 'category_id': post_detail1.category_id, 'service_id': post_detail1.service_id, 'description': post_detail1.description, 'title': post_detail1.title, 'adress_type': data2, 'job_location': data[i].location })
        data1.push({ 'adress_type': data2, 'job_location': data[i].location })
      }
      
    }
    console.log('data',data)
    console.log('data',data1)
    if (data1.length == 0) {
      msgProvider.toast(msgText.emptyAddress[config.language], 'center')
      return false
    }



    // localStorage.setItemObject('post_detail', data1)
    localStorage.setItemObject('post_detail_location', data1)

    let x = await localStorage.getItemObject('post_detail_location')
    console.log('detail1', x)
    this.props.navigation.navigate('Select_Date_Time')
  }

  add_address = async () => {
    let user_details = await localStorage.getItemObject('user_arr');

    let data1 = this.state.address_type_arr;
    let data2 = [];
    for (var i = 0; i < data1.length; i++) {
      if (data1[i].status == true) {
        data2.push(data1[i].address_type_id);
      }
    }
    console.log('data2', data2)
    if (data2.length <= 0) {
      msgProvider.toast(msgText.emptyaddress_type[config.language], 'center')
      return false;
    }
    if (addplace == 'NA') {
      msgProvider.toast(msgText.emptyAddress[config.language], 'center')
      return false;
    }
    let address_type = data2.join('');
    let url = config.baseURL + "add_address.php";

    var data = new FormData();
    data.append('user_id', user_details.user_id)
    data.append('location_type', address_type)
    data.append("location", this.state.address)
    data.append("landmark", this.state.landmark)

    console.log('data', data);

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj);
      if (obj.success == 'true') {

        this.props.navigation.navigate('Manage_Address')
        // localStorage.setItemObject('user_arr', user_details);

      } else {
        console.log('entered in else')
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(this.props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      console.log('entered in catch', error)
    });

  }

  selectAddress1 = (index) => {

    var data1 = this.state.address_type_arr;

    console.log('index', index)
    for (var i = 0; i < data1.length; i++) {
      data1[i].status = false;
    }

    data1[index].status = true;
    console.log('data1', data1)
    this.setState({ address_type_arr: data1 })
  }

  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          goBack={() => { this.props.navigation.goBack() }}
          title={Lang_chg.locationhead[config.language]}
          showback={true}
        />
        <Modal
          animationType="fade"
          transparent
          visible={this.state.modalStatus}
          onRequestClose={() => { this.setState({ modalStatus: false }) }}>
          <StatusBar barStyle='dark-content' hidden={false} backgroundColor={Colors.Headercolor} translucent={false} networkActivityIndicatorVisible={true} />
          <TouchableOpacity style={customStyles.container} activeOpacity={1} onPress={() => { this.setState({ modalStatus: false }) }}>
            <Header goBack={() => { this.setState({ modalStatus: false }) }}
              title={Lang_chg.addresstype[config.language]}
              showback={true} />
            <View style={customStyles.subContainer} >
              <FlatList
                data={this.state.address_type_arr}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity style={{ flexDirection: 'row', width: mobileW * 90 / 100, alignSelf: 'center' }} onPress={() => { this.selectAddress1(index), this.setState({ address_type: item.addresss_type_name }) }}>
                      <View style={{ width: '10%', justifyContent: 'center' }} >
                        {item.status == true && <Image style={customStyles.backpress} source={require('../icons/active.png')} />}
                        {item.status == false && <Image style={customStyles.backpress} source={require('../icons/inactive.png')} />}
                      </View>
                      <View style={{ width: '90%', justifyContent: 'center' }} >
                        <Text style={customStyles.subContainerItemTitle}>{item.addresss_type_name}</Text>
                      </View>
                    </TouchableOpacity>)
                }}
                keyExtractor={(item, index) => index.toString()}>
              </FlatList>
            </View>
          </TouchableOpacity>
        </Modal>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '95%', alignSelf: 'center' }}>
            <View style={{ width: '100%', marginTop: mobileW * 6 / 100, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '50%', marginLeft: mobileW * 3 / 100, flexDirection: 'row', alignItems: 'center' }}>
                {this.state.check == true ? <TouchableOpacity disabled={true} onPress={() => { this.setState({ check: true }) }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>
                  <View style={{ width: mobileW * 1.5 / 100, height: mobileW * 1.5 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: '#FFFFFF' }}></View>
                </TouchableOpacity> : <TouchableOpacity disabled={true} onPress={() => { this.setState({ check: true }) }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>

                </TouchableOpacity>}
                <View style={{ width: '95%', paddingHorizontal: mobileW * 2 / 100 }}>
                  <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.8 / 100 }}>{Lang_chg.selectaddress[config.language]}</Text>
                </View>

              </View>
              <View style={{ width: '50%', alignSelf: 'center', marginLeft: mobileW * 13 / 100, flexDirection: 'row', alignItems: 'center' }}>
                {/* <View style={{width:mobileW*4/100,height:mobileW*4/100,borderRadius:mobileW*2/100,alignItems:'center',justifyContent:'center',backgroundColor:Colors.themecolor}}>
                          
                         </View> */}
                {this.state.check == false ?
                  <TouchableOpacity onPress={() => { this.props.navigation.navigate('Add_address_job_post') }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>
                    <View style={{ width: mobileW * 1.5 / 100, height: mobileW * 1.5 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: '#FFFFFF' }}></View>
                  </TouchableOpacity> : <TouchableOpacity onPress={() => { this.props.navigation.navigate('Add_address_job_post') }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>

                  </TouchableOpacity>
                }
                <View style={{ width: '95%', paddingHorizontal: mobileW * 2 / 100 }}>
                  <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.8 / 100 }}>{Lang_chg.addaddress[config.language]}</Text>
                </View>

              </View>
            </View>
          </View>

          {this.state.check == true && <View style={{ width: '100%' }}>
         {this.state.location_data != 'NA' &&    <FlatList
              data={this.state.location_data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity activeOpacity={0.8} onPress={() => this.selectAddress(index)} style={{ width: '100%', paddingVertical: mobileW * 3.2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                    <View style={{ width: '88%', alignSelf: 'center', marginTop: mobileW * 4 / 100 }}>
                      <View style={{ width: '20%' }}>
                        <Text style={{ fontSize: mobileW * 3.8 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{item.location_type}</Text>
                      </View>
                      <View style={{ width: '100%', paddingVertical: mobileW * 1 / 100, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ width: '90%' }}>
                          <Text style={{ width: '70%', fontSize: mobileW * 3.5 / 100, fontFamily: Font.regular_font, color: Colors.black_color }}>{item.location}</Text>
                        </View>
                        {item.status == true && <View style={{ width: '10%', alignItems: 'flex-end' }}>
                          <Image source={require('../icons/checkbox_64.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                        </View>}
                      </View>

                    </View>

                  </TouchableOpacity>
                )
              }}
            />}
            {this.state.location_data == 'NA' && <Nodata_foundimage/>}
          </View>}

          {this.state.check == false && <View style={{ width: '100%', alignSelf: 'center', marginTop: mobileW * 5 / 100 }}>
            <TouchableOpacity style={{ width: '100%', marginTop: mobileW * 8 / 100, paddingBottom: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
              <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => this.setState({ modalStatus: true })} style={{ width: '90%' }}>
                  <Text style={{ width: '100%', fontFamily: Font.regular_font, fontSize: mobileW * 3.5 / 100, color: Colors.msg_color }}>{Lang_chg.addresstype[config.language]}</Text>
                </TouchableOpacity>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100 }} />
                </View>

              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Select_Location') }} style={{ width: '100%', marginTop: mobileW * 14 / 100, paddingBottom: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
              <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                <View style={{ width: '90%' }}>
                  <Text style={{ width: '100%', fontFamily: Font.regular_font, fontSize: mobileW * 3.8 / 100, color: Colors.black_color }}>{((this.state.address == 'NA') || (this.state.address == undefined)) ? Lang_chg.address[config.language] : this.state.address}</Text>
                </View>
                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                  <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100 }} />
                </View>

              </View>
            </TouchableOpacity>
            <View style={{ width: '100%', marginTop: mobileW * 14 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingBottom: Platform.OS == 'ios' ? mobileW * 2 / 100 : 0, }}>
              <TextInput style={{
                width: '90%', alignSelf: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.textinputcolor,
              }}
                placeholder={Lang_chg.landmark[config.language]}
                // onChangeText={(txt) =>landmark(txt)}

                placeholderTextColor={Colors.msg_color}
                maxLength={250}
                returnKeyLabel='done'
                returnKeyType='done'
                onSubmitEditing={() => { Keyboard.dismiss() }}
                keyboardType={'default'}
              />
            </View>


          </View>}

          {this.state.location_data != 'NA' &&     <View style={{ width: '90%', marginTop: mobileW * 8 / 100, alignSelf: 'center' }}>
            <CustomButton
              navigate={() => { this.continue_click() }}
              title={Lang_chg.continuebtn[config.language]}
            />
          </View>}
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}

const customStyles = StyleSheet.create({
  container:
  {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerpage: {
    flexDirection: 'row',
    width: mobileW,
    height: mobileH / 10,
    backgroundColor: Colors.whiteColor,
    // marginTop:10,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 20
  },
  backbtn: {
    //  backgroundColor:'red'
  },
  backpress: {
    resizeMode: 'contain',
    width: 25,
    height: 25
  },
  subContainer:
  {
    flex: 1,
    width: mobileW * 100 / 100,
    // borderRadius: mobileW * 5 / 100,
    backgroundColor: '#ffffff',
    paddingVertical: mobileH * 3 / 100,
    // height: mobileH * 50 / 100,

  },
  subContainerItemTitle:
  {
    //  alignSelf: 'center',
    paddingVertical: mobileH * 2 / 100,
    //  marginVertical: mobileH * 2 / 100,
    //textAlign: 'center',
    //  width: mobileW * 90 / 100,
    // fontFamily: Font.regular,
    fontSize: mobileW * 5 / 100,
    color: 'black',
  },
})
