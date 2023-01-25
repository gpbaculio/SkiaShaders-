import {createBox} from '@shopify/restyle';
import FastImage, {FastImageProps} from 'react-native-fast-image';

import {Theme} from 'restyleTheme';

const DynamicFastImage = createBox<Theme, FastImageProps>(FastImage);

export default DynamicFastImage;
