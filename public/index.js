document.addEventListener('DOMContentLoaded', () => {
  const app = firebase.app();
  const body = document.body;

  const db = firebase.firestore();

  db.collection('dod-online').get().then(snapshot => {
    snapshot.docs.forEach(doc => {
      let data = doc.data();
      console.log(data);

      let adress = document.createElement('p');
      let age = document.createElement('p');
      let name = document.createElement('p');

      adress.textContent = data.adress;
      age.textContent = data.age;
      name.textContent = data.name;

      body.appendChild(adress);
      body.appendChild(age);
      body.appendChild(name);
    });
  });
  
});
