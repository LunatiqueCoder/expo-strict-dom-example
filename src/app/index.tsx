import { html, css } from 'react-strict-dom';

export default function Home() {
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
  button: {
    backgroundColor: {
      default: 'white',
      ':hover': 'lightgray',
      ':active': 'blue',
    },
    padding: 10,
  },
});
