import React, { Component } from 'react'
import { Text,Keyboard, View,TouchableOpacity,StyleSheet,Image,TextInput } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Provider_Language extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            name:''
            
        }
    }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
            <Header
            showback={true}
            title={Lang_chg.languagehead[config.language]}
            goBack={ ()=>{this.props.navigation.goBack()}}
          />
           <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
             <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
               <View style={{width:'95%',alignSelf:'center',marginTop:mobileW*5/100}}>
               <TouchableOpacity style={styles.container}>
                 <View style={{width:'9%',justifyContent:'center'}}>
                    <Image source={require('../icons/language.png')} style={{width:mobileW*6/100,height:mobileW*6/100}}/>
                    </View>
                    
                    <View style={{width:'91%',paddingHorizontal:mobileW*1/100}} >
                     
                       <Text style={styles.TextInput}>{Lang_chg.danish[config.language]}</Text>
                    </View>
                    
                   
                </TouchableOpacity>
                <TouchableOpacity style={styles.container1}>
                 <View style={{width:'9%',justifyContent:'center'}}>
                    <Image source={require('../icons/language.png')} style={{width:mobileW*6/100,height:mobileW*6/100}}/>
                    </View>
                    
                    <View style={{width:'85%',paddingHorizontal:mobileW*1/100}} >
                     
                       <Text style={styles.TextInput}>{Lang_chg.english[config.language]}</Text>
                    </View>
                    <View style={{width:'6%',justifyContent:'center',paddingTop:mobileW*4/100}}>
                    <Ionicons name='checkmark-sharp' size={20} style={{ alignSelf: 'center', color:Colors.themecolor, }} />
                    </View>
                   
                </TouchableOpacity>
                <View style={{width:'100%',marginTop:mobileW*15/100}}>
                  <CustomButton
                       navigate={()=>{this.props.navigation.navigate('Provider_Settings')}}
                       title={Lang_chg.selectbtn[config.language]}
                     />
                     </View>
                 </View>
               </TouchableOpacity>
           </KeyboardAwareScrollView>
    
            </Container>
        )
    }
}
const styles = StyleSheet.create({
  container:{
      width:'95%',
      flexDirection:'row',
      borderBottomWidth:1,
      borderBottomColor:Colors.placeholderbordercolor,
      justifyContent:'center',
      alignItems:'center',
      alignSelf:'center',
      marginTop:mobileW*7/100,
      paddingHorizontal:mobileW*1/100,
      paddingBottom:mobileW*2.5/100,
     
},
container1:{
width:'95%',
flexDirection:'row',
borderBottomWidth:1,
borderBottomColor:Colors.placeholderbordercolor,
justifyContent:'center',
alignItems:'center',
alignSelf:'center',
marginTop:mobileW*7/100,
paddingHorizontal:mobileW*1/100,
paddingBottom:mobileW*1/100


},
  TextInput:{
      width:mobileW*100/100,
      fontSize:mobileW*4/100,
      fontFamily:Font.regular_font,
      color:Colors.textinputcolor,
      justifyContent:'center',
   },
 
})