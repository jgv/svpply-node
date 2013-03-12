# Svpply 
[![Build Status](https://secure.travis-ci.org/jgv/svpply-node.png)](http://travis-ci.org/jgv/svpply-node)

A Node.js wrapper for the [Svpply API](https://developer.svpply.com). Right now there is only coverage for non-authenticated calls, contributions are more than welcome. Check out the Svpply API [docs](https://developer.svpply.com) for very thorough documentation of all the calls.

Parts of this wrapper were extracted from [Tug of Store](http://tugofstore.com), an API experiment by [OKFocus](http://okfoc.us).

## Installation

### Installing npm (Node Package Manager)

```
curl http://npmjs.org/install.sh | sh
```

### Installing Svpply

```
$ [sudo] npm install svpply
```

## Usage

This interface to the Svpply API is meant to be semantically similar to way Svpply's API is organized.

``` js

  var svpply = require('svpply');  // require the svpply library
  var api = new svpply();  // setup svpply object

  // Retrieves a product object.
  api.products.show(100, callback); 
  
  // Search products for a specified query. 
  api.products.find({"query": "shoes"}, callback); 

  // Retrieves the collections that include the specified product.
  api.products.collections(100, callback);  

  // Retrieves the users that want the specified product.
  api.products.users(100, callback);  
  
  // Lists the comments on the specified product.
  api.products.comments(100, callback);  

  // Retrieves a user object.
  api.users.show(100, callback);  

  // Search users for a specified query.
  api.users.find({"query" : "jonathan"}, callback); 

  // Retrieves the products a user has "wanted".
  api.users.wants(100, callback);  

  // Retrieves the specified product if it is wanted by the specified user.
  api.users.wanted(100, 200,  callback);  

  // Retrieves the products a user has marked as owned.
  api.users.owns(100, callback);  

  // Retrieves the specified product if it is owned by the specified user.
  api.users.owned(100, 200, callback);  

  // Retrieves the users that the specified user is following.
  api.users.following(100, callback); 

  // Retrieves the second specified user if he/she is followed by the first specified user.
  api.users.isFollowingUser(100, 200, callback);  

  // Retrieves the stores that the specified user is following.
  api.users.stores(100, callback);  

  // Retrieves a specified store if it is followed by the specified user.
  api.users.isFollowingStore(100, callback); 

  // Retrieves the searches that the specified user is following.
  api.users.searches(100, callback);  

  // Retrieves the users that are following the specified user.
  api.users.followers(100, callback);  

  // Retrieve the specified collection.
  api.users.collections(100, callback);  

  // Retrieves the products in a collection.
  api.users.collection(100, 200, callback);  

  // Retrieve the specified collection.
  api.collections.show(100, callback);  

  // Search collections for a specified query.
  api.collections.find({ "query": "okfocus" }, callback);  

  // Retrieves the products in a collection.
  api.collections.products(100, callback);  

  // Retrieves the users in a collection.
  api.collections.users(100, callback);  

  // Lists the comments on the specified collection.
  api.collections.comments(100, callback);  

  // Retrieves product categories and their related endpoints. 
  api.shop.categories(callback); 

  // Retrieves the products within a category.
  api.collections.show('Audio', 'Tech', {"query" : "headphones" }, callback);  
  
  // Returns the number of API requests remaining.
  api.remaining(callback); 

```

###  Run Tests

```
$ npm test
```
