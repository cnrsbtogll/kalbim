import React, {Component} from 'react';
import {
  Container,
  Left,
  Content,
  Right,
  ListItem,
  Text,
  Separator,
  Icon,
  CheckBox,
  Body,
  Header,
  Button,
  Title,
  Picker
} from 'native-base';
import colors from '../styles/colors';
import {FlatList} from 'react-native';

export default class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formats: [
        {id: 10, name: 'Celsius (°C)'},
        {id: 20, name: 'Fahrenheit (°F)'},
      ],
      selectedId: 10,
      selected: undefined,
    };
  }
  onCheckBoxPress(value) {
    this.setState({
      selectedId: value,
    });
  }
  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }
  render() {
    return (
      <Container style={{backgroundColor: colors.containercolor}}>
        <Content>
        <Header transparent>
          <Left>
            <Button transparent onPress={() => {              
            this.props.navigation.navigate('Profile')}}>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Ayarlar</Title>
          </Body>
        </Header>
          <Separator bordered>
            <Text style={{fontSize: 16}}>Derece Formatı</Text>
          </Separator>
          <FlatList
            extraData={this.state}
            keyExtractor={(item, index) => item.id}
            data={this.state.formats}
            renderItem={({item}) => {
              return (
                <ListItem  onPress={() => this.onCheckBoxPress(item.id)}>
                  <CheckBox
                    checked={this.state.selectedId == item.id}
                    onPress={() => this.onCheckBoxPress(item.id)}
                  />
                  <Body>
                    <Text style={{color: colors.white}}>{item.name}</Text>
                  </Body>
                </ListItem>
              );
            }}
          />

          <Separator bordered>
            <Text style={{fontSize: 16}}>EKG Ayarları</Text>
          </Separator>
          <ListItem  onPress={() => this.onCheckBoxPress(item.id)}>
            <Left>
              <Text style={{color: colors.white}}>Sayfa Hızı</Text>
            </Left>
            <Picker
              mode="dropdown"
              placeholder="Select your SIM"
              iosIcon={<Icon name="arrow-down" 
              style={{ color: "#ffffff", fontSize: 25 }}/>}
              placeholder="Select your SIM"
              textStyle={{ color: colors.white }}
              itemStyle={{
                backgroundColor: "#fff",
                marginLeft: 0,
              }}
              itemTextStyle={{ color: '#fff' }}
              style={{ color:'gray', width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="25 mm/s" value="key0" />
              <Picker.Item label="50 mm/s" value="key1" />
            </Picker>             
          </ListItem>
          <ListItem >
            <Left>
              <Text style={{color: colors.white}}>Genlik</Text>
            </Left>
           
            <Picker
              mode="dropdown"
              placeholder="Select your SIM"
              iosIcon={<Icon name="arrow-down" 
              color={colors.white}/>}
              placeholder="Select your SIM"
              textStyle={{ color: colors.white }}
              itemStyle={{
                backgroundColor: "#fff",
                marginLeft: 0,
              }}
              itemTextStyle={{ color: '#fff' }}
              style={{ color:'gray', width: undefined }}
              selectedValue={this.state.selected}
              onValueChange={this.onValueChange.bind(this)}
            >
              <Picker.Item label="5 mm/mV" value="key0" />
              <Picker.Item label="10 mm/mV" value="key1" />
              <Picker.Item label="20 mm/mV" value="key2" />
            </Picker>             
            
          </ListItem>
        </Content>
      </Container>
    );
  }
}
