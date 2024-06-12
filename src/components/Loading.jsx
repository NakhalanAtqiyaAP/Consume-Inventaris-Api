import React from 'react';
import Loading from 'react-loading';

const LoadingComponent = () => (
    <div className="min-h-screen flex items-center justify-center">
        <Loading type="spinningBubbles" color="#5C88C4" height={50} width={50} />
    </div>
);

export default LoadingComponent;
