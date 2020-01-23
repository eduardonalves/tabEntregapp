import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { categoriasFetch, showMyLoaderCategory } from '../actions/AppActions';
import { AppLoading } from 'expo';


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";

import RestaurantItem from "./RestaurantItem";
import CartButton from "./common/CartButton";
import Icon from 'react-native-vector-icons/FontAwesome';
import Color from "../../constants/Colors";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.props.showMyLoaderCategory(true);
    this.props.categoriasFetch();
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Meus Pedidos",
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
  handleNaviagation = (categoria_id) => {

    this.props.navigation.navigate("Dishes", { categoria_id: categoria_id });
  };
  render() {

    return (
      <View style={styles.container}>
        {
          this.props.categorias.length == 0 && this.props.show_loader_categoria == false ? (<View style={{
            opacity: 1.0,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            padding:50
            
          }} >
            <Icon name="frown-o" size={200} color="#ef6136" />
            <Text style={{fontSize:18 , textAlign:'center'}}>Ops!</Text>
            <Text style={{fontSize:15, textAlign:'center'}}>Não encontramos categorias cadastradas.</Text>
            
          </View>):(
            <View></View>
          )
        }
        {
          this.props.categoria_carregada_falha == false ? (
            <FlatList
              data={this.props.categorias}
              keyExtractor={item => item.Categoria.id}
              renderItem={({ item }) => (
                <RestaurantItem
                  name={item.Categoria.nome}
                  image={item.Categoria.nome}
                  cuisine={item.Categoria.nome}
                  location={item.Categoria.nome}
                  isVegetarian={item.Categoria.nome}
                  handleNaviagation={() => this.handleNaviagation(item.Categoria.id)}
                  categoria_id={ item.Categoria.id}
                />
              )}
            />
          ):(
            <View style={{
              opacity: 1.0,
              alignItems:'center',
              justifyContent:'center',
              flexDirection:'column',
              padding:50
              
            }} >
              <Icon name="frown-o" size={200} color="#ef6136" />
              <Text style={{fontSize:18}}>Ops!</Text>
              <Text style={{fontSize:15}}>Houve uma falha ao carregar o menu.</Text>
              <Text style={{fontSize:15}}>Tente novamente mais tarde!</Text>
            </View> 
          )
        }
        {
          this.props.show_loader_categoria == true ? (
            <View
              style={{


                opacity: 1.0,
                width: '100%',

                alignItems: 'center',
                flex: 1,
                position: 'absolute',
                marginTop: '50%'
              }}
            >
              <ActivityIndicator size="large" color="#4099ff"

                animating={true}
                hidesWhenStopped={true}

              />
            </View>

          ) : (
              <View
                style={{


                  opacity: 0.0,
                  width: '100%',

                  alignItems: 'center',
                  flex: 1,
                  position: 'absolute',
                  marginTop: '50%'
                }}
              >
                <ActivityIndicator size="large" color="#4099ff"

                  animating={true}
                  hidesWhenStopped={true}

                />
              </View>



            )
        }



      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 8,
    marginBottom: 8,

  }
});


const mapStateToProps = state => ({
  categorias: state.AppReducer.categorias,
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  qtd_carrinho: state.AppReducer.qtd_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader,
  status_envio_pedido: state.AppReducer.status_envio_pedido,
  show_loader_categoria: state.AppReducer.show_loader_categoria,
  categoria_carregada_falha: state.AppReducer.categoria_carregada_falha
});
const mapDispatchToProps = dispatch => bindActionCreators({ categoriasFetch, showMyLoaderCategory }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Orders);