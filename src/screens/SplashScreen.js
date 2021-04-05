import React, { useEffect } from "react";
import { View, Text, ImageBackground, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';
function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("songslist");
    }, 1000); 
    return () => {
      
    }
  }, []);
  
  return (
    <ImageBackground
      style={style.imagecontainer}
      source={require("../../assets/AdobeStock_100000042-e1563305717660-686x371.jpeg")}
    >
      <View style={style.childview}>
        <Text style={style.text}>Welcome to Akash tyagi</Text>
      </View>
      <View style={{justifyContent:'flex-end',alignItems:'flex-end',marginRight:30,marginBottom:30}}>
      <AntDesign name="rightcircle" size={30} color="black" onPress={()=>{navigation.navigate("songslist")}}/>
      </View>
    </ImageBackground>
  );
}

export default SplashScreen;

const style = StyleSheet.create({
  imagecontainer: {
    height: "100%",
    width: "100%",
    flex: 1,
  },
  childview: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  text: {
    fontFamily: "bold",
    fontSize: 30,
    color: "#fff",
  },
});
