import React, {useEffect, useState} from "react";
import { View, StyleSheet } from 'react-native'
import api from "../utils/Api";

import Titulo from "../components/Titulo";
import Cliente from "../components/Cliente";
import Adicionar from "../components/Adicionar"

export const Clientes = ({navigation}) => {

    const [clientes, SetClientes] = useState([])

    const Listar = async () => {
        try{
            const resultado = await api.get('/Usuarios')
            if(resultado !== null){
                SetClientes(resultado.data)
            }
        }catch (error){
            console.log(error)
        }
    }
    const SomarSaldos = (...saldos) =>{
        const somados = []

        saldos[0].map((val) => {
            somados.push(val.valor)
        })
        try{
            if(somados !== null){
                return somados.reduce((acumulador, valor) => acumulador + valor)
            }else{
                return 0
            }
        }catch (error){
            return 0 
        }
    }

    useEffect(()=>{
        Listar()
    }, [])
    return (
        <View style={styles.container}>
            <Titulo titulo="Clientes" />
            <Adicionar tipo="Cliente" navigation={navigation} />
            <View style={styles.lista}>
                {clientes.map((item) => 
                <Cliente
                key={item.id}
                id={item.id}
                nome={item.nome}
                inicial={item.nome[0]}
                valorTotal={SomarSaldos(item.saldos)}
                navigation={navigation} />
                )}
            </View>
        </View>
    )
}
export default Clientes

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F56A4D",
        padding: '0px 30px'
        
    },
    lista: {
        flex: 1,
        backgroundColor: '#FFF',
        padding: '30px',
        borderTopLeftRadius: '30px',
        borderTopRightRadius: '30px',
    }
})