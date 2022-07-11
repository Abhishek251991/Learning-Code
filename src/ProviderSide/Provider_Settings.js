import React, {Component } from 'react'
import { StyleSheet,Modal,Keyboard, Text,Switch, View,TouchableOpacity,Image,Alert } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import { mobileH,mobileW,Colors,Font,Lang_chg,config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'



export default class Provider_Settings extends Component {
    constructor(props){
        super(props)
       this.state={
        isEnabled:false,
        modalVisible:false
       }
    }
    LogoutPress = () => {
        Alert.alert(
            'Logout',
            'Are You Sure, You Want to logout', [{
                text: 'No',
                onPress: () => {

                },
                style: 'Yes',
            }, {
                text: 'Yes',
                onPress: () =>this.props.navigation.navigate('Login_Provider')
            }], {
            cancelable: false
        }
        ); // works best when the goBack is async 
        return true;
    };
    render() {
        return (
            <Container backgroundColor='#fff'>
             <Header
              showback={true}
               title={Lang_chg.settinghead[config.language]}
               goBack={ ()=>{this.props.navigation.goBack()}}
               />
               <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{width:'95%',alignItems:'center',paddingVertical:mobileW*1.5/100,paddingBottom:mobileW*3.5/100,alignSelf:'center', borderBottomWidth:1,borderBottomColor:Colors.gray_color}}>
                 <TouchableOpacity style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/notification_setting.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.notification[config.language]}</Text>
                   </View> 
                   <View style={{width:'10%',}}>
                   <Switch
                     trackColor={{ false: "#767577", true: "#767577" }}
                      thumbColor={this.state.isEnabled ? "#0B628D" : "#f4f3f4"}
                       onValueChange={()=>this.setState({isEnabled:!this.state.isEnabled})}
                        value={this.state.isEnabled}
                       />
                       </View>    
                 </TouchableOpacity>
   
                 <TouchableOpacity  onPress={ ()=>{this.props.navigation.navigate('Provider_Change_Password')}} style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/password.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.changepass[config.language]}</Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>    
                 </TouchableOpacity>
   
                 <TouchableOpacity onPress={ ()=>{this.props.navigation.navigate('Provider_Contact_Us')}} style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/contact_us_Setting.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.contactus[config.language]}</Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>    
                 </TouchableOpacity>
                 <TouchableOpacity onPress={ ()=>{this.props.navigation.navigate('Provider_Language')}} style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/language.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.language[config.language]}</Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>    
                 </TouchableOpacity>
                 <TouchableOpacity onPress={ ()=>{this.props.navigation.navigate('Provider_Faqs')}} style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/FAQ_setting.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.faq[config.language]}</Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>    
                 </TouchableOpacity>
   
                 <TouchableOpacity   onPress={() => this.props.navigation.navigate('Provider_Terms_Privacy', { contantpage: 0 })} style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/terms.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.termscondition[config.language]} </Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>   
                 </TouchableOpacity>
   
                 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Provider_Terms_Privacy', { contantpage: 1 })} style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/Privacy_Policy_setting.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.privacypolicy[config.language]}</Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>     
                 </TouchableOpacity>
                 <TouchableOpacity  onPress={() => this.props.navigation.navigate('Provider_Terms_Privacy', { contantpage: 2 })} style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/about_us1_setting.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>{Lang_chg.aboutus[config.language]}</Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>     
                 </TouchableOpacity>
   
              </View>
                <View style={{width:'95%',alignSelf:'center',paddingVertical:mobileW*4/100}}>
                <TouchableOpacity  style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/rate_App_setting.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>Rate App </Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>    
                 </TouchableOpacity>
                 <TouchableOpacity  style={styles.Container}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/share_app_setting.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>Share App </Text>
                   </View> 
                   <View style={{width:'10%',justifyContent:'center',alignItems:'center'}}>
                   <Image source={require('../icons/dropdown.png')} style={{width:mobileW*3.5/100,height:mobileW*3.5/100}} />
                       </View>   
                 </TouchableOpacity>
   
                 <TouchableOpacity style={styles.Container}  onPress={() => {this.setState({modalVisible:true}) }}>
                    <View style={{width:'10%'}}>
                        <Image source={require('../icons/log_out.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />
                   </View>
                   <View style={{width:'80%'}}>
                       <Text style={styles.title}>Logout </Text>
                   </View> 
                  
                 </TouchableOpacity>
                </View>
               
               </KeyboardAwareScrollView>
               <Modal
               animationType="slide"
               transparent={true}
               visible={this.state.modalVisible}
               onRequestClose={() => {
               }}>
                <View style={{ flex: 1, backgroundColor: '#00000aaa' }}>
                   <View style={{width:'90%',paddingVertical:mobileW*3/100,paddingHorizontal:mobileW*6/100,alignSelf:'center',position:'absolute',top:mobileH*40/100,
                   borderRadius:mobileW*2.5/100,backgroundColor:Colors.whiteColor}}>
                     <View style={{width:'100%',marginTop:mobileW*4/100}}>
                       <Text style={{width:'100%',color:Colors.black_color
                      ,fontFamily:Font.bold_font,fontSize:mobileW*5/100
                      }}>{Lang_chg.log_out[config.language]}</Text>

                     </View>

                     <View style={{width:'100%',marginTop:mobileW*2/100}}>
                       <Text style={{width:'100%',color:Colors.black_color
                      ,fontFamily:Font.medium_font,fontSize:mobileW*3.8/100
                      }}>{Lang_chg.sure_text[config.language]}</Text>

                     </View>
                     <View style={{width:'20%',marginTop:mobileW*8/100,flexDirection:'row',alignSelf:'flex-end',alignItems:'flex-end'}}>
                     <TouchableOpacity style={{width:'50%'}} onPress={()=>{this.setState({ modalVisible:false}),this.props.navigation.navigate('Login_Provider')}}>
                        <Text style={{width:'100%',fontFamily:Font.medium_font,fontSize:mobileW*3.5/100,
                      color:'red'}}>{Lang_chg.yes[config.language]}</Text> 
                      </TouchableOpacity>
                      <TouchableOpacity  style={{width:'50%'}} onPress={()=>{this.setState({ modalVisible:false})}}>
                       <Text style={{width:'100%',fontFamily:Font.medium_font,fontSize:mobileW*3.5/100,
                      color:Colors.themecolor,textAlign:'right'}}>{Lang_chg.no[config.language]}</Text>
                       </TouchableOpacity>
                     </View>
                   </View>
                </View>

             </Modal>
            </Container>
           
               
                
              
            
       )
    }
}
const styles = StyleSheet.create({
    Container:{
     width:'95%',
    flexDirection:'row',
    paddingVertical:mobileW*3/100,
    alignSelf:'center',

    },
    title:{
        fontFamily:Font.regular_font,
        fontSize:mobileW*4/100,
        color:Colors.black_color
    }
})