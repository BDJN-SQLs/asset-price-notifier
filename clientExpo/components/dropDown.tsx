import React from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";

const Dropdown = () => {
  const [selected, setSelected] = React.useState("");
  const navigation = useNavigation<any>();

  const data = [
    { value: "AMZN", key: "Amazon.com, Inc." },
    { value: "AMD", key: "Advanced Micro Devices, Inc." },
    { value: "GME", key: "GameStop Corp." },
    { value: "TSLA", key: "Tesla, Inc." },
    { value: "META", key: "Meta Platforms, Inc." },
    { value: "CS", key: "Codesmith.io" },
  ];

  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
      <SelectList
        setSelected={setSelected}
        onSelect={() => navigation.navigate("r/wallstreetbets")}
        placeholder="STONKS"
        searchPlaceholder="FIND STONKS"
        notFoundText="NO STONKS :("
        data={data}
      />

      <View style={{ marginTop: 50 }}>
        <Text>Selected Value : </Text>
        <Text style={{ marginTop: 10, color: "gray" }}>{selected}</Text>
      </View>
    </View>
  );
};

export default Dropdown;
