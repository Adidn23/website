// music.js - persistent music player for after login
(function(){
    // Only run if not on login page
    if(document.getElementById('success-container') || window.location.pathname.includes('halaman-pertanyaan') || window.location.pathname.includes('menu')) {
        // Prevent double audio
        if(window.__globalMusic) return;
        var audio = document.createElement('audio');
        audio.id = 'global-music';
        audio.src = 'wave to earth - seasons [CnVVjLOGVoY].mp3';
        audio.loop = true;
        audio.autoplay = true;
        audio.style.display = 'none'; // Hide the audio element and icon
        audio.controls = false;
        // Restore last time from localStorage if reload cepat (<2 detik)
        try {
            var lastTime = 0;
            var lastUpdate = 0;
            if(localStorage.getItem('musicTime')) lastTime = parseFloat(localStorage.getItem('musicTime')) || 0;
            if(localStorage.getItem('musicTimeUpdate')) lastUpdate = parseInt(localStorage.getItem('musicTimeUpdate')) || 0;
            var now = Date.now();
            if(lastTime && lastUpdate && (now - lastUpdate < 2000)) {
                audio.currentTime = lastTime;
            }
        }catch(e){}
        // Save state on timeupdate (localStorage)
        audio.addEventListener('timeupdate', function(){
            localStorage.setItem('musicTime', audio.currentTime);
            localStorage.setItem('musicTimeUpdate', Date.now().toString());
        });
        // Always play after login/allowed page
        audio.play();
        document.body.appendChild(audio);
        window.__globalMusic = audio;
        // Reset musicTime jika tab benar-benar ditutup (optional, bisa dihapus jika ingin tetap lanjut walau lama)
        window.addEventListener('beforeunload', function(){
            // Tidak perlu hapus localStorage agar reload cepat tetap lanjut
        });
    }
})();
