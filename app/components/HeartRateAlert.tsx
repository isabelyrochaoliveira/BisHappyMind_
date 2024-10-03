import React from "react";
import { View, Text, TouchableOpacity, Alert, Linking } from "react-native";
import styles from "../style.js"; // Importando os estilos

const HeartRateAlert = () => {
  // Função para lidar com o clique no botão de alerta
  const handleAlert = () => {
    Alert.alert("Esta funcionalidade ainda não está implementada.");
  };

  // Função para abrir o YouTube
  const openYouTube = () => {
    const url = "https://www.youtube.com/"; // Coloque aqui o link da playlist
    Linking.openURL(url).catch((err) => 
      Alert.alert("Erro", "Não foi possível abrir o YouTube.")
    );
  };

  return (
    <View style={styles.alertContainer}>
      <View style={styles.heartIconWrapper}>
        <Text style={styles.heartIcon}>❤️</Text>
      </View>
      <Text style={styles.alertTitle}>Atenção!!</Text>
      <Text style={styles.alertMessage}>
        Seus batimentos cardíacos ultrapassaram 100bpm.
      </Text>
      <Text style={styles.alertPrompt}>Você gostaria...</Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={handleAlert} style={styles.alertButton}>
          <Text style={styles.alertButtonText}>Escutar Playlist</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openYouTube} style={styles.alertButton}>
          <Text style={styles.alertButtonText}>Participar de uma Imersão</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={handleAlert} style={styles.alertButtonFullWidth}>
        <Text style={styles.alertButtonText}>
          Estou apenas realizando uma atividade física.
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HeartRateAlert;
