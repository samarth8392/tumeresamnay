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
        
        // Multiple approaches to ensure video stops
        video.pause();
        video.currentTime = 0;
        video.style.display = 'none';
        
        // Remove source and reload
        videoSource.src = '';
        video.load();
        
        // Additional stop attempts
        try {
            video.stop && video.stop();
        } catch(e) {}
        
        // Set muted in case audio persists
        video.muted = true;
        
        // Remove tracks if any
        if (video.textTracks) {
            Array.from(video.textTracks).forEach(track => track.mode = 'disabled');
        }
        
        localStorage.setItem('videoPlayed', 'true');
    }

    // Add event listener for when video ends
    video.addEventListener('ended', function() {
        closeModal();
    });

    // Event listeners for close actions
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });
    
    overlay.addEventListener('click', function(e) {
        e.preventDefault();
        closeModal();
    });

    // Close modal with ESC key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            e.preventDefault();
            closeModal();
        }
    });

    // Additional safety check: if modal is hidden but video is playing, stop it
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (modal.style.display === 'none' && !video.paused) {
                closeModal();
            }
        });
    });

    observer.observe(modal, { attributes: true, attributeFilter: ['style'] });
});