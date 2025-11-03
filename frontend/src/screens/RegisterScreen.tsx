import { useState } from 'react';
import { Link } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';

interface RegisterScreenProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const RegisterScreen = () => {
    const [registerData, setRegisterData] = useState<RegisterScreenProps>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(registerData);
    };

    return (
        <FormContainer>
            <h1 className='text-center'>Sign In</h1>
            <Form
                onSubmit={submitHandler}
                className='d-flex flex-column'>
                    <Form.Group
                    controlId='name'
                    className='p-2'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter name'
                        value={registerData.name}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                name: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                <Form.Group
                    controlId='email'
                    className='p-2'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={registerData.email}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
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
                        value={registerData.password}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                password: e.target.value,
                            })
                        }
                    />
                </Form.Group>
                <Form.Group
                    controlId='confirmPassword'
                    className='p-2'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={registerData.confirmPassword}
                        onChange={(e) =>
                            setRegisterData({
                                ...registerData,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </Form.Group>

                <Button
                    type='submit'
                    variant='primary'
                    className='m-2'>
                    Sign Up
                </Button>

                <Row className='py-3 text-center'>
                    <Col>
                        Already have an account? <Link to='/login'>Login</Link>
                    </Col>
                </Row>
            </Form>
        </FormContainer>
    );
};
export default RegisterScreen;
