//--------------------------------- REGISTRO 
const signupForm = document.querySelector('#signup-form');

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#signup-email').value;
    const password = document.querySelector('#signup-password').value;

    auth
        .createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            //reset sign up
            signupForm.reset();

            //cerrar sign up
            $('#signupModal').modal('hide');

            console.log('sing up');
        })
})

//--------------------------------- LOGIN 
const signinForm = document.querySelector('#login-form');

signinForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.querySelector('#login-email').value;
    const password = document.querySelector('#login-password').value;

    auth
        .signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            //reset sign in
            signinForm.reset();

            //cerrar sign in
            $('#signinModal').modal('hide');

            console.log('sign in');
        })
})

//--------------------------------- LOGOUT
const logout = document.querySelector('#logout');

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
    
        console.log('Logout')
    })
})

//--------------------------------- EVENTOS
/*auth.onAuthStateChanged(user => {
    if (user){
        $('#itemsjs').modal('show');
    } else{
        $('#itemsjs').('hide');
    }
})*/

auth.onAuthStateChanged(user => {
    const cartaLink = document.querySelector('a[href="/Proyecto Web/Proyecto Web/html/carta.html"]');
    const carritoLink = document.querySelector('a[href="/Proyecto Web/Proyecto Web/html/carrito.html"]');
    const logoutLink =  document.querySelector('#logout');
    
    if (user) {
        cartaLink.style.display = 'block'; // Muestra el enlace a NUESTRA CARTA
        carritoLink.style.display = 'block'; // Muestra el enlace al CARRITO
        logoutLink.style.display = 'block'; // Muestra el enlace al LOGOUT

    } else {
        cartaLink.style.display = 'none'; // Oculta el enlace a NUESTRA CARTA
        carritoLink.style.display = 'none'; // Oculta el enlace al CARRITO
        logoutLink.style.display = 'none'; // Muestra el enlace al LOGOUT
    }
});