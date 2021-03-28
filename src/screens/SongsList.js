import React, { memo, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BASE_URL } from "../constant/Constant";
import Loading from "../customcomponent/Loading";

function SongsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const navigation = useNavigation();

  /**
   * Description:This function will fetch songs list data from server
   */
  const fetchSongsList = async () => {
    try {
      let response = await fetch(`${BASE_URL}search?term=Michael+jackson`);
      let json = await response.json();
      setIsLoading(false);
      setData(json.results);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  /**
   * Description:This function will call when user pull down list from top
   */
  const refreshdata = () => {
    setIsLoading(true);
    fetchSongsList();
  };

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      fetchSongsList();
      return () => {};
    }, [])
  );

  /**
   * Description:This function is used for open song detail screen and pass selected songs data from this screen to next targeting screen
   * @param {*} item
   */
  const redirectToSongDetailScreen = (item) => {
    navigation.navigate("songsdetails", { selectsong: item });
  };

  return (
    <View style={style.root}>
      {isLoading ? (
        <View style={style.loadingview}>
          <Loading loading={isLoading} />
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.collectionId}
          refreshing={isLoading}
          onRefresh={() => {
            refreshdata();
          }}
          contentContainerStyle={{ padding: 15 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  redirectToSongDetailScreen(item);
                }}
              >
                <View style={style.container}>
                  <Image
                    style={style.imageContainer}
                    source={{
                      uri: item.artworkUrl60,
                    }}
                  />
                  <View style={style.content}>
                    <View>
                      <Text style={style.title}>{item.collectionName}</Text>
                      <View style={style.subcontainer}>
                        <Text style={style.subtitle}>{item.artistName}</Text>
                        <Text style={style.subtitle2}>
                          {Math.floor(item.trackTimeMillis / 60000)}m
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

export default memo(SongsList);

const style = StyleSheet.create({
  root: {
    flex: 1,
  },
  loadingview: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "white",
    padding: 15,
    marginBottom: 10,
    borderRadius: 16,
  },
  imageContainer: {
    height: 100,
    width: 100,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    marginLeft: 20,
    flex: 1,
  },
  title: {
    color: "#1E90FF",
    fontWeight: "normal",
    alignItems: "center",
    fontSize: 14,
  },
  subtitle: {
    color: "#1E90FF",
    fontWeight: "bold",
    marginTop: 10,
    fontSize: 12,
  },
  subcontainer: {
    flexDirection: "row",
  },
  subtitle2: {
    color: "#1E90FF",
    fontWeight: "bold",
    marginTop: 10,
    marginLeft: 20,
    fontSize: 12,
  },
});
