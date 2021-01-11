import '../styles/globals.css';

// Component 相当于每一个页面
function MyApp({ Component, pageProps }) {
  return (
    <>
      <p>这是一个最外层的内容</p>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
