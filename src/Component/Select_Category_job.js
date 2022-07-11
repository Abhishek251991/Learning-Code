import React, { Component } from 'react'
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { Cameragallery, mediaprovider, mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Nodata_foundimage } from '../Provider/Nodata_foundimage';

const service_data = [
    { service_id: 1, category_id: 1, 'image': require('../icons/cleaning.png'), 'title': 'Cleaning', 'image1': require('../icons/checkbox_64.png') },
    { service_id: 1, category_id: 1, 'image': require('../icons/plumbering.png'), 'title': 'Plumbering' },
    { service_id: 1, category_id: 1, 'image': require('../icons/laundry.png'), 'title': 'Laundry' },
    { service_id: 1, category_id: 1, 'image': require('../icons/electrician.png'), 'title': 'Electrician' },
    { service_id: 1, category_id: 1, 'image': require('../icons/painter.png'), 'title': 'Painting' },
    { service_id: 1, category_id: 1, 'image': require('../icons/cleaning.png'), 'title': 'Cleaning' },
    { service_id: 1, category_id: 1, 'image': require('../icons/plumbering.png'), 'title': 'Plumbering' },
    { service_id: 1, category_id: 1, 'image': require('../icons/laundry.png'), 'title': 'Laundry' },
    { service_id: 1, category_id: 1, 'image': require('../icons/electrician.png'), 'title': 'Electrician' },
];
export default class Select_Category_job extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category_id: '',
            category_arr: [],
            photodata1: []
        }
    }

    componentDidMount() {

        // this.props.navigation.addListener('focus', payload => {
        this.get_data()

        // });

    }
    get_data = async () => {
        let userdetails = await localStorage.getItemObject('user_arr');
        let url = config.baseURL + "get_category.php?user_id=" + userdetails.user_id;
        consolepro.consolelog(url)
        apifuntion.getApi(url).then((obj) => {
            consolepro.consolelog('obj', obj);
            if (obj.success == "true") {
                this.setState({ category_arr: obj.category_arr })
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

    selectCategorty = (index) => {
        let data = this.state.category_arr;
        for (var i = 0; i < data.length; i++) {
            data[i].status = false;
        }
        data[index].status = true;
        this.setState({ category_arr: data, photodata1: data })
    }

    continueClick = () => {
        if (this.state.photodata1.length == 0) {
            msgProvider.toast(msgText.emptyCategory[config.language], 'center')
            return false
        }
        this.props.navigation.navigate('Cleaning', { 'category_id': this.state.category_id })
    }

    // this.props.navigation.navigate('Cleaning', { 'item': item })
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                <Header title={Lang_chg.select_category_header[config.language]} goBack={() => { this.props.navigation.goBack() }} showback={true} />
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ width: '100%', alignSelf: 'center' }}>
                        {this.state.category_arr != 'NA' && <FlatList
                            data={this.state.category_arr}
                            contentContainerStyle={{ paddingBottom: mobileW * 10 / 100 }}
                            numColumns={3}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity onPress={() => { this.setState({ category_id: item.category_id }), this.selectCategorty(index) }} style={{ width: '34%', paddingVertical: mobileW * 4 / 100, justifyContent: 'center', alignItems: 'center', borderBottomWidth: 1, borderRightWidth: 1, borderBottomColor: Colors.gray_color, borderRightColor: Colors.gray_color }}>
                                        {item.status == true && <View style={{ width: '10%', right: mobileW * 3 / 100, top: mobileW * 2.2 / 100, position: 'absolute' }}>
                                            <Image source={require('../icons/checkbox_64.png')} style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100, }} />
                                        </View>}
                                        <View style={{ width: '100%', alignSelf: 'center', alignItems: 'center', justifyContent: 'center', marginTop: mobileW * 3 / 100 }}>
                                            <Image source={{ uri: config.img_url1 + item.category_image }} style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, alignSelf: 'center' }} />
                                        </View>
                                        <View style={{ width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: mobileW * 2 / 100 }}>
                                            <Text numberOfLines={2} style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.black_color, textAlign:'center', paddingHorizontal:mobileW*1/100 }}>{item.category_name[config.language]}</Text>

                                        </View>
                                    </TouchableOpacity>
                                )
                            }}

                        />}
                        {this.state.category_arr == 'NA' && <Nodata_foundimage />}
                    </View>
                    {this.state.category_arr != 'NA' && <View style={{ width: '90%', alignSelf: 'center', marginTop: mobileW * 10 / 100 }}>
                        {/* <CustomButton
                            navigate={() => {this.continueClick() page == 'Post_Job' ? this.props.navigation.navigate('Cleaning',{'category_id':this.state.category_id}) : this.props.navigation.navigate('Title_Description',{'category_id':this.state.category_id}) }}
                            title={Lang_chg.continuebtn[config.language]}
                        /> */}
                        <CustomButton
                            navigate={() => { this.continueClick() }}
                            title={Lang_chg.continuebtn[config.language]}
                        />
                    </View>}
                </KeyboardAwareScrollView>
            </Container>
        )
    }
}  
