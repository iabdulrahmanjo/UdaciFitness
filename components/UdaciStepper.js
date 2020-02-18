import React from 'react'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { gray, white, purple } from '../utils/colors'

const UdaciStepper = ({ onIncrement, onDecrement, value, step, max,unit}) => {
    return (
        <View style={style.container}>
            {Platform.OS === 'ios' 
                ? 
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={onDecrement} 
                        style={[style.iosBtn,{borderTopRightRadius: 0, borderBottomRightRadius: 0}]}
                    >
                        <Entypo name='minus' size={30} color={'black'} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={onIncrement} 
                        style={[style.iosBtn,{borderTopLeftRadius: 0, borderBottomLeftRadius: 0, borderLeftWidth:0}]}>
                        <Entypo name='plus' size={30} color={'black'} />
                    </TouchableOpacity>
                </View>
                : 
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={style.androidBtn} onPress={onDecrement}>
                    <FontAwesome name='minus' size={30} color={white} />
                    </TouchableOpacity>
                    <TouchableOpacity style={style.androidBtn} onPress={onIncrement}>
                    <FontAwesome name='plus' size={30} color={white} />
                    </TouchableOpacity>
                </View>
            }
            <View style={style.matricCounter} >
                <Text style={{fontSize:24, textAlign:'center' }}>{value}</Text>
                <Text style={{fontSize:18, color:gray}}>{unit}</Text>
            </View>
           
        </View>
    )
}

const style = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:'center',
        flex:1,
        justifyContent:'space-between'
    },

    matricCounter:{
        justifyContent:'center',
        alignItems:'center',
        width:70,
    },

    iosBtn:{
        backgroundColor: white,
        borderWidth:1,
        borderRadius:3,
        borderColor: purple,
        padding:5,
        paddingLeft:25,
        paddingRight:25,
    },
    androidBtn: {
        margin: 5,
        backgroundColor: purple,
        padding: 10,
        borderRadius: 2,
      },
})

export default UdaciStepper