import React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

const CadastroScreen = () => {
  const [nome, setNome] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [etnia, setEtnia] = useState(null); // Valor inicial null
  const [curso, setCurso] = useState(null); // Valor inicial null
  const [cidade, setCidade] = useState('');
  const [email, setEmail] = useState('');
  const [contatoEmergencia, setContatoEmergencia] = useState('');

  const [openEtnia, setOpenEtnia] = useState(false);
  const [etniaItems, setEtniaItems] = useState([
    { label: 'Preto', value: 'preto' },
    { label: 'Pardo', value: 'pardo' },
    { label: 'Branco', value: 'branco' },
    { label: 'Indígena', value: 'indigena' },
    { label: 'Amarelo', value: 'amarelo' }
  ]);

  const [openCurso, setOpenCurso] = useState(false);
  const [cursoItems, setCursoItems] = useState([
    { label: '1º Informática', value: '1info' },
    { label: '2º Informática', value: '2info' },
    { label: '3º Informática', value: '3info' },
    { label: '1º Mecânica', value: '1mec' },
    { label: '2º Mecânica', value: '2mec' },
    { label: '3º Mecânica', value: '3mec' },
    { label: '1º Eletroeletrônica', value: '1ele' },
    { label: '2º Eletroeletrônica', value: '2ele' },
    { label: '3º Eletroeletrônica', value: '3ele' }
  ]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data de Nascimento:</Text>
        <TextInput
          style={styles.input}
          value={dataNascimento}
          onChangeText={setDataNascimento}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Etnia:</Text>
        <DropDownPicker
          open={openEtnia}
          value={etnia}
          items={etniaItems}
          setOpen={setOpenEtnia}
          setValue={setEtnia}
          setItems={setEtniaItems}
          placeholder="Selecione sua etnia"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Curso:</Text>
        <DropDownPicker
          open={openCurso}
          value={curso}
          items={cursoItems}
          setOpen={setOpenCurso}
          setValue={setCurso}
          setItems={setCursoItems}
          placeholder="Selecione seu curso"
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Cidade:</Text>
        <TextInput
          style={styles.input}
          value={cidade}
          onChangeText={setCidade}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Contato de emergência:</Text>
        <TextInput
          style={styles.input}
          value={contatoEmergencia}
          onChangeText={setContatoEmergencia}
        />
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#A020F0',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#d3b3e8',
    borderRadius: 10,
    height: 40,
    paddingHorizontal: 10,
  },
  dropdown: {
    backgroundColor: '#d3b3e8',
    borderColor: 'gray',
    borderRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: '#d3b3e8',
    borderColor: 'gray',
  },
  button: {
    backgroundColor: '#3b0086',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default CadastroScreen;
