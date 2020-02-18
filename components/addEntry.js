import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { Ionicons } from "@expo/vector-icons";
import { getMetricMetaInfo, timeToString } from '../utils/helpers'
import UdaciSlider from './UdaciSlider'
import UdaciStepper from './UdaciStepper'
import DateHeader from './dateHeader'
import SubmitBtn from './submitBtn'
import TextButton from './TextButton'
import { submitEntry, removeEntry} from '../utils/api'

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

        // Route to Home

        removeEntry(key)
    }

    render(){

        if(this.props.alreadyLogged){
            return (
                <View>
                    <Ionicons
                        name={'md-happy'}
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
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()} />
                {Object.keys(metaInfo).map((key) => {
                    const { getIcon, type, ...rest} = metaInfo[key]
                    const value = this.state[key]

                    return (
                        <View key={key}>
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
                                <Text>{JSON.stringify(this.state)}</Text>

                <SubmitBtn onPress={this.submit}/>
            </View>

        )
    }
}

export default AddEntry