import React, { useState, useEffect } from 'react'
import { StyleSheet, BackHandler, Keyboard, Modal, Text, TextInput, View, TouchableOpacity, Image, FlatList, Platform } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText, mediaprovider, Cameragallery } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
export default function Title_Description(props) {
    const navigation = useNavigation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [modalVisible, setmodalVisible] = useState(false)
    const [mediamodal, setmediamodal] = useState(false)

    const [user_id, setuser_id] = useState()
    const [selectImage, setselectImage] = useState('NA')
    const [cameraOn, setcameraOn] = useState('')
    const [imgIndex, setimgIndex] = useState('')

    const [photodata, setPhotodata] = useState([
        { 'id': 0, image: 'NA', file: 'NA', status: true },
        { 'id': 1, image: 'NA', file: 'NA', status: false },
        { 'id': 2, image: 'NA', file: 'NA', status: false },
        { 'id': 3, image: 'NA', file: 'NA', status: false },
        { 'id': 4, image: 'NA', file: 'NA', status: false },
        { 'id': 5, image: 'NA', file: 'NA', status: false },
    ])
    const [photodata1, setPhotodata1] = useState([])
    const category_id = props.route.params.category_id;
    const service_id = props.route.params.service_id;
    // console.log('props.route.params.category_id',props.route.params.category_id)
    // console.log('props.route.params.service_id',props.route.params.service_id)
    useEffect(() => {

        props.navigation.addListener('focus', payload => {
         
         
          BackHandler.addEventListener('hardwareBackPress', backManage)
        });
      }, [])
    
      useFocusEffect(() => {
        props.navigation.addListener('blur', payload => {
    
          BackHandler.removeEventListener('hardwareBackPress', backManage)
        });
      });
    const Camerapopen = async () => {
        mediaprovider.launchCamera(true).then((obj) => {
            let data2 = photodata;
            let data3 = [];
            console.log('imgIndex', imgIndex)
            data2[imgIndex].image = obj.path
            data2[imgIndex].file = obj.path
            if (imgIndex < 4) {
                data2[imgIndex + 1].status = true;
            }

            for (let i = 0; i < data2.length; i++) {
                if (data2[i].image != 'NA') {
                    data3.push({ 'image': data2[i].file, 'status': data2[i].status, 'id': data2[i].id })
                }
            }
            data2[imgIndex + 1].status = true;
            setPhotodata(data2);
            setPhotodata1(data3)
            setmediamodal(false)
            // setselectImage(obj.path)
            // setcameraOn(true)

        }).catch((error) => {
            setmediamodal(false)

        })
    }
    const Galleryopen = () => {
        mediaprovider.launchGellery(true).then((obj) => {
            let data2 = photodata;
            let data3 = [];
            console.log('imgIndex', imgIndex)
            data2[imgIndex].image = obj.path
            data2[imgIndex].file = obj.path
            if (imgIndex < 4) {
                data2[imgIndex + 1].status = true;
            }

            for (let i = 0; i < data2.length; i++) {
                if (data2[i].image != 'NA') {
                    data3.push({ 'image': data2[i].file, 'status': data2[i].status, 'id': data2[i].id })
                }
            }
            setPhotodata(data2);
            setPhotodata1(data3)
            setmediamodal(false)
        }).catch((error) => {
            setmediamodal(false)

        })
    }

    const deleteimagebtn = (index) => {
        consolepro.consolelog('delete image')
        let data = photodata
        data[index].image = 'NA'
        data[index].file = 'NA'
        data[index + 1].status = false
        let img2 = []
        img2 = photodata1
        img2.splice(index, 1)
        if (img2.length <= 0) {
            img2 = [];
        }

        console.log('data delete', data)
        setPhotodata([...data])
        setPhotodata1([...img2])
        //  this.setState({ photodata: data, photodata1: img2 })
        console.log("ing2222", img2)
    }

    const continue_click = async () => {
        if (title.trim().length <= 0) {
            msgProvider.toast(msgText.emptyTitle[config.language], 'center')
            return false;
        }
        if (description.trim().length <= 0) {
            msgProvider.toast(msgText.emptyDescription[config.language], 'center')
            return false;
        }

        var detail = { title: title, description: description, category_id: category_id, service_id: service_id }
        console.log('detail', detail)
        localStorage.setItemObject('post_detail', detail)
        localStorage.setItemObject('post_images', photodata1)
        config.guestUserCheck(props.navigation, 'Location')
        //navigation.navigate('Location')
    }

    const backManage = async () =>{
        localStorage.removeItem('post_detail')
        localStorage.removeItem('post_detail_location')
        localStorage.removeItem('post_images')
        localStorage.removeItem('job_type')
        navigation.goBack()
    }

    return (
        <Container backgroundColor={Colors.whiteColor}>
            <Header goBack={() => { backManage() }} title={Lang_chg.Titlehead[config.language]} showback={true} />
            <Cameragallery mediamodal={mediamodal} Camerapopen={() => { Camerapopen() }}
                Galleryopen={() => { Galleryopen() }}
                Canclemedia={() => { setmediamodal(false) }}
            />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 30 }}>
                <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                    <View style={{ width: '90%', marginTop: mobileW * 12 / 100, alignSelf: 'center' }}>
                        <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingHorizontal: mobileW * 1 / 100 }}>
                            <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.title[config.language]}</Text>
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ width: '15%', alignItems: 'center', marginTop: mobileW * 4 / 100 }}>
                                    <Image source={require('../icons/title.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
                                </View>
                                <TextInput style={styles.TextInput}
                                    onChangeText={(title) => setTitle(title)}
                                    value={title}
                                    placeholderTextColor={Colors.placeholdertextcolor}
                                    returnKeyLabel='done'
                                    returnKeyType='done'
                                    onSubmitEditing={() => { Keyboard.dismiss() }}
                                    keyboardType={'default'}
                                    maxLength={75}
                                />
                            </View>
                        </View>
                        <View style={{ width: mobileW*90/100, alignSelf:'center', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }} >
                            <View style={{ width: '100%', paddingHorizontal: mobileW * 1 / 100, marginTop: mobileW * 8 / 100 }}>
                                <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.title_description[config.language]}</Text>
                            </View>
                            <View style={{ flexDirection: 'row' }} >
                                <View style={{ width: '15%', alignItems: 'center', marginTop: mobileW * 4 / 100, marginLeft: mobileW * 1.5 / 100, }}>
                                    <Image source={require('../icons/pen_black.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100, }} />
                                </View>
                                <View style={{ width: '100%' }} >
                                    <TextInput style={styles.TextInput1}
                                        onChangeText={(description) => setDescription(description)}
                                        value={description}
                                        placeholderTextColor={Colors.placeholdertextcolor}
                                        multiline={true}
                                        maxLength={250}
                                        returnKeyLabel='done'
                                        returnKeyType='done'
                                        textAlignVertical='top'
                                        onSubmitEditing={() => { Keyboard.dismiss() }}
                                        keyboardType={'default'}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', paddingHorizontal: mobileW * 1 / 100, marginTop: mobileW * 5 / 100 }}>
                            <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.work_photos[config.language]}</Text>
                            <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.regular_font, color: Colors.red_Color }}>{Lang_chg.upload_Photo_text[config.language]}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', width: mobileW * 90 / 100, marginTop: 20 }}>
                            <FlatList
                                data={photodata}
                                numColumns={3}
                                scrollEnabled={false}
                                renderItem={({ item, index }) => {

                                    return (
                                        <TouchableOpacity style={{ width: '33.3%', }} disabled={((item.id == 5) || (item.status == false)) ? true : false} onPress={() => { setimgIndex(index), setmediamodal(true) }}>
                                            <View style={{ width: '98%', paddingTop: mobileH * 1 / 100, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                {((item.image == 'NA') && (item.status == true) && (item.id != 5)) &&
                                                    <TouchableOpacity disabled={true} onPress={() => { setmediamodal(true); }} style={{ width: '80%', borderRadius: mobileW * 1 / 100, alignItems: 'center', paddingVertical: mobileW * 10 / 100, borderWidth: 1, borderColor: Colors.placeholderbordercolor }}>
                                                        <Image source={require('../icons/upload.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />
                                                    </TouchableOpacity>
                                                }
                                                {item.image != 'NA' && <View>
                                                    <View style={{ alignItems: 'center', justifyContent: 'center', alignSelf: 'center' }}>
                                                        <View style={[styles.img, { borderRadius: mobileW * 1 / 100, borderColor: Colors.appColor }]} >
                                                            <Image source={{ uri: item.image }} style={[{ width: mobileW * 25 / 100, height: mobileW * 25 / 100, resizeMode: 'cover', alignSelf: 'center', borderRadius: mobileW * 1 / 100, }]} />

                                                        </View>
                                                        <View style={{ position: 'absolute', right: 6, top: -8 }}>
                                                            <TouchableOpacity onPress={() => { deleteimagebtn(index) }}>
                                                                <Image style={{ width: 20, height: 20, borderRadius: 50, marginTop: 10 }} source={require('../icons/crossicon.png')} />
                                                            </TouchableOpacity>
                                                        </View>
                                                    </View>
                                                </View>}
                                            </View>
                                        </TouchableOpacity>
                                    )
                                }}
                                keyExtractor={(item, index) => index.toString()}
                            />
                        </View>
                        <View style={{ width: '100%', alignSelf: 'center', marginTop: mobileW * 30 / 100 }}>
                            <CustomButton navigate={() => { continue_click() }} title={Lang_chg.continuebtn[config.language]} />
                        </View>
                    </View>
                </TouchableOpacity>
            </KeyboardAwareScrollView>

        </Container>
    )
}

const styles = StyleSheet.create({
    TextInput: {
        width: '85%',
        fontSize: mobileW * 4 / 100,
        fontFamily: Font.regular_font,
        color: Colors.textinputcolor,
       // paddingHorizontal: mobileW * 5 / 100,
    },
    TextInput1: {
        width: '85%',
        height: mobileW * 20 / 100,
        fontSize: mobileW * 4 / 100,
        fontFamily: Font.regular_font,
        color: Colors.textinputcolor,
       
       // paddingHorizontal: mobileW * 7 / 100,
      //  backgroundColor:'red',
        marginTop:mobileW*1/100


    },
    TextInput_des: {
        width: mobileW * 75 / 100,
        fontSize: mobileW * 4 / 100,
        fontFamily: Font.regular_font,
        color: Colors.textinputcolor,
        justifyContent: 'center',
        //backgroundColor:'red',
        height:mobileH*10/100,
        marginTop:mobileH*6/100,
        // paddingVertical: mobileH*8/100
        },
})
