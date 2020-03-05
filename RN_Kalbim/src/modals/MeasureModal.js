import React, { Component } from 'react';
import { Container, Tab, Tabs, TabHeading, Text } from 'native-base';
import Tab1 from './EKGModal';
import Tab2 from './BloodPressureModal';
import Tab3 from './BodyTemperatureModal';
import Tab4 from './HeartRateModal';
import Tab5 from './SpoModal';
import { observer,inject } from 'mobx-react'


@inject('InitialPageStore')
export default class MeasureModal extends Component {
  render() {
    const {InitialPageStore}=this.props;
    return (
      <Container>
        <Tabs initialPage={InitialPageStore.initialPage}>
          <Tab heading={ <TabHeading><Text>EKG</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Text>Tans.</Text></TabHeading>}>
            <Tab2 />
          </Tab>
          <Tab heading={ <TabHeading><Text>Ateş</Text></TabHeading>}>
            <Tab3 />
          </Tab>
          <Tab heading={ <TabHeading><Text>Kalp Ritmi</Text></TabHeading>}>
            <Tab4 />
          </Tab>
          <Tab heading={ <TabHeading><Text>SpO₂</Text></TabHeading>}>
            <Tab5 />
          </Tab>
        </Tabs>
      </Container>
      
    );
  }
}