import React from 'react';
import {TouchableOpacity} from 'react-native';

interface Props
{
    id: number,
    ActiveSeq: boolean,
    ActiveB: number,
    Play: any
}

const ButtonColor: React.FC<Props> = ({id, ActiveSeq, ActiveB, Play}) =>
{
    let ColorsB = ['red', 'green', 'blue', 'yellow']
    return(
        <TouchableOpacity disabled={ActiveSeq} style={{width: 100, height: 100, 
            backgroundColor: (ActiveB == id+1 ? 'gray' : ColorsB[id]), borderColor: 'black', borderWidth: 2}} onPress={() => Play(id+1)} />
    );
}

export default ButtonColor;