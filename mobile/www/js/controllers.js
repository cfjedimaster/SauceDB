angular.module('saucedb.controllers', [])

.controller('LoginCtrl', function($scope, $ionicPlatform, ngFB, $rootScope, $state, $ionicHistory) {
	console.log('LoginCtrl');
  
  //used to skip auth when testing
  var skipAuth=false;
  
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
            params: { fields: 'id,name,email,picture'}
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
    
  $scope.addReviewForm = function() {
    $scope.modal.show();
  }
	
	$scope.doReview = function(id,name) {
		console.log('click '+JSON.stringify(arguments));
		var sauce = {};
    $scope.modal.hide();
		$state.go('AddReview', {name:name, id:id});
	}

})
.controller('EntryCtrl', function($scope,dataService,$ionicLoading,$stateParams,$state) {
  console.log('EntryCtrl for '+$stateParams.id);
  $ionicLoading.show({template:"Loading sauce..."});
  
	$scope.$on('$ionicView.enter', function(){
	  dataService.getSauce($stateParams.id).then(function(res) {
	    $ionicLoading.hide();
	    $scope.sauce = res;
	  });
	});

	
	$scope.goHome = function() {
		$state.go('Home');	
	};
	
})
.controller('AddReviewCtrl', function($scope,$stateParams,dataService,$state,$ionicHistory,$rootScope) {

	console.log('state params are '+JSON.stringify($stateParams));
	$scope.sauce = {name:"", company:"", id:""};
	
	$scope.id = "";
	if($stateParams.name && $stateParams.name != "") {
		$scope.existingSauce = true;
		$scope.sauce.name = $stateParams.name;
	}
	if($stateParams.id && $stateParams.id != "") {
		$scope.sauce.id = $stateParams.id;
	}
	
  $scope.review = {text:"",rate:3};

  //used for star rating
  $scope.max = 5;
  
  $scope.addReview = function() {

    console.log('adding review: '+$scope.review.text+' '+$scope.review.rate);

    $ionicHistory.nextViewOptions({
      disableBack: true
    });
    		
    //needs user
    var user = $rootScope.accessToken;
    dataService.addReview($scope.sauce, user, $scope.review.text, $scope.review.rate).then(function(id) {
      $state.go("Sauce", {id:id});
    });
    
  }

});

