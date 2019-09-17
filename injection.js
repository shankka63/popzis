
function makeItPop(adress = location.href) {

  if(adress.includes("youtube.com")){
    ytStrategy(adress);
    return;
  }
  if(adress.includes("dailymotion.com")){
    dailymotionStrategy(adress);
    return;
  }
  if(adress.includes("twitch.tv")){
    twitchStrategy(adress);
    return;
  }

  if(adress.includes("japscan.co")){
    japscanStrategy(adress);
    return;
  }

  defaultStrategy();

}



function defaultStrategy(){
  let frames = document.getElementsByTagName("IFRAME");

  let filtered=[];
  for(let i=0;i<frames.length;i++){
    let it = frames[i];
    if(!(it.src === "" || it.src.includes("facebook") || it.src.endsWith('.html') || it.src.includes('captcha'))){
      filtered.push(it);
    }
  }

  filtered.forEach(it=>{
    openPopzis(it.width,it.height,it.src);
  })

}

function dailymotionStrategy(adress){

  let url = /video\/(.*)/.exec(adress)[1];
  url="https://www.dailymotion.com/embed/video/"+url;
  let popup = openPopzis(560,315,url);

}

function japscanStrategy(adress){
  let opts = document.getElementById("pages").options;
  if(!opts)return;

  let imgs = [];
  for(let i = 0 ; i<opts.length ; i++){
    imgs.push(opts[i]["dataset"].img);
  }

  let params = /(\/{2}).*\/(.*)\/(.*)\//.exec(adress);

  let url = params[2].split("-");
  url = url.map(it=>{
    return it[0].toUpperCase()+it.slice(1);
  }).join('-');


  let popup = window.open("", "Popzis"+Math.floor(Math.random() * Math.floor(9999)), "width=500 height=900");
  popup.document.write("<div id='main'></div>");

  imgs.forEach(it=>{

    let img = document.createElement('img');
    img.src = "https://c.japscan.co/lel/"+url+"/"+params[3]+"/"+it;
    popup.document.getElementById('main').appendChild(img);
console.log(it);
  })

  //https://c.japscan.co/lel/
}

function ytStrategy(adress){

  let url = /watch\?v=([a-z A-Z 0-9 \- _ ]*)(&=[0-9]+s)*/.exec(adress)[1];
  url="https://www.youtube.com/embed/"+url;
  openPopzis(560,315,url);

}


function twitchStrategy(adress){
  let url = /twitch.tv\/(.*)/.exec(adress)[1];
  let popup = window.open("https://player.twitch.tv/?volume=1&!muted&channel="+url, "Popzis "+url, "width=560,height=315");
  popup.document.title="Popzis";
  popup.document.getElementsByTagName("BODY")[0].style.margin=0;
}

function openPopzis(width,height,src){

  let popup = window.open("", "Popzis"+Math.floor(Math.random() * Math.floor(9999)), "width="+width+",height="+height);
  popup.document.write("<div id='main'></div>");
  popup.document.write("<script>window.onresize = resizeFrame;function resizeFrame(){let frame=document.getElementsByTagName('IFRAME')[0];frame.height=window.innerHeight;frame.width=window.innerWidth}</script>");
  popup.document.title="Popzis"

  let clone = popup.document.createElement('iframe');
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
