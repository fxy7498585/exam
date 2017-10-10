

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
			});
		});
	}
//查找 符合的选项
	function getId(){
		if(ids.length===4){
			$.getJSON('http://localhost:3000/exam/manager/findSubjectById',{
				ids:ids
			},function(data){
				$('#topic').children().remove();
				// console.log(data.length)
				if(data.length!==undefined){
					// console.log(data)
					data.forEach(function(item){
						var newDiv='<div>'
										+'<div>'
											+'<span title="'+item.id+'">题号:'+item.id+'</span>'
											+'<span>题型:单选题</span>'
											+'<span>难度:简单</span>'
											+'<span>知识点:HTML</span>'
										+'</div>'
										+'<div>'+item.stem+'</div>'
										+'<div id="btns">'
											+'<button>审核通过</button>'
											+'<button>审核不通过</button>'
											+'<input type="button" value="删除数据"/>'
										+'</div>'
									+'</div>';
						$('#topic').append(newDiv);
					});
					//获取btns
					btnSuccess();
					deleteT();
				}
				// if(ids.length==4){
				// 	ids=[];
				// }
			})
		}
	}
	//点击审核通过
	function btnSuccess(){
		$('#btns button').on('click',function(){
			console.log($(this).html());
			var id=$(this).parent().parent().children('div:eq(0)').children('span:eq(0)').attr('title');
			// console.log(id);
			$.get('http://localhost:3000/exam/manager/passTheAudit',{
				state:$(this).html(),
				id:id
			})
		})
	}
	//点击删除
	function deleteT(){
		$('#btns input').on('click',function(){
			$('#topic').children().remove();
			var id=$(this).parent().parent().children('div:eq(0)').children('span:eq(0)').attr('title');
			$.get('http://localhost:3000/exam/manager/delete',{
				id:id
			},function(data){
				console.log(ids);
				$.get('http://localhost:3000/exam/manager/findSubjectById',{
					ids:ids
				},function(data){
					data.forEach(function(item){
						var newDiv='<div>'
						+'<div>'
							+'<span title="'+item.id+'">题号:'+item.id+'</span>'
							+'<span>题型:单选题</span>'
							+'<span>难度:简单</span>'
							+'<span>知识点:HTML</span>'
						+'</div>'
						+'<div>'+item.stem+'</div>'
						+'<div id="btns">'
							+'<button>审核通过</button>'
							+'<button>审核不通过</button>'
							+'<input type="button" value="删除数据"/>'
						+'</div>'
						+'</div>';
						$('#topic').append(newDiv);
					});
					btnSuccess();
					deleteT();
				});
			});
		})
	}

