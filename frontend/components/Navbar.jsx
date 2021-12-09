import Container from '@mui/material/Container';
import Link from 'next/link';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
// import styles from '../styles/Home.module.css';

const Navbar = props => {

    // console.log(props.currentStep)

    return (
        <Container sx={{ padding: "5px !important" }} color="primary">
            <nav style={{ margin: "0 !important", padding: "0" }}>
                <div className="logo" style={{ padding: "0", background: "" }}>
                    <Link href="/">
                        <a style={{ margin: "initial" }}>
                            <Image src="/radian_logo.png" alt="site logo" width={214} height={66} />
                            {/* <Image src="/reportImg.png" alt="site logo" width={291} height={173} /> */}
                        </a>
                    </Link>
                </div>
                <h1 style={{}} className={styles.title}><b><i>Radian iReport</i></b></h1>
                {/* <Link href="/"><a>Home</a></Link>
                <Link href="/about"><a>About</a></Link>
                <Link href="/ninjas/"><a>Report Listing</a></Link> */}
            </nav>
        </Container>
    )
}

export default Navbar;