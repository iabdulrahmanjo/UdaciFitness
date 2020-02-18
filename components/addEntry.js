import React, { Component } from 'react'
import { View,Text, StyleSheet, Platform } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { getMetricMetaInfo, timeToString, getDailyReminderValue } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './dateHeader'
import SubmitBtn from './submitBtn'
import TextButton from './TextButton'
import { submitEntry, removeEntry} from '../utils/api'
import { connect } from 'react-redux'
import { addEntry } from '../actions/index'
import { white } from '../utils/colors';

class AddEntry extends Component {
    state = {
        run: 0,
        bike:0,
        swim:0,
        sleep:0,
        eat:0
    }

    increment = (metric) => {
        const { max, step } = getMetricMetaInfo(metric)

        this.setState((currenState) => {
            const count = currenState[metric] + step
            return {
                ...currenState,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const { step } = getMetricMetaInfo(metric)

        this.setState((currenState) => {
            const count = currenState[metric] - step
            return {
                ...currenState,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState({
            [metric]: value
        })
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        // Update Redux
        this.props.dispatch(addEntry({
            [key]: entry
        }))


        this.setState(() => ({ 
            run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 
        }))

        // Navigate to home

        submitEntry({key,entry})

        // Clear local notification
    }

    reset = () => {
        const key = timeToString()

        // Update Redux
        this.props.dispatch(addEntry({
            [key]: getDailyReminderValue()
        }))

        // Route to Home

        removeEntry(key)
    }

    render(){

        if(this.props.alreadyLogged){
            return (
                <View style={style.center}>
                    <Ionicons
                        name={Platform.OS === "ios" ? "ios-happy" : "md-happy"}
                        size={100}
                    />
                    <Text>You already logged your information for today.</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            )
        }

        const metaInfo = getMetricMetaInfo()
        return (
            <View style={style.container}>
                <DateHeader date={(new Date()).toUTCString().substr(0,12)}/>
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key} style={style.row}>
                            {getIcon()}
                            {type === 'slider'
                                ? <UdaciSlider
                                    value={value}
                                    onChange={(value) => this.slide(key, value)}
                                    {...rest}
                                />
                                : <UdaciStepper
                                    value={value}
                                    onIncrement={() => this.increment(key)}
                                    onDecrement={() => this.decrement(key)}
                                    {...rest}
                                />}
                        </View>
                    )
                })}
                <SubmitBtn onPress={this.submit}/>
            </View>

        )
    }
}

const style = StyleSheet.create({
    container:{
        flex: 1,
        padding: 20,
        backgroundColor: white,
    },

    row:{
        flexDirection: "row",
        flex:1,
        // marginBottom:55,
        alignItems:"center",
    },

    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30,

      },
})

const mapStateToProp = (state) => {
    const key = timeToString();

    return {
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProp)(AddEntry)