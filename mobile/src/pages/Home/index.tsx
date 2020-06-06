import React, { useEffect, useState } from 'react';
import { Feather as Icon } from '@expo/vector-icons'
import { View, ImageBackground, Text, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

interface IBGEUFResponse {
  sigla: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [ufs, setUfs] = useState<string[]>([]);
  const [cities, setCities] = useState<string[]>([]);
  const [selectedUf, setSelectedUf] = useState<string>('0');
  const [selectedCity, setSelectedCity] = useState<string>('0');

  const navigation = useNavigation();

  useEffect(() => {
    axios.get<IBGEUFResponse[]>(
      'https://servicodados.ibge.gov.br/api/v1/localidades/estados/?orderBy=nome'
    ).then(response => {
      const ufInitials = response.data.map(uf => uf.sigla);
      setUfs(ufInitials);
    });
  }, []);

  useEffect(() => {
    if (selectedUf === '0') {
      return;
    }

    axios.get<IBGECityResponse[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios?orderBy=nome`
    ).then(response => {
      const citiesNames = response.data.map(city => city.nome);
      setCities(citiesNames);
    });
  }, [selectedUf]);

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUf,
      city: selectedCity
    });
  }

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior={Platform.OS === 'ios' ? 'padding': undefined} >
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>
            Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
          </Text>
        </View>

        <View style={styles.footer}>
            <RNPickerSelect
              value={selectedUf}
              onValueChange={value => setSelectedUf(value)}
              items={
                ufs.map(uf => ({ label: uf, value: uf }))
              }
              placeholder={{
                label: 'Selecione o estado',
                color: '#6C6C80',
              }}
              Icon={() => (
                <Icon name="chevron-down" size={24} color="#6C6C80" />
              )}
              style={{
                inputIOS: {
                  backgroundColor: '#FFF',
                  color: '#6C6C80',
                  height: 60,
                  flexDirection: 'row',
                  borderRadius: 10,
                  overflow: 'hidden',
                  alignItems: 'center',
                  marginTop: 8,
                  paddingLeft: 30
                },
                inputAndroid: {
                  backgroundColor: '#FFF',
                  color: '#6C6C80',
                  height: 60,
                  flexDirection: 'row',
                  borderRadius: 10,
                  overflow: 'hidden',
                  alignItems: 'center',
                  marginTop: 8,
                  paddingLeft: 30
                },
                iconContainer: {
                  top: 25,
                  right: 25,
                }
              }}
            />
            
            <RNPickerSelect
              value={selectedCity}
              onValueChange={value => setSelectedCity(value)}
              items={
                cities.map(city => ({ label: city, value: city }))
              }
              placeholder={{
                label: 'Selecione a cidade',
                color: '#6C6C80',
              }}
              Icon={() => (
                <Icon name="chevron-down" size={24} color="#6C6C80" />
              )}
              style={{
                inputIOS: {
                  backgroundColor: '#FFF',
                  color: '#6C6C80',
                  height: 60,
                  flexDirection: 'row',
                  borderRadius: 10,
                  overflow: 'hidden',
                  alignItems: 'center',
                  marginTop: 8,
                  paddingLeft: 30
                },
                inputAndroid: {
                  backgroundColor: '#FFF',
                  color: '#6C6C80',
                  height: 60,
                  flexDirection: 'row',
                  borderRadius: 10,
                  overflow: 'hidden',
                  alignItems: 'center',
                  marginTop: 8,
                  paddingLeft: 30
                },
                iconContainer: {
                  top: 25,
                  right: 25,
                }
              }}
            />


          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {
    backgroundColor: '#34CB79',
    height: 60,
    borderRadius: 10,
    marginTop: 8,
    padding:10,
    
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});

export default Home;