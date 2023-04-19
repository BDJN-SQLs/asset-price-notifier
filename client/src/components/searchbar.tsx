import React, { useState } from "react";
import { SearchBar } from "@rneui/themed";
import { View, Text, StyleSheet } from "react-native";

type SearchBarProps = {};

const SearchBarComponent: React.FunctionComponent<SearchBarProps> = () => {
  const [search, setSearch] = useState("");

  const updateSearch = (search) => {
    setSearch(search);
  };

  return (
    <View style={styles.view}>
      <SearchBar placeholder="Find Stonks...↗" onChangeText={updateSearch} value={search} />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    margin: 10,
  },
});

export default SearchBarComponent;
