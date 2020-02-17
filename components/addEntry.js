import React, { Component } from 'react'
import { View } from 'react-native'
import { getMetricMetaInfo } from '../utils/helpers'


class AddEntry extends Component {
    store = {
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



    render(){
        return (
            <View>
                {
                    getMetricMetaInfo('bike').getIcon()
                }
            </View>
        )
    }
}

export default AddEntry