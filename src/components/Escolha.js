import React, {Component} from 'react';
import {View, Button, Platform} from 'react-native';
import Color from "../../constants/Colors";
export default class BtnEscolha extends Component{
    
    render(){
        return (
            <View style={this.props.styleBtn}>
              <Button 
                title={this.props.title} 
                onPress={this.props.jokenpo}
                color={Platform.OS === 'ios' ? Color.buttonIos : Color.button}
                disabled={this.props.disabled}
              ></Button>
            </View>
        )
    }
    
}