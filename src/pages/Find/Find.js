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
  Linking,
  UIManager,
} from 'react-native';

import {Content, Accordion} from 'native-base';

// import {useNavigation} from '@react-navigation/native';
/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

import api from '../../services/api'

import FindItem from './FindItem'

import { useFormik } from 'formik';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'

import AsyncStorage from '@react-native-community/async-storage';
import { ScreenStackHeaderLeftView } from 'react-native-screens';

export default function Find({ navigation }) {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  // const nav = useNavigation()

  const [loadingButtonLogin, setLoadingButtonLogin] = useState(false);
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState([])
  // const [active, setActive] = useState(false)
  // const [expanded, setExpanded] = useState([])

  if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  // const findLocal = (latitude, longitude) => {
  //   return Linking.openURL(`https://maps.google.com/?q=${latitude},${longitude}`)
  // }

  async function visitById(client_id) {
    // console.log(client_id)
    if (client_id !== undefined) {
      const token = JSON.parse(await AsyncStorage.getItem('@token'));

      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        };

        const response = await api.get(`/visit_all_client?client_id=${client_id}`, config);
        console.log(response)

        if (response.data.length > 0) {
          return (
            <Text>iu</Text>
            // <TouchableOpacity
            //   onPress={() => navigation.navigate('Visit', {
            //     client_id: item.id, full_name: item.full_name, company_name: item.company_name
            //   })} >
            //   <View style={{ flex: 1, backgroundColor: '#3E7BF1', borderBottomLeftRadius: 10, borderBottomRightRadius: 10, }}>
            //     <Text style={{ textAlign: 'center', fontFamily: 'Roboto-Black', fontSize: 20, color: '#FFF', margin: 15 }}>
            //       Marcar uma visita?
            //           </Text>
            //   </View>
            // </TouchableOpacity>
          )
          // console.log("Sem clientes cadastrados")
          // setLoading(false)
          // setVisible(false)
        }
      } catch (error) {
        // alert('Dados incorretos!' + error);
        console.log('Erro em visit_all_client!' + error);
      }
    }
  }
  let g = 0
  function accordion(item) {
    g = (item)
    setActive(true)
    return setExpanded(item)
  }

  async function listAllClients() {

    const user_id = await AsyncStorage.getItem('@user_id')

    const token = JSON.parse(await AsyncStorage.getItem('@token'));

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      };

      const response = await api.get(`/clients?user_id=${user_id}`, config);
      // console.log(response.data)
      if (response.data.length === 0) {
        console.log("Sem clientes cadastrados")
        setLoading(false)
        setVisible(false)
      } else {
        setData(response.data)
        // console.log(response.data)
        setLoading(false)
        setVisible(false)
      }
    } catch (error) {
      // alert('Dados incorretos!' + error);
      console.log('Dados incorretos!' + error);
    }
    // setLoadingButtonLogin(false)
  }

  useEffect(() => {
    listAllClients()
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
            Veja todos os clientes que você conquistou.
          </Text>
        </View>

        <View
          style={{
            top: 90,
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
            Lista de clientes
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
      <ScrollView>
        <View style={{ flex: 1, marginLeft: 20, marginRight: 20, marginBottom: 10 }}>
          {loading === false ?
            data.length > 0 ?
              data.map(item => (
                <FindItem key={JSON.stringify(item.id)}
                  item={item}
                />
              ))
              :
              <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, fontFamily: 'Roboto-Regular' }}>Sem clientes cadastrados</Text>
              </View>
            :
            <ScrollView>
              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />

              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />
              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />

              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />
              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />

              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />
              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />
              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />

              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />
              <ShimmerPlaceHolder style={{ width: "100%", height: 150, borderRadius: 10, marginTop: 17 }}
                autoRun={visible} />
            </ScrollView>

          }
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
