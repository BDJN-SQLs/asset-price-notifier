import React from "react";
import { Button, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from '../types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

const StockInfo = () => {
  const [selected, setSelected] = React.useState("");
  const navigation = useNavigation<any>();

  return (
    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
      <Button title="Go back to FIND STONKS" onPress={() => ("FIND STONKS")} />
    </View>
  );
};

export default StockInfo;
