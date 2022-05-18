import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import SQLite from 'react-native-sqlite-storage';

export default function ListScore({ navigation })
{
  const { ScoreR } = useSelector(state => state.ReducerU);
  const [Items, insertItem] = useState([])
  useEffect(() => 
  { 
    ListDB(); 
  }, []);

  const ListDB = () =>
  {
    insertItem([]);
    const db = SQLite.openDatabase({ name: 'ScoreDB.db'}, () => {console.log( 'Open')}, error => { console.log( 'Error'); });
    db.transaction(tx => 
    {
      tx.executeSql('SELECT * FROM Scores ORDER BY Score DESC', [], (tx, results) => 
      {
        console.log(results.rows.length);
        for (let i = 0; i < 10; i++) 
        {
          if(i <= results.rows.length)
          {
            var Name = results.rows.item(i).Name;
            var Score = results.rows.item(i).Score;
            insertItem(state => [...state,
            <View style={{width:'100%'}}>
              <View style={styles.ListI}>
                  <View style={{color:'#000', alignSelf: 'center', marginLeft: '8%'}}>
                      <Text style={{fontSize: 17, fontWeight: '600',color:'#000'}}>
                      {Score} ------ {Name} ------ ({i+1})
                      </Text>
                  </View>
              </View>
            </View>]);
          }
        }
      });
    });
  }

  return (
    <View style={{height: '100%', width: '100%'}}>
      <View style={{width: '100%', height: '10%', backgroundColor: '#00f2ff', justifyContent: 'space-around', flexDirection: 'row'}}>
          <Text style={{fontSize: 30, alignSelf: 'center'}}>{ScoreR}</Text>
          <Text style={{fontSize: 30, alignSelf: 'center'}}>Last Score:</Text>
      </View>
      <Text style={{fontSize: 30, textAlign: 'center', height: '10%', width: '100%', alignSelf: 'center', top: '3%', color: 'black'}}>Top 10</Text>
      <View style={{width: '100%', height: '60%', top: '3%'}}>
        {Items}
      </View>
      <TouchableOpacity style={{width: '80%', height: '8%', backgroundColor: '#00f2ff', justifyContent: 'center', alignSelf: 'center', top: '10%'}} onPress={() => navigation.navigate('Home')}>
          <Text style={{color: 'black', fontSize: 30, alignSelf: 'center', textAlign: 'center'}}>New Game</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create(
{
  ListI:
  {
    height: 40,
    width: '100%',
    borderTopColor: 'gray',
    borderTopWidth: 1,
    flexDirection: 'row'
  },
});
