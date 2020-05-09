import React, { Component } from 'react';
import { Container,Spinner,Text, View } from 'native-base';
import colors from '../../styles/colors'
import firebase from "../../Firebase";


export default class AuthLoading extends Component {
  async componentDidMount() {
		firebase.auth().onAuthStateChanged((user) =>{
      if(user){
        let doc_ref = firebase.database().ref("Doctor").child(user.uid);
        doc_ref.once('value', snap => {
          if(snap.exists()) this.props.navigation.navigate("App", {is_doctor:true});
          else this.props.navigation.navigate("App", {is_doctor:false});
        })
        console.log(user.uid);
      }else{
        this.props.navigation.navigate("Auth");
      }
    });
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


