import React from 'react'
import { Text} from 'react-native'
import { purple } from '../utils/colors'

export default function DateHeader({ date }) {
    return (
        <Text style={{fontSize:25, color:purple, marginBottom:30, fontWeight:'500'}}>{date}</Text>
    )
}
