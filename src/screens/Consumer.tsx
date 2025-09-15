import React, { useState } from 'react';
import { View, Text, TextInput, Alert, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Footer from '../Components/Footer';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';

type ConsumerProps = NativeStackScreenProps<RootStackParamList, 'Consumer'>;

export default function Consumer({ navigation }: ConsumerProps) {
  const [batchId, setBatchId] = useState('');
  const [qrCode, setQrCode] = useState('');

  const onQRCodeScan = (e: any) => {
    if (e.data) {
      setQrCode(e.data);
      navigation.navigate('Journey');
    }
  };

  const handleSubmit = () => {
    if (!batchId) {
      Alert.alert('Error', 'Please enter a Batch ID');
    } else if (batchId.length !== 22) {
      Alert.alert('Error', 'Batch ID must be 22 characters long.');
    } else {
      navigation.navigate('Journey');
    }
  };

  const handleGoBack = () => {
    navigation.navigate('Home');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.contentContainer}>
        {/* QR Scanner Box */}
        <View style={styles.qrScannerContainer}>
          <RNCamera
            style={styles.camera}
            type={RNCamera.Constants.Type.back}
            onBarCodeRead={onQRCodeScan}
            captureAudio={false}
          >
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Scan QR Code</Text>
            </View>
          </RNCamera>
        </View>

        {/* OR Separator */}
        <View style={styles.separatorContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>OR</Text>
          <View style={styles.line} />
        </View>

        {/* Batch ID Input */}
        <TextInput
          style={styles.input}
          placeholder="Enter Batch ID (22 characters)"
          value={batchId}
          onChangeText={setBatchId}
          keyboardType="default"
          autoCorrect={false} // This is the key change
        />

        {/* Button Container */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.homeButton]} onPress={handleGoBack}>
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
        </View>

        {qrCode ? (
          <Text style={styles.scannedQRCode}>Scanned QR Code: {qrCode}</Text>
        ) : null}
      </View>
      <Footer />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  qrScannerContainer: {
    width: 300,
    height: 300,
    borderWidth: 2,
    borderColor: '#333',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    borderRadius: 10,
  },
  overlay: {
    position: 'absolute',
    top: '45%',
    left: '35%',
    width: '30%',
    height: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  overlayText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  input: {
    width: '80%',
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    borderRadius: 5,
  },
  scannedQRCode: {
    marginTop: 20,
    fontSize: 16,
    color: '#333',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    width: '80%',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  orText: {
    marginHorizontal: 10,
    color: '#888',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginTop: 10,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginHorizontal: 5,
    marginBottom: 10,
    alignItems: 'center',
    minWidth: '40%',
  },
  submitButton: {
    backgroundColor: '#4CAF50',
  },
  homeButton: {
    backgroundColor: '#0088ffff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});