import React from 'react'
import { Text, TouchableOpacity, StyleSheet} from 'react-native'
import { purple, white } from '../utils/colors'

export default function SubmitBtn({ onPress}) {
    return (
        <TouchableOpacity onPress={onPress} style={style.iosSubmitBtn}>
            <Text style={{textAlign:'center', color:white, fontSize:22, fontWeight:'500'}}>Submit</Text>
        </TouchableOpacity>
    )
}

const style = StyleSheet.create({
    iosSubmitBtn: {
        padding:10,
        backgroundColor:purple,
        borderRadius:7,
    }
})