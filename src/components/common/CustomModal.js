import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setModalVisible, loadInfoModal } from '../../actions/AppActions';
import {
    StyleSheet,
    Text,
    View,
    Button,
} from "react-native";
import Modal from "react-native-modal";

class CustomModal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <View style={styles.container} >
                <Modal isVisible={this.props.show_modal}>
                    <View style={styles.modalContent}>
                        <Text style={styles.title}>Ingredientes:</Text>
                        <Text style={styles.text}>{this.props.info_modal}</Text>
                        <Button title="Fechar" style={styles.button} onPress={e => this.props.setModalVisible(false)} />
                    </View>
                </Modal>
            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 17,
        fontWeight: "bold"
    },
    text: {
        marginBottom: 10
    },
    button: {
        backgroundColor: 'lightblue',
        padding: 12,
        margin: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        marginTop: 10,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
        padding: 16
    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
});

const mapStateToProps = state => ({
    info_modal: state.AppReducer.info_modal,
    show_modal: state.AppReducer.show_modal
});

const mapDispatchToProps = dispatch => bindActionCreators({ setModalVisible }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(CustomModal);