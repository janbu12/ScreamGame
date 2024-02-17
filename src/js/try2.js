const iceCreamGrayscale = document.querySelector('.ice-cream-grayscale');
const counter = document.querySelector('.counter');
var mic;
let audioContext;
let analyser;
let microphoneStream;
let filtereddB=0;
let count = 0;
let maxPersentage=0;
let bottomClip;
// const targetCounter = maxDbinput.value;

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function updateIceCream() {
  if(seconds == 0){
    if(filtereddB > maxPersentage){
      maxPersentage = filtereddB;
    }
    else if(maxPersentage === 0){
      maxPersentage = 0;
    }else{
      // maxPersentage -= 0.5
    }
    const percentage = (maxPersentage / maxDbinput.value) * 100; // Hitung persentase peningkatan counter
    bottomClip = 100 - percentage; // Hitung persentase pemotongan di bagian bawah
    if(bottomClip<=15){
      bottomClip = 0;
    }
    iceCreamGrayscale.style.clipPath = `inset(${bottomClip}% 0 0 0)`; // Atur pemotongan
    console.log("targetCounter: ", maxDbinput.value);
    console.log("persentase: ", percentage);
    console.log("persentase Crop: ",bottomClip);
    console.log("filteredDb: ", filtereddB);
    console.log("maxPersentase: ", maxPersentage);
    if(bottomClip==0){
      delay(400).then(function() {
          berhasil.classList.add('actived');
          clearTimeout();
          // alert("NICE")
      });
    }
  }
}

updateIceCream();

setInterval(() => {
  updateIceCream();
}, 600);


function setup() {
  //   createCanvas(400, 400);
    
    // Membuat objek AudioContext
    audioContext = new AudioContext();
  
    // Mendapatkan akses ke mikrofon
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(function(stream) {
        microphoneStream = stream;
  
        // Membuat AnalyserNode
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048; // Ukuran FFT (Fast Fourier Transform)
  
        // Menghubungkan stream mikrofon ke AnalyserNode
        const microphone = audioContext.createMediaStreamSource(stream);
        microphone.connect(analyser);
  
        // Memanggil draw setelah objek analyser selesai dibuat
        draw();
      })
      .catch(function(err) {
        console.error('Gagal mendapatkan akses mikrofon:', err);
      });
  }

  function draw() {
    // background(220);
    if(seconds == 0){
      if (!analyser) {
        return;
      }
    
      // Mendapatkan data amplitudo dari AnalyserNode
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);
    
      // Menghitung rata-rata amplitudo dari dataArray
      let totalAmplitude = 0;
      for (let i = 0; i < bufferLength; i++) {
        totalAmplitude += dataArray[i];
      }
      const averageAmplitude = totalAmplitude / bufferLength;
    
      const adjustedAmplitude = Math.max(averageAmplitude, 1);
    
      // Konversi ke dB (misalnya menggunakan rumus logaritmik)
      const dB = 20 * Math.log10(adjustedAmplitude);
      console.log(dB);
      filtereddB;
      if (dB > toleranceInput.value) {
        filtereddB = dB - toleranceInput.value;
      } else {
        filtereddB = 0;
      }
    }
    // Pastikan objek analyser telah terdefinisi
  
    // Tampilkan nilai dB di layar
  //   fill(0);
  //   textSize(20);
  //   text('Nilai dB: ' + (isFinite(dB) ? dB.toFixed(2) : 0), 20, 40);
  //   text('Nilai Amplitude: ' + adjustedAmplitude.toFixed(2), 20, 70);
  //   text('Nilai filterdB: ' + filtereddB.toFixed(2), 20, 90);
  //   console.log(filtereddB);
  //   updateIceCream();
  }




function handleButtonClick() {
  // Ketika tombol diklik, tambahkan ke counter dan memperbarui tampilan es krim
  setInterval(() => {
    if(count <= maxDbinput.value){
        increaseCounter();
        if (count > maxDbinput.value) {
        alert('Yum! Anda telah membuat es krim yang terlihat seperti benang hitam!');
        window.location.reload();
    }
    }
  }, 500);
}


function increaseCounter() {
  count += 1;
  counter.textContent = count;
  updateIceCream();
}

// Panggil increaseCounter() untuk menambah counter dan memperbarui tampilan es krim
