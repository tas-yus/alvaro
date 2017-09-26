var audio = $("audio");

$("a").click((e) => {
  if (!audio[0].muted) {
    audio[0].muted = true;
    $("span").text("Bless me with music");
  } else {
    audio[0].muted = false;
    $("span").text("Shut up");
  }
  e.preventDefault();
});
