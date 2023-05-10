import { useState } from "react";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import { Input } from "../../components/ui/input";
import { PrimaryButton } from "../../components/ui/button";
import { UNSPLASH_ACCESS_KEY } from "@env";

type UnsplashImage = {
  id: string;
  urls: {
    small: string;
  };
  description: string;
};

export default function AddUnsplashImage() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<string[]>([]);

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
          onPress={() => handleImageSearch()}
        />
      </View>

      <FlatList
        data={results}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: any) => (
          <Image
            key={item.id}
            source={{ uri: item.urls.small }}
            alt={item.description}
            style={{ width: "49%", height: 200, borderRadius: 10, margin: 2 }}
          />
        )}
        style={{
          marginTop: 16,
          width: "100%",
        }}
      />
    </View>
  );
}
