// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDbfdVEIpX1SGxgN7aKhG_g612abogRXVk",
    authDomain: "jibu-c8d30.firebaseapp.com",
    projectId: "jibu-c8d30",
    storageBucket: "jibu-c8d30.appspot.com",
    messagingSenderId: "107030281975",
    appId: "1:107030281975:web:734737b5b6d0b9d347ddf2",
    measurementId: "G-QXDD1HK5LL"
  };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Get references to auth and firestore services
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const authDiv = document.getElementById('auth');
const appDiv = document.getElementById('app');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupBtn = document.getElementById('signup-btn');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginBtn = document.getElementById('login-btn');
const internName = document.getElementById('intern-name');
const internSkills = document.getElementById('intern-skills');
const addInternBtn = document.getElementById('add-intern-btn');
const internList = document.getElementById('intern-list');

// Sign up event
signupBtn.addEventListener('click', () => {
    const email = signupEmail.value;
    const password = signupPassword.value;
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User signed up:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error signing up:', error);
        });
});

// Log in event
loginBtn.addEventListener('click', () => {
    const email = loginEmail.value;
    const password = loginPassword.value;
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            console.log('User logged in:', userCredential.user);
        })
        .catch((error) => {
            console.error('Error logging in:', error);
        });
});

// Add intern event
addInternBtn.addEventListener('click', () => {
    const name = internName.value;
    const skills = internSkills.value;
    db.collection('interns').add({
        name: name,
        skills: skills
    }).then((docRef) => {
        console.log('Intern added with ID:', docRef.id);
        loadInterns();
    }).catch((error) => {
        console.error('Error adding intern:', error);
    });
});

// Load interns from Firestore
function loadInterns() {
    internList.innerHTML = '';
    db.collection('interns').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const intern = doc.data();
            const div = document.createElement('div');
            div.textContent = `Name: ${intern.name}, Skills: ${intern.skills}`;
            internList.appendChild(div);
        });
    });
}

// Auth state listener
auth.onAuthStateChanged((user) => {
    if (user) {
        authDiv.style.display = 'none';
        appDiv.style.display = 'block';
        loadInterns();
    } else {
        authDiv.style.display = 'block';
        appDiv.style.display = 'none';
    }
});