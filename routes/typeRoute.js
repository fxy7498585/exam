require('babel-polyfill');
var express=require('express');
var route=express.Router();
var typeDB=require('../db/typeDB');
// let Student=require('../model/Student');

//所有类型
route.get('/findAllType',(req,resp)=>{
	typeDB.findAllType().then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});
//难易程度
route.get('/findAllComplexity',(req,resp)=>{
	typeDB.findAllComplexity().then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});
 //方向
route.get('/findAllDirection',(req,resp)=>{
	typeDB.findAllDirection().then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});
//知识点
route.get('/findAllKnowledge',(req,resp)=>{
	typeDB.findAllKnowledge().then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});
//查找所有题目
route.get('/findAllSubject',(req,resp)=>{
	typeDB.findAllSubject().then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});

route.get('/findSubjectById',(req,resp)=>{
	ids=req.query.ids;
	console.log(ids);
	// ids=['1','1','3','1']
	typeDB.findSubjectById(ids).then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});
route.get('/passTheAudit',(req,resp)=>{
	var state=req.query.state;
	var id=req.query.id;
	typeDB.passTheAudit(state,id).then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});

route.get('/delete',(req,resp)=>{
	var id=req.query.id;
	console.log(id);
	typeDB.delete(id).then((data)=>{
		resp.send(data);
	}).catch((err)=>{
		resp.send(err);
	});
});




module.exports=route;