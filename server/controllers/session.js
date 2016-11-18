var mongoose=require('mongoose');
var User=mongoose.model('User');
var Message=mongoose.model('Message');
var Comment=mongoose.model('Comment');
module.exports=(function(){
  return{
    logReg:function(req,res){
      User.findOne({name:req.body.name},function(err,user){
          if(!user){
          var user=new User(req.body);
          user.save(function(err,user){
            if(err){
              res.json(err);
            }
            else{

              req.session.user=user;
              req.session.save()
              res.json({status:true})
            }
          })
        }
        else{
          req.session.user=user;
          req.session.save()
          res.json({status:true,user:user})
        }
      })
    },
    logout:function(req,res){
      console.log(req.session.user)
      req.session.destroy()
      res.redirect('/')
    },
    checkSess: function(req, res){
			if(req.session.user){
				res.json(req.session.user)
			}else{
				res.send(null)
			}
		},
    addmessage:function(req,res){
      var message=new Message({_user:req.session.user._id,content:req.body.content});
      message.save(function(err,message){
        res.json(message);
      })
    },
    index:function(req,res){

      Message.find({}).populate('_user').populate('comments').exec(function(err,data){
        Message.populate(data,{path:'comments._user',model:'User'},function(err,results){
          res.json(data);

        })
      })
    },
    addcomment:function(req,res){
    var comment=new Comment({_user:req.session.user._id,_message:req.body.message,text:req.body.comment})
     Message.findOne({_id:req.body.message},function(err,data){
       data.comments.push(comment._id);
       console.log(data);
       data.save()
       comment.save(function(err,comment){
         res.json({status:true});

       })
     })


    }
  }
})();
