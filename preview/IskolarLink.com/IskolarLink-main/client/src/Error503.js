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
      <h1 className='text-yellow Inter-extrab mb-0 pt-0' style={{fontSize:'13em'}}>404</h1>
      <h3 className='text-gray2 my-0 pt-0'>Service unavailable</h3>
      <p className='text-gray2'>We apologize for the inconvenience. Our team is working to resolve <br/>the issues as quickly as possible</p>
      <Button variant='primary' className='px-4 my-4' onClick={goToHomePage}>
        Back To Home
      </Button>
    </Container>
  );
}

export default Error404;
