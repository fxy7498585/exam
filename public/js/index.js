

$(function(){


	$('#content_nav>.lis>li>a').on('click',function(){
		$(this).siblings().show().parent().siblings().children('ul').hide();
	});
	$('#content_nav>.lis>li>ul>li').on('mouseover',function(){
		$(this).addClass('active').siblings().removeClass('active').parent().parent().siblings().children('ul').children('li').removeClass('active');
	});
	$('#content_nav>.lis>li>ul>li').on('click',function(){
		$(this).addClass('btn_click').siblings().removeClass('btn_click').parent().parent().siblings().children('ul').children('li').removeClass('btn_click');
	});
	ids=new Array();
	get("#type","findAllType","realName");
	get("#complexity","findAllComplexity","realName");
	get("#direction","findAllDirection","name");
	get("#knowledge","findAllKnowledge","title");
	find();
});

	function get(id,adress,type){
	 	$.getJSON('http://localhost:3000/exam/manager/'+adress,function(data){
			data.forEach(function(item){
				var newLi='<li title='+item.id+'>'+item[type]+'</li>';
				$(id).append(newLi)
			});
			$(id+' li').on('click',function(){
				$(this).addClass('active').siblings().removeClass('active');
				var parentTitle=$(this).parent().attr('title');
				ids[parentTitle]=$(this).attr('title');
				one=ids[0];
				two=ids[1];
				three=ids[2];
				four=ids[3];
				getId();
				console.log($(this).text());
			});
		});
	}
