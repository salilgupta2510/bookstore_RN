import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator, RefreshControl, Pressable } from 'react-native'
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useStore } from '../../store/reducer';
import { fp, hp, spH, spV, wp } from '../../utils/normalize';
import CommonBlurModal from '../Common/CommonBlurModal';
import BookDetails, { BookDetailsProps } from '../Details';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

const ListingScreen = (): JSX.Element => {

    const { list, searchBy, searchString, fetchBookList, loading, cleanList, endOfList } = useStore((state) => ({
        list: state.bookList,
        searchBy: state.searchBy,
        searchString: state.searchString,
        fetchBookList: state.fetchBookList,
        loading: state.loading,
        cleanList: state.cleanList,
        endOfList: state.endOfList
    }))

    const [pageNumber, setPageNumber] = useState<number>(1);
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
    const [bookDetails, setBookDetails] = useState<BookDetailsProps>();
    const [showDetails, setShowDetails] = useState<boolean>(false);

    useEffect(() => {
        fetchBookList({ title: searchString, pageNumber, searchBy })
    }, [])

    useEffect(() => {
        if (pageNumber > 1) {
            fetchBookList({ title: searchString, pageNumber, searchBy })
        }
    }, [pageNumber])

    useEffect(() => {
        fetchBookList({ title: searchString, pageNumber, searchBy })
    }, [searchString])

    const onClickItem = (item: any) => {
        setBookDetails({ 
            imageUrl: `https://covers.openlibrary.org/b/id/${item.cover_i}-L.jpg`,
            title: item.title,
            authors: item.author_name,
            firstPublishedIn: item.first_publish_year,
            numberOfEditions: item.edition_count,
            eBookCount: item.ebook_count_i,
            publisher: item.publisher[item.publisher.length - 1]
         })
         setShowDetails(true);
    }

    const renderBookItem = ({ item, index }: any) => {
        const imageProps = item.ebook_count_i > 0 ? { uri: `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`, priority: FastImage.priority.high } : require('../../../assets/listing/placeholder.png')
        return (
            <Pressable onPress={() => onClickItem(item)} key={`${item.title}_${index}_${item.key}`}
                style={styles.itemContainer}>
                <ShimmerPlaceHolder
                    visible={isImageLoaded}
                    shimmerStyle={styles.bookImage}
                >
                    <FastImage
                        source={imageProps}
                        style={styles.bookImage}
                        resizeMode={FastImage.resizeMode.contain}
                        defaultSource={require('../../../assets/listing/placeholder.png')}
                        onLoadEnd={() => {
                            setIsImageLoaded(true)
                        }}
                    />
                </ShimmerPlaceHolder>
                <Text numberOfLines={2} style={styles.title}>{item.title}</Text>
            </Pressable>
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
                    keyExtractor={(item, index) => item.key + index}
                    style={styles.flatListContainer}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={loading}
                            onRefresh={() => {
                                fetchBookList({ title: searchString, pageNumber, searchBy })
                            }}
                            tintColor="#ffffff"
                        />
                    }
                    onEndReached={() => setPageNumber(pageNumber + 1)}
                    ListFooterComponent={() => {
                        if (endOfList) {
                            return <Text style={styles.endOfList}>{'End of list'}</Text>
                        }
                        return <ActivityIndicator size={'small'} style={{ marginTop: spV(50), marginBottom: spV(100) }} />
                    }}
                    onEndReachedThreshold={0}
                />
            }
            <CommonBlurModal visible={showDetails} handleCloseButton={() => setShowDetails(false)} >
                <BookDetails {...bookDetails} />
            </CommonBlurModal>
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
    },
    endOfList: {
        marginTop: spV(25), 
        marginBottom: spV(100) , 
        fontSize: fp(12), 
        color: '#ffffff', 
        textAlign: 'center', 
        fontWeight: '600' 
    }
});

export default ListingScreen;
