import React, { useState } from 'react'
import { View, TextInput, Text,Image, StyleSheet } from 'react-native';
import { Colors, Font, mobileH, mobileW  } from '../Provider/utilslib/Utils'


const Input = ({
    onChangeText,
    maxLength,
    iconPosition,
    rightIcon,
    leftIcon,
    style,
    inputValue,
    label,
    error,
    type,
    inputTextAlign,
    editable,
    ...props
}) => {

    const [focused, setFocused] = React.useState(false);


    const getWidth = () => {
     
        if (iconPosition) {
            if (iconPosition === 'left' || iconPosition === 'right') {
                return '90%';
            }
            if (iconPosition === 'both') {
                return '75%';
            }
        } else {
            return "100%"
        }
    };

    const getBorderColor = () => {
        if (error) {
            return 'red';
        }

        if (focused) {
            return 'blue';
        } else {
            return 'green';
        }
    };
    return (
        <View style={[styles.inputContainer, style]}>
            {label && <Text>{label}</Text>}

            <View
                style={[
                    styles.wrapper,
                    { alignItems: 'center' },
                    { flexDirection: "row" },
                ]}>
                {
                    (iconPosition === 'both' || iconPosition === 'left') &&
                    <View style={{ width: '10%',borderRightWidth:1,borderRightColor:Colors.black_color }}>{leftIcon && <Image source={leftIcon} style={{ resizeMode: 'contain', height: mobileW * 5 / 100, width: mobileW * 8 / 100 }} />}</View>
                }
                <TextInput
                    style={[styles.textInput, { width: getWidth(), textAlign: inputTextAlign }]}
                    placeholderTextColor={Colors.black}
                    onChangeText={onChangeText}
                    editable={editable}
                    keyboardType={type}
                    maxLength={maxLength}
                    value={inputValue}
                    // console.log('inputValue', inputValue)
                    {...props}
                />
                {
                    (iconPosition === 'both' || iconPosition === 'right') &&
                    <View style={{ width: '15%' }}>{rightIcon && rightIcon}</View>
                }
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    wrapper: {
        // height:47,
        // borderRadius: 15,
        // backgroundColor:'green',
        borderBottomWidth:1,
        borderBottomColor:Colors.black_color
      

    },

    inputContainer: {
        paddingVertical: 12,
        
    },

    textInput: {
        // height:47
        fontSize:15, color: Colors.black, fontFamily: Font.FontRegular, justifyContent: 'flex-start', alignItems: 'center', paddingHorizontal:mobileW*2/100
        // borderRadius: 15
    },

    error: {
        color: Colors.danger,
        paddingTop: 4,
        fontSize: 9,
    },
});
