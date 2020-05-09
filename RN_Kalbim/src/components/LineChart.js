import React from 'react'
import { LineChart, Grid } from 'react-native-svg-charts'
import colors from '../styles/colors'
 
// @hbt1903
// Linechart'a props ile veri gönderildiyse o veriyi kullanıyor, yoksa sizin default verinizi kullanıyor
export default class SpoModal extends React.PureComponent {
 
    render() {
        let {data} = this.props;
        if(data == null) data = [ 0, 0, 65, -54, 55, -25, 0, 0, 0, 0, 20, -15, 32, 0, 0, 40, -65, 85, -75, 35, 0, 0, 54, -20, 0, 0, 65, -54, 55, -25, 0, 0, 0, 0, 50, -60, 50, 0, 0, 40, 95, -24, 85, -75, 35, 0, 0, 54, -20,   ]
        else {
            data = data.map(e => parseFloat(e));
        }
        return (
            <LineChart
                style={{ height: 200 }}
                data={ data }
                svg={{ stroke: colors.white, }}
                contentInset={{ top: 20, bottom: 20 }}>
                <Grid/>
            </LineChart>
        )
    }
 
}