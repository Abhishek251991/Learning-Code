import React, { Component } from 'react'
import { Text, TouchableOpacity, Image, View, BackHandler } from 'react-native'
import Container from '../Common/Container'
import { mobileH, mobileW, Colors, Font, Lang_chg, config } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
export default class Congratulations extends Component {
    _didFocusSubscription;
    _willBlurSubscription;
    constructor(props) {
        super(props)
        this.state = {

        }
        this._didFocusSubscription = props.navigation.addListener('focus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.handleBackPress)
        );
    }

    componentDidMount(){
        this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress)
    );
    }

    handleBackPress = () => {
        this.props.navigation.navigate('Instant_Job')
        return true;
    };
    render() {
        return (
            <Container backgroundColor={Colors.themecolor}>
                <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
                    <View style={{ width: '75%', alignSelf: 'center', marginTop: mobileW * 55 / 100, justifyContent: 'center', alignItems: 'center' }}>

                        <View style={{ width: '100%', height: mobileH * 37 / 100, alignItems: 'center', alignSelf: 'center', backgroundColor: Colors.whiteColor, borderRadius: mobileW * 6 / 100 }}>
                            <View style={{ width: '90%', alignSelf: 'center', marginTop: mobileH * 14 / 100 }}>
                                <Text style={{
                                    width: '80%', alignSelf: 'center', textAlign: 'center',
                                    fontSize: mobileW * 5 / 100, fontFamily: Font.bold_font, color: Colors.black_color
                                }} >{Lang_chg.congratulation[config.language]}</Text>
                                <Text style={{
                                    width: '90%', alignSelf: 'center', textAlign: 'center', fontFamily: Font.semibold_font,
                                    fontSize: mobileW * 4 / 100, color: Colors.black_color
                                }}>{Lang_chg.successtext[config.language]}</Text>
                                <Text style={{
                                    width: '70%', alignSelf: 'center', textAlign: 'center', fontFamily: Font.semibold_font,
                                    fontSize: mobileW * 4 / 100, color: Colors.black_color
                                }}>{Lang_chg.jobid[config.language]}</Text>
                                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Instant_Job') }} style={{ width: '35%', alignSelf: 'center', marginTop: mobileW * 4 / 100, borderRadius: mobileW * 1.5 / 100, paddingVertical: mobileW * 2 / 100, backgroundColor: Colors.themecolor }}>
                                    <Text style={{ textAlign: 'center', fontSize: mobileW * 3.5 / 100, fontFamily: Font.bold_font, color: Colors.whiteColor }}>{Lang_chg.donebtn[config.language]}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: '100%', position: 'absolute', alignSelf: 'center', top: mobileW * -25 / 100, alignSelf: 'center' }}>
                                <Image source={require('../icons/success.png')} resizeMode='contain' style={{ width: mobileW * 50 / 100, height: mobileH * 25 / 100, alignSelf: 'center' }} />
                            </View>
                        </View>


                    </View>


                </KeyboardAwareScrollView>
            </Container>
        )
    }
}
