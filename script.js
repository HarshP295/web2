// Variable declarations demonstrating different types
const registrationForm = document.getElementById('registrationForm');
const successMessage = document.getElementById('successMessage');
const resetFormButton = document.getElementById('resetForm');

// String variables
const requiredFieldMessage = 'This field is required';
const invalidEmailMessage = 'Please enter a valid email address';
const ageRestrictionMessage = 'You must be between 12 and 99 years old';

// Boolean flag to track form validity
let isFormValid = false;

// Event handler for form submission
registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    isFormValid = true;

    // Reset error messages
    resetErrorMessages();

    // Validate each field
    validateName();
    validateEmail();
    validateAge();
    validateGame();
    validateSkill();

    // If form is valid, show success message
    if (isFormValid) {
        registrationForm.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Log form data to console (could be sent to server in real app)
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            game: document.getElementById('game').value,
            skill: document.querySelector('input[name="skill"]:checked').value,
            team: document.getElementById('team').value || 'None'
        };
        console.log('Form submitted:', formData);
        
        // Demonstrate switch statement with the selected game
        switch(formData.game) {
            case 'valorant':
                console.log('Valorant tournament selected');
                break;
            case 'fortnite':
                console.log('Fortnite tournament selected');
                break;
            case 'csgo':
                console.log('CS:GO tournament selected');
                break;
            case 'lol':
                console.log('League of Legends tournament selected');
                break;
            default:
                console.log('Unknown game selected');
        }
    }
});

// Event handler for reset button
resetFormButton.addEventListener('click', function() {
    registrationForm.style.display = 'block';
    successMessage.style.display = 'none';
    registrationForm.reset();
});

// Validation functions
function validateName() {
    const nameInput = document.getElementById('name');
    const nameError = document.getElementById('nameError');
    
    if (nameInput.value.trim() === '') {
        showError(nameInput, nameError, requiredFieldMessage);
    }
}

function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, requiredFieldMessage);
    } else if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, emailError, invalidEmailMessage);
    }
}

function validateAge() {
    const ageInput = document.getElementById('age');
    const ageError = document.getElementById('ageError');
    const age = parseInt(ageInput.value);
    
    if (ageInput.value === '') {
        showError(ageInput, ageError, requiredFieldMessage);
    } else if (isNaN(age)) {
        showError(ageInput, ageError, 'Please enter a valid number');
    } else if (age < 12 || age > 99) {
        showError(ageInput, ageError, ageRestrictionMessage);
    }
}

function validateGame() {
    const gameSelect = document.getElementById('game');
    const gameError = document.getElementById('gameError');
    
    if (gameSelect.value === '') {
        showError(gameSelect, gameError, 'Please select a game');
    }
}

function validateSkill() {
    const skillSelected = document.querySelector('input[name="skill"]:checked');
    const skillError = document.getElementById('skillError');
    
    if (!skillSelected) {
        skillError.textContent = 'Please select your skill level';
        isFormValid = false;
    }
}

// Helper functions
function showError(inputElement, errorElement, message) {
    inputElement.style.borderColor = 'var(--error-color)';
    errorElement.textContent = message;
    isFormValid = false;
}

function resetErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('input, select');
    
    errorMessages.forEach(msg => msg.textContent = '');
    inputs.forEach(input => input.style.borderColor = '#ddd');
}

// Event listener for email field to demonstrate real-time validation
document.getElementById('email').addEventListener('blur', function() {
    const emailInput = this;
    const emailError = document.getElementById('emailError');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (emailInput.value.trim() === '') {
        showError(emailInput, emailError, requiredFieldMessage);
    } else if (!emailRegex.test(emailInput.value)) {
        showError(emailInput, emailError, invalidEmailMessage);
    } else {
        emailInput.style.borderColor = 'var(--success-color)';
        emailError.textContent = '';
    }
});

// Demonstrate if-else with age validation on blur
document.getElementById('age').addEventListener('blur', function() {
    const ageInput = this;
    const ageError = document.getElementById('ageError');
    const age = parseInt(ageInput.value);
    
    if (ageInput.value === '') {
        showError(ageInput, ageError, requiredFieldMessage);
    } else if (isNaN(age)) {
        showError(ageInput, ageError, 'Please enter a valid number');
    } else if (age < 12) {
        showError(ageInput, ageError, 'You must be at least 12 years old');
    } else if (age > 99) {
        showError(ageInput, ageError, 'Maximum age is 99 years');
    } else {
        ageInput.style.borderColor = 'var(--success-color)';
        ageError.textContent = '';
    }
});