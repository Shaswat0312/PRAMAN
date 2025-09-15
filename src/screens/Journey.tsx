import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../App';
import Footer from '../Components/Footer';

// Importing assets for React Native
const Map = require('../assets/map.png');
const photo = require('../assets/man.jpg');
const ss1 = require('../assets/ss1.png');
const ss2 = require('../assets/ss2.png');
const ss3 = require('../assets/ss3.png');
const ss4 = require('../assets/ss4.png');

const supplyChainData = [
  {
    role: "Farmer",
    location: "Bhubaneswar, Odisha",
    description: "Herbs carefully harvested and quality-checked on site.",
    date: "2024-01-15",
    time: "08:30 AM",
    emoji: "🚜", // Replaced with emoji
    borderColor: "#22c55e",
    companyName: "rajesh.kumar@ayurvedic-farm.in",
    supervisor: "Rajesh Kumar",
    pramanId: "FRM002",
    batchId: "FARM-0001-23",
    locationPhoto: Map,
    loggedPictures: [ss1, ss2, ss3, ss4],
    farmerPhoto: photo,
  },
  {
    role: "Collector",
    location: "Bhubaneswar, Odisha",
    description: "Collected and consolidated herbs at the local storage facility.",
    date: "2024-01-15",
    time: "10:30 AM",
    emoji: "🚚", // Replaced with emoji
    borderColor: "#3b82f6",
    companyName: "Balangir Herb Collectors Ltd",
    supervisor: "Sunita Das",
    pramanId: "COL001",
    batchId: "FARM-0001-23",
  },
  {
    role: "Lab",
    location: "ABC Testing Lab, Bhubaneswar",
    description: "Rigorous lab testing for purity and potency.",
    date: "2024-01-15",
    time: "02:15 PM",
    emoji: "🧪", // Replaced with emoji
    borderColor: "#a855f7",
    companyName: "ABC Testing Lab Pvt Ltd",
    supervisor: "Dr. Priya Mishra",
    pramanId: "LAB001",
    batchId: "FARM-0001-23",
  },
  {
    role: "Distributor",
    location: "Hub Warehouse, Bhubaneswar",
    description: "Packaged and sealed products prepared for shipment.",
    date: "2024-01-17",
    time: "04:00 PM",
    emoji: "📦", // Replaced with emoji
    borderColor: "#eab308",
    companyName: "Bhubaneswar Distributors Inc",
    supervisor: "Arun Singh",
    pramanId: "DIS001",
    batchId: "FARM-0001-23",
  },
  {
    role: "Retailer",
    location: "Bhubaneswar Outlet",
    description: "Final product received, inspected, and stocked on shelves.",
    date: "2024-01-18",
    time: "11:45 AM",
    emoji: "🏪", // Replaced with emoji
    borderColor: "#ec4899",
    companyName: "Bhubaneswar Retailers Co.",
    supervisor: "Manisha Patnaik",
    pramanId: "RET007",
    batchId: "FARM-0001-23",
  },
];

type JourneyProps = NativeStackScreenProps<RootStackParamList, 'Journey'>;

