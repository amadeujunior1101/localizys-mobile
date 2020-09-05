import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
/* eslint-disable */
import { Input, Container, Content, Icon, Form, Item } from 'native-base';

import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api'

import { useFormik } from 'formik';

import AsyncStorage from '@react-native-community/async-storage'

export default function Login({ navigation }) {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);

  const [showHideLogin, setShowHideLogin] = useState({
    icon: 'eye-slash',
    password: true,
  });

  function showHideInputLogin() {
    setShowHideLogin({
      icon: showHideLogin.icon === 'eye' ? 'eye-slash' : 'eye',
      password: showHideLogin.password === false ? true : false,
    });
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values) => {

      try {
        const response = await api.post('/login', {
          email: values.email,
          password: values.password,
        });

        if (response.data.error === true) {
          // alert("Senha incorreta")
          Alert.alert(
            'Atenção',
            'E-mail ou senha incorreto',
            [{ text: 'Ok', onPress: () => setLoadingButtonLogin(false) }],
            { cancelable: false },
          );
          // console.log(response.data)
        } else {
          const user_id = response.data.user_id;
          const token = response.data.data.token;

          const { full_name, email, phone } = response.data
          // const user_full_name = response.data.user_full_name;
          // const user_email = response.data.user_email;
          // const user_phone = response.data.data.user_phone;
          // console.log({ user_id: user_id, token: token })
          // console.log(response.data)
          // setLoadingButtonLogin(false)
          try {
            await AsyncStorage.setItem('@user_id', JSON.stringify(user_id));
            await AsyncStorage.setItem('@token', JSON.stringify(token));
            await AsyncStorage.setItem('@user_full_name', JSON.stringify(full_name));
            await AsyncStorage.setItem('@user_email', JSON.stringify(email));
            await AsyncStorage.setItem('@user_phone', JSON.stringify(phone));

            // const responseUser = await api.get(`/get-user?user_id=${user_id}`, {
            //   headers: { Authorization: `Bearer ${token}` },
            // });

            // setUserData(responseUser.data[0]);

            // setIsLogged(true);


          } catch (error) {
            console.log('erro ao gravar os tokens:' + error);
          }
          navigation.navigate('Home')
        }
      } catch (error) {
        alert('Dados incorretos!' + error);
      }
      // setLoadingButtonLogin(false)
    },
    validate: (values) => {
      const errors = {};

      if (!values.email) {
        errors.email = 'Obrigatório';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
      ) {
        errors.email = 'E-mail inválido';
      }

      if (!values.password) {
        errors.password = 'Obrigatório';
      } else if (values.password.length < 6 || values.password.length > 20) {
        errors.password = 'Tamanho inválido';
      }

      return errors;
    },
  });


  // async function login() {
  //   // try {
  //   const response = await api.post('/login', {
  //     email: 'amadeujunior00@gmail.com',
  //     password: '123456',
  //   })

  //   if (response.data.error === true) {
  //     console.log(response.data)
  //   } else {
  //     console.log(response.data)
  //   }

  // }

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
            top: 30,
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
              fontSize: 25,
              fontFamily: 'Roboto-Black',
            }}>
            Gerencie suas visitas de forma rápida e simples
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => alert('Share')}
          style={{
            top: 60,
            position: 'absolute',
            right: 10,
            bottom: 0,
            zIndex: 1,
          }}>
          <FA name="share-alt" size={30} color="#D2D2D2" />
        </TouchableOpacity>
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
        {/* <Form style={{ paddingTop: 20 }} onSubmit={handleFormSubmit}>
          <View
            style={{
              margin: 10, marginBottom: 5
            }}>
            <Item regular rounded error={errors.email ? true : false}>
              <Input
                type="e-mail"
                placeholder="e-mail"
                onChangeText={(email) => setFieldValue('email', email)}
                value={values.email}
                style={{
                  backgroundColor: '#C3C3C3',
                  borderRadius: 20,
                  paddingLeft: 20,
                }}
              />
            </Item>
            <Text>{errors.email ? errors.email : ''}</Text>
          </View>

          <View style={{ margin: 10 }}>
            <Item regular rounded error={errors.password ? true : false}>
              <Input
                placeholder="senha"
                style={{
                  backgroundColor: '#C3C3C3',
                  borderRadius: 20,
                  paddingLeft: 20,
                }}
              />
              <FA
                name={showHideLogin.icon}
                onPress={showHideInputLogin}
                size={25}
                style={{ marginRight: 10 }}
              />
            </Item>
            <Text>{errors.password ? errors.password : ''}</Text>
          </View>
        </Form> */}

        <Form style={{ margin: 10 }} onSubmit={handleFormSubmit}>
          <View style={{ paddingBottom: 10 }}>
            <Item regular rounded error={errors.email ? true : false} style={{ borderColor: '#000' }}>
              <Input
                type="e-mail"
                // autoFocus={true}

                autoCapitalize="none"
                // autoCompleteType="password"
                style={{ marginLeft: 10 }}
                // autoCorrect={false}
                placeholder="Digite seu e-mail"
                onChangeText={(email) => setFieldValue('email', email)}
                value={values.email}
              />

            </Item>
            {errors.email && <Text>{errors.email}</Text>}
          </View>
          <View style={{ paddingBottom: 5 }}>
            <Item regular rounded error={errors.password ? true : false}
              style={{ borderColor: '#000', backgroundColor: '#DDD', borderRadius: 30 }}>
              <Input
                type="password"
                placeholder="Digite sua senha"
                // secureTextEntry={showHideLogin.password}
                secureTextEntry={showHideLogin.password}
                autoCorrect={false}
                style={{ marginLeft: 10 }}
                spellCheck={false}
                onChangeText={(password) =>
                  setFieldValue('password', password)
                }
                value={values.password}
              />
              <FA
                name={showHideLogin.icon}
                onPress={showHideInputLogin}
                size={25}
                style={{ marginRight: 10 }}
              />

            </Item>
            {errors.password && <Text>{errors.password}</Text>}
          </View>
        </Form>

        <View
          style={{
            marginLeft: 10, marginTop: 5, marginRight: 10, marginBottom: 10
          }}>
          <TouchableOpacity
            disabled={loadingButtonLogin === true ? true : false}
            onPress={() => {
              if (
                !values.email ||
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                  values.email,
                ) ||
                !values.password ||
                values.password.length < 6 ||
                values.password.length > 20
              ) {
                setLoadingButtonLogin(false);
              } else {
                setLoadingButtonLogin(true);
              }

              handleSubmit()
            }}>
            <View
              // style={{
              //   backgroundColor: '#dc3545',
              //   height: 50,
              //   borderRadius: 30,
              //   marginLeft: 40,
              //   marginRight: 40,
              //   alignItems: 'center',
              //   justifyContent: 'center',
              // }}>
              // <Text style={{ fontSize: 20, color: '#FFF' }}>Entrar</Text> 
              style={styles.button}>
              {loadingButtonLogin === true ? (
                <ActivityIndicator size={('small', 25)} color="green" />
              ) : (
                  <Text style={styles.buttonTitle}>Entrar</Text>
                )}
            </View>
          </TouchableOpacity>
          <Text style={{ margin: 10, textAlign: 'center' }}>ou</Text>
          <TouchableOpacity onPress={() => alert('entrar')}>
            <View
              style={{
                borderWidth: 2,
                borderColor: '#dc3545',
                // backgroundColor: '#FFF',
                height: 50,
                borderRadius: 30,
                marginLeft: 40,
                marginRight: 40,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{ fontSize: 20, color: '#000' }}>Cadastre-se</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{}}>
        {/* <View
          style={{
            top: 30,
            position: 'absolute',
            elevation: 1,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#FFF',
              textAlign: 'center',
              fontSize: 25,
              fontFamily: 'Roboto-Black',
            }}>
            Localizys
          </Text>
        </View> */}

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
    // borderColor: '#ea2f3c',
    // borderWidth: 1,
    // paddingTop: 10,
    // paddingBottom: 10,
    // backgroundColor: '#fff',
    // borderRadius: 50,
    // alignItems: 'center',
    // justifyContent: 'center',

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
})
