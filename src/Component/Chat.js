import React, { Component } from 'react'
import { StyleSheet, Text, View,Image,FlatList, TouchableOpacity } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { msgProvider, msgText, msgTitle, localStorage, apifuntion, config, Lang_chg, AppProvider, Mapprovider, Cameragallery, mediaprovider, validation, Font, Colors, mobileH, consolepro, notification, mobileW } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import Footer from '../Provider/Footer';
import { firebaseprovider}  from '../Provider/FirebaseProvider';
import firebase from '../Config1';
import NetInfo from '@react-native-community/netinfo';

global.userChatIdGlobal = '';
global.blockinbox = 'no';
global.messagedata = []
global.inboxoffcheck=0;

// const chat_data=[
// {image:require('../icons/img34.jpg'),'job_number':'#782961421','name':'Andrew Miller','service':'Cleaning','description':'I am also good','datetime':'05/11/2021, 07:00AM','count':'1','blockstatus':'no'},
// {image:require('../icons/img_25.jpg'),'job_number':'#782961419','name':'Jack Michael','service':'Plumber','description':'Can you give discount for this....','datetime':'04/11/2021, 10:00AM','blockstatus':'no'},
// {image:require('../icons/img26.jpg'),'job_number':'#782961319','name':'Robert James','service':'Plumber','description':'I am also good','datetime':'03/11/2021, 08:00AM','count':'1','blockstatus':'no'},
// {image:require('../icons/philip-martin.jpg'),'job_number':'#782961422','name':'Jasmine','service':'Electricians','description':'thank you so much sir','datetime':'02/11/2021, 09:00AM','blockstatus':'no'},
// ];
export default class Chat extends Component {
  constructor(props){
    super(props)
    this.state={ 
      // chat_data:chat_data,
      inboxmessage:[],
      inboxmessage2:[],
      searchBtn:false,
      search:'',
      user_id:'',
    }
}

componentDidMount(){
  NetInfo.fetch().then(state => {
  this.setState({isConnected:state.isConnected}) });
  //Subscribe to network state updates
  const unsubscribe = NetInfo.addEventListener(state => {
  this.setState({isConnected:state.isConnected})
  });

  this.props.navigation.addListener('focus', payload => {

      this.getMyInboxAllData1()

      this.showUserInbox()
       
  });

  this.getMyInboxAllData1()
  firebaseprovider.firebaseUserGetInboxCount();
  this.showUserInbox()
}
getMyInboxAllData1=async()=>{

  consolepro.consolelog('getMyInboxAllData123');
    var userdata= await localStorage.getItemObject('user_arr')
  //------------------------------ firbase code get user inbox ---------------
  if(userdata != null){
    // alert("himanshu");
    this.setState({user_id:userdata.user_id});
    var id='u_'+userdata.user_id;
    consolepro.consolelog('inboxoffcheck',inboxoffcheck)
    if(inboxoffcheck>0)
    {
      consolepro.consolelog('getMyInboxAllDatainboxoffcheck');
      var queryOffinbox = firebase.database().ref('users/'+id+'/myInbox/').child(userChatIdGlobal);
      // queryOffinbox.off('child_added');
      queryOffinbox.off('child_changed');
    }

     var queryUpdatemyinboxmessage = firebase.database().ref('users/'+id+'/myInbox/');
      queryUpdatemyinboxmessage.on('child_changed', (data)=>{
      consolepro.consolelog('inboxkachildchangemessage',data.toJSON())
      setTimeout(()=>{  this.showUserInbox() }, 3000);

     
 })
  var queryUpdatemyinboxadded = firebase.database().ref('users/'+id+'/myInbox/');
  queryUpdatemyinboxadded.on('child_added', (data)=>{
      consolepro.consolelog('inboxkaadded',data.toJSON())
      setTimeout(()=>{  this.showUserInbox() }, 3000);
  
      // firebaseprovider.firebaseUserGetInboxCount();
      })
  }else{
      this.setState({user_id:''});
  }
}

convertTimeAllFormat=(time11, format)=>
{
  consolepro.consolelog(' convertTimeAllFormat time11',time11)
  time11 = parseInt(time11);
 
  var date1 = new Date(time11);
  
  var curr_day = date1.getDay();
  var curr_date = date1.getDate();
  var curr_month = date1.getMonth(); //Months are zero based
  var curr_year = date1.getFullYear();
 
  var hours = date1.getHours();
  var minutes = date1.getMinutes();

 
  if(format == 12){
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes + ' ' + ampm;
  }else if(format == 24){
      var ampm = hours >= 12 ? 'PM' : 'AM';
      //hours = hours < 10 ? '0'+hours : hours;
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTime = hours + ':' + minutes;
  }else if(format == 'other'){
      var ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0'+minutes : minutes;
      var strTimeAll = hours + ':' + minutes + ' ' + ampm;
      var strTime = curr_date+'. '+m_names_sort[curr_month]+' '+curr_year+' '+strTimeAll;
  }else if(format == 'ago'){
      var strTime = timeSince(new Date(time11));
      //consoleProvider.log(new Date(time11));
 }else if(format == 'date_time'){
      var date = new Date(time11);
 
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 3600);
      if(interval <= 24) {
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
      }else{
          var curr_month = date1.getMonth()+1; //Months are zero based
          var curr_year = date1.getFullYear();
          var curr_year_small = String(curr_year);
          consolepro.consolelog('curr_year_small',curr_year_small);
              curr_year_small=curr_year_small.substring(2, 4);
          consolepro.consolelog('curr_year_small',curr_year_small);
          var strTime = curr_month+'/'+curr_date+'/'+curr_year_small;
      }
  }
  else if(format == 'date_time_full'){
      var date = new Date(time11);
      
      var seconds = Math.floor((new Date() - date) / 1000);
      var interval = Math.floor(seconds / 3600);
      if(interval <= 24) {
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTime = hours + ':' + minutes + ' ' + ampm;
      }else{
          var curr_month = date1.getMonth()+1; //Months are zero based
          var curr_year = date1.getFullYear();
          var curr_year_small = String(curr_year);
          consolepro.consolelog('curr_year_small',curr_year_small);
          curr_year_small=curr_year_small.substring(2, 4);
          consolepro.consolelog('curr_year_small',curr_year_small);
          
          var ampm = hours >= 12 ? 'PM' : 'AM';
          hours = hours % 12;
          hours = hours ? hours : 12; // the hour '0' should be '12'
          minutes = minutes < 10 ? '0'+minutes : minutes;
          var strTimeAll = hours + ':' + minutes + ' ' + ampm;
          
          var strTime = curr_month+'/'+curr_date+'/'+curr_year_small+' '+strTimeAll;
      }
  
  }
  
