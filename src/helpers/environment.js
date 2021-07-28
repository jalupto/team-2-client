let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:3000';
        break;
    case 'juno-travel.herokuapp.com':
        APIURL = 'https://juno-travel.herokuapp.com'
        break;
    default:
        console.log('Unable to connect.');
}

export default APIURL;