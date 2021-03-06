import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Button,
  Platform,
  BackHandler
} from "react-native";
import { NavigationAction } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { Ionicons } from '@expo/vector-icons';
import { produtosFetch, showMyLoaderProduct } from '../actions/DishesActions';
import { HeaderBackButton } from 'react-navigation-stack';
import Constants from "../utils/constants";
import foodData from "../food-data.json";
import ListItem from "./ListItem";
import CartButton from "./common/CartButton";
import CustomModal from "../components/common/CustomModal";
import Color from "../../constants/Colors";
import ListItemIos from "./ListItemIos";




class Dishes extends Component {
  constructor(props) {
    super(props);
    this.props.produtosFetch(this.props.navigation.getParam('categoria_id'));
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: "Produtos",
      headerStyle: {
        elevation: 0,
        shadowOpacity: 0,
        backgroundColor:Color.headerBar
      },
      //headerLeft: <TouchableOpacity onPress={() => navigation.navigate("Main") }><Image source={require('react-navigation-stack/src/views/assets/back-icon.png')} style={{marginTop: 10, marginLeft:10}} /></TouchableOpacity>,
      headerLeft: <HeaderBackButton onPress={() => navigation.navigate("Main")}  tintColor={Color.headerBarTitle}  />,
      headerRight: (
        <CartButton
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      ),
    };
  };

  handleNaviagation = () => {
    this.props.navigation.navigate("Dishes");
  };
  
  UNSAFE_componentWillMount() {
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  UNSAFE_componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }

  handleBackButtonClick() {
      this.props.navigation.navigate("Main");
      //NavigationAction.back();
      return true;
  }

  handleGoToLogin  = () => {
    //alert('dsfda');
    this.props.navigation.navigate("RoutesLogin");
    //NavigationAction.back();
    //return true;
  }
  handleGoToDishesAdc  = (produto_id) => {
    
    this.props.navigation.navigate("DishesAdc",{ produto_id: produto_id });
    
    //NavigationAction.back();
    //return true;
  }
  
  render() {
    

    return (
      <View style={styles.container}>
        <CustomModal />
        {
          this.props.produtos.length == 0  && this.props.show_loader_produto == false ? (<View style={{
            opacity: 1.0,
            alignItems:'center',
            justifyContent:'center',
            flexDirection:'column',
            padding:50
            
          }} >
            <Ionicons name={Platform.OS === 'ios' ? 'ios-sad': 'md-sad'}  size={200} color={Color.tintColor} />
            <Text style={{fontSize:18 , textAlign:'center'}}>Ops!</Text>
            <Text style={{fontSize:15, textAlign:'center'}}>Não existem produtos cadastrados nesta categoria.</Text>
            
          </View>):(
            <View></View>
          )
        }
        {
          this.props.produto_carregado_falha == true && this.props.show_loader_produto == false ? (
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
            
          ):(
            Platform.OS === 'ios' ? (
              <FlatList
                data={this.props.produtos}
                keyExtractor={item => item.Produto.id_sec.toString()}
                renderItem={({ item }) => (
                  
                  <ListItemIos
                    id={item.Produto.id}
                    name={item.Produto.nome}
                    image={item.Produto.foto}
                    cuisine={item.Produto.nome}
                    price={item.Produto.preco_venda}
                    description={item.Produto.descricao}
                    isVegetarian={item.Produto.parte_compre_ganhe}
                    disponivel={item.Produto.disponivel}
                    handleNaviagation={this.handleNaviagation}
                    handleGoToLogin={this.handleGoToLogin}
                    handleGoToDishesAdc={()=> this.handleGoToDishesAdc(item.Produto.id)}
                    partida_id=''
                    data_validade=''
                    tem_adicional={item.Produto.tem_adicional}
                  />
                )}
              />
            ):(
              <FlatList
              data={this.props.produtos}
              keyExtractor={item => item.Produto.id_sec.toString()}
              renderItem={({ item }) => (
                
                <ListItem
                  id={item.Produto.id}
                  name={item.Produto.nome}
                  image={item.Produto.foto}
                  cuisine={item.Produto.nome}
                  price={item.Produto.preco_venda}
                  description={item.Produto.descricao}
                  isVegetarian={item.Produto.parte_compre_ganhe}
                  disponivel={item.Produto.disponivel}
                  handleNaviagation={this.handleNaviagation}
                  handleGoToLogin={this.handleGoToLogin}
                  handleGoToDishesAdc={()=> this.handleGoToDishesAdc(item.Produto.id)}
                  partida_id=''
                  data_validade=''
                  tem_adicional={item.Produto.tem_adicional}
                />
              )}
            />
            )
             
             
          )
        }
        {
          this.props.show_loader_produto == true ? (
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
          ):(
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
    marginBottom: 8
  }
});

const mapStateToProps = state => ({
  produtos: state.DishesReducer.produtos,
  carrinho: state.AppReducer.carrinho,
  total_carrinho: state.AppReducer.total_carrinho,
  qtd_carrinho: state.AppReducer.qtd_carrinho,
  forma_pagamento: state.AppReducer.forma_pagamento,
  tipos_pagamento: state.AppReducer.tipos_pagamento,
  troco_pedido: state.AppReducer.troco_pedido,
  obs_pedido: state.AppReducer.obs_pedido,
  show_loader: state.AppReducer.show_loader,
  status_envio_pedido: state.AppReducer.status_envio_pedido,
  show_loader_produto: state.DishesReducer.show_loader_produto,
  produto_carregado_falha: state.DishesReducer.produto_carregado_falha
});
const mapDispatchToProps = dispatch => bindActionCreators({produtosFetch, showMyLoaderProduct}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Dishes);