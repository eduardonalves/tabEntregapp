import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { categoriasFetch,categoriasFetchInterval, showMyLoaderCategory } from '../actions/AppActions';
import { AppLoading } from 'expo';


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  Alert,
  Platform
} from "react-native";
//import restaurantsData from "../api/restaurants.json";
import RestaurantItem from "./RestaurantItem";
import CartButton from "./common/CartButton";
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import Color from "../../constants/Colors";

class Restaurants extends Component {
  constructor(props) {
    super(props);
    this.props.showMyLoaderCategory(true);
    this.props.categoriasFetch();
    this.interval = setInterval(() => this.props.categoriasFetchInterval(), 60000);
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    
  }

  handleNaviagation = () => {
    this.props.navigation.navigate("Dishes");
  }

  UNSAFE_componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      
      
      if (confirm(`Deseja mesmo sair do aplicativo`)) {
        // Save it!
        BackHandler.exitApp();
      } else {
        // Do nothing!
       
      }
      //NavigationAction.back();
      return true;
  }

 
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Cardápio",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor: Color.headerBar,
        
      },
      headerTitleStyle: {
        color: Color.headerBarTitle,
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
            <Ionicons name={Platform.OS === 'ios' ? 'ios-sad': 'md-sad'}  size={200} color={Color.tintColor} />
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
                  image={item.Categoria.foto}
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
              <Ionicons name={Platform.OS === 'ios' ? 'ios-sad': 'md-sad'} size={200} color={Color.tintColor} />
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
              <ActivityIndicator size="large" color={Color.ActivityIndicator}

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
                <ActivityIndicator size="large" color={Color.ActivityIndicator}

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
    flex: 1,
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
const mapDispatchToProps = dispatch => bindActionCreators({ categoriasFetch,categoriasFetchInterval, showMyLoaderCategory }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Restaurants);