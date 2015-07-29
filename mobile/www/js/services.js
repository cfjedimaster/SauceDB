angular.module('saucedb.services', [])

.factory('dataService', function($http,$q) {

    var cc = IBMCloudCode.initializeService();
    cc.setBaseUrl('http://localhost:3000');

	var addReview = function(sauce, user, text, rating) {
		var deferred = $q.defer();
        cc.post("/addreview", {
			sauce:sauce,
			token:user,
			text:text,
			rating:rating	
		}).then(function(data){
			console.log('back from server on add review',JSON.parse(data));
			deferred.resolve(JSON.parse(data));
			
        },function(err){
            console.log(err);
        });
		
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
