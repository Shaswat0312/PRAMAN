import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type HeaderProps = {
  navigation: NativeStackNavigationProp<RootStackParamList>;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <Image 
        source={require('../assets/logo.png')}  // Replace with your actual logo path
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 100,  // Increased height for a bigger header
    paddingTop: 10,  // Adjust padding for better spacing
    backgroundColor: '#fff',  // Set the background color to white
    justifyContent: 'center',  // Center the logo vertically
    alignItems: 'center',  // Center the logo horizontally
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,  // Increased width for a bigger logo
    height: 360,  // Increased height for a bigger logo
    resizeMode: 'contain',  // Ensures logo maintains aspect ratio
  },
});

export default Header;