  return strTime;
}

showUserInbox=async()=>{
  consolepro.consolelog('showUserInboxmesssagepabgewala');  
  var userdata= await localStorage.getItemObject('user_arr')
  if(userdata != null)
  {
      var user_id=userdata.user_id
      var login_type=userdata.login_type
      inboxoffcheck=1
      var inbox=[] 
      consolepro.consolelog('FirebaseInboxJson get in-box121',FirebaseInboxJson);
      var len=FirebaseInboxJson.length;
      consolepro.consolelog('FirebaseInboxJson len',len);
      //$('.showConversationsCount').text(len);
      if(len>0){
        // $('#chat_meassage_inbox_list').html('');
        // $('#no_data_home').hide()
          FirebaseInboxJson.sort((a, b)=> {
              var x = a.lastMsgTime, y = b.lastMsgTime;
              return x > y ? -1 : x < y ? 1 : 0;
          });
          consolepro.consolelog('FirebaseInboxJsonmessage',FirebaseInboxJson);
          console.log('FirebaseInboxJsonmessage',FirebaseInboxJson);
          let other_user_id55=0
          // $.each(FirebaseInboxJson,function(index,keyValue)
          for(let k=0; k<FirebaseInboxJson.length; k++)
          // FirebaseInboxJson.map((keyValue)=>
          { 
          let  keyValue=FirebaseInboxJson[k]
          if(keyValue.user_id!=other_user_id55)
          {
              consolepro.consolelog('message user_id',keyValue);
              var other_user_id=keyValue.user_id;
              var blockstatus=keyValue.block_status
              other_user_id55=keyValue.user_id;
              consolepro.consolelog('other_user_id55',other_user_id55)
              consolepro.consolelog('other_user_id',other_user_id)      
              consolepro.consolelog('FirebaseUserJson',FirebaseUserJson);
              var user_data_other = FirebaseUserJson.findIndex(x => x.user_id==other_user_id);    
              consolepro.consolelog("user_data_other",user_data_other);
              if(user_data_other != -1){
              var userDataMe=FirebaseUserJson[user_data_other];
              
              consolepro.consolelog('userdata',userDataMe)
              var count=keyValue.count;
              var lastMessageType=keyValue.lastMessageType;
              var lastMsg=keyValue.lastMsg;
              var lastMsgTime=keyValue.lastMsgTime;
              var job_id=keyValue.job_id;
              var service_name=keyValue.service_name;
              var job_number=keyValue.job_number;
              
              consolepro.consolelog('lastMsg',lastMsg);
                  var userId=userDataMe.user_id;
                  if(userDataMe.image != 'NA')
                  {
                      var userImage=config.img_url3+userDataMe.image;
                  }
                  else{
                      var userImage=undefined;
                  }
              
                   var userName=userDataMe.name;
                   var onlineStatus=userDataMe.onlineStatus;
              
                  var lastMsgShow='';
                  if(lastMessageType == 'text'){
                      lastMsgShow=lastMsg;
                  }else if(lastMessageType == 'image'){
                      lastMsgShow='Photo';
                  }
              
                  var imgOnline='';

                  var countHtml='';
                  consolepro.consolelog('lastMsgTime',lastMsgTime);
                  if(lastMsgTime != ''){
                  lastMsgTime=this.convertTimeAllFormat(lastMsgTime,'date_time');
                      // lastMsgTime=lastMsgTime
                      countHtml='';
                  }else{
                      lastMsgTime='';
                      }
                  if(count>0){
                      countHtml=count;                
                  }  
                  let data5= {
                          'name':userName,
                          'images':userImage,
                          'message':lastMsgShow,
                          'time':lastMsgTime,
                          'count':count,
                          'other_user_id':other_user_id,
                          'blockstatus':blockstatus,
                          'job_id':job_id,
                          'job_number':job_number,
                          'service_name':service_name,
      
                      };
                      consolepro.consolelog('lastMsgShowlastMsgShow',lastMsgShow);
                      consolepro.consolelog('nilesh1 count',count);
                      consolepro.consolelog('upervalapushdataconsole',data5)
                      
                  inbox.push(data5) 
                  consolepro.consolelog('pushdataconsoleafter',inbox)
                  
              }
              consolepro.consolelog('inboxmessage',inbox)  
     
          }
        
      }}
      this.setState({inboxmessage:inbox,inboxmessage2:inbox,refresh:false}) 
  }

}

