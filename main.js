// FIX 1: define background
const background = document.getElementById("background");

const add = document.getElementById('cssbuttons-io-button');
const formuler = document.getElementById('formuler');
const home = document.getElementById('home');
const submit = document.getElementById('submit');
const conf = document.getElementById('conf');

add.addEventListener('click', function() {
    formuler.style.display = 'flex';
    document.getElementById("closeForm").onclick = () => {
        background.style.display = "none";
    }
});

submit.addEventListener('click', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const num = document.getElementById('num').value.trim();
    const pic = document.getElementById('pic').value.trim();
    const domaine = document.getElementById('Domaine').value.trim(); 
    const experience = document.getElementById('Experience').value.trim();
    const location = document.getElementById('Location').value.trim();
   
    const newp = document.createElement('div');
    newp.classList.add('card');
    
    let cards = document.getElementById('cards'); 

    // FIX 2: save domaine inside card
    newp.dataset.domaine = domaine;

    newp.innerHTML = `
        <img id="card_load" src="${pic || 'https://randomuser.me/api/portraits/men/75.jpg'}">
        <div id="card_load_extreme_title">${name}</div>
        <div id="btn">
        <button id="edit">EDIT</button>
        <button id="remove">REMOVE</button>
        </div>
    `;

    cards.appendChild(newp);

    let removeBtn = newp.querySelector('#remove');
    let editBtn = newp.querySelector('#edit');

    removeBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        cards.removeChild(newp);
    });

    editBtn.addEventListener('click', function(event) {
        event.stopPropagation();
        formuler.style.display = 'flex';

        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('num').value = num;
        document.getElementById('pic').value = pic;
        document.getElementById('Domaine').value = domaine;
        document.getElementById('Experience').value = experience;
        document.getElementById('Location').value = location;

        cards.removeChild(newp);
    });

    formuler.style.display = 'none';

    newp.addEventListener('click', function () {
        background.style.display = 'flex';
        background.innerHTML = "";

        let info = document.createElement('div');
        info.classList.add("info-popup");

        info.innerHTML = `
            <h2>Employee Info</h2>
            <img src="${pic || 'https://randomuser.me/api/portraits/men/75.jpg'}" 
                 style="width:100px;height:100px;border-radius:50%;object-fit:cover;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${num}</p>
            <p><strong>Domaine:</strong> ${domaine}</p>
            <p><strong>Experience:</strong> ${experience}</p>
            <p><strong>Location:</strong> ${location}</p>
            <button id="closeInfo">Close</button>
        `;

        background.appendChild(info);

        document.getElementById("closeInfo").onclick = () => {
            background.style.display = "none";
        };
    });
});


// ADD TO ROOM SYSTEM
document.querySelectorAll('.add-to-room').forEach(plusBtn => {

    plusBtn.addEventListener('click', () => {

        let room = plusBtn.parentElement;

        // FIX 3: room must have data-domaine
        let roomDomaine = room.dataset.domaine;

        background.style.display = "flex";
        background.innerHTML = `
            <div class="info-popup">
                <h2>Select Employee</h2>
                <div id="empList" style="display:flex;flex-direction:column;gap:10px;"></div>
                <button id="closeInfo">Close</button>
            </div>
        `;

        let empList = document.getElementById("empList");

        document.querySelectorAll("#cards .card").forEach(card => {

            let employeeDomaine = card.dataset.domaine;

            if (employeeDomaine === roomDomaine) {

                let clone = card.cloneNode(true);
                clone.querySelector("#btn")?.remove();
                clone.style.cursor = "pointer";
                clone.style.border = "2px solid #4CAF50";

                clone.onclick = () => {
                    card.remove();
                    room.appendChild(card);

                    background.style.display = "none";
                };

                empList.appendChild(clone);
            }
        });

        document.getElementById("closeInfo").onclick = () => {
            background.style.display = "none";
        };
    });
});
