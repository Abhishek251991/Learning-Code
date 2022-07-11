import React, { Component } from 'react'
import { Text, View,  BackHandler,  FlatList } from 'react-native'
import Container from '../Common/Container'
import {  mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Footer1 from '../Provider/Footer1';
import { Nodata_foundimage } from '../Provider/Nodata_foundimage'
export default class Provider_Earnings extends Component {

  constructor(props) {
    super(props)
    this.state = {
      total_earning_arr: [],
      total_earning:'',
     
    }
   
  }

  componentDidMount() {

  

    this.props.navigation.addListener('focus', payload => {
      this.get_data()
   });
  }

  get_data = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    console.log('userdetails.user_id', userdetails.user_id)
 
   
    let url = config.baseURL + "total_earning.php?user_id=" + userdetails.user_id;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        this.setState({  total_earning_arr: obj.total_earning_arr, total_earning:obj.total_earning})
        
      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(this.props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      consolepro.consolelog("-------- error ------- " + error);

    });
  }
    render() {
        return (
            <Container backgroundColor={Colors.whiteColor}>
                 <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                   <View style={{width:'100%',alignItems:'center',}}>
                     <Text style={{width:'50%',marginTop:mobileW*8/100,textAlign:'center',
                    fontSize:mobileW*5.5/100,fontFamily:Font.bold_font}}>{Lang_chg.earnings[config.language]}</Text>
                   </View>
                   {this.state.total_earning_arr != 'NA' &&      <View style={{width:'100%',marginTop:mobileW*6/100,paddingVertical:mobileW*12/100,backgroundColor:Colors.themecolor}}>
                       <Text style={{width:'50%',alignSelf:'center',textAlign:'center',
                    fontFamily:Font.semibold_font,fontSize:mobileW*6.5/100,color:Colors.whiteColor}}>{'Kr ' + config.numberWithCommas(this.state.total_earning)}</Text>
                    <Text style={{width:'50%',alignSelf:'center',textAlign:'center',
                    fontFamily:Font.semibold_font,fontSize:mobileW*4/100,color:Colors.whiteColor}}>{Lang_chg.total_earning[config.language]}</Text>
                   </View>}
                   <View style={{width:'100%'}}>
               {this.state.total_earning_arr != 'NA' &&       <FlatList
                      data={this.state.total_earning_arr}
                     contentContainerStyle={{paddingBottom:mobileW*20/100}}
                     renderItem={({item,index})=>{
                      return( 
                          <View style={{width:'100%',borderBottomWidth:1,borderBottomColor:Colors.gray_color,paddingVertical:mobileW*5/100}}>
                            <View style={{width:'90%',alignItems:'center',alignSelf:'center',flexDirection:'row'}}>
                               <View style={{width:'60%'}}>
                                 <Text style={{width:'100%',fontSize:mobileW*4/100,
                                fontFamily:Font.medium_font,color:Colors.black_color}}>{'#'+item.job_number}</Text>
                               </View>
                               <View style={{width:'40%'}}>
                                 <Text style={{width:'100%',fontFamily:Font.semibold_font,
                                fontSize:mobileW*3.8/100,color:Colors.green_Color,textAlign:'right'}}>{item.total_price + 'Kr'}</Text>
                               </View>
                            </View>
                            <View style={{width:'90%',alignSelf:'center'}}> 
                               <Text style={{width:'100%',fontSize:mobileW*3/100,
                            fontFamily:Font.medium_font,color:Colors.black_color,marginTop:mobileW*0.5/100}}>{item.transaction_datetime}</Text>
                            </View>
                          </View>
                        )
                    }}
                   /> }
                   {this.state.total_earning_arr == 'NA' &&  <Nodata_foundimage/>}
                      </View>
                 </KeyboardAwareScrollView>
                 <Footer1 navigation={this.props.navigation} page={'Provider_Earnings'} user_id={1} />
            </Container>
        )
    }
}