SearchFilterFunction=(text)=> {
  //passing the inserted text in textinput
  let data1=this.state.inboxmessage2
  const newData = data1.filter(function(item) {
    //applying filter for the inserted text in search bar
    const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
    const textData = text.toUpperCase();
    return itemData.indexOf(textData) > -1;
  });
  consolepro.consolelog('check_himanshu',newData)
  if(newData.length>0)
  {
    this.setState({
      inboxmessage: newData,
      search:text,
     
    });
  }
  else{
    this.setState({
      inboxmessage: 'NA',
      search:text,
     
    });
    this.setState({msg:'This Type of data is not available'})
  }
 
}

_onRefresh = () => {
  this.setState({refresh:true})
  this.showUserInbox() 
}

loadMore = () => {
  consolepro.consolelog('vikas')
 if(this.state.notification_arr!='NA')
 {
  this.setState({
    loadMoreloading:true, page: this.state.page + 1
  }, () => {
    this.getallnotification1()
  });
 }
}

renderFooter = () => {
  //it will show indicator at the bottom of the list when data is loading otherwise it returns null
  if(this.state.loadMoreloading==true)
  {
   return (
     <ActivityIndicator
       style={{ color: '#000' }}
     />
   );

 }
 else{
   return null
 }
};

renderitem = ({ item }) => {
  if(this.state.inboxmessage.length>=0 && item.name != '' && item.name != undefined)
  {
    consolepro.consolelog('item.image',item.images)
    consolepro.consolelog('item.name',item.name)
     consolepro.consolelog('titleee-', item)
  //    console.log('titleee-', item)
  return (
    <TouchableOpacity 
    onPress={()=>{
      this.checkfreindstatus(item)
    }} 
    style={{width:'100%',flexDirection:'row',marginTop:mobileW*2/100,paddingBottom:mobileW*3/100,borderBottomWidth:1,borderBottomColor:Colors.placeholderbordercolor}}>
       <View style={{width:'20%',alignItems:'center',marginTop:mobileW*6/100}}>
          {item.images==undefined?
                <Image resizeMode="cover" style={{width:mobileW*14/100,height:mobileW*14/100,borderRadius:mobileW*8/100}} source={require('../icons/profile_with_bg.png')}></Image> :
            item.images == null ?
                <Image resizeMode="cover" style={{width:mobileW*14/100,height:mobileW*14/100,borderRadius:mobileW*8/100}} source={require('../icons/profile_with_bg.png')}></Image>
            :
                <Image resizeMode="cover" style={{width:mobileW*14/100,height:mobileW*14/100,borderRadius:mobileW*8/100}} source={{uri:item.images}}></Image>
            }
           </View>
           <View style={{width:'52%',marginTop:mobileW*3/100}}>
               <View style={{width:'100%',marginBottom:mobileW*-1/100}}>
              <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*4/100,color:
              Colors.black_color}}>{item.job_number}</Text>
               </View>
               <View style={{width:'100%',marginBottom:mobileW*-1/100}}>
              <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*4/100,color:
              Colors.black_color}}>{item.name}</Text>
               </View>
               <View style={{width:'100%',}}>
              <Text style={{fontFamily:Font.semibold_font,fontSize:mobileW*3.5/100,color:
              Colors.themecolor}}>{item.service_name}</Text>
               </View>
               <View style={{width:'100%',}}>
              <Text style={{fontFamily:Font.regular_font,fontSize:mobileW*3.5/100,color:
              Colors.msg_color}}>{item.message}</Text>
               </View>
               </View>
               <View style={{width:'28%',alignItems:'center',justifyContent:'flex-end'}}>
               {item.count>=1 &&<View style={{width:mobileW*4/100,alignItems:'center',marginLeft:mobileW*13/100,height:mobileW*4/100,marginBottom:mobileW*1/100,borderRadius:mobileW*3/100,backgroundColor:'red'}}>
                       <Text style={{color:Colors.whiteColor,fontSize:mobileW*3/100,textAlign:'center',fontFamily:Font.bold_font}}>{item.count}</Text>

                   </View>}
                   <View style={{width:'100%'}}>
                     <Text style={{width:'100%',fontFamily:Font.regular_font,color:Colors.msg_color,fontSize:mobileW*2.5/100}}>{item.time}</Text>
                   </View>
               </View>

      </TouchableOpacity>
  )
  }
}



