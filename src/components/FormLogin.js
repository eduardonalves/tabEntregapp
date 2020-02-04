import React, { Component } from 'react';
import {
    View,
    Text,
    TextInput,
    Button,
    StyleSheet,
    TouchableHighlight,
    Image,
    ActivityIndicator,
    AsyncStorage
} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";

import { 
    modificaEmail, 
    modificaSenha,
    autenticarUsuario,
    setStatusCadastroUsuario,
    limpaFormularioCadastro,
    modificaUsername,
} from '../actions/AppActions';
import { FILIAL, EMPRESA, SALT } from '../Settings';



class formLogin extends Component {    

    constructor(props) {
        super(props);
        this.props.limpaFormularioCadastro();     
        //this.props.setStatusCadastroUsuario('');
        
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        

        
        if(typeof  nextProps.usuario != 'undefined') {
            if(nextProps.usuario != ''){
                if(nextProps.usuario){
                    this.storeToken(nextProps.usuario);
                    this.props.setStatusCadastroUsuario(nextProps.usuario);
                    this.props.navigation.navigate('Main');
                }
            }
            
            
        }
    }
    UNSAFE_componentWillMount(){
        if(this.props.usuario=='' || this.props.usuario==false ){
            
            let storeData = this.getToken();
            storeData.then(resp => {
                if(typeof resp.token != 'undefined'){
                    
                    this.props.setStatusCadastroUsuario(resp);
                    this.props.navigation.navigate('Main');
                }
                
            });
        }
        
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Entrar",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                backgroundColor: Color.headerBar
            }
        };
    }

    _autenticarUsuario() {
        let dadosUsuario = {
            username:this.props.username,
            password:this.props.senha,
            salt:SALT,
            empresa: EMPRESA,
            filial: FILIAL
        }; 

        this.props.autenticarUsuario(dadosUsuario);
    }

    renderBtnEntrar() {
        
        if(this.props.loadingLogin) {
            return ( <ActivityIndicator size="large" /> );
        }
        return(
            <Button title="Entrar" onPress={() => this._autenticarUsuario()} />
        )
    }

    async storeToken(user) {
        try {
           await AsyncStorage.setItem("userData", JSON.stringify(user));
        } catch (error) {
          //console.log("Something went wrong", error);
        }
    }
    async getToken() {
        try {
          let userData = await AsyncStorage.getItem("userData");
          let data = JSON.parse(userData);
          //console.log(data);
          return data;
        } catch (error) {
          //console.log("Something went wrong", error);
          return false;
        }
    }

    render() {
        
        return (
            
            <View style={styles.grid} >
                <View style={styles.contentHeader}>
                    <Image source={require("../../assets/images/logo.png")} />
                </View>
                <View style={styles.contentBody}>
                    <Input 
                        value={this.props.username} 
                        containerStyle={styles._bodyInputText} 
                        label="Nome de Usuário" 
                       
                        onChangeText={texto => this.props.modificaUsername(texto)} />
                    <Input 
                        value={this.props.senha} 
                        secureTextEntry 
                        containerStyle={styles._bodyInputText} 
                        label="Senha" 
                        
                        onChangeText={texto => this.props.modificaSenha(texto)} />
                    
                    <Text style={styles._txtMsgErroLogin}>{this.props.msgErroLogin}</Text>

                    <View style={{
                        flexDirection: "row",
                    }}>
                        <Text style={styles._bodyText}>Ainda não tem cadastro?</Text>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate("FormCadastro")}
                        >
                        <Text style={styles._LinkText}> Cadastre-se</Text>
                        </TouchableHighlight>
                    </View>
                    <View style={{
                        flexDirection: "row",
                    }}>
                        <Text style={styles._bodyText}>Não lembra a senha?</Text>
                        <TouchableHighlight
                            onPress={() => this.props.navigation.navigate("FormRecover")}
                        >
                        <Text style={styles._LinkText}> Recuperar senha.</Text>
                        </TouchableHighlight>
                    </View>
                    

                    </View>
                    <View style={styles.contentFooter}>
                        {this.renderBtnEntrar()}
                    </View>

                    
                </View>
            
        );
    }
}

const mapStateToProps = state => ({
        email: state.AppReducer.email,
        senha: state.AppReducer.senha,
        msgErroLogin: state.AppReducer.msgErroLogin,
        loadingLogin: state.AppReducer.loadingLogin,
        usuario: state.AppReducer.usuario,
        username: state.AppReducer.username
});
export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    autenticarUsuario,
    setStatusCadastroUsuario,
    limpaFormularioCadastro,
    modificaUsername,
    setStatusCadastroUsuario 
})(formLogin);

const styles = StyleSheet.create({
    background: {
        flex: 1
    },
    grid: {
        flex: 1,
        padding: 20
    },
    contentHeader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    _headerTitle: {
        fontSize: 25,
        //color: '#fff'
    },
    contentBody: {
        flex: 2
    },
    _bodyInputText: {
        //fontSize: 20,
        //height: 45,
        //color: '#fafafa'
        marginTop:10,
    },
    _bodyText: {
        fontSize: 20,
        //color: '#32A852'
    },
    _LinkText:{
        fontSize: 20,
        color: '#32A852'
    },
    contentFooter: {
        flex: 2,
        marginTop:30
    },
    _txtMsgErroLogin: {
        fontSize: 18,
        //color: '#ff0000'
    }
});