import React, { Component } from 'react'
import { Image, Text, Touchable, TouchableOpacity, View } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { mobileH, mobileW, Colors, Font, Lang_chg, config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Footer from '../Provider/Footer';
global.page_identifier = 'NA'
export default class My_Jobs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instant_job: true,
      big_project: false
    }
  }
  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header title={Lang_chg.my_jobHeader[config.language]} />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <TouchableOpacity onPress={() => { this.setState({ instant_job: true, big_project: false }), this.props.navigation.navigate('Instant_Job') }} style={{ width: '100%', marginTop: mobileW * 25 / 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Image source={require('../icons/instant_job.png')} style={{ width: mobileW * 25 / 100, height: mobileW * 25 / 100 }} />
            </View>
            <View style={{ width: '50%', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{
                width: '100%', textAlign: 'center', fontSize: mobileW * 5.5 / 100,
                fontFamily: Font.semibold_font, color: (this.state.instant_job == true ? Colors.themecolor : Colors.black_color)
              }} numberOfLines={1}>{Lang_chg.instant_job[config.language]}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { this.setState({ instant_job: false, big_project: true }), this.props.navigation.navigate('Big_Project'); page_identifier = 'My_jobs' }} style={{ width: '100%', marginTop: mobileW * 25 / 100, alignSelf: 'center', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ width: '50%', alignItems: 'center' }}>
              <Image source={require('../icons/big_projects.png')} style={{ width: mobileW * 25 / 100, height: mobileW * 25 / 100 }} />
            </View>
            <View style={{ width: '50%', alignItems: 'center', alignSelf: 'center' }}>
              <Text style={{
                width: '100%', textAlign: 'center', fontSize: mobileW * 5.5 / 100,
                fontFamily: Font.semibold_font, color: (this.state.big_project == true ? Colors.themecolor : Colors.black_color)
              }} numberOfLines={1}>{Lang_chg.big_project[config.language]}</Text>
            </View>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
        <Footer navigation={this.props.navigation} page={'My_Jobs'} user_id={1} />
      </Container>
    )
  }
}
