import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Produto from './produto';
import ListaRegistros from './ListaRegistros';

export default function Storage(){
    //Definição de React Hooks (useState)
    const [registros, setRegistros] = useState([]);
    const [telaAtual, setTelaAtual] = useState('produto'); // Estado para controlar a tela


    const salvarNoAsyncStorage = async (qtd, produto, valor) => {
        try{
            const registro = {
                qtd, produto, valor,
            };

            //Recupera os registros anteriores do AsyncStorage
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            
            //Adiciona o novo registro
            registros.push(registro);
        
            //Armazena novamente no AsyncStorage
            await AsyncStorage.setItem('registros', JSON.stringify(registros));

            Alert.alert('Sucesso', 'Registro salvo com sucesso!');
            carregarRegistros(); //Atualiza a lista após salvar
        } catch (error) {
            console.error('Erro ao salvar no AsyncStorage: ', error);
            Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados.');
        }
    };

    const apagarNoAsyncStorage = async() => {
        try{
            await AsyncStorage.clear();
            Alert.alert("Sucesso", "Todos os dados foram removidos!");
            carregarRegistros();
        } catch(error){
            Alert.alert("Erro", "Erro ao limpar os dados")
        }
    };

    const carregarRegistros = async () => {
        try{
            const registrosExistentes = await AsyncStorage.getItem('registros');
            const registros = registrosExistentes ? JSON.parse(registrosExistentes) : [];
            setRegistros(registros); //Atualiza o estado com os registros recuperados
        } catch (error){
            console.error('Erro ao carregar registros', error);
            Alert.alert('Erro', 'Ocorreu um erro ao carregar os dados.')
        }
    };

    const apagarRegistroEspecifico = async (index) => {
        try{
            const registrosExistentes = [...registros];
            registrosExistentes.splice(index, 1); //Remove o item pelo índice

            await AsyncStorage.setItem("registros", JSON.stringify(registrosExistentes));
            setRegistros(registrosExistentes) //Atualiza o estado local
            Alert.alert("Sucesso", "Registro apagado com sucesso!");
        } catch(error){
            console.error("Erro ao apagar o registro", error);
            Alert.alert("Erro", "Ocorreu um erro ao apagar o registro.")
        }
    };

    useEffect(() => {
        carregarRegistros(); // Carrega os registros ao mostrar o componente 
    }, []);

    return (
        <View style={styles.container}>

            {telaAtual === 'produto' ? (
                <>
                    {/* Passa a função salvarNoAsyncStorage como prop para o componente filho*/}
                    <Produto onSalvarDados={salvarNoAsyncStorage} onApagarDados={apagarNoAsyncStorage}
                    telaAtual={telaAtual}           //Passa o estado telaAtual
                    setTelaAtual={setTelaAtual}     //Passa a função setTelaAtual para atualizar o estado
                    />    
                </>
            ) : (
                <>
                <Text style={styles.titulo}>Registros Salvos:</Text>
                <ListaRegistros propRegistro={registros}
                onApagar={apagarRegistroEspecifico}
                />
                <Button 
                    title="Voltar para Cadastro"
                    onPress={() => setTelaAtual('produto')}
                />
                </>
            )} 
            
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    titulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    }
})