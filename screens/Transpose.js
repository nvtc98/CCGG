import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React,{useState} from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function Transpose() {
  const [state, setState] = React.useState({content:'Am Em7 Dm G C', tranposeTo:0});

  function transposeChord(chord, amount) {
    var scale = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"]
    var normalizeMap = {"Cb":"B", "Db":"C#", "Eb":"D#", "Fb":"E", "Gb":"F#", "Ab":"G#", "Bb":"A#",  "E#":"F", "B#":"C"}
    return chord.replace(/[CDEFGAB](b|#)?/g, function(match) {
        var i = (scale.indexOf((normalizeMap[match] ? normalizeMap[match] : match)) + amount) % scale.length;
        return scale[ i < 0 ? i + scale.length : i ];
    })
}

  const parse=()=>{
    const result= state.content.split(' ').map((item)=>transposeChord(item,state.tranposeTo)).join(' ');
    return result?result:"nhập gì đi mai fiend";
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <TextInput
      style={{ height: 40, borderColor: '#CCC', borderWidth: 1 }}
      multiline
      onChangeText={text => setState({...state, content:text})}
      value={state.content}
      />
      <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <Button
          title="-"
          color="#333"
          onPress={() => {setState({...state,tranposeTo:state.tranposeTo-1})}}
        />
        <Text>{state.tranposeTo}</Text>
        <Button
          title="+"
          color="#333"
          onPress={() => {setState({...state,tranposeTo:state.tranposeTo+1})}}
        />
      </View>
      <Text>{parse()}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    padding:10
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
});
