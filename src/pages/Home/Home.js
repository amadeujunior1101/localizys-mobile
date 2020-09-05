import React, {useCallback} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  Linking,
  Alert,
} from 'react-native';
/* eslint-disable */
import FA from 'react-native-vector-icons/FontAwesome5';

export default function Home({ navigation }) {
  const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBar.currentHeight;

  // const supportedURL = "https://maps.google.com/?q=-5.472779064439238,-47.881180476397276";

  // function OpenURLButton({ url, children }){
  //   const handlePress = useCallback(async () => {
  //     // Checking if the link is supported for links with custom URL scheme.
  //     const supported = await Linking.canOpenURL(url);

  //     if (supported) {
  //       // Opening the link with some app, if the URL scheme is "http" the web link should be opened
  //       // by some browser in the mobile
  //       await Linking.openURL(url);
  //     } else {
  //       Alert.alert(`Don't know how to open this URL: ${url}`);
  //     }
  //   }, [url]);

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
            top: 50,
            position: 'absolute',
            zIndex: 1,
            left: 0,
            right: 0,
            bottom: 0,
            flexDirection: 'row',
            justifyContent: 'center',
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
          <Text
            style={{
              padding: 10,
              color: '#FFF',
              textAlign: 'center',
              fontSize: 16,
              fontFamily: 'Roboto-Regular',
            }}>
            beta 1.0
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => alert('Share')}
          style={{
            top: 55,
            position: 'absolute',
            right: 10,
            bottom: 0,
            zIndex: 1,
          }}>
          <FA name="share-alt" size={30} color="#d2d2d2" />
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <TouchableOpacity onPress={() => navigation.navigate('NewClient')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'center' }}>
                <FA
                  name="calendar-plus"
                  size={40}
                  color="#FFF"
                  style={{
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 15,
                    paddingBottom: 10,
                    borderRadius: 50,
                    backgroundColor: '#FF5733',
                  }}
                />

                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Black',
                    fontSize: 20,
                  }}>
                  Novo
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Find')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'center' }}>
                <FA
                  name="user"
                  size={40}
                  color="#FFF"
                  style={{
                    paddingLeft: 14,
                    paddingTop: 10,
                    paddingRight: 14,
                    paddingBottom: 10,
                    borderRadius: 50,
                    backgroundColor: '#FF5733',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Black',
                    fontSize: 20,
                  }}>
                  Clientes
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <View
          style={{
            marginTop: 20,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          {/* <TouchableOpacity onPress={() => alert('clicou')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{alignItems: 'center'}}>
                <FA
                  name="list-alt"
                  size={40}
                  color="#000"
                  style={{
                    paddingLeft: 12,
                    paddingTop: 10,
                    paddingRight: 12,
                    paddingBottom: 10,
                    borderRadius: 50,
                    backgroundColor: '#D6D6D6',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Regular',
                    fontSize: 20,
                  }}>
                  Orçamentos
                </Text>
              </View>
            </View>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => navigation.navigate('Schedule')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'center' }}>
                <FA
                  name="calendar-alt"
                  size={40}
                  color="#FFF"
                  style={{
                    paddingLeft: 15,
                    paddingTop: 10,
                    paddingRight: 15,
                    paddingBottom: 10,
                    borderRadius: 50,
                    backgroundColor: '#FF5733',
                    // #D6D6D6
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Black',
                    fontSize: 20,
                  }}>
                  Agenda
                </Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: '#FFF',
                borderRadius: 30,
                marginRight: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View style={{ alignItems: 'center' }}>
                <FA
                  name="address-card"
                  size={32}
                  color="#FFF"
                  style={{
                    paddingLeft: 14,
                    paddingTop: 14,
                    paddingRight: 14,
                    paddingBottom: 14,
                    borderRadius: 50,
                    backgroundColor: '#FF5733',
                  }}
                />
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Roboto-Black',
                    fontSize: 20,
                  }}>
                  Perfil
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View
        style={{
          // top: 90,
          position: 'absolute',
          zIndex: 1,
          left: 10,
          right: 10,
          bottom: 10,
          flexDirection: 'row',
          justifyContent: 'center'
        }}>
        <Text
          style={{
            color: '#000',
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'Roboto-Black',
            marginRight: 5
          }}>
          Desenvolvidor por
        </Text>
        <Text
          style={{
            color: '#3E7BF1',
            textAlign: 'center',
            fontSize: 16,
            fontFamily: 'Roboto-Black',
          }}>
          Glindoor Sistemas
        </Text>
      </View>

      <View>
        {/* <View style={{
                    top: 30, position: 'absolute', elevation: 1,
                    left: 0, right: 0, bottom: 0, alignItems: 'center'
                }}>
                    <Text style={{ color: '#FFF', textAlign: 'center', fontSize: 25, fontFamily: 'Roboto-Black' }}>Localizys</Text>
                </View> */}

        <Image
          style={{
            height: 100,
            width: '100%',
          }}
          source={require('../../imgs/shapeBottom-amarelo1.png')}
          resizeMode="stretch"
        />
      </View>
    </View>
  );
}
