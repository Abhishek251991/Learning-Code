import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import { mobileH,mobileW,Colors,Font } from '../Provider/utilslib/Utils'
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {

   console.log(props);
    return (
        <View style={styles.container}>
            <View style={{width:'15%',alignItems:'center',justifyContent:'center'}}>
            {  props.showback==true&&
            <TouchableOpacity onPress={() => {props.goBack()}}  activeOpacity={0.9} >
              <Image source={require('../icons/back.png')} resizeMode='contain' style={{width:mobileW*5/100,height:mobileW*5/100}} />
            </TouchableOpacity>}
            </View>
       
        <View style={styles.Headertitle}>
            <Text style={styles.Headertext}>{props.title}</Text>
        </View>
        <View  style={{width:'15%',alignItems:'center',justifyContent:'center'}}>
          {props.icon && props.icon}
       </View>
     </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width:'100%',
        backgroundColor:'#fff',
        borderBottomWidth:1,
        borderBottomColor:Colors.gray_color,
        flexDirection:"row",
        paddingVertical:mobileW*5/100
    },
  
    Headertitle:{
       width:'70%',
      
    },
    Headertext:{
     fontSize:mobileW*5/100,
     fontFamily:Font.bold_font,
     textAlign:'center',
     color:Colors.black_color
    },
   
})
