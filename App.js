import React from 'react';
import {View, Text} from 'react-native';

import AppStack from 'navigator';

const App = () => {
  return (
    <View style={{flex: 1}}>
      <AppStack />
    </View>
  );
};

export default App;
