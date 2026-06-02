import { Button, Card } from "heroui-native";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Image, Text, View } from "react-native";

import { Screen } from "@/components/Screen";

const pickerOptions: ImagePicker.ImagePickerOptions = {
  mediaTypes: ["images"],
  allowsEditing: true,
  aspect: [4, 3],
  quality: 0.8,
};

export default function CameraDemoScreen() {
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  function applyResult(result: ImagePicker.ImagePickerResult) {
    if (!result.canceled) {
      setPhotoUri(result.assets[0].uri);
    }
  }

  async function pickFromLibrary() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à galeria para escolher uma foto neste demo."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync(pickerOptions);
    applyResult(result);
  }

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        "Permissão necessária",
        "Precisamos de acesso à câmera para tirar fotos neste demo."
      );
      return;
    }

    try {
      const result = await ImagePicker.launchCameraAsync(pickerOptions);
      applyResult(result);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      Alert.alert(
        "Câmera indisponível",
        message.includes("simulator")
          ? "O simulador iOS não tem câmera. Use um dispositivo físico ou escolha da galeria."
          : "Não foi possível abrir a câmera. Tente escolher uma foto da galeria.",
        [
          { text: "Cancelar", style: "cancel" },
          { text: "Galeria", onPress: pickFromLibrary },
        ]
      );
    }
  }

  return (
    <Screen
      title="Câmera"
      subtitle="Abra a câmera nativa, capture uma foto e veja o preview abaixo usando o componente Image."
    >
      <Card>
        <Card.Header>
          <Card.Title>Capturar foto</Card.Title>
          <Card.Description>
            A URI da imagem fica no estado (useState) e alimenta o preview.
          </Card.Description>
        </Card.Header>
        <Card.Body className="gap-3">
          <Button onPress={takePhoto}>Tirar foto</Button>
          <Button variant="secondary" onPress={pickFromLibrary}>
            Escolher da galeria
          </Button>
          {photoUri ? (
            <Button variant="secondary" onPress={() => setPhotoUri(null)}>
              Limpar foto
            </Button>
          ) : null}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Preview</Card.Title>
        </Card.Header>
        <Card.Body>
          {photoUri ? (
            <View className="overflow-hidden rounded-xl">
              <Image
                source={{ uri: photoUri }}
                className="h-60 w-full"
                resizeMode="cover"
                accessibilityLabel="Foto capturada"
              />
            </View>
          ) : (
            <Text className="text-center text-muted">Nenhuma foto ainda</Text>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Dica</Card.Title>
        </Card.Header>
        <Card.Body>
          <Text className="text-sm leading-5 text-muted">
            No simulador iOS a câmera não funciona — use a galeria ou um
            dispositivo físico. No Android e iPhone reais, “Tirar foto” abre a
            câmera nativa.
          </Text>
        </Card.Body>
      </Card>
    </Screen>
  );
}
