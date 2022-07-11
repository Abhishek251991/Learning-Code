import React, { Component } from 'react'
import { Image, FlatList, Modal, Text, TouchableOpacity, View } from 'react-native'
import Header1 from '../Common/Header1'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Provider_BigProject_Inprogress_Jobs_Details extends Component {
   constructor(props) {
      super(props)
      this.state = {
         arr: this.props.route.params.arr,
         modalVisible: false,
         EndBtn: false,
         startBtn: true,
         loading: false

      }
   }
   componentDidMount() {
      this.focusListener = this.props.navigation.addListener('focus', () => {

         this.setState({ loading: true, })
      });
   }
   render() {
      return (
         <Container backgroundColor={Colors.whiteColor}>
            <Header1
               goBack={() => { this.props.navigation.goBack() }}
               title={this.state.arr.id}
               showback={true}
               icon={<TouchableOpacity  ><Image source={require('../icons/menu_white.png')} resizeMode='contain' style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} /></TouchableOpacity>}

            />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
               <View style={{ width: '100%', paddingVertical: mobileW * 7 / 100, backgroundColor: Colors.themecolor }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                     <View style={{ width: '75%' }}>
                        <Text style={{
                           width: '100%', fontFamily: Font.semibold_font, color: Colors.whiteColor
                           , fontSize: mobileW * 6 / 100
                        }}>{Lang_chg.cleaning[config.language]}</Text>
                     </View>
                     <View style={{ width: '25%', justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        <View style={{ width: mobileW * 1.5 / 100, height: mobileW * 1.5 / 100, marginTop: mobileW * 1 / 100, borderRadius: mobileW * 1 / 100, backgroundColor: Colors.whiteColor }}></View>
                        <Text style={{
                           width: '95%', marginLeft: mobileW * 1 / 100, fontFamily: Font.semibold_font, color: Colors.whiteColor
                           , fontSize: mobileW * 4 / 100
                        }}>{this.state.arr.status}</Text>

                     </View>
                  </View>
                  {this.state.arr.status == 'Start Job' && <View style={{ width: '90%', alignSelf: 'center' }}>
                     <Text style={{
                        width: '100%', color: Colors.whiteColor,
                        paddingHorizontal: mobileW * 1 / 100, fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100
                     }}>{Lang_chg.details_hours[config.language]}</Text>
                  </View>}
               </View>
               <View style={{ width: '90%', alignSelf: 'center', marginTop: mobileW * 4 / 100 }}>
                  <Text style={{
                     width: '100%', fontSize: mobileW * 4 / 100,
                     color: Colors.black_color, fontFamily: Font.bold_font
                  }}>{Lang_chg.user_Information}</Text>
               </View>
               <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                  <View style={{ width: '90%', paddingVertical: mobileW * 3 / 100, alignSelf: 'center', alignItems: 'center', flexDirection: 'row' }}>
                     <View style={{ width: '15%' }}>
                        <Image source={this.state.arr.image} style={{ width: mobileW * 10 / 100, height: mobileW * 10 / 100, borderRadius: mobileW * 7 / 100 }} />
                     </View>
                     <View style={{ width: '65%', alignSelf: 'center', marginLeft: mobileW * -2 / 100 }}>
                        <Text style={{
                           width: '100%', fontFamily: Font.semibold_font, color: Colors.black_color
                           , fontSize: mobileW * 4 / 100
                        }}>{this.state.arr.name}</Text>
                     </View>
                     <View style={{ width: '20%', alignItems: 'flex-end' }}>
                        <Image source={require('../icons/message.png')} resizeMode='contain' style={{ width: mobileW * 6 / 100, height: mobileW * 6 / 100, alignSelf: 'flex-end' }} />
                     </View>

                  </View>
               </View>
               <View style={{ width: '90%', alignSelf: 'center' }}>
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
                        <Text style={{
                           width: '100%', fontFamily: Font.regular_font,
                           fontSize: mobileW * 3.5 / 100, color: Colors.black_color
                        }}>{Lang_chg.servicename[config.language]}</Text>
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
                        }}>{Lang_chg.titlename[config.language]}</Text>
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
                        }}>{Lang_chg.descriptiontext[config.language]}</Text>
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
                        }}>{Lang_chg.locationtext[config.language]}</Text>
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
                        }}>{Lang_chg.bookingdate[config.language]}</Text>
                     </View>
                  </View>
                  <View style={{ width: '100%', flexDirection: 'row', paddingVertical: mobileW * 3 / 100 }}>
                     <View style={{ width: '10%', justifyContent: 'center' }}>
                        <Image source={require('../icons/upload.png')} resizeMode='contain' style={{ width: mobileW * 4.5 / 100, height: mobileW * 4.5 / 100 }} />
                     </View>
                     <View style={{ width: '90%', marginLeft: mobileW * -3 / 100 }}>
                        <Text style={{
                           width: '100%', fontSize: mobileW * 3.8 / 100,
                           fontFamily: Font.semibold_font, color: Colors.black_color
                        }}>{Lang_chg.pending_work_photos[config.language]}</Text>
                     </View>

                  </View>
                  <View style={{ width: '100%', flexDirection: 'row', marginLeft: mobileW * -2 / 100, justifyContent: 'space-evenly' }}>
                     <View style={{ width: '30%' }}>
                        <Image source={require('../icons/phil-hearing-U7PitHRnTNU-unsplash.png')} style={{ width: mobileW * 27 / 100, height: mobileW * 27 / 100, borderRadius: mobileW * 1 / 100 }} />
                     </View>
                     <View style={{ width: '30%' }}>
                        <Image source={require('../icons/noithat-rakhoi-vF56dydV4FA-unsplash.jpg')} style={{ width: mobileW * 27 / 100, height: mobileW * 27 / 100, borderRadius: mobileW * 1.5 / 100 }} />
                     </View>
                     <View style={{ width: '30%' }}>
                        <Image source={require('../icons/optical-shades-media-sangroha-d0WU6KSp918-unsplash.jpg')} style={{ width: mobileW * 27 / 100, height: mobileW * 27 / 100, borderRadius: mobileW * 1.5 / 100 }} />
                     </View>
                  </View>

                  {<View style={{ width: '100%' }}>
                     <View style={{ width: '100%', paddingVertical: mobileW * 3 / 100 }}>
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
                           <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100, color: Colors.black_color }}>{Lang_chg.price_amount[config.language]}</Text>
                        </View>
                     </View>
                     <View style={{ width: '100%', marginTop: mobileW * 2 / 100 }}>
                        <Text style={{
                           width: '100%', fontFamily: Font.semibold_font, color: Colors.black_color
                           , fontSize: mobileW * 4 / 100
                        }}>{Lang_chg.description_text[config.language]}</Text>
                     </View>
                     <View style={{ width: '100%', }}>
                        <Text style={{ fontSize: mobileW * 3.5 / 100, fontFamily: Font.regular_font }}>{Lang_chg.pendingJob_description[config.language]}</Text>
                     </View>

                  </View>}


               </View>
               {this.state.arr.status == 'End Job' && <View style={{ width: '100%', borderTopWidth: 1, borderTopColor: Colors.placeholderbordercolor, marginTop: mobileW * 4 / 100 }}>
               </View>}

               {this.state.arr.status == 'End Job' && <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor, paddingVertical: mobileW * 3 / 100 }}>
                  <View style={{ width: '90%', alignSelf: 'center', flexDirection: 'row' }}>
                     <View style={{ width: '80%' }} >
                        <Text style={{
                           width: '100%', fontSize: mobileW * 4 / 100,
                           fontFamily: Font.bold_font, color: Colors.themecolor
                        }}>{Lang_chg.total_Price_Text[config.language]}</Text>
                     </View>
                     <View style={{ width: '20%' }}>
                        <Text style={{
                           width: '100%', fontSize: mobileW * 4 / 100,
                           fontFamily: Font.bold_font, color: Colors.themecolor
                        }}>{Lang_chg.total_Price_amount[config.language]}</Text>
                     </View>
                  </View>
               </View>}

               {(this.state.startBtn == true && this.state.arr.status != 'End Job') &&
                  <View style={{ width: '95%', alignSelf: 'center', marginTop: mobileW * 8 / 100 }}>
                     <CustomButton
                        navigate={() => {
                           var dataa = this.state.arr;
                           dataa.status = "Start Job";
                           this.setState({ startBtn: false, EndBtn: true })
                        }}
                        title={Lang_chg.start_jobBtn[config.language]}
                     />
                  </View>}
               {this.state.EndBtn == true && <TouchableOpacity onPress={() => {
                  var data = this.state.arr;
                  data.status = "End Job";
                  this.setState({ EndBtn: false, arr: data })
               }} activeOpacity={0.9} style={{
                  width: '95%', marginTop: mobileW * 8 / 100,
                  backgroundColor: 'red', borderRadius: mobileW * 2 / 100, paddingVertical: mobileW * 3 / 100,
                  alignSelf: 'center'
               }} >
                  <Text style={{
                     textAlign: 'center', fontSize
                        : mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.whiteColor
                  }}>{Lang_chg.endBtn[config.language]}</Text>
               </TouchableOpacity>}





            </KeyboardAwareScrollView>

         </Container>
      )
   }
}


