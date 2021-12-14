import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import styles from '../styles/Home.module.css';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

const Home = () => {

  return (
    <>
      <Head>
        <title>Radian iReport | Home</title>
        <meta name="keywords" content="ninjas" />
      </Head>

      <Container style={{ margin: "0", padding: "0" }}>
        <h1 style={{ color: "#333", textAlign: "center", paddingTop: "0" }} className={styles.title}><b><i>Radian iReport</i></b></h1>

        <Box sx={{ width: "100%", display: 'grid', alignItems: "center", alignContent: "center", justifyContent: "center", textAlign: "center" }}>

          <p className={styles.text}>A self-service reporting tool for Radian servicing information.</p>

          <br />

          <Box sx={{ display: 'grid', alignItems: "center", alignContent: "center", justifyContent: "center", textAlign: "center" }}>
            <Link href="/reportBuilder">
              <Button variant="contained" color="neutral" name="append" sx={{ display: "flex", maxWidth: "250px" }}>
                Start building a report
              </Button>
            </Link>
          </Box>
          
        </Box>

      </Container>
    </>
  )
}


export default Home;