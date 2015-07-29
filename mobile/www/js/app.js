
angular.module('saucedb', ['ionic','saucedb.controllers','saucedb.services','ngOpenFB','ionic.rating'])

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
			.state('Login', {
				url: '/',
				controller: 'LoginCtrl',
				templateUrl: 'partials/login.html'
			})
      .state('Home', {
        url: '/Home',
        controller: 'HomeCtrl',
        templateUrl: 'partials/home.html'
      })
      .state('Sauce', {
        url: '/sauce/:id',
        controller: 'EntryCtrl',
        templateUrl: 'partials/entry.html'
      })
      .state('AddReview', {
        url: '/addreview',
        controller: 'AddReviewCtrl',
        templateUrl: 'partials/addreview.html',
				params:{
					name:{value:""},
					id:{value:""}
				}
      });

		  $urlRouterProvider.otherwise("/");

})
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
    var config = {
      applicationId:'38a0a550-b018-4a10-b879-aec68868c249',
      applicationRoute:'http://saucedb.mybluemix.net',
      applicationSecret:'735c7d0de828ab956bae772e996a55620676ff05'
    };
    
    IBMBluemix.initialize(config).then(function() {
      console.log('ok maybe?');
    }, function(err) {
       console.log('crap your pants time');
    });
    
    
  });
})
