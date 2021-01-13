import '../styles/globals.css';

// Component 相当于每一个页面
function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
