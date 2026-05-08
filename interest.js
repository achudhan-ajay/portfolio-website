/* ============================================================
   INTEREST SECTION — Interactive Modules
   Books · Games · Movies · Music
   ============================================================ */

// ── Popup Management ──────────────────────────────────────
function openInterestPopup(id) {
  document.querySelectorAll('.int-overlay').forEach(el => el.classList.remove('open'));
  const overlay = document.getElementById('popup-' + id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  if (id === 'movies') updateMovieDisplay();
  if (id === 'books')  showBook(0);
  if (id === 'music')  loadSpotify();
}

function closeInterestPopup() {
  document.querySelectorAll('.int-overlay').forEach(el => el.classList.remove('open'));
  document.body.style.overflow = '';
}

document.addEventListener('click', e => {
  if (e.target.classList.contains('int-overlay')) closeInterestPopup();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeInterestPopup();
});

// ── BOOKS ─────────────────────────────────────────────────
const BOOKS = [
  {
    title: 'The Design of Everyday Things',
    author: 'Don Norman', year: '1988',
    desc: 'A masterclass in how design shapes human interaction. Norman explains why some products frustrate and others delight — through concepts like affordances, signifiers, and feedback loops. This book permanently changed how I see every object I interact with.'
  },
  {
    title: "Don't Make Me Think",
    author: 'Steve Krug', year: '2000',
    desc: 'The bible of web usability. Krug argues great design is self-evident — users shouldn\'t have to think. Packed with practical examples on navigation, layout, and the value of user testing. A fast read with lifelong impact.'
  },
  {
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman', year: '2011',
    desc: 'Kahneman reveals two systems of thought: fast, intuitive System 1 and slow, deliberate System 2. Understanding these helps designers create products that align with how people actually make decisions — not how we assume they do.'
  },
  {
    title: 'Hooked',
    author: 'Nir Eyal', year: '2014',
    desc: 'A framework for building habit-forming products using the Hook Model: Trigger → Action → Variable Reward → Investment. Eye-opening for understanding why certain apps are impossible to put down, and how to design that ethically.'
  },
  {
    title: 'Sprint',
    author: 'Jake Knapp', year: '2016',
    desc: 'Google Ventures\' method for solving design challenges in 5 days — from mapping the problem on Monday to user testing on Friday. I\'ve applied the sprint framework on real projects and it consistently cuts through overthinking.'
  },
  {
    title: 'Creative Confidence',
    author: 'Tom & David Kelley', year: '2013',
    desc: 'The IDEO founders argue creativity isn\'t a gift — it\'s a skill anyone can build. Through stories of people who found their creative voice, they show how to overcome fear of judgment and learn to prototype boldly.'
  }
];

function showBook(idx) {
  const b = BOOKS[idx];
  document.getElementById('book-title').textContent  = b.title;
  document.getElementById('book-author').textContent = b.author + ' · ' + b.year;
  document.getElementById('book-desc').textContent   = b.desc;
  document.querySelectorAll('.book-item').forEach((el, i) =>
    el.classList.toggle('active', i === idx));
}

// ── MOVIES (TV MODULE ON-CARD) ────────────────────────────
const TV_GIFS = [
  'Media/Gifs/Ingloriesbasters.gif',
  'Media/Gifs/distort-distorted.gif',
  'Media/Gifs/django-django-unchained.gif',
  'Media/Gifs/eternal-sunshine-of-the-spotless-mind-eternalsunshine.gif',
  'Media/Gifs/fallen-angels-charlie.gif',
  'Media/Gifs/fallen-angels.gif',
  'Media/Gifs/hamnet-2025.gif',
  'Media/Gifs/miles-morales-swing.gif',
  'Media/Gifs/once-upon-a-time-in-hollywood-cliff-booth.gif',
  'Media/Gifs/travis-bickle-taxi-driver.gif'
];
let tvOn = true;
let tvIndex = 0;
let tvTimer = null;

function updateTvScreen() {
  const img = document.getElementById('tv-screen-img');
  const pBtn = document.getElementById('tv-btn-power');
  if (!img) return;
  if (!tvOn) {
    img.src = 'Media/Gifs/TV (OFF).png';
    if(pBtn) pBtn.classList.remove('on');
  } else {
    img.src = TV_GIFS[tvIndex];
    if(pBtn) pBtn.classList.add('on');
  }
}

function startTvTimer() {
  if (tvTimer) clearInterval(tvTimer);
  if (tvOn) {
    tvTimer = setInterval(() => {
      tvIndex = (tvIndex + 1) % TV_GIFS.length;
      updateTvScreen();
    }, 4000);
  }
}

window.toggleTvPower = function() {
  tvOn = !tvOn;
  updateTvScreen();
  startTvTimer();
};

window.prevTvGif = function() {
  if (!tvOn) return;
  tvIndex = (tvIndex - 1 + TV_GIFS.length) % TV_GIFS.length;
  updateTvScreen();
  startTvTimer();
};

window.nextTvGif = function() {
  if (!tvOn) return;
  tvIndex = (tvIndex + 1) % TV_GIFS.length;
  updateTvScreen();
  startTvTimer();
};

// Start the TV loop automatically
updateTvScreen();
startTvTimer();

// ── MUSIC (IPOD ON-CARD) ──────────────────────────────────
let ipodMenuOpen = false;
let spotifyController = null;
let isPlaying = false;

// Hardcoded tracks from Spotify Playlist "My Playlist"
const IPOD_SONGS = [
  { title: "The War Cry", artist: "Jakes Bejoy", cover: "https://i.scdn.co/image/ab67616d0000485110e69c764a5fd27d032bee6b", uri: "spotify:track:48jW3xdddYmgBZrBM4k2cR" },
  { title: "Wind", artist: "Akeboshi", cover: "https://i.scdn.co/image/ab67616d0000485119ccf9d983d109bbb710e3b8", uri: "spotify:track:5BqKtuCFLfZyzfZOwlgW1f" },
  { title: "Eeyyam Pattu", artist: "Shanka Tribe", cover: "https://i.scdn.co/image/ab67616d0000485100343d16b0b56f1116a406d9", uri: "spotify:track:7jjcZqtCpP3HQ4RkIiiG0X" },
  { title: "Lady Lady", artist: "Olivia Dean", cover: "https://i.scdn.co/image/ab67616d00004851567808375ab783974642afd0", uri: "spotify:track:1XwbJNPOcLuSRTQNR9zz4r" }
];
let fakeIndex = 0;

function renderIpodScreen() {
  const playView = document.getElementById('ipod-play-view');
  const menuView = document.getElementById('ipod-menu-view');
  if (!playView || !menuView) return;

  if (ipodMenuOpen) {
    playView.style.display = 'none';
    menuView.style.display = 'flex';
    const list = document.getElementById('ipod-menu-list');
    list.innerHTML = IPOD_SONGS.map((s, i) => `
      <div style="font-size:8px; padding:3px 2px; color:${i === fakeIndex ? '#fa7a30' : '#444'}; font-weight:${i === fakeIndex ? 'bold' : 'normal'}; cursor:pointer;" onclick="selectIpodSong(${i})">
        ${i === fakeIndex && isPlaying ? '▶ ' : ''}${s.title}
      </div>
    `).join('');
  } else {
    menuView.style.display = 'none';
    playView.style.display = 'flex';
    
    document.getElementById('ipod-song-title').textContent = IPOD_SONGS[fakeIndex].title;
    document.getElementById('ipod-song-artist').textContent = IPOD_SONGS[fakeIndex].artist;
    const artImg = document.getElementById('ipod-art-img');
    if (artImg) artImg.src = IPOD_SONGS[fakeIndex].cover;
    
    const playIcon = document.getElementById('ipod-play-icon');
    if (playIcon) {
       playIcon.innerHTML = isPlaying 
         ? '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" fill="#5a6270"/>'
         : '<path d="M8 5v14l11-7z" fill="#5a6270"/>';
    }
  }
}

window.toggleIpodMenu = function() {
  ipodMenuOpen = !ipodMenuOpen;
  renderIpodScreen();
};

window.selectIpodMenu = function() {
  if (ipodMenuOpen) {
    ipodMenuOpen = false;
    renderIpodScreen();
  }
};

window.toggleIpodPlay = function() {
  if (ipodMenuOpen) ipodMenuOpen = false;
  if (spotifyController) spotifyController.togglePlay();
  // We rely on playback_update to change isPlaying, but we can optimistically toggle it
  isPlaying = !isPlaying;
  renderIpodScreen();
};

window.prevIpodSong = function() {
  fakeIndex = (fakeIndex - 1 + IPOD_SONGS.length) % IPOD_SONGS.length;
  renderIpodScreen();
  if (spotifyController) spotifyController.loadUri(IPOD_SONGS[fakeIndex].uri);
};

window.nextIpodSong = function() {
  fakeIndex = (fakeIndex + 1) % IPOD_SONGS.length;
  renderIpodScreen();
  if (spotifyController) spotifyController.loadUri(IPOD_SONGS[fakeIndex].uri);
};

window.selectIpodSong = function(i) {
  fakeIndex = i;
  ipodMenuOpen = false;
  isPlaying = true;
  renderIpodScreen();
  if (spotifyController) {
     spotifyController.loadUri(IPOD_SONGS[fakeIndex].uri);
  }
};

window.onSpotifyIframeApiReady = (IFrameAPI) => {
  const element = document.getElementById('spotify-embed');
  if (!element) return;
  const options = {
    width: '100%',
    height: '250',
    uri: IPOD_SONGS[fakeIndex].uri
  };
  const callback = (EmbedController) => {
    spotifyController = EmbedController;
    spotifyController.addListener('playback_update', e => {
       isPlaying = !e.data.isPaused;
       renderIpodScreen();
    });
  };
  IFrameAPI.createController(element, options, callback);
};

if (!document.getElementById('spotify-api-script')) {
  const script = document.createElement('script');
  script.id = 'spotify-api-script';
  script.src = 'https://open.spotify.com/embed-podcast/iframe-api/v1';
  document.body.appendChild(script);
}

renderIpodScreen();

// ── Expose popup openers globally ─────────────────────────
window.openInterestPopup  = openInterestPopup;
window.closeInterestPopup = closeInterestPopup;
window.showBook           = showBook;
