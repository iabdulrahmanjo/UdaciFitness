import React from 'react'
import { View, Text, Slider,StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

const UdaciSlider = ({ max, step, unit, value, onChange}) => {
    return (
        <View style={style.container}>
            <Slider
                style={{flex:1}}
                step={step}
                value={value}
                maximumValue={max}
                minimumValue={0}
                onValueChange={onChange}
                />
            <View style={style.metricCounter}>
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
    },
    metricCounter: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft:20
      },
})

export default UdaciSlider