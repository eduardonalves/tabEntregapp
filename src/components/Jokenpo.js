import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    Platform
} from "react-native";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HeaderBackButton } from 'react-navigation-stack';
import { categoriasFetch,categoriasFetchInterval, showMyLoaderCategory } from '../actions/AppActions';

import Color from "../../constants/Colors";
import  BtnEscolha  from './Escolha';
import  Icone  from './IconeJokenpo';

class Jokenpo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            escolhaUsuario: '',
            txtColor: 'red',
            escolhaDoComputador: '',
            resultado: '',
            showImage: false,
            imagemComputador: require('../../assets/images/pedra.png'),
            imagemUsuario: require('../../assets/images/pedra.png')
        }
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Pedra, Papel e Tesoura",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: Color.headerBar
            },
            headerLeft: <HeaderBackButton onPress={() => navigation.navigate("MenuRewardStack")}  tintColor="#fff"  />,
            headerTitleStyle: {
                color: '#fff',
                fontWeight:'bold'
              },
            
        };
    }
    jokenpo = (escolhaUsuario) => {
        let numeroAleatorio = Math.floor(Math.random() * 3)
        let respostaComputador = ''
        let resultado = ''
        let imagemComputador = ''
        let imagemUsuario = ''

        switch (numeroAleatorio) {
            case 0:

                respostaComputador = 'Pedra'
                imagemComputador = require('../../assets/images/pedra.png');

                if (escolhaUsuario == 'Pedra') {
                    resultado = 'Você Empatou'
                } else if (escolhaUsuario == 'Papel') {
                    resultado = 'Você Ganhou'
                } else {
                    resultado = 'Você Perdeu'
                }
                break;
            case 1:


                respostaComputador = 'Papel'
                imagemComputador = require('../../assets/images/papel.png');

                if (escolhaUsuario == 'Papel') {
                    resultado = 'Você Empatou'
                } else if (escolhaUsuario == 'Tesoura') {
                    resultado = 'Você Ganhou'
                } else {
                    resultado = 'Você Perdeu'
                }


                break;
            case 2:

                respostaComputador = 'Tesoura'

                imagemComputador = require('../../assets/images/tesoura.png');

                if (escolhaUsuario == 'Tesoura') {
                    resultado = 'Você Empatou'
                } else if (escolhaUsuario == 'Papel') {
                    resultado = 'Você Perdeu'
                } else {
                    resultado = 'Você Ganhou'
                }
                break;
        }

        if (escolhaUsuario == 'Pedra') {
            imagemUsuario = require('../../assets/images/pedra.png');
        } else if (escolhaUsuario == 'Papel') {
            imagemUsuario = require('../../assets/images/papel.png');
        } else {
            imagemUsuario = require('../../assets/images/tesoura.png');
        }

        if (resultado == 'Você Ganhou') {
            txtColor = 'green'
        } else if (resultado == 'Você Empatou') {
            txtColor = '#E1AD01'
        } else {
            txtColor = 'red'
        }

        this.setState({ resultado: resultado, txtColor: txtColor, escolhaDoComputador: respostaComputador, escolhaUsuario: escolhaUsuario, showImage: true, imagemComputador: imagemComputador, imagemUsuario: imagemUsuario })

    }
    render() {
        let test = false
        if (this.state.showImage) {
            test = true
        }

        return (
            <View>
            
            <View style={{flexDirection:'row'}}> 
                <Image source={require('../../assets/images/jokenpo.png')} style={{flex:1}}/>
            </View>
                <View style={{padding:10}}>
                    <Text style={{
                        fontSize:30,
                        textAlign:'center'
                    }}>
                    Escolha uma Opção
                    </Text>
                </View>
                <View style={styles.painelAcoes}  >
                    <BtnEscolha styleBtn={styles.btnEscolha} title='Pedra' jokenpo={() => this.jokenpo('Pedra')} />
                    <BtnEscolha styleBtn={styles.btnEscolha} title='Papel' jokenpo={() => this.jokenpo('Papel')} />
                    <BtnEscolha styleBtn={styles.btnEscolha} title='Tesoura' jokenpo={() => this.jokenpo('Tesoura')} />
                </View>
                <View style={styles.palco} >
                    {
                    test== true ? ( 
                    <View>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: this.state.txtColor, height: 60 }}>{this.state.resultado} </Text>
                        <Icone texto='Sua escolha:' imagemUsuario={this.state.imagemUsuario} styleImage={styles.palco} />
                        <Icone texto='Escolha do Jogo:' imagemUsuario={this.state.imagemComputador} />
                    </View>
                    
                        ):(
                            <View>
                                <Text>''</Text>
                            </View>
                            
                    )}
                        
                    
                </View>

            </View>
        );
    }
}

let styles = StyleSheet.create({
    btnEscolha: {
      width: 90,
      color: Platform.OS === 'ios' ? Color.buttonIos : Color.button
    },
    painelAcoes:{
      flexDirection: 'row',
      justifyContent:'space-between',
      marginTop:20
    },
    palco:{
      alignItems:'center',
      marginTop: 20
    },
    txtResultado:{
      fontSize: 25,
      fontWeight:'bold',
      color:'red',
      height: 60
    },
    
  })


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
export default connect(mapStateToProps, mapDispatchToProps)(Jokenpo);