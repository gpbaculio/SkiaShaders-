import {createBox} from '@shopify/restyle';
import React from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {Theme} from 'restyleTheme';
import DynamicText from './DynamicText';

const DynamicTextInput = createBox<
  Theme,
  TextInputProps & React.ComponentProps<typeof DynamicText>
>(TextInput);

export default DynamicTextInput;
