import React, { Component } from 'react'
import { Text, View,FlatList,TouchableOpacity,Image } from 'react-native'
import Container from '../Common/Container'
import { mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Header from '../Common/Header';

const allJobs_data=[
    {'image':require('../icons/philip-martin.jpg'),'name':'Alicia Jonathan','heading':'Cleaning','status':'Instant Jobs',
    'description':'Bathroom Cleaning','datetime':'09/12/2021, 11:00AM','id':'#7829261420','bookingdate':'07/12/2021, 12:00PM','navigate':'Job_Assign_Details'},
    {'image':require('../icons/img26.jpg'),'name':'Anderson','heading':'Laundry','status':'Big Projects',
    'description':'Casual Wear','datetime':'07/12/2021, 10:00AM','id':'#7829261419','bookingdate':'05/12/2021, 02:00PM',},
    {'image':require('../icons/img_25.jpg'),'name':'Jack Michael','heading':'Cleaning','type':'Mens Dress ','status':'Instant Jobs',
    'description':'Kitchen Cleaning','datetime':'04/12/2021, 09:00AM','id':'#7829261417','bookingdate':'03/12/2021, 04:00PM','navigate':'Job_End_Details'},
    {'image':require('../icons/img_28.png'),'name':'Henry Michael','heading':'Laundry','type':'Mens Dress ','status':'Instant Jobs',
    'description':'Mens Dress','datetime':'03/12/2021, 08:00AM','id':'#7829261416','bookingdate':'01/12/2021, 01:00PM','navigate':'Job_Cancel_Details'},
];
export default class Provider_InprogressJobs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openJobs: true,
      pastJobs: false,
      Instant_Job_arr: [],
      past_jobs_arr: [],
    };
  }

  componentDidMount() {

    this.props.navigation.addListener('focus', payload => {
      this.get_data()
      this.get_data_past_jobs()

    });
  }



  get_data = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "get_user_jobs.php?user_id=" + userdetails.user_id + "&job_type=" + 0;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        this.setState({ Instant_Job_arr: obj.instant_jobs_arr })
        // let home_arr = obj.user_home_arr

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

  get_data_past_jobs = async () => {
    let userdetails = await localStorage.getItemObject('user_arr');
    let url = config.baseURL + "get_user_past_jobs.php?user_id=" + userdetails.user_id + "&job_type=" + 0;
    consolepro.consolelog(url)
    apifuntion.getApi(url).then((obj) => {
      consolepro.consolelog('obj', obj);
      if (obj.success == "true") {
        this.setState({ past_jobs_arr: obj.past_jobs_arr })
        // let home_arr = obj.user_home_arr

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
               <Header
            showback={true}
            title={Lang_chg.inprogressJobs_header[config.language]}
            goBack={ ()=>{this.props.navigation.goBack()}}
          />
           <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
            <View style={{width:'95%',alignSelf:'center'}}>
            <FlatList
                data={allJobs_data}
                renderItem={({item,index})=>{
                    return(
                        <TouchableOpacity style={{width:'100%',alignSelf:'center',borderWidth:1,borderColor:Colors.themecolor
                        ,paddingVertical:mobileW*2/100,marginTop:mobileW*3/100,borderRadius:mobileW*1.5/100}}>
                             <View style={{width:'90%',alignSelf:'center',flexDirection:'row'}}>
                                <View style={{width:'15%'}}>
                                  <Image source={item.image} style={{width:mobileW*10/100,height:mobileW*10/100,borderRadius:mobileW*7/100}}  />
                               </View>
                               <View style={{width:'55%',alignSelf:'center',marginLeft:mobileW*-1/100}}>
                                   <Text style={{width:'100%',fontFamily:Font.semibold_font,color:Colors.black_color
                               ,fontSize:mobileW*4/100}}>{item.name}</Text>
                              </View> 
                              <View style={{width:'30%',flexDirection:'row',alignItems:'center',marginLeft:mobileW*6/100}}>
                                <Text style={{width:'100%',textAlign:'center',fontFamily:Font.semibold_font,color:Colors.themecolor,fontSize:mobileW*3.5/100}}>{item.status}</Text>
                                </View>
                             </View>
                          <View style={{width:'90%',alignSelf:'center',marginTop:mobileW*2/100}}>
                           <Text style={{width:'100%',fontSize:mobileW*3.8/100,fontFamily:Font.semibold_font
                               ,color:Colors.black_color}}>{item.heading}</Text>
                             
                             </View>
                          <View style={{width:'92%',flexDirection:'row',marginTop:mobileW*1/100}}>
                              <View style={{width:'15%',alignItems:'center',justifyContent:'center',}}>
                                <Image source={require('../icons/job.png')} resizeMode='contain' style={{width:mobileW*4/100,height:mobileW*4/100}} />
                              </View>
                              <View style={{width:'85%',marginLeft:mobileW*-2/100,}}>
                                  <Text style={{width:'100%',fontFamily:Font.regular_font,
                               fontSize:mobileW*3.5/100,color:Colors.black_color}}>{item.description}</Text>
                              </View>

                          </View>
                          <View style={{width:'92%',alignItems:'center',marginTop:mobileW*2/100,paddingBottom:mobileW*3/100,borderBottomColor:Colors.placeholderbordercolor,alignSelf:'center',flexDirection:'row',}}>
                              <View style={{width:'10%',justifyContent:'center',paddingHorizontal:mobileW*1/100}}>
                                <Image source={require('../icons/time_date.png')} resizeMode='contain' style={{width:mobileW*4/100,height:mobileW*4/100}} />
                              </View>
                              <View style={{width:'90%',marginLeft:mobileW*-1.8/100}}>
                                  <Text style={{width:'100%',fontFamily:Font.regular_font,
                               fontSize:mobileW*3.5/100,color:Colors.black_color}}>{item.datetime}</Text>
                              </View>
                           
                          </View>
                          <View style={{ width:'90%',alignSelf:'center',borderStyle: 'dashed', borderWidth: 0.9,
                          borderRadius: 1,borderColor:Colors.dash_border_color,}}></View>
                          
                          <View style={{width:'92%',flexDirection:'row',paddingTop:mobileW*2/100,alignSelf:'center'}}>
                           <View style={{width:'40%',paddingHorizontal:mobileW*2/100}}>
                             <Text style={{fontSize:mobileW*3.5/100,fontFamily:Font.regular_font,color:Colors.themecolor}}>{item.id}</Text>
                           </View>
                           <View style={{width:'60%',}}>
                             <Text style={{fontSize:mobileW*3.0/100,textAlign:'right',fontFamily:Font.regular_font,color:Colors.msg_color}}>{item.bookingdate}</Text>
                           </View>
                       
                          </View>
                         
                       </TouchableOpacity>
                    )
                }}
               /> 
            </View>
           </KeyboardAwareScrollView>
            </Container>
        )
    }
}
