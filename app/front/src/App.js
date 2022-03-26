import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import CardsContainer from "./Components/Cards/CardsContainer";
import Register from "./Components/User/Register";
import UsersContainer from "./Components/Users/UsersContainer";
import NotFound from "./Components/NotFound/404";
import AuthContainer from "./Components/User/AuthContainer";
import { connect } from "react-redux";
import Loader from "./Components/Loader/Loader";
import { setInitialData } from "./redux/redusers/appReducer";

function App({ loading, setInitialData }) {
    useEffect(() => {
        setInitialData();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="container">
            <Header />
            <Routes>
                <Route path="/" element={<CardsContainer />} />
                <Route path="/users" element={<UsersContainer />} />
                <Route path="/auth" element={<AuthContainer />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        loading: state.app.loading
    };
};

export default connect(mapStateToProps, { setInitialData })(App);
