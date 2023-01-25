import {createBox} from '@shopify/restyle';
import {Pressable, PressableProps} from 'react-native';

import {Theme} from 'restyleTheme';

const DynamicPressable = createBox<Theme, PressableProps>(Pressable);

export default DynamicPressable;
