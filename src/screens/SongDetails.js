import React, { memo, useEffect, useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { useRoute } from "@react-navigation/native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { Audio } from "expo-av";

function SongsDetails() {
  const route = useRoute();
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackInstance, setPlaybackInstance] = useState(null);
  const [volume, setVolume] = useState(1.0);
  const [isBuffering, setIsBuffering] = useState(false);

  useEffect(() => {
    if (route.params?.selectsong) {
      console.log("selectsong", route.params?.selectsong);
    }
  }, [route.params?.selectsong]);

  const handlePlayPause = async () => {
    isPlaying
      ? await playbackInstance.pauseAsync()
      : await playbackInstance.playAsync();

    setIsPlaying(!isPlaying);
  };

  const loadAudio = async () => {
    try {
      const playbackInstance = new Audio.Sound();
      const source = {
        uri: route.params?.selectsong.previewUrl,
      };

      const status = {
        shouldPlay: isPlaying,
        volume,
      };

      playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
      await playbackInstance.loadAsync(source, status, false);
      setPlaybackInstance(playbackInstance);
    } catch (e) {
      console.log(e);
    }
  };

  const onPlaybackStatusUpdate = (status) => {
    setIsBuffering(status.isBuffering);
  };
  useEffect(async () => {
    try {
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
        playsInSilentModeIOS: true,
        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
        shouldDuckAndroid: true,
        staysActiveInBackground: true,
        playThroughEarpieceAndroid: true,
      });

      loadAudio();
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <View style={style.root}>
      <View style={style.container}>
        <Image
          style={style.albumCover}
          source={{ uri: route.params?.selectsong.artworkUrl60 }}
        />
        <View style={style.controls}>
          <TouchableOpacity
            style={style.control}
            onPress={() => handlePlayPause()}
          >
            <AntDesign name="stepbackward" size={24} color="#444" />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.control}
            onPress={() => handlePlayPause()}
          >
            {isPlaying ? (
              <Ionicons name="ios-pause" size={24} color="#444" />
            ) : (
              <Ionicons name="ios-play-circle" size={24} color="#444" />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={style.control}
            onPress={() => handlePlayPause()}
          >
            <AntDesign name="stepforward" size={24} color="#444" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ flex: 3, padding: 10 }}>
        <View style={style.subcontainer}>
          <Text style={style.subtitle}>Artist Name:</Text>
          <Text style={style.subtitle2}>
            {route.params?.selectsong.artistName}
          </Text>
        </View>
        <View style={style.subcontainer}>
          <Text style={style.subtitle}>Description:</Text>
          <Text style={style.subtitle2}>
            {route.params?.selectsong.collectionName}
          </Text>
        </View>
        <View style={style.subcontainer}>
          <Text style={style.subtitle}>TrackTime Millis:</Text>
          <Text style={style.subtitle2}>
            {Math.floor(route.params?.selectsong.trackTimeMillis / 60000)}m
          </Text>
        </View>
        <View style={style.subcontainer}>
          <Text style={style.subtitle}>Track Number:</Text>
          <Text style={style.subtitle2}>
            {route.params?.selectsong.trackNumber}
          </Text>
        </View>
        <View style={style.subcontainer}>
          <Text style={style.subtitle}>Country:</Text>
          <Text style={style.subtitle2}>
            {route.params?.selectsong.country}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default memo(SongsDetails);

const style = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
  },
  imageContainer: {
    height: 150,
    width: "100%",
    flex: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  subtitle: {
    color: "#000",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 14,
  },
  subcontainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  subtitle2: {
    color: "grey",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20,
    fontSize: 12,
  },
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: 20,
    justifyContent: "center",
  },
  albumCover: {
    width: 150,
    height: 150,
  },
  controls: {
    flexDirection: "row",
  },
  control: {
    margin: 20,
  },
});
