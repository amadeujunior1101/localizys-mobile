import React, {useState} from 'react';
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

import {Input, CheckBox, ListItem, Body, Form, Item} from 'native-base';
/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api'

import { useFormik } from 'formik';

import AsyncStorage from '@react-native-community/async-storage';

import Geolocation from '@react-native-community/geolocation'

export default function NewClient({ navigation }) {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);
  const [checked, setChecked] = useState(true)
  const [location, setLocation] = useState()

  const positionGPS = () => {
    // alert("Chegou aqui")
    // setModalVisible(false)
    // setButtonFind(false)
    let dataLatLgt = {}
    Geolocation.getCurrentPosition(
      (position) => {
        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        dataLatLgt = { "error": false, "Latitude": currentLatitude, "Longitude": currentLongitude }
        // console.log(dataLatLgt)
        const { Latitude, Longitude } = dataLatLgt
        setLocation(dataLatLgt)
        handleSubmit()
        setLoadingButtonLogin(false)

      },
      (error) => {
        error && alert("Pressione \"Permitir\" para encontrarmos sua localização!"),
          alert(error.message),
          setLoadingButtonLogin(false)
        // setModalVisible(false)
        // setButtonFind(false)
      }
      // alert(error.message),
      // {
      //     enableHighAccuracy: true, timeout: 20000, maximumAge: 1000
      // }
    );
  }

  function handleCheckBox() {
    checked === true ? setChecked(!checked) : setChecked(!checked)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      full_name: '',
      company_name: '',
    },
    onSubmit: async (values) => {

      const user_id = await AsyncStorage.getItem('@user_id')
      // const token = await AsyncStorage.getItem('@token')
      const token = JSON.parse(await AsyncStorage.getItem('@token'));
      // const tokenConverted = JSON.stringify(token)
      // console.log(values)
      // console.log(checked)
      // console.log(user_id)
      // const { Latitude, Longitude } = location
      // console.log(location.Latitude, location.Longitude)
      //       console.log("localização")
      // console.log(location)
      // .then(item => {
      //   if (item !== null && item !== undefined) {

      //     setHistory("Home")
      //     setLoadingHistory(false)

      //   } else {

      //     setHistory("Login")
      //  setLoadingHistory(false)
      //   }

      // });

      try {
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        const response = await api.post('/client', {
          full_name: values.full_name,
          company_name: values.company_name,
          user_id: user_id,
          latitude: location !== undefined ? location.Latitude : "0",
          longitude: location !== undefined ? location.Longitude : "0",
        }, config);

        if (response.data.error === true) {
          // alert("Senha incorreta")
          Alert.alert(
            'Atenção',
            'Houve um erro no cadastro do cliente!',
            [{ text: 'Ok', onPress: () => setLoadingButtonLogin(false) }],
            { cancelable: false },
          );

        } else {

          navigation.goBack()
        }
      } catch (error) {
        alert('Dados incorretos!' + error);
      }
      setLoadingButtonLogin(false)
    },
    validate: (values) => {
      const errors = {};

      if (!values.full_name) {
        errors.full_name = 'Obrigatório';
      } else if (values.full_name.length > 100) {
        errors.full_name = 'Tamanho inválido';
      }

      if (!values.company_name) {
        errors.company_name = 'Obrigatório';
      } else if (values.company_name.length > 100) {
        errors.company_name = 'Tamanho inválido';
      }

      return errors;
    },
  });

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
            # Marque a localização do seu cliente para encontrá-lo facilmente na
            próxima visita.
          </Text>
        </View>

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
            Cadastro de cliente
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
          {/* <Input
            placeholder="nome completo?"
            style={{
              backgroundColor: '#C3C3C3',
              borderRadius: 20,
              paddingLeft: 20,
            }}
          />
        </View>

        <View style={{ margin: 10 }}>
          <Input
            placeholder="empresa/estabelecimento?"
            style={{
              backgroundColor: '#C3C3C3',
              borderRadius: 20,
              paddingLeft: 20,
            }}
          /> */}

          <Form style={{ margin: 10 }} onSubmit={handleFormSubmit}>
            <View style={{ paddingBottom: 10 }}>
              <Item regular rounded error={errors.full_name ? true : false} style={{ borderColor: '#000' }}>
                <Input
                  type="text"
                  // autoFocus={true}

                  // autoCapitalize="none"
                  // autoCompleteType="company_name"
                  style={{ marginLeft: 10 }}
                  autoCorrect={false}
                  placeholder="nome completo?"
                  onChangeText={(full_name) => setFieldValue('full_name', full_name)}
                  value={values.full_name}
                />

              </Item>
              {errors.full_name && <Text style={{ color: 'red' }}>{errors.full_name}</Text>}
            </View>
            <View style={{ paddingBottom: 5 }}>
              <Item regular rounded error={errors.company_name ? true : false}
                style={{ borderColor: '#000', backgroundColor: '#DDD', borderRadius: 30 }}>
                <Input
                  type="text"
                  placeholder="empresa/estabelecimento?"
                  // secureTextEntry={showHideLogin.company_name}
                  autoCorrect={false}
                  style={{ marginLeft: 10 }}
                  spellCheck={false}
                  onChangeText={(company_name) =>
                    setFieldValue('company_name', company_name)
                  }
                  value={values.company_name}
                />

              </Item>
              {errors.company_name && <Text style={{ color: 'red' }}>{errors.company_name}</Text>}
            </View>
          </Form>

        </View>
        <View style={{ marginLeft: 10, }}>

          <ListItem style={{ borderBottomWidth: 0 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => handleCheckBox()}
            >
              {/* <CheckBox
                color="#dc3545"
                
                checked={checked}
                // selected={checked}
                onPress={handleCheckBox}

              // onValueChange={setChecked(false)}
              /> */}


              <View style={checked === true ? styles.checkedOn : styles.checkedOff}>
                {
                  checked === true &&
                  <FA name="check" color="#FFF" size={16} />
                }
              </View>


              <Body>
                <Text style={{ marginLeft: 10 }}>Marcar localização?</Text>
              </Body>
            </TouchableOpacity>
          </ListItem>

        </View>

        <View
          style={{
            margin: 10,
          }}>
          <TouchableOpacity
            disabled={loadingButtonLogin === true ? true : false}
            onPress={() => {
              if (
                !values.full_name ||
                !values.company_name ||
                values.company_name.length > 100
              ) {
                setLoadingButtonLogin(false);
                alert("Preencha os campos corretamente")
                handleSubmit()
              } else {
                setLoadingButtonLogin(true);
                if (checked === true) {
                  positionGPS()
                } else {
                  handleSubmit()
                }
              }

              // handleSubmit()
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
              // <Text style={{ fontSize: 20, color: '#FFF' }}>Salvar</Text>
              style={styles.button}>
              {loadingButtonLogin === true ? (
                <ActivityIndicator size={('small', 25)} color="green" />
              ) : (
                  <Text style={styles.buttonTitle}>Salvar</Text>
                )}
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
