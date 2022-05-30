import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface Props
{
    Name: string,
    Score: number,
    id: number
}

const Item: React.FC<Props> = ({Name, Score, id}) =>
{
    return(
        <View style={{width:'100%'}}>
            <View style={styles.ListI}>
                <Text style={{fontSize: 17, fontWeight: '600',color:'#000', marginLeft: '8%', alignSelf: 'center'}}>
                ({id}) ------ {Name} ------ {Score}
                </Text>
            </View>
        </View>
    );
}

export default Item;

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