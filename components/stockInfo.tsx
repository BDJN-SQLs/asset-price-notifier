import React from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

const StockInfo = () => {
  const [selected, setSelected] = React.useState("");
  const navigation = useNavigation<any>();

  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
      <Button title="Go back to FIND STONKS" onPress={() => navigation.navigate("FIND STONKS")} />
    </View>
  );
};

export default StockInfo;
