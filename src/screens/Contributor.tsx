import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Modal, Dimensions, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Footer from '../Components/Footer';

// We will use a mock web3Service and ToastContext for the React Native environment
// In a real project, you would need to implement these for mobile
const web3Service = {
  initialize: async () => console.log('Mock web3Service initialized'),
  isUserRegistered: async (address: string) => {
    // Mock logic
    if (address === 'mock_registered_address') {
      return true;
    }
    return false;
  },
  getUser: async (address: string) => {
    // Mock user data
    if (address === 'mock_registered_address') {
      return { exists: true, role: 'collector' };
    }
    return { exists: false, role: '' };
  },
};

const useToast = () => {
  const showSuccess = (message: string) => {
    Alert.alert('Success', message);
  };
  const showError = (message: string) => {
    Alert.alert('Error', message);
  };
  return { showSuccess, showError };
};

type ContributorProps = NativeStackScreenProps<RootStackParamList, 'Contributor'>;

export default function Contributor({ navigation }: ContributorProps) {
  const [selectedRole, setSelectedRole] = useState<any>(null);
  const { showError, showSuccess } = useToast();

  const supplyChainRoles = [
    {
      id: 'farmer',
      title: 'Farmer',
      emoji: '🌾',
      description: 'Grow and harvest agricultural products',
      color: 'green',
      details: 'Grow and harvest agricultural products for the supply chain.',
    },
    {
      id: 'collector',
      title: 'Collector',
      emoji: '📋',
      description: 'Gather and organize products from farmers',
      color: 'blue',
      details: 'Gather and organize products from multiple farmers.',
    },
    {
      id: 'lab',
      title: 'Lab (Quality Inspector)',
      emoji: '🔬',
      description: 'Test and ensure product quality and safety',
      color: 'purple',
      details: 'Test and certify products for quality and safety standards.',
    },
    {
      id: 'supplier',
      title: 'Supplier',
      emoji: '📦',
      description: 'Provide processed materials and components',
      color: 'orange',
      details: 'Provide processed materials and components to the supply chain.',
    },
    {
      id: 'distributor',
      title: 'Distributor',
      emoji: '🚚',
      description: 'Handle logistics and distribution networks',
      color: 'indigo',
      details: 'Manage logistics and transportation of products to retailers.',
    },
    {
      id: 'retailer',
      title: 'Retailer',
      emoji: '🏪',
      description: 'Sell products directly to consumers',
      color: 'red',
      details: 'Sell products to consumers.',
    },
  ];

  const handleRoleClick = (roleId: string) => {
    const role = supplyChainRoles.find(r => r.id === roleId);
    setSelectedRole(role);
  };

  const handleWalletConnect = async () => {
    if (!selectedRole) return;

    Alert.alert('Wallet Connect', 'This feature requires a crypto wallet.');

    if (selectedRole.id === 'farmer') {
      navigation.navigate('Home', { userId: 'farmer_user' });
      return;
    }
    if (selectedRole.id === 'supplier') {
      navigation.navigate('Home', { userId: 'supplier_user' });
      return;
    }

    const mockAddress = '0x1234567890abcdef1234567890abcdef12345678';
    
    try {
      const userCheck = await web3Service.isUserRegistered(mockAddress);
      
      if (userCheck) {
        const user = await web3Service.getUser(mockAddress);
        if (user.role === selectedRole.id) {
          showSuccess(`Welcome back! You're already registered as a ${selectedRole.title}`);
          closeModal();
        } else {
          showError(`Address is already registered as a "${user.role}".`);
          closeModal();
        }
      } else {
        showSuccess(`Welcome! You can now register as a ${selectedRole.title}`);
        closeModal();
      }
    } catch (error) {
      console.error('Wallet connection error:', error);
      showError('Failed to connect to wallet. Please try again.');
    }
  };

  const closeModal = () => {
    setSelectedRole(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Page Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Choose Your Role</Text>
          <Text style={styles.subtitle}>
            Select your position in the supply chain to access role-based features and data
          </Text>
        </View>

        {/* Roles Grid */}
        <View style={styles.rolesGrid}>
          {supplyChainRoles.map((role) => (
            <TouchableOpacity
              key={role.id}
              style={[styles.roleCard, { borderColor: role.color }]}
              onPress={() => handleRoleClick(role.id)}
            >
              <View style={styles.cardContent}>
                <View style={styles.emojiContainer}>
                  <Text style={styles.emoji}>{role.emoji}</Text>
                </View>
                <Text style={styles.cardTitle}>{role.title}</Text>
                <Text style={styles.cardDescription}>{role.description}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={!!selectedRole}
          onRequestClose={closeModal}
        >
          <TouchableOpacity style={styles.modalOverlay} onPress={closeModal}>
            <View style={styles.modalContent} onStartShouldSetResponder={() => true}>
              <View style={styles.modalHeader}>
                <View style={styles.modalHeaderContent}>
                  <View style={styles.modalEmojiContainer}>
                    <Text style={styles.modalEmoji}>{selectedRole?.emoji}</Text>
                  </View>
                  <Text style={styles.modalTitle}>{selectedRole?.title}</Text>
                </View>
                <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                  <Text style={styles.closeButtonText}>×</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.modalBody}>
                <Text style={styles.modalDescription}>{selectedRole?.details}</Text>
                <TouchableOpacity style={styles.connectButton} onPress={handleWalletConnect}>
                  <Text style={styles.connectButtonText}>🔗 Connect Wallet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={closeModal}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Back to Home Button at the bottom */}
        <TouchableOpacity style={styles.backButtonBottom} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.backButtonText}>← Back to Home</Text>
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
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  backButtonBottom: {
    marginTop: 20,
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#1f2937',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#4b5563',
    textAlign: 'center',
    maxWidth: 600,
  },
  rolesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
  },
  roleCard: {
    width: Dimensions.get('window').width > 768 ? '30%' : '45%',
    margin: 8,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: 'white',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  cardContent: {
    padding: 24,
    alignItems: 'center',
  },
  emojiContainer: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  emoji: {
    fontSize: 30,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 14,
    color: '#4b5563',
    textAlign: 'center',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 24,
    overflow: 'hidden',
    elevation: 20,
  },
  modalHeader: {
    backgroundColor: '#20c997',
    padding: 24,
  },
  modalHeaderContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalEmojiContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  modalEmoji: {
    fontSize: 24,
  },
  modalTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
  modalBody: {
    padding: 24,
    alignItems: 'center',
  },
  modalDescription: {
    fontSize: 16,
    color: '#4b5563',
    textAlign: 'center',
    marginBottom: 20,
  },
  connectButton: {
    backgroundColor: '#198754',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginBottom: 10,
    width: '100%',
    alignItems: 'center',
  },
  connectButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontWeight: '500',
  },
});