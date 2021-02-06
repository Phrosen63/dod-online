/*
const firebaseConfig = {
  apiKey: "AIzaSyC9FFxbU8KAinpN0xiTG8ush5jR9-HuwD8",
  authDomain: "dod-online.firebaseapp.com",
  databaseURL: "https://dod-online-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "dod-online",
  storageBucket: "dod-online.appspot.com",
  messagingSenderId: "449856593961",
  appId: "1:449856593961:web:1e96a3605f300217bfbc38"
};
firebase.initializeApp(firebaseConfig);
*/


document.addEventListener('DOMContentLoaded', () => {
  // Login
  const auth = firebase.auth();
  // Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  // Sign up
  btnSignUp.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const promise = auth.createUserWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // Login
  btnLogin.addEventListener('click', e => {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => console.log(e.message));
  });

  // Logout
  btnLogout.addEventListener('click', e => {
    auth.signOut();
  });

  // Real-time authentication listener
  auth.onAuthStateChanged(firebaseUser => {
    if (firebaseUser) {
      // User is logged in
      console.log(firebaseUser);
      btnLogout.classList.remove('hide');
    } else {
      // User is not logged in
      btnLogout.classList.add('hide');
    }
  });

  /*
  // const app = firebase.app();
  const list = document.getElementById('targetElement');
  const db = firebase.firestore();

  const COLLECTION_NAME = 'dod-online';

  const form = document.getElementById('test-form');

  // Authenticating
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth()
    .signInWithPopup(provider)
    .then((result) => {
      // @type {firebase.auth.OAuthCredential}
      const credential = result.credential;
      const token = credential.accessToken;
      const user = result.user;

      console.log(token);
      console.log(user);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = error.credential;
    });

  const loginButton = document.getElementById('login');
  loginButton.addEventListener('click', (e) => {
    const auth = firebase.auth();
    // auth.signInWithRedirect(provider);
    // auth.signInWithEmailAndPassword(email, pass);
    // auth.createUserWithEmailAndPassword(email, pass);

    // auth.onAuthStateChanged(user => {});
  });

  // Render data
  const renderData = (doc) => {
    const data = doc.data();

    const adress = document.createElement('p');
    const age = document.createElement('p');
    const name = document.createElement('p');
    const li = document.createElement('li');
    const deleteButton = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    adress.textContent = data.adress;
    age.textContent = data.age;
    name.textContent = data.name;
    deleteButton.textContent = 'X';

    li.appendChild(adress);
    li.appendChild(age);
    li.appendChild(name);
    li.appendChild(deleteButton);
    
    list.appendChild(li);

    // Delte data
    deleteButton.addEventListener('click', e => {
      const id = e.target.parentElement.getAttribute('data-id');
      db.collection(COLLECTION_NAME).doc(id).delete();
    });
  };

  // Real-time listener
  db.collection(COLLECTION_NAME).onSnapshot(snapshot => {
    const changes = snapshot.docChanges();
    changes.forEach(change => {
      if (change.type === 'added') {
        renderData(change.doc);
      }
      if (change.type === 'removed') {
        const li = list.querySelector(`[data-id=${change.doc.id}]`);
        list.removeChild(li);
      }
    });
  });

  // Write data
  form.addEventListener('submit', e => {
    e.preventDefault();
    db.collection(COLLECTION_NAME).add({
      adress: form.adress.value,
      age: form.age.value,
      name: form.name.value,
    });
    form.adress.value = '';
    form.age.value = '';
    form.name.value = '';
  });
  */
});
