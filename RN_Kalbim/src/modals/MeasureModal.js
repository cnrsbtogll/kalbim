import React, { Component } from 'react';
import { Container,TabBarTop, Tab, Tabs, TabHeading, Text } from 'native-base';
import Tab1 from './EKGModal';
import Tab2 from './BloodPressureModal';
import Tab3 from './BodyTemperatureModal';
import Tab4 from './HeartRateModal';
import Tab5 from './SpoModal';
import colors from '../styles/colors';
export default class MeasureModal extends Component {
  render() {
    return (
      <Container>
        <Tabs>
          <Tab heading={ <TabHeading><Text>EKG</Text></TabHeading>}>
            <Tab1 />
          </Tab>
          <Tab heading={ <TabHeading><Text>Tansiyon</Text></TabHeading>}>
            <Tab2 />
          </Tab>
          <Tab heading={ <TabHeading><Text>Ateş</Text></TabHeading>}>
            <Tab3 />
          </Tab>
          <Tab heading={ <TabHeading><Text>Kalp Ritmi</Text></TabHeading>}>
            <Tab4 />
          </Tab>
          <Tab heading={ <TabHeading><Text>SpO₂s</Text></TabHeading>}>
            <Tab5 />
          </Tab>
        </Tabs>
      </Container>
      
    );
  }
}