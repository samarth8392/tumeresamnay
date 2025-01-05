document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('videoModal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeModal');
    const video = document.getElementById('welcomeVideo');

    // Check if user has seen the video
    if (!localStorage.getItem('videoPlayed')) {
        showModal();
    }

    // Show modal function
    function showModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        video.play().catch(function (error) {
            console.log("Video autoplay failed:", error);
        });
    }

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        video.pause();
        video.currentTime = 0;
        // Set flag in localStorage
        localStorage.setItem('videoPlayed', 'true');
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    // Close modal with ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});
