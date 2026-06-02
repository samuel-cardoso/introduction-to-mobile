import { Button, Card } from "heroui-native";
import { useIsFocused } from "@react-navigation/native";
import { CameraView, useCameraPermissions, type CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { Image, Text, View } from "react-native";

import { Screen } from "@/components/Screen";

export default function CameraViewDemoScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [cameraReady, setCameraReady] = useState(false);
  const isFocused = useIsFocused();
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    if (!isFocused) {
      setCameraReady(false);
    }
  }, [isFocused]);

  function toggleFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
    setCameraReady(false);
  }

  async function capturePhoto() {
    if (!cameraRef.current || !cameraReady || capturing) return;

    setCapturing(true);
    try {
      const photo = await cameraRef.current.takePictureAsync({ quality: 0.8 });
      if (photo?.uri) {
        setPhotoUri(photo.uri);
      }
    } finally {
      setCapturing(false);
    }
  }

  if (!permission) {
    return (
      <Screen title="expo-camera" subtitle="Carregando permissões…" scroll={false} />
    );
  }

  return (
    <Screen
      title="expo-camera"
      subtitle="Preview ao vivo dentro do app com CameraView — você controla a UI e captura com takePictureAsync."
    >
      <Card>
        <Card.Header>
          <Card.Title>Preview ao vivo</Card.Title>
          <Card.Description>
            Diferente do Image Picker, a câmera fica embutida na tela do app.
          </Card.Description>
        </Card.Header>
        <Card.Body className="gap-3">
          {!permission.granted ? (
            <>
              <Text className="text-sm text-muted">
                Precisamos de permissão para mostrar o preview da câmera.
              </Text>
              <Button onPress={requestPermission}>Conceder permissão</Button>
            </>
          ) : (
            <>
              <View className="h-72 overflow-hidden rounded-xl bg-black">
                {isFocused ? (
                  <CameraView
                    ref={cameraRef}
                    style={{ flex: 1 }}
                    facing={facing}
                    onCameraReady={() => setCameraReady(true)}
                  />
                ) : (
                  <View className="flex-1 items-center justify-center">
                    <Text className="text-white">Preview pausado</Text>
                  </View>
                )}
              </View>

              <View className="flex-row gap-2">
                <Button
                  className="flex-1"
                  variant="secondary"
                  onPress={toggleFacing}
                  isDisabled={!isFocused}
                >
                  Virar câmera
                </Button>
                <Button
                  className="flex-1"
                  onPress={capturePhoto}
                  isDisabled={!cameraReady || capturing}
                >
                  {capturing ? "Capturando…" : "Capturar"}
                </Button>
              </View>
            </>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Preview da captura</Card.Title>
        </Card.Header>
        <Card.Body>
          {photoUri ? (
            <View className="gap-3">
              <View className="overflow-hidden rounded-xl">
                <Image
                  source={{ uri: photoUri }}
                  className="h-60 w-full"
                  resizeMode="cover"
                  accessibilityLabel="Foto capturada com expo-camera"
                />
              </View>
              <Button variant="secondary" onPress={() => setPhotoUri(null)}>
                Limpar foto
              </Button>
            </View>
          ) : (
            <Text className="text-center text-muted">Nenhuma foto ainda</Text>
          )}
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Image Picker vs expo-camera</Card.Title>
        </Card.Header>
        <Card.Body className="gap-2">
          <Text className="text-sm leading-5 text-muted">
            <Text className="font-semibold text-foreground">Image Picker: </Text>
            abre a câmera nativa do sistema — pouco código, UI pronta.
          </Text>
          <Text className="text-sm leading-5 text-muted">
            <Text className="font-semibold text-foreground">expo-camera: </Text>
            preview dentro do app, botões customizados, troca frontal/traseira e
            mais controle (flash, zoom, barcode, etc.).
          </Text>
          <Text className="text-sm leading-5 text-muted">
            Só funciona em dispositivo físico (Android/iOS). No simulador iOS o
            preview não está disponível.
          </Text>
        </Card.Body>
      </Card>
    </Screen>
  );
}
