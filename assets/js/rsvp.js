// Add attendance handling logic
document.addEventListener('DOMContentLoaded', function() {
    const formFields = document.getElementById('form-fields');
    const attendanceInputs = document.querySelectorAll('input[name="Attending"]');
    const form = document.getElementById('contact-form');

    // Function to handle attendance selection
    function handleAttendanceChange(e) {
        const isAttending = e.target.value === 'yes';
        formFields.style.display = isAttending ? 'block' : 'none';
        
        // Reset form fields if not attending
        if (!isAttending) {
            const inputs = formFields.querySelectorAll('input, select, textarea');
            inputs.forEach(input => {
                input.value = '';
            });
            // Set Notes field to "Not attending" when "No" is selected
            form.querySelector('textarea[name="Notes"]').value = "Not attending";
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
            // You might want to set a default value for required fields to ensure form submission works
            if (!form.querySelector('input[name="Name"]').value) {
                form.querySelector('input[name="Name"]').value = "Not attending";
            }
            if (!form.querySelector('select[name="Guests"]').value) {
                form.querySelector('select[name="Guests"]').value = "0";
            }
        }
        
        // If validation passes, the form will continue with the existing submit handler
    }, true); // Using capture phase to ensure this runs before the existing handler
});