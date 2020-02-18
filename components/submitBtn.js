import React from 'react'
import { Text, TouchableOpacity, StyleSheet} from 'react-native'
import { purple, white } from '../utils/colors'

export default function SubmitBtn({ onPress}) {
    return (
        <TouchableOpacity 
            onPress={onPress} 
            style={Platform.OS === 'ios' ? style.iosSubmitBtn : style.AndroidSubmitBtn}>
            <Text style={{textAlign:'center', color:white, fontSize:22, fontWeight:'500'}}>Submit</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    iosSubmitBtn: {
        padding:10,
        backgroundColor:purple,
        borderRadius:7,
    },

    AndroidSubmitBtn: {
        backgroundColor: purple,
        paddingRight: 30,
        padding: 10,
        paddingLeft: 30,
        height: 45,
        borderRadius: 2,
        alignSelf: 'flex-end',
        justifyContent: 'center',
        alignItems: 'center',
      },
})