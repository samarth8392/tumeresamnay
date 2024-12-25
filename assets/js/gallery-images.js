document.addEventListener('DOMContentLoaded', function() {
    const galleryContainer = document.getElementById('gallery-container');
    
    if (!galleryContainer) {
        console.error('Gallery container not found!');
        return;
    }

    // Get base URL
    const baseUrl = window.location.origin;
    
    // Get configuration from data attributes with fallbacks
    const relativePath = galleryContainer.dataset.folderPath || '/assets/img/elements/';
    const imagePrefix = galleryContainer.dataset.imagePrefix || 'e';
    const imageExtension = (galleryContainer.dataset.imageExtension || '.jpg').toUpperCase();

    
    // Function to create absolute path
    function createAbsolutePath(relativePath) {
        // Remove leading slash if present to avoid double slashes
        const cleanPath = relativePath.startsWith('/') ? relativePath.slice(1) : relativePath;
        return `${baseUrl}/${cleanPath}`;
    }
    
    // Function to create gallery item HTML
    function createGalleryItem(imageNumber) {
        const relativeImagePath = `${relativePath}${imagePrefix}${imageNumber}${imageExtension}`;
        const absoluteImagePath = createAbsolutePath(relativeImagePath);
        return `
            <div class="col-md-4">
                <a href="${absoluteImagePath}" class="img-pop-up">
                    <div class="single-gallery-image" style="background: url('${absoluteImagePath}'); background-size: cover; background-position: center; height: 300px;">
                    </div>
                </a>
            </div>
        `;
    }

    // Function to check if image exists
    async function checkImage(imagePath) {
        try {
            const response = await fetch(imagePath, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            console.error('Error checking image:', imagePath, error);
            return false;
        }
    }

    // Function to load gallery
    async function loadGallery() {
        try {
            console.log('Starting gallery load...'); // Debug log
            
            // Clear existing content
            galleryContainer.innerHTML = '';
            
            // Try loading images from 1 to 20 (adjust max as needed)
            for (let i = 1; i <= 40; i++) {
                const relativeImagePath = `${relativePath}${imagePrefix}${i}${imageExtension}`;
                const absoluteImagePath = createAbsolutePath(relativeImagePath);
                
                console.log('Checking image:', absoluteImagePath); // Debug log
                
                const imageExists = await checkImage(absoluteImagePath);
                
                if (!imageExists) {
                    console.log('Image does not exist:', absoluteImagePath); // Debug log
                    continue;
                }
                
                console.log('Image found:', absoluteImagePath); // Debug log
                galleryContainer.innerHTML += createGalleryItem(i);
            }

            // Initialize Magnific Popup after all images are loaded
            if (typeof $.magnificPopup !== 'undefined') {
                $('.img-pop-up').magnificPopup({
                    type: 'image',
                    gallery: {
                        enabled: true
                    }
                });
            } else {
                console.warn('Magnific Popup not loaded!');
            }
        } catch (error) {
            console.error('Error loading gallery:', error);
        }
    }

    // Start loading the gallery
    loadGallery();
});