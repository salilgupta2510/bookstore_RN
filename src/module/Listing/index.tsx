import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, RefreshControl } from 'react-native'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useStore } from '../../store/reducer';
import { fp, hp, spH, spV, wp } from '../../utils/normalize';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ListingScreen = (): JSX.Element => {

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [searchTitle, setSearchTitle] = useState<string>('flammable')

    const { list, fetchListByName, loading, cleanList, endOfList } = useStore((state) => ({
        list: state.bookList,
        fetchListByName: state.fetchBookListByName,
        loading: state.loading,
        cleanList: state.cleanList,
        endOfList: state.endOfList
    }))

    useEffect(() => {
        fetchListByName({ title: searchTitle, pageNumber })
    }, [])

    useEffect(() => {
        if(pageNumber > 1) {
            fetchListByName({ title: searchTitle, pageNumber: pageNumber + 1 })
        }
    }, [pageNumber])

    const renderBookItem = ({ item, index }: any) => {
        const imageProps = item.ebook_count_i > 0 ? { uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`, priority: FastImage.priority.high } : require('../../../assets/listing/placeholder.png')
        return (
            <View key={`${item.title}_${index}_${item.key}`}
                style={styles.itemContainer}>
                <ShimmerPlaceHolder
                    visible={isImageLoaded}
                    shimmerStyle={styles.bookImage}
                >
                    <FastImage
                        source={imageProps}
                        style={styles.bookImage}
                        resizeMode={FastImage.resizeMode.cover}
                        defaultSource={require('../../../assets/listing/placeholder.png')}
                        onLoadEnd={() => {
                            setTimeout(() => setIsImageLoaded(true), 1000);
                        }}
                    />
                </ShimmerPlaceHolder>
                <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {loading && list.length == 0 ?
                <ActivityIndicator size={'large'} />
                : <FlatList
                    data={list}
                    renderItem={renderBookItem}
                    numColumns={2}
                    style={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl 
                            refreshing={loading}
                            onRefresh={() => {
                                fetchListByName({ title: searchTitle, pageNumber })
                            }}
                            tintColor="#ffffff"
                        />
                    }
                    onEndReached={() => setPageNumber(pageNumber + 1)}
                    ListFooterComponent={() => {
                        if(endOfList) {
                            <Text style={{ fontSize: fp(12), color: '#ffffff' }}>{'End of list'}</Text>
                        } 
                        return <ActivityIndicator size={'small'} style={{ marginVertical: spV(50) }}/>
                }}
                    onEndReachedThreshold={0}
                />
                }
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    flatListContainer: { paddingHorizontal: spH(15), paddingVertical: spV(15) },
    itemContainer: {
        marginVertical: 5,
        width: wp(155),
        padding: wp(10),
        borderRadius: wp(5),
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginHorizontal: spH(5)
    },
    bookImage: {
        width: wp(130),
        height: hp(150),
        borderRadius: wp(5)
    },
    title: {
        marginTop: wp(15),
        textAlign: 'center',
        textDecorationLine: 'underline',
    }
});

export default ListingScreen;
