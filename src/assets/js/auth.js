document.addEventListener('DOMContentLoaded', function() {
    // Toggle para mostrar/ocultar contraseña
    const togglePassword = document.querySelector('.toggle-password');
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.querySelector('#password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // Manejo del formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const rememberMe = document.querySelector('input[name="remember"]').checked;
            
            // Aquí iría la lógica real de autenticación
            console.log('Login attempt with:', { email, password, rememberMe });
            
            // Simulación de login exitoso
            showMessage('Inicio de sesión exitoso! Redirigiendo...', 'success');
            
            // Redirigir después de 2 segundos (simulación)
            setTimeout(() => {
                window.location.href = 'dashboard.html'; // Cambiar por tu ruta real
            }, 2000);
        });
    }
    
    // Manejo del formulario de recuperación de contraseña
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('recovery-email').value;
            
            // Aquí iría la lógica real de recuperación
            console.log('Password recovery for:', email);
            
            // Simulación de envío exitoso
            showMessage('Se han enviado instrucciones a tu correo electrónico.', 'success');
        });
    }
    
    // Función para mostrar mensajes al usuario
    function showMessage(message, type) {
        // Eliminar mensajes existentes
        const existingMessage = document.querySelector('.auth-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `auth-message ${type}-message`;
        messageDiv.textContent = message;
        
        const authCard = document.querySelector('.auth-card');
        if (authCard) {
            const authHeader = document.querySelector('.auth-header');
            if (authHeader) {
                authHeader.after(messageDiv);
            } else {
                authCard.prepend(messageDiv);
            }
        }
        
        // Desaparecer después de 5 segundos
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => messageDiv.remove(), 500);
        }, 5000);
    }

    // Manejo del formulario de registro
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('reg-name').value;
            const email = document.getElementById('reg-email').value;
            const phone = document.getElementById('reg-phone').value;
            const password = document.getElementById('reg-password').value;
            const confirmPassword = document.getElementById('reg-confirm-password').value;
            const termsAccepted = document.querySelector('input[name="terms"]').checked;
            
            // Validar que las contraseñas coincidan
            if (password !== confirmPassword) {
                showMessage('Las contraseñas no coinciden', 'error');
                return;
            }
            
            // Validar términos aceptados
            if (!termsAccepted) {
                showMessage('Debes aceptar los términos y condiciones', 'error');
                return;
            }
            
            // Aquí iría la lógica real de registro
            console.log('Register attempt with:', { name, email, phone, password });
            
            // Simulación de registro exitoso
            showMessage('Registro exitoso! Redirigiendo...', 'success');
            
            // Redirigir después de 2 segundos (simulación)
            setTimeout(() => {
                window.location.href = 'index.html'; // Redirigir al login
            }, 2000);
        });
    }
});