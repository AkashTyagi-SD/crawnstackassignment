import React from 'react';
import { View,Text, ActivityIndicator} from 'react-native';
export default function Loading(props) {
  return (
    <View>
      <ActivityIndicator size='large' color='#6646ee' animating={props.loading} />
      <Text>Please wait</Text>
    </View>
  );
}
