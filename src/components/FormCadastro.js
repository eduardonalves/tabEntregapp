import React, { Component } from 'react';
import {
    View,    
    Text,
    TextInput,
    Button,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import { Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";
import { 
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario,
    modificaCep,
    modificaEndereco,
    modificaNumero,
    modificaComplemento,
    modificaPontoReferencia,
    modificaEstado,
    modificaCidade,
    modificaBairro,
    modificaTelefone,
    modificaConfirmaSenha
} from '../actions/AppActions';



class FormCadastro extends Component {
    constructor(props) {
        super(props);
    }
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: "Cadastro",
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

    

    render() {
        return  (
            <ScrollView>
                <View style={styles.grid}>
                    <View style={styles.contentBody}>
                        <Input 
                            value={this.props.nome} 
                            //placeholder="Nome" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText}  
                            onChangeText={texto => this.props.modificaNome(texto)} 
                            label='Nome'
                        />
                        <Input 
                            value={this.props.email} 
                            label="E-mail" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaEmail(texto)} />
                        <Input 
                            value={this.props.senha} 
                            secureTextEntry 
                            label="Senha" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaSenha(texto)} />
                        
                        <Input 
                            value={this.props.confirma_senha} 
                            secureTextEntry 
                            label="Confirme a Senha" 
                            //placeholderTextColor="#fff" 
                            stylcontainerStylee={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaConfirmaSenha(texto)} />

                        <Input 
                            value={this.props.cep} 
                             
                            label="CEP" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaCep(texto)} />
                        
                        <Input 
                            value={this.props.endereco} 
                             
                            label="Endereço" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaEndereco(texto)} />
                        
                        <Input 
                            value={this.props.numero} 
                             
                            label="Numero" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaNumero(texto)} />

                        <Input 
                            value={this.props.complemento} 
                             
                            label="Complemento" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaComplemento(texto)} />

                        <Input 
                            value={this.props.ponto_referencia} 
                             
                            label="Ponto de Referência" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaPontoReferencia(texto)} />

                        <Input 
                            value={this.props.estado} 
                             
                            label="Estado" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaEstado(texto)} />
                        
                        <Input 
                            value={this.props.cidade} 
                             
                            label="Cidade" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaCidade(texto)} />
                        
                        <Input 
                            value={this.props.bairro} 
                             
                            label="Bairro" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaBairro(texto)} />

                        <Input 
                            value={this.props.telefone} 
                             
                            label="Telefone" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaTelefone(texto)} />


                        <Text style={styles.txtMsgErro}>{this.props.msgErroCadastro}</Text>

                        <Button title="Cadastrar"
                            // color="#115e54" 
                            onPress={() => this._cadastraUsuario()} />

                    </View>
                    
                </View>
            </ScrollView>
            
        );
    }

}

const mapStateToProps = state => ({
    nome: state.AppReducer.nome,
    email: state.AppReducer.email,
    senha: state.AppReducer.senha,
    cep: state.AppReducer.cep,
    endereco: state.AppReducer.endereco,
    numero: state.AppReducer.numero,
    complemento: state.AppReducer.complemento,
    ponto_referencia: state.AppReducer.ponto_referencia,
    estado: state.AppReducer.estado,
    cidade: state.AppReducer.cidade,
    bairro: state.AppReducer.bairro,
    telefone: state.AppReducer.telefone,
    cadastro_usuario: state.AppReducer.cadastro_usuario,
    confirma_senha: state.AppReducer.confirma_senha,
    usuario: state.AppReducer.usuario,
    msgErroCadastro: state.AppReducer.msgErroCadastro,
    loadingCadastro: state.AppReducer.loadingCadastro
});

export default connect(mapStateToProps, {
    modificaEmail,
    modificaSenha,
    modificaNome,
    cadastraUsuario,
    modificaCep,
    modificaEndereco,
    modificaNumero,
    modificaComplemento,
    modificaPontoReferencia,
    modificaEstado,
    modificaCidade,
    modificaBairro,
    modificaTelefone,
    modificaConfirmaSenha
})(FormCadastro);

const styles = StyleSheet.create({
    grid: {
        //flex: 1,
        padding: 20,
        marginTop: 8,
        marginBottom: 400,
    },      
    contentBody: {
        //flex: 4,
        justifyContent: 'center',
        
    },
    _bodyInputText: {
        flex:1,
        //marginBottom:5,
        //marginTop:10,
        //fontSize: 20,
        //height: 45,
        //color: '#fafafa'
    },
    contentFooter: {
        //flex: 1
    },
    txtMsgErro:{
        fontSize: 18,
        //color: '#ff0000'
    }
});