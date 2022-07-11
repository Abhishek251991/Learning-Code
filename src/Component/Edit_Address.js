import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, TextInput, Platform, Keyboard, Modal, FlatList, StatusBar, StyleSheet } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { Colors, Font, mobileH, mobileW, config, apifuntion, consolepro, msgProvider, msgTitle, msgText, localimag, Currentltlg, localStorage, Lang_chg } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

global.addplace = 'NA';
export default class Edit_Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            placeaddress: global.address,
            //  address: 'NA',
            latitude: '',
            longitude: '',
            modalStatus: false,
            address_type: 'NA',
            landmark: 'NULL',
            location_id: '',
            edit_Address_detail: this.props.route.params.item,
            address_type_arr: this.props.route.params.address_type_arr,

            address: this.props.route.params.address,
            landmark: this.props.route.params.landmark,
            location_type: this.props.route.params.location_type,
        }
        addplace = 'NA';


        // consolepro.consolelog('this.props.route.params.item', this.props.route.params.item)
        // consolepro.consolelog('this.props.route.params.address_type_arr', this.props.route.params.address_type_arr)
        // consolepro.consolelog('global.address', global.address)
    }

    componentDidMount() {
        this.props.navigation.addListener('focus', payload => {
            // consolepro.consolelog('this.props.route.params.item', this.props.route.params.item)
            // consolepro.consolelog('this.props.route.params.address_type_arr', this.props.route.params.address_type_arr)
            // consolepro.consolelog('addplace.address', addplace.address)
            consolepro.consolelog('addplace', addplace)
            let data = this.state.edit_Address_detail;
            if (addplace == 'NA') {
                console.log('1')
                this.setState({ address: data.location })

            } else {
                console.log('2')

                this.setState({ address: addplace.address })

            }
            console.log('data', data)
            this.setState({
                address_type: data.location_type,
              // address: data.location,
                landmark: data.landmark,
                location_id: data.location_id
            })

            console.log('this.state.address', this.state.address)
        });
    }
    update_address = async () => {
        let user_details = await localStorage.getItemObject('user_arr');

        let data1 = this.state.address_type_arr;
        let data2 = [];
        for (var i = 0; i < data1.length; i++) {
            if (data1[i].status == true) {
                data2.push(data1[i].address_type_id);
            }
        }
        console.log('data2', data2)
        // if (data2.length <= 0) {
        //     msgProvider.toast(msgText.emptyaddress_type[config.language], 'center')
        //     return false;
        // }
        // if (addplace == 'NA') {
        //     msgProvider.toast(msgText.emptyAddress[config.language], 'center')
        //     return false;
        // }
        let address_type = data2.join('');
        console.log('this.state.address_type_arr', this.state.address_type_arr)
        let url = config.baseURL + "edit_address.php";

        var data = new FormData();
        data.append('user_id', user_details.user_id)
        data.append('location_id', this.state.location_id)
        data.append('location_type', address_type)
        data.append("location", this.state.address)
        data.append("landmark", this.state.landmark)

        console.log('data', data);

        apifuntion.postApi(url, data).then((obj) => {
            console.log('obj', obj);
            if (obj.success == 'true') {

                this.props.navigation.goBack()
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
                    title={Lang_chg.Edit_Address_header[config.language]}
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
                </Modal>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ width: '90%', alignSelf: 'center' }}  >
                        <View style={{ width: '100%', alignSelf: 'center', marginTop: mobileW * 5 / 100 }}>
                            <TouchableOpacity onPress={() => { this.setState({ modalStatus: true }) }} style={{ width: '100%', marginTop: mobileW * 8 / 100, paddingBottom: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ width: '100%', fontFamily: Font.regular_font, fontSize: mobileW * 3.8 / 100, color: Colors.black_color }}>{this.state.address_type}</Text>
                                    </View>
                                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Select_Location')} style={{ width: '100%', marginTop: mobileW * 14 / 100, paddingBottom: mobileW * 2 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                                <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                                    <View style={{ width: '90%' }}>
                                        <Text style={{ width: '100%', fontFamily: Font.regular_font, fontSize: mobileW * 3.8 / 100, color: Colors.black_color }}>{this.state.address}</Text>
                                    </View>
                                    <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100 }} />
                                    </View>

                                </View>
                            </TouchableOpacity>
                            <View style={{ width: '100%', paddingBottom: Platform.OS == 'ios' ? mobileW * 2 / 100 : 0, marginTop: mobileW * 8 / 100, paddingHorizontal: mobileW * 4 / 100, flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                                <TextInput style={{ width: '90%', alignSelf: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.textinputcolor, }}
                                    placeholder={Lang_chg.landmark[config.language]}
                                    onChangeText={(txt) => this.setState({ landmark: txt })}
                                    value={this.state.landmark}
                                    placeholderTextColor={Colors.black_color}
                                    maxLength={250}
                                    returnKeyLabel='done'
                                    returnKeyType='done'
                                    onSubmitEditing={() => { Keyboard.dismiss() }}
                                    keyboardType={'default'}
                                />
                                <View style={{ width: '10%', justifyContent: 'center', alignItems: 'center' }}>
                                    <Image source={require('../icons/dropdown.png')} style={{ width: mobileW * 3 / 100, height: mobileW * 3 / 100 }} />
                                </View>
                            </View>

                        </View>
                        <View style={{ width: '100%', marginTop: mobileW * 10 / 100 }}>
                            <CustomButton
                                navigate={() => { this.update_address() }}
                                title={Lang_chg.updatebtn[config.language]}
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
