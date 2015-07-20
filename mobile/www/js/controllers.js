angular.module('saucedb.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPlatform, ngFB, $rootScope, $state, $ionicHistory) {
	console.log('LoginCtrl');
  
  //used to skip auth when testing
  var skipAuth=true;
  
  $ionicPlatform.ready(function() {

    ngFB.init({appId: '467761313406666'});
    
    $scope.doLogin = function() {

      if(skipAuth) {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go('Home');        
        return;
      }

      ngFB.login({scope: 'email'}).then(function(response) {          
          console.log('Facebook login succeeded', response.authResponse.accessToken);
          $rootScope.accessToken = response.authResponse.accessToken;
          ngFB.api({
            path:'/me',
            params: { fields: 'id,name'}
          }).then(
            function(user) {
              console.log(user);
              $rootScope.user = user;
              $ionicHistory.nextViewOptions({
                disableBack: true
              });
              $state.go('Home');
            }, function(err) {
              
          });
      },function(error) {
          alert('Facebook login failed: ' + error);
      });
                 
    }
    	
  });
	
})
.controller('HomeCtrl', function($scope,dataService,$ionicLoading,$ionicModal,$state) {
  console.log('HomeCtrl');
  $ionicLoading.show({template:"Loading feed..."});
  

  dataService.getFeed().then(function(res) {
    $ionicLoading.hide();
    $scope.feed = res;
  });
  
  $ionicModal.fromTemplateUrl('partials/findsauce.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $scope.doSearch = function(term) {
    console.log('search for: '+term);
    dataService.searchSauce(term).then(function(res) {
      console.log('back from search with '+JSON.stringify(res));
      $scope.results = res;
    });
  }
  
  $scope.doLoad = function(id) {
    $scope.modal.hide();
    $state.go("AddReview", {id:id});
  }
  
  $scope.addReviewForm = function() {
    $scope.modal.show();
  }

})
.controller('EntryCtrl', function($scope,dataService,$ionicLoading,$stateParams) {
  console.log('EntryCtrl for '+$stateParams.id);
//  $ionicLoading.show({template:"Loading feed..."});
  
  dataService.getSauce($stateParams.id).then(function(res) {
    //$ionicLoading.hide();
    console.dir(res);
    $scope.sauce = res;
  });
})
.controller('AddReviewCtrl', function($scope,$stateParams,dataService,$state,$ionicHistory) {

  $scope.existingSauce = $stateParams.id;
  $scope.review = {text:"",rate:3};
  
  if($scope.existingSauce) {
    dataService.getSauce($stateParams.id).then(function(res) {
      $scope.sauce = res;
    });
    
  }

  //used for star rating
  $scope.max = 5;
  
  $scope.addReview = function() {

    console.log('adding review: '+$scope.review.text+' '+$scope.review.rate);

    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    
    //needs user
    var user = {};
    dataService.addReview($scope.sauce, user, $scope.review.text, $scope.review.rate).then(function() {
      $state.go("Sauce", {id:$scope.sauce.id});
    });
    
  }

});



/*
      //now try the app
      var cc = IBMCloudCode.initializeService();
      //cc.setBaseUrl('http://localhost:3000');
      cc.get("/all").then(function(data){
          console.log(data);
      },function(err){
          console.log('non free');
          console.log(err);
      });

*/
