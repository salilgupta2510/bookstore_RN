import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fp, hp, spH, spV, wp } from '../../utils/normalize';

interface DetailsCardProps {
    label1: string;
    value1?: string;
    label2: string;
    value2?: string;
}

const DetailsCard = ({label1, value1, label2, value2}: DetailsCardProps): JSX.Element => {
    return (
        <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.heading}>{label1}</Text>
                    <Text style={styles.value}>{value1}</Text>
                </View>
                <View style={[styles.card, {marginLeft: spH(5), marginRight: 0}]}>
                    <Text style={styles.heading}>{label2}</Text>
                    <Text style={styles.value}>{value2}</Text>
                </View>
            </View>
    );
};

const styles = StyleSheet.create({
    container: { 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: spH(10)
    },
    card: { 
        paddingVertical: spV(15), 
        paddingHorizontal: spH(5), 
        alignItems: 'center', 
        width: wp(150), 
        height: hp(80), 
        marginRight: spH(5), 
        borderRadius: wp(5), 
        backgroundColor: '#ffffff' 
    },
    heading: {
        color: '#494949',
        fontSize: fp(12),
        textAlign: 'center',
        textDecorationLine: 'underline'
    },
    value: {
        color: '#2c3e50',
        fontSize: fp(12),
        textAlign: 'center',
        marginTop: spV(10),
        fontWeight: '600',
    },
});

export default DetailsCard;
