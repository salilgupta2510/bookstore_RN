import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewStyle, Pressable, Image } from 'react-native';
import Modal from 'react-native-modal';
import { BlurView } from '@react-native-community/blur';
import { hp, spV, wp } from '../../utils/normalize';

type CommonBlurModalProps = {
    visible: boolean;
    blurAmount?: number;
    blurType?: any;
    children: JSX.Element;
    containerStyle?: ViewStyle;
    contentStyle?: ViewStyle;
    handleCloseButton: () => void;
    showCloseButton?: boolean;
    onModalWillHide?: () => void;
    onModalHide?: () => void;
    onBackPress?: () => void;
    onModalWillShow?: () => void;
};

const CommonBlurModal = ({
    visible,
    blurAmount = 10,
    blurType = 'dark',
    children,
    containerStyle,
    contentStyle,
    handleCloseButton,
    showCloseButton = true,
    onModalWillHide,
    onModalHide,
    onBackPress,
    onModalWillShow,
}: CommonBlurModalProps): JSX.Element => {
    return (
        <Modal
            isVisible={visible}
            style={styles.modal}
            onModalWillHide={onModalWillHide}
            onModalHide={onModalHide}
            onBackButtonPress={onBackPress}
            onModalWillShow={onModalWillShow}
            animationIn={'fadeIn'}
            animationOut={'fadeOut'}
            useNativeDriver
        >
            <BlurView
                style={styles.blurView}
                blurType={blurType}
                blurAmount={blurAmount}
                reducedTransparencyFallbackColor="white"
            />
            <View style={[styles.container, containerStyle]}>
                <View style={[styles.content, contentStyle]}>
                    {showCloseButton && (
                        <Pressable
                            style={({ pressed }) => [styles.closeButton, { opacity: pressed ? 0.5 : 1 }]}
                            onPress={() => handleCloseButton && handleCloseButton()}
                        >
                            <Image
                                source={require('../../../assets/common/cross_lightGray_icon.png')}
                            />
                        </Pressable>
                    )}
                    {children}
                </View>
            </View>
        </Modal>
    );
};

export default CommonBlurModal;

const styles = StyleSheet.create({
    modal: { margin: 0 },
    blurView: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    container: {
        paddingHorizontal: wp(16),
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        marginTop: spV(50)
    },
    content: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        borderRadius: hp(16),
        padding: wp(16),
        // backgroundColor: '#ffffff',
    },
    closeButton: {
        alignSelf: 'flex-end',
        marginBottom: spV(16),
    },
});
