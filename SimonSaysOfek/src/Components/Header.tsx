import React from 'react';
import {View, Text} from 'react-native';

interface Props
{
    title: string,
    score: number
}

const Header: React.FC<Props> = ({title, score}) =>
{
    return(
        <View style={{width: '100%', height: '10%', backgroundColor: '#00f2ff', justifyContent: 'space-around', flexDirection: 'row'}}>
            <Text style={{fontSize: 30, alignSelf: 'center'}}>{title}</Text>
            <Text style={{fontSize: 30, alignSelf: 'center'}}>{score}</Text>
        </View>
    );
}

export default Header;