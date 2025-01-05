// Add attendance handling logic
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.getElementById('form-fields');
    const attendanceInputs = document.querySelectorAll('input[name="Attending"]');
    const form = document.getElementById('contact-form');
    const guestSelect = document.getElementById('select2');
    
    // Store the original options for "Yes" attendance
    const yesOptions = `
        <option value="">Select number of guests</option>
        <option value="1">Just Me</option>
        <option value="2">2 Guest</option>
        <option value="3">3 Guest</option>
        <option value="4">4 Guest</option>
        <option value="4+">4+ Guest</option>
    `;

    // Function to handle attendance selection
    function handleAttendanceChange(e) {
        const isAttending = e.target.value === 'yes';
        formFields.style.display = isAttending ? 'block' : 'none';
        
        if (!isAttending) {
            // Reset and set default values for non-attendance
            const inputs = formFields.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                input.value = '';
            });
            form.querySelector('textarea[name="Notes"]').value = "Not attending";
            // Set select to only show 0 option for non-attendance
            guestSelect.innerHTML = '<option value="0">0 Guest</option>';
            guestSelect.value = "0";
        } else {
            // Restore original options for attendance
            guestSelect.innerHTML = yesOptions;
            guestSelect.value = "";
        }
    }

    // Add event listeners to radio buttons
    attendanceInputs.forEach(input => {
        input.addEventListener('change', handleAttendanceChange);
    });

    // Add form validation before the existing submit handler
    form.addEventListener('submit', function(e) {
        const attending = document.querySelector('input[name="Attending"]:checked');
        
        if (!attending) {
            e.preventDefault();
            document.getElementById('message').textContent = 'Please select whether you are attending.';
            document.getElementById('message').style.display = 'block';
            document.getElementById('message').style.backgroundColor = 'red';
            document.getElementById('message').style.color = 'white';
            return;
        }

        if (attending.value === 'yes') {
            const name = form.querySelector('input[name="Name"]').value;
            const email = form.querySelector('input[name="Email"]').value;
            const guests = form.querySelector('select[name="Guests"]').value;

            if (!name || !email || !guests) {
                e.preventDefault();
                document.getElementById('message').textContent = 'Please fill in all required fields.';
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').style.backgroundColor = 'red';
                document.getElementById('message').style.color = 'white';
                return;
            }
        } else {
            // If "No" is selected, set minimal required information
            form.querySelector('textarea[name="Notes"]').value = "Not attending";
            guestSelect.value = "0";
            // Set default values for required fields to ensure form submission works
            if (!form.querySelector('input[name="Name"]').value) {
                form.querySelector('input[name="Name"]').value = "Not attending";
            }
            if (!form.querySelector('input[name="Email"]').value) {
                form.querySelector('input[name="Email"]').value = "none@none.com";
            }
        }
        
        // If validation passes, the form will continue with the existing submit handler
    }, true); // Using capture phase to ensure this runs before the existing handler
});