PAUS.style.display = 'none';
  
      var STATIONS = [ 
  {name: "📻 clasicos.del.reggaeton 📻", url: "https://radiolatina.live/8132/stream"}, 
  {name: "📟 TOXIC TRAP 📟", url: "https://toxictrap.stream.laut.fm/toxictrap?ref=web-app&start_time=1758391383044"}, 
  {name: "📻 FREE FM CLASSICS 📻", url: "https://xxdelgado.radioca.st/stream"}, 
  {name: "📟 HOUSE-TIME.FM 📟", url: "https://listen.housetime.fm/tunein-mp3"},
  {name: "📻 NRJ REGGAETON 📻", url: "https://streaming.nrjaudio.fm/ouam47w2dqao?origine=playernrj&aw_0_req.userConsentV2=&aw_0_1st.station=NRJ-Reggaeton"}, 
  {name: "📟 RAUTE MUSIK 📟", url: "https://rautemusik.stream25.radiohost.de/rm-bass_mp3-192?ref=rm5beta&upd-meta&upd-scheme=https&_art=dD0xNzU4MzkwODAzJmQ9MzA1Y2U4ODBiNjU5OWI2MTcxMzI"}, 
  {name: "📻 NRJ RAP FR 📻", url: "https://streaming.nrjaudio.fm/oua8jvw2dqao?origine=playernrj&aw_0_req.userConsentV2=&aw_0_1st.station=NRJ-Rap-FR"},  
  {name: "📟 DEEP RADIO 📟", url: "https://25343.live.streamtheworld.com/DEEP_RADIOAAC.aac?tdsdk=js-2.9&swm=false&pname=TDSdk&pversion=2.9&banners=none&burst-time=15&sbmid=ce73d26a-ac4d-446a-de03-5af18c3ad5be"},
  {name: "📻 RADIO ANTENA 3 📻", url: "https://streamingecuador.net:9368/radioantena3?ver=34548"}, 
  {name: "📟 TRAP RADIO 📟", url: "https://skywatcherawakenedradio.radiolebowski.com/play"}, 
  {name: "📻 CONCIERTO FM 📻", url: "https://19213.live.streamtheworld.com/CONCIERTOAAC.aac?csegid=12000&dist=concierto_cl-web-live_streaming_play&tdsdk=js-2.9&swm=true&pname=TDSdk&pversion=2.9&banners=300x250&burst-time=15&sbmid=d1b57806-516e-46d2-effd-ffbe67e562a0"},    
  {name: "📻 CUBAN FLOW 📻", url: "https://securestream.casthost.net:8615/stream?type=http&nocache=3942510"}, 
  {name: "📻 ALOFOKE RADIO 📻", url: "https://radiordomi.com:8566/stream"},    
  {name: "📻 SABANA STEREO 📻", url: "https://cast5.my-control-panel.com/proxy/sabanastereo/stream"},   
  {name: "📻 SALSEO RADIO 📻", url: "https://listen.radioking.com/radio/399811/stream/452110"}
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

    Shazam.onclick = () => {
    window.open("https://www.shazam.com/es-es", "_blank");
}