export default function Journey({ navigation }: JourneyProps) {
  const [showPopup, setShowPopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  const handleItemClick = (item: any) => {
    setSelectedItem(item);
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
    setSelectedItem(null);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {/* Page Title */}
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Product Journey Timeline</Text>
          <Text style={styles.batchInfo}>Batch: FRM001-1757732480816-GEN</Text>
          <Text style={styles.productInfo}>Tracking for Aswagandha</Text>
        </View>

        {/* Timeline */}
        <View style={styles.timelineContainer}>
          {/* Vertical Line */}
          <View style={styles.timelineLine} />

          {supplyChainData.map((step, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={styles.timelineItem}
                onPress={step.role === 'Farmer' ? () => handleItemClick(step) : undefined}
                disabled={step.role !== 'Farmer'}
              >
                {/* Icon */}
                <View style={styles.iconWrapper}>
                  <View style={styles.iconBox}>
                    <Text style={styles.emoji}>{step.emoji}</Text>
                  </View>
                </View>

                {/* Info Box */}
                <View style={[styles.infoBox, { borderColor: step.borderColor }]}>
                  <View style={styles.infoRow}>
                    <Text style={styles.roleText}>{step.role}</Text>
                    <Text style={styles.dateTimeText}>{step.date} • {step.time}</Text>
                  </View>
                  <View style={styles.locationRow}>
                    <Text style={styles.locationEmoji}>📍</Text>
                    <Text style={styles.locationText}>{step.location}</Text>
                  </View>
                  <Text style={styles.descriptionText}>{step.description}</Text>

                  <View style={styles.detailsSection}>
                    {step.companyName && <Text style={styles.detailText}><Text style={styles.boldText}>Company:</Text> {step.companyName}</Text>}
                    {step.supervisor && <Text style={styles.detailText}><Text style={styles.boldText}>Supervisor:</Text> {step.supervisor}</Text>}
                    {step.pramanId && <Text style={styles.detailText}><Text style={styles.boldText}>USER ID:</Text> {step.pramanId}</Text>}
                    {step.batchId && <Text style={styles.detailText}><Text style={styles.boldText}>Batch ID:</Text> {step.batchId}</Text>}
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Completion Box */}
        <View style={styles.completionContainer}>
          <View style={styles.completionBox}>
            <Text style={styles.completionTitle}>✅ Journey Completed</Text>
            <Text style={styles.completionText}>
              Your herb has completed its path through the verified supply chain.
            </Text>
          </View>
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Home')}
            style={[styles.button, styles.menuButton]}
          >
            <Text style={styles.buttonText}>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Consumer', { userId: '12345' })}
            style={[styles.button, styles.backButton]}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Footer />

      {/* Popup Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPopup}
        onRequestClose={closePopup}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <ScrollView contentContainerStyle={styles.modalScrollView}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>{selectedItem.role.toUpperCase()}</Text>
                  {selectedItem.farmerPhoto && (
                    <Image source={selectedItem.farmerPhoto} style={styles.modalImage} />
                  )}
                </View>

                <View style={styles.modalDetails}>
                  {selectedItem.companyName && <Text style={styles.modalDetailText}><Text style={styles.modalBoldText}>Company:</Text> {selectedItem.companyName}</Text>}
                  {selectedItem.supervisor && <Text style={styles.modalDetailText}><Text style={styles.modalBoldText}>Supervisor:</Text> {selectedItem.supervisor}</Text>}
                  {selectedItem.pramanId && <Text style={styles.modalDetailText}><Text style={styles.modalBoldText}>PRAMAN ID:</Text> {selectedItem.pramanId}</Text>}
                  {selectedItem.batchId && <Text style={styles.modalDetailText}><Text style={styles.modalBoldText}>Batch ID:</Text> {selectedItem.batchId}</Text>}
                  {selectedItem.date && <Text style={styles.modalDetailText}><Text style={styles.modalBoldText}>Date:</Text> {selectedItem.date}</Text>}
                  {selectedItem.time && <Text style={styles.modalDetailText}><Text style={styles.modalBoldText}>Time:</Text> {selectedItem.time}</Text>}
                </View>

                {selectedItem.locationPhoto && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Farm Location</Text>
                    <Text style={styles.modalSectionText}>{selectedItem.location}</Text>
                    <Image source={selectedItem.locationPhoto} style={styles.locationImage} />
                  </View>
                )}

                {selectedItem.loggedPictures && selectedItem.loggedPictures.length > 0 && (
                  <View style={styles.modalSection}>
                    <Text style={styles.modalSectionTitle}>Logged Pictures</Text>
                    <View style={styles.picturesGrid}>
                      {selectedItem.loggedPictures.map((image: any, index: any) => (
                        <Image key={index} source={image} style={styles.gridImage} />
                      ))}
                    </View>
                  </View>
                )}
                
              <TouchableOpacity
                onPress={closePopup}
                style={styles.closeButton}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    backgroundColor: '#f9fafb',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 40,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 4,
  },
  batchInfo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2563eb',
  },
  productInfo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4b5563',
  },
  timelineContainer: {
    position: 'relative',
    paddingLeft: 40,
  },
  timelineLine: {
    position: 'absolute',
    left: 18,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: '#d1d5db',
  },
  timelineItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  iconWrapper: {
    position: 'absolute',
    left: 0,
    top: 4,
    zIndex: 10,
  },
  iconBox: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#d1d5db',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  emoji: {
    fontSize: 20,
  },
  locationEmoji: {
    fontSize: 14,
    marginRight: 5,
  },
  infoBox: {
    flex: 1,
    marginLeft: 20,
    borderWidth: 2,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  roleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  dateTimeText: {
    fontSize: 10,
    color: '#6b7280',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 12,
    color: '#4b5563',
    marginBottom: 4,
  },
  locationText: {
    fontSize: 12,
    color: '#4b5563',
  },
  descriptionText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 12,
  },
  detailsSection: {
    fontSize: 12,
    color: '#4b5563',
    lineHeight: 18,
  },
  detailText: {
    fontSize: 12,
    color: '#4b5563',
  },
  boldText: {
    fontWeight: 'bold',
    color: '#1f2937',
  },
  completionContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  completionBox: {
    backgroundColor: '#f0fdf4',
    borderWidth: 1,
    borderColor: '#4ade80',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  completionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16a34a',
  },
  completionText: {
    fontSize: 12,
    marginTop: 4,
    color: '#166534',
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 32,
    flexWrap: 'wrap',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
    marginHorizontal: 8,
    marginBottom: 8,
    alignItems: 'center',
  },
  menuButton: {
    backgroundColor: '#3977ffff',
  },
  backButton: {
    backgroundColor: '#ff0000ff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: Dimensions.get('window').width * 0.9,
    maxHeight: Dimensions.get('window').height * 0.8,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 20,
    elevation: 5,
  },
  modalScrollView: {
    flexGrow: 1,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  modalImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#d1d5db',
  },
  modalDetails: {
    width: '100%',
    marginBottom: 16,
  },
  modalDetailText: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 22,
  },
  modalBoldText: {
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalSection: {
    width: '100%',
    marginBottom: 16,
  },
  modalSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  modalSectionText: {
    fontSize: 14,
    color: '#4b5563',
    marginBottom: 8,
  },
  locationImage: {
    width: '100%',
    height: 160,
    borderRadius: 8,
  },
  picturesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  gridImage: {
    width: '48%',
    height: 100,
    marginBottom: 8,
    borderRadius: 8,
  },
  closeButton: {
    backgroundColor: '#dc2626',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});