import React, { Component } from "react";
import { Text, View, Button, Vibration } from 'react-native';
import { Notifications } from 'expo';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { modificaTokenNotificacao, modificaNotificacao } from '../actions/AppActions';


import * as RootNavigation from './RootNavigation';

class Notification extends Component {
  constructor(props) {
    super(props);
    
  }
  

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        //console.log('Failed to get push token for push notification!');
        return;
      }
      let token = await Notifications.getExpoPushTokenAsync();
      if(token){
        console.log(token);
        //console.log(this.props.token_notificacao);
        this.props.modificaTokenNotificacao(token);
        //this.setState({expoPushToken: token});
      }
      
    } else {
      //console.log('Must use physical device for Push Notifications');
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = notification => {
    Vibration.vibrate();
    this.props.modificaNotificacao(notification);
    if(typeof notification.origin != 'undefined'){
      if(notification.origin == 'selected'){
        console.log('redirecionou novo');
        RootNavigation.navigate('ViewOrder', { Atendimento_id: 6 });  
      }
    }
    //this.setState({ notification: notification });
  };

  // Can use this function below, OR use Expo's Push Notification Tool-> https://expo.io/dashboard/notifications
  sendPushNotification = async () => {
    //console.log('this.props.token_notificacao');
    //console.log(this.props.token_notificacao);
    const message = {
      to: this.props.token_notificacao,
      sound: 'default',
      title: 'Original Title',
      body: 'And here is the body!',
      data: { data: 'goes here' },
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    }).then(response=>{
      //console.log('response');
      //console.log(response);
      const data = response._bodyInit;
      //console.log(`Status & Response ID-> ${JSON.stringify(data)}`);
    }).catch(error =>{
      //console.log('error');
      //console.log(error);
    });/**/
    
  }
  render() {
    return (null);
  }
  /*render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-around',
        }}>
        
        <Button
          title={'Press to Send Notification'}
          onPress={() => this.sendPushNotification()}
        />
      </View>
    );
  }*/
}

const mapStateToProps = state => ({
  token_notificacao: state.AppReducer.token_notificacao,
  notification: state.AppReducer.notification
});

const mapDispatchToProps = dispatch => bindActionCreators({ modificaTokenNotificacao, modificaNotificacao }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Notification);
