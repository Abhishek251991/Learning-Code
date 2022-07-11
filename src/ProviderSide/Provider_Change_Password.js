import React, { Component } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Keyboard,Image,TextInput, } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'

export default class Provider_Change_Password extends Component {
   constructor(props){
       super(props)
        this.state={
            oldPass:'',
            newPass:'',
            conPass:'',
            secureOldpass:true,
            secureNewpass:true,
            secureConpass:true,

        }
   }
    render() {
        return (
            <Container backgroundColor='#fff'>
                <Header
                 showback={true}
                  title={Lang_chg.changehead[config.language]}
                  goBack={()=>{this.props.navigation.goBack()}}
                />
               <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
               <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
                 
                  <View style={{width:'95%',alignSelf:'center'}}>
                      <View style={styles.container}>
                         <View style={{width:'8%',alignItems:'center',justifyContent:'center'}}>
                          <Image source={require('../icons/password.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}/>
                          </View>
                         <View style={{width:'1%',borderRightWidth:1,height:mobileW*7/100, borderRightColor:Colors.placeholderbordercolor}}>
                          </View>
                          <View style={{width:'70%',paddingHorizontal:mobileW*1/100}} >
                            <TextInput style={styles.TextInput}
                            secureTextEntry={this.state.secureOldpass}
                          placeholder={Lang_chg.oldpass[config.language]}
                          onChangeText={(txt) => { this.setState({ oldPass: txt }) }}
                          value={this.state.oldPass}
                          placeholderTextColor={Colors.placeholdertextcolor}
                          maxLength={15}
                          returnKeyLabel='done'
                          returnKeyType='done'
                          onSubmitEditing={() => { Keyboard.dismiss() }}
                          keyboardType={'default'}
                            />
                          </View>
                          <TouchableOpacity  onPress={() => { this.setState({ secureOldpass: !this.state.secureOldpass }) }} style={{width:'20%',alignItems:'center',justifyContent:'center',}}>
                           <Text style={{fontFamily:Font.regular_font,color:Colors.black_color,fontSize:mobileW*3.5/100}}>{this.state.secureOldpass ? 'Show' : 'Hide'}</Text>
                          </TouchableOpacity>
                      </View>
     
                      <View style={styles.container}>
                         <View style={{width:'8%',alignItems:'center',justifyContent:'center'}}>
                          <Image source={require('../icons/password.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}/>
                          </View>
                         <View style={{width:'1%',borderRightWidth:1,height:mobileW*7/100, borderRightColor:Colors.placeholderbordercolor}}>
                          </View>
                          <View style={{width:'70%',paddingHorizontal:mobileW*1/100}} >
                            <TextInput style={styles.TextInput}
                          placeholder={Lang_chg.newpass[config.language]}
                          onChangeText={(txt) => { this.setState({newPass: txt }) }}
                      value={this.state.newPass}
                          secureTextEntry={this.state.secureNewpass}
                          placeholderTextColor={Colors.placeholdertextcolor}
                          maxLength={15}
                          returnKeyLabel='done'
                          returnKeyType='done'
                          onSubmitEditing={() => { Keyboard.dismiss() }}
                          keyboardType={'default'}
                            />
                          </View>
                          <TouchableOpacity onPress={() => { this.setState({ secureNewpass: !this.state.secureNewpass }) }}
                                       style={{width:'20%',justifyContent:'center',alignItems:'center'}}>
                           <Text style={{fontFamily:Font.regular_font,color:Colors.black_color,fontSize:mobileW*3.5/100}}>{this.state.secureNewpass ? 'Show' : 'Hide'}</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={styles.container}>
                         <View style={{width:'8%',alignItems:'center',justifyContent:'center'}}>
                          <Image source={require('../icons/password.png')} style={{width:mobileW*5/100,height:mobileW*5/100}}/>
                          </View>
                         <View style={{width:'1%',borderRightWidth:1,height:mobileW*7/100, borderRightColor:Colors.placeholderbordercolor}}>
                          </View>
                          <View style={{width:'70%',paddingHorizontal:mobileW*1/100}} >
                            <TextInput style={styles.TextInput}
                          placeholder={Lang_chg.Conpss[config.language]}
                          onChangeText={(txt) => { this.setState({conPass: txt }) }}
                          value={this.state.conPass}
                          secureTextEntry={this.state.secureConpass}
                          placeholderTextColor={Colors.placeholdertextcolor}
                          maxLength={15}
                          returnKeyLabel='done'
                          returnKeyType='done'
                          onSubmitEditing={() => { Keyboard.dismiss() }}
                          keyboardType={'default'}
                            />
                          </View>
                          <TouchableOpacity onPress={() => { this.setState({ secureConpass: !this.state.secureConpass }) }}
                            style={{width:'20%',justifyContent:'center',alignItems:'center'}}>
                           <Text style={{fontFamily:Font.regular_font,color:Colors.black_color,fontSize:mobileW*3.5/100}}>{this.state.secureConpass? 'Show' : 'Hide'}</Text>
                          </TouchableOpacity>
                      </View>
                      <View style={{width:'100%',marginTop:mobileW*15/100}}>
                      <CustomButton
                         navigate={()=>{this.props.navigation.navigate('Provider_Settings')}}
                        title={Lang_chg.chngpassbtn[config.language]}
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
        paddingBottom:Platform.OS=='ios'?mobileW*2/100:0,
        
        
    },
    TextInput:{
        width:'100%',
        fontSize:mobileW*4/100,
        fontFamily:Font.semibold_font,
        color:Colors.textinputcolor,
        justifyContent:'center',
        
        
        
    },
   
})
