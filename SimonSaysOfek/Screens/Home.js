import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { setScoreR } from '../Redux/actions';
import SQLite from 'react-native-sqlite-storage';
import Sound from 'react-native-sound';

function random(min, max)
{
    return  (min + Math.floor(Math.random() * (max + 1 - min)));
}

let Sequence = [], MySequence = [];
let sound_b = ['sound_1.mp3', 'sound_2.mp3', 'sound_3.mp3', 'sound_4.mp3']
var SoundB = null;
const db = SQLite.openDatabase({ name: 'ScoreDB.db'}, () => {console.log( 'Open')}, error => { console.log( 'Error'); });
Sound.setCategory('Playback');

export default function Home({ navigation })
{
  const dispatch = useDispatch();
  const [Game, setGame] = useState(false);
  const [InputName, inputName] = useState(false);
  const [ActiveSeq, activeSeq] = useState(true);
  const [ActiveB, activeB] = useState(0);
  const [Name, setName] = useState('');
  const [Score, setScore] = useState(0);

  useEffect(() => { createTable(); }, []);

  const createTable = () => 
  {
    db.transaction((tx) => 
    {
      tx.executeSql( "CREATE TABLE IF NOT EXISTS Scores  (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Score INTEGER);", [], () => {console.log( 'Create')}, () => {console.log( 'Error');} )
    })
  }
  const Start = () =>
  {
    var StartGameS = new Sound('start_game.mp3', Sound.MAIN_BUNDLE, () => { StartGameS.play(); });
    Sequence = [], MySequence = [];
    Sequence.push( random(1, 4) );
    setScore(0);
    activeB(0);
    setGame(true);
    activeSeq(true);
    PlaySequence(Sequence);
  }
  const PlaySequence = (seq) =>
  {
    setGame(true);
    activeSeq(true);
    var i = 0;
    const TimerPlay = setInterval( () => 
    {
      var numberS= seq[i];
      activeB(seq[i]);
      setTimeout( () => {activeB(0)}, 400);
      i++;
      if( i > seq.length)
      {
        clearInterval(TimerPlay);
        activeB(0);
        activeSeq(false);
      }
      else SoundB = new Sound(sound_b[numberS-1], Sound.MAIN_BUNDLE, () => { SoundB.play(); });
    }, 800);
  }
  const Play = (i) =>
  {
    MySequence.push(i);
    var isOver = false;
    for( var i = 0; i < MySequence.length; i ++)
    {
      if( MySequence[i] != Sequence[i]) 
      {
        setGame(false), inputName(true), activeSeq(true), activeB(0), isOver = true;
        var GameOverS = new Sound('game_over.mp3', Sound.MAIN_BUNDLE, () => { GameOverS.play(); });
      }
    }
    if(Game == true && MySequence.length == Sequence.length && isOver == false)
      {
        MySequence = [];
        isOver = false;
        Sequence.push( random(1, 4) );
        setScore(Score+1);
        activeSeq(false);
        PlaySequence(Sequence);
      }
  }
  const renderButtons = (i) =>
  {
    let ColorsB = ['red', 'green', 'blue', 'yellow']
    return (
      <TouchableOpacity disabled={ActiveSeq} style={{width: 100, height: 100, backgroundColor: (ActiveB == i+1 ? 'gray' : ColorsB[i]), borderColor: 'black', borderWidth: 2}} onPress={() => 
      {
        SoundB = new Sound(sound_b[i], Sound.MAIN_BUNDLE, () => { SoundB.play(); });
        Play( i+1 );
      }}>

      </TouchableOpacity>
    );
  }

  const InsetName = async () => 
  {
    if(Name.length == 0){}
    else 
    {
      try 
      {
        await db.transaction(async (tx) => 
        {
          await tx.executeSql( "INSERT INTO Scores (Name, Score) VALUES (?,?)", [Name, Score] );
        } );
        console.log("insert");
        dispatch(setScoreR(Score));
        setScore(0)
        inputName(false)
        setGame(false);
        activeSeq(true);
        navigation.navigate('ListScore');
      } catch (error) { console.log("error insert"); }
    }
  }
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Modal animationType="slide" transparent={true} visible={InputName} >
          <View style={{height: '100%', width: '100%', position: 'absolute', backgroundColor: '#00000060', zIndex: 2, justifyContent: 'center'}}>
            <View style={{width: '75%', alignSelf: 'center', backgroundColor: '#fff', borderWidth: 1, borderColor: '#89622b90',
            borderRadius: 4, elevation: 4, paddingTop: '8%', paddingLeft: '10%', paddingRight: '10%'}}>
              <Text style={{color: 'black', fontSize: 20, fontWeight: '600', textAlign: 'center', paddingBottom: '3%'}}>
                Game Over
              </Text>
              <TextInput  underlineColorAndroid="transparent" placeholderTextColor="#000" style={styles.InputText} placeholder='Your Name'
                  onChangeText={(value) => setName(value)} maxLength={12}/>
              <TouchableOpacity onPress={InsetName} style={{top: '20%', paddingBottom: '5%'}}>
                <Text style={{color: '#000', fontSize: 22, textAlign: 'center', paddingLeft: '5%', paddingRight: '5%', backgroundColor: '#00f2ff',
                borderColor: '#000', borderWidth:1, borderRadius: 6, alignSelf: 'center'}}>Send</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <View style={{width: '100%', height: '10%', backgroundColor: '#00f2ff', justifyContent: 'space-around', flexDirection: 'row'}}>
          <Text style={{fontSize: 30, alignSelf: 'center'}}>{Score}</Text>
          <Text style={{fontSize: 30, alignSelf: 'center'}}>Score:</Text>
        </View>
        <View style={{justifyContent: 'space-around', flexDirection: 'row', width: '100%', padding: 20, top: '10%'}}>
          {renderButtons(0)}
          {renderButtons(1)}
        </View>
        <View style={{justifyContent: 'space-around', flexDirection: 'row', width: '100%', padding: 20, top: '10%'}}>
          {renderButtons(2)}
          {renderButtons(3)}
        </View>
        {Game == false && <TouchableOpacity style={{width: '80%', height: '8%', backgroundColor: '#00f2ff', justifyContent: 'center', alignSelf: 'center', top: '10%'}} onPress = {Start}>
            <Text style={{color: 'black', fontSize: 30, alignSelf: 'center', textAlign: 'center'}}>Play</Text>
        </TouchableOpacity>}
      </View>
    );
};

const styles = StyleSheet.create(
{
  InputText:
  {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: '#00f2ff',
    height: '20%',
    padding:'2%',
    top: '6%',
    fontSize: 14
  },
});
