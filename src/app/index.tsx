import { useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { html, css } from 'react-strict-dom';

export default function Home() {
  const { institution } = useLocalSearchParams();
  const insets = useSafeAreaInsets();
  return (
    <html.button
      onClick={() => {
        console.log('clicked');
      }}
      style={[styles.button]}
    >
      A cross-platform button
    </html.button>
  );
}

const styles = css.create({
  container: (height: number) => ({
    backgroundColor: 'red',
    transform: `translateY(${height}px)`,
  }),
  button: {
    backgroundColor: {
      default: 'white',
      ':hover': 'lightgray',
      ':active': 'blue',
    },
    padding: 10,
  },
});
