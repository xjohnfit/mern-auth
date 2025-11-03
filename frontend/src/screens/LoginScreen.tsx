import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
interface LoginScreenProps {
    email: string;
    password: string;
}

const LoginScreen = () => {
    const [loginData, setLoginData] = useState<LoginScreenProps>({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login, { isLoading, error }] = useLoginMutation();

    const { userInfo } = useSelector((state: any) => state.auth);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await login({ ...loginData }).unwrap();
            dispatch(setCredentials({ ...res }));
            navigate('/');
        } catch (err: string | any) {
            toast.error(err?.data?.message || err?.error);
        }
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

                {isLoading && <Loader />}
                <Button
                    type='submit'
                    disabled={isLoading}
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
