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
        <View
          //elevation={2}
          style={{
            flexDirection: "row",
            backgroundColor: '#ffffff' ,
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            padding: 10,
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
                fontSize: 16,
                color: "#333",
                fontWeight: "bold",
                //textAlign: 'center',
              }}
            >
              Produto
            </Text>
            
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                //color: "#ef6136",
                //textAlign: 'center',
              }}
            >
              Unt
            </Text>
            
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                //color: "#a92319",
                //textAlign: 'center',
              }}
            >
              Qtde 
            </Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                //color: "#ef6136",
                textAlign: 'center',
              }}
            >
              Total 
            </Text>
            
          </View>


        </View>
        <FlatList
          data={this.props.carrinho}
          keyExtractor={(item, index) => item.item_id.toString()}
          renderItem={({ item , index}) => (
            <ListCart
              name={item.nome}
              image={item.foto}
              cuisine={item.nome}
              price={item.preco_venda}
              label={item.descricao}
              isVegetarian={item.parte_compre_ganhe}
              item_id={item.item_id}
              qtd={item.qtd}
              linha={index}
             
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