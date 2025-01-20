document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('videoModal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeModal');
    const video = document.getElementById('welcomeVideo');

    // Check if user has seen the video
    if (!localStorage.getItem('videoPlayed')) {
        showModal();
    }

    function showModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        video.play().catch(function (error) {
            console.log("Video autoplay failed:", error);
        });
    }

    function closeModal() {
        // First, stop the video
        video.pause();
        video.currentTime = 0;
        
        // Then hide the modal and overlay
        modal.style.display = 'none';
        overlay.style.display = 'none';
        
        // Set the localStorage flag
        localStorage.setItem('videoPlayed', 'true');
    }

    // Event listener for video end
    video.addEventListener('ended', closeModal);

    // Event listeners for close actions
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    
    // Close on ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
});