document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    fetch('http://localhost:3000/BackEnd/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Login successful!');
            localStorage.setItem('loggedIn', true);
            localStorage.setItem('email', email);
            // Update navigation
            document.querySelector('nav').innerHTML = `
                
                <a href="homePage.html" onclick="logout()">Logout</a>
            `;
            window.location.href = 'products.html';  // Redirect to products page
        } else {
            document.getElementById('error-message').textContent = data.message;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

function logout() {
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('email');
    window.location.href = 'login.html';
}
