import React, { Component } from 'react'
import {SafeAreaView, Text, View, StatusBar, TouchableOpacity, Image, TextInput, Platform, StyleSheet, Modal, FlatList } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

global.addplace = 'NA';
export default class Add_address_job_post extends Component {


    constructor(props) {
        super(props)
        this.state = {
            placeaddress: global.address,
            address: 'NA',
            latitude: '',
            longitude: '',
            modalStatus: false,
            address_type: 'NA',
            landmark:'NULL',
            check:false,
            address_type_arr: [
                { 'address_type_id': 0, 'addresss_type_name': 'Home', status: false },
                { 'address_type_id': 1, 'addresss_type_name': 'Office', status: false },
                { 'address_type_id': 2, 'addresss_type_name': 'others', status: false },
            ]
        }
        addplace = 'NA';


        consolepro.consolelog('global.address', global.address)
    }

    componentDidMount() {

        this.props.navigation.addListener('focus', () => {
            this.setState({ address: addplace.address })
            console.log('this.state.address', this.state.address)
        });

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
        console.log('data2',data2)
        if(data2.length <= 0){
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
              
                this.props.navigation.navigate('Location')
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

    selectAddress = (index) => {

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
                   <SafeAreaView style={{ flex: 1, backgroundColor: Colors.themecolor }} >

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
                                        <TouchableOpacity style={{ flexDirection: 'row', width: mobileW * 90 / 100, alignSelf: 'center' }} onPress={() => { this.selectAddress(index), this.setState({ address_type: item.addresss_type_name }) }}>
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
                    </SafeAreaView>
                </Modal>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{ width: '95%', alignSelf: 'center' }}>
            <View style={{ width: '100%', marginTop: mobileW * 6 / 100, alignSelf: 'center', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '50%', marginLeft: mobileW * 3 / 100, flexDirection: 'row', alignItems: 'center' }}>
                {this.state.check == true ? <TouchableOpacity onPress={() => { this.props.navigation.navigate('Location') }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>
                  <View style={{ width: mobileW * 1.5 / 100, height: mobileW * 1.5 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: '#FFFFFF' }}></View>
                </TouchableOpacity> : <TouchableOpacity onPress={() => { this.props.navigation.navigate('Location') }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>

                </TouchableOpacity>}
                <View style={{ width: '95%', paddingHorizontal: mobileW * 2 / 100 }}>
                  <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.8 / 100 }}>{Lang_chg.selectaddress[config.language]}</Text>
                </View>

              </View>
              <View style={{ width: '50%', alignSelf: 'center', marginLeft: mobileW * 13 / 100, flexDirection: 'row', alignItems: 'center' }}>
                {/* <View style={{width:mobileW*4/100,height:mobileW*4/100,borderRadius:mobileW*2/100,alignItems:'center',justifyContent:'center',backgroundColor:Colors.themecolor}}>
                          
                         </View> */}
                {this.state.check == false ?
                  <TouchableOpacity disabled={true} onPress={() => { this.props.navigation.navigate('Add_address_job_post') }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>
                    <View style={{ width: mobileW * 1.5 / 100, height: mobileW * 1.5 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: '#FFFFFF' }}></View>
                  </TouchableOpacity> : <TouchableOpacity disabled={true} onPress={() => { this.props.navigation.navigate('Add_address_job_post') }} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, borderRadius: mobileW * 2 / 100, alignItems: 'center', justifyContent: 'center', backgroundColor: Colors.themecolor }}>

                  </TouchableOpacity>
                }
                <View style={{ width: '95%', paddingHorizontal: mobileW * 2 / 100 }}>
                  <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.8 / 100 }}>{Lang_chg.addaddress[config.language]}</Text>
                </View>

              </View>
            </View>
          </View>
                    <View style={{ width: '90%', alignSelf: 'center' }}  >
                        <View style={{ width: '100%', alignSelf: 'center', marginTop: mobileW * 5 / 100 }}>
                            <TouchableOpacity onPress={() => { this.setState({ modalStatus: true }) }} style={{ width: '100%', marginTop: mobileW * 8 / 100, paddingHorizontal: mobileW * 4 / 100, paddingBottom: mobileW * 4 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ width: '100%', fontFamily: Font.regular_font, fontSize: mobileW * 3.8 / 100, color: Colors.black_color }}>{this.state.address_type == 'NA' ? Lang_chg.addresstype[config.language] : this.state.address_type}</Text>
                                    </View>
                                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Select_Location')} style={{ width: '100%', marginTop: mobileW * 14 / 100, paddingHorizontal: mobileW * 4 / 100, paddingBottom: mobileW * 4 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ width: '100%', fontFamily: Font.regular_font, fontSize: mobileW * 3.8 / 100, color: Colors.black_color }}>{((this.state.address == 'NA') || (this.state.address == undefined)) ? Lang_chg.address[config.language] : this.state.address}</Text>
                                    </View>
                                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100 }} />
                                    </View>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '100%', marginTop: mobileW * 8 / 100, paddingHorizontal: mobileW * 7 / 100, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingBottom: Platform.OS == 'ios' ? mobileW * 2 / 100 : 0, }}>
                                <TextInput style={{ width: '90%', alignSelf: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.textinputcolor, }}
                                    placeholder={Lang_chg.landmark[config.language]}
                                    onChangeText={(txt) => this.setState({landmark:txt})}
                                    placeholderTextColor={Colors.black_color}
                                    maxLength={250}
                                    returnKeyLabel='done'
                                    returnKeyType='done'
                                    onSubmitEditing={() => { Keyboard.dismiss() }}
                                    keyboardType={'default'}
                                />
                                {/* <View style={{width:'10%',justifyContent:'center',marginLeft:mobileW*1/100}}>
                    <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3/100,height:mobileW*3/100}} />
                    </View>   */}
                            </View>

                        </View>
                        <View style={{ width: '100%', marginTop: mobileW * 10 / 100 }}>
                            <CustomButton
                                navigate={() => { this.add_address() }}
                                title={Lang_chg.addAddressbtn[config.language]}
                            />
                        </View>
                    </View>
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
