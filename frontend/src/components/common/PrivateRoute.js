import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';


const PrivateRoute = ({ component: Component, ...rest}) => {
    const auth = useSelector(state => state.auth)
    console.log(auth)
    return (
        <Route
            {...rest}
            render={(props)=>{
                if(auth.isLoading){
                    return <h1>Loading...</h1>;
                } else if (!auth.isAuthenticated){
                    return <Redirect to="/login" />;
                } else {
                    return <Component {...props} />;
                }
            }}
        />
    )
}

export default PrivateRoute;
