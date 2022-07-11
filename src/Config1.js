import Firebase from 'firebase';

const config = {
    apiKey: "AIzaSyADAWDHnRX7Jg79mqQQUO4bOu8vzmwmsa4",
    authDomain: "handyman-88640.firebaseapp.com",
    databaseURL: "https://handyman-88640-default-rtdb.firebaseio.com",
    projectId: "handyman-88640",
    storageBucket: "handyman-88640.appspot.com",
    messagingSenderId: "314868797487",
    appId: "1:314868797487:web:d1e59bd2748d482e7136da"
};


let firebase = Firebase.initializeApp(config);
export default firebase