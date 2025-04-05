import { useLocalSearchParams } from "expo-router";
import { html } from "react-strict-dom";
import { Text } from "react-native";

export default function Login() {
  const { institution } = useLocalSearchParams();

  return (
    <html.div>
      <Text>{institution}</Text>
    </html.div>
  );
}
