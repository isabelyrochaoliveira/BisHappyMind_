import useBLE from "@/app/hooks/useBLE";
import React, { useState, useEffect } from "react";
import { SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import styles from "./style";
import HeartRateAlert from "@/app/components/HeartRateAlert";
import DeviceModal from "@/app/components/DeviceConnectionModal";
import SQLite from "react-native-sqlite-storage";

// Função para abrir o banco de dados SQLite
const openDatabase = () => {
  const db = SQLite.openDatabase(
    { name: "heartRate.db", location: "default" },
    () => {},
    (error: any) => {
      console.error("Erro ao abrir o banco de dados SQLite:", error);
    }
  );
  return db;
};

// Função para criar a tabela de batimentos cardíacos, se não existir
const createTableIfNotExists = (db: SQLite.SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS heart_rate (id INTEGER PRIMARY KEY AUTOINCREMENT, bpm INTEGER, timestamp TEXT)`,
      [],
      () => {
        console.log("Tabela de batimentos criada com sucesso.");
      },
      (error) => {
        console.error("Erro ao criar a tabela de batimentos:", error);
      }
    );
  });
};

// Função para salvar batimento cardíaco no banco de dados
const saveHeartRateLocally = (bpm: number) => {
  const db = openDatabase();
  createTableIfNotExists(db);

  const timestamp = new Date().toISOString();
  db.transaction((tx) => {
    tx.executeSql(
      "INSERT INTO heart_rate (bpm, timestamp) VALUES (?, ?)",
      [bpm, timestamp],
      () => {
        console.log(`Batimento de ${bpm} bpm salvo com sucesso.`);
      },
      (error) => {
        console.error("Erro ao salvar batimento no banco de dados:", error);
      }
    );
  });
};

const HeartScreen = () => {
  const {
    requestPermissions,
    scanForPeripherals,
    allDevices,
    connectToDevice,
    connectedDevice,
    heartRate,
    disconnectFromDevice,
  } = useBLE();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const postHeartRate = async () => {
    try {
      if (heartRate) {
        const response = await fetch("https://www.seusite.com.br/api/batimento", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            heartRate: heartRate,
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`Erro ao enviar batimento: ${response.status}`);
        }

        const jsonResponse = await response.json();
        console.log("Batimento enviado com sucesso:", jsonResponse);
      }
    } catch (error) {
      console.error("Erro ao enviar batimento:", error);
    }
  };

  const scanForDevices = async () => {
    const isPermissionsEnabled = await requestPermissions();
    if (isPermissionsEnabled) {
      scanForPeripherals();
    }
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const openModal = async () => {
    scanForDevices();
    setIsModalVisible(true);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (connectedDevice && heartRate) {
        if (heartRate > 50) {
          saveHeartRateLocally(heartRate); // Salva no SQLite
          postHeartRate(); // Envia para a API
        }
      }
    }, 600000); // Intervalo de 10 minutos (600000ms)

    return () => clearInterval(intervalId);
  }, [connectedDevice, heartRate]);

  return (
    <SafeAreaView style={styles.container}>
      {heartRate > 100 ? (
        <HeartRateAlert />
      ) : (
        <View style={styles.heartRateTitleWrapper}>
          {connectedDevice ? (
            <>
              <Text style={styles.heartRateTitleText}>Sua frequência cardíaca é:</Text>
              <Text style={styles.heartRateText}>{heartRate} bpm</Text>
            </>
          ) : (
            <Text style={styles.heartRateTitleText}>
              Conecte-se a um monitor de frequência cardíaca
            </Text>
          )}
        </View>
      )}
      <TouchableOpacity
        onPress={connectedDevice ? disconnectFromDevice : openModal}
        style={styles.ctaButton}
      >
        <Text style={styles.ctaButtonText}>
          {connectedDevice ? "Desconectar" : "Conectar"}
        </Text>
      </TouchableOpacity>
      <DeviceModal
        closeModal={hideModal}
        visible={isModalVisible}
        connectToPeripheral={connectToDevice}
        devices={allDevices}
      />
    </SafeAreaView>
  );
};

export default HeartScreen;
