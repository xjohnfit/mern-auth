import { Navigate, Outlet } from 'react-router';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {

    const { userInfo } = useSelector((state: any) => state.auth);

    if (!userInfo) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}
export default PrivateRoute