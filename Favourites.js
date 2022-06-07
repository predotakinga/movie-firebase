import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  TouchableHighlight,
  Modal,
  Button,
  ToastAndroid,
} from "react-native";
import StarRating from "react-native-star-rating";
import axios from "axios";
import { db } from "./firebase";
import firebase from "firebase";

export default function Favourites({ navigation: goBack }) {
  const [moviesList, setMoviesList] = useState([]);

  const getMovies = async () => {
    const response = db.collection("Movies");
    const data = await response.get();
    data.docs.forEach((item) => {
      setMoviesList([...moviesList, item.data().title]);
    });
  };

  //   //Call when component is rendered
  useEffect(() => {
    getMovies();
    moviesList.map((e) => console.log(e));
  });
  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener("focus", () => {
  //       getMovies();
  //     });
  //     return unsubscribe;
  //   }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Favourites</Text>
      {moviesList.map((movie, id) => {
        <Text key={id}>{movie.title}</Text>;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#223343",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
  },
  search: {
    fontSize: 20,
    padding: 20,
    fontWeight: "300",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 40,
  },
  results: {
    flex: 1,
  },
  result: {
    flex: 1,
    width: "100%",
    marginBottom: 20,
  },
  heading: {
    color: "#fff",
    backgroundColor: "#445565",
    fontSize: 18,
    fontWeight: "700",
    padding: 20,
  },
  modal: {
    backgroundColor: "#223343",
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  year: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "200",
    textAlign: "center",
    marginTop: -20,
  },
  plot: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "200",
    textAlign: "center",
    marginTop: 20,
  },
  actors: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "400",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 50,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
});
