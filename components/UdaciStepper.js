import React from 'react'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { View, Text, TouchableOpacity } from 'react-native'

const UdaciStepper = ({ onIncrement, onDecrement, value, step, max,unit}) => {
    return (
        <View>
            <View>
                <TouchableOpacity onPress={onDecrement}>
                    <FontAwesome name='minus' size={30} color={'black'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={onIncrement}>
                    <FontAwesome name='plus' size={30} color={'black'} />
                </TouchableOpacity>
            </View>
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

export default UdaciStepper