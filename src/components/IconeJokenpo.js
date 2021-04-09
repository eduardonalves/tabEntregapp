import React from 'react'
import {Image, Text, View, StyleSheet,Dimensions} from 'react-native'
let {width} = Dimensions.get('window');
let imgwidth= width * 0.2;

let styles = StyleSheet.create({
    btnEscolha: {
      width: 90
    },
    painelAcoes:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginTop:20
    },
    palco:{
      alignItems:'center',
      
    },
    txtResultado:{
      fontSize: 25,
      fontWeight:'bold',
      color:'red',
      height: 60
    },
    image:{
        marginTop: 10,
        height:imgwidth,
        width:imgwidth,
    }
})
export default props => {
    return (
        <View style={styles.palco}>
            <Text>{props.texto}: </Text>
            <Image  source={props.imagemUsuario} style={styles.image}  />
        </View>
        
    )
} 
   