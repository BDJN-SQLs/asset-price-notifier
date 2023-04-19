import React from "react";
import { View, Text } from "react-native";
import { SelectList, MultipleSelectList } from "react-native-dropdown-select-list";

const App = () => {
  const [selected, setSelected] = React.useState("");

  const data = [
    { key: "AMZN", value: "Amazon.com, Inc." },
    { key: "AMD", value: "Advanced Micro Devices, Inc." },
    { key: "AMC", value: "Tesla, Inc." },
    { key: "TSLA", value: "England" },
    { key: "META", value: "Meta Platforms, Inc." },
    { key: "CS", value: "Codesmith.io" },
  ];

  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
      <SelectList setSelected={setSelected} data={data} />

      <MultipleSelectList
        setSelected={(val) => setCategories(val)}
        data={data}
        save="value"
        label="Categories"
        boxStyles={{ marginTop: 25 }}
      />

      <View style={{ marginTop: 50 }}>
        <Text>Selected Value : </Text>
        <Text style={{ marginTop: 10, color: "gray" }}>{selected}</Text>
      </View>

      <View style={{ marginTop: 50 }}>
        <Text>Selected Categories : </Text>
        {categories.map((item) => {
          return (
            <Text key={item} style={{ marginTop: 10, color: "gray" }}>
              {item}
            </Text>
          );
        })}
      </View>
    </View>
  );
};

export default App;
