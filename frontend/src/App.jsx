import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import About from './pages/About';
import Rakhi from './pages/Rakhi';
import Vastra from './pages/Vastra';
import AddProduct from './pages/AddProduct';
import { useDispatch } from 'react-redux';
import { loginSuccess, logout } from './features/auth/authSlice';
import axios from './api/axios';
import HashLoader from 'react-spinners/HashLoader';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './pages/404';
import Contact from './pages/Contact';

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const res = await axios.get('/me', { withCredentials: true });
                if (res.data?.user) {
                    dispatch(
                        loginSuccess({
                            user: res.data.user,
                            token: null
                        })
                    );
                }
            } catch (err) {
                dispatch(logout());
            } finally {
                setTimeout(() => setLoading(false), 2000);
            }
        };

        checkAuth();
    }, [dispatch]);

    const loaderColor = "#123abc";
    const override = {
        display: "block",
        margin: "20% auto",
        borderColor: "red",
    };

    if (loading) {
        return (
            <div className="w-full h-screen flex items-center justify-center bg-white">
                <HashLoader
                    color={loaderColor}
                    loading={loading}
                    cssOverride={override}
                    size={120}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                />
            </div>
        );
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="signin" element={<Signin />} />
                    <Route path="signup" element={<Signup />} />
                    <Route path="about" element={<About />} />

                    {/* Protected routes */}
                    <Route
                        path="rakhi"
                        element={
                            <ProtectedRoute>
                                <Rakhi />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="vastra"
                        element={
                            <ProtectedRoute>
                                <Vastra />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="add-product"
                        element={
                            <ProtectedRoute requireAdmin={true}>
                                <AddProduct />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="contact"
                        element={
                                <Contact />
                        }
                    />
                    <Route path="*" element={<NotFound />} />

                </Route>
            </Routes>
        </Router>
    );
};

export default App;
