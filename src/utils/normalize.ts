import { Dimensions, PixelRatio } from 'react-native';

type Mode = 'width' | 'height';
type Scale = number;

const {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT
} = Dimensions.get('window');

// Default scaling for new methods    
const widthBaseScale = SCREEN_WIDTH / 360;
const heightBaseScale = SCREEN_HEIGHT / 640;

function normalize(size: Scale, based: Mode = 'width') {
    const newSize = (based === 'height') ? size * heightBaseScale : size * widthBaseScale;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

// width pixel
// Wrap your width with this function eg. width: wp(20)
export const wp = (size: Scale): number => {
    return normalize(size, 'width');
};

// height pixel
// Wrap your height with this function eg. height: hp(20)
export const hp = (size: Scale): number => {
    return normalize(size, 'height');
};

// font pixel
// Wrap your font size with this function eg. fontSize: fp(20)
export const fp = (size: Scale): number => {
    return hp(size);
};

// vertical pixel
// Wrap your marginVertical, marginTop, marginBottom, paddingVertical, paddingTop, paddingBottom with this function 
// eg. marginVertical: spV(20)
export const spV = (size: Scale): number => {
    return hp(size);
};

// horizontal pixel
// Wrap your marginHorizontal, marginRight, marginLeft, paddingHorizontal, paddingRight, paddingLeft with this function 
// eg. marginHorizontal: spH(20)
export const spH = (size: Scale): number => {
    return wp(size);
};
