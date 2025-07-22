import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const Layout = () => {
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
                fontFamily: 'Arial, sans-serif',
                backgroundColor: '#f5f5f5ff',
                color: '#333',
            }}
        >
            <Navbar />

            <main>
                <Outlet />
            </main>

            <footer
                style={{
                    textAlign: 'center',
                    padding: '1.5rem',
                    background: '#282c34',
                    borderTop: '1px solid #ccc',
                    fontSize: '0.9rem',
                    color: '#fff',
                    marginTop: '-1px',
                }}
            >
                <p>© DevSneha — All rights reserved</p>
            </footer>
        </div>
    );
};

export default Layout;