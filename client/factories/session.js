app.factory('sessionFactory',function($http,$location){
  var factory={};
  factory.checkSess=function(cb){
    $http.get('/user/checksess').success(function(data){
    if(!data){
      $location.url('/logreg')
    }else{
      cb(data)
    }
    })
  }
  factory.logReg=function(user,cb){
    $http.post('/user/login' ,user).success(function(data){
      cb(data);
    })
  }
  factory.addmessage=function(newmessage,cb){
    console.log(newmessage);
    $http.post('/message/add',newmessage).success(function(data){
     factory.index(cb);

     })
  }
  factory.index=function(cb){
    console.log("i am in index")
    $http.get('/messages').success(function(data){
      cb(data);
    })
  }
  factory.addcomment=function(messageid,newcomment,cb){
    var message={message:messageid,
    comment:newcomment.text}
    $http.post('/comment/add',message).success(function(data){
      factory.index(cb);
    })
    // console.log(messageid,newcomment);
  }
  return factory;
})
