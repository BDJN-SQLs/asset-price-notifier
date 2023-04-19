import { StyleSheet, Text, View } from "react-native";
import Dropdown from "./components/dropDown";
import StockInfo from "./components/stockInfo";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
const { Navigator, Screen } = createNativeStackNavigator();

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Dropdown />
//       <Text>Open up App.tsx to start working on your app!</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//   },
// });

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Root />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const Root = () => {
  return (
    <Navigator>
      <Screen name={"FIND STONKS"} component={Dropdown} />
      <Screen name={"r/wallstreetbets"} component={StockInfo} />
    </Navigator>
  );
};
