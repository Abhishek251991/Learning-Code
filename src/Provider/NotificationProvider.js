import React, { Component } from 'react';
import OneSignal from 'react-native-onesignal';
import { config } from './configProvider';


class NotificationProvider {
  notification_arr(notification_arr) {
    for (let i = 0; i < notification_arr.length; i++) {
      let message = notification_arr[i].message
      let player_id = notification_arr[i].player_id
      let action_json = notification_arr[i].action_json
      let title = notification_arr[i].title
      this.notificationfunction(message, action_json, player_id, title)
    }
  }

  notificationfunction(massege, action_json, playerid, title) {
    console.log('player_id', playerid)
    console.log('action_json', action_json)
    console.log('massege', massege)
    console.log('title', title)
    let contents = { 'en': massege};
    let data = { 'action_json': action_json };
    let playerIds = [playerid];
    var other = {
      headings: { en: title },
      group: 10,
      priority: 10,
    };
    OneSignal.postNotification(contents, data, playerIds, other);
  }

}

export const notification = new NotificationProvider();
