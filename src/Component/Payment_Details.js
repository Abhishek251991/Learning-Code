import React, { Component } from 'react'
import { Text, View,FlatList,Image,TouchableOpacity } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const Payment_data=[
{'payment_id':'#5371910849','dateTime':'02/12/2021, 9:40 AM',
'status':'Add Money','amount':'Kr 300/-'},
{'payment_id':'#5371910832','dateTime':'31/11/2021, 9:46 AM',
'status':'Paid','amount':'Kr 200/-'},
{'payment_id':'#5371910845','dateTime':'31/11/2021, 9:40 AM',
'status':'Add Money','amount':'Kr 300/-'},
{'payment_id':'#5371910847','dateTime':'29/11/2021, 9:40 AM',
'status':'Paid','amount':'Kr 200/-'},
{'payment_id':'#5371910849','dateTime':'29/11/2021, 9:40 AM',
'status':'Paid','amount':'Kr 200/-'},
{'payment_id':'#5371910832','dateTime':'28/11/2021, 9:46 AM',
'status':'Add Money','amount':'Kr 300/-'},
{'payment_id':'#5371910845','dateTime':'28/11/2021, 9:46 AM',
'status':'Paid','amount':'Kr400/-'},
{'payment_id':'#5371910847','dateTime':'28/11/2021, 9:40 AM',
'status':'Paid','amount':'$200/-'},
{'payment_id':'#5371910849','dateTime':'02/11/2021, 9:40 AM',
'status':'Paid','amount':'$400/-'},

];


export default class Payment_Details extends Component {
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
            <Header
             goBack={ ()=>{this.props.navigation.goBack()}}
            title={Lang_chg.payment_detail_header[config.language]}
            showback={true}
            icon={<TouchableOpacity ><Image source={require('../icons/add.png')} style={{width:mobileW*4/100,height:mobileW*4/100}} /></TouchableOpacity>}
          />
           <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <View style={{width:'90%',alignSelf:'center',}}>
                <FlatList
                data={Payment_data}
                contentContainerStyle={{paddingBottom:mobileW*10/100}}
                renderItem={({item,index})=>{
                    return(
                        <View style={{width:'100%',marginTop:mobileW*4/100,paddingVertical:mobileW*2/100,borderWidth:1,borderColor:Colors.themecolor
                        ,borderRadius:mobileW*1.5/100}}>
                            <View style={{width:'95%',alignSelf:'center',flexDirection:'row'}}>
                               <View style={{width:'80%'}}>
                                <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.black_color
                            ,fontSize:mobileW*4/100}}>{item.payment_id}</Text>
                               </View>
                               <View style={{width:'20%',alignSelf:'center'}}>
                                   <Text style={{width:'100%',textAlign:'right',fontSize:mobileW*3.5/100,fontFamily:Font.semibold_font
                                ,color:(item.status=='Add Money'?Colors.green_Color:Colors.red_Color)}} numberOfLines={1}>{item.amount}</Text>
                             </View>
                            </View>
                            <View style={{width:'95%',alignSelf:'center',flexDirection:'row'}}>
                               <View style={{width:'80%'}}>
                                <Text style={{width:'100%',fontFamily:Font.regular_font,color:Colors.black_color
                            ,fontSize:mobileW*3.2/100}}>{item.dateTime}</Text>
                               </View>
                               <View style={{width:'20%',alignSelf:'center'}}>
                                   <Text style={{width:'100%',textAlign:'right',fontSize:mobileW*3.2/100,fontFamily:Font.regular_font
                                ,color:Colors.black_color}} numberOfLines={1}>{item.status}</Text>
                             </View>
                            </View>

                        </View>
                    )
                }}
                
                />
              </View> 
           </KeyboardAwareScrollView>
           </Container>
        )
    }
}
