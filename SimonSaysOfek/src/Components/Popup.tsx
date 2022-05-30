import React, {useState} from 'react';
import {View, Text, Modal, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import { useAppDispatch } from '../Redux/actions';
import { setScoreR } from '../Redux/reducers';

interface Props
{
    Score: number
    setScore: React.Dispatch<React.SetStateAction<number>>;
    inputName: React.Dispatch<React.SetStateAction<boolean>>;
    setGame: React.Dispatch<React.SetStateAction<boolean>>;
    activeSeq: React.Dispatch<React.SetStateAction<boolean>>;
    navigation: any
    InputName: boolean
}
const db = SQLite.openDatabase({ name: 'ScoreDB.db'}, () => {console.log( 'Open')}, error => { console.log( 'Error'); });

const Popup: React.FC<Props> = ({Score, setScore, inputName, setGame, activeSeq, navigation, InputName}) =>
{
    const dispatch = useAppDispatch();
    const [Name, setName] = useState<string>('');
    const InsetName = async () => 
    {
        if(Name.length != 0)
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
        } catch (error) { console.log(error); }
        }
    }
    return(
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
    );
}

export default Popup;

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