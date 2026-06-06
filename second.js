function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    errorMsg.textContent = message;
    errorMsg.style.display = 'block';
}

function calculateage(){
const birthDateInput= document.getElementById('dob');
const result = document.getElementById('result');
 const ageDisplay = document.getElementById('ageDisplay');
 const ageBreakdown = document.getElementById('ageBreakdown');
const errorMsg = document.getElementById('errorMsg');

//Reset previous state
result.style.display = 'none';
 errorMsg.style.display = 'none';

 const birthdate= new Date(birthDateInput.value);
 const today= new Date();

 if(!birthDateInput.value){
 showError('Please select a birth date');
 return;
 }

 if(birthdate> today){
    showError('Birth date cannot be in future');
    return;
 }
    // ✅ ADDED: Calculate actual age
    let age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthdate.getDate())) {
        age--;
    }

     const timeDiff = today.getTime() - birthdate.getTime();
    const days = Math.floor(timeDiff / (1000* 60 * 60 * 24));
    const years = Math.floor(days / 365.25);
    const remainingDays = days % 365;
    const months = Math.floor(remainingDays / 30.44);
    const yearsDays = Math.floor(remainingDays % 30.44);

     // Display results
    ageDisplay.textContent = `${age} years old`;
    ageBreakdown.innerHTML = `
        📅 ${years} years, ${months} months, ${yearsDays} days<br>
        ✨ Total days lived: ${days.toLocaleString()}
    `;
    
    result.style.display = 'block';
    result.scrollIntoView({ behavior: 'smooth' });
}

// ✅ Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    const birthdateInput = document.getElementById('birthdate');
    const calculateBtn = document.getElementById('calculateBtn');
    
    // Set max date to today
    birthdateInput.max = new Date().toISOString().split('T')[0];
    
    // Button click event
    calculateBtn.addEventListener('click', calculateAge);
    
    // Enter key support
    birthdateInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateAge();
        }
    });
});

