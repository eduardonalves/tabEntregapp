import React, { Component } from 'react';
import {
    View,    
    Text,
    TextInput,
    Button,
    StyleSheet,
    ImageBackground,
    ActivityIndicator
} from 'react-native';
import { connect } from 'react-redux';
import { 
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
} from '../actions/AppActions';



class FormCadastro extends Component {
    constructor(props) {
        super(props);
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
    _cadastraUsuario() {
        const params = {
            nome: this.props.nome,
            email: this.props.email,
            senha: this.props.senha
        };        

        this.props.cadastraUsuario(params);
    }

    renderBtnCadastro() {

        if(this.props.loadingCadastro) {
            return (
                <ActivityIndicator size="large" />
            );
        }

        return (
            <Button title="Cadastrar" color="#115e54" onPress={() => this._cadastraUsuario()} />
        )
    }

    render() {
        return  (
            
            <View style={styles.grid}>
                <View style={styles.contentBody}>
                    <TextInput 
                        value={this.props.nome} 
                        placeholder="Nome" 
                        placeholderTextColor="#fff" 
                        style={styles._bodyInputText}  
                        onChangeText={texto => this.props.modificaNome(texto)} 
                    />
                    <TextInput 
                        value={this.props.email} 
                        placeholder="E-mail" 
                        placeholderTextColor="#fff" 
                        style={styles._bodyInputText} 
                        onChangeText={texto => this.props.modificaEmail(texto)} />
                    <TextInput 
                        value={this.props.senha} 
                        secureTextEntry 
                        placeholder="Senha" 
                        placeholderTextColor="#fff" 
                        style={styles._bodyInputText} 
                        onChangeText={texto => this.props.modificaSenha(texto)} />

                    <Text style={styles.txtMsgErro}>{this.props.msgErroCadastro}</Text>

                </View>
                <View style={styles.contentFooter}>
                    {this.renderBtnCadastro()}
                </View>
            </View>
            
        );
    }

}

const mapStateToProps = state => ({
    nome: state.AppReducer.nome,
    email: state.AppReducer.email,
    senha: state.AppReducer.senha,
    msgErroCadastro: state.AppReducer.msgErroCadastro,
    loadingCadastro: state.AppReducer.loadingCadastro
});

export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario
})(FormCadastro);

const styles = StyleSheet.create({
    grid: {
        flex: 1,
        padding: 10
    },      
    contentBody: {
        flex: 4,
        justifyContent: 'center'
    },
    _bodyInputText: {
        fontSize: 20,
        height: 45,
        color: '#fafafa'
    },
    contentFooter: {
        flex: 1
    },
    txtMsgErro:{
        fontSize: 18,
        color: '#ff0000'
    }
});