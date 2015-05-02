(function(win){
    'use strict';

    var has = {}.hasOwnProperty, 
    toString = {}.toString, 
    cache = {},
    functionNameRe = /function\s+([^(]+)/,
    nativeTypes = [
        'Array', 
        'Boolean',
        'Date', 
        'Function', 
        'Number',
        'Object',
        'RegExp',
        'String'
    ];

    function typed(properties){
        var object = {}, prop;
        for(prop in properties){
            if(has.call(properties, prop)){
                defineProperty(object, prop, properties[prop]);
            }
        }
        return object;
    }

    function defineProperty(object, name, type){
        var value, validate = getValidator(name, type);
        Object.defineProperty(object, name, {
            enumerable: true,
            configurable: true,
            get: function(){
                return value;
            },
            set: function(val){
                if(validate(val)){
                    value = val;
                }
            }
        });
    }

    function getValidator(prop, constructor){       
        var type = getConstructorType(constructor);
        if(type){
            var valueType;
            return function(value){
                valueType = getType(value);
                if(valueType !== type){
                    error(prop, type, valueType);
                }
                return true;
            }; 
        }
        return function(value){
            if(!(value instanceof constructor)){
                error(prop, getFunctionName(constructor), getType(value));
            }
            return true;    
        };
    }

    function getType(obj){
        return toString.call(obj).slice(8, -1);
    }

    function getConstructorType(constructor){
        for(var i=0, len=nativeTypes.length; i < len; i++){
            if(constructor === win[nativeTypes[i]]){
                return nativeTypes[i];
            }
        }
        return null;
    }

    function getFunctionName(fn){
        return fn.name || fn.toString().match(functionNameRe)[1] || 'anonymous';
    }

    function error(prop, expected, actual){
        throw new TypeError('Invalid value assignment on "' + prop + '", expected: ' + expected + ', actual: ' + actual);
    }

    if(typeof module !== 'undefined' && module.exports){
        module.exports = typed;
    }else if(typeof define === 'function' && define.amd){
        define(function(){ return typed; });
    }else{
        win['typed'] = typed;
    }

})(this);