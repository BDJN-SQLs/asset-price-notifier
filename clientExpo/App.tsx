import { StyleSheet, Text, View } from "react-native";
import Dropdown from "./components/dropDown";
import StockInfo from "./components/stockInfo";
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './navigation';
import fonts from './config/fonts';
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
  // const promise = async () => {
  //   try {
  //     const response = await fetch('http://localhost:8080/tickers/userTickers', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ userId : 6 })
  //     })
  //     const data = await response.json()
  //     console.log(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }
  // promise();
  const [fontsLoaded] = useFonts(fonts);

  return !fontsLoaded ? null : (
    <SafeAreaProvider>
      <Navigation />
      <StatusBar />
    </SafeAreaProvider>
  );
  // const Root = () => {
  //   return (
  //     <Navigator>
  //       <Screen name={"Login"} component={LoginScreen} />
  //       <Screen name={"Register"} component={RegisterScreen} />
  //       {/* <Screen name={"FIND STONKS"} component={Dropdown} />
  //       <Screen name={"r/wallstreetbets"} component={StockInfo} /> */}
  //     </Navigator>
  //   );
  // };
  // return (
  //   <SafeAreaProvider>
  //     <NavigationContainer>
  //       <Root />
  //     </NavigationContainer>
  //   </SafeAreaProvider>

  // );
}


