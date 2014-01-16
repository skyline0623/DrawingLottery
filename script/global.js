WEBAPP="/conceptnet/";

function getValueSetOfDict(dict) {
	var ret = [];
	for ( var key in dict) {
		// ////////console.log('key:' + key);
		if (dict.hasOwnProperty(key)) {
			var value = dict[key];
			if (value == undefined)
				continue;
			addToSet(ret, value);
		}
	}
	return ret;
}
// dict value is a set
function getAllValuesOfDict(dict) {
	var ret = [];
	for ( var key in dict) {
		// ////////console.log('key:' + key);
		if (dict.hasOwnProperty(key)) {
			$.each(dict[key], function(index, item) {
				addToSet(ret, item);
			});
		}
	}
	return ret;
}
function getAllKeysOfDict(dict) {
	var ret = [];
	for ( var key in dict) {
		if (dict.hasOwnProperty(key)) {
			ret.push(key);
		}
	}
	return ret;
}

function Set(set){
	this.size = 0;
	this._dict = {};
	this.add = function(val){
		if(this._dict[val] == true)
			return;
		this.size++;
		this._dict[val] = true;
	};
	this.contains = function(val){
		return this._dict[val] == true;
	};
	this.remove = function(val){
		if(this._dict[val] == undefined)
			return;
		this._dict[val] = undefined;
		this.size--;
	},
	this.toArray = function(){
		return getAllKeysOfDict(this._dict);
	};
	this.addAll = function(set){
		if(set instanceof Array){
			for(var i = 0; i < set.length; i++){
				this.add(set[i]);
			}
		}
		else if(set instanceof Set){
			var arr = set.toArray();
			for(var i = 0; i < arr.length; i++){
				this.add(arr[i]);
			}
		}
	};
	if(set instanceof Array){
		for(var i = 0; i < set.length; i++){
			this.add(set[i]);
		}
	}
	else if(set instanceof Set){
		var arr = set.toArray();
		for(var i = 0; i < arr.length; i++){
			this.add(arr[i]);
		}
	}
}

function SetMultimap(){
	this.keySize = 0;
	this.pairSize = 0;
	this._innerData = {};
	this.put = function(key, val){
		var set = this._innerData[key];
		if(set == undefined){
			set = new Set();
			this._innerData[key] = set;
			this.keySize++;
		}
		var size = set.size;
		set.add(val);
		if(set.size > size)
			this.pairSize++;
	};
	this.keysSet = function(){
		return new Set(getAllKeysOfDict(this._innerData));
	};
	this.get = function(key){
		if(key == undefined)
			return undefined;
		return this._innerData[key];
	};
	this.remove = function(key, value){
		if(value == undefined){
			if(this._innerData[key] == undefined)
				return;
			this._innerData[key] = undefined;
			this.keySize--;
			return;
		}
		var set = this._innerData[key];
		if(set == undefined)
			return;
		set.remove(value);
		this.pairSize--;
		if(set.size == 0){
			this._innerData[key] = undefined;
			this.keySize--;
		}
	};
	this.contains = function(key, value){
		if(key == undefined)
			return false;
		var set = this._innerData[key];
		if(set == undefined)
			return false;
		if(value == undefined)
			return true;
		return set.contains(value);
	};
	this.valuesSet = function(){
		var ret = new Set();
		var keys = getAllKeysOfDict(this._innerData);
		for(var i = 0; i < keys; i++){
			var key = keys[i];
			var set = this._innerData[key];
			ret.addAll(set);
		}
		return ret;
	};
};


