var baseUrl = "http://www.soundjay.com/button/";
var audio = ["./Crickets.mp3", "./Deez Nuts.m4a.mp4", "./Really Nigga.m4a.mp4", "./Air Horn.m4a.mp4", "./Shotgun Sound.m4a.mp4", "./Whatcha Say.m4a.mp4"];

$('button.ci').click(function() {
  var i = $(this).attr('id').substring(1);           //get the index of button
  new Audio(baseUrl + audio[i - 1]).play();          //play corresponding audio
});
