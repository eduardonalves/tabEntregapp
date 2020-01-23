import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Button
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { produtosFetch } from '../actions/DishesActions';
import Constants from "../utils/constants";
import foodData from "../food-data.json";
import ListCart from "./ListCart";
import CartButton from "./common/CartButton";
import Color from "../../constants/Colors";

class Checkout extends Component {
  constructor(props) {
    super(props);
   // console.log('this.props.carrinho');
    //console.log(this.props.carrinho);
    
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Carrinho",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor:Color.headerBar
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

  handleNaviagation = () => {
    this.props.navigation.navigate("Checkout");
  };
  render() {
    

    return (
      <View style={styles.container}>
        <FlatList
          data={this.props.carrinho}
          keyExtractor={item => item.item_id.toString()}
          renderItem={({ item }) => (
            <ListCart
              name={item.nome}
              image={item.foto}
              cuisine={item.nome}
              price={item.preco_venda}
              label={item.descricao}
              isVegetarian={item.parte_compre_ganhe}
              item_id={item.item_id}
              qtd={item.qtd}
             
            />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8
  }
});

const mapStateToProps = state => ({
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader
});

const mapDispatchToProps = dispatch => bindActionCreators({produtosFetch}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Checkout);