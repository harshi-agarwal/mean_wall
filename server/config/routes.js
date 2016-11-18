var session=require('./../controllers/session.js');
module.exports=function(app){
  app.post('/user/login',function(req,res){
    session.logReg(req,res);
  })
  app.get('/logout',function(req,res){
    session.logout(req,res)
  })
  app.get('/user/checksess', function(req, res){
		session.checkSess(req, res)
	})
  app.post('/message/add',function(req,res){
    console.log("hey routes here")
    session.addmessage(req,res)
  })
  app.get('/messages',function(req,res){
    session.index(req,res)
  })
  app.post('/comment/add',function(req,res){
    session.addcomment(req,res)
  })
}
