import React, { Component } from 'react'
import { Text, FlatList, View, Image, TouchableOpacity } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { Colors, Font, mobileH, mobileW, config, apifuntion, consolepro, msgProvider, msgTitle, msgText, localimag, Currentltlg, localStorage, Lang_chg } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Nodata_foundimage } from '../Provider/Nodata_foundimage';

const address_data = [
    { 'heading': 'Home', 'description': '144 Great Portland St Zena Denmark' },
    { 'heading': 'Office', 'description': '106 High St,London,SE20 7EZ AA Removal Services' },
    { 'heading': 'Other', 'description': '144 Great Portland St Zena Denmark' },
];
export default class Manage_Address extends Component {
    constructor(props) {
        super(props)
        this.state = {
            address_arr: [],
            address_type_arr: [
                { 'address_type_id': 0, 'addresss_type_name': 'Home', status: false },
                { 'address_type_id': 1, 'addresss_type_name': 'Office', status: false },
                { 'address_type_id': 2, 'addresss_type_name': 'others', status: false },
            ]
        }

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

                this.setState({ address_arr: obj.location_arr });
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

    delete_address = async location_id => {
        let user_details = await localStorage.getItemObject('user_arr');
        let url = config.baseURL + "delete_address.php?user_id="+user_details.user_id+'&location_id='+location_id;
        apifuntion.getApi(url).then((obj) => {
            console.log('obj', obj);
            if (obj.success == 'true') {
             this.get_data()
              //  this.props.navigation.navigate('Manage_Address')
                // localStorage.setItemObject('user_arr', user_details);

            } else {
                console.log('entered in else')
                msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);

                if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
                    console.log('hello')
                    config.checkUserDeactivate(this.props.navigation);
                }
                return false;
            }
        }).catch((error) => {
            console.log('entered in catch', error)
        });

    }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                <Header
                    goBack={() => { this.props.navigation.goBack() }}
                    title={Lang_chg.manage_address_header[config.language]}
                    showback={true}
                    icon={<TouchableOpacity onPress={() => { this.props.navigation.navigate('Add_Address') }}><Image source={require('../icons/add.png')} style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} /></TouchableOpacity>}
                />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ width: '90%', alignSelf: 'center' }}>

                        {this.state.address_arr != 'NA' && <FlatList
                            data={this.state.address_arr}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{ width: '100%', marginTop: mobileW * 4 / 100, paddingBottom: mobileW * 5 / 100, alignSelf: 'center', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                                        <View style={{ width: '100%', flexDirection: 'row', }}>
                                            <View style={{ width: '85%', paddingHorizontal: mobileW * 1 / 100 }}>
                                                <View style={{ width: '100%' }}>
                                                    <Text style={{
                                                        width: '50%', fontSize: mobileW * 3.8 / 100,
                                                        color: Colors.black_color, fontFamily: Font.semibold_font
                                                    }}>{item.location_type}</Text>
                                                    <Text style={{
                                                        width: '75%', marginTop: mobileW * 1.5 / 100, fontSize: mobileW * 3.8 / 100,
                                                        color: Colors.black_color, fontFamily: Font.regular_font
                                                    }}>{item.location}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '15%', marginTop: mobileW * 1 / 100, flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <TouchableOpacity onPress={()=>this.delete_address(item.location_id)} >
                                                    <Image source={require('../icons/delete.png')} resizeMode='contain' style={{ marginLeft: mobileW * 2 / 100, width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Edit_Address',{'item':item,'address_type_arr':this.state.address_type_arr,
                                                'address':item.location,'landmark':item.landmark,'location_type':item.location_type}) }}>
                                                    <Image source={require('../icons/pen.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            }}

                        />}
                        {this.state.address_arr == 'NA' && <Nodata_foundimage />}
                    </View>
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}
