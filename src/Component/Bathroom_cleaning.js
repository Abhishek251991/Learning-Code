import React from 'react'
import { StyleSheet, Text, View,Image, FlatList } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';

bathroomclean_data=[
  {'image':require('../icons/phil-hearing-U7PitHRnTNU-unsplash.png'),
  'heading':'1 Bathroom + 1 Ceiling Fan','hours':'Kr 23/Hr',
  'title1':'Intense deep Cleaning for 10X stain removal',
  'title2':'Target hard strains & difficult to reach places',
  'image1':require('../icons/checkbox_64.png')},
  {'image':require('../icons/phil-hearing-U7PitHRnTNU-unsplash.png'),
  'heading':'2 Bathroom + 2 Ceiling Fan','hours':'Kr 46/Hr',
  'title1':'Intense deep Cleaning for 10X stain removal',
  'title2':'Target hard strains & difficult to reach places',
  'image1':require('../icons/check_64.png')},
  {'image':require('../icons/giorgio-trovato-876NP3npUMc-unsplash.jpg'),
  'heading':'Toilet Seat Stain removal','hours':'Kr 12/Hr',
  'title1':'Deep cleaning of interior and exterior surface of the WC',
  'title2':'Target hard strains & difficult to reach places',
  'image1':require('../icons/check_64.png')},
  {'image':require('../icons/noithat-rakhoi-vF56dydV4FA-unsplash.jpg'),
  'heading':'Bath Tub Cleaning','hours':'Kr 20/Hr',
  'title1':'Intense deep Cleaning for 10X stain removal',
  'title2':'Target hard strains & difficult to reach places',
  'image1':require('../icons/checkbox_64.png')},
  {'image':require('../icons/optical-shades-media-sangroha-d0WU6KSp918-unsplash.jpg'),
  'heading':'Wash Basin','hours':'Kr 10/Hr',
  'title1':'Intense deep Cleaning for 10X stain removal',
  'title2':'Target hard strains & difficult to reach places',
  'image1':require('../icons/check_64.png')},
  

];
export default function Bathroom_cleaning(props) {
    const navigation=useNavigation();
    return (
        <Container backgroundColor={Colors.whiteColor}>
           <Header
            goBack={ ()=>{navigation.goBack()}}
           title={Lang_chg.bathroomcleaninghead[config.language]}
          showback={true}
           />  
             <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{width:'100%',marginTop:mobileW*2/100}}>
                  <FlatList
                  data={bathroomclean_data}
                  renderItem={({item,index})=>{
                      return(
                          <View style={{width:'100%',paddingVertical:mobileW*5/100,borderBottomWidth:1,borderBottomColor:Colors.gray_color}}>
                             <View style={{width:'90%',alignSelf:'center',flexDirection:'row'}}>
                                <View style={{width:'15%',alignItems:'center'}}>
                                    <Image source={item.image} resizeMode='contain' style={{width:mobileW*14/100,height:mobileW*14/100,borderRadius:mobileW*8/100}}  />
                                </View>
                                <View style={{width:'85%',}}>
                                  <View style={{width:'100%',flexDirection:'row',alignItems:'center'}}>
                                    <Text style={{width:'90%',paddingHorizontal:mobileW*2/100,fontFamily:Font.bold_font,fontSize:mobileW*3.8/100}}>{item.heading}</Text>
                                    <View style={{width:'10%',paddingTop:mobileW*3/100,alignItems:'center',justifyContent:'center',}}>
                                      <Image source={item.image1} style={{width:mobileW*5/100,height:mobileW*5/100,alignSelf:'center'}} />
                                    </View>
                                  </View>
                                  <View style={{width:'22%',alignItems:'center',paddingVertical:mobileW*0.7/100}}>
                                    <Text style={{fontSize:mobileW*3/100,textAlign:'center',fontFamily:Font.bold_font,color:Colors.themecolor}}>{item.hours}</Text>
                                  </View>
                                 
                                </View>
                                
                              
                             </View>
                             <View style={{width:'90%',marginTop:mobileW*4/100,alignItems:'center',alignSelf:'center',flexDirection:"row"}}>
                                 <View style={{width:mobileW*2/100,height:mobileW*2/100,borderRadius:mobileW*1/100,backgroundColor:'#C4C4C4'}}></View>
                                
                                  <View style={{width:'90%',paddingHorizontal:mobileW*1/100}}>
                                   <Text style={{fontFamily:Font.regular_font,color:Colors.black_color,fontSize:mobileW*3/100}}>{item.title1}</Text>
                                  </View>
                                </View>
                                <View style={{width:'90%',marginTop:mobileW*4/100,alignItems:'center',alignSelf:'center',flexDirection:"row"}}>
                                 <View style={{width:mobileW*2/100,height:mobileW*2/100,borderRadius:mobileW*1/100,backgroundColor:'#C4C4C4'}}></View>
                                
                                  <View style={{width:'90%',paddingHorizontal:mobileW*1/100}}>
                                   <Text style={{fontFamily:Font.regular_font,color:Colors.black_color,fontSize:mobileW*3/100}}>{item.title2}</Text>
                                  </View>
                                </View>
                          </View>
                      )
                  }}
                  
                  
                  />
                   
                </View>
                <View style={{width:'90%',alignSelf:'center',marginTop:mobileW*5/100}}>
                <CustomButton
                  navigate={()=>{navigation.navigate('Title_Description')}}
                title={Lang_chg.continuebtn[config.language]}
              />
              </View>
             </KeyboardAwareScrollView>
        </Container>
    )
}

const styles = StyleSheet.create({})
