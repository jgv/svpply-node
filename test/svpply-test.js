var Svpply = require('../lib/svpply'),
    vows = require('vows'),
    assert = require('assert');

var api = new Svpply.API();

vows.describe('Test Svpply API Wrapper').addBatch({
    'While you use the Svpply API': {
        'when querying for a product by id':{
            topic: function () {
                api.products.show(100, this.callback);
            },
            'a product object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
                assert.equal(topic.response.product.type, 'Product');
            },
            'with the correct id': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.equal(topic.response.product.id, 100);
            }
        },
        'when retrieving the collections that include a specficed product': {
            topic: function () {
                api.products.collections(100, this.callback);
            },
            'an object will be returned': function(topic, err){
                if (err) throw err;
                assert.isObject(topic);
            },
            'with an array of collections': function(topic, err){
                if (err) throw err;
                assert.isArray(topic.response.collections);
            }            
        },
        'when retrieving the users that want a specified product': {
            topic: function(){
                api.products.users(100, this.callback);
            },
            'an object will be returned': function(topic, err){
                if (err) throw err;
                assert.isObject(topic);
            },
            'with an array of users': function(topic, err){
                if (err) throw err;
                assert.isArray(topic.response.users);
                assert.equal(topic.response.users[0]['type'], 'User');
            }
        },        
        'when querying for a user by id': {
            topic: function () {
                api.users.show(100, this.callback);
            },
           'a user object will be returned': function (topic, err) {
               if (err) throw err;
               assert.isUndefined(topic.error, err);
               assert.isObject(topic);
               assert.equal(topic.response.user.type, 'User');
            },
            'with the correct id': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.equal(topic.response.user.id, 100);
            }
        },
        'when retreving the products a user has wanted': {
            topic: function(){
                api.users.wants(100, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of products': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.products);
            }
        },
        'when retrieving a specfied product by a specfied user': {
            topic: function(){
                api.users.wanted(100, 1240442, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with a 200 if wanted': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.equal(topic.meta.status, 200);
            }
        },
        'when retrieving the products a user has marked as owned': {
            topic: function(){
                api.users.owns(100, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of products': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.products);
            }
        },
        'when retrieving a specfied product if it is owned by a specfied user': {
            topic: function(){
                api.users.owned(100, 1240442, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with a 200 if owned': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.equal(topic.meta.status, 200);
            }        
        },
        'when retrieving the users that a user is following': {
            topic: function(){
                api.users.following(100, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of users': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.users);
                assert.equal(topic.response.users[0].type, 'User');
            }            
        },
        'when retrieving the second specfied user if he/she is followed by the first specified user': {
            topic: function(){
                api.users.isFollowingUser('zack', 'jgv', this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with a 200 if following': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.equal(topic.meta.status, 200);
            }
        },
        'when retrieving the stores a specified user is following': {
            topic: function(){
                api.users.stores(100, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of users': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.stores);
                assert.equal(topic.response.stores[0].type, 'Store');
            }
        },
        'when retrieving a specified store if it is followed by a specified user': {
            topic: function(){
                api.users.isFollowingStore('jgv', 1391, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with a 200 if following': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.equal(topic.meta.status, 200);
            }            
        },
        'when retrieving the searches that a specified user is following': {
            topic: function(){
                api.users.searches('greg', this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of searches': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.searches);
                assert.equal(topic.response.searches[0].type, 'Search');
            }            
        },
        'when retrieving the users that are following a specified user':{
            topic: function(){
                api.users.followers(100, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of users': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.users);
                assert.equal(topic.response.users[0].type, 'User');
            }            
        },
        'when retrieving a users collections': {
            topic: function(){
                api.users.collections(100, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of collections': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.collections);
                assert.equal(topic.response.collections[0].type, 'Collection');
            }            
        },
        'when retrieving a specifed collection': {
            topic: function(){
                api.collections.show(52410, this.callback);
            },
            'a collections object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
                assert.equal(topic.response.collection.type, 'Collection');
            },
        },
        'when retrieving the products in a collection': {
            topic: function(){
                api.collections.products(52410, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
            },
            'with an array of products': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.products);
                assert.equal(topic.response.products[0].type, 'Product');
            }       
        },
        'when retrieving the users assocated with a collection': {
            topic: function(){
                api.collections.users(52410, this.callback);
            },
            'a collections object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of users': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.users);
                assert.equal(topic.response.users[0].type, 'User');
            }        
        },
        'when listing the comments on a specified product': {
            topic: function(){
                api.products.comments(1240442, this.callback);
            },
            'a collections object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of comments': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.comments);
            }
        },
        'when listing the comments on a specified collection': {
            topic: function(){
                api.collections.comments(52410, this.callback);
            },
            'a collections object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of comments': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.comments);
            }        
        },
        'when retrieving product categories and their related endpoints': {
            topic: function(){
                api.shop.categories(this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of categories': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.categories);
            }
        },
        'when retrieving category products': {
            topic: function(){
                api.shop.products('Tech', 'Audio', {
                    "query": "headphones",
                    "sort_by": "date_created"                    
                }, this.callback);
            },
            'a object will be returned': function (topic, err) {
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isObject(topic);
            },
            'with an array of products': function(topic, err){
                if (err) throw err;
                assert.isUndefined(topic.error, err);
                assert.isArray(topic.response.products);
            }        
        },
        'when searching for products': {
            topic: function () {
                api.products.find({
                    "query": "shoes",
                    "sort_by": "added_count",
                    "filters[genders][]": "neutral",
                    "filters[prices][]": "$100-200"
                }, this.callback);
            },
            'an object will be returned': function(topic, err){
                if (err) throw err;
                assert.isObject(topic);
            }, 
            'with an array of products': function (topic, err) {
                if (err) throw err;
                assert.isArray(topic.response.products);
                assert.equal(topic.response.products[0]['type'], 'Product');
            }
        },
        'when searching for users': {
            topic: function () {
                api.users.find({
                    "query": "jonathan"
                }, this.callback);
            },
            'an object will be returned': function(topic, err){
                if (err) throw err;
                assert.isObject(topic);
            }, 
            'with an array of users': function (topic, err) {
                if (err) throw err;
                assert.isArray(topic.response.users);
                assert.equal(topic.response.users[0].type, 'User');
            }
        },
        'when searching for a collections': {
            topic: function () {
                api.collections.find({
                    "query": "shoes"
                }, this.callback);
            },
            'an object will be returned': function(topic, err){
                if (err) throw err;
                assert.isObject(topic);
            }, 
            'with an array of collections': function (topic, err) {
                if (err) throw err;
                assert.isArray(topic.response.collections);
                assert.equal(topic.response.collections[0].type, 'Collection');
            }
        },
        'when checking rate limit': {
            topic: function () {
                api.remaining(this.callback);
            },
            'an object will be returned': function(topic, err){
                if (err) throw err;
                assert.isObject(topic);
            }, 
            'with the number of remaining calls': function (topic, err) {
                if (err) throw err;
                assert.isNumber(topic.response.remaining);
            }
        }
    }
}).export(module);
