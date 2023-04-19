// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

import React from "react";
import { View, Text } from "react-native";
import { SelectList, MultipleSelectList } from "react-native-dropdown-select-list";

const App = () => {
  const [selected, setSelected] = React.useState("");

  const data = [
    { value: "AMZN", key: "Amazon.com, Inc." },
    { value: "AMD", key: "Advanced Micro Devices, Inc." },
    { value: "AMC", key: "Tesla, Inc." },
    { value: "TSLA", key: "England" },
    { value: "META", key: "Meta Platforms, Inc." },
    { value: "CS", key: "Codesmith.io" },
  ];

  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
      <SelectList setSelected={setSelected} data={data} />

      <View style={{ marginTop: 50 }}>
        <Text>Selected Value : </Text>
        <Text style={{ marginTop: 10, color: "gray" }}>{selected}</Text>
      </View>
    </View>
  );
};

export default App;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
