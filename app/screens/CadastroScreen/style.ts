import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      backgroundColor: "#e0aaff",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: "bold",
      textAlign: "center",
      color: "#10002b",
      marginBottom: 30,
    },
    inputContainer: {
      marginBottom: 20,
    },
    label: {
      fontSize: 18,
      color: "#10002b",
      marginBottom: 5,
    },
    input: {
      backgroundColor: "#000",
      borderRadius: 10,
      height: 40,
      paddingHorizontal: 10,
    },
    dropdown: {
      backgroundColor: "#9d4edd",
      borderColor: "#240046",
      borderRadius: 10,
    },
    dropdownContainer: {
      backgroundColor: "#9d4edd",
      borderColor: "#240046",
    },
    button: {
      backgroundColor: "#A020F0",
      paddingVertical: 15,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonText: {
      textAlign: "center",
      fontSize: 20,
      color: "#fff",
      fontWeight: "bold",
    },
  });
  
  export default styles;
