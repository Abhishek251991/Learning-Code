import React, { Component } from 'react'
import { Text,Keyboard, View,TouchableOpacity,StyleSheet,Image,TextInput } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Provider_Contact_Us extends Component {
    constructor(props){
        super(props)
        this.state={
            email:'',
            mobile:'',
            message:'',
        }
    }
    render() {
        return (
            <Container backgroundColor='#fff'>
            <Header
            showback={true}
           title={Lang_chg.contactushead[config.language]}
           goBack={ ()=>{this.props.navigation.goBack()}}
          />
           <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
           <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
               <View style={{width:'95%',alignSelf:'center'}}>
               <View style={styles.container}>
                   <View style={{width:'9%',justifyContent:'center'}}>
                    <Image source={require('../icons/email.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}/>
                    </View>
                   <View style={{width:'1%',borderRightWidth:1,height:mobileW*7/100, borderRightColor:Colors.placeholderbordercolor}}>
                    </View>
                    <View style={{width:'90%',paddingHorizontal:mobileW*1/100}} >
                      <TextInput style={styles.TextInput}
                    placeholder={Lang_chg.email[config.language]}
                    onChangeText={(txt) => { this.setState({email: txt }) }}
                    value={this.state.email}
                    placeholderTextColor={Colors.placeholdertextcolor}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    keyboardType={'default'}
                      />
                    </View>
                   
                </View>
                <View style={styles.container}>
                   <View style={{width:'8%',justifyContent:'center'}}>
                    <Image source={require('../icons/flag.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}/>
                    </View>
                    <View style={{width:'10%',}}>
                     <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*4/100,color:Colors.black_color}}>+45</Text>
                    </View>
                   <View style={{width:'1%',borderRightWidth:1,height:mobileW*7/100, borderRightColor:Colors.placeholderbordercolor}}>
                    </View>
                    <View style={{width:'80%',paddingHorizontal:mobileW*1/100}} >
                      <TextInput style={styles.TextInput}
                    placeholder={Lang_chg.mobile[config.language]}
                    onChangeText={(txt) => { this.setState({mobile: txt }) }}
                    value={this.state.mobile}
                    placeholderTextColor={Colors.placeholdertextcolor}
                    maxLength={15}
                    returnKeyLabel='done'
                    returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                    keyboardType={'number-pad'}
                      />
                    </View>
                   
                </View>
               
                   <View style={{
                               flexDirection: 'row',
                               width:'95%',
                               alignSelf:'center',
                               marginTop: mobileW * 6 / 100,
                               alignSelf:'center',
                               height:mobileH*15/100,
                               borderBottomWidth:1,
                               paddingHorizontal:mobileW*1/100,
                               borderBottomColor:Colors.placeholderbordercolor,
                               }}>
                               <View style={{ width:'12%',alignItems:"center",paddingTop:mobileW*3/100
                               }}>
                             <Image style={{width:mobileW*5/100,height:mobileW*5/100,resizeMode:'contain',alignSelf:'center',}} source ={require('../icons/pen.png')}>
                             </Image> 
                             </View>
                             <View style={{width:'1%',borderRightWidth:1,height:mobileW*7/100, borderRightColor:Colors.placeholderbordercolor,alignItems:'center',marginTop:mobileW*2/100}}>
                             </View>
                                  <TextInput
                                   style={{
                                       width:'87%',
                                       fontSize: mobileW * 4 / 100,
                                       paddingHorizontal:mobileW*2/100,
                                       fontFamily: Font.regular_font,
                                       textAlignVertical:'top',
                                       color:Colors.black_color,
                                   }}
                                   onChangeText={(txt) => { this.setState({message: txt }) }}
                                  value={this.state.message}
                                      maxLength={250}
                                      multiline={true}
                                      
                                      placeholderTextColor={Colors.placeholdertextcolor} placeholder={Lang_chg.message[config.language]}
                               />
                               
                           </View>
                           <View style={{width:'100%',marginTop:mobileW*15/100}}>
                           <CustomButton
                        navigate={()=>{this.props.navigation.navigate('Provider_Settings')}}
                       title={Lang_chg.submitbtn[config.language]}
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
        paddingHorizontal:mobileW*3/100,
        paddingBottom:Platform.OS=='ios'?mobileW*2/100:0,
       
 },
    TextInput:{
        width:mobileW*100/100,
        fontSize:mobileW*4/100,
        fontFamily:Font.regular_font,
        color:Colors.textinputcolor,
        justifyContent:'center',
     },
   
})
