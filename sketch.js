function preload() {
    myfont = loadFont('assets/Orbitron-Medium.ttf');
}

N=21;
d=23;
l=1;

function setup() {
  W=d*(N+100);
  createCanvas(W, W,WEBGL);
  background(255);
  // ambientMaterial(190);
  // ambientLight(200);
  // directionalLight(255,255,255,1,1,-1);
  
  perspective(PI/1.8,1,0.2,1000);
  camera(100,100,200,-30,100,-100,0.85,1,-1);
  
  translate(0,-250,-50);
  rotateZ(0.2);
  A=new Array(N);
  for(i=0;i<N;i++)A[i]=new Array(N);
  for(i=0;i<N;i++){
    for(j=0;j<N;j++){
      A[i][j]=0;
    }
  }
  A[0][0]=1;
  for(i=0;i<N-1;i++){
    for(j=0;j<=i;j++){
      A[i+1][j]+=A[i][j];
      // A[i+1][j]%=2;
      A[i+1][j+1]+=A[i][j];
      // A[i+1][j+1]%=2;
      R=0;
      strokeWeight(3);
      ts=1;
      if(A[i][j]>=1000)ts=0.7;
      if(A[i][j]>=10000)ts=0.65;
      if(A[i][j]%2!=1){
        strokeWeight(1);
        fill(255);
        stroke(130);
        R=d;
      }
      else {
        fill(195);
        // noFill();
        // noStroke();
        stroke(255);
      }
      push();
      translate(-d*i/2+d*j,i*d*sqrt(3)/2,0);
      D=d/2;
      // M=max(0,i-2);
      M=abs(i-2)+abs(j-i/2)*0;
      translate(M*M*(random()-0.5)*0,
                M*M*0.3,
                1.0*sq(M)*random());
      // translate(0,0,M*M*(0.5-random())*6);
      rotate((M)*random()/8,[.5-random(),.5-random(),.5-random()]);
      // rect(l,l,D-l*1,D-l*1,3,3,3,3);
      // translate(0,0,-0.15*R);
      // for(k=-R;k<=R;k++){
      //   drawP2(D*1.05);
      //   translate(0,0,0.1);
      // }
      L=0.5;
      s=255;
      check=false;
      if(A[i][j]%2==0){
        L=D/9;
        s=150;
        check=true;
      }
      translate(0,0,L);
      if(check){
        drawP2(D*1.1,-L,s);
      }
      else{drawP2(D*1.1,-L,s);}
      translate(0,0,0.1);
      textFont(myfont);
      fill(100);
      if(A[i][j]%2!=0)fill(255);
      textSize(d*0.33*ts);
      textAlign(CENTER, CENTER);
      text(A[i][j],0,-.5);
      pop();
    }
  }
 
}
function drawP2(d,t,s){
  x=d*sqrt(3)/2;
  y=d/2;
  f=(z,q)=>{
  beginShape();
  vertex(0,d,z);
  vertex(q*x,y,z);
  vertex(q*x,-y,z);
  vertex(0,-d,z);
  vertex(-x*q,-y,z);
  vertex(-x*q,y,z);
  vertex(0,d,z);
  endShape();
  }
  f(0,1);f(t,-1);
  translate(0,0,t/2);
  noStroke();
  push();
  for(I=0;I<3;I++){
    rotateZ(PI/3);
    box(2*x,2*y,abs(t)-.1);
  }
  pop();
  g=(p,q)=>{
    line(p,q,0,p,q,t);
    line(-p,-q,0,-p,-q,t);
  }
  translate(0,0,-t/2);
  stroke(s);
  g(x,y);g(x,-y);g(0,d);
}

function drawC(d,t,s){
  circle(0,0,d*2);
  translate(0,0,t);
  circle(0,0,d*2);
  translate(0,0,-t/2);
  noStroke();
  rotateX(PI/2);
  cylinder(d,t-0.1);
  rotateX(-PI/2);
  translate(0,0,-t/2);
}
// function draw(){
//   if(mouseIsPressed)saveCanvas();
// }
