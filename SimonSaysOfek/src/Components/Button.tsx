import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface Props
{
    title: string;
    start?: any
    navigation: any
}


const Button: React.FC<Props> = ({title, start, navigation}) =>
{
    const Action = () =>
    {
        if(title == 'Play')
        {
            navigation.navigate('Home');
            start();
        }
        else if(title == 'New Game') navigation.navigate('Home');
    }
    return(
        <TouchableOpacity style={styles.Button} onPress={Action}>
            <Text style={styles.TextButton}>{title}</Text>
        </TouchableOpacity>
    );
}

export default Button;


const styles = StyleSheet.create(
{
    Button:
    {
        width: '80%',
        height: '8%',
        backgroundColor: '#00f2ff',
        justifyContent: 'center',
        alignSelf: 'center',
        top: '10%'
    },
    TextButton:
    {
    color: 'black',
    fontSize: 30,
    alignSelf: 'center',
    textAlign: 'center'
    }
});