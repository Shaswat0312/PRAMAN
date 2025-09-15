import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Footer from '../Components/Footer'; // Import Footer component

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function Home({ navigation }: HomeProps) {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.contentContainer}>
        {/* PRAMAN Title */}
        <Text style={styles.title}>PRAMAN</Text>

        {/* Choose your role text */}
        <Text style={styles.subtitle}>Choose your role to get started</Text>

        {/* Contributor Button */}
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate("Contributor", { userId: '12345' })}
        >
          <Image source={require('../assets/contributor.png')} style={styles.image} />
          <Text style={styles.mainText}>Contributor</Text>
          <Text style={styles.subText}>
            Share your expertise and contribute to the community
          </Text>
        </TouchableOpacity>

        {/* Consumer Button */}
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('Consumer', { userId: '12345' })}
        >
          <Image source={require('../assets/consumer.png')} style={styles.image} />
          <Text style={styles.mainText}>Consumer</Text>
          <Text style={styles.subText}>
            Access services and solutions from contributors
          </Text>
        </TouchableOpacity>
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: 60,
    height: 60,
    marginBottom: 15,
  },
  mainText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});