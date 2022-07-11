import React, { Component } from 'react'
import { StyleSheet, Text, View,Image,FlatList } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Footer1 from '../Provider/Footer1';

const chat_data=[
    {'image':require('../icons/edit_profile.jpg'),'id':'#782961421','name':'John Michael','job':'Cleaning','description':'I am also good','datetime':'07/11/2021, 12:00PM','count':'1'},
    {'image':require('../icons/img_25.jpg'),'id':'#782961419','name':'Jack Michael','job':'Plumber','description':'Can you give discount for this....','datetime':'06/11/2021, 11:00AM'},
    {'image':require('../icons/img26.jpg'),'id':'#782961318','name':'Robert James','job':'Plumber','description':'I am also good','datetime':'04/11/2021, 10:00AM','count':'1'},
    {'image':require('../icons/philip-martin.jpg'),'id':'#782961417','name':'Jasmine','job':'Electricians','description':'thank you so much sir','datetime':'03/11/2021, 08:00AM'},
    ];
export default class Provider_Chat extends Component {
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
               <Header
                title={Lang_chg.chathead[config.language]}
               icon={<Image source={require('../icons/search.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />}
               />
                  <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                      <View style={{width:'100%'}}>
                         <FlatList
                         data={chat_data}
                         renderItem={({item,index})=>{
                            return(
                              <View style={{width:'100%',flexDirection:'row',marginTop:mobileW*2/100,paddingBottom:mobileW*3/100,borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}}>
                                 <View style={{width:'20%',alignItems:'center',marginTop:mobileW*6/100}}>
                                     <Image source={item.image} style={{width:mobileW*14/100,height:mobileW*14/100,borderRadius:mobileW*8/100}}  />
                                     </View>
                                     <View style={{width:'52%',marginTop:mobileW*3/100}}>
                                         <View style={{width:'100%',marginBottom:mobileW*-1/100}}>
                                        <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*4/100,color:
                                        Colors.black_color}}>{item.id}</Text>
                                         </View>
                                         <View style={{width:'100%',marginBottom:mobileW*-1/100}}>
                                        <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*4/100,color:
                                        Colors.black_color}}>{item.name}</Text>
                                         </View>
                                         <View style={{width:'100%',}}>
                                        <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*3.5/100,color:
                                        Colors.themecolor}}>{item.job}</Text>
                                         </View>
                                         <View style={{width:'100%',}}>
                                        <Text style={{fontFamily:Font.regular_font,fontSize:mobileW*3.5/100,color:
                                        Colors.msg_color}}>{item.description}</Text>
                                         </View>
                                         </View>
                                         <View style={{width:'28%',alignItems:'center',justifyContent:'flex-end'}}>
                                         {item.count==1 &&<View style={{width:mobileW*4/100,alignItems:'center',marginLeft:mobileW*13/100,height:mobileW*4/100,marginBottom:mobileW*1/100,borderRadius:mobileW*3/100,backgroundColor:'red'}}>
                                                 <Text style={{color:Colors.whiteColor,fontSize:mobileW*3/100,textAlign:'center',fontFamily:Font.bold_font}}>{item.count}</Text>
    
                                             </View>}
                                             <View style={{width:'100%'}}>
                                               <Text style={{width:'100%',fontFamily:Font.regular_font,color:Colors.msg_color,fontSize:mobileW*2.5/100}}>{item.datetime}</Text>
                                             </View>
                                         </View>
    
                                </View>
                             )
    
                         }}
                         />
                      </View>
                  </KeyboardAwareScrollView>
                  <Footer1 navigation={this.props.navigation} page={'Provider_Chat'} user_id={1} />
             </Container>
        )
    }
}
