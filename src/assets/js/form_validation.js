document.addEventListener('DOMContentLoaded', function() {
    // Validación en tiempo real para el formulario de login
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    
    if (emailInput) {
        emailInput.addEventListener('input', validateEmail);
    }
    
    if (passwordInput) {
        passwordInput.addEventListener('input', validatePassword);
    }
    
    // Validación en tiempo real para el formulario de recuperación
    const recoveryEmailInput = document.getElementById('recovery-email');
    if (recoveryEmailInput) {
        recoveryEmailInput.addEventListener('input', validateEmail);
    }
    
    // Función para validar email
    function validateEmail(e) {
        const input = e.target;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(input.value)) {
            input.style.borderColor = '#e74c3c';
            input.parentElement.querySelector('i').style.color = '#e74c3c';
        } else {
            input.style.borderColor = '#2ecc71';
            input.parentElement.querySelector('i').style.color = '#2ecc71';
            setTimeout(() => {
                input.style.borderColor = '#ddd';
                input.parentElement.querySelector('i').style.color = '#7f8c8d';
            }, 2000);
        }
    }
    
    // Función para validar contraseña
    function validatePassword(e) {
        const input = e.target;
        
        if (input.value.length < 6) {
            input.style.borderColor = '#e74c3c';
            input.parentElement.querySelector('i').style.color = '#e74c3c';
        } else {
            input.style.borderColor = '#2ecc71';
            input.parentElement.querySelector('i').style.color = '#2ecc71';
            setTimeout(() => {
                input.style.borderColor = '#ddd';
                input.parentElement.querySelector('i').style.color = '#7f8c8d';
            }, 2000);
        }
    }
    
    // Validación al enviar formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            let isValid = true;
            
            // Validar campos de email
            const emailFields = form.querySelectorAll('input[type="email"]');
            emailFields.forEach(field => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(field.value)) {
                    field.style.borderColor = '#e74c3c';
                    field.parentElement.querySelector('i').style.color = '#e74c3c';
                    isValid = false;
                }
            });
            
            // Validar campos de contraseña (si existen)
            const passwordFields = form.querySelectorAll('input[type="password"]');
            passwordFields.forEach(field => {
                if (field.value.length < 6) {
                    field.style.borderColor = '#e74c3c';
                    field.parentElement.querySelector('i').style.color = '#e74c3c';
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                
                // Mostrar mensaje de error
                const authCard = document.querySelector('.auth-card');
                if (authCard) {
                    const existingMessage = document.querySelector('.auth-message');
                    if (existingMessage) {
                        existingMessage.remove();
                    }
                    
                    const messageDiv = document.createElement('div');
                    messageDiv.className = 'auth-message error-message';
                    messageDiv.textContent = 'Por favor, corrige los errores en el formulario.';
                    
                    const authHeader = document.querySelector('.auth-header');
                    if (authHeader) {
                        authHeader.after(messageDiv);
                    } else {
                        authCard.prepend(messageDiv);
                    }
                }
            }
        });
    });
    // Validación para el formulario de registro
const registerForm = document.getElementById('registerForm');
if (registerForm) {
    const passwordInput = document.getElementById('reg-password');
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            validatePasswordStrength(this.value);
            validatePasswordMatch();
        });
    }
    
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', validatePasswordMatch);
    }
    
    // Validar fuerza de contraseña
    function validatePasswordStrength(password) {
        const strengthBar = document.querySelector('.strength-bar');
        const strengthText = document.querySelector('.strength-text span');
        
        // Reset classes
        strengthBar.parentElement.parentElement.classList.remove(
            'password-weak', 'password-medium', 'password-strong', 'password-very-strong'
        );
        
        let strength = 0;
        let text = 'Débil';
        let width = '25%';
        let colorClass = 'password-weak';
        
        // Contiene números
        if (password.match(/\d/)) strength++;
        // Contiene letras minúsculas
        if (password.match(/[a-z]/)) strength++;
        // Contiene letras mayúsculas
        if (password.match(/[A-Z]/)) strength++;
        // Contiene caracteres especiales
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        // Longitud mínima
        if (password.length >= 8) strength++;
        
        // Determinar fuerza
        if (strength > 4) {
            text = 'Muy Fuerte';
            width = '100%';
            colorClass = 'password-very-strong';
        } else if (strength > 3) {
            text = 'Fuerte';
            width = '75%';
            colorClass = 'password-strong';
        } else if (strength > 2) {
            text = 'Media';
            width = '50%';
            colorClass = 'password-medium';
        }
        
        // Aplicar cambios
        strengthBar.style.setProperty('--width', width);
        strengthBar.parentElement.parentElement.classList.add(colorClass);
        strengthText.textContent = text;
        strengthText.style.color = getComputedStyle(strengthBar).backgroundColor;
    }
    
    // Validar que las contraseñas coincidan
    function validatePasswordMatch() {
        if (passwordInput && confirmPasswordInput) {
            if (passwordInput.value !== confirmPasswordInput.value && confirmPasswordInput.value !== '') {
                confirmPasswordInput.style.borderColor = '#e74c3c';
                confirmPasswordInput.parentElement.querySelector('i').style.color = '#e74c3c';
            } else if (confirmPasswordInput.value !== '') {
                confirmPasswordInput.style.borderColor = '#2ecc71';
                confirmPasswordInput.parentElement.querySelector('i').style.color = '#2ecc71';
                setTimeout(() => {
                    confirmPasswordInput.style.borderColor = '#ddd';
                    confirmPasswordInput.parentElement.querySelector('i').style.color = '#7f8c8d';
                }, 2000);
            }
        }
    }
    
    // Validar teléfono
    const phoneInput = document.getElementById('reg-phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            const phoneRegex = /^[+]?[\d\s-]+$/;
            
            if (!phoneRegex.test(e.target.value)) {
                e.target.style.borderColor = '#e74c3c';
                e.target.parentElement.querySelector('i').style.color = '#e74c3c';
            } else {
                e.target.style.borderColor = '#2ecc71';
                e.target.parentElement.querySelector('i').style.color = '#2ecc71';
                setTimeout(() => {
                    e.target.style.borderColor = '#ddd';
                    e.target.parentElement.querySelector('i').style.color = '#7f8c8d';
                }, 2000);
            }
        });
    }
}
});