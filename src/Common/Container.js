import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Status_bar from './Status_bar';
const Container = ({ style, children, backgroundColor }) => {
    return (
        <View style={{ flex: 1, backgroundColor: backgroundColor }}>
            <Status_bar />
            
            {children}
        </View>
    );
};

export default Container;
const styles = StyleSheet.create({

});