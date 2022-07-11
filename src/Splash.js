import React, { useEffect, useState } from 'react'
import { ImageBackground, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { Colors, localStorage, config } from './Provider/utilslib/Utils'
import { useNavigation } from '@react-navigation/native';
import OneSignal from 'react-native-onesignal';
import Firebase from 'firebase';
import { firebaseprovider } from './Provider/FirebaseProvider';
export default function Splash(props) {
    const navigation = useNavigation();
    const [player_id, setplayer_id] = useState('');
    useEffect(() => {
        const timer = setTimeout(() => {
            this.authuser();
            firebaseprovider.getAllUsers()
            authenticateSession()
        }, 2000);
        OneSignal.init(config.onesignalappid, {
            kOSSettingsKeyAutoPrompt: true,
        });

        OneSignal.setLogLevel(6, 0);
        OneSignal.setLocationShared(true);
        OneSignal.inFocusDisplaying(2);
        OneSignal.addEventListener('ids', onIds.bind(this));
        return () => clearTimeout(timer);
    },[])

    const onIds = (device) => {
        console.log('Device inf111o:', device)
        config.player_id = device.userId;
        setplayer_id(device.userId)
        //    this.setState({player_id: device.userId});  
        //    player_id_me1 = device.userId;
        console.log('player_id', player_id)
    }

    authuser=()=>{
        Firebase.auth().setPersistence(Firebase.auth.Auth.Persistence.LOCAL)
        .then(() => {
          console.log('vikas');
          return Firebase.auth().signInAnonymously();
        })
        .catch((error) => {
            var errorCode = error.code;
             var errorMessage = error.message;
        });
    }


    const authenticateSession = async () => {

        let user_details = await localStorage.getItemObject('user_arr');
        console.log('user_details', user_details)
        if (user_details != null) {
            firebaseprovider.firebaseUserCreate();
            firebaseprovider.getMyInboxAllData();
            config.language = user_details.language_id;
            if ((user_details.user_type == 1) && (user_details.otp_verify == 1) && (user_details.profile_complete == 1)) {
                console.log('user_details.otp_verify', user_details.otp_verify)
                navigation.navigate('Home')
            } else if ((user_details.user_type == 2) && (user_details.otp_verify == 1) && (user_details.profile_complete == 1)) {
                navigation.navigate('Provider_Home')
            } else {
                navigation.navigate('Login')
            }
        } else {
            navigation.navigate('Login')
        }

    }
    return (
        <ImageBackground source={require('./icons/splash.png')} style={{ flex: 1 }}>
            <StatusBar hidden={false} StatusBarStyle='light-content' backgroundColor={Colors.statusbarcolor} translucent={false} networkActivityIndicatorVisible={true} />
            <SafeAreaView style={{ flex: 0, backgroundColor: '#fff' }} />
        </ImageBackground>
    )
}

const styles = StyleSheet.create({})
