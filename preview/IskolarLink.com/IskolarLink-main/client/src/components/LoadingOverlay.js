import React from 'react';
import { Spinner } from 'react-bootstrap';

const LoadingOverlay = ({ title, subtitle }) => {
    return (
        <div style={overlayStyle}>
            <div style={loadingTextStyle}>
                <Spinner animation="border" role="status" style={spinnerStyle}>
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                {title && <p>{title}</p>}
                {subtitle && <p>{subtitle}</p>}
            </div>
        </div>
    );
};

// Styles for the overlay
const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

// Styles for the spinner
const spinnerStyle = {
    width: '3rem',
    height: '3rem',
    marginBottom: '20px', // Add some space between the spinner and the text
};

// Styles for the text
const loadingTextStyle = {
    textAlign: 'center', // Center the text
    color: 'white', // Text color
    fontSize: '1.2rem', // Adjust font size as needed
};

export default LoadingOverlay;