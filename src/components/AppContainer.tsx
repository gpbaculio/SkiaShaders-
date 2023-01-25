import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';

import restyleTheme from 'restyleTheme';

type AppContainerProps = {children: React.ReactNode};

const AppContainer = ({children}: AppContainerProps) => (
  <GestureHandlerRootView style={styles.container}>
    <ThemeProvider theme={restyleTheme}>{children}</ThemeProvider>
  </GestureHandlerRootView>
);

export default AppContainer;

const styles = StyleSheet.create({
  container: {flex: 1},
});
