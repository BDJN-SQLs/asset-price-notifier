import React from "react";
import { View, Text } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useNavigation } from "@react-navigation/native";
import { test } from "./test";

const Dropdown = () => {
  const [selected, setSelected] = React.useState("");
  // const [data, setData] = React.useState([]);

  const data = test.map((item => {
    return {key: item['Security Name'], value: item.Symbol}
  }))

  // const getData = () => { 
  //   //Get Values from database
  //   fetch('symbols_valid_meta.json'
  //   ,{
  //     headers : {
  //       'Content-Type': 'application/json',
  //       'Accept' : 'application/json'
  //     }
  //   })
  //     .then((response) => (response.json())
  //     .then((resJson) => {
  //       // Store Values in Temporary Array
  //       let newArray = resJson.map((item) => {
  //         return {key: item['Security Name'], value: item.Symbol}
  //       })
  //       //Set Data Variable
  //       setData(newArray)
  //     })
  //     .catch((e) => {
  //       console.log(e)
  //     }))
  //   }
  //   React.useEffect(() => {
  //     getData()
  //   }, [])

  const navigation = useNavigation<any>();

  // const data = [
  //   { value: "AMZN", key: "Amazon.com, Inc." },
  //   { value: "AMD", key: "Advanced Micro Devices, Inc." },
  //   { value: "GME", key: "GameStop Corp." },
  //   { value: "TSLA", key: "Tesla, Inc." },
  //   { value: "META", key: "Meta Platforms, Inc." },
  //   { value: "CS", key: "Codesmith.io" },
  // ];

  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
      <SelectList
        setSelected={setSelected}
        
        onSelect={() => navigation.navigate("wallstreetbets")}
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
