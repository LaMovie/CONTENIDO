PAUS.style.display = 'none';
  
      var STATIONS = [ 
  {name: "📟 clasicos.del.reggaeton 📟", url: "https://radiolatina.live/8132/stream"}, 
  {name: "📟 TRAP RADIO 📟", url: "https://skywatcherawakenedradio.radiolebowski.com/play"}, 
  {name: "📟 TOXIC TRAP 📟", url: "https://toxictrap.stream.laut.fm/toxictrap?ref=web-app&start_time=1758391383044"},
  {name: "📻 NRJ REGGAETON 📻", url: "https://streaming.nrjaudio.fm/ouam47w2dqao?origine=playernrj&aw_0_req.userConsentV2=&aw_0_1st.station=NRJ-Reggaeton"}, 
  {name: "📻 NRJ RAP FR 📻", url: "https://streaming.nrjaudio.fm/oua8jvw2dqao?origine=playernrj&aw_0_req.userConsentV2=&aw_0_1st.station=NRJ-Rap-FR"},    
  {name: "📟 HOUSE-TIME.FM 📟", url: "https://listen.housetime.fm/tunein-mp3"}, 
  {name: "📟 RAUTE MUSIK 📟", url: "https://rautemusik.stream25.radiohost.de/rm-bass_mp3-192?ref=rm5beta&upd-meta&upd-scheme=https&_art=dD0xNzU4MzkwODAzJmQ9MzA1Y2U4ODBiNjU5OWI2MTcxMzI"},   
  {name: "📻 ALOFOKE RADIO 📻", url: "https://radiordomi.com:8566/stream"}, 
  {name: "📻 CONCIERTO FM 📻", url: "https://19213.live.streamtheworld.com/CONCIERTOAAC.aac?csegid=12000&dist=concierto_cl-web-live_streaming_play&tdsdk=js-2.9&swm=true&pname=TDSdk&pversion=2.9&banners=300x250&burst-time=15&sbmid=d1b57806-516e-46d2-effd-ffbe67e562a0"},    
  {name: "📻 CUBAN FLOW 📻", url: "https://securestream.casthost.net:8615/stream?type=http&nocache=3942510"}, 
  {name: "📟 DEEP RADIO 📟", url: "https://25343.live.streamtheworld.com/DEEP_RADIOAAC.aac?tdsdk=js-2.9&swm=false&pname=TDSdk&pversion=2.9&banners=none&burst-time=15&sbmid=ce73d26a-ac4d-446a-de03-5af18c3ad5be"},    
  {name: "📻 SABANA STEREO 📻", url: "https://cast5.my-control-panel.com/proxy/sabanastereo/stream"},   
  {name: "📻 SALSA STEREO 📻", url: "https://cloud8.vsgtech.co/8032/stream"}
];

     var FONDOS = ['https://is.gd/nDUjPx', 'https://is.gd/cksQ36', 'https://is.gd/oRaaAm', 'https://is.gd/a8wjfL', 'https://is.gd/lkSIzM'];
    
     var currentStation = 0;
     var stationName = document.getElementById('stationName');
     
 
     function changeColor() {
         var ALEATORIO = FONDOS[Math.floor(Math.random() * FONDOS.length)];
       
document.body.style.background = 'url(' + ALEATORIO + ')';
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundPosition = 'center';
    document.body.style.backgroundAttachment = 'fixed';
};
  
     
   <!-- Cargar la estación -->
   function loadStation(index) {
     A.src = STATIONS[index].url;
       stationName.innerText = STATIONS[index].name;
         A.play();
}

        <!-- BOTONES -->
  loadStation(currentStation);

     PLAY.onclick = () => {
         A.play(); 
   PAUS.style.display = 'block';
   PLAY.style.display = 'none';
   I.classList.remove('FILTRO');
}

     PAUS.onclick = () => {
         A.pause(); 
   PAUS.style.display = 'none';
   PLAY.style.display = 'block';
   I.classList.add('FILTRO');
}

     NEXT.onclick = () => {
 currentStation = (currentStation + 1) % STATIONS.length;
         loadStation(currentStation);
   PLAY.style.display = 'none';
   PAUS.style.display = 'block';
   I.classList.remove('FILTRO');
   changeColor()
}

     PREV.onclick = () => {
 currentStation = (currentStation - 1 + STATIONS.length) % STATIONS.length;
         loadStation(currentStation);
   PLAY.style.display = 'none';
   PAUS.style.display = 'block';
   I.classList.remove('FILTRO');
   changeColor()
}

     A.onerror = () => {
         alert('Error al cargar ó reproducir la Estación');
         document.body.style.background = 'gray';
};

// 🔥 Reconocimiento automático cada 10s
setInterval(recognizeFromStream, 10000);

async function recognizeFromStream() {
  var station = STATIONS[currentStation].url;
  console.log("Reconociendo en:", station);

  try {
    const response = await fetch(station);
    const reader = response.body.getReader();
    let chunks = [];
    let receivedLength = 0;

    // leer ~200kb aprox
    while (receivedLength < 100000) {
      const { done, value } = await reader.read();
      if (done) break;
      chunks.push(value);
      receivedLength += value.length;
    }

    let audioBlob = new Blob(chunks, { type: "audio/mpeg" });

    const formData = new FormData();
    formData.append("api_token", "985ad3d958b81d4e8599a3f862e3f83c"); // tu API KEY
    formData.append("file", audioBlob);

    const res = await fetch("https://api.audd.io/", {
      method: "POST",
      body: formData
    });
    const data = await res.json();
    console.log(data);

    if (data.status === "success" && data.result) {
      const song = data.result;
      document.getElementById("songTitle").innerText = song.title || "Desconocido";
      document.getElementById("songArtist").innerText = song.artist || "";
      if (song.spotify && song.spotify.album && song.spotify.album.images.length) {
        document.getElementById("songCover").src = song.spotify.album.images[0].url;
        document.getElementById("songCover").style.display = "block";
      }
    } else {
      document.getElementById("songTitle").innerText = "😩";
      document.getElementById("songArtist").innerText = "";
      document.getElementById("songCover").style.display = "none";
    }

  } catch (err) {
    console.error(err);
  }
}









