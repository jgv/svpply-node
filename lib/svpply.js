/*
 * Svpply API Wrapper
 *
 */

var request = require('request'),
    querystring = require('querystring'),
    Svpply = {};

Svpply.API = function (clientKey, clientSecret) {
       
    this.host = 'https://api.svpply.com';
    this.path = '/v1';

    this.products = new Svpply.API.Products(this);
    this.users = new Svpply.API.Users(this);
    this.collections = new Svpply.API.Collections(this);
    this.shop = new Svpply.API.Shop(this);

    this.remaining = function (callback) {
        this.get('/remaining.json', callback);
    };

};

Svpply.API.prototype.get = function(path, params, callback) {

    if (arguments.length === 2) {
        callback = params;
        params = {};
    }

    var requestUri;

    if (typeof params === "object") {
        if (this.client_id && this.client_secret) {
            params.client_id = this.client_id;
            params.client_secret = this.client_secret;
        }
        requestUri = this.host + this.path + path + '?' + querystring.stringify(params);
    } else {
        requestUri = this.host + this.path + path;
    }

    var options = {
        uri: requestUri
    };
    
    request(options, function (error, response, result) {
        if (!error) {
            callback(JSON.parse(result));
        } else {
            callback(error);
        }
    });
};

Svpply.API.prototype.post = function (path, params, callback) {

    params.client_id = this.client_id;
    params.client_secret = this.client_secret;
    
    var requestData = querystring.stringify(params);

    var requestHeaders = {
        'Content-Length': requestData.length
    };
  
    var options = {                   
        'uri': this.host + this.path + path,
        'headers': requestHeaders,
        'method': 'POST',
        'body': requestData
    };
   
    request(options, function (error, response, result) {            
        if (!error) {
            callback(JSON.parse(result));
        } else {                    
            callback(error);
        }
    });
};

/*
 * Products Endpoints
 *
 */

Svpply.API.Products = function (api) {
    this.api = api;
};

Svpply.API.Products.prototype = {
    show: function (id, callback) {
        this.api.get('/products/' + id + '.json', callback);
    },
    find: function (query, callback) {
        this.api.get('/products/search.json', query, callback);
    },
    collections: function (id, callback) {
        this.api.get('/products/' + id + '/collections.json', callback);
    },
    users: function (id, callback) {
        this.api.get('/products/' + id + '/users.json', callback);
    },
    collections: function (id, callback) {
        this.api.get('/products/' + id + '/collections.json', callback);
    },
    comments: function (id, callback) {
        this.api.get('/products/' + id + '/comments.json', callback);
    }
};

/*
 * Users Endpoints
 *
 */

Svpply.API.Users = function (api) {
    this.api = api;
};

Svpply.API.Users.prototype = {
    show: function (id, callback) {
        this.api.get('/users/' + id + '.json', callback);
    },
    find: function (query, callback) {
        this.api.get('/users/search.json', query, callback);
    },
    wants: function (id, callback) {
        this.api.get('/users/' + id + '/wants/products.json', callback);
    },
    wanted: function (userId, productId, callback) {
        this.api.get('/users/' + userId + '/wants/products/' + productId + '.json', callback);
    },
    owns: function (id, callback) {
        this.api.get('/users/' + id + '/owns/products.json', callback);
    },
    owned: function (userId, productId, callback) {
        this.api.get('/users/' + userId + '/owns/products/' + productId + '.json', callback);
    },
    following: function (id, callback) {
        this.api.get('/users/' + id + '/following/users.json', callback);
    },
    isFollowingUser: function (userOne, userTwo, callback) {
        this.api.get('/users/' + userOne + '/following/users/' + userTwo + '.json', callback);
    },
    stores: function (id, callback) {
        this.api.get('/users/' + id + '/following/stores.json', callback);
    },
    isFollowingStore: function (userId, productId, callback) {
        this.api.get('/users/' + userId + '/following/stores/' + productId + '.json', callback);
    },
    searches: function (id, callback) {
        this.api.get('/users/' + id + '/following/searches.json', callback);
    },
    followers: function (id, callback) {
        this.api.get('/users/' + id + '/followers/users.json', callback);
    },
    collections: function (id, callback) {
        this.api.get('/users/' + id + '/collections.json', callback);
    },
    collection: function (userId, collectionId, callback) {
        this.api.get('/users/' + userId + '/collections/' + collectionId + '.json', callback);
    }
};

/*
 * Collctions Endpoints
 *
 */

Svpply.API.Collections = function (api) {
    this.api = api;
};

Svpply.API.Collections.prototype = {
    show: function (id, callback) {
        this.api.get('/collections/' + id + '.json', callback);
    },
    find: function (query, callback) {
        this.api.get('/collections/search.json', query, callback);
    },
    products: function (id, callback) {
        this.api.get('/collections/' + id + '/products.json', callback);
    },
    users: function (id, callback) {
        this.api.get('/collections/' + id + '/users.json', callback);
    },
    comments: function (id, callback) {
        this.api.get('/collections/' + id + '/comments.json', callback);
    }
};

/*
 * Shop Endpoints
 *
 */

Svpply.API.Shop = function (api) {
    this.api = api;
};

Svpply.API.Shop.prototype = {
    categories: function (callback) {
        this.api.get('/shop/categories.json', callback);
    },
    products: function (category, subcategory, query, callback) {
        this.api.get('/shop/' + category + '/' + subcategory + '.json', query, callback);
    }
};

exports.API = Svpply.API;
