import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Keyboard, StyleSheet, TextInput } from 'react-native'
import Header from '../Common/Header'
import Container from '../Common/Container'
import CustomButton from '../Common/CustomButton'
import { mobileW, Colors, Font, Lang_chg, config, localStorage, msgText, consolepro, apifuntion, msgProvider, msgTitle } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class Cancel_Job_Reason extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: '',
      job_id: this.props.route.params.job_id,


    }
  }
  jobCancellation = async () => {
    let user_details = await localStorage.getItemObject('user_arr');
    if (this.state.message.length <= 0) {
      msgProvider.toast(msgText.emptyCancelMessage[config.language], 'center')
      return false;
    }
    var tendigitrandomnumber = Math.floor(1000000000 + Math.random() * 9000000000);
    let url = config.baseURL + "cancel_job.php";
    console.log(url)
    var data = new FormData();
    data.append('user_id', user_details.user_id)
    data.append('job_id', this.state.job_id)
    data.append('job_status', '5')
    data.append('cancellation_id', tendigitrandomnumber)
    data.append('cancellation_reason', this.state.message.trim())

    consolepro.consolelog("data", data)
    apifuntion.postApi(url, data).then((obj) => {
      console.log('obj', obj);
      if (obj.success == "true") {
        msgProvider.toast(msgText.jobCancellationMessage[config.language], 'center')
      this.props.navigation.goBack()

      } else {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        if (obj.active_status == msgTitle.deactivate[config.language] || obj.msg[config.language] == msgTitle.usererr[config.language]) {
          config.checkUserDeactivate(this.props.navigation);
        }
        return false;
      }
    }).catch((error) => {
      console.log("-------- error ------- " + error);

    });
  }

  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          goBack={() => { this.props.navigation.goBack() }}
          title={Lang_chg.cancle_Job_header[config.language]}
          showback={true}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableOpacity activeOpacity={1} style={{ flex: 1 }} onPress={() => { Keyboard.dismiss() }}>
            <View style={{ width: '88%', alignSelf: 'center' }}>
              <View style={{ width: '100%', marginTop: mobileW * 8 / 100 }}>
                <Text style={{ fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.black_color }}>{Lang_chg.message[config.language]}</Text>
              </View>
              <View style={{ width: '100%', borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }} >
                <TextInput style={styles.TextInput1}
                   onChangeText={(description) => this.setState({message:description})}
               
                  placeholderTextColor={Colors.placeholdertextcolor}
                  multiline={true}
                  maxLength={150}
                  returnKeyLabel='done'
                  returnKeyType='done'
                  onSubmitEditing={() => { Keyboard.dismiss() }}
                  keyboardType={'default'}
                />
              </View>
              <View style={{ width: '100%', alignSelf: 'center', marginTop: mobileW * 15 / 100 }}>
                <CustomButton
                  navigate={() => { this.jobCancellation() }}
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
  TextInput: {
    width: '100%',
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.regular_font,
    color: Colors.textinputcolor,
    marginBottom: mobileW * -6 / 100


  },
  TextInput1: {
    width: '100%',
    height: mobileW * 30 / 100,
    fontSize: mobileW * 4 / 100,
    fontFamily: Font.regular_font,
    color: Colors.textinputcolor,

  },
})
