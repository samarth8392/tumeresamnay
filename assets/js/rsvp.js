document.addEventListener('DOMContentLoaded', function () {
    const formFields = document.getElementById('form-fields');
    const attendanceInputs = document.querySelectorAll('input[name="Attending"]');
    const form = document.getElementById('contact-form');
    const datesSelect = document.getElementById('select3');
    const guestSelect = document.getElementById('select2');
    const notesTextarea = form.querySelector('textarea[name="Notes"]');

    // Store the original options for "Yes" attendance
    const yesOptions1 = `
    <option value="">Select number of guests</option>
    <option value="1">Just Me</option>
    <option value="2">2 Guest</option>
    <option value="3">3 Guest</option>
    <option value="4">4 Guest</option>
    <option value="4+">4+ Guest</option>
`;

    const yesOptions2 = `
    <option value="">Select dates you will attend</option>
    <option value="13-14 Feb">13-14 Feb</option>
    <option value="Only 14 Feb">Only 14 Feb</option>
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
            notesTextarea.value = "Not attending";
            notesTextarea.placeholder = "Not attending";
            // Set select to only show 0 option for non-attendance
            guestSelect.innerHTML = '<option value="0">0 Guest</option>';
            guestSelect.value = "0";
            datesSelect.innerHTML = '<option value="NA">Not attending</option>';
            datesSelect.value = "NA";
        } else {
            // Restore original options for attendance
            guestSelect.innerHTML = yesOptions1;
            guestSelect.value = "";
            datesSelect.innerHTML = yesOptions2;
            datesSelect.value = "";
            notesTextarea.value = ""; // Clear the "Not attending" message
            notesTextarea.placeholder = "Tell us your plans"; // Reset placeholder
        }
    }

    // Add event listeners to radio buttons
    attendanceInputs.forEach(input => {
        input.addEventListener('change', handleAttendanceChange);
    });

    // Add form validation before the existing submit handler
    form.addEventListener('submit', function (e) {
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
            const dates = form.querySelector('input[name="Dates"]').value;
            const guests = form.querySelector('select[name="Guests"]').value;

            if (!name || !email || !dates || !guests) {
                e.preventDefault();
                document.getElementById('message').textContent = 'Please fill in all required fields.';
                document.getElementById('message').style.display = 'block';
                document.getElementById('message').style.backgroundColor = 'red';
                document.getElementById('message').style.color = 'white';
                return;
            }
        } else {
            // If "No" is selected, set minimal required information
            notesTextarea.value = "Not attending";
            datesSelect.value = "NA";
            guestSelect.value = "0";
            // Set default values for required fields to ensure form submission works
            if (!form.querySelector('input[name="Name"]').value) {
                form.querySelector('input[name="Name"]').value = "Not attending";
            }
        }

        // If validation passes, the form will continue with the existing submit handler
    }, true); // Using capture phase to ensure this runs before the existing handler
});