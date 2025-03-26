import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Modal } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import ListaRegistros from './ListaRegistros';

export default function Produto({onSalvarDados, telaAtual, setTelaAtual, onApagarDados}) {
    const [qtd, setQtd] = useState('');
    const [produto, setProduto] = useState('');
    const [valor, setValor] = useState('');

    const handleSalvar = () =>{
        if(qtd && produto && valor) {
            //Envia os dados para o componente pai usando a função recebida via props
            onSalvarDados(qtd, produto, valor);
            setQtd(''); //Limpa o campo de quantidade
            setProduto(''); //Limpa o campo de produto
            setValor(''); //Limpa o campo de valor
        } else {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
        }
    };
    
    const handleApagar = () => {
        onApagarDados();
        setModalVisible(false);
    }

    const limparCampos = () => {
        setQtd('');
        setProduto('');
        setValor('');
    }

    if (telaAtual === 'registros') {
        return (
            <ListaRegistros />
        )
    }
    
    //Modal
    const [modalVisible, setModalVisible] = useState(false);

    const handleNo = () => {
        setModalVisible(false);
    }

    return (
        <View style={styles.container}>
            <Text style={styles.cabecalho}>Armazenamento Local</Text>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Quantidade:</Text>
                <TextInput 
                    value={qtd}
                    onChangeText={setQtd}
                    style={[styles.input, {width: '25%'}]}
                    maxLength={6}
                    //placeholder="Quantidade"
                />
            </View>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Produto:</Text>
                <TextInput 
                    value={produto}
                    onChangeText={setProduto}
                    style={styles.input}
                    placeholder="Nome do produto"
                    maxLenght={20}
                />
            </View>

            <View style={styles.inputRow}>
                <Text style={styles.label}>Valor:</Text>
                <TextInputMask 
                    type={'money'} //Tipo de máscara para moeda
                    value={valor}
                    onChangeText={setValor}
                    style={styles.input}
                    placeholder="Valor do Produto"
                    maxLenght={10}
                    keyboardType='numeric'
                />
            </View>
            <Text style={styles.label}>Quantidade:</Text>
            <Text style={styles.label}>Produto:</Text>
            <Text style={styles.label}>Valor:</Text>
            <View style={styles.inputRow}>
                <View style={[styles.botao, {margin:10}]}>
                    <Button title="Limpar" onPress={limparCampos} />
                </View>
                <View style={styles.botao}>
                    <Button title="Salvar" onPress={handleSalvar}/>
                </View>
                <View style={[styles.botao, {margin:10}]}>
                    <Button 
                        title="Ver registros salvos"
                        onPress={() => setTelaAtual('registros')}
                    />
                </View>
                
            </View>
            <View style={[styles.botao]}>
                <Button title="Apagar" onPress={() => setModalVisible(true)}/>

                <Modal
                    animationType='slide'
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Quer mesmo apagar todos os dados?</Text>

                        <View style={styles.modalButtons}>
                            <Button title="Sim" onPress={handleApagar}/>
                            <Button title="Não" onPress={handleNo}/>
                        </View>
                    </View>
                </Modal>
            </View>        
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: 'flex-end',
        justifyContent: 'center',
        padding: 25,
    },
    inputRow: {
        flexDirection: 'row',
        marginBottom: 10,
        justifyContent: 'flex-end',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        width: '80%',
        marginBottom: -10,
        marginLeft: 5,
        borderRadius: 5,
        marginTop: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20
    },
    botao: {
        marginTop: 20
    },
    cabecalho: {
        marginTop: '10',
        marginBottom: '40',
        fontSize: 20,
        fontStyle: 'italic',
    },
    modalView: {
        width: '80%',
        padding: 20,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '30%',
        left: '10%',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    modalText: {
        fontSize: 20,
        color: 'white',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    }
})