//查找 符合的选项
	function getId(){
		var i=0;
		if(ids.length===4){
			$.getJSON('http://localhost:3000/exam/manager/findSubjectById',{
				ids:ids
			},function(data){
				$('#topic').children().remove();
				// console.log(data.length)
				if(data.length!=undefined){
					// console.log(data)
					data.forEach(function(item){
						answerArr=item.answer.split(',');
						// console.log(analysis);
						console.log(answerArr);
						var newDiv='<div>'
										+'<div>'
											+'<span title="'+item.id+'">题号:'+item.id+'</span>'
											+'<span>题型:单选题</span>'
											+'<span>难度:简单</span>'
											+'<span>知识点:HTML</span>'
										+'</div>'
										+'<div>题目:'+item.id+' '+item.stem+'</div>'
										+'<div>A: '+answerArr[0]+'</div>'
										+'<div>B: '+answerArr[1]+'</div>'
										+'<div>C: '+answerArr[2]+'</div>'
										+'<div>D: '+answerArr[3]+'</div>'
										+'<div id="btns">'
											+'<button id="btn1">审核通过</button>'
											+'<button>审核不通过</button>'
											+'<input type="button" value="删除数据"/>'
										+'</div>'
									+'</div>';
						$('#topic').append(newDiv);
						//添加红色
						isTrue(item,i);
						i++;
					});
					btnSuccess();
					deleteT();	
				}
			})
		}
	}

	//正确选项显示红色
	function isTrue(item,i){
		var textArr1=$('#topic>div:eq('+i+')>div:eq(2)').html().split(':');
		var textArr2=$('#topic>div:eq('+i+')>div:eq(3)').html().split(':');
		var textArr3=$('#topic>div:eq('+i+')>div:eq(4)').html().split(':');
		var textArr4=$('#topic>div:eq('+i+')>div:eq(5)').html().split(':');
		var analysisArr=item.analysis.split(',');
		console.log(analysisArr);
		analysisArr.forEach(function(item,index){
			// console.log(textArr1.indexOf(analysisArr[index]));
			// console.log(textArr2.indexOf(analysisArr[index]));
			// console.log(textArr3.indexOf(analysisArr[index]));
			// console.log(textArr4.indexOf(analysisArr[index]));
			if(textArr1.indexOf(analysisArr[index])!=-1){
				$('#topic>div:eq('+i+')>div:eq(2)').css('color','red')
			}
			if(textArr2.indexOf(analysisArr[index])!=-1){
				$('#topic>div:eq('+i+')>div:eq(3)').css('color','red')
			}
			if(textArr3.indexOf(analysisArr[index])!=-1){
				$('#topic>div:eq('+i+')>div:eq(4)').css('color','red')
			}
			if(textArr4.indexOf(analysisArr[index])!=-1){
				$('#topic>div:eq('+i+')>div:eq(5)').css('color','red')
			}
		});
	}

	//点击审核通过or 不通过
	function btnSuccess(){
		$('#btns button').on('click',function(){
			if($(this).html()==='审核通过'){
				$(this).parent().children().hide();
				var newInp='<input type="button" value="加入试卷"/>';
				$(this).parent().append(newInp);
			}
			console.log($(this).html());
			var id=$(this).parent().parent().children('div:eq(0)').children('span:eq(0)').attr('title');
			// console.log(id);
			$.get('http://localhost:3000/exam/manager/passTheAudit',{
				state:$(this).html(),
				id:id
			})
		})
	}
	
	function deleteT(){
		var i=0;
		$('#btns input').on('click',function(){
			var id=$(this).parent().parent().children('div:eq(0)').children('span:eq(0)').attr('title');
			$.get('http://localhost:3000/exam/manager/delete',{
				id:id
			},function(data){
				
			});
			$(this).parent().parent().hide();
		})
	}
	//获取正确答案
	function RightAnswer(id){
		$.get('http://localhost:3000/exam/manager/findRightAnswer',{
			id:id
		},function(data){
			data.forEach(function(item){
				right= item.content;
			})
		})
	}


	//点击查询
	function find(){
		$('#find').on('click',function(){
			var val=$('#findText').val();
			$.get('http://localhost:3000/exam/manager/findById',{
				id:val
			},function(data){
				// if(){}
				if(data.length===0){
					$('#topic').children().remove();
					var newP='<p style="color:red">您输入的ID没有查到数据</p>';
					$('#topic').append(newP);
				}else if(data.length===1){
					var i=0;
					$('#topic').children().remove();
					data.forEach(function(item){
						answerArr=item.answer.split(',');
						var newDiv='<div>'
										+'<div>'
											+'<span title="'+item.id+'">题号:'+item.id+'</span>'
											+'<span>题型:单选题</span>'
											+'<span>难度:简单</span>'
											+'<span>知识点:HTML</span>'
										+'</div>'
										+'<div>题目:'+item.id+' '+item.stem+'</div>'
										+'<div>A: '+answerArr[0]+'</div>'
										+'<div>B: '+answerArr[1]+'</div>'
										+'<div>C: '+answerArr[2]+'</div>'
										+'<div>D: '+answerArr[3]+'</div>'
										+'<div id="btns">'
											+'<button id="btn1">审核通过</button>'
											+'<button>审核不通过</button>'
											+'<input type="button" value="删除数据"/>'
										+'</div>'
									+'</div>';
						$('#topic').append(newDiv);
						isTrue(item,i);
					});
					btnSuccess();
					deleteT();
				}else{
					var i=0;
					$.get('http://localhost:3000/exam/manager/query/'+val,function(data){
						var i=0;
					$('#topic').children().remove();
					data.forEach(function(item){
						answerArr=item.answer.split(',');
						var newDiv='<div>'
										+'<div>'
											+'<span title="'+item.id+'">题号:'+item.id+'</span>'
											+'<span>题型:单选题</span>'
											+'<span>难度:简单</span>'
											+'<span>知识点:HTML</span>'
										+'</div>'
										+'<div>题目:'+item.id+' '+item.stem+'</div>'
										+'<div>A: '+answerArr[0]+'</div>'
										+'<div>B: '+answerArr[1]+'</div>'
										+'<div>C: '+answerArr[2]+'</div>'
										+'<div>D: '+answerArr[3]+'</div>'
										+'<div id="btns">'
											+'<button id="btn1">审核通过</button>'
											+'<button>审核不通过</button>'
											+'<input type="button" value="删除数据"/>'
										+'</div>'
									+'</div>';
						$('#topic').append(newDiv);
						isTrue(item,i);
						i++;
					});
					btnSuccess();
					deleteT();
					});
				}
			})
		});
	}

