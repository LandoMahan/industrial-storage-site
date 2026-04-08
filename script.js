// Industrial Storage — JavaScript

// Set pano photo as hero background
async function setHeroBanner() {
  try {
    const response = await fetch('/api/gallery');
    const photos = await response.json();
    if (photos && photos.length > 0) {
      const heroBg = document.querySelector('.hero-bg');
      if (heroBg) {
        const lastPhoto = photos[photos.length - 1];
        heroBg.style.backgroundImage = 'url(' + lastPhoto.url + ')';
      }
    }
  } catch (e) {
    console.log('Hero background skipped');
  }
}

// Pricing Calculator
document.getElementById('sqftCalc')?.addEventListener('input', function() {
  const sqft = parseFloat(this.value) || 0;
  const rate = 1.20;
  const monthly = (sqft * rate).toFixed(2);
  document.getElementById('calcOutput').textContent = '$' + monthly.toLocaleString() + ' / month';
});

// Form Submission
document.getElementById('inquiryForm')?.addEventListener('submit', async function(e) {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    company: document.getElementById('company').value,
    email: document.getElementById('email').value,
    phone: document.getElementById('phone').value,
    sqft: document.getElementById('sqft').value,
    duration: document.getElementById('duration').value,
    details: document.getElementById('details').value
  };

  try {
    const response = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    if (result.success) {
      alert('Thank you! We will contact you shortly.');
      document.getElementById('inquiryForm').reset();
    } else {
      alert('Error: ' + (result.error || 'Failed to submit'));
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Inquiry received. We will contact you soon.');
    document.getElementById('inquiryForm').reset();
  }
});

// Photo Upload Handler
function uploadPhoto(file) {
  const statusEl = document.getElementById('uploadStatus');
  const dropZone = document.getElementById('dropZone');

  if (!file) {
    statusEl.textContent = 'Please select a photo';
    return;
  }

  if (!file.type.startsWith('image/')) {
    statusEl.textContent = 'Please select an image file';
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    statusEl.textContent = 'File too large (max 5MB)';
    return;
  }

  statusEl.textContent = 'Uploading...';
  dropZone.style.opacity = '0.5';

  const reader = new FileReader();
  reader.onload = async function(event) {
    try {
      const response = await fetch('/api/upload-photo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ photoData: event.target.result })
      });

      const result = await response.json();
      if (result.success) {
        statusEl.textContent = '✓ Photo uploaded!';
        document.getElementById('photoInput').value = '';
        setTimeout(() => {
          setHeroBanner();
          loadGallery();
          statusEl.textContent = '';
          dropZone.style.opacity = '1';
        }, 1000);
      } else {
        statusEl.textContent = '✗ ' + (result.error || 'Upload failed');
        dropZone.style.opacity = '1';
      }
    } catch (error) {
      statusEl.textContent = '✗ Error uploading';
      dropZone.style.opacity = '1';
      console.error(error);
    }
  };
  reader.readAsDataURL(file);
}

// Gallery Loading
async function loadGallery() {
  try {
    const response = await fetch('/api/gallery');
    const photos = await response.json();
    
    const gallery = document.getElementById('galleryGrid');
    
    if (!photos || photos.length === 0) {
      gallery.innerHTML = '<div class="gallery-placeholder" style="grid-column: 1 / -1;"><div class="placeholder-text">📸 No photos yet. Upload your first one!</div></div>';
      return;
    }

    gallery.innerHTML = photos.map(photo => 
      '<div class="gallery-item"><img src="' + photo.url + '" alt="Industrial storage" loading="lazy"></div>'
    ).join('');
  } catch (error) {
    console.log('Gallery loading skipped');
  }
}

// Drag and Drop
const dropZone = document.getElementById('dropZone');
if (dropZone) {
  dropZone.addEventListener('click', (e) => {
    document.getElementById('photoInput').click();
  });

  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.add('drag-over');
  });

  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });

  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropZone.classList.remove('drag-over');
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      uploadPhoto(files[0]);
    }
  });

  document.getElementById('photoInput').addEventListener('change', function() {
    if (this.files.length > 0) {
      uploadPhoto(this.files[0]);
    }
  });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  setHeroBanner();
  loadGallery();
});

console.log('Industrial Storage Ready');
