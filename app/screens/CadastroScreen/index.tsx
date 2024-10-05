import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import styles from "./style";
import { useAuth } from "@/app/hooks/useAuth";
import Input from "@/app/components/Input";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/app/components/Button";
import HeartRateAlert from "@/app/components/HeartRateAlert";
import { useNavigation } from "@react-navigation/native";
import { AppNavigatorRoutesProps } from "@/app/routes/app.routes";

type FormDataProps = {
  nome: string;
  dataNascimento: string;
  etnia: string;
  curso: string;
  cidade: string;
  email: string;
  contatoEmergencia: string;
};

const CadastroScreenSchema = yup.object({
  nome: yup.string().required("Informe o nome."),
  dataNascimento: yup.string().required("Informe a data de nascimento."),
  etnia: yup.string().required("Selecione a etnia."),
  curso: yup.string().required("Selecione o curso."),
  cidade: yup.string().required("Informe a cidade."),
  email: yup.string().required("Informe o e-mail").email("E-mail inválido."),
  contatoEmergencia: yup.string().required("Informe o contato de emergência."),
});

const CadastroScreen = () => {
  const { navigate } = useNavigation<AppNavigatorRoutesProps>();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataProps>({
    resolver: yupResolver(CadastroScreenSchema),
  });

  const { createUser } = useAuth();
  const [openEtnia, setOpenEtnia] = useState(false);
  const [etniaItems, setEtniaItems] = useState([
    { label: "Preto", value: "preto" },
    { label: "Pardo", value: "pardo" },
    { label: "Branco", value: "branco" },
    { label: "Indígena", value: "indigena" },
    { label: "Amarelo", value: "amarelo" },
  ]);

  const [openCurso, setOpenCurso] = useState(false);
  const [cursoItems, setCursoItems] = useState([
    { label: "1º Informática", value: "1info" },
    { label: "2º Informática", value: "2info" },
    { label: "3º Informática", value: "3info" },
    { label: "1º Mecânica", value: "1mec" },
    { label: "2º Mecânica", value: "2mec" },
    { label: "3º Mecânica", value: "3mec" },
    { label: "1º Eletroeletrônica", value: "1ele" },
    { label: "2º Eletroeletrônica", value: "2ele" },
    { label: "3º Eletroeletrônica", value: "3ele" },
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const storageUser = async (data: FormDataProps) => {
    try {
      setIsLoading(true);
      createUser(data);

      navigate("heartScreen");
    } catch (error) {
      console.log("Deu erro! >>>", error);
    } finally {
      setIsLoading(false);
    }
  };

  const { user } = useAuth();

  return (
    <View style={styles.container}>
      {user.nome ? (
        <>
          <Text style={styles.title}>Cadastro</Text>

          <Controller
            control={control}
            name="nome"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Nome:"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.nome?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="dataNascimento"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Data de Nascimento:"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="etnia"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Etnia:</Text>
                <DropDownPicker
                  open={openEtnia}
                  value={value}
                  items={etniaItems}
                  setOpen={setOpenEtnia}
                  setValue={onChange}
                  setItems={setEtniaItems}
                  placeholder="Selecione sua etnia"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="curso"
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputContainer}>
                <Text style={styles.label}>Curso:</Text>
                <DropDownPicker
                  open={openCurso}
                  value={value}
                  items={cursoItems}
                  setOpen={setOpenCurso}
                  setValue={onChange}
                  setItems={setCursoItems}
                  placeholder="Selecione seu curso"
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdownContainer}
                />
              </View>
            )}
          />

          <Controller
            control={control}
            name="cidade"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Cidade:"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.cidade?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Email:"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="contatoEmergencia"
            render={({ field: { onChange, value } }) => (
              <Input
                label="Contato de Emergência:"
                value={value}
                onChangeText={onChange}
                errorMessage={errors.contatoEmergencia?.message}
              />
            )}
          />

          <Button
            title="Cadastrar"
            onPress={handleSubmit(storageUser)}
            isLoading={isLoading}
          />
        </>
      ) : (
        <HeartRateAlert />
      )}
    </View>
  );
};

export default CadastroScreen;
