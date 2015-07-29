angular.module('saucedb.services', [])

.factory('dataService', function($http,$q) {

    var cc = IBMCloudCode.initializeService();
    cc.setBaseUrl('http://localhost:3000');

	var addReview = function() {
		var deferred = $q.defer();
		deferred.resolve();
		return deferred.promise;
	}
	
	var getFeed = function() {
		var deferred = $q.defer();
		
		//fake it till we make it
		var feed = [];

            //now try the app
            cc.get("/feed").then(function(data){
				data = JSON.parse(data);
                console.log(data);
				for(var i=0;i<data.length;i++) {
					var result = data[i];
					console.log('did i run');
					var item = {
						id:result.id,
						posted:result.review.posted,
						sauce:{
							name:result.sauce_name,
							company:result.sauce_company
						},
						rating:result.review.rating,
						avgrating:result.sauce_avg_rating,
						text:result.review.text,
						user:{
							img:result.review.user.img,
							name:result.review.user.name
						}
					};
					feed.push(item);
				}
				console.log('sending '+feed);
				deferred.resolve(feed);
				
            },function(err){
                console.log(err);
            });

		
		return deferred.promise;
	}
	
	var getSauce = function(id) {
		var deferred = $q.defer();
		
        cc.get("/sauce/"+id).then(function(data){
			data = JSON.parse(data);			
			//to be consistent w/ the Feed, copy _id to id
			data.id = data._id;
			console.log('got ',data);
			deferred.resolve(data);
			
        },function(err){
            console.log(err);
        });
		
		return deferred.promise;
	}
	
	var searchSauce = function(term) {
		var deferred = $q.defer();
		term = term.toLowerCase();
		
		/*
		//use hard coded set of names 
		var names = [
			"Alpha","Amma","Anna","Anno","Alphabet","Alcazam"
		]
		var results = [];
		for(var i=0;i<names.length;i++) {
			if(names[i].toLowerCase().indexOf(term) >= 0) results.push({id:1,label:names[i]});	
		}
		*/
		
				
        cc.get("/search/"+term).then(function(data){
			data = JSON.parse(data);			
			deferred.resolve(data);
			
        },function(err){
            console.log(err);
        });
		
		return deferred.promise;
	
	}
	
	return {
		addReview:addReview,
		getFeed:getFeed,
		getSauce:getSauce,
		searchSauce:searchSauce
	};
	
});
