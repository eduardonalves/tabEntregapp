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

import { removeFromCart, updateCart } from '../actions/AppActions';

class ListCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
  }

  handleRemoveFromCart = () => {
    this.props.removeFromCart(this.props.item_id, this.props.carrinho);
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
    return (
      <TouchableOpacity onPress={this.handleClick}>
        <View
          elevation={2}
          style={{
            flexDirection: "row",
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <View style={{ flex: 3, 
          borderTopLeftRadius: 4,
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
          borderBottomLeftRadius: 4 }}>
            <Text
              style={{
                fontSize: 18,
                color: "#333"
              }}
            >
              {this.props.name}
            </Text>

          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#ef6136",
                textAlign: 'center',
              }}
            >
              Unt {"\n"} {this.props.price}
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#a92319",
                textAlign: 'center',
              }}
            >
              Qtde {"\n"}  {this.props.qtd}
                </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                color: "#ef6136",
                textAlign: 'center',
              }}
            >
              Total {"\n"} {this.props.price * this.props.qtd}
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
});
const mapDispatchToProps = dispatch => bindActionCreators({ removeFromCart, updateCart }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(ListCart);