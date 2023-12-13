import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import Feather from 'react-native-vector-icons/Feather'

export default function TaskList({ data, deleteItem, editItem }) {
    return (
        <View style={styles.container}>
            <TouchableOpacity style={{marginRight: 10}} onPress={() => deleteItem(data.key) }>
                <Feather name="trash" color='#FFF' size={20} />
            </TouchableOpacity>

            <View style={{paddingRight: 10}}>
                <TouchableWithoutFeedback onPress={() => editItem(data)}>
                    <Text style={{paddingRight: 10, color:'#FFF'}}>{data.nome}</Text>
                </TouchableWithoutFeedback>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#141414',
        borderRadius: 4,
        padding: 10,
        marginBottom: 10,
        alignItems: 'center',
        flexDirection: 'row'
    },
    text:{
        color: '#FFF'
    }
})