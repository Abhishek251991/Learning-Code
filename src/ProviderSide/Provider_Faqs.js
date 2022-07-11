import React, { Component } from 'react'
import { Text,Keyboard,FlatList, View,TouchableOpacity,StyleSheet,Image,TextInput } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const faq_data=[
    {'number':'1','title':Lang_chg.description1[config.language],'description':"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy ",'status':false},
    {'number':'2','title':Lang_chg.description2[config.language],'description':"Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.",'status':false},
    {'number':'3','title':Lang_chg.description3[config.language],'description':"The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from de Finibus Bonorum et Malorum",'status':false},
    ];
export default class Provider_Faqs extends Component {
    constructor(props){
        super(props)
        this.state={
            check:false,
            myfaq_arr:faq_data

        }
   
    }
    faqanwserbtn=(index)=>{
        let data=this.state.myfaq_arr
        data[index].status=!data[index].status
         this.setState({myfaq_arr:data})
     }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                <Header
              showback={true}
              title="FAQ's"
              goBack={()=>{this.props.navigation.goBack()}}
              />
              <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                 <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                     <FlatList
                     data={this.state.myfaq_arr}
                     renderItem={({item,index})=>{
                         return(
                            <View style={styles.Container}>
                            <View style={{width:'100%',paddingBottom:mobileW*3/100, marginTop:mobileW*8/100,paddingHorizontal:mobileW*6/100,flexDirection:'row',alignSelf:'center'}}>
                                <View style={{width:'10%'}}>
                                  <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*4/100}}>{item.number}</Text>
                                </View>
                                <View style={{width:'85%',marginLeft:mobileW*-2/100}}>
                                   <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*4/100,Colors:Colors.black_color}}>{item.title}</Text>
                                </View>
                                <TouchableOpacity onPress={()=>{this.faqanwserbtn(index)}} style={{width:'5%',justifyContent:'center',marginLeft:mobileW*2/100}}>
                                <Ionicons name='chevron-down' size={22}  style={{ alignSelf: 'center', color:Colors.black_color, }} />
                               </TouchableOpacity>
                           </View>
                    
                           {item.status==true   &&<View style={{width:'85%',alignSelf:'center',paddingHorizontal:mobileW*1.5/100}}>
                            <Text style={{fontSize:mobileW*3.5/100,fontFamily:Font.semibold_font,color:Colors.textcolor}}>{item.description}</Text>
                           </View>}
                        </View>
                         )
    
                         }}
                     
                 />
                    
                </TouchableOpacity> 
              </KeyboardAwareScrollView>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    Container:{
        width:'100%',borderBottomWidth:1,
        borderBottomColor:Colors.gray_color,
        paddingBottom:mobileW*5/100
       
    }
})