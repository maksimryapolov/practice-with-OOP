import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header/Header";
import CardsContainer from "./Components/Cards/CardsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import NotFound from "./Components/NotFound/404";
import AuthContainer from "./Components/User/Auth/AuthContainer";
import { connect } from "react-redux";
import Loader from "./Components/Loader/Loader";
import { setInitialData } from "./redux/redusers/appReducer";
import RegisterContainer from "./Components/User/Register/RegisterContainer";

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
                <Route path="/register" element={<RegisterContainer />} />
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
