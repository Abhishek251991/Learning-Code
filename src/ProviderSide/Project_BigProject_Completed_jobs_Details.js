import React, { Component } from 'react'
import { Image,FlatList,Modal, Text, TouchableOpacity, View } from 'react-native'
import Header1 from '../Common/Header1'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Project_BigProject_Completed_jobs_Details extends Component {
   constructor(props){
      super(props)
      this.state={
        arr: this.props.route.params.arr,
        modalVisible:false
      }
   }
 
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
              <Header1
             goBack={ ()=>{this.props.navigation.goBack()}}
            title={this.state.arr.id}
            showback={true}
            icon={<TouchableOpacity  ><Image source={require('../icons/menu_white.png')} resizeMode='contain' style={{width:mobileW*5/100,height:mobileW*5/100}} /></TouchableOpacity> }
          
          />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{width:'100%',paddingVertical:mobileW*7/100,backgroundColor:Colors.themecolor}}>
                  <View style={{width:'90%',alignSelf:'center',flexDirection:'row'}}>
                     <View style={{width:'75%'}}>
                         <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.whiteColor
                        ,fontSize:mobileW*6/100}}>{Lang_chg.cleaning[config.language]}</Text>
                     </View>
                    <View style={{width:'25%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                         <View style={{width:mobileW*1.5/100,height:mobileW*1.5/100,marginTop:mobileW*1/100,borderRadius:mobileW*1/100,backgroundColor:Colors.whiteColor}}></View>
                         <Text style={{width:'95%',marginLeft:mobileW*1/100,fontFamily:Font.semibold_font,color:Colors.whiteColor
                        ,fontSize:mobileW*4/100}}>{this.state.arr.status}</Text>

                     </View>
                  </View>
                  
                </View>
                <View style={{width:'90%',alignSelf:'center',marginTop:mobileW*4/100}}>
                 <Text style={{width:'100%',fontSize:mobileW*4/100,
                color:Colors.black_color,fontFamily:Font.bold_font}}>{Lang_chg.user_Information}</Text>
                </View>
                <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}}>
                  <View style={{width:'90%',paddingVertical:mobileW*3/100,alignSelf:'center',alignItems:'center',flexDirection:'row'}}>
                  <View style={{width:'15%'}}>
                   <Image source={this.state.arr.image} style={{width:mobileW*10/100,height:mobileW*10/100,borderRadius:mobileW*7/100}}  />
                    </View>
                    <View style={{width:'65%',alignSelf:'center',marginLeft:mobileW*-2/100}}>
                     <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.black_color
                    ,fontSize:mobileW*4/100}}>{this.state.arr.name}</Text>
                     </View>
                     <View style={{width:'20%',alignItems:'flex-end'}}>
                         <Image source={require('../icons/message.png')} resizeMode='contain' style={{width:mobileW*6/100,height:mobileW*6/100,alignSelf:'flex-end'}}  />
                     </View> 

                  </View>
                </View>
                <View style={{width:'90%',alignSelf:'center'}}>
                   <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor,paddingVertical:mobileW*3/100}}>
                          <View style={{width:'100%',flexDirection:'row'}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/job.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-3/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.service[config.language]}</Text>
                              </View>
                             
                          </View>
                           <View style={{width:'100%',paddingVertical:mobileW*1/100}}>
                              <Text style={{width:'100%',fontFamily:Font.regular_font,
                            fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.servicename[config.language]}</Text>
                           </View>
                       </View>   
                       <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor,paddingVertical:mobileW*3/100}}>
                          <View style={{width:'100%',flexDirection:'row'}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/title2.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-3/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.title[config.language]}</Text>
                              </View>
                             
                          </View>
                           <View style={{width:'100%',paddingVertical:mobileW*1/100}}>
                              <Text style={{width:'100%',fontFamily:Font.regular_font,
                            fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.titlename[config.language]}</Text>
                           </View>
                       </View>   
                       <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor,paddingVertical:mobileW*3/100}}>
                          <View style={{width:'100%',flexDirection:'row'}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/description.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-3/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.descriptiontitle[config.language]}</Text>
                              </View>
                             
                          </View>
                           <View style={{width:'100%',paddingVertical:mobileW*1/100}}>
                              <Text style={{width:'100%',fontFamily:Font.regular_font,
                            fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.descriptiontext[config.language]}</Text>
                           </View>
                       </View>  
                       <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor,paddingVertical:mobileW*3/100}}>
                          <View style={{width:'100%',flexDirection:'row'}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/location_black.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-3/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.locationtitle[config.language]}</Text>
                              </View>
                             
                          </View>
                           <View style={{width:'100%',paddingVertical:mobileW*1/100}}>
                              <Text style={{width:'100%',fontFamily:Font.regular_font,
                            fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.locationtext[config.language]}</Text>
                           </View>
                       </View>  
                       <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor,paddingVertical:mobileW*3/100}}>
                          <View style={{width:'100%',flexDirection:'row'}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/time_date.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-3/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.bookingtitle[config.language]}</Text>
                              </View>
                             
                          </View>
                           <View style={{width:'100%',paddingVertical:mobileW*1/100}}>
                              <Text style={{width:'100%',fontFamily:Font.regular_font,
                            fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.bookingdate[config.language]}</Text>
                           </View>
                       </View> 
                       <View style={{width:'100%',flexDirection:'row',paddingVertical:mobileW*3/100}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/upload.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-3/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.pending_work_photos[config.language]}</Text>
                              </View>
                             
                          </View>  
                          <View style={{width:'100%',flexDirection:'row',marginLeft:mobileW*-2/100,justifyContent:'space-evenly',marginTop:mobileW*2/100}}>
                             <View style={{width:'30%'}}>
                                <Image source={require('../icons/phil-hearing-U7PitHRnTNU-unsplash.png')} style={{width:mobileW*27/100,height:mobileW*27/100,borderRadius:mobileW*1/100}} />
                             </View>
                             <View style={{width:'30%'}}>
                                <Image source={require('../icons/noithat-rakhoi-vF56dydV4FA-unsplash.jpg')} style={{width:mobileW*27/100,height:mobileW*27/100,borderRadius:mobileW*1.5/100}} />
                             </View>
                             <View style={{width:'30%'}}>
                                <Image source={require('../icons/optical-shades-media-sangroha-d0WU6KSp918-unsplash.jpg')} style={{width:mobileW*27/100,height:mobileW*27/100,borderRadius:mobileW*1.5/100}} />
                             </View>
                         </View>
                         <View style={{width:'100%',paddingVertical:mobileW*3/100}}>
                             <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.themecolor
                            ,fontSize:mobileW*4/100}}>{Lang_chg.quotation[config.language]}</Text>
                        </View>
                        <View style={{width:'100%',justifyContent:'space-between',flexDirection:'row'}}>
                            <View style={{width:'50%'}}>
                                <Text style={{width:'100%',fontSize:mobileW*4/100,fontFamily:Font.semibold_font
                            ,color:Colors.black_color}}>{Lang_chg.price_title[config.language]}</Text>
                            </View>
                            <View style={{width:'50%',alignItems:'flex-end'}}>
                              <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.price_amount[config.language]}</Text>
                            </View>
                        </View> 
                        <View style={{width:'100%',marginTop:mobileW*2/100}}>
                             <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.black_color
                            ,fontSize:mobileW*4/100}}>{Lang_chg.description_text[config.language]}</Text>
                        </View>
                        <View style={{width:'100%',}}>
                            <Text style={{fontSize:mobileW*3.5/100,fontFamily:Font.regular_font}}>{Lang_chg.pendingJob_description[config.language]}</Text>
                            </View>
                  </View>
                  <View style={{width:'100%',borderTopWidth:1,borderTopColor:Colors.placeholderbordercolor,marginTop:mobileW*4/100}}>
                   </View>
                    
                   
                     
                 <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}}>
                <View style={{width:'90%',alignSelf:'center',flexDirection:'row',paddingVertical:mobileW*3/100}}>
                         <View style={{width:'80%'}}>
                             <Text style={{width:'100%',fontFamily:Font.bold_font
                            ,color:Colors.themecolor,fontSize:mobileW*4/100}}>{Lang_chg.completed_total_amount_text[config.language]}</Text>
                        </View>
                        <View style={{width:'20%',justifyContent:'center'}}>
                        <Text style={{width:'100%',fontFamily:Font.bold_font
                            ,color:Colors.themecolor,fontSize:mobileW*4/100,textAlign:'right'}}>{Lang_chg.total_Price_amount[config.language]}</Text>
                        </View>
                      </View>
                </View>
                <View style={{width:'90%',alignSelf:'center',paddingVertical:mobileW*4/100,marginTop:mobileW*2/100,flexDirection:'row'}}>
                 <View style={{width:'60%'}}>
                     <Text style={{width:'100%',fontFamily:Font.semibold_font
                     ,color:Colors.themecolor,fontSize:mobileW*4/100}}>{Lang_chg.rate_reviews[config.language]}</Text>
                 </View>
                 <View style={{width:'40%',justifyContent:'center',alignItems:'center',paddingTop:mobileW*1/100}}>
                  <Text style={{width:'100%',fontFamily:Font.regular_font
                  ,color:Colors.msg_color,fontSize:mobileW*3.3/100,textAlign:'right'}}>{Lang_chg.rate_date[config.language]}</Text>
                 </View>
               </View>
                <View style={{width:'90%',alignSelf:'center'}}>
                 <View style={{width:'100%',alignSelf:'center',flexDirection:'row'}}>
                   <View style={{width:'15%',}}>
                     <Image source={this.state.arr.image} style={{width:mobileW*12/100,height:mobileW*12/100,borderRadius:mobileW*7/100}} />
                   </View>
                   <View style={{width:'85%',}}>
                     <Text style={{fontSize:mobileW*4/100,fontFamily:Font.medium_font
                    ,color:Colors.black_color}}>{this.state.arr.name}</Text>
                     <View style={{width:'40%',marginLeft:mobileW*-3/100,marginTop:mobileW*1/100,justifyContent:'space-around',flexDirection:'row'}}>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}  />
                        </View>
                      </View>
                   </View>
                 </View>
                 <View style={{width:'100%',marginTop:mobileW*2/100}}>
                    <Text style={{width:'80%',fontFamily:Font.regular_font,fontSize:mobileW*4/100,color:Colors.black_color}}>{Lang_chg.rate_description[config.language]}</Text>
                 </View>
               </View>    
                       
               
             </KeyboardAwareScrollView> 
             <Modal
                  animationType="slide"
                 transparent={true}
                 visible={this.state.modalVisible}
                 onRequestClose={() => {
                            }}
                            >
                      <View style={{ flex: 1, backgroundColor: '#000000aa' }}>
                       <View style={{ width: '85%', position: 'absolute', bottom: mobileW * 3 / 100, alignSelf: 'center', alignItems: 'center', }}>
                                        <View style={{ width: '100%', backgroundColor: '#FFFFFF', alignSelf: 'center', borderRadius: mobileW * 3 / 100 }}>
                                            <View style={{ width: '100%', borderBottomColor:Colors.lightGray_color, borderBottomWidth: 1, paddingVertical: mobileW * 5 / 100 }}>
                                                <Text style={{ width: '100%', textAlign: 'center', fontFamily: Font.bold_font, fontSize:mobileW*4/100, color:Colors.black_color }}>{Lang_chg.selectoption[config.language]}</Text>
                                            </View>
                                            <TouchableOpacity onPress={()=>{this.setState({modalVisible:false}),this.props.navigation.navigate('Report_Complaint')}}  activeOpacity={.7} style={{ width: '100%', borderBottomColor:Colors.lightGray_color, borderBottomWidth: 1, paddingVertical: mobileW * 5 / 100 }}>
                                                <Text style={{
                                                    width: '100%', textAlign: 'center',
                                                    fontFamily: Font.bold_font,
                                                    fontSize:mobileW*4/100, color:Colors.black_color
                                                }}>{Lang_chg.report_complaint[config.language]}</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{this.setState({modalVisible:false}),this.props.navigation.navigate('Cancel_Job_Reason')}} style={{ width: '100%', alignItems: 'center', alignSelf: 'center', paddingVertical: mobileW * 5 / 100 }}>
                                                <Text style={{ width: '100%', textAlign: 'center', fontSize:mobileW*4/100, fontFamily: Font.bold_font, color:Colors.black_color }}>{Lang_chg.cancel_job[config.language]}</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <TouchableOpacity style={{ width: '100%', backgroundColor: '#FFFFFF', paddingVertical: mobileW * 5 / 100, alignSelf: 'center', borderRadius: mobileW * 3 / 100, marginTop: mobileW * 3 / 100 }}  onPress={()=>{this.setState({modalVisible:false})}} >
                                            <Text style={{ width: '100%', textAlign: 'center', color:Colors.red_Color, fontSize:mobileW*4/100, fontFamily: Font.bold_font }}>{Lang_chg.cancel[config.language]}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </Modal>
            </Container>
        )
    }
}


