const add = document.getElementById('cssbuttons-io-button');
const formuler = document.getElementById('formuler');
const home = document.getElementById('home');
const submit = document.getElementById('submit');


add.addEventListener('click', function() {
    formuler.style.display = 'flex';
        document.getElementById("closeForm").onclick = () => {
        background.style.display = "none";}
});
submit.addEventListener('click', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const num = document.getElementById('num').value.trim();
    const pic = document.getElementById('pic').value.trim();
    const domaine = document.getElementById('Domaine').value.trim(); 

    const newp = document.createElement('div');
    newp.classList.add('card');  // ✔ Add card class!!
    
    let cards = document.getElementById('cards'); 

  newp.innerHTML = `
    <img id="card_load" src="${pic ? pic : 'https://randomuser.me/api/portraits/men/75.jpg'}" alt="Profile Picture">
    <div id="card_load_extreme_title">${name}</div>
    <div id="card_load_extreme_descripion">${domaine}</div>
`;


    cards.appendChild(newp);
    formuler.style.display = 'none';

newp.addEventListener('click', function () {

    // Show background
    background.style.display = 'flex';

    // Clear old info popup if exists
    background.innerHTML = "";

    // Create info box
    let info = document.createElement('div');
    info.classList.add("info-popup");

    info.innerHTML = `
        <h2>Employee Info</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone Number:</strong> ${num}</p>
        <p><strong>Domaine:</strong> ${domaine}</p>
        <button id="closeInfo">Close</button>
    `;

    background.appendChild(info);

    // Close button
    document.getElementById("closeInfo").onclick = () => {
        background.style.display = "none";
    };
});



});

