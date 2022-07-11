import React from 'react';
import Share from 'react-native-share'
import { Linking } from 'react-native';
// import {Lang_chg} from './Language_provider';
import { config } from './configProvider';
import RNFetchBlob from 'rn-fetch-blob'
class ShareappPro {
    //----------------- message buttons
    ShareImage = async (file_url, message1, subject) => {
        console.log('file_url', file_url);
        let dirs = RNFetchBlob.fs.dirs
        let imagePath = null;
        RNFetchBlob.config({
            fileCache: true
        })
            .fetch("GET", file_url)
            // the image is now dowloaded to device's storage
            .then(resp => {
                // the image path you can use it directly with Image component
                imagePath = resp.path();
                return resp.readFile("base64");
            })
            .then(async base64Data => {
                var base64Data = `data:image/png;base64,` + base64Data;
                // here's base64 encoded image
                await Share.open({ url: base64Data, title: message1, subject: subject, message: message1 });
                // remove the file from storage
                // return dirs.unlink(imagePath);
            });
    }
    sharefunction(appname, link) {
        let shareOptions = {
            title: appname,
            subject: appname,
            message: link,
            //  url: link,
            failOnCancel: false,
        };
        Share.open(shareOptions)
    }
    Rateusfunction = (link) => {
        Linking.openURL(link).catch(err =>
            alert('Please check for the Google Play Store')
        );
    }
}
export const Shareratepro = new ShareappPro();