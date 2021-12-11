import './LoadingSpinner.css';

/**
A spinner to display when loading. HTML and CSS from https://loading.io
*/
const LoadingSpinner = (props) => {
    return (
        <div className='lds-spinner-container'>
            <div className='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingSpinner;