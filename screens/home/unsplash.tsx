import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  TouchableOpacity,
  View,
} from "react-native";
import { Input } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { UNSPLASH_ACCESS_KEY } from "@env";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export default function AddUnsplashImage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [unsplashImage, setUnsplashImage] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const { navigate }: any = useNavigation();

  useEffect(() => {
    unsplashImage && navigate("add-event", { unsplashImage });
  }, [unsplashImage]);

  async function handleImageSearch() {
    setLoading(true);
    const data = await fetch(
      `https://api.unsplash.com/search/photos?page=1&query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    const json = await data.json();
    const results = json.results;
    setResults(results);
    setLoading(false);
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 16 }}>
      <View style={{ gap: 8 }}>
        <Input
          placeholder="search for an image"
          onChangeText={(e) => setQuery(e)}
          value={query}
        />
        <PrimaryButton
          title={loading ? <ActivityIndicator color={"#fff"} /> : "search"}
          onPress={handleImageSearch}
        />
      </View>

      <FlatList
        data={results}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => (
          <TouchableOpacity
            style={{
              width: "49%",
              aspectRatio: 1,
              margin: 2,
            }}
            onPress={() => setUnsplashImage(item.urls.small)}
          >
            <Image
              key={item.id}
              source={{ uri: item.urls.small }}
              alt={item.description}
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 8,
              }}
            />
          </TouchableOpacity>
        )}
        style={{
          marginTop: 16,
          width: "100%",
        }}
      />
    </View>
  );
}
