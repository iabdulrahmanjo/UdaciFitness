import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

export default function SubmitBtn({ onPress}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>submit</Text>
        </TouchableOpacity>
    )
}