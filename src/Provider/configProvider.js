import { Platform, Alert } from "react-native";
import base64 from 'react-native-base64'
import { msgProvider, localStorage } from './utilslib/Utils';

const baseurl = 'http://youngdecade.org/2021/handyman/webservice/';
global.player_id_me1 = '123456';
//--------------------------- Config Provider Start -----------------------
class configProvider {
	baseURL = baseurl;
	video_url = baseurl + 'video/';
	img_url = baseurl + 'images/200X200/';
	img_url1 = baseurl + 'images/400X400/';
	img_url2 = baseurl + 'images/700X700/';
	img_url3 = baseurl + 'images/';
	login_type = 'app';
	onesignalappid = 'fe075087-0550-4a3b-8e96-b3c6c7a909c5'

	// mapkey = 'AIzaSyC_pKX39B5y2gTMJ9a9QeCjPGABBT6NkpY';
	// mapkey = 'AIzaSyCQi4c6T5sRp2wAiTw0UzbedJ9Dr8Fhe20';
	mapkey = 'AIzaSyA8piMVBD4O7W4z-eo4M046_20rk6iXdDg'; 
	maplanguage = 'en';
	language = 0;
	player_id = '123456';
	player_id_me = '123456';
	device_type = Platform.OS;
	loading_type = false;
	latitude = 22.7280;
	longitude = 75.8632;
	regepass = /\s/g;
	regemail = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	//regeMobile = /^(\+\d{1,3}[- ]?)?\d{10}$/;
	// regeMobile = /^\+(?=.{15})\d{10,15}_{0,5}$/;
	regeMobile = /[1-9][0-9]{9,14}/;
	strongPasswordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

	regwebsite = new RegExp("^(http|https)://", "i");
	headersapi = {
		'Authorization': 'Basic ' + base64.encode(base64.encode('mario') + ":" + base64.encode('carbonell')),
		Accept: 'application/json',
		'Content-Type': 'multipart/form-data',
		'Cache-Control': 'no-cache,no-store,must-revalidate',
		'Pragma': 'no-cache',
		'Expires': 0,
	}
	GetPlayeridfunctin = (player_id) => {
		player_id_me1 = player_id
	}

	checkUserDeactivate = async (navigation) => {
		msgProvider.toast('Your account deactivated', 'long')
		setTimeout(() => {
			this.AppLogout(navigation);
		}, 200);
		return false;
	}
	AppLogout = async (navigation) => {
		console.log('AppLogout');
		//----------------------- if get user login type -------------
		var userdata = await localStorage.getItemObject('user_arr');
		var password = await localStorage.getItemString('password');
		var email = await localStorage.getItemString('email');
		var remember_me = await localStorage.getItemString('remember_me');
		var language = await localStorage.getItemString('language');
		console.log(password);
		console.log(email);
		console.log(remember_me);
		console.log(language);
	//	console.log('userdata.login_type',userdata.login_type);

		if (userdata != null) {
			if (userdata.login_type == 'app') {
				localStorage.clear();
				if (remember_me == 'yes') {
					localStorage.setItemString('password', password);
					localStorage.setItemString('email', email);
					localStorage.setItemString('remember_me', remember_me);
					localStorage.setItemString('language', JSON.stringify(language));
				} else {
					// localStorage.setItemString('password', password);
					// localStorage.setItemString('email', email);
					// localStorage.setItemString('language', JSON.stringify(language));
				}
				navigation.navigate('Login');

			} else if (userdata.login_type == 1) {
				console.log('face boook login');
				LoginManager.logOut();
				localStorage.clear();
				navigation.navigate('Login')
			} else if (userdata.login_type == 2) {
				console.log('google login')
				try {
					await GoogleSignin.revokeAccess();
					await GoogleSignin.signOut();
				} catch (error) {
					alert(error);
				}
				localStorage.clear();
				navigation.navigate('Login')
			} else if (userdata.login_type == 5) {
				console.log('face boook login')
			}
		} else {
			console.log('user arr not found');
		}
	}
	loginFirst1(props, txt) {
		console.log('navigation', props)
		console.log('navigation', props.navigation)
		Alert.alert(
			msgTitle.information[config.language],
			txt,
			[
				{
					text: msgTitle.ok[config.language],
					onPress: () => {
						this.AppLogout()

					},
				},
			],
			{ cancelable: false },
		);
	}
	logintfirst = async (navigation) => {
		console.log('AppLogout');
		//----------------------- if get user login type -------------
		var userdata = await localStorage.getItemObject('user_arr');
		if (userdata != null) {
			if (userdata.login_type == 'app') {
				localStorage.clear();

				navigation.navigate('Login');

			} else if (userdata.login_type == 'facebook') {
				console.log('face boook login');
				LoginManager.logOut();
				localStorage.clear();
				navigation.navigate('Login')
			} else if (userdata.login_type == 'google') {
				console.log('google login')
				try {
					await GoogleSignin.revokeAccess();
					await GoogleSignin.signOut();
				} catch (error) {
					alert(error);
				}
				localStorage.clear();
				navigation.navigate('Login')
			} else if (userdata.login_type == 5) {
				console.log('face boook login')
			}
		} else {
			console.log('user arr not found');
		}
	}

	guestUserCheck = async (navigation, Pagename) => {
		var user_details = await localStorage.getItemObject('user_arr');
		console.log('user_details',user_details)
		if (user_details == null) {
			this.movetoLogin(navigation)
		} else {
			navigation.navigate(Pagename)
		}
	}

	movetoLogin = (navigation) => {


		Alert.alert(
			'Alert',
			"Please Login First", [{
				text: 'No',
				onPress: () => console.log('Cancel Pressed'),
			}, {
				text: 'yes',
				onPress: () => { navigation.navigate('Login') }
			}], {
			cancelable: false
		}
		); // works best when the goBack is async
		return true;
	};

	numberWithCommas = (number) => {
		// console.log('number',number)
		// var x = number;
		var x = number.toString();
		var lastThree = x.substring(x.length - 3);
		var otherNumbers = x.substring(0, x.length - 3);
		if (otherNumbers != '')
			lastThree = ',' + lastThree;
		var res = otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
		return res;
	}

};
//--------------------------- Config Provider End -----------------------

export const config = new configProvider();





