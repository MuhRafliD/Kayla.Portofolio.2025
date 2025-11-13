/* --- Tahap 1: Logika untuk Event Listener --- */
document.addEventListener("DOMContentLoaded", function() {
    
  // 1. Mengurus tombol 'Explore'
  const exploreButton = document.getElementById("explore-btn");
  if (exploreButton) {
    exploreButton.addEventListener("click", function() {
      document.getElementById("projects").scrollIntoView({ behavior: "smooth" });
    });
  }

  // 2. Mengurus penutup modal saat klik area gelap
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.addEventListener("click", function(event) {
      // Jika yang diklik adalah 'modal' (latar belakang gelap), tutup
      if (event.target.id === "projectModal") {
        closeModal();
      }
    });
  }

  // 3. Mengurus Animasi Hero Icon
  const iconContainer = document.getElementById("icon-container");
  if (iconContainer) {
    iconContainer.addEventListener("click", function() {
    iconContainer.classList.toggle("is-spread");
    });
  }
});

// Data untuk modal/carousel - UPDATED: Cover untuk card, isi untuk carousel
const projectData = {
    1: {
        title: "Website Layout",
        description: "Modern responsive web design with clean aesthetics and optimal user experience. Focused on creating intuitive user interfaces that are both beautiful and functional across all devices.",
        tags: ["Web Design", "UI/UX", "Figma", "Responsive"],
        images: [
            "image/poster2.png",
            "image/poster cover.png", // backup jika butuh gambar tambahan
        ],
        link: "#"
    },
    2: {
        title: "Booklet Teh",
        description: "Creative booklet design showcasing traditional tea culture with modern layout approach. Combining cultural elements with contemporary design principles for an engaging reading experience.",
        tags: ["Graphic Design", "Branding", "Illustration", "Print"],
        images: [
            "image/teh booklet.png",
            "image/teh booklet 2.png",
        ],
        link: "#"
    },
    3: {
        title: "Redesign Packaging Buavita",
        description: "Complete packaging overhaul for Buavita to appeal to younger, health-conscious demographic. Fresh color schemes and modern typography while maintaining brand recognition.",
        tags: ["Packaging Design", "Branding", "Print", "3D Mockup"],
        images: [
            "image/buavita 1.png",
            "image/buavita 2.png",
        ],
        link: "#"
    },
    4: {
        title: "Redesign Logo Ibis",
        description: "Sophisticated logo redesign for Ibis hotel chain reflecting modern hospitality and luxury. Creating a timeless identity that works across various applications and media.",
        tags: ["Logo Design", "Branding", "Identity", "Vector"],
        images: [
            "image/ibis copy.png",
        ],
        link: "#"
    },
    5: {
        title: "3D Animation",
        description: "Stylized 3D animation showcasing character modeling and environment design. Bringing imaginative concepts to life through detailed modeling and smooth animation techniques.",
        tags: ["3D Modeling", "Animation", "Blender", "Rendering"],
        images: [
            "image/3D ILLUSTRATION -10.png",
            "image/aset.png",
        ],
        link: "#"
    },
    6: {
        title: "Mural Digital Illustration",
        description: "Large-scale digital mural blending traditional and modern illustration techniques. Created for public spaces with vibrant colors and engaging visual storytelling.",
        tags: ["Illustration", "Digital Art", "Mural", "Procreate"],
        images: [
            "image/mural.png", // Mural tidak ada cover, jadi pakai yang sama
        ],
        link: "#"
    }
};

// Ambil elemen-elemen modal satu kali
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescriptionText = document.getElementById('modalDescriptionText');
const modalTags = document.getElementById('modalTags');
const modalLink = document.getElementById('modalLink');
const carouselTrack = document.getElementById('carouselTrack');

let currentProject;
let currentSlideIndex = 0;

/**
 * Membuka modal dan memuat data proyek.
 */
function openModal(projectId) {
    currentProject = projectData[projectId];
    if (!currentProject) return;

    // Update konten teks
    modalTitle.textContent = currentProject.title;
    modalDescriptionText.textContent = currentProject.description;
    modalLink.href = currentProject.link;

    // Update tags
    modalTags.innerHTML = '';
    currentProject.tags.forEach(tag => {
        const tagSpan = document.createElement('span');
        tagSpan.className = 'tag';
        tagSpan.textContent = tag;
        modalTags.appendChild(tagSpan);
    });

    // Inisialisasi carousel
    loadCarouselImages();
    currentSlideIndex = 0;
    updateCarousel();

    // Tampilkan modal
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
}

/**
 * Menutup modal.
 */
function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
}

/**
 * Membuat elemen gambar untuk carousel.
 */
function loadCarouselImages() {
    carouselTrack.innerHTML = '';
    
    currentProject.images.forEach((src, index) => {
        const imageContainer = document.createElement('div');
        imageContainer.className = 'carousel-slide';

        const img = document.createElement('img');
        img.src = src;
        img.alt = `Project Image ${index + 1}`;
        img.className = 'carousel-image';
        
        imageContainer.appendChild(img);
        carouselTrack.appendChild(imageContainer);
    });

    carouselTrack.style.width = `${currentProject.images.length * 100}%`;
}

/**
 * Mengganti slide.
 */
function changeSlide(n) {
    currentSlideIndex += n;
    const totalSlides = currentProject.images.length;
    
    if (currentSlideIndex >= totalSlides) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = totalSlides - 1;
    }
    
    updateCarousel();
}

/**
 * Update posisi visual carousel.
 */
function updateCarousel() {
    const translateValue = -currentSlideIndex * (100 / currentProject.images.length);
    carouselTrack.style.transform = `translateX(${translateValue}%)`;
}

// Listener untuk 'Escape' key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
        closeModal();
    }
});