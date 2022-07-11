import React, { Component } from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage, consolepro, apifuntion, msgProvider, msgTitle, msgText } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import DatePicker from 'react-native-date-picker';
import CalendarPicker from 'react-native-calendar-picker';

const CurrentDate = new Date().toLocaleDateString();


// const CurrentDate1 = CurrentDate1.getDate();
let myDate = new Date();

function addHoursToDate(date, hours) {

  //   let test =  new Date(new Date(date).setHours(date.getHours() + hours));
  //  // return test.toLocaleTimeString();
  //   return test;
  var d = new Date(); // get current date
  d.setHours(d.getHours(), d.getMinutes() + 5, 0, 0);
  // this.setState(date: d, time: d.toLocaleTimeString());
  return d.toLocaleTimeString();
}
function addHoursToDate1(date, hours) {

  let test = new Date(new Date(date).setHours(date.getHours() + hours));
  return test.toLocaleTimeString();
  // return test;
}


const CurrentTime = myDate.toLocaleTimeString();
const CurrentTime1 = addHoursToDate(myDate, 2);
console.log(myDate)
console.log('new time', addHoursToDate(myDate, 2))
export default class Select_Date_Time extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dateshow: false,
      date_Time: '',
      selected: CurrentDate,
      manageTime: myDate,
    }
    console.log('CurrentTime', CurrentTime)
  }

  dateChange = (date) => {
    console.log('date', date)
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June",
      "July", "Aug", "Sept", "Oct", "Nov", "Dec"
    ];
    var selected_date_arr = date._d;
    var getDate = selected_date_arr.getDate();
    var getMonth = monthNames[selected_date_arr.getMonth()];
    var getYear = selected_date_arr.getFullYear();
    var start_date_time_2 = getDate + '-' + getMonth + '-' + getYear;
    console.log('start_date_time_2', start_date_time_2)
    this.setState({ selected: start_date_time_2 })
  }

  setDate = (pass_date) => {
    var new_time = pass_date.toLocaleTimeString();
    this.setState({ date_Time: new_time, manageTime: pass_date, dateshow: false })
  }

  continue_click = async () => {
    var post_detail1 = await localStorage.getItemObject('post_detail')
    var post_detail_location = await localStorage.getItemObject('post_detail_location')
    var post_images = await localStorage.getItemObject('post_images')
    var user_details = await localStorage.getItemObject('user_arr');
    var job_type = await localStorage.getItemObject('job_type');
   
    var date = new Date();
    var checkDate = new Date(new Date(date).setHours(date.getHours() + 4));
    var checkDate1 = checkDate.toLocaleTimeString();
    var chk = date.toLocaleDateString()
    console.log('this.state.selected', this.state.selected)
    console.log('this.state.date_Time', this.state.date_Time)
    console.log('checkDate', checkDate1)
    console.log('this.state.selected', this.state.selected)
    console.log('chk', chk)
    console.log('date_Time', this.state.date_Time)
    if (this.state.date_Time.length <= 0) {
      msgProvider.toast(msgText.emptyTime[config.language], 'center')
      return false;
    }
    if (this.state.selected == chk) {
      if (this.state.date_Time < checkDate1) {
        alert(msgText.timeCheck[config.language] + checkDate1)
        return false;
      }
    }
   


    var tendigitrandomnumber = Math.floor(1000000000 + Math.random() * 9000000000);
    let url = config.baseURL + "add_post.php";

    var data = new FormData();
    data.append('user_id', user_details.user_id)
    data.append('category_id', post_detail1.category_id)
    data.append("service_id", post_detail1.service_id)
    data.append("job_title", post_detail1.title)
    data.append("description", post_detail1.description)
    data.append("address_type", post_detail_location[0].adress_type)
    data.append("job_location", post_detail_location[0].job_location)
    data.append("job_insert_date", this.state.selected)
    data.append("job_insert_time", this.state.date_Time)
    data.append("job_number", tendigitrandomnumber)
    data.append("job_type", job_type)
    data.append("device_type", config.device_type)
    data.append("player_id", config.player_id)
    for (let i = 0; i < post_images.length; i++) {
      data.append('user_image[]', {
        uri: post_images[i].image,
        type: 'image/jpg',
        name: 'image.jpg'
      })
    }
    console.log('data', data);

    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj);
      if (obj.success == 'true') {
        localStorage.removeItem('post_detail')
        localStorage.removeItem('post_detail_location')
        localStorage.removeItem('post_images')
        localStorage.removeItem('job_type')
        this.props.navigation.navigate('Congratulations')
      } else {
        console.log('entered in else')
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(this.props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      console.log('entered in catch', error)
    });

    // this.props.navigation.navigate('Congratulations')
  }

  render() {

    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          goBack={() => { this.props.navigation.goBack() }}
          title={Lang_chg.selectdatehead[config.language]}
          showback={true}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '88%', alignSelf: 'center', marginTop: mobileW * 5 / 100 }}>
            <View style={{ width: '100%' }}>
              <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.8 / 100, color: Colors.black_color }}>{Lang_chg.selectdate[config.language]}</Text>
            </View>
            {/* <TouchableOpacity style={{width:'100%',marginTop:mobileW*4/100}}>
                  <Image source={require('../icons/calender1.png')} resizeMode='contain' style={{width:mobileW*94/100,height:mobileH*42/100,alignSelf:'center'}} />
                  
                 </TouchableOpacity> */}
            <CalendarPicker
              selectedDayColor='#00628D'
              selectedDayTextColor='#000'
              todayBackgroundColor='#02E9FF'
              todayTextStyle='#ffffff'
              onDateChange={(date) => this.dateChange(date)}
              weekdays={['S', 'M', 'T', 'W', 'T', 'F', 'S']}
              minDate={new Date()}

            />

            <DatePicker
              modal
              mode={"time"}
              date={new Date()}
              //  maximumDate={new Date()}
              // minimumDate={this.state.manageTime == new Date() ? new Date():this.state.date_Time}
             // minimumDate={this.state.manageTime > new Date() ? '': new Date()}
             is24hourSource={false} 
             open={this.state.dateshow}
              onConfirm={(date1) => { this.setDate(date1) }}
              onCancel={() => { this.setState({ dateshow: false }) }}
            />
            <View style={{ width: '100%', marginTop: mobileW * 5 / 100 }}>
              <Text style={{ fontFamily: Font.semibold_font, fontSize: mobileW * 3.8 / 100, color: Colors.black_color }}>{this.state.date}</Text>
            </View>
            <TouchableOpacity onPress={() => { this.setState({ dateshow: true }) }} style={{ width: '100%', marginTop: mobileW * 5 / 100, paddingBottom: mobileW * 6 / 100, justifyContent: 'space-between', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
              <View style={{ width: '10%', alignItems: 'center' }}>
                <Image source={require('../icons/clock.png')} resizeMode='contain' style={{ width: mobileW * 4 / 100, height: mobileW * 4 / 100 }} />
              </View>
              <View style={{ width: '80%', justifyContent: 'center' }}>
                <Text>{this.state.date_Time.length<=0 ?'Select time' : this.state.date_Time}</Text>
              </View>
              <View style={{ width: '10%', alignItems: 'center' }}>
                <Image source={require('../icons/down-arrow1.png')} resizeMode='contain' style={{ width: mobileW * 3.5 / 100, height: mobileW * 3.5 / 100 }} />
              </View>
            </TouchableOpacity>
            <View style={{ width: '100%', alignSelf: 'center', marginTop: mobileW * 30 / 100 }}>
              <CustomButton
                navigate={() => { this.continue_click() }}
                title={Lang_chg.postjobbtn[config.language]}
              />
            </View>
          </View>
        </KeyboardAwareScrollView>
      </Container>
    )
  }
}
