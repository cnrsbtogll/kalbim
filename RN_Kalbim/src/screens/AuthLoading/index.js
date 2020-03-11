import React, { Component } from 'react';
import { Container,Spinner,Text, View } from 'native-base';
import colors from '../../styles/colors'
import {inject} from 'mobx-react';

@inject('AuthStore')
export default class AuthLoading extends Component {
	async componentDidMount() {
		await this.props.AuthStore.setupAuth();
	}
  render() {
    return (
      <Container>
		<View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
          <Spinner color={colors.background} />
		  <Text>Yükleniyor...</Text>
		  </View>
      </Container>
    );
  }
}









// import React, { Component } from 'react'
// import { Text, View, StyleSheet } from 'react-native'

// import {inject} from 'mobx-react';

// @inject('AuthStore')
// export default class AuthLoading extends Component {
// 	async componentDidMount() {
// 		await this.props.AuthStore.setupAuth();
// 	}

// 	render() {
//     return (
//       <View style={{ flex:1, justifyContent:'center', alignItems:'center' }}>
// 				<Text>Loading...</Text>
// 			</View>
//     );
//   }
// }

// const styles = StyleSheet.create({});