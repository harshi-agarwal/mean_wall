app.controller('sessionController',function($scope,sessionFactory,$location){
  sessionFactory.checkSess(function(data){
    $scope.session_user = data
  })
  $scope.logReg=function(){
    if(!$scope.newUser||$scope.newUser.name.length<3){
      $scope.error="something went wrong";
    }
    else{

    sessionFactory.logReg($scope.newUser,function(data){
      console.log(data);
      if(data.errors){
        // console.log(data.errors.name.message);
      $scope.error=(data.errors.name.message);
      }
      if(data.status==true){
    $location.url('/dashboard');
      }
    });
  }
}
  $scope.addmessage=function(){
    sessionFactory.addmessage($scope.newmessage,function(data){
      $scope.newmessage={};
      $scope.messages=data;

    })
  }
  sessionFactory.index(function(data){
    $scope.messages=data;
  })
  $scope.addcomment=function(messageid,newcomment){
    sessionFactory.addcomment(messageid,newcomment,function(data){
      $scope.messages=data;
    })
    }

})
