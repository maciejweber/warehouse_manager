import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from '../../actions/auth';

const AdminRoute = ({ component: Component, ...rest }) => {
    const auth = useSelector(state => state.auth)
    const is_admin = useSelector(state => state.auth.user.is_superuser)
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(loadUser());
    }, [])
    return (
        <Route
            {...rest}
            render={(props)=>{
                if(auth.isLoading){
                    return <h1>Loading...</h1>;
                } else if (!isAuthenticated){
                    return <Redirect to="/login" />;
                } else if (!is_admin){
                    return <Redirect to="/" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    )
}

export default AdminRoute;
