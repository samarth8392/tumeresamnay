(function () {
    var form = document.getElementById('contact-form');
    if (!form) {
        return;
    }

    var statusEl = document.getElementById('contact-status');
    var submitBtn = form.querySelector('button[type="submit"]');

    function setStatus(message, isError) {
        if (!statusEl) {
            return;
        }
        statusEl.textContent = message;
        statusEl.classList.remove('text-success', 'text-danger', 'text-muted');
        statusEl.classList.add(isError ? 'text-danger' : 'text-success');
        if (!message) {
            statusEl.classList.add('text-muted');
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (submitBtn) {
            submitBtn.disabled = true;
        }

        setStatus('Sending message...', false);

        var formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(function (response) {
                if (response.ok) {
                    return response.json().then(function (data) {
                        return { ok: true, message: data && data.message };
                    });
                }

                return response.json().then(function (data) {
                    var message = 'Unable to send message. Please try again.';
                    if (data && data.errors && data.errors.length) {
                        message = data.errors.map(function (err) { return err.message; }).join(' ');
                    }
                    return { ok: false, message: message };
                });
            })
            .then(function (data) {
                if (data.ok) {
                    setStatus(data.message || 'Thanks! Your message has been sent.', false);
                    form.reset();
                } else {
                    setStatus(data.message, true);
                }
            })
            .catch(function () {
                setStatus('Network error. Please try again later.', true);
            })
            .finally(function () {
                if (submitBtn) {
                    submitBtn.disabled = false;
                }
            });
    });
})();
