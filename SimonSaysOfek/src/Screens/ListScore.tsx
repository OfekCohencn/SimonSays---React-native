import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useAppSelector } from '../Redux/actions';
import SQLite from 'react-native-sqlite-storage';
import Header from '../Components/Header';
import Button from '../Components/Button';
import Item from '../Components/Item';

export default function ListScore({navigation}: any)
{
  interface itemArray
  {
    Name: string,
    Score: number,
    id: number
  }
  const ScoreR  = useAppSelector(state => state.game.ScoreR);
  const [Items, insertItem] = useState<itemArray[]>([])

  useEffect(() => { 
    ListDB(); 
  }, []);

  const ListDB = () =>
  {
    insertItem([]);
    const db = SQLite.openDatabase({ name: 'ScoreDB.db'}, () => {console.log( 'Open')}, () => { console.log( 'Error'); });
    db.transaction(tx => 
    {
      tx.executeSql('SELECT * FROM Scores ORDER BY Score DESC', [], (tx: any, results: any) => 
      {
        console.log(results.rows.length);
        for (let i = 0; i < 10; i++) 
        {
          if(i <= results.rows.length)
          {
            var Name = results.rows.item(i).Name;
            var Score = results.rows.item(i).Score;
            insertItem( state => [...state, { Name: Name, Score: Score, id: i+1}])
          }
        }
      });
    });
  }

  return (
    <View style={{height: '100%', width: '100%'}}>
      <Header title='Last Score:' score={ScoreR} />
      <Text style={{fontSize: 30, textAlign: 'center', height: '10%', width: '100%', alignSelf: 'center', top: '3%', color: 'black'}}>Top 10</Text>
      <View style={{width: '100%', height: '60%', top: '3%'}}>
        {Items.map((state) => 
        {
          return <Item Score={state.Score} Name={state.Name} key={state.id} id={state.id} />;
        })}
      </View>
      <Button title='New Game' navigation={navigation}/>
    </View>
  );
};

