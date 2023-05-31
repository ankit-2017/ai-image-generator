import React from 'react';
import '../styles/main.scss';

function MyApp({ Component, pageProps }: any) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Component {...pageProps} />;
}

export default MyApp