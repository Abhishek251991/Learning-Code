import React, { useState } from 'react'
import {Text, View, Image, Platform, Modal, BackHandler, Alert, StyleSheet, FlatList, TextInput, StatusBar, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native'
import Container from '../Common/Container'
import Header from '../Common/Header'
import { msgProvider, msgText, msgTitle, localStorage, apifuntion, config, Lang_chg, AppProvider, Mapprovider, Cameragallery, mediaprovider, validation, Font, Colors, mobileH, consolepro,notification } from '../Provider/utilslib/Utils'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native';
import Footer from '../Provider/Footer';
import firebase from '../Config1';
import Firebase from 'firebase';
import ImagePicker from 'react-native-image-crop-picker';
import { firebaseprovider } from '../Provider/FirebaseProvider';

import OneSignal from 'react-native-onesignal';
import NetInfo from '@react-native-community/netinfo';
global.userChatIdGlobal = '';
global.blockinbox = 'no';
global.matchInbox = 'no';
global.messagedata = []


const chat_data = [
  { 'image': require('../icons/img34.jpg'), 'id': '#782961421', 'name': 'Andrew Miller', 'job': 'Cleaning', 'description': 'I am also good', 'datetime': '05/11/2021, 07:00AM', 'count': '1' },
  { 'image': require('../icons/img_25.jpg'), 'id': '#782961419', 'name': 'Jack Michael', 'job': 'Plumber', 'description': 'Can you give discount for this....', 'datetime': '04/11/2021, 10:00AM' },
  { 'image': require('../icons/img26.jpg'), 'id': '#782961319', 'name': 'Robert James', 'job': 'Plumber', 'description': 'I am also good', 'datetime': '03/11/2021, 08:00AM', 'count': '1' },
  { 'image': require('../icons/philip-martin.jpg'), 'id': '#782961422', 'name': 'Jasmine', 'job': 'Electricians', 'description': 'thank you so much sir', 'datetime': '02/11/2021, 09:00AM' },
];
export default class Chat1 extends React.Component {
  _didFocusSubscription;
  _willBlurSubscription;
  constructor(props) {
    super(props)
    this.state = {
      modalVisible: false,
      optionmsg: '',
      data1: [],
      user_id: '',
      chatmsg: '',
      other_user_name: '',
      data: this.props.route.params.chatdata,
      pagekey: this.props.route.params.pagekey,
      name: '',
      message_type: 'text',
      filePath: {},
      messages: [],
      isVisible: false,
      modalVisible: false,
      mediamodal: false,
      cameraOn: false,
      image: 'NA',
      selectImage: 'NA',
      fileData: '',
      fileUri: '',
      user_image: '',
      imgBlob: '',
      isConnected: true,
      loading: false,
      behavior: 'position',
      bottom: 5,
      matchfinal: '',
      matchInbox: 'no',
    }
    OneSignal.init(config.onesignalappid, {
      kOSSettingsKeyAutoPrompt: true,
    });

    OneSignal.setLogLevel(6, 0);
    this.show_user_message_chat = this.show_user_message_chat.bind(this);
    this._didFocusSubscription = props.navigation.addListener('focus', payload =>
      BackHandler.addEventListener('hardwareBackPress', this.chatBackManage)
    );
  }
  componentDidMount() {
    consolepro.consolelog('matchfinal.matchfinal not matching', 'match not matching')
    NetInfo.fetch().then(state => {
     // this.setState({ isConnected: state.isConnected })
    });
    //Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected })
    });
   this.getmessagedata()
    this._willBlurSubscription = this.props.navigation.addListener('blur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.chatBackManage)
    );
  }

  chatBackManage = async () => {
    let matchfinal = await localStorage.getItemObject('matchfinal');

    if (matchfinal != null) {
      //this.setState({matchfinal:matchfinal.matchfinal})

      if (matchfinal == 'yes') {
        consolepro.consolelog('matchfinal.matchfinal', matchfinal)
        this.props.navigation.navigate('Inbox')
      }
      else {
        consolepro.consolelog('matchfinal.matchfinal not matching', 'match not matching')
        this.props.navigation.goBack()
      }
    }
    else {
      this.props.navigation.goBack()
    }

  }

  getmessagedata = async () => {
    var userdata = await localStorage.getItemObject('user_arr');

    //consolepro.consolelog('getmessagedata')

    this.setState({ user_id: userdata.user_id })


    var data = this.state.data
    consolepro.consolelog('data', data)
    var other_user_id = data.other_user_id
    // var item_id = data.item_id;
    consolepro.consolelog('other_user_id', other_user_id);
    consolepro.consolelog('FirebaseInboxJson', FirebaseInboxJson);

    var user_data_other = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
    consolepro.consolelog('user_data_other', user_data_other);
    if (user_data_other >= 0) {
      var jsonDataInbox = FirebaseInboxJson[user_data_other];
      consolepro.consolelog("jsonDataInbox_match_status", jsonDataInbox.match_status);
      if (jsonDataInbox.match_status == undefined) {
        this.setState({ matchInbox: 'yes' })
      } else {

        this.setState({ matchInbox: jsonDataInbox.match_status })
      }
    } else {
      this.setState({ matchInbox: 'yes' })
    }

    // consolepro.consolelog('item_id',item_id);
    // consolepro.consolelog('firebaseprovider',FirebaseUserJson)
    var inbox_count = FirebaseUserJson.findIndex(x => x.user_id == other_user_id);
    consolepro.consolelog("chat name inbox count before", inbox_count);
    if (inbox_count >= 0) {
      consolepro.consolelog("chat name inbox count", inbox_count);
      var jsonData = FirebaseUserJson[inbox_count];
      consolepro.consolelog('jsonData', jsonData);
      if (jsonData.name != 'NA') {
        this.setState({ name: jsonData.name })

        // if (userProvider.getMe().user_type == 'user') {
        //   $('#chat_name').attr("onclick","redirectChefProfile("+other_user_id+")");
        // }
      } else {
        this.setState({ name: 'Chat' })
      }

    } else {
      this.setState({ name: 'Chat' })
    }
    this.show_user_message_chat()
  }
  sendmessagebtn = async () => {
    consolepro.consolelog('sendmessagebtn')

    let messageType = 'text';
    let message = this.state.chatmsg
    consolepro.consolelog('message', message)
    this.chatmsg.clear();
    this.setState({ chatmsg: '' })
    if (message.length <= 0) {
      alert(Languageprovider.massege_validation[language_key])
      return false
    }
    this.sendmessagecallbtn(messageType, message)
  }
  sendmessagecallbtn = async (messageType, message) => {
    let userdata = await localStorage.getItemObject('user_arr')

    let data1 = this.state.data
    //  jhkfhjkhsdk
    var user_id = userdata.user_id
    var other_user_id = data1.other_user_id
    //  var item_id = data1.item_id;
    var chat_type = 'Item_chat';

    var user_id_send = 'u_' + user_id;
    var other_user_id_send = 'u_' + other_user_id;

    var inbox_id_me = 'u_' + other_user_id;
    var inbox_id_other = 'u_' + user_id;
    consolepro.consolelog('inbox_id', inbox_id_me)
    consolepro.consolelog('inbox_id_other', inbox_id_other)

    //---------------------- this code for create inbox in first time -----------
    consolepro.consolelog('FirebaseInboxJsonChck', FirebaseInboxJson);
    console.log('other_user_id', other_user_id)
    console.log('FirebaseInboxJsonChck', FirebaseInboxJson);
    console.log('Firebaseuserjson', FirebaseUserJson);

    if (FirebaseUserJson.length > 0) {
      var find_inbox_index2 = FirebaseUserJson.findIndex(x => x.user_id == other_user_id);
      console.log('find_inbox_index', find_inbox_index2)

      if (find_inbox_index2 != -1) {
        if ('myInbox' in FirebaseUserJson[find_inbox_index2]) {
          let myinbox2 = FirebaseUserJson[find_inbox_index2].myInbox
          if (myinbox2 != undefined) {
            //  myinbox=myinbox.findIndex(x => x.user_id == other_user_id)
            console.log('myinbox2', myinbox2)
            if (inbox_id_other in myinbox2) {
              let myinboxdata = myinbox2[inbox_id_other]

              console.log('inbox_id_me', inbox_id_me)
              console.log('inbox_id_other', inbox_id_other)
              blockinbox = myinboxdata.block_status

            }
          }
        }
      }
    }
    var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
    consolepro.consolelog('find_inbox_index chat', find_inbox_index);
    consolepro.consolelog('other_user_id chat', other_user_id);
    if (find_inbox_index == -1) {

      var jsonUserDataMe = {
        count: 0,
        lastMessageType: "",
        lastMsg: "",
        user_id: other_user_id,
        typing_status: 'no',
        block_status: 'no',
        match_status: 'yes',
        lastMsgTime: Firebase.database.ServerValue.TIMESTAMP,
      };

      var jsonUserDataother = {
        count: 0,
        lastMessageType: "",
        lastMsg: "",
        user_id: user_id,
        typing_status: 'no',
        block_status: 'no',
        match_status: 'yes',
        lastMsgTime: Firebase.database.ServerValue.TIMESTAMP,

      };

      firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
      if (blockinbox == 'no') {
        firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataother);
      }

      //  consolepro.consolelog('FirebaseUserJson',FirebaseUserJson);
    }
    //---------------------- this code for create inbox in first time end -----------

    //---------------------- this code for send message to both -----------
    var messageIdME = 'u_' + user_id + '__u_' + other_user_id;
    var messageIdOther = 'u_' + other_user_id + '__u_' + user_id;
    var senderId = user_id;
    var inputId = 'xyz'
    // var timestamp = new Date().getTime();
    var messageJson = {
      message: message,
      messageType: messageType,
      senderId: senderId,
      timestamp: Firebase.database.ServerValue.TIMESTAMP
    }

    this.chatmsg.clear();

    firebaseprovider.SendUserMessage(messageIdME, messageJson, messageType, inputId);
    if (this.state.data.blockstatus == 'no') {
      if (blockinbox == 'no') {
        firebaseprovider.SendUserMessage(messageIdOther, messageJson, messageType, inputId);
      }

    }
    //---------------------- this code for send message to both end -----------


    //----------------update user inbox----------------------------
    var jsonUserDataMe = {
      count: 0,
      lastMessageType: messageType,
      lastMsg: message,
      lastMsgTime: Firebase.database.ServerValue.TIMESTAMP
    };

    firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);

    var user_id_me = userdata.user_id
    var chat_room_id = other_user_id;
    this.chatRoomIdUpdate(user_id_me, chat_room_id);

    //------------------------- get other user inbox -------------------

    consolepro.consolelog('other_user_id_send', other_user_id_send);
    consolepro.consolelog('user_id_send', user_id_send);
    var count_new = 0;
    var query = firebase.database().ref('users/' + other_user_id_send + '/myInbox/' + inbox_id_other);
    query.once('value', (data) => {
      consolepro.consolelog("chat_data", data.toJSON());
      // consolepro.consolelog('user inbox data',data.val().count);
      var count_old = data.val() == null ? 0 : data.val().count;
      consolepro.consolelog('count_old_check', count_old);
      count_new = parseInt(count_old) + 1;

      var jsonUserDataOther = {
        count: count_new,
        lastMessageType: messageType,
        lastMsg: message,
        lastMsgTime: Firebase.database.ServerValue.TIMESTAMP
      };
      // alert("dddd");      
      // consolepro.consolelog('jsonUserDataOther',jsonUserDataOther);
      if (blockinbox == 'no') {
        firebaseprovider.UpdateUserInboxOther(other_user_id_send, inbox_id_other, jsonUserDataOther);
      }

    })
    //---------------------- send message notifications ----------------
    var title = 'Stumble';
    var message_send = message;
    var SenderName = userdata.name;
    if (messageType != 'text' && messageType != 'location') {
      message_send = SenderName + ' sent: ' + messageType;
    } else {
      message_send = SenderName + ' ' + message_send;
    }

    var other_user_id = chat_room_id;
    consolepro.consolelog('other_user_id_noti', other_user_id);
    var message_noti = message_send;
    var action_json = {
      user_id: user_id_me,
      other_user_id: other_user_id,
      chat_type: chat_type,

      action_id: user_id_me,
      action: 'chat_single',
      // action_id : user_id_me,
      SenderName: SenderName,
      image: config.img_url + userdata.image,
    };
    // alert(user_id_me);  
    if (blockinbox == 'no') {
      this.sendNotificationSignle(title, message_noti, action_json, other_user_id);
    }
    //---------------------- send message notifications end----------------

  }
  sendNotificationSignle = async (title, message, action_json, user_id_member) => {
    let userdata = await localStorage.getItemObject('user_arr')
    consolepro.consolelog('sendNotificationSignle action_json', action_json);
    consolepro.consolelog('sendNotificationSignle message', message);
    consolepro.consolelog('sendNotificationSignle user_id_member', user_id_member);

    consolepro.consolelog('update delete_flag', user_id_member);
    consolepro.consolelog("sendNotificationSignle FirebaseUserJson", FirebaseUserJson);
    var user_check_inbox = FirebaseUserJson.findIndex(x => x.user_id == user_id_member);
    consolepro.consolelog("user_check_inbox subuser", user_check_inbox);
    if (user_check_inbox >= 0) {
      consolepro.consolelog('FirebaseUserJson subuser', FirebaseUserJson[user_check_inbox]);
      var player_id_get = FirebaseUserJson[user_check_inbox].player_id;
      var chat_room_id_get = FirebaseUserJson[user_check_inbox].chat_room_id;
      var notification_status = FirebaseUserJson[user_check_inbox].notification_status;

      consolepro.consolelog('chat_room_id_get', chat_room_id_get + '//' + chat_room_id_get);
      consolepro.consolelog('player_id_get', user_id_member + '//' + player_id_get);
      consolepro.consolelog('notification_status', notification_status);

      if (notification_status == 1) {
        var user_id_me = userdata.user_id;
        consolepro.consolelog('chat_room_id_get', chat_room_id_get + '!=' + user_id_me);
        // if(chat_room_id_get != user_id_me){
        if (player_id_get != 'no' && player_id_get != '123456') {
          var player_id_arr = [];
          player_id_arr.push(player_id_get);
          consolepro.consolelog('player_id_arr', player_id_arr);

          if (player_id_arr.length > 0) {
            consolepro.consolelog('vikas slonakfsdsend notihd');
            notification.notificationfunction(message, action_json, player_id_get, title);
          }
          // }
        }
      }
    }
  }
  chatRoomIdUpdate = (user_id, other_user_id) => {
    consolepro.consolelog('chatRoomIdUpdate user_id', user_id);
    consolepro.consolelog('chatRoomIdUpdate other_user_id', other_user_id);
    var id = 'u_' + user_id;
    var jsonUserDataMe = {
      chat_room_id: other_user_id,
    };
    firebaseprovider.CreateUser(id, jsonUserDataMe);
  }
  myInboxCountZeroChat = () => {
    consolepro.consolelog('myInboxCountZeroChat');
    var data = this.state.data
    var user_id = this.state.user_id
    var other_user_id = data.other_user_id
    var user_id_send = 'u_' + user_id;
    var other_user_id_send = 'u_' + other_user_id;

    var jsonUserDataOther = {
      count: 0,
      user_id: other_user_id,
    };
    firebaseprovider.UpdateUserInboxOther(user_id_send, other_user_id_send, jsonUserDataOther);
  }

  show_user_message_chat = () => {

    //  var messagedata=[]
    var other_user_id = this.state.data.other_user_id
    var find_inbox_index = FirebaseInboxJson.findIndex(x => x.user_id == other_user_id);
    consolepro.consolelog('find_inbox_index chatshow_user_message_chat', find_inbox_index);
    consolepro.consolelog('other_user_id chatshow_user_message_chat', other_user_id);
    if (find_inbox_index >= 0) {
      consolepro.consolelog('inboxfinguser')
      this.myInboxCountZeroChat()
    }

    consolepro.consolelog('show_user_message');

    // var userdata= await localStorage.getItemObject('user_arr');
    var data = this.state.data
    var user_id = this.state.user_id
    var other_user_id = data.other_user_id
    // var item_id = data.item_id;
    var chat_type = 'Item_chat';

    var userChatId = 'u_' + user_id + '__u_' + other_user_id
    if (userChatIdGlobal == '') {
      userChatIdGlobal = userChatId;
    }
    consolepro.consolelog('userChatIdGlobal', userChatIdGlobal);
    var queryOff = firebase.database().ref('message/').child(userChatIdGlobal);
    queryOff.off('child_added');
    queryOff.off('child_changed');
    // alert('userChatId======'+userChatId);
    var image_index_me = 0;
    var image_index_other = 0;
    userChatIdGlobal = userChatId;
    var query = firebase.database().ref('message/' + userChatId).orderByChild("timestamp");
    query.on('child_added', (data) => {
      consolepro.consolelog('message child_added chat all data', data.toJSON());
      // LoadingEnd();

      var msgKey = data.key;
      var message = data.val().message;
      var messageType = data.val().messageType;
      var senderId = data.val().senderId;
      var timestamp = data.val().timestamp;
      var lastMsgTime = firebaseprovider.convertTimeAllFormat(timestamp, 'date_time_full');
      var messageDataShow = '';
      consolepro.consolelog('senderId', senderId);
      consolepro.consolelog('user_id', user_id);

      if (senderId == user_id) {
        consolepro.consolelog('senderId', senderId);

        if (messageType == 'text') {

          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })
        } else if (messageType == 'location') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })
        }
        else if (messageType == 'image') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })

        }
      } else {
        if (messageType == 'text') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })

        }
        else if (messageType == 'location') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })
        }
        else if (messageType == 'image') {
          var messageJson = {
            'name': message,
            'userid': senderId,
            'messageType': messageType,
            'time': lastMsgTime
          }
          consolepro.consolelog('messageJoson', messageJson)
          let data6 = this.state.data1
          data6.push(messageJson)
          this.setState({ data1: data6 })

        }
      }
      consolepro.consolelog('this.state.data1', this.state.data1)
    });

    // for(let i=0; i<messagedata.length; i++)
    // {
    //   messagedata[i]=messagedata[(messagedata.length-1)-i];
    // }

    consolepro.consolelog('enndshowfunction')
  }
  senduserreport = async () => {
    let userdata = await localStorage.getItemObject('user_arr')
    consolepro.consolelog('userdata', userdata)
    let user_id = userdata.user_id
    let data = this.state.data
    var other_user_id = data.other_user_id
    var url = config.baseURL + 'report_submit.php?user_id=' + user_id + '&other_user_id=' + other_user_id + '&report_type=chat';
    consolepro.consolelog('url', url)
    this.setState({ loading: true, })
    fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then((obj) => {
      this.setState({ loading: false });
      return obj.json();
    }).then((obj) => {
      consolepro.consolelog('obj', obj);

      if (obj.success == 'true') {
        msgProvider.alert('', obj.msg[config.language], false);
      }
      else {
        msgProvider.alert('', obj.msg[config.language], false);
        if (obj.active_status == "deactivate") {

          this.props.navigation.navigate('Logout')
        }
        return false;
      }
    }).catch((error) => {
      this.setState({ loading: false });
      msgProvider.alert(msgTitle.server[config.language], msgText.servermessage[config.language], false);
    })
  }

  senduserreport = async () => {
    let userdata = await localStorage.getItemObject('user_arr')
    consolepro.consolelog('userdata', userdata)
    let user_id = userdata.user_id
    let data = this.state.data
    var other_user_id = data.other_user_id
    var url = config.baseURL + 'report_submit.php?user_id=' + user_id + '&other_user_id=' + other_user_id + '&report_type=1';
    consolepro.consolelog('url', url)
    this.setState({ loading: true, })
    fetch(url, {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': 0,
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
    }).then((obj) => {
      this.setState({ loading: false });
      return obj.json();
    }).then((obj) => {
      consolepro.consolelog('obj', obj);

      if (obj.success == 'true') {
        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
      }
      else {

        msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
        return false;
      }
    }).catch((error) => {
      this.setState({ loading: false });
      msgProvider.alert(msgTitle.server[config.language], msgText.servermessage[config.language], false);
    })
  }

  clearchatbtn = () => {
    Alert.alert(
      'Are you sure you want to clear chat ?',  // message
      '',
      [
        { text: 'No', onPress: () => consolepro.consolelog('Cancel Pressed'), style: 'cancel' },
        { text: 'Yes', onPress: () => { this.ClearChatConfirm() }, style: 'destructive' },
      ],
      { cancelable: false }
    )
  }
  ClearChatConfirm = async () => {
    let userdata = await localStorage.getItemObject('user_arr')
    consolepro.consolelog('userdata', userdata)
    let data = this.state.data
    var user_id = userdata.user_id
    var other_user_id = data.other_user_id
    // var item_id = data.item_id;
    var chat_type = 'Item_chat';

    var messageIdME = 'u_' + user_id + '__u_' + other_user_id;
    var id = 'u_' + user_id;
    var otherid = 'u_' + other_user_id;
    let jsonUsesadsssfrData = {};

    firebase.database().ref().child('message' + '/' + messageIdME + '/').remove();
    // messagedata=[] 
    this.setState({ data1: [], modalVisible: false })
    let jsonUserData = {};


    var jsonUserDataMe = {
      count: 0,
      lastMessageType: "",
      lastMsg: "",
      lastMsgTime: "",
      user_id: other_user_id,
    };
    var user_id_send = 'u_' + user_id;
    var other_user_id_send = 'u_' + other_user_id;
    var inbox_id_me = 'u_' + other_user_id;

    firebaseprovider.UpdateUserInboxMe(user_id_send, inbox_id_me, jsonUserDataMe);
    firebaseprovider.getMyInboxAllData();

  }
  btnOpneImageOption = (index) => {
    const options = {
      title: Lang_chg.ChooseMedia[config.language],
      takePhotoButtonTitle: Lang_chg.MediaCamera[config.language],
      chooseFromLibraryButtonTitle: Lang_chg.Mediagallery[config.language],
      cancelButtonTitle: Lang_chg.cancelmedia[config.language],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 1000,
      maxHeight: 1000,
      quality: 0.8
    };

    ImagePicker.showImagePicker(options, (response) => {
      consolepro.consolelog('Response = ', response);

      if (response.didCancel) {
        consolepro.consolelog('User cancelled image picker');
      } else if (response.error) {
        consolepro.consolelog('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        consolepro.consolelog('User tapped custom button: ', response.customButton);
      } else {


        this.setState({
          filePath: response,
          fileData: response.data,
          fileUri: response.uri,
          imagedata: true,
          camraon: true,
          loading: true,
          profileimagehide: true,
          openDate: false
        });
        let user_id = this.state.user_id
        consolepro.consolelog('this.state.fileUri', response.uri)
        var url = config.baseURL + 'chat_file_upload.php';
        var data2 = new FormData();

        data2.append('user_id', user_id)
        data2.append('file_type', 'image')
        data2.append('image', {
          uri: response.uri,
          type: 'image/jpg', // or photo.type
          name: 'image.jpg'
        });
        consolepro.consolelog('url', url)
        consolepro.consolelog('data', data2)
        // this.setState({loading:true,})
        fetch(url, {
          method: 'POST',
          headers: {
            "Content-Type": "multipart/form-data"
          },
          body: data2,
        }).then((obj) => {
          this.setState({ loading: false })
          return obj.json();
        }).then((obj) => {
          consolepro.consolelog('obj', obj);
          if (obj.success == 'true') {
            this.setState({ bottom: 0, loading: false })
            this.sendmessagecallbtn('image', obj.file)
          }
          else {
            this.setState({ loading: false });
            msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
            return false;
          }
        }).catch((error) => {
          consolepro.consolelog('error', error)
          msgProvider.alert(msgTitle.server[config.language], msgText.servermessage[config.language], false);
        })
      }
    });

  }
  permmissionsendreport = () => {
    Alert.alert(
      //This is title
      Lang_chg.Confirm[config.language],
      //This is body text
      Lang_chg.reportmessagepopup[config.language],
      [
        { text: Lang_chg.Yes[config.language], onPress: () => this.senduserreport() },
        { text: Lang_chg.No[config.language], onPress: () => consolepro.consolelog('No Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    );
  }
  permmissionclearchat = () => {
    Alert.alert(
      //This is title
      Lang_chg.Confirm[config.language],
      //This is body text
      Lang_chg.chatclearpopup[config.language],
      [
        { text: Lang_chg.Yes[config.language], onPress: () => this.ClearChatConfirm() },
        { text: Lang_chg.No[config.language], onPress: () => consolepro.consolelog('No Pressed'), style: 'cancel' },
      ],
      { cancelable: false }
      //on clicking out side, Alert will not dismiss
    );
  }



  Camerapopen = async () => {
    mediaprovider.launchCamera(true).then((obj) => {
      consolepro.consolelog('selectImage', obj.path)
      this.setState({
        selectImage: obj.path,
        cameraOn: true,
        mediamodal: false,
      })

      this.setState({
        filePath: obj,
        fileData: obj,
        fileUri: obj.path,
        imagedata: true,
        camraon: true,
        loading: true,
        profileimagehide: true,
        openDate: false
      });
      let user_id = this.state.user_id
      consolepro.consolelog('this.state.fileUri', obj.path)
      var url = config.baseURL + 'chat_file_upload.php';
      var data2 = new FormData();

      data2.append('user_id', user_id)
      data2.append('file_type', 'image')
      data2.append('image', {
        uri: obj.path,
        type: 'image/jpg', // or photo.type
        name: 'image.jpg'
      });
      consolepro.consolelog('url', url)
      consolepro.consolelog('data', data2)
      // this.setState({loading:true,})
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: data2,
      }).then((obj) => {
        this.setState({ loading: false })
        return obj.json();
      }).then((obj) => {
        consolepro.consolelog('obj', obj);
        if (obj.success == 'true') {
          this.setState({ bottom: 0, loading: false })
          this.sendmessagecallbtn('image', obj.file)
        }
        else {
          this.setState({ loading: false });
          msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
          return false;
        }
      }).catch((error) => {
        consolepro.consolelog('error', error)
        msgProvider.alert(msgTitle.server[config.language], msgText.servermessage[config.language], false);
      })

    }).catch((error) => {
      this.setState({ mediamodal: false })

    })
  }
  Galleryopen = () => {
    mediaprovider.launchGellery(true).then((obj) => {
      consolepro.consolelog('selectImage', obj.path)
      this.setState({
        selectImage: obj.path,
        cameraOn: true,
        mediamodal: false,
      })

      this.setState({
        filePath: obj,
        fileData: obj,
        fileUri: obj.path,
        imagedata: true,
        camraon: true,
        loading: true,
        profileimagehide: true,
        openDate: false
      });
      let user_id = this.state.user_id
      consolepro.consolelog('this.state.fileUri', obj.path)
      var url = config.baseURL + 'chat_file_upload.php';
      var data2 = new FormData();

      data2.append('user_id', user_id)
      data2.append('file_type', 'image')
      data2.append('image', {
        uri: obj.path,
        type: 'image/jpg', // or photo.type
        name: 'image.jpg'
      });
      consolepro.consolelog('url', url)
      consolepro.consolelog('data', data2)
      // this.setState({loading:true,})
      fetch(url, {
        method: 'POST',
        headers: {
          "Content-Type": "multipart/form-data"
        },
        body: data2,
      }).then((obj) => {
        this.setState({ loading: false })
        return obj.json();
      }).then((obj) => {
        consolepro.consolelog('obj', obj);
        if (obj.success == 'true') {
          this.setState({ bottom: 0, loading: false })
          this.sendmessagecallbtn('image', obj.file)
        }
        else {
          this.setState({ loading: false });
          msgProvider.alert(msgTitle.information[config.language], obj.msg[config.language], false);
          return false;
        }
      }).catch((error) => {
        consolepro.consolelog('error', error)
        msgProvider.alert(msgTitle.server[config.language], msgText.servermessage[config.language], false);
      })


    }).catch((error) => {
      this.setState({ mediamodal: false })

    })
  }

  render() {


    return (
      <Container backgroundColor={Colors.whiteColor}>
        <Header
          goBack={() => { navigation.goBack() }}
          title={Lang_chg.chathead[config.language]}
          icon={<Image source={require('../icons/search.png')} style={{ width: mobileW * 5 / 100, height: mobileW * 5 / 100 }} />}
        />
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
          <View style={{ width: '100%' }}>
            <FlatList
              data={chat_data}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => { navigation.navigate('Conversation') }} style={{ width: '100%', flexDirection: 'row', marginTop: mobileW * 2 / 100, paddingBottom: mobileW * 3 / 100, borderBottomWidth: 1, borderBottomColor: Colors.placeholderbordercolor }}>
                    <View style={{ width: '20%', alignItems: 'center', marginTop: mobileW * 6 / 100 }}>
                      <Image source={item.image} style={{ width: mobileW * 14 / 100, height: mobileW * 14 / 100, borderRadius: mobileW * 8 / 100 }} />
                    </View>
                    <View style={{ width: '52%', marginTop: mobileW * 3 / 100 }}>
                      <View style={{ width: '100%', marginBottom: mobileW * -1 / 100 }}>
                        <Text style={{
                          fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100, color:
                            Colors.black_color
                        }}>{item.id}</Text>
                      </View>
                      <View style={{ width: '100%', marginBottom: mobileW * -1 / 100 }}>
                        <Text style={{
                          fontFamily: Font.semibold_font, fontSize: mobileW * 4 / 100, color:
                            Colors.black_color
                        }}>{item.name}</Text>
                      </View>
                      <View style={{ width: '100%', }}>
                        <Text style={{
                          fontFamily: Font.semibold_font, fontSize: mobileW * 3.5 / 100, color:
                            Colors.themecolor
                        }}>{item.job}</Text>
                      </View>
                      <View style={{ width: '100%', }}>
                        <Text style={{
                          fontFamily: Font.regular_font, fontSize: mobileW * 3.5 / 100, color:
                            Colors.msg_color
                        }}>{item.description}</Text>
                      </View>
                    </View>
                    <View style={{ width: '28%', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {item.count == 1 && <View style={{ width: mobileW * 4 / 100, alignItems: 'center', marginLeft: mobileW * 13 / 100, height: mobileW * 4 / 100, marginBottom: mobileW * 1 / 100, borderRadius: mobileW * 3 / 100, backgroundColor: 'red' }}>
                        <Text style={{ color: Colors.whiteColor, fontSize: mobileW * 3 / 100, textAlign: 'center', fontFamily: Font.bold_font }}>{item.count}</Text>

                      </View>}
                      <View style={{ width: '100%' }}>
                        <Text style={{ width: '100%', fontFamily: Font.regular_font, color: Colors.msg_color, fontSize: mobileW * 2.5 / 100 }}>{item.datetime}</Text>
                      </View>
                    </View>

                  </TouchableOpacity>
                )

              }}
            />
          </View>
        </KeyboardAwareScrollView>
        <Footer navigation={props.navigation} page={'Chat'} user_id={1} />
      </Container>
    )
  }
}


