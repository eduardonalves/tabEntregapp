import React, { Component } from 'react';
import {
    View,    
    
    TextInput,
    Button,
    StyleSheet,
    ImageBackground,
    ActivityIndicator,
    ScrollView,
    Picker,
    Alert,
    AsyncStorage
} from 'react-native';
import { Text, Input } from 'react-native-elements';
import { connect } from 'react-redux';
import Color from "../../constants/Colors";
import {
 FILIAL,
 EMPRESA,
 SALT
} from '../Settings'
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
    modificaConfirmaSenha,
    estadosFetch,
    cidadesFetch,
    bairroFetch,
    limpaListaCidades,
    limpaListaBairros,
    limpaListaEstados,
    setStatusCadastroUsuario,
    

} from '../actions/AppActions';




class FormCadastro extends Component {
    constructor(props) {
        super(props);
        this.props.estadosFetch();
        this.storeToken({novoteste:'novo teste'});
        this.getToken();
        
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
    UNSAFE_componentWillReceiveProps(nextProps) {
        //console.log('nextProps');
        //console.log(nextProps);
        if(typeof  nextProps.usuario != 'undefined') {
            if(nextProps.usuario){
                //console.log('nextProps.usuario');
                //console.log(nextProps.usuario);
                this.storeToken(nextProps.usuario);
                //this.props.setStatusCadastroUsuario(false);
                //this.props.navigation.navigate('Main');
            }
            
        }
    }

    async storeToken(user) {
        try {
           await AsyncStorage.setItem("userData", JSON.stringify(user));
           //console.log('setou o usuario na sessão');
        } catch (error) {
          //console.log("Something went wrong", error);
        }
    }
    async getToken(user) {
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

    _cadastraUsuario() {
        const params = {
            nome: this.props.nome,
            email: this.props.email,
            senha: this.props.senha
        };        

        this.props.cadastraUsuario(params);
    }
    _handleModificaEstado(estado){
        if(estado !=''){
            this.props.cidadesFetch(estado);
            this.props.modificaEstado(estado);
        }else{
            this.props.modificaEstado(estado);
            this.props.limpaListaCidades();
            this.props.limpaListaBairros();
        }
        
    }

    _handleModificaCidade(cidade){
        if( cidade != ''){
            this.props.bairroFetch(cidade);
            this.props.modificaCidade(cidade);
        }else{
            this.props.modificaCidade(cidade);
            this.props.limpaListaBairros();
        }
    }

    _handleCadastraUsuario(){
        let usuario = {
            Cliente:{
                id:'',
                nome: this.props.nome,
                username: this.props.nome,
                password: this.props.senha,
                passwordcconfirm: this.props.confirma_senha,
                logradouro: this.props.endereco,
                complemento: this.props.complemento,
                numero: this.props.numero,
                uf: this.props.estado,
                cidade: this.props.cidade,
                bairro: this.props.bairro,
                email: this.props.email,
                telefone: this.props.telefone,
                filial_id: FILIAL,
                salt: SALT,
                empresa_id:EMPRESA
            }
            
        }
        
        this.props.cadastraUsuario(usuario);
    }
    _isValidUser(){
        if(this.props.username == ''){
            Alert.alert(
                'Mensagem',
                `O nome de usuário não pode ficar em branco.`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'WARNING',
                  },
                ],
                { cancelable: true },
              );
              return false;
        }

        if(this.props.senha == ''){
            Alert.alert(
                'Mensagem',
                `A senha não pode ficar em branco.`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'WARNING',
                  },
                ],
                { cancelable: true },
              );
              return false;
        }

        if(this.props.senha == ''){
            Alert.alert(
                'Mensagem',
                `O campo confirme sua senha não pode ficar em branco.`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'WARNING',
                  },
                ],
                { cancelable: true },
              );
              return false;
        }

        if(this.props.endereco == ''){
            Alert.alert(
                'Mensagem',
                `O endereço não pode ficar em branco.`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'WARNING',
                  },
                ],
                { cancelable: true },
              );
              return false;
        }
        if(this.props.estado == ''){
            Alert.alert(
                'Mensagem',
                `O estado não pode ficar em branco.`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'WARNING',
                  },
                ],
                { cancelable: true },
              );
              return false;
        }
        if(this.props.cidade == ''){
            Alert.alert(
                'Mensagem',
                `A cidade não pode ficar em branco.`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'WARNING',
                  },
                ],
                { cancelable: true },
              );
              return false;
        }
        if(this.props.bairro == ''){
            Alert.alert(
                'Mensagem',
                `O bairro não pode ficar em branco.`,
                [
                  {
                    text: 'OK',
                    //onPress: () => console.log('clicou'),
                    style: 'WARNING',
                  },
                ],
                { cancelable: true },
              );
              return false;
        }
        return true;
    }
    render() {
        

        let estates = this.props.lista_estados.map((v, k) => {
            
            return (
                <Picker.Item label={v.Estado.estado} value={v.Estado.id} key={k} />
            );
        });

        let cities = this.props.lista_cidades.map((v, k) => {
            
            return (
                <Picker.Item label={v.Cidad.cidade} value={v.Cidad.id} key={k} />
            );
        });

        let neigborhood = this.props.lista_bairros.map((v, k) => {
            
            return (
                <Picker.Item label={v.Bairro.bairro} value={v.Bairro.id} key={k} />
            );
        });

        return  (
            <ScrollView>
                <View style={styles.grid}>
                    <View style={styles.contentBody}>
                        {
                            this.props.show_loader == true ? (
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
                                    <ActivityIndicator size="large" color="#4099ff"

                                    animating={true}
                                    hidesWhenStopped={true}

                                    />
                                </View>
                            )
                        }
                        <Input 
                            value={this.props.nome} 
                            //placeholder="Nome" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText}  
                            onChangeText={texto => this.props.modificaNome(texto)} 
                            label='Nome de Usuário'
                        />
                       
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
                            value={this.props.telefone} 
                             
                            label="Telefone" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaTelefone(texto)} />
                        <Input 
                            value={this.props.email} 
                            label="E-mail" 
                            //placeholderTextColor="#fff" 
                            containerStyle={styles._bodyInputText} 
                            onChangeText={texto => this.props.modificaEmail(texto)} />
                        
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
                        
                        <View style={{padding:10, marginTop:10}}>
                            <Text style={{textAlign:'center', fontSize:16, fontWeight:'bold'}}>Observação:</Text>
                            <Text style={{textAlign:'center', fontSize:16}}>Só aparecerão os bairros cobertos pela entrega.</Text>  
                        </View>
                        <View style={{flexDirection:'row', padding:10}}>

                        
                            <Text style={{
                                 fontSize: 16,  flex: 1,
                                color: "#7b7b7b"
                            }}>Estado</Text>

                            <Picker
                                selectedValue={this.props.estado}
                                style={{ height: 22, width: 200, flex: 1, justifyContent: "center", marginBottom:16 }}
                                onValueChange={(itemValue, itemIndex) => this._handleModificaEstado(itemValue)}
                            >
                                <Picker.Item label="Selecione" value="" key="-1" />
                                {estates}
                            
                            </Picker>
                        </View>

                        <View style={{flexDirection:'row', padding:10}}>
                            <Text style={{
                                fontSize: 16, flex: 1,
                                color: "#7b7b7b"
                            }}>Cidade</Text>

                            <Picker
                                selectedValue={this.props.cidade}
                                style={{ height: 22, width: 200, flex: 1, justifyContent: "center", marginBottom:16 }}
                                onValueChange={(itemValue, itemIndex) => this._handleModificaCidade(itemValue)}
                            >
                                <Picker.Item label="Selecione" value="" key="-1" />
                                {cities}

                            </Picker>
                        </View>
                        <View style={{flexDirection:'row', padding:10}}>
                            <Text style={{
                                fontSize: 16,  flex: 1,
                                color: "#7b7b7b"
                            }}>Bairro</Text>

                            <Picker
                                selectedValue={this.props.bairro}
                                style={{ height: 22, width: 200, flex: 1, justifyContent: "center", marginBottom:16 }}
                                onValueChange={(itemValue, itemIndex) => this.props.modificaBairro(itemValue)}
                            >
                                <Picker.Item label="Selecione" value="" key="-1" />
                                {neigborhood}

                            </Picker>
                        </View>
                        

                        


                        <Text style={styles.txtMsgErro}>{this.props.msgErroCadastro}</Text>

                        <Button title="Cadastrar"
                            // color="#115e54" 
                            onPress={() => this._handleCadastraUsuario()} />

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
    loadingCadastro: state.AppReducer.loadingCadastro,
    lista_bairros: state.AppReducer.lista_bairros,
    lista_cidades: state.AppReducer.lista_cidades,
    lista_estados: state.AppReducer.lista_estados,
    carrega_cidade_falha: state.AppReducer.carrega_cidade_falha,
    carrega_estado_falha: state.AppReducer.carrega_estado_falha,
    carrega_bairro_falha: state.AppReducer.carrega_bairro_falha,
    show_loader:state.AppReducer.show_loader,
    cadastro_usuario_sucesso: state.AppReducer.cadastro_usuario_sucesso,
    usuario: state.AppReducer.usuario,
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
    modificaConfirmaSenha,
    estadosFetch,
    cidadesFetch,
    bairroFetch,
    limpaListaCidades,
    limpaListaBairros,
    limpaListaEstados,
    cadastraUsuario,
    setStatusCadastroUsuario
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