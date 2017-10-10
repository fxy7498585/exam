var pool = require('./pool');

module.exports = {
  //所有类型
    findAllType(){
       var sql = "select * from tbl_exam_subjecttype";
       return pool.execute(sql);
    },
    //难易程度
    findAllComplexity(){
       var sql = "select * from tbl_exam_subjectlevel";
       return pool.execute(sql);
    },
    //方向
    findAllDirection(){
       var sql = "select * from tbl_exam_epartment";
       return pool.execute(sql);
    },
    //知识点
    findAllKnowledge(){
       var sql = "select * from tbl_exam_topic";
       return pool.execute(sql);
    },
    //查找所有题目
    findAllSubject(){
       var sql = "select * from tbl_exam_subject";
       return pool.execute(sql);
    },
    //id查找题目
    findSubjectById(ids){
      var sql="select * from tbl_exam_subject where department_id='"+ids[0]+"' and subjectLevel_id='"+ids[1]+"' and subjectType_id='"+ids[2]+"' and topic_id="+ids[3];
      return pool.execute(sql); 
    },
    //审核通过or不通过
    passTheAudit(state,id){
      var sql="update tbl_exam_subject set checkState='"+state+"' where id="+id;
      return pool.execute(sql);
    },
    delete(id){
      var sql="delete from tbl_exam_subject where id="+id;
      return pool.execute(sql);
    }

}
