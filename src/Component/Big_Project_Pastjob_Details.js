import React, { Component } from 'react'
import { Image,FlatList, Text, TouchableOpacity, View, Touchable } from 'react-native'
import Header1 from '../Common/Header1'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


export default class Big_Project_Pastjob_Details extends Component {
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
              <Header1
             goBack={ ()=>{this.props.navigation.goBack()}}
            title={Lang_chg.inprogressheadertext[config.language]}
            showback={true}
            icon={<Image source={require('../icons/menu_white.png')} resizeMode='contain' style={{width:mobileW*5/100,height:mobileW*5/100}} />}
           />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{width:'100%',paddingVertical:mobileW*6/100,backgroundColor:Colors.themecolor}}>
                  <View style={{width:'90%',alignSelf:'center',flexDirection:'row'}}>
                     <View style={{width:'75%'}}>
                         <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.whiteColor
                        ,fontSize:mobileW*6/100}}>{Lang_chg.inprogress_cleaning[config.language]}</Text>
                     </View>
                     <View style={{width:'25%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                         <View style={{width:mobileW*1.5/100,height:mobileW*1.5/100,marginTop:mobileW*1/100,borderRadius:mobileW*1/100,backgroundColor:Colors.whiteColor}}></View>
                         <Text style={{width:'95%',marginLeft:mobileW*1/100,fontFamily:Font.semibold_font,color:Colors.whiteColor
                        ,fontSize:mobileW*4/100}}>{Lang_chg.completed[config.language]}</Text>

                     </View>
                  </View>
                  
                </View>
                <View style={{width:'90%',alignSelf:'center',paddingVertical:mobileW*3/100,flexDirection:'row'}}>
                   <View style={{width:'80%',}}>
                     <Text style={{width:'100%',fontSize:mobileW*4.3/100,fontFamily:Font.bold_font
                    ,color:Colors.black_color}}>{Lang_chg.provider_Information[config.language]}</Text>
                   </View>
                   
                </View>
                <View style={{width:'100%',paddingBottom:mobileW*2/100,borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}}>
                  <View style={{width:'90%',alignSelf:'center',flexDirection:'row'}}>
                    <View style={{width:'20%'}}>
                       <Image source={require('../icons/img34.jpg')} style={{width:mobileW*18/100,height:mobileW*18/100,borderRadius:mobileW*9/100,borderWidth:1,borderColor:Colors.gray_color}} />
                    </View>
                    <View style={{width:'50%',alignSelf:'center',paddingHorizontal:mobileW*1/100}}>
                      <View style={{width:'100%'}}>
                       <Text style={{width:'100%',fontSize:mobileW*3.8/100,fontFamily:Font.bold_font,color:Colors.black_color}}>{Lang_chg.name[config.language]}</Text>
                      </View>
                      <View style={{width:'100%'}}>
                       <Text style={{width:'100%',fontSize:mobileW*3.8/100,fontFamily:Font.regular_font,color:Colors.black_color}}>{Lang_chg.description[config.language]}</Text>
                      </View>
                    </View>
                    <View style={{width:'30%',alignSelf:'center',marginTop:Platform.OS=='ios'?-mobileW*2/100:-mobileW*6/100}}>
                       <View style={{width:'100%',flexDirection:'row'}}>
                      <View style={{width:'70%',marginTop:mobileW*1/100,justifyContent:'space-around',flexDirection:'row'}}>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*3/100,height:mobileW*3/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*3/100,height:mobileW*3/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*3/100,height:mobileW*3/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*3/100,height:mobileW*3/100}}  />
                        </View>
                        <View style={{width:'5%'}}>
                           <Image source={require('../icons/star.png')} style={{width:mobileW*3/100,height:mobileW*3/100}}  />
                        </View>
                      </View>
                      <View style={{width:'30%',marginLeft:mobileW*2/100}}>
                        <Text style={{width:'100%',fontFamily:Font.semibold_font,fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.rating}</Text>
                      </View>
                      </View>
                      <TouchableOpacity style={{width:'100%',alignItems:'flex-end',marginTop:mobileW*3/100,marginLeft:mobileW*2/100}}>
                        <Image source={require('../icons/message.png')} style={{width:mobileW*6/100,height:mobileW*6/100}} />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={{width:'90%',alignSelf:'center',}}>
                   <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor,paddingVertical:mobileW*3/100}}>
                          <View style={{width:'100%',flexDirection:'row'}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/job.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-2.5/100}}>
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
                              <View style={{width:'90%',marginLeft:mobileW*-2.5/100}}>
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
                              <View style={{width:'90%',marginLeft:mobileW*-2.5/100}}>
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
                              <View style={{width:'90%',marginLeft:mobileW*-2.5/100}}>
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
                              <View style={{width:'90%',marginLeft:mobileW*-2.5/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.bookingtitle[config.language]}</Text>
                              </View>
                             
                          </View>
                           <View style={{width:'100%',paddingVertical:mobileW*1/100}}>
                              <Text style={{width:'100%',fontFamily:Font.regular_font,
                            fontSize:mobileW*3.5/100,color:Colors.black_color}}>{Lang_chg.bookingdate[config.language]}</Text>
                           </View>
                       </View>
                       <View style={{width:'100%',flexDirection:'row',paddingVertical:mobileW*4/100}}>
                              <View style={{width:'10%',justifyContent:'center'}}>
                                 <Image source={require('../icons/upload.png')} resizeMode='contain' style={{width:mobileW*4.5/100,height:mobileW*4.5/100}}      />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-3/100}}>
                                 <Text style={{width:'100%',fontSize:mobileW*3.8/100,
                                fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.pending_work_photos[config.language]}</Text>
                              </View>
                             
                          </View> 
                          <View style={{width:'100%',flexDirection:'row',marginLeft:mobileW*-2/100,justifyContent:'space-evenly'}}>
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

                         <View style={{width:'100%',paddingVertical:mobileW*4/100}}>
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

                      <View style={{width:'100%',marginTop:mobileW*2/100,}}>
                             <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.black_color
                            ,fontSize:mobileW*4/100}}>{Lang_chg.description_text[config.language]}</Text>
                        </View>
                       
                     
                </View>
                <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor,paddingBottom:mobileW*3/100}}>
                            <Text style={{width:'90%',alignSelf:'center',fontSize:mobileW*3.5/100,fontFamily:Font.regular_font}}>{Lang_chg.pendingJob_description[config.language]}</Text>
                            </View>
               

                <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}}>
                <View style={{width:'90%',alignSelf:'center',flexDirection:'row',paddingVertical:mobileW*4/100}}>
                         <View style={{width:'80%'}}>
                             <Text style={{width:'100%',fontFamily:Font.semibold_font
                            ,color:Colors.themecolor,fontSize:mobileW*4/100}}>{Lang_chg.completed_total_amount_text[config.language]}</Text>
                        </View>
                        <View style={{width:'20%',justifyContent:'center'}}>
                        <Text style={{width:'100%',fontFamily:Font.bold_font
                            ,color:Colors.themecolor,fontSize:mobileW*4/100,textAlign:'right'}}>{Lang_chg.price_amount[config.language]}</Text>
                        </View>
                      </View>
                </View>
               <View style={{width:'95%',alignSelf:'center',marginTop:mobileW*8/100}}>
               <CustomButton
                  navigate={()=>{this.props.navigation.navigate('Rate_Now')}}
                title={Lang_chg.ratenowbtn[config.language]}
              /> 
               </View>
             </KeyboardAwareScrollView> 
            </Container>
        )
    }
}

