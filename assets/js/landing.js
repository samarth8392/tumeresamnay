document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('videoModal');
    const overlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeModal');
    const video = document.getElementById('welcomeVideo');
    const videoSource = video.querySelector('source');
    const originalSrc = videoSource.src;

    // Force video settings for autoplay
    video.autoplay = true;
    video.playsinline = true;

    // Check if user has seen the video
    if (!localStorage.getItem('videoPlayed')) {
        showModal();
    }

    // Show modal function
    function showModal() {
        modal.style.display = 'block';
        overlay.style.display = 'block';
        video.style.display = 'block';
        videoSource.src = originalSrc;
        video.load();
        // Force play with user interaction
        video.play().catch(function (error) {
            console.log("Video autoplay failed:", error);
            video.play();
        });
    }

    // Close modal function
    function closeModal() {
        modal.style.display = 'none';
        overlay.style.display = 'none';
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
        // Remove the source and force a reload
        videoSource.src = '';
        video.load();
        localStorage.setItem('videoPlayed', 'true');
    }

    // Add event listener for when video ends
    video.addEventListener('ended', function() {
        closeModal();
    });

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