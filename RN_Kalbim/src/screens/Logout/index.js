import React, { Component } from 'react'
import MyButton from '../../components/MyButton'
import { StyleSheet, View,Image } from 'react-native'
import colors from '../../styles/colors'

export default class Logout extends Component {
    render() {
        return (
            <View style={styles.wrapper}>
                
               <Image 
                    source={require('../../img/healthcare.png')}
                    style={styles.logo}
                    />
                <MyButton 
                    text={"Giriş Yap"}
                    color={colors.white}
                    backgroundColor={colors.blueloginbutton}/>
                    <MyButton 
                    text="Facebook ile Bağlan"
                    color={colors.white}
                    backgroundColor={colors.bluefacebookloginbutton}/>
                    <MyButton 
                    text="Google ile Bağlan"
                    color={colors.white}
                    backgroundColor={colors.redgoogleloginbutton}/>
                    <MyButton 
                    text="Hesap Oluştur"
                    color={colors.bluebackground}
                    backgroundColor={colors.white}/>
                    </View>
        )
    }
}

const styles=StyleSheet.create({
    wrapper:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:colors.bluebackground,
    },
    logo:{
        width:200,
        height:200,
        marginTop:50,
        marginBottom:100,
    }
})
