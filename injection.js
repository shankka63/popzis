
function makeItPop() {
  let adress =location.href;
  if(adress.includes("youtube.com")){
    ytStrategy();
    return;
  }
  if(adress.includes("dailymotion.com")){
    dailymotionStrategy();
    return;
  }
  if(adress.includes("twitch.tv")){
    twitchStrategy();
    return;
  }

  defaultStrategy();

}

function defaultStrategy(){
  let frames = document.getElementsByTagName("IFRAME");

  let filtered=[];
  for(let i=0;i<frames.length;i++){
    let it = frames[i];
    if(!(it.src === "" || it.src.includes("facebook") || it.src.endsWith('.html'))){

      filtered.push(it);
    }
  }
  
  filtered.forEach(it=>{
      openPopzis(it.width,it.height,it.src);
  })

}

function dailymotionStrategy(){

  let url = /video\/(.*)/.exec(location.href)[1];
  url="https://www.dailymotion.com/embed/video/"+url;
  let popup = openPopzis(560,315,url);

}

function ytStrategy(){

  let url = /watch\?v=(.*)/.exec(location.href)[1];
  url="https://www.youtube.com/embed/"+url;
  openPopzis(560,315,url);

}


function twitchStrategy(){
  let url = /twitch.tv\/(.*)/.exec(location.href)[1];
  let popup = window.open("https://player.twitch.tv/?volume=1&!muted&channel="+url, "Popzis "+url, "width=560,height=315");
  popup.document.title="Popzis";
  popup.document.getElementsByTagName("BODY")[0].style.margin=0;
}

function openPopzis(width,height,src){
  let popup = window.open("", "Popzis"+Math.floor(Math.random() * Math.floor(9999)), "width="+width+",height="+height);
  popup.document.write("<div id='main'></div>");
  popup.document.write("<script>window.onresize = resizeFrame;function resizeFrame(){let frame=document.getElementsByTagName('IFRAME')[0];frame.height=window.innerHeight;frame.width=window.innerWidth}</script>");
  popup.document.title="Popzis"

  let clone = document.createElement('iframe');
  clone.height=height;
  clone.width=width;
  clone.src=src;
  clone.id="frame";
  popup.document.getElementById('main').appendChild(clone);
  popup.document.getElementById("frame").style["border-width"]=0;
  popup.document.getElementsByTagName('BODY')[0].style.margin=0;
  popup.stop();

  return popup;
}
