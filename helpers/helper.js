/**
 * Krishna Bhattarai
 * UT Arlington
 * July 2018
 * A helper library to make ugly javascript not suck so much. Use this library and save yourself countless hours
 */

const system = require('child_process').execSync
const _      = require('underscore')

module.exports = function() {
    let self = this

    self._ = _
    self.system = system

    self.print = function(...message){
        console.log(...message)
    }

    self.printf = function(object){
        self.print(JSON.stringify(object, null, 2))
    }

    self.pprint = function(object){
        return JSON.stringify(object, null, 2)
    }

    self.log = function (...message){
        message.unshift(self.timestamp())
        self.print(...message)
    }

    self.type = function (object){
        return typeof object
    }

    self.abs = function (object){
        return Math.abs(object)
    }
    self.pow = function (x, y){
        return Math.pow(x, y)
    }
    self.sum = function(list){
        return list.reduce((a, b) => a + b, 0)
    }
    self.max = function(list){
        return Math.max(...list)
    }
    self.min = function (list){
        return Math.min(...list)
    }
    self.len = function(object){
        return object.length
    }
    self.flatten = function(lists){
        return lists.reduce((a, b) => a.concat(b), [])
    }
    self.str = function(object){
        return object.toString()
    }
    self.int = function(string){
        return parseInt(string)
    }
    self.float = function(string){
        return parseFloat(string)
    }
    self.timestamp = function() {
        return new Date().toISOString()
    }
    self.keys = function(object){
        return Object.keys(object)
    }
    self.values = function(object){
        return Object.values(object)
    }
    self.sorted = function(object){
        return object.slice().sort()
    }
    self.copy = function (object){
        return Object.assign({}, object)
    }
    self.os = function (command){
        return system(command, {"encoding": 'utf8'})
    }
    self.empty = function (object){
        return _.isEmpty(object)
    }
    self.null = function (object){
        return _.isNull(object)
    }
    self.undefined = function (object){
        return _.isUndefined(object)
    }
    self.equals = function(x, y){
        return _.isEqual(x, y)
    }
    self.index = function(object, item){
        return object.indexOf(item)
    }
    self.remove = function(object, item){
        return _.without(object, item)
    }
}
