angular.module('saucedb.services', [])

.factory('dataService', function($http,$q) {

	var addReview = function() {
		var deferred = $q.defer();
		deferred.resolve();
		return deferred.promise;
	}
	
	var getFeed = function() {
		var deferred = $q.defer();
		
		//fake it till we make it
		var feed = [];
/*		
				var item = {
					id:i,
					posted:"July 14, 2015 at 2:32 PM",
					sauce:{
						name:"Sauce "+i,
						company:"Company "+i
					},
					rating:Math.round(Math.random()*5) + 1,
					avgrating:Math.round(Math.random()*5) + 1,
					text:"This sauce was rather spicy with a nice aftertaste...",
					user:{
						img:user.picture.thumbnail,
						name:user.name.first+' '+user.name.last
					}
				}
			}
			*/

            //now try the app
            var cc = IBMCloudCode.initializeService();
            cc.setBaseUrl('http://localhost:3000');
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
						avgrating:0,
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
		//so a review is the Sauce object + array of reviews
		//to keep it simpler, we'll skip the fancy randomuser integration
		var sauce = {
			name:"Sauce "+id,
			company:"Company "+id,
			avgrating:Math.round(Math.random()*5) + 1,
			reviews:[]
		}
		for(var i=0;i<Math.round(Math.random()*10) + 1;i++) {
			var item = {
				id:i,
				posted:"July 14, 2015 at 2:32 PM",
				rating:Math.round(Math.random()*5) + 1,
				text:"This sauce was rather spicy with a nice aftertaste...",
				user:{
					img:"http://placekitten.com/g/40/40",
					name:"Joe Blow"
				}
			}
			sauce.reviews.push(item);
		}
		deferred.resolve(sauce);
		return deferred.promise;
	}
	
	var searchSauce = function(term) {
		var deferred = $q.defer();
		term = term.toLowerCase();
		
		//use hard coded set of names 
		var names = [
			"Alpha","Amma","Anna","Anno","Alphabet","Alcazam"
		]
		var results = [];
		for(var i=0;i<names.length;i++) {
			if(names[i].toLowerCase().indexOf(term) >= 0) results.push({id:1,label:names[i]});	
		}
		deferred.resolve(results);
		return deferred.promise;
	
	}
	
	return {
		addReview:addReview,
		getFeed:getFeed,
		getSauce:getSauce,
		searchSauce:searchSauce
	};
	
});
