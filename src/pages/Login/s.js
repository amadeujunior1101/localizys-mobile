import React, {useState} from 'react';
import {
  View,
  AsyncStorage,
  Platform,
  Text,
  Alert,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {Form, Item, Input} from 'native-base';

import {useFormik} from 'formik';
import api from '../../services/api';
import {useProduct} from '../../context/ProductContext';

import IconVI from 'react-native-vector-icons/FontAwesome';

import LoginStyle from './LoginStyle';

export default function Login({navigation}) {
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

  const {setIsLogged, setUserData} = useProduct();

  const {values, setFieldValue, handleSubmit, errors} = useFormik({
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
            [{text: 'Ok', onPress: () => setLoadingButtonLogin(false)}],
            {cancelable: false},
          );
        } else {
          const user_id = response.data.user.id;
          const token = response.data.token.token;

          try {
            await AsyncStorage.setItem('@user_id', JSON.stringify(user_id));
            await AsyncStorage.setItem('@token', JSON.stringify(token));

            const responseUser = await api.get(`/get-user?user_id=${user_id}`, {
              headers: {Authorization: `Bearer ${token}`},
            });

            setUserData(responseUser.data[0]);

            setIsLogged(true);
          } catch (error) {
            console.log('erro ao gravar os tokens:' + error);
          }
          navigation.goBack();
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

  return (
    <View style={LoginStyle.base}>
      <StatusBar backgroundColor="#dc3545s" />

      <View style={LoginStyle.positionMessage}>
        <View style={LoginStyle.message}>
          <Text style={{color: '#fff', fontSize: 30}}>
            Olá, seja muito bem vindo(a)!
          </Text>
        </View>
      </View>

      <View style={LoginStyle.positionKeyBoard}>
        <View style={{paddingLeft: 20, paddingRight: 20}}>
          <KeyboardAvoidingView
            style={{paddingTop: 40}}
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
            <Form style={{paddingTop: 20}} onSubmit={handleFormSubmit}>
              <View style={{paddingBottom: 10}}>
                <Item regular rounded error={errors.email ? true : false}>
                  <Input
                    type="e-mail"
                    // autoFocus={true}
                    autoCapitalize="none"
                    // autoCompleteType="password"

                    // autoCorrect={false}
                    placeholder="Digite seu e-mail"
                    onChangeText={(email) => setFieldValue('email', email)}
                    value={values.email}
                  />
                  <Text>{errors.email ? errors.email : ''}</Text>
                </Item>
              </View>
              <View style={{paddingBottom: 10}}>
                <Item regular rounded error={errors.password ? true : false}>
                  <Input
                    type="password"
                    placeholder="Digite sua senha"
                    // secureTextEntry={showHideLogin.password}
                    secureTextEntry={showHideLogin.password}
                    autoCorrect={false}
                    autoCompleteType="off"
                    spellCheck={false}
                    onChangeText={(password) =>
                      setFieldValue('password', password)
                    }
                    value={values.password}
                  />
                  <IconVI
                    name={showHideLogin.icon}
                    onPress={showHideInputLogin}
                    size={25}
                    style={{marginRight: 10}}
                  />
                  <Text>{errors.password ? errors.password : ''}</Text>
                </Item>
              </View>
            </Form>
          </KeyboardAvoidingView>

          <TouchableOpacity
            disabled={loadingButtonLogin === true ? true : false}
            onPress={() => {
              // if (values.email.length != 0 && values.password.length < 6
              //     || values.password.length > 20){ setLoadingButtonLogin(true)}

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

              handleSubmit();
            }}
            style={LoginStyle.button}>
            {loadingButtonLogin === true ? (
              <ActivityIndicator size={('small', 25)} color="green" />
            ) : (
              <Text style={LoginStyle.buttonTitle}>Entrar</Text>
            )}
          </TouchableOpacity>

          <View
            style={{alignItems: 'center', paddingTop: 30, paddingBottom: 30}}>
            <Text>Esquceu sua senha? </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Register')}
            style={LoginStyle.buttonRegister}>
            <Text style={LoginStyle.buttonTitleRegister}>Criar Conta</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
