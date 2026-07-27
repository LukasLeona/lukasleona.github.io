import './App.css';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Error404() {
  const navigate = useNavigate();

  const goToHomePage = () => {
    navigate('/'); // Replace '/' with the route of your main page
  };

  return (
    <Container className='m-5 text-center'>
      <h1 className='text-red Inter-extrab mb-0 pt-0' style={{fontSize:'13em'}}>404</h1>
      <h3 className='text-gray2 my-0 pt-0'>Page not found</h3>
      <p className='text-gray2'>Sorry, we could not find the page you are looking for.</p>
      <Button variant='primary' className='px-4 my-4' onClick={goToHomePage}>
        Back To Home
      </Button>
    </Container>
  );
}

export default Error404;
