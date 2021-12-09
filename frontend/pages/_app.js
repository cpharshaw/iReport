import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../src/theme'
import Layout from '../components/Layout';

import '../styles/globals.css';

// https://www.netlify.com/blog/2020/12/01/using-react-context-for-state-management-in-next.js/


const MyApp = props => {
  // const theme = useTheme();

  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) jssStyles.parentElement.removeChild(jssStyles);

  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;