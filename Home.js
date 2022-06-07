import React, { useState } from "react";
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
import { AntDesign } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export default function Home() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=a77940b7";
  const [title, setTitle] = useState("");

  const navigation = useNavigation();

  const showToast = () => {
    ToastAndroid.show("Data is incorrect!", ToastAndroid.SHORT);
  };

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {},
  });

  const search = () => {
    axios(apiurl + "&s=" + state.s).then(({ data }) => {
      let results = data.Search;
      if (results === undefined) {
        showToast();
      } else {
        setState((prevState) => {
          return { ...prevState, results: results };
        });
      }
    });
  };

  const openPopup = (title) => {
    axios(apiurl + "&t=" + title).then(({ data }) => {
      let result = data;
      setTitle(result.Title);
      setState((prevState) => {
        return { ...prevState, selected: result };
      });
    });
  };

  const AddToFav = (e) => {
    e.preventDefault();
    db.collection("Movies").add({
      title: title,
    });
    setTitle("");
  };

  const toFavourite = () => {
    navigation.navigate("Favourites");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ marginLeft: "auto", marginRight: 0 }}
        onPress={toFavourite}
      >
        <AntDesign name="hearto" size={32} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>Movies</Text>
      <TextInput
        placeholder="Enter text..."
        style={styles.search}
        value={state.s}
        onChangeText={(text) =>
          setState((prevState) => {
            return { ...prevState, s: text };
          })
        }
        onSubmitEditing={search}
      />
      <ScrollView style={styles.results}>
        {state.results.map((result) => (
          <TouchableHighlight
            key={result.imdbID}
            onPress={() => openPopup(result.Title)}
          >
            <View style={styles.result}>
              <Image
                source={{ uri: result.Poster }}
                style={{ width: "100%", height: 450 }}
              />
              <Text style={styles.heading}>{result.Title}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
      <Modal
        collapsable={true}
        animationType="fade"
        transparent={false}
        visible={typeof state.selected.Title != "undefined"}
      >
        <View style={styles.container}>
          <StarRating
            disabled={false}
            emptyStar={"ios-star-outline"}
            fullStar={"ios-star"}
            halfStar={"ios-star-half"}
            iconSet={"Ionicons"}
            maxStars={5}
            rating={state.selected.imdbRating / 2}
            fullStarColor={"yellow"}
          />
          <Text style={styles.modalTitle}>{state.selected.Title}</Text>
          <Text style={styles.year}>{state.selected.Year}</Text>
          <Image
            source={{ uri: state.selected.Poster }}
            style={{
              width: "65%",
              height: 300,
              marginTop: 10,
              marginBottom: 20,
            }}
          />
          <Button title="Add to favourite" onPress={AddToFav} />
          <Text style={styles.plot}>Plot: {state.selected.Plot}</Text>
          <Text style={styles.actors}>Actors: {state.selected.Actors}</Text>
          <Button
            title="Close"
            onPress={() =>
              setState((prevState) => {
                return { ...prevState, selected: {} };
              })
            }
          />
        </View>
      </Modal>
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
