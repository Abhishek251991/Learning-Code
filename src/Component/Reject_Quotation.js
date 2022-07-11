import React, { Component } from 'react'
import { Text, View,Image,TextInput,StyleSheet } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default class Reject_Quotation extends Component {
    constructor(props){
        super(props)
        this.state={
            description:''
        }

    }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
            <Header
            goBack={ ()=>{this.props.navigation.goBack()}}
           title={Lang_chg.reject_quotation_header[config.language]}
          showback={true}
           />  
          <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
              <View style={{width:'90%',alignSelf:'center'}}>
              <View style={{width:'100%',paddingHorizontal:mobileW*1/100,marginTop:mobileW*8/100}}>
                   <Text style={{fontSize:mobileW*4/100,fontFamily:Font.semibold_font,color:Colors.black_color}}>{Lang_chg.title_description[config.language]}</Text>
                </View>
                <View style={{width:'15%',alignItems:'center',marginTop:mobileW*4/100}}>
                    <Image source={require('../icons/pen_black.png')} resizeMode='contain' style={{width:mobileW*4/100,height:mobileW*4/100}} />
                 </View>
                 <View style={{width:'95%',alignSelf:'center',borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}} >
                      <TextInput style={styles.TextInput1}
                       onChangeText={(txt) => { this.setState({description: txt }) }}
                      value={this.state.description}
                     placeholderTextColor={Colors.placeholdertextcolor}
                     multiline={true}
                     maxLength={150}
                     returnKeyLabel='done'
                     returnKeyType='done'
                    onSubmitEditing={() => { Keyboard.dismiss() }}
                   keyboardType={'default'}
                  />
                </View>
                <View style={{width:'100%',alignSelf:'center',marginTop:mobileW*10/100}}>
                <CustomButton
                  navigate={()=>{this.props.navigation.goBack()}}
                title={Lang_chg.submitbtn[config.language]}
              />
                </View>
              </View>
          </KeyboardAwareScrollView>
           </Container>
        )
    }
}
const styles = StyleSheet.create({
    TextInput:{
        width:'100%',
        fontSize:mobileW*4/100,
        fontFamily:Font.regular_font,
        color:Colors.textinputcolor,
        
         
        
      },
      TextInput1:{
        width:'100%',
        height:mobileW*20/100,
        fontSize:mobileW*4/100,
        fontFamily:Font.regular_font,
        color:Colors.textinputcolor,
        paddingHorizontal:mobileW*4/100
        
      },
})
