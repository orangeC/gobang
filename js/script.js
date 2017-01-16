 var chessBoard = []; //初始化一个二维数组
 var me = true ;   //初始化变量me 为黑棋

 var wins = [];  //初始化一个赢法数组(三维)

 var myWin = [];    //赢法的统计数组(一维)
 var computerWin = [];

 var over = false ;  //判断输赢的变量

 for(var i=0;i<15;i++){
 	wins[i] = [];
 	for(j=0;j<15;j++){
 		wins[i][j] = []
 	}
 }

 var count = 0;       //定义赢法规则  (横线赢法)
 for(var i = 0;i<15 ;i++){
 	for(var j=0;j<11;j++){
 		//wins[0][0][0] = true
 		//wins[0][1][0] = true
 		//wins[0][2][0] = true
 		//wins[0][3][0] = true
 		//wins[0][4][0] = true

 		//wins[0][1][1] = true
 		//wins[0][2][1] = true
 		//wins[0][3][1] = true
 		//wins[0][4][1] = true
 		//wins[0][5][1] = true
 		for(var k=0;k<5;k++){
 			wins[i][j+k][count] =true
 		}
 		count ++;
 	}
 }

  //定义赢法规则  (竖线赢法)
 for(var i = 0;i<15 ;i++){
 	for(var j=0;j<11;j++){
 		for(var k=0;k<5;k++){
 			wins[j+k][i][count] =true
 		}
 		count ++;
 	}
 }

   //定义赢法规则  (斜线赢法)
 for(var i = 0;i<11 ;i++){
 	for(var j=0;j<11;j++){
 		for(var k=0;k<5;k++){
 			wins[i+k][j+k][count] =true
 		}
 		count ++;
 	}
 }

    //定义赢法规则  (反斜线赢法)
 for(var i = 0;i<11 ;i++){
 	for(var j=14;j>3;j--){
 		for(var k=0;k<5;k++){
 			wins[i+k][j-k][count] =true
 		}
 		count ++;
 	}
 }

 console.log(count)

 for(var i = 0; i<count ;i++){
 	myWin[i] = 0;
 	computerWin[i] = 0;
 }


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
 	if(over){
 		return ;
 	}
 	if(!me){        //如果不是我方下棋
 		return ;
 	}
 	var x = e.offsetX;   //获取鼠标在canvas 上的坐标
 	var y = e.offsetY;
 	var i = Math.floor(x/30);  //计算落子点在棋盘上的索引
 	var j = Math.floor(y/30);
 	if(chessBoard[i][j] == 0){
	 	oneStep(i,j,me);
	 	chessBoard[i][j] = 1
	 	for(var k = 0;k<count;k++){    //先遍历所有的赢法
	 		if(wins[i][j][k]){         //如果第k种赢法存在
	 			myWin[k] ++;
	 			computerWin[k] = 6;
	 			if(myWin[k] == 5){
	 				window.alert("you WIN !");
	 				over = true
	 			}
	 		}
	 	}
	 	if(!over){         //如果未结束，实现计算机ＡＩ
	 		me = !me
	 		computerAI();
	 	}
 	}
 }

 var computerAI = function (){
 	var myScore = [];
 	var computerScore = [];   //记录我方得分和电脑得分
 	var max = 0;             //保存最高的分数
 	var u =0 ,v=0;           //保存最高分数点的坐标
 	for(var i=0;i<15;i++){       //初始化
 		myScore[i] = [];
 		computerScore[i] = [];
 		for(var j=0;j<15;j++){
 			myScore[i][j] = 0;
 			computerScore[i][j] = 0;
 		}
 	}

 	for(var i=0;i<15;i++){      //遍历棋盘
 		for(var j=0;j<15;j++){
 			if(chessBoard[i][j] == 0){   //棋盘上的空点
 				for(var k = 0;k<count;k++){
 					if(wins[i][j][k]){
 						if(myWin[k] == 1){
 							myScore[i][j] +=200
 						}else if(myWin[k] == 2){
 							myScore[i][j] +=400
 						}else if(myWin[k] == 3){
 							myScore[i][j] +=2000
 						}else if(myWin[k] == 4){
 							myScore[i][j] +=10000
 						}
 						if(computerWin[k] == 1){
 							computerScore[i][j] +=220
 						}else if(computerWin[k] == 2){
 							computerScore[i][j] +=420
 						}else if(computerWin[k] == 3){
 							computerScore[i][j] +=2100
 						}else if(computerWin[k] == 4){
 							computerScore[i][j] +=20000
 						}
 					}
 				}
 				if(myScore[i][j]>max){
 					max = myScore[i][j];
 					u = i ;
 					v = j ;
 				}else if(myScore[i][j] == max){
 					if(computerScore[i][j] > computerScore[u][v]){
 						u = i ;
 						v = j ;
 					}
 				}
 				if(computerScore[i][j]>max){
 					max = computerScore[i][j];
 					u = i ;
 					v = j ;
 				}else if(computerScore[i][j] == max){
 					if(myScore[i][j] > myScore[u][v]){
 						u = i ;
 						v = j ;
 					}
 				}
 			}     
 		}
 	}
 	oneStep(u,v,false);
 	chessBoard[u][v] = 2;
 	for(var k = 0;k<count;k++){    //先遍历所有的赢法
	 		if(wins[u][v][k]){         //如果第k种赢法存在
	 			computerWin[k] ++;
	 			myWin[k] = 6;
	 			if(computerWin[k] == 5){
	 				window.alert("计算机 WIN !");
	 				over = true
	 			}
	 		}
	 	}
	 	if(!over){         
	 		me = !me
	 	}
 }