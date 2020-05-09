import * as firebase from 'firebase';
const firebaseConfig = {
    apiKey: 'AIzaSyB1I0NItpAv3sI_IbAB5wbQd0EOxCpXH1U',
    authDomain: 'kalbim-532f8.firebaseapp.com',
    databaseURL: 'https://kalbim-532f8.firebaseio.com',
    projectId: 'kalbim-532f8',
    storageBucket: 'kalbim-532f8.appspot.com',
    messagingSenderId: '837905386058',
    appId: '1:837905386058:web:65606af7805229b2df34b3',
    measurementId: 'G-PZBS372TEV',
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();