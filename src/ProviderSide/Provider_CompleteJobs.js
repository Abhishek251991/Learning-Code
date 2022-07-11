import React, { Component } from 'react'
import { Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import Container from '../Common/Container'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Common/Header';

const allJobs_data=[
    {'image':require('../icons/philip-martin.jpg'),'name':'Alicia Jonathan','heading':'Cleaning','status':'Instant Jobs',
    'description':'Bathroom Cleaning','datetime':'07/12/2021, 08:00AM','id':'#7829261420','bookingdate':'05/12/2021, 02:00PM','navigate':'Job_Assign_Details'},
    {'image':require('../icons/img26.jpg'),'name':'Anderson','heading':'Laundry','status':'Big Projects',
    'description':'Casual Wear','datetime':'06/12/2021, 09:00AM','id':'#7829261418','bookingdate':'04/12/2021, 04:00PM',},
    {'image':require('../icons/img_25.jpg'),'name':'Jack Michael','heading':'Cleaning','type':'Mens Dress ','status':'Instant Jobs',
    'description':'Kitchen Cleaning','datetime':'04/12/2021, 11:00AM','id':'#7829261416','bookingdate':'02/12/2021, 06:00PM','navigate':'Job_End_Details'},
    {'image':require('../icons/img_28.png'),'name':'Henry Michael','heading':'Laundry','type':'Mens Dress ','status':'Instant Jobs',
    'description':'Mens Dress','datetime':'03/12/2021, 07:00AM','id':'#7829261415','bookingdate':'01/12/2021, 01:00PM','navigate':'Job_Cancel_Details'},
];
export default class Provider_CompleteJobs extends Component {
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
               <Header
            showback={true}
            title={Lang_chg.completejobs_header[config.language]}
            goBack={ ()=>{this.props.navigation.goBack()}}
          />
           <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={{width:'95%',alignSelf:'center'}}>
            <FlatList
                data={allJobs_data}
                renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity style={{width:'100%',alignSelf:'center',borderWidth:1,borderColor:Colors.themecolor
                        ,paddingVertical:mobileW*2/100,marginTop:mobileW*3/100,borderRadius:mobileW*1.5/100}}>
                             <View style={{width:'90%',alignSelf:'center',flexDirection:'row'}}>
                                <View style={{width:'15%'}}>
                                  <Image source={item.image} style={{width:mobileW*10/100,height:mobileW*10/100,borderRadius:mobileW*7/100}}  />
                               </View>
                               <View style={{width:'55%',alignSelf:'center',marginLeft:mobileW*-1/100}}>
                                   <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.black_color
                               ,fontSize:mobileW*4/100}}>{item.name}</Text>
                              </View> 
                              <View style={{width:'30%',flexDirection:'row',alignItems:'center',marginLeft:mobileW*6/100}}>
                                <Text style={{width:'100%',textAlign:'center',fontFamily:Font.semibold_font,color:Colors.themecolor,fontSize:mobileW*3.5/100}}>{item.status}</Text>
                                </View>
                             </View>
                          <View style={{width:'90%',alignSelf:'center',marginTop:mobileW*2/100}}>
                           <Text style={{width:'100%',fontSize:mobileW*3.8/100,fontFamily:Font.semibold_font
                               ,color:Colors.black_color}}>{item.heading}</Text>
                             
                             </View>
                          <View style={{width:'92%',flexDirection:'row',marginTop:mobileW*1/100}}>
                              <View style={{width:'15%',alignItems:'center',justifyContent:'center',}}>
                                <Image source={require('../icons/job.png')} resizeMode='contain' style={{width:mobileW*4/100,height:mobileW*4/100}} />
                              </View>
                              <View style={{width:'85%',marginLeft:mobileW*-2/100,}}>
                                  <Text style={{width:'100%',fontFamily:Font.regular_font,
                               fontSize:mobileW*3.5/100,color:Colors.black_color}}>{item.description}</Text>
                              </View>

                          </View>
                          <View style={{width:'92%',alignItems:'center',marginTop:mobileW*2/100,paddingBottom:mobileW*3/100,borderBottomColor:Colors.placeholderbordercolor,alignSelf:'center',flexDirection:'row',}}>
                              <View style={{width:'10%',justifyContent:'center',paddingHorizontal:mobileW*1/100}}>
                                <Image source={require('../icons/time_date.png')} resizeMode='contain' style={{width:mobileW*4/100,height:mobileW*4/100}} />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-1.8/100}}>
                                  <Text style={{width:'100%',fontFamily:Font.regular_font,
                               fontSize:mobileW*3.5/100,color:Colors.black_color}}>{item.datetime}</Text>
                              </View>
                           
                          </View>
                          <View style={{ width:'90%',alignSelf:'center',borderStyle: 'dashed', borderWidth: 0.9,
                          borderRadius: 1,borderColor:Colors.dash_border_color,}}></View>
                          
                          <View style={{width:'92%',flexDirection:'row',paddingTop:mobileW*2/100,alignSelf:'center'}}>
                           <View style={{width:'40%',paddingHorizontal:mobileW*2/100}}>
                             <Text style={{fontSize:mobileW*3.5/100,fontFamily:Font.regular_font,color:Colors.themecolor}}>{item.id}</Text>
                           </View>
                           <View style={{width:'60%',}}>
                             <Text style={{fontSize:mobileW*3.0/100,textAlign:'right',fontFamily:Font.regular_font,color:Colors.msg_color}}>{item.bookingdate}</Text>
                           </View>
                       
                          </View>
                         
                       </TouchableOpacity>
                    )
                }}
               /> 
            </View>
           </KeyboardAwareScrollView>
            </Container>
        )
    }
}
