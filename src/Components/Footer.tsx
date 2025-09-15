import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function Footer() {
  return (
    <View style={styles.footerContainer}>
      {/* PRAMAN Description */}
      <Text style={styles.title}>PRAMAN</Text>
      <Text style={styles.description}>
        Connecting contributors and consumers in a decentralized ecosystem built on trust and transparency.
      </Text>

      {/* Platform Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Platform</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com')}>
          <Text style={styles.link}>How it Works</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com')}>
          <Text style={styles.link}>For Contributors</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com')}>
          <Text style={styles.link}>For Consumers</Text>
        </TouchableOpacity>
      </View>

      {/* Support Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com')}>
          <Text style={styles.link}>Help Center</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com')}>
          <Text style={styles.link}>Contact Us</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.example.com')}>
          <Text style={styles.link}>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      {/* Footer Bottom */}
      <Text style={styles.footerBottom}>
        © TEAM ASTRAKODE. All rights reserved.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    flexShrink: 0,   // ✅ ensures footer does not overlap, always below content
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    textAlign: 'left',
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  link: {
    fontSize: 14,
    color: '#1E90FF',
    marginBottom: 6,
  },
  footerBottom: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
