const background = document.getElementById("background");
const addBtn = document.getElementById('cssbuttons-io-button');
const formuler = document.getElementById('formuler');
const submitBtn = document.getElementById('submit');
const closeFormBtn = document.getElementById('closeForm');
const cardsContainer = document.getElementById('cards');
// Regex 
const nameRegex = /^[a-zA-ZÀ-ÿ\s]+$/;
const phoneRegex = /^[0-9]{8,15}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


let editTarget = null; // to know if we are editing

// OPEN FORM
addBtn.addEventListener('click', () => { 
    formuler.style.display = 'flex'; 
    editTarget = null; // reset edit mode
});
closeFormBtn.addEventListener('click', () => { 
    formuler.style.display = 'none'; 
});

// ADD / EDIT EMPLOYEE
submitBtn.addEventListener('click', function(e){
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const num = document.getElementById('num').value.trim();
    const pic = document.getElementById('pic').value.trim();
    const domaine = document.getElementById('Domaine').value.trim();
      // ------- REGEX VALIDATION ---------

    if (!nameRegex.test(name)) {
        return alert("❌ Invalid Name — only letters allowed.");
    }
    if (email && !emailRegex.test(email)) {
        return alert("❌ Invalid Email format.");
    }
    if (num && !phoneRegex.test(num)) {
        return alert("❌ Phone number must contain only digits (8–15).");
    }
    if (!name || !domaine) return alert("Name and Domaine required");

    if(!name || !domaine) return alert("Name and Domaine required");

    // IF EDITING: UPDATE OLD CARD
    if (editTarget) {
        editTarget.dataset.domaine = domaine;
        editTarget.querySelector('.cardName').textContent = name;
        editTarget.querySelector('img').src = pic || 'https://randomuser.me/api/portraits/men/75.jpg';

        editTarget.dataset.name = name;
        editTarget.dataset.email = email;
        editTarget.dataset.num = num;
        editTarget.dataset.pic = pic;

        formuler.style.display = 'none';
        document.getElementById('form').reset();
        editTarget = null;
        return;
    }

    // CREATE NEW CARD
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.domaine = domaine;
    card.dataset.name = name;
    card.dataset.email = email;
    card.dataset.num = num;
    card.dataset.pic = pic;

    card.innerHTML = `
        <img src="${pic || 'https://randomuser.me/api/portraits/men/75.jpg'}">
        <div class="cardName">${name}</div>
        <div class="btn">
            <button class="edit">EDIT</button>
            <button class="remove">REMOVE</button>
        </div>
    `;

    // REMOVE BUTTON (MAIN AREA)
    card.querySelector('.remove').addEventListener('click', (e)=>{
        e.stopPropagation();
        card.remove();
    });

    // EDIT BUTTON
    card.querySelector('.edit').addEventListener('click', (e)=>{
        e.stopPropagation();
        formuler.style.display = 'flex';
        editTarget = card; // MARK this card for edit

        document.getElementById('name').value = name;
        document.getElementById('email').value = email;
        document.getElementById('num').value = num;
        document.getElementById('pic').value = pic;
        document.getElementById('Domaine').value = domaine;
    });

    // SHOW INFO
    card.addEventListener('click', ()=>{
        background.style.display = 'flex';
        background.innerHTML = `
            <div class="info-popup">
                <h2>Employee Info</h2>
                <img src="${pic || 'https://randomuser.me/api/portraits/men/75.jpg'}" 
                     style="width:100px;height:100px;border-radius:50%;object-fit:cover;">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${num}</p>
                <p><strong>Domaine:</strong> ${domaine}</p>
                <button id="closeInfo">Close</button>
            </div>
        `;
        document.getElementById('closeInfo').onclick = ()=> background.style.display='none';
    });

    cardsContainer.appendChild(card);
    formuler.style.display = 'none';
    document.getElementById('form').reset();
});

// ADD TO ROOM SYSTEM
document.querySelectorAll('.add-to-room').forEach(plusBtn=>{
    plusBtn.addEventListener('click', ()=>{
        const room = plusBtn.parentElement;
        const roomDomaine = room.dataset.domaine;

        background.style.display='flex';
        background.innerHTML=`
            <div class="info-popup">
                <h2>Select Employee</h2>
                <div id="empList" style="display:flex;flex-direction:column;gap:10px;"></div>
                <button id="closeInfo">Close</button>
            </div>
        `;
        const empList = document.getElementById('empList');

        document.querySelectorAll('#cards .card').forEach(card=>{
            if(card.dataset.domaine === roomDomaine){
                const clone = card.cloneNode(true);
                clone.querySelector('.btn')?.remove();
                clone.style.cursor='pointer';
                clone.style.border='2px solid #4CAF50';

                clone.onclick = ()=>{

                    // MOVE CARD INTO ROOM
                    room.appendChild(card);
                    card.style.width='90%';
                    card.style.margin='5px 0';
                    background.style.display='none';

                    //  return to main list
                    const removeBtn = card.querySelector('.remove');
                   removeBtn.onclick = (e) => {
    e.stopPropagation();

   
    cardsContainer.appendChild(card);
    card.style.width = "";
    card.style.margin = "";

    // RESTORE ORIGINAL REMOVE BUTTON FUNCTION
    removeBtn.onclick = (ev) => {
        ev.stopPropagation();
        card.remove(); // delete normally
    };
};

                };

                empList.appendChild(clone);
            }
        });

        document.getElementById('closeInfo').onclick=()=>background.style.display='none';
    });
});
