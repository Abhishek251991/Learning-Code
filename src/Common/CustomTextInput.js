import React from 'react'
import { Image, StyleSheet, Text, View,TextInput } from 'react-native'
import { mobileH,mobileW,Colors,Font,Lang_chg } from '../Provider/utilslib/Utils'
export default function CustomTextInput(props) {
    return (
        <View style={styles.container}>
           <View style={{width:'8%'}}>
             <Image source={props.lefticon} style={{width:mobileW*5/100,height:mobileW*5/100}}  />
           </View>
           
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
          width:'100%',
          flexDirection:'row',
          borderBottomWidth:1,
          borderBottomColor:Colors.black_color,
          marginTop:mobileW*3/100

    }
})
