import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Modal } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import Header from '../Components/Header'
import Popup from '../Components/Popup';
import Button from '../Components/Button';
import ButtonColor from '../Components/ButtonColor'

function random(min: number, max: number)
{
    return  (min + Math.floor(Math.random() * (max + 1 - min)));
}

let Sequence: any = [], MySequence: any = [];

const db = SQLite.openDatabase({ name: 'ScoreDB.db'}, () => {console.log( 'Open')}, error => { console.log( 'Error'); });

export default function Home( {navigation}: any )
{
  const [Game, setGame] = useState<boolean>(false);
  const [InputName, inputName] = useState<boolean>(false);
  const [ActiveSeq, activeSeq] = useState<boolean>(true);
  const [ActiveB, activeB] = useState<number>(0);
  const [Score, setScore] = useState<number>(0);

  useEffect(() => 
  {
     createTable(); 
  }, []);

  const createTable = () => 
  {
    db.transaction((tx) => 
    {
      tx.executeSql( "CREATE TABLE IF NOT EXISTS Scores  (ID INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Score INTEGER);", [], () => {console.log( 'Create')}, () => {console.log( 'Error');} )
    })
  }
  const Start = () =>
  {
    Sequence = [], MySequence = [];
    Sequence.push( random(1, 4) );
    setScore(0);
    activeB(0);
    setGame(true);
    activeSeq(true);
    PlaySequence(Sequence);
  }
  const PlaySequence = (seq: any) =>
  {
    setGame(true);
    activeSeq(true);
    var i = 0;
    const TimerPlay = setInterval( () => 
    {
      activeB(seq[i]);
      setTimeout( () => {activeB(0)}, 400);
      i++;
      if( i > seq.length)
      {
        clearInterval(TimerPlay);
        activeB(0);
        activeSeq(false);
      }
    }, 800);
  }
  const Play = (i: number) =>
  {
    MySequence.push(i);
    var isOver = false;
    for( var i = 0; i < MySequence.length; i ++)
    {
      if( MySequence[i] != Sequence[i]) 
      {
        setGame(false), inputName(true), activeSeq(true), activeB(0), isOver = true;
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
    return (
      <View style={{height: '100%', width: '100%'}}>
        <Popup Score={Score} setScore={setScore} inputName={inputName} setGame={setGame} activeSeq={activeSeq} navigation={navigation} InputName={InputName} />
        <Header title='Score:' score={Score} />
        <View style={{justifyContent: 'space-around', flexDirection: 'row', width: '100%', padding: 20, top: '10%'}}>
          <ButtonColor id={0} ActiveSeq={ActiveSeq} ActiveB={ActiveB} Play={Play}/>
          <ButtonColor id={1} ActiveSeq={ActiveSeq} ActiveB={ActiveB} Play={Play}/>
        </View>
        <View style={{justifyContent: 'space-around', flexDirection: 'row', width: '100%', padding: 20, top: '10%'}}>
          <ButtonColor id={2} ActiveSeq={ActiveSeq} ActiveB={ActiveB} Play={Play}/>
          <ButtonColor id={3} ActiveSeq={ActiveSeq} ActiveB={ActiveB} Play={Play}/>
        </View>
        {Game == false &&  <Button title='Play' navigation={navigation} start={Start}/>}
      </View>
    );
};
