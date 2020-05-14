import React, {Component} from 'react';
import {Container, Tab, Tabs } from 'native-base';
import colors from '../styles/colors';
import Tab1 from './EKGModal';
import Tab2 from './BloodPressureModal';
import Tab3 from './BodyTemperatureModal';
import Tab4 from './HeartRateModal';
import Tab5 from './SpoModal';
import {inject } from 'mobx-react'

@inject('InitialPageStore')
export default class MeasureModal extends Component {
  render() {
    const {InitialPageStore}=this.props;
    return (
      <Container>
        <Tabs initialPage={InitialPageStore.initialPage} 
        >
          <Tab heading="EKG" tabStyle={{backgroundColor: colors.background}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: colors.background}} activeTextStyle={{color: colors.white, fontWeight: 'normal'}}>
            <Tab1 />
          </Tab>
          <Tab heading="Tansiyon" tabStyle={{backgroundColor: colors.background}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: colors.background}} activeTextStyle={{color: colors.white, fontWeight: 'normal'}}>
            <Tab2 />
          </Tab>
          <Tab heading="Ateş" tabStyle={{backgroundColor: colors.background}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: colors.background}} activeTextStyle={{color: colors.white, fontWeight: 'normal'}}>
            <Tab3 />
          </Tab>
          <Tab heading="Kalp Ritmi" tabStyle={{backgroundColor: colors.background}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: colors.background}} activeTextStyle={{color: colors.white, fontWeight: 'normal'}}>
            <Tab4 />
            </Tab>
            <Tab heading="SpO₂" tabStyle={{backgroundColor: colors.background}} textStyle={{color: 'gray'}} activeTabStyle={{backgroundColor: colors.background}} activeTextStyle={{color: colors.white, fontWeight: 'normal'}}>          
            <Tab5 />
          </Tab>
        </Tabs>
      </Container>

    );
  }
} 
