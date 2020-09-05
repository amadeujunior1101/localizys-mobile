import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';

/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api'

import AsyncStorage from '@react-native-community/async-storage';

export default function Profile({ navigation }) {
    const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

    const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);
    const [dataUser, setDataUser] = useState([])

    function contact(contact) {

        let str = contact;
        let ddd = str.substr(0, 2);
        let inicio = str.substr(2, 5);
        let final = str.substr(7, 9);

        let dddR = `(${ddd})`

        let result = dddR + " " + inicio + "-" + final;
        return result
    }

    const removeFew = async () => {
        const keys = ['@user_id', '@token', '@user_full_name', '@user_email', '@user_phone']
        try {
            await AsyncStorage.multiRemove(keys)
            console.log("Keys")
            console.log(await AsyncStorage.getAllKeys())
            navigation.reset({
                index: 0,
                routes: [
                    {
                        name: 'Login',
                    },
                ],
            })
        } catch (error) {
            console.log("Erro ao limpar o storage" + error)
        }

    }

    const userInfo = async () => {
        const full_name = JSON.parse(await AsyncStorage.getItem('@user_full_name'));
        const email = JSON.parse(await AsyncStorage.getItem('@user_email'));
        const phone = JSON.parse(await AsyncStorage.getItem('@user_phone'));


        // let arr = []
        let info = { full_name: full_name, email: email, phone: phone }
        // const novoEstado = Object.assign({}, info);
        // let d = arr.push(info)
        // var carros = ["Saab", "Volvo", "BMW"]
        // if (full_name !== "" && email !== "" && phone !== "") {
        setDataUser([info])

    }

    useEffect(() => {
        userInfo()
    }, [])

    return (
        <View style={{ flex: 1, backgroundColor: '#DDD' }}>
            <StatusBar
                translucent
                backgroundColor="#F8685B"
                barStyle="light-content"
            />
            <View>
                <View
                    style={{
                        top: 35,
                        position: 'absolute',
                        zIndex: 1,
                        left: 10,
                        right: 10,
                        bottom: 0,
                    }}>
                    <Text
                        style={{
                            color: '#FFF',
                            textAlign: 'left',
                            fontSize: 20,
                            fontFamily: 'Roboto-Black',
                        }}>
                        #Seja bem vindo.
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={
                        removeFew
                    }
                    style={{
                        top: 35,
                        position: 'absolute',
                        right: 10,
                        bottom: 0,
                        zIndex: 1,
                    }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20, color: '#d2d2d2' }}>Sair? </Text>
                        <FA name="sign-out-alt" size={30} color="#d2d2d2" />
                    </View>

                </TouchableOpacity>

                <View
                    style={{
                        top: 140,
                        position: 'absolute',
                        zIndex: 1,
                        left: 10,
                        right: 10,
                        bottom: 0,
                    }}>
                    <Text
                        style={{
                            color: '#000',
                            textAlign: 'center',
                            fontSize: 20,
                            fontFamily: 'Roboto-Black',
                        }}>
                        Meu Perfil
          </Text>
                </View>

                <Image
                    style={{
                        marginTop: 20,
                        height: 150,
                        width: '100%',
                    }}
                    source={require('../../imgs/shapeTop3.png')}
                    resizeMode="stretch"
                />
            </View>

            <ScrollView>
                <View
                    style={{
                        marginLeft: 10, marginTop: 10, marginRight: 10, marginBottom: 5,
                    }}>
                    {
                        dataUser.map(item => (
                            <View key={JSON.stringify(item.email)} >

                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <Text style={{ fontFamily: 'Roboto-Black', fontSize: 20 }} >Nome:
                                    </Text>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20 }} > {item.full_name}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <Text style={{ fontFamily: 'Roboto-Black', fontSize: 20 }} >E-mail:
                                </Text>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20 }} > {item.email}
                                    </Text>
                                </View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                                    <Text style={{ fontFamily: 'Roboto-Black', fontSize: 20 }} >Celular:
                                </Text>
                                    <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20 }} > {contact(item.phone)}
                                    </Text>
                                </View>
                            </View>
                        ))
                    }
                </View>

            </ScrollView>

            <View style={{}}>

                <Image
                    style={{
                        height: 80,
                        width: '100%',
                        position: 'absolute',
                        bottom: 0,
                        right: 0,
                        zIndex: -1,
                    }}
                    source={require('../../imgs/shapeBotton3.png')}
                    resizeMode="stretch"
                />
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#dc3545',
        height: 50,
        borderRadius: 30,
        marginLeft: 40,
        marginRight: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFF'
    },
    checkedOn: {
        backgroundColor: '#dc3545',
        borderWidth: 1,
        borderColor: '#dc3545',
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkedOff: {
        // backgroundColor: '#dc3545',
        borderWidth: 1,
        borderColor: '#dc3545',
        width: 20,
        height: 20,
        // alignItems: 'center',
        // justifyContent: 'center'
    }
})
