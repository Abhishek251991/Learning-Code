import React, { Component } from 'react'
import { Modal, BackHandler, PermissionsAndroid, SafeAreaView, Platform, Dimensions, Text, View, StyleSheet, TouchableOpacity, TouchableHighlight, Image } from 'react-native'
import { Colors, mobileW, mobileH, mediaprovider, config, localStorage, localimag, Currentltlg, Lang_chg, Font, apifuntion, consolepro, msgTitle, msgProvider, msgText } from '../Provider/utilslib/Utils';
import Icon2 from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Callout, Marker, PROVIDER_GOOGLE, } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Container from '../Common/Container'
import Header from '../Common/Header'
import CustomButton from '../Common/CustomButton'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export default class Select_Location extends Component {
    _didFocusSubscription;
    _willBlurSubscription;
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            modalVisible1: false,
            latitude: config.latitude,
            longitude: config.longitude,
            latdelta: '0.0922',
            longdelta: '0.0421',
            isConnected: true,
            addressbar: false,
            addressbar2: false,
            addressselected: 'Search',
            makermove: 0,
            username: '',
            address: '',
            business_arr: [],
            markers1: '',
            mapFocus: true,
            data3: '',
            markers: [{
                title: 'hello',
                coordinates: {
                    latitude: 22.7533,
                    longitude: 75.8937,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            },
            {
                title: 'hello',
                coordinates: {
                    latitude: 22.7244,
                    longitude: 75.8839,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            },
            {
                title: 'hello',
                coordinates: {
                    latitude: 22.7355,
                    longitude: 75.9074,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },
            },
            {
                title: 'hello',
                coordinates: {
                    latitude: 22.7617,
                    longitude: 75.9273,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },

            },
            {
                title: 'hello',
                coordinates: {
                    latitude: 22.7196,
                    longitude: 75.8577,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },

            },
            {
                title: 'hello',
                coordinates: {
                    latitude: 22.7193,
                    longitude: 75.8694,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                },

            },


            ]
        };
        this.getlatlong();
        this._didFocusSubscription = props.navigation.addListener('focus', payload =>
            BackHandler.addEventListener('hardwareBackPress', this.backPress)
        );
    }

    componentDidMount() {
        this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
            BackHandler.removeEventListener('hardwareBackPress', this.backPress)
        );

    }




    getcurrentlatlogn = async () => {
        let data = await Currentltlg.requestLocation()
        let latitude = data.coords.latitude;
        let longitude = data.coords.longitude;
        this.setState({ latitude: latitude, longitude: longitude })
    }

    callLocation = async (that) => {
        this.setState({ loading: true })
        localStorage.getItemObject('position').then((position) => {
            console.log('position', position)
            if (position != null) {
                var pointcheck1 = 0
                this.getalldata(position)
                Geolocation.getCurrentPosition(
                    //Will give you the current location
                    (position) => {

                        localStorage.setItemObject('position', position)
                        this.getalldata(position);
                        pointcheck1 = 1
                    },
                    (error) => {
                        let position = { 'coords': { 'latitude': this.state.latitude, 'longitude': this.state.longitude } }

                        this.getalldata(position)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
                );
                that.watchID = Geolocation.watchPosition((position) => {
                    //Will give you the location on location change
                    console.log('data', position);

                    if (pointcheck1 != 1) {
                        localStorage.setItemObject('position', position)
                        this.getalldata(position)
                    }

                });

            }
            else {
                console.log('helo gkjodi')
                var pointcheck = 0
                Geolocation.getCurrentPosition(
                    //Will give you the current location
                    (position) => {

                        localStorage.setItemObject('position', position)

                        this.getalldata(position)
                        pointcheck = 1
                    },
                    (error) => {
                        let position = { 'coords': { 'latitude': this.state.latitude, 'longitude': this.state.longitude } }

                        this.getalldata(position)
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
                );
                that.watchID = Geolocation.watchPosition((position) => {
                    //Will give you the location on location change
                    console.log('data', position);

                    if (pointcheck != 1) {

                        localStorage.setItemObject('position', position)
                        this.getalldata(position)
                    }

                });
            }
        })
    }

    getlatlong = async () => {
        console.log('granted123456', PermissionsAndroid.RESULTS.GRANTED)
        let permission = await localStorage.getItemString('permission')
        if (permission != 'denied') {
            var that = this;
            //Checking for the permission just after component loaded
            if (Platform.OS === 'ios') {
                this.callLocation(that);
            } else {
                // this.callLocation(that);
                async function requestLocationPermission() {
                    try {
                        const granted = await PermissionsAndroid.request(
                            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
                            'title': 'Location Access Required',
                            'message': 'This App needs to Access your location'
                        }
                        )
                        console.log('granted', PermissionsAndroid.RESULTS.GRANTED)
                        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                            that.callLocation(that);
                        } else {
                            let position = { 'coords': { 'latitude': that.state.latitude, 'longitude': that.state.longitude } }
                            localStorage.setItemString('permission', 'denied')
                            that.getalldata(position)
                        }
                    } catch (err) { console.warn(err) }
                }
                requestLocationPermission();
            }
        } else {
            console.log('granted123456789', PermissionsAndroid.RESULTS.GRANTED)
            let position = { 'coords': { 'latitude': this.state.latitude, 'longitude': this.state.longitude } }
            this.getalldata(position)
        }
    }

    getalldata = (position) => {
        let longitude = position.coords.longitude
        let latitude = position.coords.latitude
        console.log('positionlatitude', latitude)
        console.log('positionlongitude', longitude)
        this.setState({ latitude: latitude, longitude: longitude, loading: false })
    }

    setMapRef = (map) => {
        this.map = map;
    }
    getCoordinates = (region) => {
        return ({
            latitude: parseFloat(this.state.latitude),
            longitude: parseFloat(this.state.longitude),
            latitudeDelta: parseFloat(this.state.latdelta),
            longitudeDelta: parseFloat(this.state.longdelta),
        }
        );
    }

    getadddressfromlatlong = (event) => {
        // consolepro.consolelog("event",event);
        // return false;
        // if (this.state.makermove != 0) {
        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + event.latitude + ',' + event.longitude + '&key=' + config.mapkey + '&language=' + config.maplanguage)

            .then((response) => response.json())
            .then((resp) => {
                let responseJson = resp.results[0]
                console.log('responseJson', responseJson)
                let city = '';
                let administrative_area_level_1 = '';
                for (let i = 0; i < responseJson.address_components.length; i++) {
                    if (responseJson.address_components[i].types[0] == "locality") {
                        city = responseJson.address_components[i].long_name
                        break;
                    }
                    else if (responseJson.address_components[i].types[0] == "administrative_area_level_2") {
                        city = responseJson.address_components[i].long_name
                    }

                }
                for (let j = 0; j < responseJson.address_components.length; j++) {
                    if (responseJson.address_components[j].types[0] == "administrative_area_level_1") {
                        administrative_area_level_1 = responseJson.address_components[j].long_name
                    }

                }
                let details = responseJson
                let data2 = { 'latitude': details.geometry.location.lat, 'longitude': details.geometry.location.lng, 'address': details.formatted_address, 'city': city, 'administrative_area_level_1': administrative_area_level_1 }

                this.GooglePlacesRef && this.GooglePlacesRef.setAddressText(details.formatted_address)
                this.setState({ latdelta: this.state.latdelta, longdelta: this.state.longdelta, latitude: event.latitude, longitude: event.longitude, addressselected: details.formatted_address })
                this.setState({ data3: data2 })
                consolepro.consolelog('data3', this.state.data3)
                // addplace = data2
                //return this.props.locationget(data2);
            })

        // }
        // else {
        //     this.setState({ makermove: 1 })
        // }

    }

    continueClick = () => {
        consolepro.consolelog('data3', this.state.data3)
        addplace = this.state.data3
        if (addplace.length <= 0) {
            msgProvider.toast(msgText.emptyAddress[config.language], 'center')
            return false;
        }
        this.setState({ addplace: this.state.data3 })
        //addplace = data3
        this.props.navigation.goBack()

    }

    backPress = () => {
        //addplace = 'NA'
        this.props.navigation.navigate('Addplace')
        return true;
        // if(addplace == addplace){
        //     this.props.navigation.navigate('Addplace')
        //     return true;
        // }else{
        //     addplace = 'NA'
        //     this.props.navigation.navigate('Addplace')
        //     return true;
        // } 

    }


    onMarkerDragEnd = (coord, index) => {
        consolepro.consolelog('coord', coord)
        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();
        this.setState(prevState => {
            const markers = [...this.state.markers1];
            markers[index] = {
                ...markers[index],
                position: { lat, lng }
            };
            return { markers };
        });
        consolepro.consolelog('this.state.markers1', this.state.markers1)
    };


    render() {
        return (
            <View style={styles.container}>
                <SafeAreaView style={{ flex: 0, backgroundColor: Colors.statusbarcolor }} />
                <Header
                    goBack={() => { this.props.navigation.goBack() }}
                    title={Lang_chg.Select_location_header[config.language]}
                    showback={true}
                />
                <View style={{ flex: 1 }}>
                    <MapView
                        followsUserLocation={true}
                        style={{ flex: 1 }}
                        region={
                            this.getCoordinates(this)
                        }
                        zoomEnabled={true}
                        provider={PROVIDER_GOOGLE}
                        minZoomLevel={2}
                        maxZoomLevel={20}
                        rotateEnabled={true}
                        pitchEnabled={true}
                        showsUserLocation={true}
                        userLocationPriority='high'
                        moveOnMarkerPress={true}
                        showsMyLocationButton={false}
                        showsScale={true} // also this is not working
                        showsCompass={true} // and this is not working
                        showsPointsOfInterest={true} // this is not working either
                        showsBuildings={true} // and finally, this isn't working either
                        onMapReady={this.onMapReady}
                        // onRegionChangeComplete={(event) => { this.getadddressfromlatlong(event) }}
                        draggable={true}
                        ref={this.setMapRef}
                        //onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                        onPress={(event) => { this.getadddressfromlatlong(event.nativeEvent.coordinate) }}
                    //    onPress={(e) => {consolepro.consolelog(e.nativeEvent)}}


                    >

                        <Marker.Animated
                            coordinate={{
                                latitude: parseFloat(this.state.latitude),
                                longitude: parseFloat(this.state.longitude),
                                latitudeDelta: parseFloat(this.state.latdelta),
                                longitudeDelta: parseFloat(this.state.longdelta),
                            }}
                            isPreselected={true}
                            onDragEnd={(e) => { console.log("dragEnd", (e.nativeEvent.coordinate)) }}
                            draggable
                            // onDragend={(t, map, coord) => this.onMarkerDragEnd(coord, index)}
                            title={this.state.username != null ? this.state.username : 'Guest user'}
                            description={'Your are here location'}

                        >
                            <Image source={require('../icons/location_profile.png')} style={{ height: 40, width: 40, resizeMode: 'contain', }} />
                        </Marker.Animated>

                    </MapView>
                    <View style={{ position: 'absolute', width: '100%' }}>
                        <View style={{ flex: 1, }}>
                            <GooglePlacesAutocomplete
                                placeholder={Lang_chg.search_location[config.language]}
                                minLength={1} // minimum length of text to search
                                autoFocus={false}
                                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                                listViewDisplayed='auto' // true/false/undefined
                                fetchDetails={true}
                                focus={this.state.mapFocus}
                                ref={(instance) => { this.GooglePlacesRef = instance }}
                                renderDescription={row => row.description} // custom description render
                                onPress={(data, details = null) => {
                                    let responseJson = details
                                    let city = '';
                                    let administrative_area_level_1 = '';
                                    for (let i = 0; i < responseJson.address_components.length; i++) {
                                        if (responseJson.address_components[i].types[0] == "locality") {
                                            city = responseJson.address_components[i].long_name
                                            break;
                                        }
                                        else if (responseJson.address_components[i].types[0] == "administrative_area_level_2") {
                                            city = responseJson.address_components[i].long_name
                                        }

                                    }
                                    for (let j = 0; j < responseJson.address_components.length; j++) {
                                        if (responseJson.address_components[j].types[0] == "administrative_area_level_1") {
                                            administrative_area_level_1 = responseJson.address_components[j].long_name
                                        }

                                    }
                                    this.setState({ 'latitude': details.geometry.location.lat, 'longitude': details.geometry.location.lng, 'address': details.formatted_address, })

                                    let data2 = { 'latitude': details.geometry.location.lat, 'longitude': details.geometry.location.lng, 'address': details.formatted_address, 'city': city, 'administrative_area_level_1': administrative_area_level_1 }
                                    this.setState({ data3: data2 })
                                    //addplace = data2

                                    consolepro.consolelog('data2', data2)
                                    consolepro.consolelog('details', this.state.address)
                                    // return this.props.locationget(data2);

                                }}
                                // getDefaultValue={() => {
                                //     return mapaddress != 'NA' ? mapaddress.address : '' // text input default value
                                // }}
                                query={{
                                    // available options: https://developers.google.com/places/web-service/autocomplete
                                    key: config.mapkey,
                                    language: 'en', // language of the results
                                    //   types: '(cities)',  default: 'geocode'
                                }}
                                styles={{
                                    textInputContainer: {
                                        backgroundColor: Colors.whiteColor,

                                        //marginTop: 10,
                                        alignSelf: 'center',
                                        height: 48,
                                        alignItems: 'center',
                                        // borderRadius: 50,
                                        width: windowWidth * 90 / 100,
                                        marginTop: 15,
                                        justifyContent: 'center',

                                    },
                                    textInput: {
                                        marginLeft: 7,
                                        marginRight: 10,
                                        textAlign: 'left',
                                        fontFamily: Font.bold_font,
                                        height: 37,
                                        borderRadius: 10,
                                        color: '#5d5d5d',
                                        fontSize: 16,
                                        borderRadius: 50,

                                        backgroundColor: Colors.inputBackgroundColour,
                                    },
                                    predefinedPlacesDescription: {
                                        color: Colors.statusbarcolor,
                                    },
                                    description: {
                                        fontFamily: Font.bold_font,
                                    },
                                    container: {
                                        borderRadius: 10
                                    },
                                    // poweredContainer: {
                                    //     backgroundColor: Colors.statusbarcolor,
                                    //     width:mobileW*90/100,
                                    //     alignSelf:'center'
                                    //   //  borderRadius: 15,

                                    // },
                                    listView: {
                                        width: mobileW * 90 / 100,

                                        alignSelf: 'center',
                                           backgroundColor: '#FFFFFF',
                                        //marginTop: 30, 
                                        //borderRadius: 15,
                                    }
                                }}
                                currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                                currentLocationLabel="Current location"
                                nearbyPlacesAPI="GooglePlacesSearch" // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                                GoogleReverseGeocodingQuery={{
                                    // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                                }}
                                GooglePlacesSearchQuery={{
                                    // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                                    rankby: 'distance',
                                    types: 'food',
                                }}
                                filterReverseGeocodingByTypes={[
                                    'locality',
                                    'administrative_area_level_3',
                                    'postal_code',
                                    'sublocality',
                                    'country']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                                //   predefinedPlaces={[homePlace, workPlace]}
                                debounce={100}
                                renderRightButton={() => (<TouchableOpacity style={{ alignSelf: 'center', paddingRight: 10 }} onPress={() => { this.GooglePlacesRef.setAddressText(""); this.setState({ addressselected: 'search' }) }}>
                                  {Platform.OS == 'android' &&   <Icon2 name='circle-with-cross' size={25} color='#c2cfc4' style={{ alignSelf: 'center' }} />}
                                </TouchableOpacity>)}

                            //   <Image source={require('./icons/location.png')} style={{alignContent:'center',alignSelf:'center',resizeMode:'contain',width:20,height:20,marginLeft:10}}/>}
                            />
                        </View>
                    </View>

                </View>

                <TouchableOpacity disabled={false} onPress={() => { this.continueClick() }} activeOpacity={1} style={styles.number2}>
                    <Text style={{ textAlign: 'center', fontSize: mobileW * 4 / 100, fontFamily: Font.semibold_font, color: Colors.whiteColor }}>{Lang_chg.continuebtn[config.language]}</Text>
                </TouchableOpacity>
            </View>


        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    number2: {
        width: windowWidth * 95 / 100,
        backgroundColor: Colors.themecolor,
        borderRadius: mobileW * 2 / 100,
        justifyContent: 'center',
        alignSelf: 'center',
        paddingVertical: mobileW * 3.5 / 100,
        position: 'absolute',
        bottom: 20
    },

    text2: {
        fontSize: windowWidth * 5 / 100,
        color: Colors.whiteColor,
        fontFamily: Font.bold_font,
        alignSelf: 'center',
    },
    img2: {
        width: 10,
        height: 12,
        marginLeft: windowWidth * 0.5 / 100,
    },
    button: {
        backgroundColor: '#00a1e4',
        width: 180,
        borderRadius: 45,
        paddingVertical: 10
    },
    searchbutton: {
        backgroundColor: '#00a1e4',

        borderRadius: 45,
        paddingVertical: 11,
        marginTop: 20,
        marginBottom: 8,
        textAlign: 'center',
        color: '#FFFFFF',
        position: "absolute", bottom: 10, width: '80%',
        alignSelf: 'center'
    },
    searchbar: {
        flexDirection: "row",
        width: '80%',
        marginHorizontal: 20,
        backgroundColor: '#FFFFFF',
        marginTop: 10,
        marginRight: 10,
        elevation: 10,
        borderRadius: 15,
        alignSelf: 'center',
        shadowOffset: {
            height: 7,
            width: 0
        },
        shadowColor: "rgba(0,0,0,1)",
        shadowOpacity: 0.49,
        shadowRadius: 5,

    }
})
