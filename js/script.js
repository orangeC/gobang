 var chessBoard = []; //初始化一个二维数组
 var me = true ;   //初始化变量me 为黑棋

 for(var i=0;i<15;i++){
 	chessBoard[i] = [];
 	for(var j=0;j<15;j++){
 		chessBoard[i][j] = 0;
 	}
 }
 var chess = document.getElementById('chess');
 var context = chess.getContext("2d");

 context.strokeStyle="#BFBFBF";

 var logo = new Image();                 //绘制背景图
 logo.src="img/logo.png";
 logo.onload = function(){
 	context.drawImage(logo,100,100,250,250);
 	drawChess();

 }
 var drawChess = function (){

	 for (var i = 0;i<15;i++){            //canvas 绘制横竖线
	 	
		 context.moveTo(15+i*30,15); 
		 context.lineTo(15+i*30,435);
		 context.stroke() ;
		 context.moveTo(15,15+i*30); 
		 context.lineTo(435,15+i*30);
		 context.stroke() ;
		 
	 }
 }

 var oneStep = function(i,j,me){
 	context.beginPath();　　　　　　　//画圆(路径)
 	context.arc(15+i*30,15+j*30,13, 0, 2*Math.PI);
 	context.closePath();
 	
 	var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0); //调用该函数进行颜色渐变。会返回一个对象 
 	if(me){
	 	gradient.addColorStop(0,"#0A0A0A");   //设置颜色
	 	gradient.addColorStop(1,"#636766");
 	}else{
 		gradient.addColorStop(0,"#D1D1D1");   //设置颜色
	 	gradient.addColorStop(1,"#F9F9F9");
 	}
 	context.fillStyle=gradient  //填充颜色
 	context.fill()
 }

 //设置点击事件
 chess.onclick=function(e){
 	var x = e.offsetX;   //获取鼠标在canvas 上的坐标
 	var y = e.offsetY;
 	var i = Math.floor(x/30);  //计算落子点在棋盘上的索引
 	var j = Math.floor(y/30);
 	if(chessBoard[i][j] == 0){
	 	oneStep(i,j,me);
	 	if(me){
	 		chessBoard[i][j] = 1
	 	}else{
	 		chessBoard[i][j] = 2
	 	}
	 	me = !me
 	}
 }