cansion1="";
cansion2="";
estadocansion1="";
estadocansion2="";
derecha=0;
isquierda=0;
derechax=0;
derechay=0;
isquierdax=0;
isquierday=0;
 function preload(){
     cansion1=loadSound("cancion1.mp3");
     cansion2=loadSound("cancion2.mp3");
 }
 function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelo_cargado);
    poseNet.on('pose',gotPoses);
}
function modelo_cargado(){
    console.log('su modelo ya cargo');
}
function reprodusir(){
    cansion.play();
    cansion.rate(1);
    cansion.setVolume(1);
}
function detener(){
    cansion1.stop();
    cansion2.stop();
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        derecha=results[0].pose.keypoints[10].score;
        isquierda=results[0].pose.keypoints[9].score;
        derechax=results[0].pose.rightWrist.x;
        derechay=results[0].pose.rightWrist.y;
        isquierdax=results[0].pose.leftWrist.x;
        isquierday=results[0].pose.leftWrist.y;
    }
}
function draw(){
    image(video,0,0,600,500);
    fill("#002fff");
    stroke("#ff0000");
    estadocansion1=cansion1.isPlaying();
    estadocansion2=cansion2.isPlaying();
    if(isquierda>0.2){
        circle(isquierdax,isquierday,20);
        cansion1.stop();
        if(estadocansion2==false){
            cansion2.play();
            document.getElementById("cansion").innerHTML="esta sonando la cansion 2";
        }
    }
    if(derecha>0.2){
        circle(derechax,derechay,20);
        cansion2.stop();
        if(estadocansion1==false){
            cansion1.play();
            document.getElementById("cansion").innerHTML="esta sonando la cansion 1";
        }
    }

}



