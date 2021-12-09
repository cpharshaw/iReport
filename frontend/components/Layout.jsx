import Container from '@mui/material/Container';
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="content">
            <Navbar />
            <br />
            <Container>
                {children}
            </Container>
            <Footer />
        </div>
    )
}

export default Layout;