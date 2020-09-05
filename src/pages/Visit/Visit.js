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

import {Input, Form, Item, DatePicker} from 'native-base';

// import DatePicker from '@react-native-community/datetimepicker';

/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api'

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

import AsyncStorage from '@react-native-community/async-storage';

export default function Visit({ route, navigation }) {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  const [chosenDate, setChosenDate] = useState(new Date())
  const [dateVisit, setDateVisit] = useState()

  function setCalendar(newDate) {
    var date = new Date(newDate),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    console.log([date.getFullYear(), mnth, day].join("-"));
    setDateVisit([date.getFullYear(), mnth, day].join("-"))
    // setChosenDate(newDate);
    // var today = new Date(newDate);

    // console.log(today.getDay() + '-' + today.getMonth() + '-' + today.getFullYear())
    // console.log(Date.parse(chosenDate))
  }

  const {
    client_id,
    full_name,
    company_name
  } = route.params;

  const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(true)

  const handleFormSubmit = (e) => {
    e.preventDefault();
  };

  async function makeAnAppointment() {

    const user_id = await AsyncStorage.getItem('@user_id')

    const token = JSON.parse(await AsyncStorage.getItem('@token'));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const response = await api.post('/visit', {
        client_id: client_id,
        user_id: user_id,
        visit_date: dateVisit
      },
        config);
      // console.log(response)
      if (response.data.error === "true") {
        console.log("Ocorreu um erro na inserção da visita")
        // setLoadingButtonLogin(false)
      } else {
        // setLoadingButtonLogin(false)
        navigation.reset({
          index: 0,
          routes: [

            {
              name: 'Home',
              // params: {
              //     uf: est_sigla,
              //     city_id: cid_id,
              //     city: cid_nome
              // },
            },
          ],
        })
      }
    } catch (error) {
      alert('Dados incorretos!' + error);
    }
    setLoadingButtonLogin(false)
  }

  // useEffect(() => {
  //   testeDatas()
  // }, [])

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
              fontSize: 20,
              fontFamily: 'Roboto-Black',
            }}>
            Escolha a data e agende uma visita para esse cliente.
          </Text>
        </View>
        <Image
          style={{
            marginTop: 20,
            height: 100,
            width: '100%',
          }}
          source={require('../../imgs/shapeTop3.png')}
          resizeMode="stretch"
        />
      </View>
      {/* <ScrollView>
                <View style={{ flex: 1, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
                    <Text>{client_id}</Text>
                    <Text>{full_name}</Text>
                </View>
            </ScrollView> */}

      <ScrollView>
        <View
          style={{
            marginLeft: 10, marginTop: 10, marginRight: 10, marginBottom: 5,
          }}>
          <Form style={{ margin: 10 }} onSubmit={handleFormSubmit}>
            <View style={{ paddingBottom: 10 }}>
              <Item rounded style={{ backgroundColor: '#bdbebd', borderRadius: 30 }}>
                <Input
                  disabled={true}
                  type="text"
                  autoCapitalize="none"
                  style={{ marginLeft: 10 }}
                  value={full_name}
                />

              </Item>

            </View>
            <View style={{ paddingBottom: 5 }}>
              <Item regular rounded style={{ backgroundColor: '#bdbebd', borderRadius: 30 }}>
                <Input
                  type="text"
                  disabled={true}
                  style={{ marginLeft: 10 }}
                  value={company_name}
                />

              </Item>
            </View>
          </Form>

        </View>
        <View style={{ marginLeft: 25, marginBottom: 5, flexDirection: 'row', alignItems: 'center' }}>
          {/* <Text>
            Date: {chosenDate.toString().substr(4, 12)}
          </Text> */}
          {/* <Text>
            Data:
          </Text> */}
          <View >
            <FA name="calendar-alt" size={20} color="#000" />
          </View>

          <DatePicker
            // ref={picker}
            defaultDate={new Date()}
            minimumDate={new Date()}
            maximumDate={new Date(2050, 12, 31)}
            locale={"pt"}
            timeZoneOffsetInMinutes={undefined}
            modalTransparent={false}
            animationType={"fade"}
            androidMode={"default"}
            placeHolderText="Escolha uma data"
            textStyle={{ color: "#000" }}
            placeHolderTextStyle={{ color: "#000" }}
            onDateChange={setCalendar}
            disabled={false}
          />

          {/* <DatePicker ref={picker} />
          <TouchableOpacity onPress={() => picker.current?.showDatePicker()}>
            <Text>Open Picker</Text>
          </TouchableOpacity> */}

          {/* <ListItem style={{ borderBottomWidth: 0 }}>
            <TouchableOpacity
              style={{ flexDirection: 'row' }}
              onPress={() => handleCheckBox()}
            >
              <CheckBox
                checked={checked}
                // selected={checked}
                onPress={handleCheckBox}

              // onValueChange={setChecked(false)}
              />

              <Body>
                <Text style={{ marginLeft: 10 }}>Marcar localização?</Text>
              </Body>
            </TouchableOpacity>
          </ListItem> */}

        </View>

        <View
          style={{
            margin: 10,
          }}>
          <TouchableOpacity
            disabled={loadingButtonLogin === true ? true : false}
            onPress={() => {
              // if (
              //   !values.full_name ||
              //   !values.company_name ||
              //   values.company_name.length > 100
              // ) {
              //   setLoadingButtonLogin(false);
              // } else {
              //   setLoadingButtonLogin(true);
              // }
              // if (checked === true) {
              //   positionGPS()
              // } else {
              //   handleSubmit()
              // }
              if (dateVisit !== undefined) {
                setLoadingButtonLogin(true);
                makeAnAppointment()
              } else {
                Alert.alert(
                  'Atenção',
                  'Escolha uma data para a visita!',
                  [{ text: 'Ok', onPress: () => setLoadingButtonLogin(false) }],
                  { cancelable: false },
                );
              }

            }}>
            <View
              style={styles.button}>
              {loadingButtonLogin === true ? (
                <ActivityIndicator size={('small', 25)} color="green" />
              ) : (
                  <Text style={styles.buttonTitle}>Marcar visita</Text>
                )}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={{}}>
        <Image
          style={{
            height: 60,
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
