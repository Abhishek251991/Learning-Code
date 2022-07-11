import React from 'react';
import OneSignal from 'react-native-onesignal';
import { Colors,apifuntion,msgTitle,notification, mobileH,Mapprovider,msgProvider,msgText,config,mobileW,localStorage, } from './utilslib/Utils'

global.propsnavigation='';
class Pushnotificationredirection {
	//----------------- message buttons
    constructor(){

    }
    redirectfun(props)
         {
            propsnavigation=props;
            OneSignal.setLocationShared(true);
            OneSignal.inFocusDisplaying(2);
            OneSignal.addEventListener('ids', this.onIds.bind(this));
            OneSignal.addEventListener('opened', this.onOpened);
         }
	
         onOpened=async(openResult)=>{
           let navigation=propsnavigation
            console.log('openResult: ', openResult.notification.payload.body);

            var datajson=openResult.notification.payload.additionalData.p2p_notification.action_json;
             var user_id =  datajson.user_id;
             var other_user_id = datajson.other_user_id;
             var action_id = datajson.action_id;
             var action = datajson.action;
             var  userdata = await localStorage.getItemObject('user_arr')
             console.log('datajson_user_id', datajson.user_id)

         
              if(userdata.user_id==other_user_id)
              {
                other_user_id=datajson.user_id
              }
          
            // this.setState({loading:false})
            if(userdata!=null)
            {
              if(userdata.user_id!=other_user_id)
                {
                  console.log('navigation run')
                  if(action=='Property_Offer')
                   {
                       navigation.navigate('Sellingdetaile',{'property_id':action_id,})
                    }

                    else if(action=='Property_appointment')
                    {
                        navigation.navigate('Sellingdetaile',{'property_id':action_id,})
                     }
 
                     else if(action=='appointment_cancel_admin')
                      {
                         navigation.navigate('Productdetaile',{'property_id':action_id,})
                      }
 
                      else if(action=='appointment_accept_admin')
                    {
                        navigation.navigate('Productdetaile',{'property_id':action_id,})
                     }
 
                     else if(action=='appointment_reject_admin')
                    {
                        navigation.navigate('Productdetaile',{'property_id':action_id,})
                     }
 
                     else if(action=='appointment_cancel_user')
                    {
                        navigation.navigate('Sellingdetaile',{'property_id':action_id,})
                     }
                     else if(action=='Offer_reject')
                      {
                         navigation.navigate('Productdetaile',{'property_id':action_id,})
                      }
                      else if(action=='appointment_cancel_admin')
                      {
                         navigation.navigate('Productdetaile',{'property_id':action_id,})
                      }
                      else if(action=='Add_property')
                        {
                          navigation.navigate('Productdetaile',{'property_id':action_id,})
                        }
 
                  else if(action=='comment_vedio')
                    {
                   navigation.navigate('Showlivevedio',{'streming_id':action_id,livestatus:0})
                  }
               }
          
             }
            else{

            navigation.navigation.navigate('Login')
            }
          }
           onIds(device) {
              console.log('Device info: ', device);
              player_id_me1=device.userId
           }
}

export const pushnotification = new Pushnotificationredirection();