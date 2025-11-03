import { useState } from 'react';
import { Link } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

interface LoginScreenProps {
    email: string;
    password: string;
}

const LoginScreen = () => {
    const [loginData, setLoginData] = useState<LoginScreenProps>({
        email: '',
        password: '',
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(loginData);
    };

    return (
        <FormContainer>
            <h1 className='text-center'>Sign In</h1>
            <Form
                onSubmit={submitHandler}
                className='d-flex flex-column'>
                <Form.Group
                    controlId='email'
                    className='p-2'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={loginData.email}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                email: e.target.value,
                            })
                        }
                    />
                </Form.Group>

                <Form.Group
                    controlId='password'
                    className='p-2'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={loginData.password}
                        onChange={(e) =>
                            setLoginData({
                                ...loginData,
                                password: e.target.value,
                            })
                        }
                    />
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    className='m-2'>
                    Sign In
                </Button>

                <Row className='py-3 text-center'>
                    <Col>
                        New Customer? <Link to='/register'>Register</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};
export default LoginScreen;
