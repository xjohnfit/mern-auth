import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import FormContainer from '../components/FormContainer';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useUpdateProfileMutation } from '../slices/usersApiSlice';

interface RegisterScreenProps {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const ProfileScreen = () => {
    const [profileData, setProfileData] = useState<RegisterScreenProps>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { userInfo } = useSelector((state: any) => state.auth);

    const [updateProfile, { isLoading }] = useUpdateProfileMutation();

    useEffect(() => {
        if (userInfo) {
            setProfileData({
                name: userInfo.name,
                email: userInfo.email,
                password: '',
                confirmPassword: '',
            });
        }
    }, [userInfo]);

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (profileData.password !== profileData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }
        try {
          const res = await updateProfile({
            _id: userInfo._id,
            name: profileData.name,
            email: profileData.email,
            password: profileData.password,
          }).unwrap();
          dispatch(setCredentials({ ...res }));
          toast.success('Profile Updated Successfully');
        } catch (err: string | any) {
          toast.error(err?.data?.message || err?.error);
        }
    };

    return (
        <FormContainer>
            <h1 className='text-center'>Update Profile</h1>
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
                        value={profileData.name}
                        onChange={(e) =>
                            setProfileData({
                                ...profileData,
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
                        value={profileData.email}
                        onChange={(e) =>
                            setProfileData({
                                ...profileData,
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
                        value={profileData.password}
                        onChange={(e) =>
                            setProfileData({
                                ...profileData,
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
                        placeholder='Confirm password'
                        value={profileData.confirmPassword}
                        onChange={(e) =>
                            setProfileData({
                                ...profileData,
                                confirmPassword: e.target.value,
                            })
                        }
                    />
                </Form.Group>

                {isLoading && <Loader />}

                <Button
                    type='submit'
                    variant='primary'
                    className='m-2'
                    >
                    Update Profile
                </Button>
            </Form>
        </FormContainer>
    );
};
export default ProfileScreen;
