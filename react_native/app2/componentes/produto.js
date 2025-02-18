import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

export default function Produto({onSalvarDados}) {
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

    const limparCampos = () => {
        setQtd('');
        setProduto('');
        setValor('');
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputRow}>
                <Text style={styles.label}>Quantidade:</Text>
                <TextInput 
                    value={qtd}
                    onChangeText={setQtd}
                    style={[estilos.input, {width: '25%'}]}
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
            </View>         
        </View>
        
    )
    
}
