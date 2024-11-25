document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify({ username }));
                window.location.href = 'dashboard.html';
            } else {
                const error = await response.json();
                document.getElementById('error').innerText = error.message;
            }
        });
    }

    // Check if we are on the dashboard page
    if (window.location.pathname.endsWith('dashboard.html')) {
        window.onload = async () => {
            const response = await fetch('http://localhost:3000/orders');
            const orders = await response.json();
            const tbody = document.getElementById('ordersTable').querySelector('tbody');

            if (tbody) {
                orders.forEach(order => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${order.reqNumber}</td>
                        <td>${order.partyName}</td>
                        <td>${order.item}</td>
                        <td>${order.quantity}</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        };
    }

    // Log out functionality
    const logoutLink = document.getElementById('logout');
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default anchor behavior
            console.log("Logout link clicked"); // Debug log
            localStorage.removeItem('user'); // Clear user data
            window.location.href = 'index.html'; // Redirect to login page
        });
    }
});