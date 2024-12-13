var form = document.getElementById('contactForm');

var successMessage = document.getElementById('successMessage');

form.onsubmit = function(event) {
    event.preventDefault();
    
    document.getElementById('name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('comment').value = '';
    
    successMessage.style.display = 'flex';
    
    setTimeout(function() {
        successMessage.style.display = 'flex';
    }, 1000);
}