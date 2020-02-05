import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Picker,
  ScrollView
} from "react-native";
import { Overlay } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { removeFromCart, updateCart } from '../actions/AppActions';
import NumberFormat from 'react-number-format';

class ItemOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  handleRemoveFromCart = () => {
    this.props.removeFromCart(this.props.item_id, this.props.carrinho);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Pedidos",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Color.headerBar,
        
      },
      headerTitleStyle: {
        color: '#fff',
        fontWeight:'bold'
      },
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      )
    };
  };
  
  
  handleClick = () => {
    this.setState({
      isClicked: !this.state.isClicked
    });
    //this.props.handleNaviagation();
    Alert.alert(
      'Remover Produto',
      `Deseja mesmo remover o produto ${this.props.name} do seu pedido?`,
      [
        {
          text: 'Sim',
          onPress: () => this.handleNaviagation(),
        },
        {
          text: 'Não',
          onPress: () => console.log('Não Pressed'),
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  };
  render() {
    
    return (
      <ScrollView>
        <View
          elevation={2}
          style={{
            flexDirection: "row",
            backgroundColor: this.props.linha % 2 ? '#ffffff' : "#d2d2d2",
            padding:10,
            /*marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            padding:10,
            shadowOffset: {
              height: 1,
              width: 1
            }*/
          }}
        >
          <View style={{ flex: 4, 
          borderTopLeftRadius: 4,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 4 }}>
            <Text
              style={{
                fontSize: 15,
                //color: "#000000",
                //fontWeight: "bold",
              }}
            >
            {this.props.produtonome}
           
            </Text>

          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 15,
                //fontWeight: "bold",
               // color: "#333",
               // textAlign: 'center',
              }}
            >
           
             
            <NumberFormat 
                value={this.props.valor_unit.replace(".",",")} 
                displayType={'text'} 
                renderText={value => <Text>{value}</Text>}
                thousandSeparator={'.'}
                decimalScale={2} 
                fixedDecimalScale={true}
                prefix={'R$ '}
                decimalSeparator={','}
              
              />
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                //fontWeight: "bold",
                //color: "#a92319",
               // textAlign: 'center',
              }}
            >
            &nbsp;&nbsp;{this.props.qtde} 
            </Text>
          </View>
          <View style={{ flex: 2 }}>
            <Text
              style={{
                fontSize: 15,
                //fontWeight: "bold",
                //color: "#ef6136",
                //textAlign: 'center',
              }}
            >
            <NumberFormat 
                value={this.props.valor_total.replace(".",",")} 
                displayType={'text'} 
                renderText={value => <Text>{value}</Text>}
                thousandSeparator={'.'}
                decimalScale={2} 
                fixedDecimalScale={true}
                prefix={'R$ '}
                decimalSeparator={','}
              
              />  
           
           
            </Text>
          </View>


        </View>
      </ScrollView>
    );
  }
}
const mapStateToProps = state => ({
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader,
});
const mapDispatchToProps = dispatch => bindActionCreators({ removeFromCart, updateCart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ItemOrder);