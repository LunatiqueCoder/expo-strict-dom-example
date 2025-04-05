import { useLocalSearchParams } from 'expo-router';
import { Text } from 'react-native';
import { html } from 'react-strict-dom';

export default function ResetPassword() {
  const { institution } = useLocalSearchParams();

  return <html.span>ResetPassword</html.span>;
}