checkfreindstatus = async (item) => {
  // return false;
  this.props.navigation.navigate('Conversation', { 'chatdata': { 'other_user_id': item.other_user_id, 'other_user_name': item.name, 'image': item.images, 'blockstatus': item.blockstatus,'job_number':item.job_number,'service':item.service_name,'job_id':item.job_id } })

}
render()
{
  return (
      <Container backgroundColor={Colors.whiteColor}>
         <Header
           goBack={ ()=>{navigation.goBack()}}
         title={Lang_chg.chathead[config.language]}
         icon={<Image source={require('../icons/search.png')} style={{width:mobileW*5/100,height:mobileW*5/100}} />}
         />
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                <View style={{width:'100%'}}>
                { (this.state.inboxmessage.length<=0 || this.state.inboxmessage == 'NA') ?
                            <View style={{width:mobileW*90/100,height:mobileH*8/100,alignSelf:'center',borderWidth:1,marginTop:mobileH*2/100,borderRadius:10,padding:10}}>
                                <Text style={{textAlign:'center',fontSize:mobileW*4.5/100}}>No Data Found</Text>
                            </View>
                        :
                            <View style={{marginBottom:150}}>
                            <FlatList
                                style={{ marginTop: 10 }}
                                data={this.state.inboxmessage}
                                renderItem={this.renderitem}

                                keyExtractor={(item, index) => index.toString()}
                            />
                            </View>
                        }
                </View>
            </KeyboardAwareScrollView>
            <Footer navigation={this.props.navigation} page={'Chat'} user_id={1} />
       </Container>
  )

}
}

const styles = StyleSheet.create({})
