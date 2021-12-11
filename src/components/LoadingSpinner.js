import './LoadingSpinner.css';

/**
A spinner to display when loading. HTML and CSS from https://loading.io
*/
const LoadingSpinner = (props) => {
    return (
        <div class='lds-spinner-container'>
            <div class='lds-spinner'><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
};

export default LoadingSpinner;