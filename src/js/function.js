let maxDbValue = document.getElementById('maxDbValue');
        let toleranceValue = document.getElementById("toleranceValue");
        let maxDbinput = document.getElementById('maxDbinput');
        let toleranceInput = document.getElementById('toleranceInput');
        let menu = document.getElementById('menu');
        let modal = document.getElementById('modal');
        let berhasil = document.getElementById('berhasil');
        let btnReset = document.getElementById('btnReset');
        let modalSecond = document.getElementById('modal-second');
        let detik = document.getElementById('detik');
        let modalInputName = document.getElementById('modalInputName');
        let namaPlayer = document.getElementById('namaPlayer');
        let buttonStart = document.getElementById('button-start');
        let btnCoba = document.getElementById('btnCoba');
        let formNama = document.getElementById('formNama');
        let quest = document.getElementById('quest');
        let outputNama = document.getElementById('outputNama');
        let gagal = document.getElementById('gagal');
        let btnResetGagal = document.getElementById('btnResetGagal');
        let outputNamaGagal = document.getElementById('outputNamaGagal');
        let maxTimer = document.getElementById('maxTimer');
        let maxTimerValue = document.getElementById('maxTimerValue');
        let seconds = 4;

        menu.addEventListener("click", ()=>{
            modal.classList.toggle('actived');
        });

        maxDbinput.addEventListener("input", ()=>{
            maxDbValue.textContent = maxDbinput.value;
            saveRangeValue();
        });

        toleranceInput.addEventListener("input", ()=>{
            toleranceValue.textContent = toleranceInput.value;
            saveRangeValue();

        });

        maxTimer.addEventListener("input", ()=>{
            maxTimerValue.textContent = maxTimer.value;
            saveRangeValue();
        });

        btnReset.addEventListener("click", ()=>{
            //console.log("Click");
            //berhasil.classList.remove("actived");
            window.location.reload();
        });

        btnResetGagal.addEventListener("click", ()=>{
            //console.log("Click");
            //gagal.classList.remove("actived");
            window.location.reload();
        });

        namaPlayer.addEventListener('keypress', function(event) {
            // Cek apakah tombol yang ditekan adalah "Enter" (kode 13)
            if (event.key === 'Enter') {
              Start();
            }
          });

        buttonStart.addEventListener("click", ()=>{
            Start();
        });

        btnCoba.addEventListener("click", ()=>{
            formNama.classList.add("actived");
            quest.classList.add("hidden");
            menu.classList.add("hidden");
            modal.classList.remove('actived');
            namaPlayer.focus();
        });

        function saveRangeValue() {
            localStorage.setItem('maxDbinput', maxDbinput.value);
            localStorage.setItem('toleranceInput', toleranceInput.value);
            localStorage.setItem('maxTimer', maxTimer.value);
          }

        function loadRangeValue() {
        const maxDbinputStorage = localStorage.getItem('maxDbinput');
        const toleranceInputStorage = localStorage.getItem('toleranceInput');
        const maxTimerStorage = localStorage.getItem('maxTimer');

        if (maxDbinputStorage && toleranceInputStorage && maxTimerStorage) {
                maxDbValue.textContent = maxDbinputStorage;
                maxDbinput.value = maxDbinputStorage;
                toleranceValue.textContent = toleranceInputStorage;
                toleranceInput.value = toleranceInputStorage;
                maxTimerValue.textContent = maxTimerStorage;
                maxTimer.value = maxTimerStorage;
            }
        };

        document.addEventListener('DOMContentLoaded', loadRangeValue);

        function Start(){
            if(namaPlayer.value!=''){
                formNama.classList.remove("actived");
                modalSecond.classList.add('actived');
                outputNama.innerHTML=namaPlayer.value;
                outputNamaGagal.innerHTML=namaPlayer.value;
                timer();
            }else{
                alert("Isi Dahulu Nama Anda");
            }
        }

        //Early Timer
        function timer(){
            var timer = setInterval(function() {
                seconds--;
                detik.innerHTML = seconds;
                if (seconds <= 0) {
                    modalInputName.classList.remove('actived');
                    formNama.classList.remove("actived");
                    modalSecond.classList.remove('actived');
                    filtereddB = 0;
                    maxPersentage=0;
                    clearInterval(timer);
                    startTimer(parseInt(maxTimer.value) + 1);
                }
            }, 1000);
        }

        //Timer Game
        function formatTime(time) {
            return time < 10 ? '0' + time : time;
        }
          
          // Fungsi untuk mengupdate tampilan timer
        function updateTimer(minutes, seconds, milliseconds) {
            if (minutes < 0) minutes = 0;
            if (seconds < 0) seconds = 0;
            if (milliseconds < 0) milliseconds = 0;
            if (minutes > 99) minutes = 99;
            if (seconds > 59) seconds = 59;
            if (milliseconds > 99) milliseconds = 99;
          
            // Format nilai menit, detik, dan milidetik
            let formattedMinutes = formatTime(minutes);
            let formattedSeconds = formatTime(seconds);
            let formattedMilliseconds = formatTime(milliseconds);
          
            // Update tampilan timer
            document.getElementById('minutes').textContent = formattedMinutes;
            document.getElementById('seconds').textContent = formattedSeconds;
            document.getElementById('milliseconds').textContent = formattedMilliseconds;
        }
          
          // Fungsi untuk memulai timer
        function startTimer(durationInSeconds) {
        let startTime = Date.now();
        let timerInterval = setInterval(() => {
                let elapsedTime = Date.now() - startTime;
                let remainingTime = durationInSeconds * 1000 - elapsedTime;
                let minutes = Math.floor(remainingTime / (1000 * 60));
                let seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
                let milliseconds = Math.floor((remainingTime % 1000) / 10);
                updateTimer(minutes, seconds, milliseconds);
                if (remainingTime <= 0) {
                clearInterval(timerInterval);
                    gagal.classList.add('actived');

                    setInterval(() => {
                        berhasil.classList.remove('actived');
                    }, 500);
                }else if(bottomClip==0){
                    clearInterval(timerInterval);
                }
            }, 10);

            document.addEventListener('keydown', (event) => {
                // Jika tombol F12 (keyCode: 123) ditekan
                if (event.keyCode === 123) {
                  // Cek apakah dokumen sedang dalam mode layar penuh
                  const isFullscreen = document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement;
                  
                  // Toggle mode layar penuh
                  if (!isFullscreen) {
                    // Jika tidak dalam mode layar penuh, masuk ke mode layar penuh
                    enterFullscreen();
                  } else {
                    // Jika dalam mode layar penuh, keluar dari mode layar penuh
                    exitFullscreen();
                  }
                }
            });

            // Fungsi untuk masuk ke mode layar penuh
            function enterFullscreen() {
                const element = document.documentElement;
                if (element.requestFullscreen) {
                  element.requestFullscreen();
                } else if (element.webkitRequestFullscreen) {
                  element.webkitRequestFullscreen();
                } else if (element.msRequestFullscreen) {
                  element.msRequestFullscreen();
                }
            }
        
            // Fungsi untuk keluar dari mode layar penuh
            function exitFullscreen() {
                if (document.exitFullscreen) {
                  document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                  document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                  document.msExitFullscreen();
                }
            }
        }