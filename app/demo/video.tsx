import { Button, Card } from "heroui-native";
import { useIsFocused } from "@react-navigation/native";
import { useVideoPlayer, VideoView, type VideoPlayerStatus } from "expo-video";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, Text, View } from "react-native";

import { Screen } from "@/components/Screen";

const localVideo = require("@/assets/videos/sample.mp4");

export default function VideoDemoScreen() {
  const isFocused = useIsFocused();
  const [isPlaying, setIsPlaying] = useState(false);
  const [status, setStatus] = useState<VideoPlayerStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const player = useVideoPlayer(localVideo, (instance) => {
    instance.loop = true;
  });

  useEffect(() => {
    const playingSub = player.addListener("playingChange", ({ isPlaying: playing }) => {
      setIsPlaying(playing);
    });

    const statusSub = player.addListener("statusChange", ({ status: nextStatus, error }) => {
      setStatus(nextStatus);
      setErrorMessage(error?.message ?? null);

      if (nextStatus === "readyToPlay" && isFocused && !player.playing) {
        player.play();
      }
    });

    return () => {
      playingSub.remove();
      statusSub.remove();
    };
  }, [player, isFocused]);

  useEffect(() => {
    if (!isFocused && player.playing) {
      player.pause();
    }
  }, [isFocused, player]);

  function togglePlayback() {
    if (player.playing) {
      player.pause();
    } else {
      player.play();
    }
  }

  const isLoading = status === "loading" || status === "idle";

  return (
    <Screen
      title="Vídeo"
      subtitle="Reprodução com expo-video: vídeo local no app e controles play/pause."
    >
      <Card>
        <Card.Header>
          <Card.Title>Player</Card.Title>
          <Card.Description>
            Arquivo em assets/videos — funciona offline. Controles nativos na área do vídeo.
          </Card.Description>
        </Card.Header>
        <Card.Body className="gap-3">
          <View style={styles.videoWrapper}>
            <VideoView
              player={player}
              style={styles.video}
              contentFit="cover"
              nativeControls
              allowsFullscreen
              surfaceType={Platform.OS === "android" ? "textureView" : "surfaceView"}
            />
            {isLoading && !errorMessage ? (
              <View style={styles.overlay}>
                <ActivityIndicator color="#fff" size="large" />
                <Text style={styles.overlayText}>Carregando vídeo…</Text>
              </View>
            ) : null}
          </View>

          {errorMessage ? (
            <Text className="text-sm text-red-600">{errorMessage}</Text>
          ) : null}

          <View className="flex-row gap-2">
            <Button className="flex-1" onPress={togglePlayback} isDisabled={!!errorMessage}>
              {isPlaying ? "Pausar" : "Reproduzir"}
            </Button>
            <Button
              className="flex-1"
              variant="secondary"
              onPress={() => {
                player.currentTime = 0;
                player.play();
              }}
              isDisabled={!!errorMessage}
            >
              Reiniciar
            </Button>
          </View>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>
          <Card.Title>Conceitos</Card.Title>
        </Card.Header>
        <Card.Body className="gap-2">
          <Text className="text-sm leading-5 text-muted">
            <Text className="font-semibold text-foreground">require(): </Text>
            embute o MP4 no bundle — mais confiável que URL remota no celular.
          </Text>
          <Text className="text-sm leading-5 text-muted">
            <Text className="font-semibold text-foreground">contentFit: </Text>
            use cover para preencher o container (contain deixa faixas pretas).
          </Text>
          <Text className="text-sm leading-5 text-muted">
            Status: {status}
            {isPlaying ? " · reproduzindo" : ""}
          </Text>
        </Card.Body>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  videoWrapper: {
    width: "100%",
    aspectRatio: 16 / 9,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  video: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    gap: 8,
  },
  overlayText: {
    color: "#fff",
    fontSize: 14,
  },
});
