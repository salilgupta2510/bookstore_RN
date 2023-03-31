import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { fp, hp, spH, spV, wp } from '../../utils/normalize';
import DetailsCard from '../Common/DetailsCard';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export interface BookDetailsProps {
    imageUrl?: string;
    title?: string;
    authors?: string[];
    firstPublishedIn?: string;
    numberOfEditions?: number;
    eBookCount?: number;
    publisher?: string;
}

const BookDetails = ({ imageUrl, title, authors, firstPublishedIn, numberOfEditions, eBookCount, publisher }: BookDetailsProps): JSX.Element => {
    const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);

    const imageProps = eBookCount && eBookCount > 0 ? { uri: imageUrl, priority: FastImage.priority.high } : require('../../../assets/listing/placeholder.png')

    const getAuthors = () => {
        let authorString = '';
        authors?.map((name: string, index: number) => {
            authorString = `${authorString} ${name}${index == authors.length - 2 ? ' and' : index == authors.length - 1 ? '' : ','}`
        })
        return authorString;
    }

    return (
        <View style={styles.container}>
            <ShimmerPlaceHolder
                visible={isImageLoaded}
                shimmerStyle={styles.bookImage}
            >
                <FastImage
                    source={imageProps}
                    style={styles.bookImage}
                    resizeMode={FastImage.resizeMode.stretch}
                    defaultSource={require('../../../assets/listing/placeholder.png')}
                    onLoadEnd={() => setIsImageLoaded(true)}
                />
            </ShimmerPlaceHolder>
            {numberOfEditions ? (
                <View>

                </View>
            ) : null}
            {eBookCount && eBookCount > 0 ? null : (
                <Text style={styles.onImageTitle}>{title}</Text>
            )}
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.author}>{`by${getAuthors()}`}</Text>
            <DetailsCard label1='First Published' value1={firstPublishedIn} label2={'Published'} value2={publisher} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    bookImage: {
        width: wp(280),
        height: hp(340),
        borderRadius: wp(5)
    },
    onImageTitle: {
        position: 'absolute',
        color: '#494949',
        fontSize: fp(18),
        fontWeight: '600',
        textAlign: 'center',
        top: spV(100),
        width: wp(130)
    },
    title: {
        color: '#ffffff',
        fontSize: fp(18),
        fontWeight: '600',
        textAlign: 'center',
        marginTop: spV(10)
    },
    author: {
        color: '#f5f5f5',
        fontSize: fp(14),
        textAlign: 'center',
        marginTop: spV(10),
        fontStyle: 'italic'
    },
});

export default BookDetails;
