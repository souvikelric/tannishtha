// Tannistha's Birthday Interactive Album Script

document.addEventListener('DOMContentLoaded', () => {

  // Default images array
  const defaultImages = [
    {
      id: 1,
      src: 'image1.jpeg',
      caption: 'Tannistha ✨',
      note: 'Wishing you a year filled with warmth, endless laughter, and pure happiness! 💕',
      date: 'Aug 2026'
    },
    {
      id: 2,
      src: 'image2.jpeg',
      caption: 'Golden Moments 🌟',
      note: 'May all your brightest dreams and wishes come true today and always! 🎂',
      date: 'Aug 2026'
    },
    {
      id: 3,
      src: 'image3.jpeg',
      caption: 'Sweet Memories 📸',
      note: 'Every picture tells a story of the joy you bring to everyone around you! 🥳',
      date: 'Aug 2026'
    },
    {
      id: 4,
      src: 'image4.jpeg',
      caption: 'Shine Bright 💎',
      note: 'Cheers to another fantastic chapter around the sun! Keep glowing! 🌟',
      date: 'Aug 2026'
    },
    {
      id: 5,
      src: 'image5.jpeg',
      caption: 'Happy Birthday! 🎉',
      note: 'Stay wonderful, stay happy, and enjoy your super special day! 🎁✨',
      date: 'Aug 2026',
      objectPosition: 'center bottom'
    },
    {
      id: 6,
      src: 'image6.jpeg',
      caption: 'Pure Smiles 😊',
      note: 'Creating unforgettable memories one smile at a time! 💕',
      date: 'Aug 2026',
      objectPosition: 'center bottom'
    },
    {
      id: 7,
      src: 'image7.jpeg',
      caption: 'Unforgettable 🌈',
      note: 'Sending you oceans of love, joy, and laughter on your birthday! 🎈',
      date: 'Aug 2026'
    },
    {
      id: 8,
      src: 'image8.jpeg',
      caption: 'Celebration Time 🥳',
      note: 'Pop the confetti and celebrate the amazing person you are! ✨',
      date: 'Aug 2026'
    },
    {
      id: 9,
      src: 'image9.jpeg',
      caption: 'Radiant Glow 💖',
      note: 'May your day be as bright and beautiful as your spirit! 🌟',
      date: 'Aug 2026'
    },
    {
      id: 10,
      src: 'image10.jpeg',
      caption: 'Forever Special 💝',
      note: 'Wishing you endless happiness, good health, and success always! 🎂',
      date: 'Aug 2026'
    },
    {
      id: 11,
      src: 'image11.jpeg',
      caption: 'Cherished Times 🌸',
      note: 'Another beautiful memory to treasure forever! 💕',
      date: 'Aug 2026'
    },
    {
      id: 12,
      src: 'image12.jpeg',
      caption: 'Pure Magic ✨',
      note: 'May your year ahead be filled with magical moments & adventures! 🎁',
      date: 'Aug 2026'
    },
    {
      id: 13,
      src: 'image13.jpeg',
      caption: 'Best Wishes 💖',
      note: 'Wishing you the happiest of birthdays surrounded by love! 🎂',
      date: 'Aug 2026'
    },
    {
      id: 14,
      src: 'image14.jpeg',
      caption: 'Always Glowing 🌟',
      note: 'Keep spreading your joyful light everywhere you go! 🎈',
      date: 'Aug 2026'
    }
  ];

  let photos = [...defaultImages];
  let currentLayout = 'pile'; // 'pile', 'scatter', 'grid', 'fan'
  let activeZIndex = 10;
  let audioContext = null;
  let isPlayingAudio = false;

  // DOM Elements
  const stage = document.getElementById('stage');
  const modal = document.getElementById('modal');
  const modalImg = document.getElementById('modal-img');
  const modalTitle = document.getElementById('modal-title');
  const modalNoteInput = document.getElementById('modal-note-input');
  const modalClose = document.getElementById('modal-close');
  const modalSaveBtn = document.getElementById('modal-save-btn');
  const toast = document.getElementById('toast');
  const canvas = document.getElementById('confetti-canvas');
  const ctx = canvas.getContext('2d');
  const fileInput = document.getElementById('file-input');

  // Toolbar buttons
  const btnPile = document.getElementById('btn-mode-pile');
  const btnScatter = document.getElementById('btn-mode-scatter');
  const btnGrid = document.getElementById('btn-mode-grid');
  const btnFan = document.getElementById('btn-mode-fan');
  const btnShuffle = document.getElementById('btn-shuffle');
  const btnConfetti = document.getElementById('btn-confetti');
  const btnAudio = document.getElementById('btn-audio');
  const audioIcon = document.getElementById('audio-icon');
  const btnAdd = document.getElementById('btn-add');

  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');
  const modalCounter = document.getElementById('modal-counter');
  let activePhotoIdForModal = null;
  let currentModalIndex = 0;

  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // Helper: Toast notice
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2800);
  }

  // Generate random float between min and max
  function getRandom(min, max) {
    return Math.random() * (max - min) + min;
  }

  // Create photo cards in DOM
  function renderPhotos() {
    stage.innerHTML = '';
    
    photos.forEach((photo, index) => {
      const card = document.createElement('div');
      card.className = 'photo-card';
      card.dataset.id = photo.id;
      card.dataset.index = index;

      // Assign initial random rotation between -10deg and +10deg for stack pile requirement
      const randomRot = getRandom(-10, 10);
      card.dataset.rot = randomRot;

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-front">
            <div class="img-container">
              <img src="${photo.src}" alt="${photo.caption}" loading="eager" style="object-position: ${photo.objectPosition || 'center 15%'};">
            </div>
            <div class="card-caption">
              <span class="caption-text">${photo.caption}</span>
              <div class="card-actions">
                <button class="action-btn btn-flip" title="Flip Card"><i class="fa-solid fa-rotate"></i></button>
                <button class="action-btn btn-zoom" title="Zoom & Edit"><i class="fa-solid fa-expand"></i></button>
              </div>
            </div>
          </div>
          <div class="card-back">
            <div class="back-header">
              <span class="stamp">Birthday Wish</span>
              <span style="font-size: 0.75rem; color: #999;">${photo.date}</span>
            </div>
            <div class="back-content">
              <p class="note-text">${photo.note}</p>
            </div>
            <div class="back-footer">
              <span>For Tannistha 💕</span>
              <button class="flip-back-btn">Flip Photo</button>
            </div>
          </div>
        </div>
      `;

      stage.appendChild(card);

      // Attach pointer events for dragging
      setupCardInteractivity(card);
    });

    // Apply current layout positions
    applyLayout(currentLayout);
  }

  // Position cards based on layout mode
  function applyLayout(mode) {
    currentLayout = mode;
    const cards = Array.from(document.querySelectorAll('.photo-card'));
    const total = cards.length;
    const stageWidth = stage.clientWidth;
    const stageHeight = stage.clientHeight;

    // Update active toolbar button
    [btnPile, btnScatter, btnGrid, btnFan].forEach(btn => btn.classList.remove('active'));
    if (mode === 'pile') btnPile.classList.add('active');
    if (mode === 'scatter') btnScatter.classList.add('active');
    if (mode === 'grid') btnGrid.classList.add('active');
    if (mode === 'fan') btnFan.classList.add('active');

    cards.forEach((card, i) => {
      card.classList.remove('is-flipped');
      let x = 0;
      let y = 0;
      let rot = parseFloat(card.dataset.rot) || getRandom(-10, 10);
      let zIndex = i + 1;

      if (mode === 'pile') {
        // Stacked neatly in center with random rotation between -10 to 10 deg
        const offsetX = getRandom(-12, 12);
        const offsetY = getRandom(-12, 12);
        rot = getRandom(-10, 10);
        card.dataset.rot = rot;
        x = offsetX;
        y = offsetY;
        zIndex = total - i; // top card has highest z-index
      } else if (mode === 'scatter') {
        // Randomly scattered across the stage
        const padding = 150;
        const maxX = Math.max(100, (stageWidth / 2) - padding);
        const maxY = Math.max(100, (stageHeight / 2) - padding);
        x = getRandom(-maxX, maxX);
        y = getRandom(-maxY, maxY);
        rot = getRandom(-22, 22);
      } else if (mode === 'grid') {
        // Arranged in grid formation
        const cols = window.innerWidth < 640 ? 2 : 3;
        const colWidth = window.innerWidth < 640 ? 140 : 220;
        const rowHeight = window.innerWidth < 640 ? 180 : 250;
        const col = i % cols;
        const row = Math.floor(i / cols);
        const gridTotalWidth = (cols - 1) * colWidth;
        const rowsCount = Math.ceil(total / cols);
        const gridTotalHeight = (rowsCount - 1) * rowHeight;
        
        x = (col * colWidth) - (gridTotalWidth / 2);
        y = (row * rowHeight) - (gridTotalHeight / 2);
        rot = (i % 2 === 0 ? 3 : -3);
      } else if (mode === 'fan') {
        // Arranged in card arc fan
        const angleSpread = 40; // total spread angle
        const angleStep = total > 1 ? angleSpread / (total - 1) : 0;
        const startAngle = -angleSpread / 2;
        rot = startAngle + (i * angleStep);
        const radius = 400;
        const rad = (rot * Math.PI) / 180;
        x = Math.sin(rad) * radius * 0.4;
        y = (1 - Math.cos(rad)) * radius * 0.25;
      }

      card.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
      card.style.zIndex = zIndex;
      card.dataset.x = x;
      card.dataset.y = y;
      card.dataset.currentRot = rot;
    });

    activeZIndex = total + 10;
  }

  // Interactivity Setup (Drag, Click, Flip, Cycling)
  function setupCardInteractivity(card) {
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let currentX = parseFloat(card.dataset.x) || 0;
    let currentY = parseFloat(card.dataset.y) || 0;
    let dragThreshold = 5;
    let movedDistance = 0;

    const flipBtn = card.querySelector('.btn-flip');
    const flipBackBtn = card.querySelector('.flip-back-btn');
    const zoomBtn = card.querySelector('.btn-zoom');

    // Flip Card Action
    function toggleFlip(e) {
      if (e) e.stopPropagation();
      card.classList.toggle('is-flipped');
    }

    if (flipBtn) flipBtn.addEventListener('click', toggleFlip);
    if (flipBackBtn) flipBackBtn.addEventListener('click', toggleFlip);

    // Zoom / Detail Action
    if (zoomBtn) {
      zoomBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = parseInt(card.dataset.id);
        openModal(id);
      });
    }

    // Pointer Down (Mouse or Touch)
    function onPointerDown(e) {
      if (e.target.closest('.action-btn') || e.target.closest('.flip-back-btn')) return;

      isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
      movedDistance = 0;

      // Bring to top of stack
      activeZIndex++;
      card.style.zIndex = activeZIndex;
      card.classList.add('is-dragging');

      currentX = parseFloat(card.dataset.x) || 0;
      currentY = parseFloat(card.dataset.y) || 0;

      window.addEventListener('pointermove', onPointerMove);
      window.addEventListener('pointerup', onPointerUp);
    }

    function onPointerMove(e) {
      if (!isDragging) return;

      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;
      movedDistance = Math.hypot(deltaX, deltaY);

      const newX = currentX + deltaX;
      const newY = currentY + deltaY;
      const rot = parseFloat(card.dataset.currentRot) || parseFloat(card.dataset.rot) || 0;

      card.style.transform = `translate(${newX}px, ${newY}px) rotate(${rot}deg) scale(1.05)`;
    }

    function onPointerUp(e) {
      if (!isDragging) return;
      isDragging = false;
      card.classList.remove('is-dragging');

      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      const clientX = e.clientX || (e.changedTouches && e.changedTouches[0].clientX) || startX;
      const clientY = e.clientY || (e.changedTouches && e.changedTouches[0].clientY) || startY;

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const newX = currentX + deltaX;
      const newY = currentY + deltaY;
      const rot = parseFloat(card.dataset.currentRot) || parseFloat(card.dataset.rot) || 0;

      card.dataset.x = newX;
      card.dataset.y = newY;
      card.style.transform = `translate(${newX}px, ${newY}px) rotate(${rot}deg)`;

      // If clicked without significant dragging in pile mode, send top photo to back of pile
      if (movedDistance < dragThreshold && currentLayout === 'pile') {
        // Send to back of stack
        const cards = Array.from(document.querySelectorAll('.photo-card'));
        let minZ = Math.min(...cards.map(c => parseInt(c.style.zIndex) || 0));
        card.style.zIndex = Math.max(1, minZ - 1);
        
        // Give a slight bounce rotation animation
        const newRot = getRandom(-10, 10);
        card.dataset.rot = newRot;
        card.dataset.currentRot = newRot;
        card.style.transform = `translate(${getRandom(-10, 10)}px, ${getRandom(-10, 10)}px) rotate(${newRot}deg)`;
      }
    }

    card.addEventListener('pointerdown', onPointerDown);
  }

  // Shuffle Stack Function
  function shuffleStack() {
    // Reorder photos array randomly
    photos = photos.sort(() => Math.random() - 0.5);
    renderPhotos();
    triggerConfettiBurst();
    showToast('Shuffled photo stack! 🎲');
  }

  const hintPointer = document.getElementById('hint-pointer');
  let hasShownHint = false;

  function showCinematicHint() {
    if (hasShownHint || !hintPointer) return;

    const cards = Array.from(document.querySelectorAll('.photo-card'));
    if (cards.length === 0) return;

    // Top card has highest z-index
    const topCard = cards.reduce((prev, current) => {
      return (parseInt(current.style.zIndex) || 0) > (parseInt(prev.style.zIndex) || 0) ? current : prev;
    });

    const zoomBtn = topCard.querySelector('.btn-zoom');
    if (!zoomBtn) return;

    zoomBtn.classList.add('pulse-hint');

    // Make visible temporarily to measure width accurately
    hintPointer.style.display = 'flex';
    const hintWidth = hintPointer.offsetWidth || 210;
    const rect = zoomBtn.getBoundingClientRect();

    // Clamp left coordinate so hint NEVER exceeds mobile viewport boundaries
    let targetLeft = rect.left + (rect.width / 2) - (hintWidth / 2);
    const minLeft = 12;
    const maxLeft = Math.max(12, window.innerWidth - hintWidth - 12);
    targetLeft = Math.max(minLeft, Math.min(targetLeft, maxLeft));

    let targetTop = rect.top - 65;
    if (targetTop < 15) {
      targetTop = rect.bottom + 15;
    }

    hintPointer.style.left = `${targetLeft}px`;
    hintPointer.style.top = `${targetTop}px`;
    hintPointer.classList.add('show');

    hasShownHint = true;
    setTimeout(dismissCinematicHint, 8500);
  }

  function dismissCinematicHint() {
    if (hintPointer) {
      hintPointer.classList.remove('show');
    }
    const pulsingBtn = document.querySelector('.btn-zoom.pulse-hint');
    if (pulsingBtn) {
      pulsingBtn.classList.remove('pulse-hint');
    }
  }

  // Lightbox Modal Functions
  function openModal(id) {
    dismissCinematicHint();
    const index = photos.findIndex(p => p.id === id);
    if (index === -1) return;

    currentModalIndex = index;
    updateModalContent();
    modal.classList.add('active');
  }

  function updateModalContent() {
    const photo = photos[currentModalIndex];
    if (!photo) return;

    activePhotoIdForModal = photo.id;
    modalImg.src = photo.src;
    modalImg.style.objectPosition = photo.objectPosition || 'center 15%';
    modalTitle.textContent = photo.caption;
    modalNoteInput.value = photo.note;
    if (modalCounter) {
      modalCounter.textContent = `Photo ${currentModalIndex + 1} of ${photos.length}`;
    }
  }

  function saveCurrentModalNoteSilently() {
    if (activePhotoIdForModal !== null) {
      const photo = photos.find(p => p.id === activePhotoIdForModal);
      if (photo && modalNoteInput) {
        photo.note = modalNoteInput.value.trim() || photo.note;
        const card = document.querySelector(`.photo-card[data-id="${photo.id}"] .note-text`);
        if (card) card.textContent = photo.note;
      }
    }
  }

  function navigateModal(direction) {
    if (photos.length === 0) return;
    saveCurrentModalNoteSilently();
    currentModalIndex = (currentModalIndex + direction + photos.length) % photos.length;
    updateModalContent();
  }

  function closeModal() {
    saveCurrentModalNoteSilently();
    modal.classList.remove('active');
    activePhotoIdForModal = null;
  }

  if (modalPrevBtn) modalPrevBtn.addEventListener('click', () => navigateModal(-1));
  if (modalNextBtn) modalNextBtn.addEventListener('click', () => navigateModal(1));

  window.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'ArrowLeft') {
      navigateModal(-1);
    } else if (e.key === 'ArrowRight') {
      navigateModal(1);
    } else if (e.key === 'Escape') {
      closeModal();
    }
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  modalSaveBtn.addEventListener('click', () => {
    saveCurrentModalNoteSilently();
    showToast('Updated birthday note! 📝');
    closeModal();
  });

  // Custom Image Upload Handler
  btnAdd.addEventListener('click', () => fileInput.click());
  fileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    files.forEach((file, index) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newPhoto = {
          id: Date.now() + index,
          src: event.target.result,
          caption: file.name.split('.')[0] || 'Memory',
          note: 'A happy birthday memory added with love! 💕',
          date: 'Aug 2026'
        };
        photos.unshift(newPhoto);
        renderPhotos();
        showToast('Added new photograph! 📸');
      };
      reader.readAsDataURL(file);
    });
  });

  // Confetti Particle Engine (Continuous Mode)
  let confettiParticles = [];
  const maxContinuousParticles = 80;

  function createConfettiParticle(isInitial = false) {
    const colors = ['#ff4d6d', '#ffd166', '#a259ff', '#4cc9f0', '#06d6a0', '#ff85a1'];
    const shapes = ['circle', 'square', 'heart', 'star'];
    return {
      x: getRandom(0, canvas.width),
      y: isInitial ? getRandom(0, canvas.height) : getRandom(-60, -10),
      size: getRandom(6, 14),
      color: colors[Math.floor(Math.random() * colors.length)],
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      speedY: getRandom(1.5, 4.5),
      speedX: getRandom(-1.5, 1.5),
      rotation: getRandom(0, 360),
      rotationSpeed: getRandom(-3, 3)
    };
  }

  // Seed initial continuous confetti pool across screen height
  for (let i = 0; i < maxContinuousParticles; i++) {
    confettiParticles.push(createConfettiParticle(true));
  }

  function triggerConfettiBurst() {
    for (let i = 0; i < 60; i++) {
      confettiParticles.push(createConfettiParticle(false));
    }
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Maintain minimum continuous density
    while (confettiParticles.length < maxContinuousParticles) {
      confettiParticles.push(createConfettiParticle(false));
    }

    confettiParticles.forEach((p, index) => {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotationSpeed;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.fillStyle = p.color;

      if (p.shape === 'circle') {
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fill();
      } else if (p.shape === 'heart') {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(-p.size / 2, -p.size / 2, -p.size, p.size / 3, 0, p.size);
        ctx.bezierCurveTo(p.size, p.size / 3, p.size / 2, -p.size / 2, 0, 0);
        ctx.fill();
      } else {
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      }

      ctx.restore();

      // Recalculate/reset particles that go off-screen for endless continuous effect
      if (p.y > canvas.height + 20) {
        if (confettiParticles.length > maxContinuousParticles) {
          confettiParticles.splice(index, 1);
        } else {
          // Reset particle to top
          const newP = createConfettiParticle(false);
          p.x = newP.x;
          p.y = newP.y;
          p.speedY = newP.speedY;
          p.speedX = newP.speedX;
          p.color = newP.color;
          p.shape = newP.shape;
        }
      }
    });

    requestAnimationFrame(animateConfetti);
  }

  animateConfetti();

  // Audio & Video Players: Cover Video (mha1.mp4), Cover Music (mha.mov) & Album Background Music (Hb2.mp3)
  const coverVideo = document.getElementById('cover-video');
  const coverMusic = document.getElementById('cover-music');
  const bgMusic = document.getElementById('bg-music');
  let isCoverActive = true;

  if (coverVideo) {
    coverVideo.muted = true;
    coverVideo.play().catch(err => {
      console.warn('Cover video initial play issue:', err);
    });
  }

  if (coverMusic) {
    coverMusic.volume = 0.85;
  }
  if (bgMusic) {
    bgMusic.volume = 0.75;
    bgMusic.addEventListener('error', () => {
      if (bgMusic.src.includes('Hb2.mp3')) {
        bgMusic.src = 'hb2.mp3';
      } else if (bgMusic.src.includes('hb2.mp3')) {
        bgMusic.src = 'hb.mp3';
      }
    });
  }

  const soundNotice = document.getElementById('sound-notice');

  function startCoverMedia() {
    if (!isCoverActive) return;
    if (coverVideo && coverVideo.paused) {
      coverVideo.muted = true;
      coverVideo.play().catch(() => {});
    }
    if (coverMusic && coverMusic.paused) {
      coverMusic.play().then(() => {
        if (soundNotice) soundNotice.style.opacity = '0';
      }).catch(err => {
        console.warn('Cover initial autoplay blocked on mobile:', err);
        if (soundNotice) soundNotice.style.opacity = '1';
      });
    }
  }

  // Attempt playing cover media on load
  startCoverMedia();

  // Mobile autoplay unlock: listen for any touch, tap, click, or scroll gesture anywhere
  const unlockAudioOnFirstInteraction = () => {
    if (isCoverActive) {
      startCoverMedia();
    }
  };
  ['touchstart', 'touchend', 'pointerdown', 'click', 'scroll'].forEach(evt => {
    window.addEventListener(evt, unlockAudioOnFirstInteraction, { once: true });
  });

  function updateAudioUI(isPlaying) {
    if (isPlaying) {
      audioIcon.className = 'fa-solid fa-volume-high';
      btnAudio.classList.add('active');
    } else {
      audioIcon.className = 'fa-solid fa-volume-xmark';
      btnAudio.classList.remove('active');
    }
  }

  function startAlbumMusic() {
    if (!bgMusic) return;
    // Stop cover media if still playing
    if (coverVideo) {
      coverVideo.pause();
    }
    if (coverMusic) {
      coverMusic.pause();
      coverMusic.currentTime = 0;
    }
    bgMusic.play().then(() => {
      isPlayingAudio = true;
      updateAudioUI(true);
    }).catch(err => {
      console.warn('Album music play error:', err);
      updateAudioUI(false);
    });
  }

  function toggleAudio() {
    if (!bgMusic) return;

    if (!bgMusic.paused) {
      bgMusic.pause();
      isPlayingAudio = false;
      updateAudioUI(false);
      showToast('Birthday Music Muted 🔇');
    } else {
      bgMusic.play().then(() => {
        isPlayingAudio = true;
        updateAudioUI(true);
        showToast('Playing Birthday Track 🎵✨');
      }).catch(err => {
        console.warn('Audio play error:', err);
        showToast('Click Music button to play track 🎵');
      });
    }
  }

  // Event Listeners for Toolbar Mode Switching & Controls
  btnPile.addEventListener('click', () => {
    applyLayout('pile');
    showToast('Mode: Stacked Photo Pile 📚');
  });

  btnScatter.addEventListener('click', () => {
    applyLayout('scatter');
    showToast('Mode: Scattered Tabletop 🖼️');
  });

  btnGrid.addEventListener('click', () => {
    applyLayout('grid');
    showToast('Mode: Neat Grid Gallery 📐');
  });

  btnFan.addEventListener('click', () => {
    applyLayout('fan');
    showToast('Mode: Memory Arc Fan 🪭');
  });

  btnShuffle.addEventListener('click', shuffleStack);
  btnConfetti.addEventListener('click', () => {
    triggerConfettiBurst();
    showToast('Happy Birthday Tannistha! 🎉✨');
  });
  btnAudio.addEventListener('click', toggleAudio);

  // Cover Overlay 3D Page Flip Transition
  const coverOverlay = document.getElementById('cover-overlay');
  const coverNextBtn = document.getElementById('cover-next-btn');

  if (coverNextBtn && coverOverlay) {
    coverNextBtn.addEventListener('click', () => {
      isCoverActive = false;

      // 3D Page flip exit animation
      coverOverlay.classList.add('page-flip-exit');

      // Stop cover music (mha.mov) and start main album music (Hb2.mp3)
      startAlbumMusic();

      // Trigger festive celebration burst of confetti
      triggerConfettiBurst();

      showToast('Welcome to Tannistha\'s Birthday Album! 🎂✨');

      // Hide cover overlay DOM after transition completes and show cinematic mode hint
      setTimeout(() => {
        coverOverlay.style.display = 'none';
        showCinematicHint();
      }, 1200);
    });
  }

  // Initialize photo album
  renderPhotos();
});
