
function makeItPop() {
  let adress =location.href;
  if(adress.includes("youtube.com")){
    ytStrategy();
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
  let j=0;
  for(let i=0;i<frames.length;i++){
    let it = frames[i];
    if(!(it.src === "" || it.src.includes("facebook") || it.src.endsWith('.html'))){

      filtered[j]=it;
      j++;
    }
  }

  let popup = openPopzis(filtered[0].width,filtered[0].height);


  filtered.forEach(it=>{
    let clone = document.createElement('iframe');
    clone.src=it.src;
    clone.height=it.height-20;
    clone.width=it.width-20;
    clone.id=id='frame';
    popup.document.getElementById('main').appendChild(clone);
  })
}

function ytStrategy(){


  let url = /watch\?v=(.*)/.exec(location.href)[1];


  let clone = document.createElement('iframe');
  clone.src="https://www.youtube.com/embed/"+url;
  clone.height="315";
  clone.width="560";
  clone.id=id='frame';
  let popup = openPopzis(560,315);
  popup.document.getElementById('main').appendChild(clone);

}

function twitchStrategy(){
  let url = /twitch.tv\/(.*)/.exec(location.href)[1];
  let popup = window.open("https://player.twitch.tv/?volume=1&!muted&channel="+url, "Popzis "+url, "width=560,height=315");
  popup.document.title="Popzis"
}

function openPopzis(width,height){
  let popup = window.open("", "Popzis"+Math.floor(Math.random() * Math.floor(9999)), "width="+width+",height="+height);
  popup.document.write("<div id='main'></div>");
  popup.document.write("<script>window.onresize = resizeFrame;function resizeFrame(){let frame=document.getElementsByTagName('IFRAME')[0];frame.height=window.innerHeight-20;frame.width=window.innerWidth-20}</script>");
  popup.document.title="Popzis"
  popup.stop();
  return popup;
}
