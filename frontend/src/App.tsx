import { Outlet } from "react-router";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Container>
        <Outlet />
      </Container>
    </>
    
  )
}
export default App