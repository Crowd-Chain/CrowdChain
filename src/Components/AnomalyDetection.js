import { IsolationForest } from 'isolation-forest'
import { Component } from 'react';

export default function AnomalyDetection() {
  var isolationForest = new IsolationForest(100);
  var data = [
    {"lat":41.080386328434905,"long":28.99703979492188,"t":1619593215},
    {"lat":41.076633727112515,"long":28.997554779052738,"t":1619593244},
    {"lat":41.077539547047294,"long":29.003305435180668,"t":1619593341},
    {"lat":41.079415848632,"long":28.988885879516605,"t":1619593505},
    {"lat":41.076180812464166,"long":28.986911773681644,"t":1619593685},
    {"lat":41.08261837760025,"long":28.985624313354492,"t":1619593695},
    {"lat":41.08491504471011,"long":28.96030426025391,"t":1619593875},
    {"lat":41.072880911548936,"long":28.961849212646488,"t":1619592921},        
    {"lat":41.05955021422251,"long":28.975582122802738,"t":1619594071},
    {"lat":41.0607151401866,"long":28.99703979492188,"t":1619592511},
    {"lat":41.09617078744703,"long":28.99154663085938,"t":1619592521},
    {"lat":41.10225067378896,"long":28.978843688964847,"t":1619594801},        
    {"lat":41.08297420451945,"long":28.9735221862793,"t":1619612801},
    {"lat":41.08349176750823,"long":28.96905899047852,"t":1619633801},
    {"lat":41.0343050853874,"long":28.982620239257816,"t":1619583401},
    {"lat":41.06175061261111,"long":29.064502716064457,"t":1619583401},        
    {"lat":41.027959915023665,"long":29.02622222900391,"t":1619593043},
    {"lat":41.06615118853871,"long":28.989143371582035,"t":1619596223},
    {"lat":41.05851470715539,"long":28.979701995849613,"t":1619595203},
    {"lat":41.08271542149653,"long":28.979358673095707,"t":1619594303},        
    {"lat":41.08103330700923,"long":28.975410461425785,"t":1619594663},
    {"lat":41.086985211067336,"long":28.962707519531254,"t":1619593763},
    {"lat":41.074433826731486,"long":28.960990905761722,"t":1619593343},
    {"lat":41.069127881747995,"long":28.965625762939457,"t":1619593275},        
    {"lat":41.07650432324571,"long":28.96854400634766,"t":1619593276},
    {"lat":41.07508086389766,"long":28.960647583007816,"t":1619593996},
    {"lat":41.06420979428149,"long":28.958244323730472,"t":1619594116},
    {"lat":41.07805715283417,"long":29.00047302246094,"t":1619594528},        
    {"lat":41.067574841233906,"long":28.987426757812504,"t":1619591648},
    {"lat":41.05333692728665,"long":28.997383117675785,"t":1619592008},
    {"lat":41.05333692728665,"long":28.997383117675785,"t":1619592308},
    {"lat":41.048417658920364,"long":28.951721191406254,"t":1619592668},        
    {"lat":41.075210270566636,"long":28.971977233886722,"t":1619593142},
    {"lat":41.07068088558002,"long":28.975582122802738,"t":1619593191},
    {"lat":41.062786068733026,"long":28.98897171020508,"t":1619593251},
    {"lat":41.0587735854505,"long":28.99068832397461,"t":1619593551},        
    {"lat":41.08763212467916,"long":28.97729873657227,"t":1619594615},
    {"lat":41.09345406057922,"long":28.97180557250977,"t":1619594255}, 
    {"lat":41.19345406057922,"long":28.57180557250977,"t":1619884847},       
    {"lat":40.85345406047822,"long":27.99180787250977,"t":1611001457}, 
    ];
  isolationForest.fit(data) // Type ObjectArray ({}[]); 
 
  var scores = isolationForest.scores();
  var scoreString = "";

  for(var i = 0; i < scores.length; i++) {
    console.log(scores[i] + "\n");
  }
}

