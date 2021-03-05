var series=[];

series[0]=1; //f0=0
series[1]=1; //f1=1 formula for finding fibonacci seris fn=fn-1+fn-1 n > 1

for(let i=2;i<100;i++){
    series[i]=series[i-1]+series[i-2];
}
console.log(series);

