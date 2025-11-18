const add = document.getElementById('cssbuttons-io-button');
const formuler = document.getElementById('formuler');
const home = document.getElementById('home');

add.addEventListener('click', function() {
    home.style.display = '';
    formuler.style.display = 'flex';
});
