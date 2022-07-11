import React, { Component } from 'react'
import { Image, Text, Touchable, View } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
import { mobileH, mobileW, Colors, Font, Lang_chg, config, localStorage } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Footer from '../Provider/Footer';
global.page = 'NA';
export default class Post_Job extends Component {
  constructor(props) {
    super(props)
    this.state = {
      instant_jod: true,
      big_project: false,
    }

  }

  navigateToSelectCategory = async () => {
    if(this.state.instant_jod == true){
      localStorage.setItemObject('job_type','0')
    }else{
      localStorage.setItemObject('job_type','1')
    }
    this.props.navigation.navigate('Select_Category_job'); 
    page = 'Post_Job'
  }
  render() {
    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          title={Lang_chg.post_job_header[config.language]}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '90%', alignSelf: 'center' }}>
            <View style={{ width: '100%', alignItems: 'center', paddingVertical: mobileW * 12 / 100 }}>
              <Text style={{ width: '100%', fontSize: mobileW * 5.5 / 100, color: Colors.black_color, fontFamily: Font.bold_font, textAlign: 'center' }}>{Lang_chg.select_job[config.language]}</Text>
            </View>
            <View style={{ width: '100%', marginTop: mobileW * 3 / 100, justifyContent: 'space-between', flexDirection: 'row' }}>
              {this.state.instant_jod == true ? <View style={{ width: '48%', borderWidth: 3, borderColor: Colors.themecolor, height: mobileH * 27 / 100, justifyContent: 'center', backgroundColor: Colors.lighbordercolor, alignItems: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ instant_jod: true }), this.setState({ big_project: false }) }}>
                  <Image source={require('../icons/instant_job.png')} style={{ width: mobileW * 25 / 100, height: mobileW * 25 / 100 }} />
                  <Text style={{
                    width: '100%', color: Colors.black_color, fontFamily: Font.bold_font,
                    fontSize: mobileW * 5 / 100, textAlign: 'center'
                  }}>{Lang_chg.instant_job[config.language]}</Text>
                </TouchableOpacity>
              </View> : <View style={{ width: '44%', height: mobileH * 22 / 100, justifyContent: 'center', backgroundColor: Colors.lighbordercolor, alignItems: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ instant_jod: true }), this.setState({ big_project: false }) }}>
                  <Image source={require('../icons/instant_job.png')} style={{ width: mobileW * 25 / 100, height: mobileW * 25 / 100 }} />
                  <Text style={{
                    width: '100%', color: Colors.black_color, fontFamily: Font.bold_font,
                    fontSize: mobileW * 5 / 100, textAlign: 'center'
                  }}>{Lang_chg.instant_job[config.language]}</Text>
                </TouchableOpacity>
              </View>
              }

              {this.state.big_project == true ? <View style={{ width: '48%', borderWidth: 3, borderColor: Colors.themecolor, height: mobileH * 27 / 100, justifyContent: 'center', backgroundColor: Colors.lighbordercolor, alignItems: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ big_project: true }), this.setState({ instant_jod: false }) }}>
                  <Image source={require('../icons/big_projects.png')} style={{ width: mobileW * 25 / 100, height: mobileW * 25 / 100 }} />
                  <Text style={{
                    width: '100%', color: Colors.black_color, fontFamily: Font.bold_font,
                    fontSize: mobileW * 5 / 100, textAlign: 'center'
                  }}>{Lang_chg.big_project[config.language]}</Text>
                </TouchableOpacity>
              </View> : <View style={{ width: '44%', height: mobileH * 22 / 100, justifyContent: 'center', backgroundColor: Colors.lighbordercolor, alignItems: 'center' }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }} onPress={() => { this.setState({ big_project: true }), this.setState({ instant_jod: false }) }}>
                  <Image source={require('../icons/big_projects.png')} style={{ width: mobileW * 25 / 100, height: mobileW * 25 / 100 }} />
                  <Text style={{
                    width: '100%', color: Colors.black_color, fontFamily: Font.bold_font,
                    fontSize: mobileW * 5 / 100, textAlign: 'center'
                  }}>{Lang_chg.big_project[config.language]}</Text>
                </TouchableOpacity>
              </View>
              }
            </View>
            <View style={{ width: '100%', marginTop: mobileW * 14 / 100 }}>
              <CustomButton
                navigate={() => { this.navigateToSelectCategory()  }}
                title={Lang_chg.continuebtn[config.language]}
              />
            </View>
          </View>

        </KeyboardAwareScrollView>

        <Footer navigation={this.props.navigation} page={'Post_Job'} user_id={1} />

      </Container>
    )
  }
}
