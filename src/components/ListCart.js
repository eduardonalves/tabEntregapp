import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
  Picker
} from "react-native";
import { Overlay } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { removeFromCart, updateCart } from '../actions/AppActions';
import Color from "../../constants/Colors";

class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  handleRemoveFromCart = () => {
    this.props.removeFromCart(this.props.item_id, this.props.carrinho, this.props.usuario.frete_cadastro);
  }
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
          onPress: () => this.handleRemoveFromCart(),
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
    let total = this.props.price * this.props.qtd;
    total = total.toString();
    return (
      <TouchableOpacity onPress={this.handleClick} >
        <View
          elevation={2}
          style={{
            flexDirection: "row",
            backgroundColor: this.props.linha % 2 ? Color.itemBackgroudColorpar : Color.itemBackgroudColorimpar ,
            //marginHorizontal: 24,
            //marginVertical: 8,
            //borderRadius: 4,
            //shadowOpacity: 0.1,
            //shadowRadius: 2,
            padding: 10,
           
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <View style={{ flex: 4, 
          borderTopLeftRadius: 4,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 4 }}>
            
            <Text
              style={{
                fontSize: 16,
                color: Color.textFormaPagamento,
                //textAlign: 'center',
              }}
            >
              {this.props.name}
            </Text>

          </View>
          <View style={{ flex: 2 }}>
            
            <Text
              style={{
                fontSize: 16,
                //fontWeight: "bold",
                //color: "#ef6136",
                //textAlign: 'center',
              }}
            >
              {
                this.props.price == 0 ? (
                  <NumberFormat 
                    value={ this.props.price } 
                    displayType={'text'} 
                    renderText={value => <Text>{value}</Text>}
                    thousandSeparator={'.'}
                    decimalScale={2} 
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                    decimalSeparator={','}
                  />
                ):(
                  <NumberFormat 
                    value={ this.props.price.replace(".",",") } 
                    displayType={'text'} 
                    renderText={value => <Text>{value}</Text>}
                    thousandSeparator={'.'}
                    decimalScale={2} 
                    fixedDecimalScale={true}
                    prefix={'R$ '}
                    decimalSeparator={','}
                  />
                )
              }
              
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            
            <Text
              style={{
                fontSize: 16,
                //fontWeight: "bold",
                //color: "#a92319",
                //textAlign: 'center',
              }}
            >
              &nbsp;{this.props.qtd}
            </Text>
          </View>
          <View style={{ flex: 2 }}>
           
            <Text
              style={{
                fontSize: 16,
                ///fontWeight: "bold",
                //color: "#ef6136",
                //textAlign: 'center',
              }}
            >
              
              <NumberFormat 
                value={ total.replace(".",",") } 
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
      </TouchableOpacity>
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
  usuario: state.AppReducer.usuario
});
const mapDispatchToProps = dispatch => bindActionCreators({ removeFromCart, updateCart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ListCart);