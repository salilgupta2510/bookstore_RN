import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable, Alert } from 'react-native';
import { useStore } from '../../store/reducer';
import { fp, hp, spH, spV, wp } from '../../utils/normalize';

const SearchScreen = ({ navigation, route }: NativeStackScreenProps): JSX.Element => {

    const { searchBy, setSearchBy, fetchBookList, cleanList, setSearchString } = useStore((state) => ({
        searchBy: state.searchBy,
        setSearchBy: state.setSearchBy,
        fetchBookList: state.fetchBookList,
        cleanList: state.cleanList,
        setSearchString: state.setSearchString
    }))

    const [searchText, setSearchText] = useState<string>('');
    const [selection, setSelections] = useState<string>(searchBy);

    const handleSearch = () => {
        if(searchText == '') {
            Alert.alert(`Please enter ${selection == 'search' ? 'book' : 'authors'} name`)
        } else {
            setSearchBy(selection);
            setSearchString(searchText);
            cleanList();
            fetchBookList({ title: searchText, pageNumber: 1, searchBy: selection});
            navigation.pop();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.selectorContainer}>
                <Pressable 
                    onPress={() => setSelections('search')} 
                    style={[styles.button1, selection == 'search' && { backgroundColor: '#2c3e50' }]}>
                    <Text style={[styles.selectButtonText, selection == 'search' && { color: '#ffffff' }]}>Books</Text>
                </Pressable>
                <Pressable 
                    onPress={() => setSelections('authors')} 
                    style={[styles.button2, selection == 'authors' && { backgroundColor: '#2c3e50' }]}>
                    <Text style={[styles.selectButtonText, selection == 'authors' && { color: '#ffffff' }]}>Author</Text>
                </Pressable>
            </View>
            <TextInput
                placeholder="Search Books..."
                value={searchText}
                onChangeText={text => setSearchText(text)}
                style={styles.textInput}
                placeholderTextColor={"#888888"}
            />
            <Pressable onPress={handleSearch} style={({ pressed }) => [styles.searchButton, { opacity: pressed ? 0.5 : 1 }]}>
                <Text style={styles.buttonText}>Search</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: spV(10),
        alignItems: 'center',
        backgroundColor: '#C2C7D5',
    },
    textInput: {
        width: '80%',
        height: hp(40),
        borderWidth: wp(1),
        paddingHorizontal: spH(10),
        borderRadius: wp(10),
        borderColor: '#888888',
        backgroundColor: '#ffffff'
    },
    searchButton: {
        marginTop: spV(20),
        height: hp(40),
        width: wp(100),
        backgroundColor: '#2c3e50',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(10),
    },
    buttonText: {
        fontSize: fp(12),
        color: '#ffffff',
        fontWeight: '600'
    },
    selectorContainer: {
        flexDirection: 'row',
        marginVertical: spV(20)
    },
    button1: {
        width: wp(125),
        height: hp(30),
        backgroundColor: '#ffffff',
        borderTopLeftRadius: wp(10),
        borderBottomLeftRadius: wp(10),
        borderWidth: wp(1),
        borderColor: '#2c3e50',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button2: {
        width: wp(125),
        height: hp(30),
        backgroundColor: '#ffffff',
        borderTopRightRadius: wp(10),
        borderBottomRightRadius: wp(10),
        borderWidth: wp(1),
        borderColor: '#2c3e50',
        justifyContent: 'center',
        alignItems: 'center'
    },
    selectButtonText: {
        fontSize: fp(12),
        color: '#2c3e50',
        fontWeight: '600'
    },
});

export default SearchScreen;
