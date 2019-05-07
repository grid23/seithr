module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./lib/decorators/bound.js


function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ var bound = (function (_ref) {
  var kind = _ref.kind,
      key = _ref.key,
      placement = _ref.placement,
      descriptor = _ref.descriptor;
  if (kind !== "method") return {
    kind: kind,
    key: key,
    placement: placement,
    descriptor: descriptor
  };
  if (descriptor.value) return {
    kind: kind,
    key: key,
    placement: placement,
    descriptor: descriptor,
    extras: [{
      kind: "field",
      key: key,
      placement: "own",
      descriptor: _objectSpread({}, descriptor, {
        value: undefined
      }),
      initializer: function initializer() {
        return descriptor.value.bind(this);
      }
    }]
  };else if (descriptor.get) return {
    kind: kind,
    key: key,
    placement: placement,
    descriptor: _objectSpread({}, descriptor, {
      get: function get() {
        return descriptor.get.call(this);
      }
    })
  };
});
// CONCATENATED MODULE: ./lib/decorators/final.js


function final_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { final_defineProperty(target, key, source[key]); }); } return target; }

function final_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* harmony default export */ var decorators_final = (function (_ref) {
  var kind = _ref.kind,
      key = _ref.key,
      placement = _ref.placement,
      descriptor = _ref.descriptor;
  return {
    kind: kind,
    key: key,
    placement: placement,
    descriptor: final_objectSpread({}, descriptor, {
      configurable: false
    })
  };
});
// CONCATENATED MODULE: ./lib/decorators/frozen.js


var frozen = function frozen(deep, _ref) {
  var descriptor = _ref.descriptor,
      key = _ref.key,
      kind = _ref.kind,
      placement = _ref.placement,
      initializer = _ref.initializer;
  if (kind !== "field") return {
    descriptor: descriptor,
    key: key,
    kind: kind,
    placement: placement,
    initializer: initializer //TODO deep support :D

  };
  return {
    key: key,
    kind: kind,
    placement: placement,
    descriptor: {
      configurable: false,
      enumerable: descriptor.enumerable,
      writable: false
    },
    initializer: function () {
      return function () {
        return Object.freeze(initializer());
      };
    }()
  };
};

/* harmony default export */ var decorators_frozen = (function () {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  if (typeof args[0] === "boolean") return function () {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return frozen.apply(void 0, [true].concat(args));
  };else return frozen.apply(void 0, [false].concat(args));
});
// CONCATENATED MODULE: ./lib/decorators/index.js








// CONCATENATED MODULE: ./lib/store.js


/* harmony default export */ var store = (new WeakMap());
// CONCATENATED MODULE: ./lib/utils/cancelAnimationFrames.js



/* harmony default export */ var cancelAnimationFrames = (function (generatorFn) {
  if (store.has(generatorFn)) store.set(generatorFn, false);
});
// CONCATENATED MODULE: ./lib/errors.js


var ERR_EVENT_NOT_IMPLEMENTED = "ERR_EVENT_NOT_IMPLEMENTED";
var ERR_EVENT_TARGET_IS_NOT_VALID = "ERR_EVENT_TARGET_IS_NOT_VALID";
var ERR_CANNOT_BE_REUSED = "ERR_CANNOT_BE_REUSED";
var ERR_CSSTEXT = "ERR_CSSTEXT";
var errors_ERR_FN_EXPECTED = "function expected";
var ERR_GENERATOR_EXPECTED = "ERR_GENERATOR_EXPECTED";
var ERR_INVALID_TARGET = "ERR_INVALID_TARGET";
var ERR_NODE_NOT_CHILD = "ERR_NODE_NOT_CHILD";
var ERR_NODE_NOT_IMPLEMENTED = "ERR_NODE_NOT_IMPLEMENTED";
var ERR_READYSTATEFUL_NOT_IMPLEMENTED = "ERR_READYSTATEFUL_NOT_IMPLEMENTED";
var ERR_SAME_OBJ = "ERR_SAME_OBJ";
var ERR_ILLEGAL_CONSTRUCTOR = "ERR_ILLEGAL_CONSTRUCTOR";
var ERR_INVALID_DATA = "ERR_INVALID_DATA";
var ERR_TYPE_UNKNOWN = "ERR_TYPE_UNKNOWN";
var ERR_NOT_ITERABLE = "ERR_NOT_ITERABLE";
var ERR_NOT_A_NODE = "ERR_NOT_A_NODE";
var ERR_RHANDLER = "not a valid route handler";
var ERR_ROUTE_BUSY = "route has already been used";
var ERR_NOTROUTE = "not a valid route object";
var ERR_SS_NOT_WRITABLE = "ERR_SS_NOT_WRITABLE";
var errors_ERR_STRING_EXPECTED = "ERR_STRING_EXPECTED";
var WARN_LATE_NEXT = "WARN_LATE_NEXT"; // graph

var EALRDYCONN = "edge is already connected to a graph";
var EINVALIDCONS = "invalid constructor";
var ENOTEDGE = "object does not implement Edge";
var ENOTGRAPH = "object does not implement Graph";
var ENOTINSET = "object does not belong to the set";
var ENOTVERTEX = "object does not implement Vertex";
var EPRLLLNOTALLOW = "graph doesn't allow parallel edges";
var errors_ETOOMANYVERT = "edges cannot hold more vertices";
var EUNCOMPEDGE = "edge type is not allowed by this graph";
var EUNKNWNREL = "relation is unknown";
// CONCATENATED MODULE: ./lib/events/Event.js


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _decorate(decorators, factory, superClass, mixins) { var api = _getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function _getDecoratorsApi() { _getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var sdetail = new Object(Symbol("detail"));
var sevent = new Object(Symbol(""));
var sondom = new Object(Symbol());
var soriginaltarget = new Object(Symbol());
var sphase = new Object(Symbol());

var Event_Event = _decorate(null, function (_initialize) {
  var Event = // static from(event){
  //     if ( !(event instanceof Event) && !(event instanceof window.Event) )
  //       throw new Error(ERR_EVENT_NOT_IMPLEMENTED)
  //
  //     const From = event.constructor
  //     const to = new From(event.type, event)
  //     Object.setPrototypeOf(to, Event.prototype)
  //     Object.keys(From.prototype)
  //     .forEach(property => {
  //         if ( Event.prototype.hasOwnProperty(property) )
  //           return
  //         Object.defineProperty(to, property, Object.getOwnPropertyDescriptor(From.prototype, property))
  //     })
  //
  //     store.set(to, new WeakMap)
  //     store.get(to).set(sdetail, Object.seal(event.detail||null))
  //
  //     if ( event.target ) store.get(to).set(soriginaltarget, event.target)
  //     return to
  // }
  function Event(type) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref$bubbles = _ref.bubbles,
        bubbles = _ref$bubbles === void 0 ? true : _ref$bubbles,
        _ref$cancelable = _ref.cancelable,
        cancelable = _ref$cancelable === void 0 ? true : _ref$cancelable,
        _ref$composed = _ref.composed,
        composed = _ref$composed === void 0 ? false : _ref$composed,
        _ref$detail = _ref.detail,
        detail = _ref$detail === void 0 ? null : _ref$detail;

    _classCallCheck(this, Event);

    _initialize(this);

    var event = document.createEvent("Event");
    event.initEvent(type, bubbles, cancelable);
    store.set(this, new WeakMap());
    store.get(this).set(sdetail, Object.seal(detail));
    store.get(this).set(sevent, event);
    store.set(event, this); // x-reference
  };

  return {
    F: Event,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "NONE",
      value: function NONE() {
        return window.Event.NONE;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "CAPTURING_PHASE",
      value: function CAPTURING_PHASE() {
        return window.Event.CAPTURING_PHASE;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "AT_TARGET",
      value: function AT_TARGET() {
        return window.Event.AT_TARGET;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "BUBBLING_PHASE",
      value: function BUBBLING_PHASE() {
        return window.Event.BUBBLING_PHASE;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "BROADCAST_PHASE",
      value: function BROADCAST_PHASE() {
        return window.Event.BUBBLING_PHASE + 1;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "originalEvent",
      value: function originalEvent() {
        return store.get(this).get(sevent);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "bubbles",
      value: function bubbles() {
        return this.originalEvent.bubbles;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "cancelable",
      value: function cancelable() {
        return this.originalEvent.cancelable;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "currentTarget",
      value: function currentTarget() {
        var domnode = this.originalEvent.currentTarget;
        return store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "deepPath",
      value: function deepPath() {
        var dompath = this.originalEvent.deepPath;
        return !dompath ? dompath : store.get(this).get(sondom) ? dompath.map(function (node) {
          return store.get(node);
        }) : dompath;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "defaultPrevented",
      value: function defaultPrevented() {
        return this.originalEvent.defaultPrevented;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "detail",
      value: function detail() {
        return store.get(this).get(sdetail) || (this.originalEvent.detail ? this.originalEvent.detail : null);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "eventPhase",
      value: function eventPhase() {
        return store.get(this).get(sphase) || this.originalEvent.eventPhase;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "explicitOriginalTarget",
      value: function explicitOriginalTarget() {
        return this.originalTarget;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "originalTarget",
      value: function originalTarget() {
        var domnode = this.originalEvent.originalTarget;
        return store.get(this).has(soriginaltarget) ? store.get(this).get(soriginaltarget) : store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "relatedTarget",
      value: function relatedTarget() {
        var domnode = this.originalEvent.relatedTarget;
        return store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "target",
      value: function target() {
        var domnode = this.originalEvent.target;
        return store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "type",
      value: function type() {
        return this.originalEvent.type;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "preventDefault",
      value: function preventDefault() {
        return this.originalEvent.preventDefault();
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "stop",
      value: function stop() {
        return this.originalEvent.stopPropagation();
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "stopImmediate",
      value: function stopImmediate() {
        return this.originalEvent.stopImmediatePropagation();
      }
    }]
  };
});


// CONCATENATED MODULE: ./lib/models/ModelChange.js


function ModelChange_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ModelChange_typeof = function _typeof(obj) { return typeof obj; }; } else { ModelChange_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ModelChange_typeof(obj); }

function ModelChange_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (ModelChange_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }





var ModelChange_ModelChange =
/*#__PURE__*/
function (_Event) {
  _inherits(ModelChange, _Event);

  _createClass(ModelChange, null, [{
    key: "TYPE",
    get: function get() {
      return "model:change";
    }
  }]);

  function ModelChange(path) {
    var _this;

    ModelChange_classCallCheck(this, ModelChange);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(ModelChange).call(this, ModelChange.TYPE, {
      bubbles: false
    }));
    store.get(_assertThisInitialized(_this)).set(Model_Model, path);
    return _this;
  }

  _createClass(ModelChange, [{
    key: "path",
    get: function get() {
      return store.get(this).get(Model_Model);
    }
  }, {
    key: "toString",
    get: function get() {
      return this.path.join(".");
    }
  }]);

  return ModelChange;
}(Event_Event);


// CONCATENATED MODULE: ./lib/env.js


var env_BUBBLES = function () {
  var bubbles = false;
  var a = document.createElement("div");
  var b = a.appendChild(document.createElement("div"));
  a.addEventListener("bubblestest", function (e) {
    return bubbles = true;
  });
  var e = document.createEvent("Event");
  e.initEvent("bubblestest", true, true);
  b.dispatchEvent(e);
  return bubbles;
}();
// CONCATENATED MODULE: ./lib/utils/dummy.js


/* harmony default export */ var utils_dummy = (function () {
  return document.createElement("div");
});
// CONCATENATED MODULE: ./lib/events/EventDispatcher.js


function EventDispatcher_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { EventDispatcher_typeof = function _typeof(obj) { return typeof obj; }; } else { EventDispatcher_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return EventDispatcher_typeof(obj); }

function EventDispatcher_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EventDispatcher_decorate(decorators, factory, superClass, mixins) { var api = EventDispatcher_getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(EventDispatcher_coalesceClassElements(r.d.map(EventDispatcher_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function EventDispatcher_getDecoratorsApi() { EventDispatcher_getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!EventDispatcher_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return EventDispatcher_toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = EventDispatcher_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = EventDispatcher_optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = EventDispatcher_optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function EventDispatcher_createElementDescriptor(def) { var key = EventDispatcher_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function EventDispatcher_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function EventDispatcher_coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (EventDispatcher_isDataDescriptor(element.descriptor) || EventDispatcher_isDataDescriptor(other.descriptor)) { if (EventDispatcher_hasDecorators(element) || EventDispatcher_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (EventDispatcher_hasDecorators(element)) { if (EventDispatcher_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } EventDispatcher_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function EventDispatcher_hasDecorators(element) { return element.decorators && element.decorators.length; }

function EventDispatcher_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function EventDispatcher_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function EventDispatcher_toPropertyKey(arg) { var key = EventDispatcher_toPrimitive(arg, "string"); return EventDispatcher_typeof(key) === "symbol" ? key : String(key); }

function EventDispatcher_toPrimitive(input, hint) { if (EventDispatcher_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (EventDispatcher_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function EventDispatcher_toArray(arr) { return EventDispatcher_arrayWithHoles(arr) || EventDispatcher_iterableToArray(arr) || EventDispatcher_nonIterableRest(); }

function EventDispatcher_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function EventDispatcher_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function EventDispatcher_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









var EventDispatcher_EventDispatcher = EventDispatcher_decorate(null, function (_initialize) {
  var EventDispatcher = function EventDispatcher() {
    EventDispatcher_classCallCheck(this, EventDispatcher);

    _initialize(this);

    store.set(this, new WeakMap());
  };

  return {
    F: EventDispatcher,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "BUBBLES",
      value: function BUBBLES() {
        return env_BUBBLES;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "broadcast",
      value: function broadcast(event, targets) {
        return this.dispatch(event, targets, true);
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "dispatch",
      value: function dispatch(event) {
        var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
            target = _ref.target,
            relatedTarget = _ref.relatedTarget,
            originalTarget = _ref.originalTarget;

        var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (!(event instanceof Event_Event) && !(event instanceof window.Event) || !store.has(event)) throw new Error(ERR_EVENT_NOT_IMPLEMENTED);
        relatedTarget && store.get(event).set(srelatedtarget, relatedTarget);
        originalTarget && store.get(event).set(soriginaltarget, originalTarget || target);

        if (target instanceof window.Node) {
          store.get(event).set(sondom, false);
          return target.dispatchEvent(store.get(event).get(event.originalEvent));
        }

        if (!store.has(target)) throw new Error(ERR_EVENT_TARGET_IS_NOT_VALID);
        store.get(event).set(sondom, true);

        if (!env_BUBBLES) {
          var root = store.get(store.get(target).rootNode).get(sdummy);
          if (!document.head.contains(root)) document.head.appendChild(root);
        }

        var r_value = store.get(target).get(sdummy).dispatchEvent(event.originalEvent);

        if (r_value && broadcast) {
          store.get(event).set(sphase, Event_Event.BROADCAST_PHASE);
          store.get(sbroadcastChannel).dispatchEvent(event.originalEvent);
        }

        return r_value;
      }
    }]
  };
});


// CONCATENATED MODULE: ./lib/events/EventTarget.js


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || EventTarget_iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function EventTarget_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function EventTarget_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function EventTarget_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function EventTarget_createClass(Constructor, protoProps, staticProps) { if (protoProps) EventTarget_defineProperties(Constructor.prototype, protoProps); if (staticProps) EventTarget_defineProperties(Constructor, staticProps); return Constructor; }







var sbroadcastChannel = new Object(Symbol("broadcastchannel"));
var sdummy = new Object(Symbol("dummy"));
store.set(sbroadcastChannel, utils_dummy());

var EventTarget_EventTarget =
/*#__PURE__*/
function () {
  function EventTarget() {
    EventTarget_classCallCheck(this, EventTarget);

    store.set(this, new WeakMap());
    store.get(this).set(sdummy, utils_dummy());
    store.set(store.get(this).get(sdummy), this); //cross-reference
  }

  EventTarget_createClass(EventTarget, [{
    key: "addBroadcastListener",
    value: function addBroadcastListener() {
      var _store$get;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var nhandler = args[1];

      var handler = function handler(e) {
        if (store.has(e)) e = store.get(e);
        return nhandler(e);
      };

      store.set(args[1], handler);
      return (_store$get = store.get(sbroadcastChannel)).addEventListener.apply(_store$get, [args[0], handler].concat(_toConsumableArray(args.slice(2))));
    }
  }, {
    key: "addEventListener",
    value: function addEventListener() {
      var _store$get$get;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var nhandler = args[1];

      var handler = function handler(e) {
        if (store.has(e)) e = store.get(e);
        return nhandler(e);
      };

      store.set(args[1], handler);
      return (_store$get$get = store.get(this).get(sdummy)).addEventListener.apply(_store$get$get, [args[0], handler].concat(_toConsumableArray(args.slice(2))));
    }
  }, {
    key: "broadcastEvent",
    value: function broadcastEvent(event) {
      var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          relatedTarget = _ref.relatedTarget,
          originalTarget = _ref.originalTarget;

      return this.dispatchEvent(event, {
        target: store.get(sbroadcastChannel),
        relatedTarget: relatedTarget,
        originalTarget: this
      }, true);
    }
  }, {
    key: "dispatchEvent",
    value: function dispatchEvent(event) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          relatedTarget = _ref2.relatedTarget,
          originalTarget = _ref2.originalTarget;

      var broadcast = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      if (event && event.eventPhase > Event_Event.NONE || event instanceof window.Event && !(event instanceof Event_Event)) event = Event_Event.from(event);
      return new EventDispatcher_EventDispatcher().dispatch(event, {
        target: this,
        relatedTarget: relatedTarget,
        originalTarget: originalTarget
      }, broadcast);
    }
  }, {
    key: "removeBroadcastListener",
    value: function removeBroadcastListener() {
      var _store$get2;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      var nhandler = args[1];
      var handler = store.get(nhandler);
      return (_store$get2 = store.get(sbroadcastChannel)).removeEventListener.apply(_store$get2, [args[0], handler].concat(_toConsumableArray(args.slice(2))));
    }
  }, {
    key: "removeEventListener",
    value: function removeEventListener() {
      var _store$get$get2;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      var nhandler = args[1];
      var handler = store.get(nhandler);
      return (_store$get$get2 = store.get(this).get(sdummy)).removeEventListener.apply(_store$get$get2, [args[0], handler].concat(_toConsumableArray(args.slice(2))));
    }
  }]);

  return EventTarget;
}();


// CONCATENATED MODULE: ./lib/utils/isNative.js


var known_exceptions = ["[object CSSMediaRule]"];
var rnative = /\s*\[native code\]\s*/i;
/* harmony default export */ var isNative = (function (fn) {
  try {
    var _toString = fn.toString() || "";

    return typeof fn == "function" ? !!_toString.match(rnative) : known_exceptions.indexOf(_toString) > -1 ? true : false;
  } catch (e) {
    return null;
  }
});
// CONCATENATED MODULE: ./lib/utils/toType.js


function toType_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { toType_typeof = function _typeof(obj) { return typeof obj; }; } else { toType_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return toType_typeof(obj); }


/* harmony default export */ var toType = (function (o) {
  if (Array.isArray(o)) return "array";

  var ntype = toType_typeof(o);

  return ntype !== "object" ? o === o ? ntype : "nan" : o && o.constructor && isNative(o.next) ? "generator" : o && o.constructor && !isNative(o.constructor) ? "instance" : o && typeof o.prototype == "function" ? "function" : o && toType_typeof(o.constructor) == Map ? "map" : o && toType_typeof(o.constructor) == WeakMap ? "weakmap" : o && toType_typeof(o.constructor) == Set ? "set" : o && toType_typeof(o.constructor) == WeakSet ? "weakset" : Reflect.apply(Object.prototype.toString, o, []).slice(8, -1).toLowerCase();
});
// CONCATENATED MODULE: ./lib/uids/UID.js


function UID_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { UID_typeof = function _typeof(obj) { return typeof obj; }; } else { UID_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return UID_typeof(obj); }

function UID_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function UID_decorate(decorators, factory, superClass, mixins) { var api = UID_getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(UID_coalesceClassElements(r.d.map(UID_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function UID_getDecoratorsApi() { UID_getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!UID_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return UID_toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = UID_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = UID_optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = UID_optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function UID_createElementDescriptor(def) { var key = UID_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function UID_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function UID_coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (UID_isDataDescriptor(element.descriptor) || UID_isDataDescriptor(other.descriptor)) { if (UID_hasDecorators(element) || UID_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (UID_hasDecorators(element)) { if (UID_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } UID_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function UID_hasDecorators(element) { return element.decorators && element.decorators.length; }

function UID_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function UID_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function UID_toPropertyKey(arg) { var key = UID_toPrimitive(arg, "string"); return UID_typeof(key) === "symbol" ? key : String(key); }

function UID_toPrimitive(input, hint) { if (UID_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (UID_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function UID_toArray(arr) { return UID_arrayWithHoles(arr) || UID_iterableToArray(arr) || UID_nonIterableRest(); }

function UID_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function UID_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function UID_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



var def_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
var def_map = "Fxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
var def_radix = 16;
var def_regexp = /[xy]/g;
var schars = new Object(Symbol());
var smap = new Object(Symbol());
var sradix = new Object(Symbol());
var sregexp = new Object(Symbol());

var UID_UID = UID_decorate(null, function (_initialize) {
  var UID = function UID() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$chars = _ref.chars,
        chars = _ref$chars === void 0 ? UID.CHARS : _ref$chars,
        _ref$map = _ref.map,
        map = _ref$map === void 0 ? UID.MAP : _ref$map,
        _ref$radix = _ref.radix,
        radix = _ref$radix === void 0 ? UID.RADIX : _ref$radix,
        _ref$regexp = _ref.regexp,
        regexp = _ref$regexp === void 0 ? UID.REGEXP : _ref$regexp;

    UID_classCallCheck(this, UID);

    _initialize(this);

    store.set(this, new WeakMap());
    store.get(this).set(schars, chars);
    store.get(this).set(smap, map);
    store.get(this).set(sradix, radix);
    store.get(this).set(sregexp, regexp);
  };

  return {
    F: UID,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "CHARS",
      value: function CHARS() {
        return def_chars;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "MAP",
      value: function MAP() {
        return def_map;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "RADIX",
      value: function RADIX() {
        return def_radix;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "REGEXP",
      value: function REGEXP() {
        return def_regexp;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      "static": true,
      key: "uid",
      value: function uid() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref2$chars = _ref2.chars,
            chars = _ref2$chars === void 0 ? UID.CHARS : _ref2$chars,
            _ref2$map = _ref2.map,
            map = _ref2$map === void 0 ? UID.MAP : _ref2$map,
            _ref2$radix = _ref2.radix,
            radix = _ref2$radix === void 0 ? UID.RADIX : _ref2$radix,
            _ref2$regexp = _ref2.regexp,
            regexp = _ref2$regexp === void 0 ? UID.REGEXP : _ref2$regexp;

        return new UID({
          chars: chars,
          map: map,
          radix: radix,
          regexp: regexp
        }).generate();
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "chars",
      value: function chars() {
        return store.get(this).get(schars);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "map",
      value: function map() {
        return store.get(this).get(smap);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "radix",
      value: function radix() {
        return store.get(this).get(sradix);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "regexp",
      value: function regexp() {
        return store.get(this).get(sregexp);
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "generate",
      value: function generate() {
        var _this = this;

        return this.map.replace(this.regexp, function (c, r) {
          r = (Date.now() + Math.random() * _this.radix) % _this.radix | 0;
          if (c === "y") r = r & 0x3 | 0x8;
          return _this.chars[r];
        });
      }
    }]
  };
});


// CONCATENATED MODULE: ./lib/nodes/Node.js


function Node_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Node_typeof = function _typeof(obj) { return typeof obj; }; } else { Node_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Node_typeof(obj); }

function Node_toConsumableArray(arr) { return Node_arrayWithoutHoles(arr) || Node_iterableToArray(arr) || Node_nonIterableSpread(); }

function Node_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Node_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Node_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Node_possibleConstructorReturn(self, call) { if (call && (Node_typeof(call) === "object" || typeof call === "function")) { return call; } return Node_assertThisInitialized(self); }

function Node_getPrototypeOf(o) { Node_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Node_getPrototypeOf(o); }

function Node_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Node_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Node_setPrototypeOf(subClass, superClass); }

function Node_setPrototypeOf(o, p) { Node_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Node_setPrototypeOf(o, p); }

function Node_decorate(decorators, factory, superClass, mixins) { var api = Node_getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(Node_coalesceClassElements(r.d.map(Node_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function Node_getDecoratorsApi() { Node_getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!Node_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return Node_toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = Node_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = Node_optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = Node_optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function Node_createElementDescriptor(def) { var key = Node_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function Node_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function Node_coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (Node_isDataDescriptor(element.descriptor) || Node_isDataDescriptor(other.descriptor)) { if (Node_hasDecorators(element) || Node_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (Node_hasDecorators(element)) { if (Node_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } Node_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function Node_hasDecorators(element) { return element.decorators && element.decorators.length; }

function Node_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function Node_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function Node_toPropertyKey(arg) { var key = Node_toPrimitive(arg, "string"); return Node_typeof(key) === "symbol" ? key : String(key); }

function Node_toPrimitive(input, hint) { if (Node_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Node_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function Node_toArray(arr) { return Node_arrayWithHoles(arr) || Node_iterableToArray(arr) || Node_nonIterableRest(); }

function Node_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Node_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Node_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







var snodename = new Object(Symbol("nodename"));
var snodetype = new Object(Symbol("nodetype"));
var snodevalue = new Object(Symbol("nodevalue"));
var stextnode = new Object(Symbol("textnode"));
var suid = new Object(Symbol("uid"));
var registerIDX = 13;

var Node_Node = Node_decorate(null, function (_initialize, _EventTarget) {
  var Node =
  /*#__PURE__*/
  function (_EventTarget2) {
    Node_inherits(Node, _EventTarget2);

    //   const unsigned short ELEMENT_NODE = 1;
    //   const unsigned short ATTRIBUTE_NODE = 2;
    //   const unsigned short TEXT_NODE = 3;
    //   const unsigned short CDATA_SECTION_NODE = 4;
    //   const unsigned short ENTITY_REFERENCE_NODE = 5; // historical
    //   const unsigned short ENTITY_NODE = 6; // historical
    //   const unsigned short PROCESSING_INSTRUCTION_NODE = 7;
    //   const unsigned short COMMENT_NODE = 8;
    //   const unsigned short DOCUMENT_NODE = 9;
    //   const unsigned short DOCUMENT_TYPE_NODE = 10;
    //   const unsigned short DOCUMENT_FRAGMENT_NODE = 11;
    //   const unsigned short NOTATION_NODE = 12; // historical
    function Node() {
      var _this;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$name = _ref.name,
          name = _ref$name === void 0 ? "" : _ref$name,
          _ref$type = _ref.type,
          type = _ref$type === void 0 ? "OBJECT_NODE" : _ref$type,
          _ref$value = _ref.value,
          value = _ref$value === void 0 ? null : _ref$value;

      Node_classCallCheck(this, Node);

      _this = Node_possibleConstructorReturn(this, Node_getPrototypeOf(Node).call(this));

      _initialize(Node_assertThisInitialized(_this));

      store.get(Node_assertThisInitialized(_this)).set(snodename, name && name.toString ? name.toString() : "");
      store.get(Node_assertThisInitialized(_this)).set(snodetype, typeof Node[type] == "number" ? Node[type] : Node.OBJECT_NODE);
      _this.nodeValue = value;
      return _this;
    }

    return Node;
  }(_EventTarget);

  return {
    F: Node,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "OBJECT_NODE",
      value: function OBJECT_NODE() {
        return 13;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      "static": true,
      key: "lca",
      value: function lca() {
        return Node.leastCommonAncestor;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      "static": true,
      key: "leastCommonAncestor",
      value: function leastCommonAncestor(iterable) {
        if (!iterable[Symbol.iterator]) throw new TypeError(ERR_NOT_ITERABLE);
        var nodes = new Set(Node_toConsumableArray(iterable));
        if (!Node_toConsumableArray(nodes).every(function (node) {
          return node instanceof Node;
        })) throw new TypeError(ERR_NOT_A_NODE);
        if (nodes.size == 1) return Node_toConsumableArray(nodes)[0];
        var paths = [];
        nodes.forEach(function (node) {
          var path = [];

          while (node) {
            path.push(node);
            node = node.parentNode;
          }

          paths.push(path);
        });
        var last = null,
            candidates;

        while (candidates = new Set(Node_toConsumableArray(paths.map(function (path) {
          return path.pop();
        })).filter(function (v) {
          return !!v;
        })), candidates.size == 1) {
          last = Node_toConsumableArray(candidates)[0];
        }

        return last;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      "static": true,
      key: "registerType",
      value: function registerType(type) {
        Object.defineProperty(Node, type, {
          value: ++registerIDX
        });
        return Node[type];
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "childNodes",
      value: function childNodes() {
        var domchildren = Node_toConsumableArray(store.get(this).get(sdummy).childNodes);

        return domchildren && domchildren.map(function (dummy) {
          return store.get(dummy);
        });
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "children",
      value: function children() {
        return this.childNodes;
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "firstChild",
      value: function firstChild() {
        var domnode = store.get(this).get(sdummy).firstChild;
        return domnode && store.get(domnode);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "lastChild",
      value: function lastChild() {
        var domnode = store.get(this).get(sdummy).lastChild;
        return domnode && store.get(domnode);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nextSibling",
      value: function nextSibling() {
        var domnode = store.get(this).get(sdummy).nextSibling;
        return domnode && store.get(domnode);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nodeName",
      value: function nodeName() {
        return store.get(this).get(snodename);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nodeType",
      value: function nodeType() {
        return store.get(this).get(snodetype);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nodeValue",
      value: function nodeValue() {
        return store.get(this).get(snodevalue);
      }
    }, {
      kind: "set",
      key: "nodeValue",
      value: function nodeValue(v) {
        if (this.nodeValue === null) return; // cannot change a null value //TODO throw error ?

        store.get(this).get(sdummy).setAttribute("type", toType(v));
        if (v != null) store.get(this).get(sdummy).setAttribute("value", v && v.toString && v.toString());else store.get(this).get(sdummy).removeAttribute("value");
        store.get(this).set(snodevalue, v);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "parentNode",
      value: function parentNode() {
        var domnode = store.get(this).get(sdummy).parentNode;
        return domnode && store.get(domnode);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "previousSibling",
      value: function previousSibling() {
        var domnode = store.get(this).get(sdummy).previousSibling;
        return domnode && store.get(domnode);
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "rootNode",
      value: function rootNode() {
        return this.getRootNode();
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "siblings",
      value: function siblings() {
        var domsiblings = store.get(this).get(sdummy).siblings;
        return domsiblings && domsiblings.map(function (dummy) {
          return store.get(dummy);
        });
      }
    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "uid",
      value: function uid() {
        if (!store.get(this).has(suid)) store.get(this).set(suid, UID_UID.uid());
        return store.get(this).get(suid);
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "appendChild",
      value: function appendChild(node) {
        var parent = store.get(this).get(sdummy);
        var child = store.get(node).get(sdummy);
        return store.get(parent.appendChild(child));
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "comparePosition",
      value: function comparePosition(node) {
        var a = store.get(this).get(sdummy);
        var b = store.get(node).get(sdummy);
        return a.comparePosition(b);
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "contains",
      value: function contains(node) {
        var a = store.get(this).get(sdummy);
        var b = store.get(node).get(sdummy);
        return a.contains(b);
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "getRootNode",
      value: function getRootNode() {
        var top = store.get(target).get(sdummy);

        while (top.parentNode && store.has(top)) {
          top = top.parentNode;
        }

        return store.get(top);
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "hasChildNodes",
      value: function hasChildNodes() {
        return store.get(this).get(sdummy).hasChildNodes();
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "insertBefore",
      value: function insertBefore(node, referenceNode) {
        var parent = store.get(this).get(sdummy);
        var child = store.get(node).get(sdummy);
        var referenceChild = store.get(referenceNode).get(sdummy);
        return store.get(parent.insertBefore(child, referenceChild));
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "isEqualNode",
      value: function isEqualNode(node) {
        //check if node is an instance of the same class as this
        return node instanceof this.constructor;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "isSameNode",
      value: function isSameNode(node) {
        return this === node;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "removeChild",
      value: function removeChild(node) {
        var parent = store.get(this).get(sdummy);
        var child = store.get(node).get(sdummy);
        return store.get(parent.removeChild(child));
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "replaceChild",
      value: function replaceChild(node, referenceNode) {
        var parent = store.get(this).get(sdummy);
        var child = store.get(node).get(sdummy);
        var referenceChild = store.get(referenceNode).get(sdummy);
        return store.get(parent.replaceChild(child, referenceChild));
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "valueOf",
      value: function valueOf() {
        return this.nodeValue;
      }
    }]
  };
}, EventTarget_EventTarget);


// CONCATENATED MODULE: ./lib/models/Model.js


function Model_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Model_typeof = function _typeof(obj) { return typeof obj; }; } else { Model_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Model_typeof(obj); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Model_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Model_possibleConstructorReturn(self, call) { if (call && (Model_typeof(call) === "object" || typeof call === "function")) { return call; } return Model_assertThisInitialized(self); }

function Model_getPrototypeOf(o) { Model_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Model_getPrototypeOf(o); }

function Model_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Model_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Model_createClass(Constructor, protoProps, staticProps) { if (protoProps) Model_defineProperties(Constructor.prototype, protoProps); if (staticProps) Model_defineProperties(Constructor, staticProps); return Constructor; }

function Model_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Model_setPrototypeOf(subClass, superClass); }

function Model_setPrototypeOf(o, p) { Model_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Model_setPrototypeOf(o, p); }

function Model_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function Model_toConsumableArray(arr) { return Model_arrayWithoutHoles(arr) || Model_iterableToArray(arr) || Model_nonIterableSpread(); }

function Model_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Model_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Model_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }




var sdata = new Object(Symbol("data"));
var soverflow = new Object(Symbol("overflow"));
var spath = new Object(Symbol("path"));
var sseal = new Object(Symbol("seal"));
var sstrictseal = new Object(Symbol("strictseal"));
var ssymbol = new Object(Symbol("symbol"));
var starget = new Object(Symbol("target"));
var sproxy = new Object(Symbol("proxy"));

var Model_dispatchUpdate = function dispatchUpdate(model, path) {
  return model.dispatchEvent(new ModelChange_ModelChange(path));
}; //sync event


var xref = new Map();
var proxies = new WeakMap();
var revocable = null;

var noop = function noop(strictlySealed) {
  return function () {
    return !strictlySealed;
  };
};

var revocableMeta = function revocableMeta(model, target, path) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var traps = {
    get: function get(target, key) {
      if (Reflect.apply(Object.prototype.hasOwnProperty, target, [key])) return target[key];
      return revocableMeta(model, target, [].concat(Model_toConsumableArray(path), [key]), opts);
    } // TODO make the following compatible with proxy-polyfill
    // , defineProperty:noop(true), deleteProperty:noop(true)
    // , preventExtensions:noop(true)
    ,
    set: noop(true)
  };

  var _Proxy$revocable = Proxy.revocable(Object.create({}, {
    model: {
      enumerable: true,
      configurable: true,
      value: model
    },
    path: {
      enumerable: true,
      configurable: true,
      value: path
    }
  }), traps),
      revoke = _Proxy$revocable.revoke,
      proxy = _Proxy$revocable.proxy;

  proxies.set(proxy, new WeakMap([[starget, target], [sproxy, proxy]])); // if ( revocable )
  //   revocable()
  // revocable = () => setTimeout(() => {
  //     proxies.delete(proxy)
  //     revoke()
  // }, 4)

  return proxy;
};

var revocableProxy = function revocableProxy(model, target, path) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var traps = {
    get: function get(target, key) {
      // if the requested property is object like, return a proxy to that object
      if (target[key] instanceof Object && !target[key].hook) return revocableProxy(model, target[key], [].concat(Model_toConsumableArray(path), [key]), opts); // if requested property is a function, return the result of that function
      else if (typeof target[key] == "function") return Reflect.apply(target[key], model, []); // if the requested property is primitive value, return the primitive (no proxy)
        else if (Reflect.apply(Object.prototype.hasOwnProperty, target, [key])) return target[key]; // if the current value is object like, and the requested property doesn't exist and the node has a parent
          // push the request to the parent
          else if (target instanceof Object && model.overflow && model.parentNode) try {
              var candidate = model.parentNode.io;

              for (var _i = 0, _arr = [].concat(Model_toConsumableArray(path), [key]); _i < _arr.length; _i++) {
                var curr = _arr[_i];
                candidate = candidate[curr];
              }

              return candidate;
            } catch (e) {} //TODO

      return undefined;
    } // TODO make the following compatible with proxy-polyfill
    // , defineProperty: (target, key, descriptor) => {
    //       const rv  = Object.defineProperty(target, key, descriptor)
    //       !opts.silent && dispatchUpdate(model, [...path, key])
    //       return rv // must return true/false depending on success/failure
    //   }
    // , deleteProperty: (target, property) => {
    //       if ( property in target)
    //         delete target[property]
    //       !opts.silent && dispatchUpdate(model, [...path])
    //       return true
    //
    //   }
    ,
    set: function set(target, key, value) {
      if (opts.hook) {
        if (typeof value !== "function") return false;
        Object.defineProperties(value, {
          toJSON: {
            value: function value() {
              return undefined;
            }
          },
          hook: {
            value: true
          }
        });
      }

      target[key] = value;
      !opts.silent && Model_dispatchUpdate(model, [].concat(Model_toConsumableArray(path), [key]));
      return true; // return true/false depending on success/failure
    }
  };
  if (model.sealed) // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions =
    traps.set = noop(model.strictlySealed);

  var _Proxy$revocable2 = Proxy.revocable(target, traps),
      revoke = _Proxy$revocable2.revoke,
      proxy = _Proxy$revocable2.proxy;

  proxies.set(proxy, new WeakMap([[starget, target], [sproxy, proxy]])); // if ( revocable )
  //   revocable()
  // revocable = () => setTimeout(() => {
  //     proxies.delete(proxy)
  //     revoke()
  // }, 4)

  return proxy;
}; // export const events = {
//     modelchange: ModelChange.TYPE
// }


var Model_Model =
/*#__PURE__*/
function (_Node) {
  Model_inherits(Model, _Node);

  Model_createClass(Model, null, [{
    key: "from",
    value: function () {
      var _from = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function from() {
        return _from.apply(this, arguments);
      }

      return from;
    }() // get from a service/ajax call

  }, {
    key: "ref",
    value: function ref(_ref) {
      return xref.get(Symbol["for"](_ref));
    }
  }, {
    key: "unmask",
    value: function unmask(proxy) {
      if (!proxies.has(proxy)) return null;
      return proxies.get(proxy).get(starget);
    }
  }, {
    key: "io",
    get: function get() {
      var _Proxy$revocable3 = Proxy.revocable({}, {
        get: function get(target, key) {
          var model = xref.get(Symbol["for"](key));
          return model.io;
        }
      }),
          proxy = _Proxy$revocable3.proxy,
          revoke = _Proxy$revocable3.revoke; // if ( revocable )
      //   revocable()
      // revocable = () => setTimeout(revoke, 4)


      return proxy;
    }
  }]);

  function Model() {
    var _this;

    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        ref = _ref2.ref,
        _ref2$overflow = _ref2.overflow,
        overflow = _ref2$overflow === void 0 ? true : _ref2$overflow,
        _ref2$seal = _ref2.seal,
        seal = _ref2$seal === void 0 ? false : _ref2$seal,
        _ref2$strictseal = _ref2.strictseal,
        strictseal = _ref2$strictseal === void 0 ? false : _ref2$strictseal;

    Model_classCallCheck(this, Model);

    // ref can be anything compatible with a map key
    _this = Model_possibleConstructorReturn(this, Model_getPrototypeOf(Model).call(this)); // define a symbol(uid) ( uid comes from seithr.Node
    // save symbol to model link
    // if a ref is passed, save ref to model link

    store.get(Model_assertThisInitialized(_this)).set(ssymbol, Symbol["for"](_this.uid));
    store.get(Model_assertThisInitialized(_this)).set(soverflow, overflow);
    xref.set(_this.valueOf(), Model_assertThisInitialized(_this));
    xref.set(store.get(Model_assertThisInitialized(_this)).get(ssymbol), Model_assertThisInitialized(_this));
    if (ref) xref.set(Symbol["for"](ref), Model_assertThisInitialized(_this));
    store.get(Model_assertThisInitialized(_this)).set(sdata, null);
    if (seal || strictseal) _this.seal(strictseal);
    return _this;
  }

  Model_createClass(Model, [{
    key: "fetch",
    value: function () {
      var _fetch = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2);
      }));

      function fetch() {
        return _fetch.apply(this, arguments);
      }

      return fetch;
    }() //fetch data from a XMLHttpRequest ( Service )

  }, {
    key: "seal",
    value: function seal(strict) {
      store.get(this).set(sseal, true);
      store.get(this).set(sstrictseal, !!strict);
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return JSON.parse(JSON.stringify(store.get(this).get(sdata)));
    } //prevent access to raw object via toJSON()

  }, {
    key: "toString",
    value: function toString() {
      return this.valueOf();
    }
  }, {
    key: "valueOf",
    value: function valueOf() {
      return Symbol.keyFor(store.get(this).get(ssymbol));
    }
  }, {
    key: "hook",
    get: function get() {
      if (store.get(this).get(sdata) instanceof Object) return revocableProxy(this, store.get(this).get(sdata), [], {
        hook: true
      });
      return store.get(this).get(sdata);
    }
    /* proxy */

  }, {
    key: "io",
    get: function get() {
      if (store.get(this).get(sdata) instanceof Object) return revocableProxy(this, store.get(this).get(sdata), []);
      return store.get(this).get(sdata);
    },
    set: function set(v) {
      store.get(this).set(sdata, v);
      Model_dispatchUpdate(this, []);
    }
    /* proxy */

  }, {
    key: "m",
    get: function get() {
      return revocableMeta(this, store.get(this).get(sdata), [], {});
    }
    /* proxy */

  }, {
    key: "meta",
    get: function get() {
      return this.m;
    }
    /* proxy */

  }, {
    key: "silentio",
    get: function get() {
      return revocableProxy(this, store.get(this).get(sdata), [], {
        silent: true
      });
    },
    set: function set(v) {
      store.get(this).set(sdata, v);
    }
  }, {
    key: "overflow",
    get: function get() {
      return store.get(this).get(soverflow);
    },
    set: function set(bool) {
      store.get(this).set(soverflow, !!bool);
    }
  }, {
    key: "sealed",
    get: function get() {
      return !!store.get(this).get(sseal);
    }
  }, {
    key: "strictlySealed",
    get: function get() {
      return this.sealed && !!store.get(this).get(sstrictseal);
    }
  }]);

  return Model;
}(Node_Node);

Model_defineProperty(Model_Model, "events", {
  change: ModelChange_ModelChange.TYPE,
  modelchange: ModelChange_ModelChange.TYPE // static get events(){ return events }

});


// CONCATENATED MODULE: ./lib/cookies/Cookie.js


function Cookie_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Cookie_typeof = function _typeof(obj) { return typeof obj; }; } else { Cookie_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Cookie_typeof(obj); }

function Cookie_decorate(decorators, factory, superClass, mixins) { var api = Cookie_getDecoratorsApi(); if (mixins) { for (var i = 0; i < mixins.length; i++) { api = mixins[i](api); } } var r = factory(function initialize(O) { api.initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = api.decorateClass(Cookie_coalesceClassElements(r.d.map(Cookie_createElementDescriptor)), decorators); api.initializeClassElements(r.F, decorated.elements); return api.runClassFinishers(r.F, decorated.finishers); }

function Cookie_getDecoratorsApi() { Cookie_getDecoratorsApi = function _getDecoratorsApi() { return api; }; var api = { elementsDefinitionOrder: [["method"], ["field"]], initializeInstanceElements: function initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { this.defineClassElement(O, element); } }, this); }, this); }, initializeClassElements: function initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; this.defineClassElement(receiver, element); } }, this); }, this); }, defineClassElement: function defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }, decorateClass: function decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { "static": [], prototype: [], own: [] }; elements.forEach(function (element) { this.addElementPlacement(element, placements); }, this); elements.forEach(function (element) { if (!Cookie_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = this.decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }, this); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = this.decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }, addElementPlacement: function addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }, decorateElement: function decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = this.fromElementDescriptor(element); var elementFinisherExtras = this.toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; this.addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { this.addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }, decorateConstructor: function decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = this.fromClassDescriptor(elements); var elementsAndFinisher = this.toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }, fromElementDescriptor: function fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }, toElementDescriptors: function toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return Cookie_toArray(elementObjects).map(function (elementObject) { var element = this.toElementDescriptor(elementObject); this.disallowProperty(elementObject, "finisher", "An element descriptor"); this.disallowProperty(elementObject, "extras", "An element descriptor"); return element; }, this); }, toElementDescriptor: function toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = Cookie_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; this.disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { this.disallowProperty(elementObject, "initializer", "A method descriptor"); } else { this.disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); this.disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }, toElementFinisherExtras: function toElementFinisherExtras(elementObject) { var element = this.toElementDescriptor(elementObject); var finisher = Cookie_optionalCallableProperty(elementObject, "finisher"); var extras = this.toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }, fromClassDescriptor: function fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(this.fromElementDescriptor, this) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }, toClassDescriptor: function toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } this.disallowProperty(obj, "key", "A class descriptor"); this.disallowProperty(obj, "placement", "A class descriptor"); this.disallowProperty(obj, "descriptor", "A class descriptor"); this.disallowProperty(obj, "initializer", "A class descriptor"); this.disallowProperty(obj, "extras", "A class descriptor"); var finisher = Cookie_optionalCallableProperty(obj, "finisher"); var elements = this.toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }, runClassFinishers: function runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }, disallowProperty: function disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } } }; return api; }

function Cookie_createElementDescriptor(def) { var key = Cookie_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def["static"] ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function Cookie_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function Cookie_coalesceClassElements(elements) { var newElements = []; var isSameElement = function isSameElement(other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (Cookie_isDataDescriptor(element.descriptor) || Cookie_isDataDescriptor(other.descriptor)) { if (Cookie_hasDecorators(element) || Cookie_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (Cookie_hasDecorators(element)) { if (Cookie_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } Cookie_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function Cookie_hasDecorators(element) { return element.decorators && element.decorators.length; }

function Cookie_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function Cookie_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function Cookie_toPropertyKey(arg) { var key = Cookie_toPrimitive(arg, "string"); return Cookie_typeof(key) === "symbol" ? key : String(key); }

function Cookie_toPrimitive(input, hint) { if (Cookie_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (Cookie_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function Cookie_toArray(arr) { return Cookie_arrayWithHoles(arr) || Cookie_iterableToArray(arr) || Cookie_nonIterableRest(); }

function Cookie_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Cookie_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Cookie_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Cookie_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Cookie_possibleConstructorReturn(self, call) { if (call && (Cookie_typeof(call) === "object" || typeof call === "function")) { return call; } return Cookie_assertThisInitialized(self); }

function Cookie_getPrototypeOf(o) { Cookie_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Cookie_getPrototypeOf(o); }

function Cookie_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Cookie_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Cookie_createClass(Constructor, protoProps, staticProps) { if (protoProps) Cookie_defineProperties(Constructor.prototype, protoProps); if (staticProps) Cookie_defineProperties(Constructor, staticProps); return Constructor; }

function Cookie_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Cookie_setPrototypeOf(subClass, superClass); }

function Cookie_setPrototypeOf(o, p) { Cookie_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Cookie_setPrototypeOf(o, p); }







var sdomain = new Object(Symbol("domain"));
var sexpires = new Object(Symbol("expires"));
var sfrombrowser = new Object(Symbol("frombrowser"));
var Cookie_spath = new Object(Symbol("path"));
var sname = new Object(Symbol("name"));
var ssession = new Object(Symbol("session"));
var LIFESPAN = 15552000000;

var _TOP_DOMAIN = function () {
  var cookiestr = "__seithrtest=testcookie";

  var cookie = function cookie(domain) {
    document.cookie = cookiestr + "; domain=" + domain;

    if (document.cookie.indexOf(cookiestr) != -1) {
      document.cookie = cookiestr + "; domain=" + domain + "; expires=" + new Date(+new Date() - 1000).toUTCString();
      return true;
    }

    return false;
  };

  var split = location.hostname.split(".");
  var curr = "";
  var i = split.length;
  var hit = false;

  while (i--) {
    if (curr == split.slice(i).join("."), hit = cookie(curr), hit) return curr;
  }
}();


var Cookie_Sync =
/*#__PURE__*/
function (_Event) {
  Cookie_inherits(Sync, _Event);

  Cookie_createClass(Sync, null, [{
    key: "TYPE",
    get: function get() {
      return "cookiesync";
    }
  }]);

  function Sync() {
    var _this;

    var from_browser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    Cookie_classCallCheck(this, Sync);

    _this = Cookie_possibleConstructorReturn(this, Cookie_getPrototypeOf(Sync).call(this, Sync.TYPE));
    store.get(Cookie_assertThisInitialized(_this)).set(sfrombrowser, from_browser);
    return _this;
  }

  Cookie_createClass(Sync, [{
    key: "source",
    get: function get() {
      return store.get(this).get(sfrombrowser) ? "browser" : "model";
    }
  }]);

  return Sync;
}(Event_Event);

var Cookie_Cookie = Cookie_decorate(null, function (_initialize, _Model) {
  var Cookie =
  /*#__PURE__*/
  function (_Model2) {
    Cookie_inherits(Cookie, _Model2);

    function Cookie() {
      var _this2;

      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$name = _ref.name,
          name = _ref$name === void 0 ? null : _ref$name,
          _ref$path = _ref.path,
          path = _ref$path === void 0 ? "/" : _ref$path,
          _ref$domain = _ref.domain,
          domain = _ref$domain === void 0 ? Cookie.TOP_DOMAIN : _ref$domain,
          expires = _ref.expires,
          maxAge = _ref.maxAge,
          _ref$session = _ref.session,
          session = _ref$session === void 0 ? false : _ref$session;

      Cookie_classCallCheck(this, Cookie);

      _this2 = Cookie_possibleConstructorReturn(this, Cookie_getPrototypeOf(Cookie).call(this));

      _initialize(Cookie_assertThisInitialized(_this2));

      if (toType(name) != "string") throw new Error(errors_ERR_STRING_EXPECTED);
      store.get(Cookie_assertThisInitialized(_this2)).set(sdomain, toType(domain) == "string" ? domain : Cookie.TOP_DOMAIN);
      store.get(Cookie_assertThisInitialized(_this2)).set(sexpires, !!session ? "" : !isNaN(+new Date(expires)) ? new Date(expires).toUTCString() : new Date(+new Date() + (+maxAge || LIFESPAN)).toUTCString());
      store.get(Cookie_assertThisInitialized(_this2)).set(sname, name);
      store.get(Cookie_assertThisInitialized(_this2)).set(Cookie_spath, toType(path) == "string" ? path : "/");
      store.get(Cookie_assertThisInitialized(_this2)).set(ssession, !!session);

      _this2.sync(true);

      window.addEventListener("focus", function (e) {
        return _this2.sync(true);
      });

      _this2.addEventListener(Model_Model.events.change, function () {
        return _this2.sync(false);
      });

      return _this2;
    }

    return Cookie;
  }(_Model);

  return {
    F: Cookie,
    d: [{
      kind: "field",
      decorators: [decorators_frozen],
      "static": true,
      key: "events",
      value: function value() {
        return {
          sync: Cookie_Sync.TYPE //static get events(){ return { Sync } }

        };
      }
    }, {
      kind: "get",
      "static": true,
      key: "COOKIE_ENABLED",
      value: function COOKIE_ENABLED() {
        return navigator.cookieEnabled;
      }
    }, {
      kind: "get",
      "static": true,
      key: "TOP_DOMAIN",
      value: function TOP_DOMAIN() {
        return _TOP_DOMAIN;
      }
    }, {
      kind: "get",
      key: "COOKIE_ENABLED",
      value: function COOKIE_ENABLED() {
        return Cookie.COOKIE_ENABLED;
      }
    }, {
      kind: "get",
      key: "TOP_DOMAIN",
      value: function TOP_DOMAIN() {
        return Cookie.TOP_DOMAIN;
      }
    }, {
      kind: "get",
      key: "domain",
      value: function domain() {
        return store.get(this).get(sdomain);
      }
    }, {
      kind: "get",
      key: "expires",
      value: function expires() {
        return store.get(this).get(sexpires);
      }
    }, {
      kind: "get",
      key: "path",
      value: function path() {
        return store.get(this).get(Cookie_spath);
      }
    }, {
      kind: "get",
      key: "name",
      value: function name() {
        return store.get(this).get(sname);
      }
    }, {
      kind: "get",
      key: "session",
      value: function session() {
        return store.get(this).set(ssession);
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "clear",
      value: function clear() {
        this.io = null;
      }
    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "sync",
      value: function sync() {
        var from_browser = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

        if (from_browser) {
          var exists = document.cookie.match(store.get(this).get(sname) + "=([^;]*)");
          var data;

          try {
            if (exists) data = JSON.parse(unescape(exists[1]));else data = {};
          } catch (e) {
            console.error(e);
            data = {};
          }

          this.io = data;
          this.dispatchEvent(new Cookie_Sync(true));
          return;
        }

        var string = escape(JSON.stringify(this));
        if (string.length) document.cookie = [this.name, "=", string, "; domain=", this.domain, "; path=", this.path, ";", this.session ? "" : "expires=" + this.expires + ";"].join("");else document.cookie = [this.name, "=0; domain=", this.domain, "; path=", this.path, "; expires=", new Date(+new Date() - 1000).toUTCString(), ";"].join("");
        this.dispatchEvent(new Cookie_Sync(false));
        return;
      }
    }]
  };
}, Model_Model);


// CONCATENATED MODULE: ./lib/css/CSSHook.js


function CSSHook_toConsumableArray(arr) { return CSSHook_arrayWithoutHoles(arr) || CSSHook_iterableToArray(arr) || CSSHook_nonIterableSpread(); }

function CSSHook_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function CSSHook_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function CSSHook_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function CSSHook_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CSSHook_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CSSHook_createClass(Constructor, protoProps, staticProps) { if (protoProps) CSSHook_defineProperties(Constructor.prototype, protoProps); if (staticProps) CSSHook_defineProperties(Constructor, staticProps); return Constructor; }


var hookedprops = new WeakMap();

var defaulthandler = function defaulthandler(v) {
  return [{
    property: this.property,
    value: v
  }];
};

var CSSHook_CSSHook =
/*#__PURE__*/
function () {
  CSSHook_createClass(CSSHook, null, [{
    key: "getHook",
    value: function getHook(property) {
      if (hookedprops.has(property)) return CSSHook_toConsumableArray(hookedprops.get(property));else return [{
        transform: defaulthandler.bind({
          property: property
        })
      }];
    }
  }]);

  function CSSHook(property) {
    var propertyHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaulthandler;

    CSSHook_classCallCheck(this, CSSHook);

    if (typeOf(property) !== "string") throw new TypeError(ERR_STRING_EXPECTED);
    if (typeOf(prophandler) !== "function") throw new TypeError(ERR_FN_EXPECTED);
    store.set(this, new WeakMap());
    store.get(this).set(sproperty, property);
    store.get(this).set(sprophandler, propertyHandler);
  }

  CSSHook_createClass(CSSHook, [{
    key: "transform",
    value: function transform(v) {
      return Reflect.apply(store.get(this).get(sprophandler), this, v);
    }
  }, {
    key: "property",
    get: function get() {
      return store.get(this).get(sproperty);
    }
  }]);

  return CSSHook;
}();


// CONCATENATED MODULE: ./lib/serializers/Serializer.js


function Serializer_toConsumableArray(arr) { return Serializer_arrayWithoutHoles(arr) || Serializer_iterableToArray(arr) || Serializer_nonIterableSpread(); }

function Serializer_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Serializer_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Serializer_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Serializer_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Serializer_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Serializer_createClass(Constructor, protoProps, staticProps) { if (protoProps) Serializer_defineProperties(Constructor.prototype, protoProps); if (staticProps) Serializer_defineProperties(Constructor, staticProps); return Constructor; }


var def_delimiter = "=";
var def_separator = "&";
var def_key_separator = ".";
var rspacetoplus = /%20/g;
var rplustospace = /\+/g;
var sdelimiter = new Object(Symbol());
var sseparator = new Object(Symbol());

var Serializer_Serializer =
/*#__PURE__*/
function () {
  Serializer_createClass(Serializer, null, [{
    key: "objectify",
    value: function objectify() {
      var string = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var object = {};
      var del = this && this.delimiter || def_delimiter;
      var sep = this && this.separator || def_separator;
      void (string.search(sep) != -1 ? string.split(sep) : string.length ? [string] : []).forEach(function (pair) {
        pair = pair.replace(rplustospace, "%20");
        var idx = pair.indexOf(del);
        var key = unescape(pair.split(del, 1)[0]);
        var value = decodeURIComponent(pair.slice(idx + 1));
        object[key.trim()] = idx != -1 ? value : true;
      });
      return object;
    }
  }, {
    key: "serialize",
    value: function serialize(object) {
      var del = this && this.delimiter || def_delimiter;
      var sep = this && this.separator || def_separator;
      return Serializer_toConsumableArray(Object.keys(object).map(function (key) {
        return "".concat(escape(key)).concat(del).concat(encodeURIComponent(object[key]));
      })).join(sep).replace(rspacetoplus, "+");
    }
  }, {
    key: "stringify",
    value: function stringify(object) {
      var del = this && this.delimiter || def_delimiter;
      var sep = this && this.separator || def_separator;
      return Serializer_toConsumableArray(Object.keys(object).map(function (key) {
        return "".concat(key).concat(del).concat(object[key]);
      })).join(sep);
    }
  }]);

  function Serializer() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$delimiter = _ref.delimiter,
        delimiter = _ref$delimiter === void 0 ? def_delimiter : _ref$delimiter,
        _ref$separator = _ref.separator,
        separator = _ref$separator === void 0 ? def_separator : _ref$separator;

    Serializer_classCallCheck(this, Serializer);

    store.set(this, new WeakMap());
    store.get(this).set(sdelimiter, delimiter);
    store.get(this).set(sseparator, separator);
  }

  Serializer_createClass(Serializer, [{
    key: "objectify",
    value: function objectify(string) {
      return Reflect.apply(Serializer.objectify, this, [string]);
    }
  }, {
    key: "serialize",
    value: function serialize(object) {
      return Reflect.apply(Serializer.serialize, this, [object]);
    }
  }, {
    key: "stringify",
    value: function stringify(object) {
      return Reflect.apply(Serializer.stringify, this, [object]);
    }
  }, {
    key: "delimiter",
    get: function get() {
      return store.get(this).get(sdelimiter);
    }
  }, {
    key: "separator",
    get: function get() {
      return store.get(this).get(sseparator);
    }
  }]);

  return Serializer;
}();


// CONCATENATED MODULE: ./lib/css/CSSRule.js


function CSSRule_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function CSSRule_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CSSRule_typeof = function _typeof(obj) { return typeof obj; }; } else { CSSRule_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CSSRule_typeof(obj); }

function CSSRule_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CSSRule_possibleConstructorReturn(self, call) { if (call && (CSSRule_typeof(call) === "object" || typeof call === "function")) { return call; } return CSSRule_assertThisInitialized(self); }

function CSSRule_getPrototypeOf(o) { CSSRule_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CSSRule_getPrototypeOf(o); }

function CSSRule_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function CSSRule_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CSSRule_createClass(Constructor, protoProps, staticProps) { if (protoProps) CSSRule_defineProperties(Constructor.prototype, protoProps); if (staticProps) CSSRule_defineProperties(Constructor, staticProps); return Constructor; }

function CSSRule_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CSSRule_setPrototypeOf(subClass, superClass); }

function CSSRule_setPrototypeOf(o, p) { CSSRule_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CSSRule_setPrototypeOf(o, p); }









var scssrule = new Object(Symbol());
var CSSRule_sproperty = new Object(Symbol());
var CSSRule_sprophandler = new Object(Symbol());
var sselectortext = new Object(Symbol());

var CSSRule_CSSRuleEvent =
/*#__PURE__*/
function (_Event) {
  CSSRule_inherits(CSSRuleEvent, _Event);

  CSSRule_createClass(CSSRuleEvent, null, [{
    key: "TYPE",
    get: function get() {
      return "cssruleevent";
    }
  }]);

  function CSSRuleEvent(type, _ref) {
    var _this;

    var cssRule = _ref.cssRule,
        from = _ref.from,
        to = _ref.to;

    CSSRule_classCallCheck(this, CSSRuleEvent);

    _this = CSSRule_possibleConstructorReturn(this, CSSRule_getPrototypeOf(CSSRuleEvent).call(this, type || CSSRuleEvent.TYPE));
    store.get(CSSRule_assertThisInitialized(_this)).set(scssrule, cssRule);
    return _this;
  }

  CSSRule_createClass(CSSRuleEvent, [{
    key: "cssRule",
    get: function get() {
      return store.get(this).get(scssrule);
    }
  }]);

  return CSSRuleEvent;
}(Event_Event);

var Reset =
/*#__PURE__*/
function (_CSSRuleEvent) {
  CSSRule_inherits(Reset, _CSSRuleEvent);

  CSSRule_createClass(Reset, null, [{
    key: "TYPE",
    get: function get() {
      return "reset";
    }
  }]);

  function Reset(_ref2) {
    var cssRule = _ref2.cssRule,
        from = _ref2.from,
        to = _ref2.to;

    CSSRule_classCallCheck(this, Reset);

    return CSSRule_possibleConstructorReturn(this, CSSRule_getPrototypeOf(Reset).call(this, Reset.TYPE, {
      cssRule: cssRule,
      from: from,
      to: to
    }));
  }

  return Reset;
}(CSSRule_CSSRuleEvent);
var TextUpdate =
/*#__PURE__*/
function (_CSSRuleEvent2) {
  CSSRule_inherits(TextUpdate, _CSSRuleEvent2);

  CSSRule_createClass(TextUpdate, null, [{
    key: "TYPE",
    get: function get() {
      return "textupdate";
    }
  }]);

  function TextUpdate(_ref3) {
    var cssRule = _ref3.cssRule,
        from = _ref3.from,
        to = _ref3.to;

    CSSRule_classCallCheck(this, TextUpdate);

    return CSSRule_possibleConstructorReturn(this, CSSRule_getPrototypeOf(TextUpdate).call(this, TextUpdate.TYPE, {
      cssRule: cssRule,
      from: from,
      to: to
    }));
  }

  return TextUpdate;
}(CSSRule_CSSRuleEvent);
var SelectorUpdate =
/*#__PURE__*/
function (_CSSRuleEvent3) {
  CSSRule_inherits(SelectorUpdate, _CSSRuleEvent3);

  CSSRule_createClass(SelectorUpdate, null, [{
    key: "TYPE",
    get: function get() {
      return "selectorupdate";
    }
  }]);

  function SelectorUpdate(_ref4) {
    var cssRule = _ref4.cssRule,
        from = _ref4.from,
        to = _ref4.to;

    CSSRule_classCallCheck(this, SelectorUpdate);

    return CSSRule_possibleConstructorReturn(this, CSSRule_getPrototypeOf(SelectorUpdate).call(this, SelectorUpdate.TYPE, {
      cssRule: cssRule,
      from: from,
      to: to
    }));
  }

  return SelectorUpdate;
}(CSSRule_CSSRuleEvent);
var rcssparse = /(?:\s|$)*([^{]*)(?:\s|$)*{(.*)}(?:\s|$)*/;
var serializer = new Serializer_Serializer({
  delimiter: ":",
  separator: ";"
});

var CSSRule_CSSRule =
/*#__PURE__*/
function (_Node) {
  CSSRule_inherits(CSSRule, _Node);

  CSSRule_createClass(CSSRule, null, [{
    key: "objectifyCssText",
    value: function objectifyCssText(string) {
      return serializer.objectify(string);
    }
  }, {
    key: "serializeCssText",
    value: function serializeCssText(object) {
      return serializer.stringify(object);
    }
  }, {
    key: "hook",
    value: function hook(property, propertyHandler) {
      return new CSSHook_CSSHook(property, propertyHandler);
    }
  }]);

  function CSSRule() {
    var _this2;

    CSSRule_classCallCheck(this, CSSRule);

    _this2 = CSSRule_possibleConstructorReturn(this, CSSRule_getPrototypeOf(CSSRule).call(this));
    var fromstr = false;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    store.get(CSSRule_assertThisInitialized(_this2)).set(sselectortext, args.length > 1 && toType(args[0]) == "string" && isNaN(+args[0]) ? args.shift() : args.length == 1 && toType(args[0]) == "string" ? (fromstr = true, (rcssparse.exec(args[0]) || [])[1] || "") : (fromstr = true, args.shift(), (rcssparse.exec(args[0]) || [])[1] || ""));
    _this2.cssText = fromstr ? (rcssparse.exec(args.pop()) || [])[2] || "" : toType(args[args.length - 1]) == "string" ? args.pop() : toType(args[args.length - 1]) == "object" ? CSSRule.serializeCssText(args.pop()) : "";
    return _this2;
  }

  CSSRule_createClass(CSSRule, [{
    key: "getProperty",
    value: function getProperty() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return Reflect.apply(CSSStyleDeclaration.prototype.getPropertyValue, store.get(this).get(sdummy).style, args);
    }
  }, {
    key: "setProperty",
    value: function setProperty(prop, value) {
      var _this3 = this;

      var from = this.getProperty(prop);
      CSSHook_CSSHook.getHook(prop).forEach(function (_ref5) {
        var transform = _ref5.transform;
        transform(value).forEach(function (_ref6) {
          var property = _ref6.property,
              value = _ref6.value;
          store.get(_this3).get(sdummy).style.setProperty(property, value);

          var to = _this3.getProperty(prop);

          if (from !== to) _this3.dispatchEvent(new TextUpdate({
            cssRule: _this3,
            from: from,
            to: to
          }));
        });
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      return "".concat(this.selectorText, "{").concat(this.cssText, "}");
    }
  }, {
    key: "cssText",
    get: function get() {
      return store.get(this).get(sdummy).style.cssText;
    },
    set: function set(v) {
      var _this4 = this;

      var from = store.get(this).get(sdummy).style.cssText;
      store.get(this).get(sdummy).style.cssText = "";
      var props = CSSRule.objectifyCssText(v);
      Object.keys(props).forEach(function (k) {
        return _this4.setProperty(k, props[k]);
      });
      var to = store.get(this).get(sdummy).style.cssText;
      if (from !== to) this.dispatchEvent(new Reset({
        cssRule: this,
        from: from,
        to: to
      }));
    }
  }, {
    key: "selectorText",
    get: function get() {
      return store.get(this).get(sselectortext);
    },
    set: function set(to) {
      var from = this.selectorText;
      store.get(this).set(sselectortext, to);
      if (from && from !== "null" && from !== to) this.dispatchEvent(new SelectorUpdate({
        cssRule: this,
        from: from,
        to: to
      }));
    }
  }]);

  return CSSRule;
}(Node_Node);

CSSRule_defineProperty(CSSRule_CSSRule, "events", {
  reset: Reset.TYPE,
  textupdate: TextUpdate.TYPE,
  SelectorUpdate: SelectorUpdate.TYPE //static get events(){ return { Reset, TextUpdate, SelectorUpdate} }

});


// CONCATENATED MODULE: ./lib/css/CSSConditionalRule.js


function CSSConditionalRule_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CSSConditionalRule_typeof = function _typeof(obj) { return typeof obj; }; } else { CSSConditionalRule_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CSSConditionalRule_typeof(obj); }

function CSSConditionalRule_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CSSConditionalRule_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function CSSConditionalRule_createClass(Constructor, protoProps, staticProps) { if (protoProps) CSSConditionalRule_defineProperties(Constructor.prototype, protoProps); if (staticProps) CSSConditionalRule_defineProperties(Constructor, staticProps); return Constructor; }

function CSSConditionalRule_possibleConstructorReturn(self, call) { if (call && (CSSConditionalRule_typeof(call) === "object" || typeof call === "function")) { return call; } return CSSConditionalRule_assertThisInitialized(self); }

function CSSConditionalRule_getPrototypeOf(o) { CSSConditionalRule_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CSSConditionalRule_getPrototypeOf(o); }

function CSSConditionalRule_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function CSSConditionalRule_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CSSConditionalRule_setPrototypeOf(subClass, superClass); }

function CSSConditionalRule_setPrototypeOf(o, p) { CSSConditionalRule_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CSSConditionalRule_setPrototypeOf(o, p); }






var rconditional = /^\@(document|supports|media)([^\{]*)\{(.*)\}/i;
var updaters_text = new WeakMap();
var sactive = new Object(Symbol());
var sadd = new Object(Symbol());
var satsheet = new Object(Symbol());
var sbasecsstext = new Object(Symbol());
var sbufferrules = new Object(Symbol());
var sconditiontext = new Object(Symbol());
var sremove = new Object(Symbol());
var srules = new Object(Symbol());
var ssync = new Object(Symbol());
var stype = new Object(Symbol());

var CSSConditionalRule_CSSConditionalRule =
/*#__PURE__*/
function (_Node) {
  CSSConditionalRule_inherits(CSSConditionalRule, _Node);

  function CSSConditionalRule() {
    var _this;

    var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    CSSConditionalRule_classCallCheck(this, CSSConditionalRule);

    _this = CSSConditionalRule_possibleConstructorReturn(this, CSSConditionalRule_getPrototypeOf(CSSConditionalRule).call(this));
    var atrule = rconditional.exec(condition);
    var type = atrule[1];
    var conditionText = atrule[2];
    var cssText = atrule[3];
    if (!type || !conditionText) throw new TypeError(ERR_CSSTEXT);
    store.set(CSSConditionalRule_assertThisInitialized(_this), new WeakMap());
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(stype, type);
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(sconditiontext, conditionText);
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(sbasecsstext, cssText.trim());
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(ssync, false);
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(srules, []);
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(sbufferrules, []);
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(satsheet, []);
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(sadd, function (rule) {
      store.get(CSSConditionalRule_assertThisInitialized(_this)).get(satsheet).push(rule);
      store.get(CSSConditionalRule_assertThisInitialized(_this)).set(sactive, true);

      _this.insertRule(store.get(CSSConditionalRule_assertThisInitialized(_this)).get(sbufferrules));
    });
    store.get(CSSConditionalRule_assertThisInitialized(_this)).set(sremove, function (rule) {
      var idx = store.get(CSSConditionalRule_assertThisInitialized(_this)).get(satsheet);
      if (idx !== -1) store.get(CSSConditionalRule_assertThisInitialized(_this)).get(satsheet).splice(idx, 1);
      if (!store.get(CSSConditionalRule_assertThisInitialized(_this)).get(satsheet).length) store.get(CSSConditionalRule_assertThisInitialized(_this)).set(sactive, false);
    });
    return _this;
  }

  CSSConditionalRule_createClass(CSSConditionalRule, [{
    key: "deleteRule",
    value: function deleteRule() {
      var _this2 = this;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var rules = args && args[0][Symbol.iterator] ? args.shift() : args.length ? args : [];
      rules.forEach(function (rule) {
        var is_rule = false;
        var is_conditional = false;
        rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule ? (is_conditional = true, rule) : null;
        if (!rule) return;

        if (!store.get(_this2).get(sactive)) {
          var idx;

          while (idx = store.get(_this2).get(sbufferrules).indexOf(rule), idx !== -1) {
            store.get(_this2).get(sbufferrules).splice(idx, 1);
          }
        } else {
          if (is_rule) {
            store.get(_this2).get(satsheet).forEach(function (cond_rule) {
              var idx = -1;

              while (idx = store.get(_this2).get(srules).indexOf(rule), idx != -1) {
                cond_rule.deleteRule(idx), store.get(_this2).get(srules).splice(idx, 1);
              }

              while (idx = store.get(_this2).buffer_rules.indexOf(rule), idx != -1) {
                store.get(_this2).get(sbufferrules).splice(idx, 1);
              }
            });
            if (updaters_text.has(rule)) rule.removeEventListener(cssRule.events.textupdate, updaters_text.get(rule)), updaters_text["delete"](rule);
          } else if (is_conditional) {
            store.get(_this2).get(satsheet).forEach(function (cond_rule) {
              var idx = -1;

              while (idx = store.get(_this2).get(srules).indexOf(rule), idx != -1) {
                store.get(rule).get(sremove)(cond_rule.cssRules[idx]);
                cond_rule.deleteRule(idx);
                store.get(_this2).get(srules).splice(idx, 1);
              }

              while (idx = store.get(_this2).get(sbufferrules).indexOf(rule), idx != -1) {
                store.get(_this2).get(sbufferrules).splice(idx, 1);
              }
            });
          }
        }
      });
    }
  }, {
    key: "insertRule",
    value: function insertRule() {
      var _this3 = this;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var rules = args && args[0][Symbol.iterator] ? args.shift() : args.length ? args : [];
      rules.forEach(function (rule) {
        var is_rule = false;
        var is_conditional = false;
        rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule ? (is_conditional = true, rule) : (is_rule = true, new CSSRule_CSSRule(rule));
        store.get(_this3).get(sbufferrules).push(rule);

        if (store.get(_this3).get(sactive)) {
          if (is_rule) {
            var idx = -1;
            store.get(_this3).get(satsheet).forEach(function (cond_rule) {
              if (idx == -1) idx = cond_rule.cssRules.length, store.get(_this3).get(srules)[idx] = rule;
              cond_rule.insertRule(rule.toString(), idx);
            });
            if (!updaters_text.has(rule)) updaters_text.set(rule, function (_ref) {
              var cssRule = _ref.cssRule;
              store.get(_this3).get(satsheet).forEach(function (cond_rule) {
                var idxs = [];
                store.get(_this3).get(srules).forEach(function (rule, idx) {
                  if (rule === cssRule) idxs.push(idx);
                });
                idxs.forEach(function (idx) {
                  return cond_rule.cssRules[idx].style.cssText = cssRule.cssText;
                });
              });
            });
            rule.addEventListener(CSSRule_CSSRule.events.textupdate, updaters_text.get(rule));
          } else if (is_conditional) {
            var _idx = -1;

            store.get(_this3).get(satsheet).forEach(function (cond_rule) {
              if (_idx == -1) _idx = cond_rule.cssRules.length, store.get(_this3).get(srules)[_idx] = rule;
              cond_rule.insertRule(rule.toString(), _idx);
              store.get(rule).get(sadd)(cond_rule.cssRules[_idx]);
            });
          }
        }
      });
    }
  }, {
    key: "toString",
    value: function toString() {
      return "@".concat(this.condition).concat(this.conditionText, "{").concat(this.cssText, "}");
    }
  }, {
    key: "condition",
    get: function get() {
      return store.get(this).get(stype);
    }
  }, {
    key: "conditionText",
    get: function get() {
      return store.get(this).get(sconditiontext);
    }
  }, {
    key: "cssText",
    get: function get() {
      if (store.get(this).get(sactive)) return store.get(this).get(satsheet)[0].cssText;
      return store.get(this).get(sbasecsstext);
    }
  }]);

  return CSSConditionalRule;
}(Node_Node);


// CONCATENATED MODULE: ./lib/css/CSSMediaRule.js


function CSSMediaRule_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { CSSMediaRule_typeof = function _typeof(obj) { return typeof obj; }; } else { CSSMediaRule_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return CSSMediaRule_typeof(obj); }

function CSSMediaRule_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function CSSMediaRule_possibleConstructorReturn(self, call) { if (call && (CSSMediaRule_typeof(call) === "object" || typeof call === "function")) { return call; } return CSSMediaRule_assertThisInitialized(self); }

function CSSMediaRule_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function CSSMediaRule_getPrototypeOf(o) { CSSMediaRule_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return CSSMediaRule_getPrototypeOf(o); }

function CSSMediaRule_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) CSSMediaRule_setPrototypeOf(subClass, superClass); }

function CSSMediaRule_setPrototypeOf(o, p) { CSSMediaRule_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return CSSMediaRule_setPrototypeOf(o, p); }



var CSSMediaRule_rconditional = /^\@media([^\{]*)\{(.*)\}/i;

var CSSMediaRule_CSSMediaRule =
/*#__PURE__*/
function (_CSSConditionalRule) {
  CSSMediaRule_inherits(CSSMediaRule, _CSSConditionalRule);

  function CSSMediaRule() {
    var condition = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";

    CSSMediaRule_classCallCheck(this, CSSMediaRule);

    if (!CSSMediaRule_rconditional.exec(condition)) throw new TypeError(ERR_CSSTEXT);
    return CSSMediaRule_possibleConstructorReturn(this, CSSMediaRule_getPrototypeOf(CSSMediaRule).call(this, condition));
  }

  return CSSMediaRule;
}(CSSConditionalRule_CSSConditionalRule);


// CONCATENATED MODULE: ./lib/utils/domready.js


function domready_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function domready_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { domready_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { domready_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var gather = function gather() {
  return Object.seal({
    nodes: {
      documentElement: document.documentElement,
      head: document.head,
      title: function () {
        var node = document.head.getElementsByTagName("title")[0];
        if (node) return node;
        return document.head.appendChild(document.createElement("title"));
      }(),
      viewport: function () {
        var node = document.head.querySelector("meta[name=viewport]");
        if (node) return node;
        node = document.createElement("meta");
        node.setAttribute("name", "viewport");
        node.setAttribute("content", "");
        return document.head.appendChild(node);
      }(),
      body: document.body
    }
  });
};

var ready = new Promise(function (resolve) {
  var ready = false;

  var onready = function onready() {
    if (ready) return;
    if (!document.body) return setTimeout(onready, 4);
    ready = true;
    resolve(gather());
  };

  var isready = function isready() {
    return "interactive, complete".indexOf(document.readyState) != -1 ? (onready(), true) : false;
  };

  if (!isready()) window.addEventListener("DOMContentLoaded", onready, true), window.addEventListener("load", onready, true), document.addEventListener("readystatechange", isready, true);
});
/* harmony default export */ var domready = (domready_asyncToGenerator(
/*#__PURE__*/
regeneratorRuntime.mark(function _callee() {
  return regeneratorRuntime.wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return ready;

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))());
// CONCATENATED MODULE: ./lib/utils/isSameDomain.js


var isSameDomain_dummy = document.createElement("a");
/* harmony default export */ var isSameDomain = (function (path) {
  isSameDomain_dummy.href = path;
  return isSameDomain_dummy.hostname === location.hostname ? true : !isSameDomain_dummy.hostname ? true // ie/edge doesn't set the hostname if not "necessary"
  : false;
});
// CONCATENATED MODULE: ./lib/utils/ReadyStateFul.js


function ReadyStateFul_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { ReadyStateFul_typeof = function _typeof(obj) { return typeof obj; }; } else { ReadyStateFul_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return ReadyStateFul_typeof(obj); }

function ReadyStateFul_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ReadyStateFul_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ReadyStateFul_createClass(Constructor, protoProps, staticProps) { if (protoProps) ReadyStateFul_defineProperties(Constructor.prototype, protoProps); if (staticProps) ReadyStateFul_defineProperties(Constructor, staticProps); return Constructor; }

function ReadyStateFul_possibleConstructorReturn(self, call) { if (call && (ReadyStateFul_typeof(call) === "object" || typeof call === "function")) { return call; } return ReadyStateFul_assertThisInitialized(self); }

function ReadyStateFul_getPrototypeOf(o) { ReadyStateFul_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return ReadyStateFul_getPrototypeOf(o); }

function ReadyStateFul_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function ReadyStateFul_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) ReadyStateFul_setPrototypeOf(subClass, superClass); }

function ReadyStateFul_setPrototypeOf(o, p) { ReadyStateFul_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ReadyStateFul_setPrototypeOf(o, p); }

function ReadyStateFul_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var sfrom = new Object(Symbol("from"));
var sreadystate = new Object(Symbol("readystate"));
var sto = new Object(Symbol("to"));
var ReadyStateFul_ReadyStateChange =
/*#__PURE__*/
function (_Event) {
  ReadyStateFul_inherits(ReadyStateChange, _Event);

  function ReadyStateChange(_ref) {
    var _this;

    var from = _ref.from,
        to = _ref.to;

    ReadyStateFul_classCallCheck(this, ReadyStateChange);

    _this = ReadyStateFul_possibleConstructorReturn(this, ReadyStateFul_getPrototypeOf(ReadyStateChange).call(this, ReadyStateChange.type, {
      bubbles: true,
      cancelable: false
    }));
    store.get(ReadyStateFul_assertThisInitialized(_this)).set(sfrom, from);
    store.get(ReadyStateFul_assertThisInitialized(_this)).set(sto, to);
    return _this;
  }

  ReadyStateFul_createClass(ReadyStateChange, [{
    key: "from",
    get: function get() {
      return store.get(this).get(sfrom);
    }
  }, {
    key: "to",
    get: function get() {
      return store.get(this).get(sto);
    }
  }]);

  return ReadyStateChange;
}(Event_Event);

ReadyStateFul_defineProperty(ReadyStateFul_ReadyStateChange, "TYPE", "readystatechange");

var ReadyStateFul_ReadyStateFul =
/*#__PURE__*/
function () {
  function ReadyStateFul() {
    ReadyStateFul_classCallCheck(this, ReadyStateFul);
  }

  ReadyStateFul_createClass(ReadyStateFul, [{
    key: "readyState",
    get: function get() {
      return store.get(this).get(sreadystate) || ReadyStateFul.UNINITIALIZED;
    }
  }], [{
    key: "readyStateChange",
    value: function readyStateChange(rsf, to) {
      if (!(rsf instanceof ReadyStateFul)) throw new TypeError(ERR_READYSTATEFUL_NOT_IMPLEMENTED);
      var from = rsf.readyState || ReadyStateFul.UNINITIALIZED;
      store.get(rsf).set(sreadystate, to);
      rsf.dispatchEvent(new ReadyStateFul_ReadyStateChange({
        from: from,
        to: to
      }));
    }
  }, {
    key: "UNINITIALIZED",
    get: function get() {
      return 0;
    }
  }, {
    key: 0,
    get: function get() {
      return "UNINITIALIZED";
    }
  }]);

  return ReadyStateFul;
}();

ReadyStateFul_defineProperty(ReadyStateFul_ReadyStateFul, "events", {
  readystatechange: ReadyStateFul_ReadyStateChange.TYPE
});


// CONCATENATED MODULE: ./lib/utils/requestAnimationFrames.js


function requestAnimationFrames_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function requestAnimationFrames_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { requestAnimationFrames_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { requestAnimationFrames_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }



/* harmony default export */ var requestAnimationFrames = (/*#__PURE__*/(function () {
  var _ref = requestAnimationFrames_asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(generatorFn) {
    var typeOf, generator;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            typeOf = Reflect.apply(Object.prototype.toString, generatorFn, []).slice(8, -1);
            generator = typeOf === "GeneratorFunction" ? generatorFn() : typeOf === "Generator" ? generatorFn : new TypeError(ERR_GENERATOR_EXPECTED);
            return _context.abrupt("return", new Promise(function (resolve) {
              if (generator instanceof Error) throw generator;
              store.set(generatorFn, true);

              var onframe = function onframe() {
                if (store.get(generatorFn) === false) {
                  store["delete"](generatorFn);
                  return resolve(null);
                }

                var _generator$next = generator.next(),
                    value = _generator$next.value,
                    done = _generator$next.done;

                if (!done) requestAnimationFrame(onframe);else {
                  resolve(value);
                  store["delete"](generatorFn);
                }
              };

              requestAnimationFrame(onframe);
            }));

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})());
// CONCATENATED MODULE: ./lib/routing/Route.mjs






const scancelable = new Object(Symbol())
const scancelled = new Object(Symbol())
const Route_sdetail = new Object(Symbol())
const shrt = new Object(Symbol())
const smatches = new Object(Symbol())
const Route_spath = new Object(Symbol())
const sresponse = new Object(Symbol())
const srequest = new Object(Symbol())
const sstate = new Object(Symbol("state"))
const Route_starget = new Object(Symbol())
const stimestamp = new Object(Symbol())
const swait = new Object(Symbol())

class Route_Route {
    static get states(){
        return Object.seal({
            UNINITIALIZED: 0
          , INITIALIZED: 1
          , PAUSED: 2
          , STOPPED: 3
          , RUNNING: 4
        })
    }

    constructor(path, {cancelable=true, request=null, response=null, detail=null} = {}){
        store.set(this, new WeakMap)

        if ( toType(path) != "string" )
          throw new TypeError(errors_ERR_STRING_EXPECTED)
        store.get(this).set(Route_spath, path)
        store.get(this).set(Route_sdetail, detail)
        store.get(this).set(sresponse, response)
        store.get(this).set(srequest, request)

        store.get(this).set(scancelable, !!cancelable)
        store.get(this).set(sstate, Route_Route.states.INITIALIZED)
        store.get(this).set(stimestamp, null)

    }

    get cancelable(){ return store.get(this).get(scancelable) }
    get cancelled(){ return store.get(this).get(scancelled) || false }
    set cancelled(v){ store.get(this).set(scancelled, !!v) }
    get detail(){ return store.get(this).get(Route_sdetail) }
    get hirestimestamp(){ return store.get(this).get(shrt) }
    get hrt(){ return this.hirestimestamp }
    get matches(){ return store.get(this).get(smatches) }
    get path(){ return store.get(this).get(Route_spath) }
    get response(){ return store.get(this).get(sresponse) }
    get request(){ return store.get(this).get(srequest) }
    get state(){ return store.get(this).get(sstate) || Route_Route.states.UNINITIALIZED }
    get target(){ return store.get(this).get(Route_starget) }
    get timestamp(){ return store.get(this).get(stimestamp) }


    preventDefault(){ return this.cancelled = true }

    async wait(fn){
        if ( toType(fn) == "function" ) {
          store.get(this).set(sstate, Route_Route.states.PAUSED)
          store.get(this).set(swait, new Promise(resolve => fn(resolve))
          .then(() => {
              store.get(this).set(sstate, Route_Route.states.INITIALIZED)
              store.get(this).delete(swait)
          }))
        }

        return await (store.get(this).get(swait) || Promise.resolve() )
    }

}

// CONCATENATED MODULE: ./lib/routing/RouteDispatcher.mjs











const shits = new Object(Symbol())

const bundleHandlers = ({routes}) => {
    const wildcards = []
    const handlers = []

    for ( let [path, handler] of routes ) {
        if ( RouteDispatcher_RouteDispatcher.isRouteHandler(handler) )
          if ( path === "*" )
            wildcards.push([path, handler])
          else
            handlers.push([path, handler])

        if ( toType(handler) == "array" )
          handler.forEach(function(handler){
              if ( RouteDispatcher_RouteDispatcher.isRouteHandler(handler) )
                if ( path === "*" )
                  wildcards.push([path, handler])
                else
                  handlers.push([path, handler])
          })
    }

    return [...wildcards, ...handlers]
}

const cache = Object.create(null)

const getRule = str => {
    if ( !cache[str] )
      if ( str.indexOf(":") == -1 )
        cache[str] = new RegExp("^"+str+"$", "i")
      else {
        const assignments = []
        const regexp = []
        const split = []
        const join = []
        let pile = ""

        for ( let i = 0, l = str.length; i <= l; i++ )
          void function(char){
              if ( i === l ) {
                  if ( pile.length )
                    split.push(pile)
              }
              else if ( char === "/")
                split.push(pile),
                join.push(char),
                pile = ""
              else if ( char === "." && str[i+1] === ":" )
                split.push(pile),
                join.push(char),
                pile = ""
              else
                pile += char
          }( str[i] )

        while ( split.length )
          void function(){
              const part = split.shift()
              const joiner = join.shift()
              let match

              if ( part[0] === ":" ) {

                if ( match = part.match(/^:(\w+)(\(.*\))$/), match ) {
                  assignments.push(match[1])
                  regexp.push(match[2])
                } else {
                  assignments.push(part.slice(1))
                  regexp.push("([^\\"+(joiner||"\/")+"]*)")
                }

              } else {
                regexp.push(part)
              }

              joiner && regexp.push("(?:\\"+joiner+")")
          }()

        cache[str] = new RegExp("^"+regexp.join("")+"$", "i")
        cache[str].assignments = assignments
      }

    return cache[str]
}

const dispatcher = function(route, path){
    const rule = getRule(path)
    const match = route.path.match(rule)

    if ( !match )
      return false

    if ( match.length == 1 || !rule.assignments )
      return true

    return function(){
        for ( let i = 0, l = rule.assignments.length ; i < l; i++ )
          route.matches[rule.assignments[i]] = match[i+1]

        return route
    }()
}

const nexts = new WeakMap

class RouteDispatcher_Routing extends Event_Event {
    static get TYPE(){ return "routing" }

    constructor(hit){
        super(RouteDispatcher_Routing.TYPE)
        store.get(this).set(shits, hit)
    }

    get count(){ return store.get(this).get(shits) }
}

class RouteDispatcher_RouteDispatcher extends EventTarget_EventTarget {
    static isRouteHandler(o){ return !!o && (toType(o) == "function" || toType(o.handleRoute) == "function" ) }

    constructor({ route, target }){
        super()

        if ( !(route instanceof Route_Route) )
          throw new TypeError(ERR_NOTROUTE)

        if ( route.state !== Route_Route.states.INITIALIZED )
          throw new Error(ERR_ROUTE_BUSY)

        store.get(this).set(shits, 0)

        store.get(route).set(sstate, Route_Route.states.RUNNING)
        store.get(route).set(Route_starget, target)
        store.get(route).set(smatches, {})
        store.get(route).set(stimestamp, Date.now())
        store.get(route).set(shrt, performance.now())

        const handlers = bundleHandlers(target)

        const onstop = () => {
            store.get(route).set(sstate, Route_Route.states.INITIALIZED)
            this.dispatchEvent(new RouteDispatcher_Routing(store.get(this).get(shits)) )
        }

        const dispatchLoop = function*(){
            while ( !!handlers.length ) {
                if ( route.state === Route_Route.states.STOPPED )
                  return
                store.get(route).set(sstate, Route_Route.states.RUNNING)

                const [path, handler] = handlers.shift()

                yield new Promise((resolve, reject) => {
                    const match = path === "*" || dispatcher(route, path)

                    if ( !match )
                      return resolve(0)

                    let hit = path === "*" ? 0 :  1
                    let stop = path === "*" ? false : true

                    let next = is_hit => {
                        nexts.set(route, () => console.warn(WARN_LATE_NEXT)) //can only be invoked once and during the turn of the exec time of the handler

                        stop = false
                        if ( toType(is_hit) == "boolean" )
                          hit = !!is_hit ? 1 : 0
                    }

                    nexts.set(route, next)
                    const nextProxy = (...args) => Reflect.apply(nexts.get(route), null, args)

                    if ( handler.handleRoute )
                      handler.handleEvent.call(handler, route, nextProxy)
                    else
                      handler.call(null, route, nextProxy)

                    const onend =  () => {
                        nexts.set(route, () => console.warn(WARN_LATE_NEXT)) //can only be invoked once and during the turn of the exec time of the handler

                        if ( stop )
                          store.get(route).set(sstate, Route_Route.states.STOPPED)

                        resolve(hit)
                    }

                    if ( route.state === Route_Route.states.PAUSED )
                      route.wait().then(onend)
                    else onend()
                })
            }
        }.call(this)

        const next = () => {
            const iteration = dispatchLoop.next()

            if ( iteration.done )
              return onstop()
            else
              iteration.value
              .then(hit => {
                  store.get(this).set(shits,  store.get(this).get(shits) + hit)
                  next()
              })
        }

        next()
    }

}

// CONCATENATED MODULE: ./lib/routing/Router.mjs










const sroutes = new Object(Symbol())

class Router_Router extends Node_Node {
    static get isRouteHandler(){ return RouteDispatcher_RouteDispatcher.isRouteHandler }

    constructor(){
        super()
        store.get(this).set(sroutes, new Map)
    }

    get routes(){ return new Map(store.get(this).get(sroutes)) }

    addRouteHandler(path=null, handler=Function.prototype){
        if ( arguments.length > 1 && toType(path) == "array") {
            let count = 0

            for ( path of arguments[0] )
              count += 1, this.addRouteHandler(path, handler)

            return count
        }

        if ( toType(path) != "string" )
          throw new TypeError(errors_ERR_STRING_EXPECTED)

        if ( !Router_Router.isRouteHandler(handler) )
          throw new TypeError(ERR_RHANDLER)

        if ( toType(store.get(this).get(sroutes).get(path)) == "array" )
          store.get(this).get(sroutes).get(path).push(handler)
        else if ( Router_Router.isRouteHandler(store.get(this).get(sroutes).get(path)) )
          store.get(this).get(sroutes).set(path, [store.get(this).get(sroutes).get(path), handler])
        else
          store.get(this).get(sroutes).set(path, handler)

        return 1
    }

    dispatchRoute(route, request){
        route = route instanceof Route_Route ? route : new Route_Route(route, { request })

        return new RouteDispatcher_RouteDispatcher({ route, target: this })
    }

    removeRouteHandler(path = null, handler=Function.prototype){
        if ( arguments.length > 1 && toType(path) == "array") {
            let count = 0

            for ( path of arguments[0] )
              count += 1, this.addRouteHandler(path, handler)

            return count
        }

        if ( toType(store.get(this).get(sroutes).get(path)) == "array" ) {
            let count = 0
            let idx = -1

            while ( idx = store.get(this).get(sroutes).get(path).indexOf(handler), idx = -1 )
              count += 1, store.get(this).get(sroutes).get(path).splice(idx, 1)

            switch ( store.get(this).get(sroutes).get(path).length ) {
                case 0:
                  store.get(this).get(sroutes).delete(path)
                  break
                case 1:
                  store.get(this).get(sroutes).set(path, store.get(this).get(sroutes).get(path)[0])
                  break
            }

            return count
        }

        if ( store.get(this).get(sroutes).get(path) === handler ) {
            store.get(this).get(sroutes).delete(path)
            return 1
        }

        return 0
    }

}

// CONCATENATED MODULE: ./lib/utils/singleton.js


function singleton_toConsumableArray(arr) { return singleton_arrayWithoutHoles(arr) || singleton_iterableToArray(arr) || singleton_nonIterableSpread(); }

function singleton_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function singleton_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function singleton_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) singleton_setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function singleton_setPrototypeOf(o, p) { singleton_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return singleton_setPrototypeOf(o, p); }


/* harmony default export */ var utils_singleton = (function (Class) {
  var Singleton = function () {
    return function () {
      if (store.has(Class)) return store.get(Class);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var singleton = _construct(Class, args);

      store.set(Class, singleton);
      return singleton;
    };
  }(Class);

  void [].concat(singleton_toConsumableArray(Object.getOwnPropertyNames(Class)), singleton_toConsumableArray(Object.getOwnPropertySymbols(Class))).forEach(function (staticProperty) {
    if ((Object.getOwnPropertyDescriptor(Singleton, staticProperty) || {
      configurable: true
    }).configurable) Object.defineProperty(Singleton, staticProperty, Object.getOwnPropertyDescriptor(Class, staticProperty));
  });
  return Singleton;
});
// CONCATENATED MODULE: ./lib/views/View.js


function View_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { View_typeof = function _typeof(obj) { return typeof obj; }; } else { View_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return View_typeof(obj); }

function View_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function View_possibleConstructorReturn(self, call) { if (call && (View_typeof(call) === "object" || typeof call === "function")) { return call; } return View_assertThisInitialized(self); }

function View_getPrototypeOf(o) { View_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return View_getPrototypeOf(o); }

function View_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function View_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function View_createClass(Constructor, protoProps, staticProps) { if (protoProps) View_defineProperties(Constructor.prototype, protoProps); if (staticProps) View_defineProperties(Constructor, staticProps); return Constructor; }

function View_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) View_setPrototypeOf(subClass, superClass); }

function View_setPrototypeOf(o, p) { View_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return View_setPrototypeOf(o, p); }

function View_toConsumableArray(arr) { return View_arrayWithoutHoles(arr) || View_iterableToArray(arr) || View_nonIterableSpread(); }

function View_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function View_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function View_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }







var sargs = new Object(Symbol("args"));
var sconstructor = new Object(Symbol("constructor"));
var sexpression = new Object(Symbol("expression"));
var sfragment = new Object(Symbol("fragment"));
var sprops = new Object(Symbol("props"));
var ssubviewAsChild = new Object(Symbol("subview_as_child"));
var stemplate = new Object(Symbol("template"));
var View_suid = new Object(Symbol("uid"));
var supdates = new Object(Symbol("updates"));
var xmap = new Map();
var View_revocable = null;

var View_noop = function noop(strictlySealed) {
  return function () {
    return !strictlySealed;
  };
};

var revocableNodeProxy = function revocableNodeProxy(view, target, path) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var traps = {
    get: function get(target, key) {
      if (Array.isArray(target[key])) {
        if (opts.all) return View_toConsumableArray(target[key]);else return target[key][0];
      }

      return undefined;
    } // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions = traps.set =
    // noop(true)

  };

  var _Proxy$revocable = Proxy.revocable(target, traps),
      revoke = _Proxy$revocable.revoke,
      proxy = _Proxy$revocable.proxy; // if ( revocable )
  //   revocable()
  // revocable = () => setTimeout(revoke, 4)


  return proxy;
};

var revocablePropProxy = function revocablePropProxy(view, target, path) {
  var opts = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var traps = {
    get: function get(target, key) {
      return target[key];
    } // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions = traps.set =
    // noop(true)

  };

  var _Proxy$revocable2 = Proxy.revocable(target, traps),
      revoke = _Proxy$revocable2.revoke,
      proxy = _Proxy$revocable2.proxy;

  if (View_revocable) View_revocable();

  View_revocable = function revocable() {
    return setTimeout(revoke, 4);
  };

  return proxy;
};

var transformPath = function transformPath(path) {
  return path.reduce(function (acc, step) {
    if (isNaN(parseFloat(step))) return acc += ".".concat(step);else return acc += "[\"".concat(step, "\"]");
  }, "");
};

var View_expression = function expression() {
  var parts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : ["div"];

  for (var _len = arguments.length, values = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    values[_key - 1] = arguments[_key];
  }

  parts = toType(parts) == "array" ? parts : [parts];
  return parts.reduce(function (acc, current, i) {
    var value = i < values.length && function () {
      if (!(values[i] instanceof Object)) return;
    }();

    acc += current;
    if (i < values.length) if (!(values[i] instanceof Object)) return acc += values[i]; // case: inherits from View
    else if (typeof values[i] == "function" && View_View.isPrototypeOf(values[i])) return acc += "|".concat(Reflect.apply(View_View.toString, values[i], []), "|"); // case: describes a view and a set of args
      else if (Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["View"]) && Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["args"])) return acc += "|".concat(Reflect.apply(View_View.toString, values[i].View, []), ":").concat(values[i].args, "|"); // case: describes a model and a value path
        else if (Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["model"]) && Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["path"])) return acc += "\u230A".concat(transformPath(values[i].path), "\u2208").concat(values[i].model, "\u2309"); // default
          else return acc += Reflect.apply(Object.prototype.toString, values[i], []);
    return acc;
  }, "");
};

var View_View =
/*#__PURE__*/
function (_Node) {
  View_inherits(View, _Node);

  View_createClass(View, null, [{
    key: "expressWith",
    value: function expressWith() {
      // generate an entry
      if (!store.has(this)) this.toString();
      var uid = UID_UID.uid();

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      store.get(this).get(sargs).set(uid, args);
      return {
        View: this,
        args: uid
      };
    }
  }, {
    key: "toString",
    value: function toString() {
      if (!store.has(this)) store.set(this, new WeakMap()), store.get(this).set(View_suid, Symbol["for"](UID_UID.uid())), store.get(this).set(sconstructor, this), store.get(this).set(sargs, new Map());
      xmap.set(store.get(this).get(View_suid), store.get(this));
      return Symbol.keyFor(store.get(this).get(View_suid));
    }
  }, {
    key: "expression",
    get: function get() {
      return View_expression;
    }
  }, {
    key: "x",
    get: function get() {
      return View_expression;
    }
  }, {
    key: "xw",
    get: function get() {
      return this.expressWith;
    }
  }]);

  function View() {
    var _this;

    View_classCallCheck(this, View);

    _this = View_possibleConstructorReturn(this, View_getPrototypeOf(View).call(this));
    var conf = (arguments.length <= 0 ? undefined : arguments[0]) instanceof Object ? arguments.length <= 0 ? undefined : arguments[0] : {};
    var expression = conf.expression,
        props = conf.props,
        _conf$subviewAsChild = conf.subviewAsChild,
        subviewAsChild = _conf$subviewAsChild === void 0 ? true : _conf$subviewAsChild;
    store.get(View_assertThisInitialized(_this)).set(sprops, {});
    if (props) Object.keys(props).forEach(function (prop) {
      return store.get(View_assertThisInitialized(_this)).get(sprops)[prop] = props[prop];
    });
    store.get(View_assertThisInitialized(_this)).set(ssubviewAsChild, !!subviewAsChild);
    store.get(View_assertThisInitialized(_this)).set(sexpression, ZParser_Parser.parse(expression || _this.template, View_assertThisInitialized(_this)));
    store.get(View_assertThisInitialized(_this)).set(supdates, store.get(View_assertThisInitialized(_this)).get(sexpression).updates.reduce(function (acc, _ref) {
      var updaters = _ref.updaters,
          handler = _ref.handler;
      return updaters.forEach(function (updater) {
        if (!acc.has(updater)) acc.set(updater, new Set());
        acc.get(updater).add(handler);
      }), acc;
    }, new Map()));
    store.get(View_assertThisInitialized(_this)).get(supdates).forEach(function (handlers, updater) {
      return updater.addEventListener(Model_Model.events.modelchange, function () {
        return handlers.forEach(function (handler) {
          return handler();
        });
      }, true);
    });
    return _this;
  }

  View_createClass(View, [{
    key: "fragment",
    get: function get() {
      return store.get(this).get(sexpression).fragment;
    }
  }, {
    key: "node",
    get: function get() {
      return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], {
        all: false
      });
    }
  }, {
    key: "nodes",
    get: function get() {
      return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], {
        all: true
      });
    }
  }, {
    key: "props",
    get: function get() {
      return revocablePropProxy(this, store.get(this).get(sprops), []);
    }
  }]);

  return View;
}(Node_Node);


// CONCATENATED MODULE: ./lib/views/ZParser.js


function ZParser_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function ZParser_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function ZParser_createClass(Constructor, protoProps, staticProps) { if (protoProps) ZParser_defineProperties(Constructor.prototype, protoProps); if (staticProps) ZParser_defineProperties(Constructor, staticProps); return Constructor; }

function ZParser_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function ZParser_construct(Parent, args, Class) { if (ZParser_isNativeReflectConstruct()) { ZParser_construct = Reflect.construct; } else { ZParser_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) ZParser_setPrototypeOf(instance, Class.prototype); return instance; }; } return ZParser_construct.apply(null, arguments); }

function ZParser_setPrototypeOf(o, p) { ZParser_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return ZParser_setPrototypeOf(o, p); }

function ZParser_toConsumableArray(arr) { return ZParser_arrayWithoutHoles(arr) || ZParser_iterableToArray(arr) || ZParser_nonIterableSpread(); }

function ZParser_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function ZParser_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function ZParser_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return ZParser_arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || ZParser_nonIterableRest(); }

function ZParser_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function ZParser_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var auto_vars = Object.seal(["A", "INPUT", "SUBMIT", "BUTTON"]);

var CLASS_LIST_COMPAT = (Element.prototype.hasOwnProperty("classList") || HTMLElement.prototype.hasOwnProperty("classList")) && function () {
  // to be compatible, browser must be able to use classlist on a svg element
  try {
    document.createElementNS("http://www.w3.org/2000/svg", "svg").classList.add("x");
    return true;
  } catch (e) {}

  return false;
}(); // const escapeDummy = document.createTextNode("")
// const escapeHTML = string => (escapeDummy.nodeValue = string, escapeDummy.nodeValue)


var evaluate = function evaluate(value) {
  if (typeof value !== "string" || value instanceof String) return value;else if (value === "true") return true;else if (value === "false") return false;else if (value.indexOf(".") == -1) {
    var candidate = parseInt(value);
    if (!isNaN) return candidate;
    return value;
  } else if (value.indexOf(".") != -1) {
    var _candidate = parseFloat(value);

    if (!isNaN) return _candidate;
    return value;
  } else return value;
};

var setAttributeExceptions = ["muted", "value"];
var namespaces = Object.seal({
  html: "http://www.w3.org/1999/xhtml",
  svg: "http://www.w3.org/2000/svg",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
  xlink: "http://www.w3.org/1999/xlink"
});
var sbuffer = new Object(Symbol("buffer"));
var scontext = new Object(Symbol("context"));
var ZParser_sexpression = new Object(Symbol("expression"));
var ZParser_sfragment = new Object(Symbol("fragment"));
var slength = new Object(Symbol("length"));
var sowner = new Object(Symbol("owner"));
var spile = new Object(Symbol("pile"));
var spointer = new Object(Symbol("pointer"));
var srefs = new Object(Symbol("refs"));
var ZParser_supdates = new Object(Symbol("updates"));
var svars = new Object(Symbol("svars"));
var rextractsvars = /(⌊([^∈]*∈[^∈]*)⌉)/;
var rpathmodel = /(.*)∈(.*)/;

var ZParser_extractVars = function extractVars(input) {
  var output = [];
  var updaters = new Set();
  var hit;

  while (hit = rextractsvars.exec(input)) {
    var _hit = hit,
        _hit2 = _slicedToArray(_hit, 3),
        match = _hit2[1],
        data = _hit2[2];

    var idx = input.indexOf(match);
    if (idx) output.push(input.slice(0, idx));
    input = input.slice(idx + match.length);

    var _rpathmodel$exec = rpathmodel.exec(data),
        _rpathmodel$exec2 = _slicedToArray(_rpathmodel$exec, 3),
        path = _rpathmodel$exec2[1],
        ref = _rpathmodel$exec2[2];

    var model = Model_Model.ref(ref);

    if (!model) {
      output.push(match);
      continue;
    }

    updaters.add(model);
    output.push(function (path, model, match) {
      return function () {
        try {
          return new Function("model", "path", "\"use strict\"; return model.io".concat(path))(model, path);
        } catch (e) {
          return match;
        }
      };
    }(path, model, match));
  }

  output.push(input);

  var handler = function (input) {
    return function () {
      return input.reduce(function (acc, curr) {
        return acc += typeof curr == "function" ? curr() : curr;
      }, "");
    };
  }(output);

  return {
    updaters: updaters.size ? ZParser_toConsumableArray(updaters) : null,
    handler: handler
  };
};

var operators = new Map();
operators.set("@", {
  name: "@",
  handler: function handler(captured) {
    this.refs[captured] = this.refs[captured] || [];
    this.refs[captured].push(this.buffer);
  },
  capture: function capture() {
    do {
      var _this$lookAhead = this.lookAhead(),
          done = _this$lookAhead.done,
          value = _this$lookAhead.value;

      if (done || ZParser_Parser.traversals.has(value) || ZParser_Parser.operators.has(value)) break;
      this.pile += this.next().value;
    } while (true);

    var capture = this.pile.trim();
    this.pile = "";
    return [capture];
  }
});
operators.set("[", {
  name: "[",
  handler: function handler(captured) {
    if (this.buffer.nodeType != Node.ELEMENT_NODE) return;
    var idx = captured.search("=");
    var attr = idx == -1 ? captured : captured.split("=")[0];
    var ns;

    if (attr.indexOf(":") != -1) {
      var split = attr.split(":");
      attr = split[1];
      ns = ZParser_Parser.namespaces[split[0].toLowerCase()] || null;
    }

    var _ref = idx == -1 ? {
      handler: function handler() {
        return true;
      }
    } : ZParser_extractVars(captured.slice(idx + 1)),
        updaters = _ref.updaters,
        handler = _ref.handler;

    var update = {
      updaters: updaters,
      handler: function (node, ns, attr, handler) {
        return function () {
          var value = evaluate(handler());
          if (setAttributeExceptions.indexOf(attr) != -1) node[attr] = value;else if (ns) node.setAttributeNS(ns, attr, value);else node.setAttribute(attr, value);
        };
      }(this.buffer, ns, attr, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },
  capture: function capture() {
    var bracket = false;

    do {
      var _this$lookAhead2 = this.lookAhead(),
          done = _this$lookAhead2.done,
          value = _this$lookAhead2.value;

      if (done) break;

      if (!bracket && value === "]") {
        this.next();
        break;
      }

      if (value === "⌊") bracket = true;
      if (value === "⌉") bracket = false;
      this.pile += this.next().value;
    } while (true);

    var capture = this.pile.trim();
    return [capture];
  }
});
operators.set("#", {
  name: "#",
  handler: function handler(captured) {
    if (this.buffer.nodeType != Node.ELEMENT_NODE) return;

    var _extractVars = ZParser_extractVars(captured),
        updaters = _extractVars.updaters,
        handler = _extractVars.handler;

    var update = {
      updaters: updaters,
      handler: function (node, handler) {
        return function () {
          node.setAttribute("id", handler());
        };
      }(this.buffer, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },
  capture: function capture() {
    var bracket = false;

    do {
      var _this$lookAhead3 = this.lookAhead(),
          done = _this$lookAhead3.done,
          value = _this$lookAhead3.value;

      if (done) break;
      if (!bracket && (ZParser_Parser.traversals.has(value) || ZParser_Parser.operators.has(value))) break;
      if (value === "⌊") bracket = true;
      if (value === "⌉") bracket = false;
      this.pile += this.next().value;
    } while (true);

    var capture = this.pile.trim();
    this.pile = "";
    return [capture];
  }
});
operators.set(".", {
  name: ".",
  handler: function handler(captured) {
    if (this.buffer.nodeType != Node.ELEMENT_NODE) return;

    var _extractVars2 = ZParser_extractVars(captured),
        updaters = _extractVars2.updaters,
        handler = _extractVars2.handler;

    var update = {
      updaters: updaters,
      handler: function (node, handler) {
        var was = [];
        return function () {
          var requested = handler().split(" ");
          var remove = !was.length ? [] : was.reduce(function (acc, classname) {
            return requested.indexOf(classname) == -1 && acc.push(classname), acc;
          }, []);
          var add = !was.length ? requested : requested.reduce(function (acc, classname) {
            return was.indexOf(classname) == -1 && acc.push(classname), acc;
          }, []);

          if (CLASS_LIST_COMPAT) {
            remove.forEach(function (classname) {
              return node.classList.remove(classname);
            });
            add.forEach(function (classname) {
              return node.classList.add(classname);
            });
          } else {
            node.setAttribute("class", (node.getAttribute("class") || "").split(" ").filter(function (classname) {
              return remove.indexOf(classname) !== -1;
            }).concat(add).join(" "));
          }

          was.splice.apply(was, [0, was.length].concat(ZParser_toConsumableArray(requested)));
        };
      }(this.buffer, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },
  capture: function capture() {
    var bracket = false;

    do {
      var _this$lookAhead4 = this.lookAhead(),
          done = _this$lookAhead4.done,
          value = _this$lookAhead4.value;

      if (done) break;
      if (!bracket) if (ZParser_Parser.traversals.has(value) || ZParser_Parser.operators.has(value)) break;
      if (value === "⌊") bracket = true;
      if (value === "⌉") bracket = false;
      this.pile += this.next().value;
    } while (true);

    var capture = this.pile.trim();
    this.pile = "";
    return [capture];
  }
});
operators.set("{", {
  name: "{",
  handler: function handler(captured) {
    var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref2$safe = _ref2.safe,
        safe = _ref2$safe === void 0 ? true : _ref2$safe;

    var node = !safe || this.buffer.nodeType === Node.TEXT_NODE ? this.buffer : this.buffer.appendChild(document.createTextNode(""));

    var _extractVars3 = ZParser_extractVars(captured),
        updaters = _extractVars3.updaters,
        handler = _extractVars3.handler;

    var update = {
      updaters: updaters,
      handler: safe ? function (node, handler) {
        return function () {
          node.nodeValue = handler();
        };
      }(node, handler) : function (node, handler) {
        var was = "";
        return function () {
          var textNodes = Reflect.apply(Array.prototype.slice, node.childNodes, []).filter(function (node) {
            return node.nodeType === Node.TEXT_NODE;
          });
          if (textNodes.length) console.warn("unsafe variable will provoke a node.normalize()");
          var onnode = node.textContent;
          var position = !onnode.length ? 0 : was.length ? onnode.length : onnode.indexOf(was);
          var change = handler();

          var to = ZParser_toConsumableArray(onnode);

          to.splice.apply(to, [position, was.length].concat(ZParser_toConsumableArray(change)));
          node.innerHTML = to.join("");
        };
      }(node, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },
  capture: function capture() {
    var safe = this.lookAhead().value === "{" ? (this.next(), false) : true;
    var remains = safe ? 1 : 2;
    var ignore = 0;

    do {
      var _this$lookAhead5 = this.lookAhead(),
          done = _this$lookAhead5.done,
          value = _this$lookAhead5.value;

      if (done) break;

      if (value !== "}") {
        var _this$next = this.next(),
            _done = _this$next.done,
            _value = _this$next.value;

        if (_value == "{") ignore + 1;
        if (!_done) this.pile += _value;
      } else if (ignore) {
        ignore -= 1;

        if (ignore) {
          var _this$next2 = this.next(),
              _done2 = _this$next2.done,
              _value2 = _this$next2.value;

          if (!_done2) this.pile += _value2;
        }

        if (remains) {
          remains -= 1;
          if (remains) this.next();else break;
        }
      } else {
        remains -= 1;
        this.next();
        if (!remains) break;
      }
    } while (true);

    var capture = this.pile; //don't trim

    this.pile = "";
    return [capture, {
      safe: safe
    }];
  }
});
operators.set("(", {
  name: "(",
  handler: function handler(capture) {
    var _this = this;

    if (ZParser_Parser.debug) console.log("OP ( => captured: ".concat(capture));

    var _Parser$parse = ZParser_Parser.parse(capture),
        fragment = _Parser$parse.fragment,
        refs = _Parser$parse.refs,
        updates = _Parser$parse.updates;

    Object.keys(refs).filter(function (ref) {
      return ref !== "root";
    }).forEach(function (ref) {
      return _this.refs[ref] = _this.refs[ref] ? [].concat(ZParser_toConsumableArray(_this.refs[ref]), ZParser_toConsumableArray(refs[ref])) : ZParser_toConsumableArray(refs[ref]);
    });
    this.updates = [].concat(ZParser_toConsumableArray(this.updates), ZParser_toConsumableArray(updates));
    this.buffer = fragment;
  },
  capture: function capture() {
    var ignore = 0;

    do {
      var _this$lookAhead6 = this.lookAhead(),
          done = _this$lookAhead6.done,
          value = _this$lookAhead6.value;

      if (done) break;

      if (value !== ")") {
        var _this$next3 = this.next(),
            _done3 = _this$next3.done,
            _value3 = _this$next3.value;

        if (_value3 == "(") ignore += 1;
        if (!_done3) this.pile += _value3;
      } else {
        if (ignore) {
          ignore -= 1;

          var _this$next4 = this.next(),
              _done4 = _this$next4.done,
              _value4 = _this$next4.value;

          if (!_done4) this.pile += _value4;
        } else {
          this.next();
          break;
        }
      }
    } while (true);

    var capture = this.pile;
    this.pile = "";
    return [capture];
  }
});
operators.set("|", {
  name: "|",
  handler: function handler(capture) {
    var _this2 = this;

    if (ZParser_Parser.debug) console.log("OP |, capture: ".concat(capture, " => ").concat(xmap.get(Symbol["for"](capture))));
    var idx = capture.search(":");
    var symbol = Symbol["for"](idx == -1 ? capture : capture.split(":")[0]);
    var Constructor = xmap.get(symbol).get(sconstructor);
    var args = idx == -1 ? [] : xmap.get(symbol).get(sargs).get(capture.slice(idx + 1));

    var instance = ZParser_construct(Constructor, ZParser_toConsumableArray(args));

    instance.nodes.root.forEach(function (node) {
      return _this2.context.appendChild(node);
    });
    this.buffer = instance.nodes.root[instance.nodes.root.length - 1];
    if (this.owner instanceof View_View && store.get(this.owner).get(ssubviewAsChild)) this.owner.appendChild(instance);
  },
  capture: function capture() {
    do {
      var _this$lookAhead7 = this.lookAhead(),
          done = _this$lookAhead7.done,
          value = _this$lookAhead7.value;

      if (done) break;

      if (value !== "|") {
        var _this$next5 = this.next(),
            _done5 = _this$next5.done,
            _value5 = _this$next5.value;

        if (!_done5) this.pile += _value5;
      } else {
        this.next();
        break;
      }
    } while (true);

    var capture = this.pile;
    this.pile = "";
    return [capture];
  }
});
var traversals = new Map();
traversals.set(">", {
  name: "child",
  handler: function handler() {
    if (ZParser_Parser.debug) console.log("OP >, buffer", this.buffer, "context", this.context);
    this.context.appendChild(this.buffer);
    this.context = this.buffer;
    this.buffer = null;
  }
});
traversals.set("+", {
  name: "siblings",
  handler: function handler() {
    this.context.appendChild(this.buffer);
    this.buffer = null;
  }
});
var debug = false;

var ZParser_Parser =
/*#__PURE__*/
function () {
  ZParser_createClass(Parser, null, [{
    key: "parse",
    // static escapeHTML(string){
    //     escapeDummy.nodeValue = string
    //     return escapeDummy.nodeValue
    // }
    value: function parse(expression, owner) {
      return new Parser().parse(expression, owner);
    }
  }, {
    key: "auto_vars",
    get: function get() {
      return auto_vars;
    }
  }, {
    key: "debug",
    get: function get() {
      return debug;
    },
    set: function set(bool) {
      debug = !!bool;
    }
  }, {
    key: "namespaces",
    get: function get() {
      return namespaces;
    }
  }, {
    key: "operators",
    get: function get() {
      return operators;
    }
  }, {
    key: "traversals",
    get: function get() {
      return traversals;
    }
  }]);

  function Parser() {
    ZParser_classCallCheck(this, Parser);

    store.set(this, new WeakMap());
  }

  ZParser_createClass(Parser, [{
    key: "lookAhead",
    value: function lookAhead() {
      return {
        done: this.pointer + 1 >= this.length,
        value: this.expression[this.pointer + 1]
      };
    }
  }, {
    key: "next",
    value: function next() {
      this.pointer += 1;
      return {
        value: this.glyph,
        done: this.done
      };
    }
  }, {
    key: "operate",
    value: function operate(operator) {
      Reflect.apply(Parser.operator.get(operator), this, []);
    }
  }, {
    key: "parse",
    value: function parse() {
      var expression = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var owner = arguments.length > 1 ? arguments[1] : undefined;
      if (Parser.debug) console.log("parse(".concat(expression, ")"));
      this.expression = ZParser_toConsumableArray(expression);
      this.fragment = document.createDocumentFragment();
      this.context = this.fragment;
      this.length = this.expression.length;
      this.owner = owner;
      this.pile = "";
      this.pointer = 0;
      this.refs = {};
      this.updates = [];
      this.vars = new Set();

      do {
        if (Parser.traversals.has(this.glyph)) {
          var _Parser$traversals$ge = Parser.traversals.get(this.glyph),
              handler = _Parser$traversals$ge.handler;

          this.unpile();
          Reflect.apply(handler, this, []);
        } else if (Parser.operators.has(this.glyph)) {
          var _Parser$operators$get = Parser.operators.get(this.glyph),
              capture = _Parser$operators$get.capture,
              _handler = _Parser$operators$get.handler,
              name = _Parser$operators$get.name;

          this.unpile({
            handler: _handler,
            name: name
          });
          Reflect.apply(_handler, this, Reflect.apply(capture, this, []));
        } else this.pile += this.glyph;
      } while (!this.next().done); // empty pile


      if (this.pile.length) this.unpile(); // last traversal

      Reflect.apply(Parser.traversals.get(">").handler, this, []);
      return this;
    }
  }, {
    key: "unpile",
    value: function unpile() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          handler = _ref3.handler,
          name = _ref3.name;

      this.pile = this.pile.trim();

      if (!this.buffer) {
        if (!this.pile.length) this.buffer = document.createElement("div");else if (this.pile === "§") this.buffer = document.createTextNode("div");else if (this.pile.indexOf(":") != -1) {
          var split = this.pile.split(":");
          this.buffer = document.createElementNS(Parser.namespaces[split[0].toLowerCase()] || Parser.namespaces.html, split[1]);
        } else this.buffer = document.createElement(this.pile);
        if (Parser.auto_vars.indexOf(this.buffer.nodeName) != -1) Reflect.apply(operators.get("@").handler, this, [this.buffer.nodeName]); // node is root ( direct childNode of fragment )

        if (this.context === this.fragment) Reflect.apply(operators.get("@").handler, this, ["root"]);
      }

      this.pile = "";
    }
  }, {
    key: "buffer",
    get: function get() {
      return store.get(this).get(sbuffer);
    },
    set: function set(any) {
      store.get(this).set(sbuffer, any);
    }
  }, {
    key: "context",
    get: function get() {
      return store.get(this).get(scontext);
    },
    set: function set(node) {
      store.get(this).set(scontext, node);
    }
  }, {
    key: "done",
    get: function get() {
      return this.pointer >= this.length;
    }
  }, {
    key: "expression",
    get: function get() {
      return store.get(this).get(ZParser_sexpression);
    },
    set: function set(string) {
      store.get(this).set(ZParser_sexpression, string);
    }
  }, {
    key: "fragment",
    get: function get() {
      return store.get(this).get(ZParser_sfragment);
    },
    set: function set(fragment) {
      store.get(this).set(ZParser_sfragment, fragment);
    }
  }, {
    key: "glyph",
    get: function get() {
      if (Parser.debug) console.log("glyph => ".concat(this.expression[this.pointer], " (pointer:").concat(this.pointer, "/length:").concat(this.length, " done:").concat(this.done, ")"));
      return this.expression[this.pointer];
    }
  }, {
    key: "length",
    get: function get() {
      return store.get(this).get(slength);
    },
    set: function set(_int) {
      return store.get(this).set(slength, _int | 0);
    }
  }, {
    key: "owner",
    get: function get() {
      return store.get(this).get(sowner);
    },
    set: function set(any) {
      store.get(this).set(sowner, any);
    }
  }, {
    key: "pile",
    get: function get() {
      return store.get(this).get(spile);
    },
    set: function set(string) {
      store.get(this).set(spile, string);
    }
  }, {
    key: "pointer",
    get: function get() {
      return store.get(this).get(spointer);
    },
    set: function set(uint) {
      store.get(this).set(spointer, uint | 0);
    }
  }, {
    key: "refs",
    get: function get() {
      return store.get(this).get(srefs);
    },
    set: function set(object) {
      store.get(this).set(srefs, object);
    }
  }, {
    key: "updates",
    get: function get() {
      return store.get(this).get(ZParser_supdates);
    },
    set: function set(_set) {
      store.get(this).set(ZParser_supdates, _set);
    }
  }, {
    key: "vars",
    get: function get() {
      return store.get(this).get(svars);
    },
    set: function set(_set2) {
      store.get(this).set(svars, _set2);
    }
  }]);

  return Parser;
}();


// CONCATENATED MODULE: ./lib/css/Stylesheet.js


function Stylesheet_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Stylesheet_typeof = function _typeof(obj) { return typeof obj; }; } else { Stylesheet_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Stylesheet_typeof(obj); }

function Stylesheet_asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function Stylesheet_asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { Stylesheet_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { Stylesheet_asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function Stylesheet_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Stylesheet_possibleConstructorReturn(self, call) { if (call && (Stylesheet_typeof(call) === "object" || typeof call === "function")) { return call; } return Stylesheet_assertThisInitialized(self); }

function Stylesheet_getPrototypeOf(o) { Stylesheet_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Stylesheet_getPrototypeOf(o); }

function Stylesheet_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Stylesheet_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Stylesheet_createClass(Constructor, protoProps, staticProps) { if (protoProps) Stylesheet_defineProperties(Constructor.prototype, protoProps); if (staticProps) Stylesheet_defineProperties(Constructor, staticProps); return Constructor; }

function Stylesheet_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Stylesheet_setPrototypeOf(subClass, superClass); }

function Stylesheet_setPrototypeOf(o, p) { Stylesheet_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Stylesheet_setPrototypeOf(o, p); }













var Stylesheet_suid = new Object(Symbol());
var snode = new Object(Symbol());
var sready = new Object(Symbol());
var Stylesheet_srules = new Object(Symbol());
var ssheet = new Object(Symbol());
var swritable = new Object(Symbol());
var Stylesheet_updaters_text = new WeakMap();
var Stylesheet_Ready =
/*#__PURE__*/
function (_Event) {
  Stylesheet_inherits(Ready, _Event);

  Stylesheet_createClass(Ready, null, [{
    key: "TYPE",
    get: function get() {
      return "ready";
    }
  }]);

  function Ready(sheet) {
    var _this;

    Stylesheet_classCallCheck(this, Ready);

    _this = Stylesheet_possibleConstructorReturn(this, Stylesheet_getPrototypeOf(Ready).call(this, Ready.TYPE));
    store.get(Stylesheet_assertThisInitialized(_this)).set(ssheet, sheet);
    return _this;
  }

  Stylesheet_createClass(Ready, [{
    key: "sheet",
    get: function get() {
      return store.get(this).get(ssheet);
    }
  }]);

  return Ready;
}(Event_Event);

var Stylesheet_Stylesheet =
/*#__PURE__*/
function (_Node) {
  Stylesheet_inherits(Stylesheet, _Node);

  Stylesheet_createClass(Stylesheet, null, [{
    key: "isLocalFile",
    get: function get() {
      return isSameDomain;
    }
  }]);

  function Stylesheet() {
    var _this2;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    Stylesheet_classCallCheck(this, Stylesheet);

    _this2 = Stylesheet_possibleConstructorReturn(this, Stylesheet_getPrototypeOf(Stylesheet).call(this));
    var rules = toType(args[args.length - 1]) == "array" ? [].concat(args.pop()) : [];
    var dict = toType(args[args.length - 1]) == "object" ? args.pop() : {
      node: args.pop()
    };
    args = null;
    store.get(Stylesheet_assertThisInitialized(_this2)).set(Stylesheet_suid, toType(dict.id) == "string" ? dict.id : UID_UID.uid());
    store.get(Stylesheet_assertThisInitialized(_this2)).set(swritable, true);
    store.get(Stylesheet_assertThisInitialized(_this2)).set(Stylesheet_srules, []);
    store.get(Stylesheet_assertThisInitialized(_this2)).set(snode, function (node) {
      if (node && node.nodeType === window.Node.ELEMENT_NODE && ["STYLE", "LINK"].includes(node.nodeName)) return node;

      if (toType(node) == "string") {
        if (!Stylesheet.isLocalFile(node)) store.get(this).set(swritable, false);
        var href = node;
        node = ZParser_Parser.parse("link#".concat(store.get(this).get(Stylesheet_suid), "[rel=stylesheet][href=").concat(href, "]")).fragment.childNodes[0];
      } else {
        node = ZParser_Parser.parse("style#".concat(store.get(this).get(Stylesheet_suid))).fragment.childNodes[0];
        node.appendChild(document.createTextNode(rules.splice(0).join("\n")));
      }

      if (dict.media) node.setAttribute("media", dict.media);
      domready.then(function (_ref) {
        var nodes = _ref.nodes;
        nodes.head.appendChild(node);
        requestAnimationFrame(function (hrt) {
          if (!!dict.disabled) node.disabled = true;
        });
      });
      return node;
    }.call(Stylesheet_assertThisInitialized(_this2), dict.node || dict.href || void 0));
    store.get(Stylesheet_assertThisInitialized(_this2)).set(sready, new Promise(function (resolve, reject) {
      var onload = function onload(e) {
        if (store.get(Stylesheet_assertThisInitialized(_this2)).get(swritable) && rules && !!rules.length) _this2.insertRule(rules);
        resolve(store.get(Stylesheet_assertThisInitialized(_this2)).get(swritable));
        store.get(Stylesheet_assertThisInitialized(_this2)).set(ssheet, store.get(Stylesheet_assertThisInitialized(_this2)).get(snode).sheet);

        _this2.dispatchEvent(new Stylesheet_Ready(store.get(Stylesheet_assertThisInitialized(_this2)).get("sheet")));
      };

      if ("msSetImmediate" in window) // no events for <style> on ie
        msSetImmediate(onload); //TODO test on edge
      else store.get(Stylesheet_assertThisInitialized(_this2)).get(snode).addEventListener("load", onload), store.get(Stylesheet_assertThisInitialized(_this2)).get(snode).addEventListener("error", function (e) {
          console.error(e);
          reject(e);
        });
    }));
    return _this2;
  }

  Stylesheet_createClass(Stylesheet, [{
    key: "deleteRule",
    value: function () {
      var _deleteRule = Stylesheet_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var _this3 = this;

        var _len2,
            args,
            _key2,
            rules,
            writable,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                for (_len2 = _args.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                  args[_key2] = _args[_key2];
                }

                rules = toType(args[0]) == "array" ? args.shift() : args.length ? args : [];
                _context.next = 4;
                return store.get(this).get(sready);

              case 4:
                writable = _context.sent;
                rules.forEach(function (rule) {
                  var is_rule = false;
                  var is_conditional = false;
                  rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule_CSSConditionalRule ? (is_conditional = true, rule) : null;
                  if (!rule) return;

                  if (is_rule) {
                    if (Stylesheet_updaters_text.has(rule)) rule.removeEventListener(CSSRule_CSSRule.events.textupdate, Stylesheet_updaters_text.get(rule)), Stylesheet_updaters_text["delete"](rule);
                    var idx = -1;

                    while (idx = store.get(_this3).get(Stylesheet_srules).indexOf(rule), idx != -1) {
                      store.get(_this3).get(ssheet).deleteRule(idx), store.get(_this3).get(Stylesheet_srules).splice(idx, 1);
                    }
                  } else if (is_conditional) {
                    var _idx = -1;

                    while (_idx = store.get(_this3).get(Stylesheet_srules).indexOf(rule), _idx != -1) {
                      store.get(rule).get(sremove)(store.get(_this3).get(ssheet).cssRules[_idx]);
                      store.get(_this3).get(ssheet).deleteRule(_idx);
                      store.get(_this3).get(Stylesheet_srules).splice(_idx, 1);
                    }
                  }
                });

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function deleteRule() {
        return _deleteRule.apply(this, arguments);
      }

      return deleteRule;
    }()
  }, {
    key: "insertRule",
    value: function () {
      var _insertRule = Stylesheet_asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2() {
        var _this4 = this;

        var _len3,
            args,
            _key3,
            rules,
            writable,
            _args2 = arguments;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                for (_len3 = _args2.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                  args[_key3] = _args2[_key3];
                }

                rules = toType(args[0]) == "array" ? args.shift() : args.length ? args : [];
                _context2.next = 4;
                return store.get(this).get(sready);

              case 4:
                writable = _context2.sent;

                if (writable) {
                  _context2.next = 7;
                  break;
                }

                throw new Error(ERR_SS_NOT_WRITABLE);

              case 7:
                rules.forEach(function (rule) {
                  var is_rule = false;
                  var is_conditional = false;
                  rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule_CSSConditionalRule ? (is_conditional = true, rule) : (is_rule = true, new CSSRule_CSSRule(rule));
                  var idx = store.get(_this4).get(ssheet).cssRules.length;
                  store.get(_this4).get(Stylesheet_srules)[idx] = rule;

                  if (is_rule) {
                    store.get(_this4).get(ssheet).insertRule(rule.toString(), idx);
                    if (!Stylesheet_updaters_text.has(rule)) Stylesheet_updaters_text.set(rule, function (_ref2) {
                      var cssRule = _ref2.cssRule;
                      var idxs = [];
                      store.get(_this4).get(Stylesheet_srules).forEach(function (rule, idx) {
                        if (rule === cssRule) idxs.push(idx);
                      });
                      idxs.forEach(function (idx) {
                        return store.get(_this4).get(ssheet).cssRules[idx].style.cssText = cssRule.cssText;
                      });
                    });
                    rule.addEventListener(CSSRule_CSSRule.events.textupdate, Stylesheet_updaters_text.get(rule));
                  } else if (is_conditional) {
                    store.get(_this4).get(ssheet).insertRule(rule.toString(), idx);
                    store.get(rule).get(sadd)(store.get(_this4).get(ssheet).cssRules[idx]);
                  }
                });

              case 8:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function insertRule() {
        return _insertRule.apply(this, arguments);
      }

      return insertRule;
    }()
  }, {
    key: "media",
    get: function get() {
      return store.get(this).get(snode).getAttribute("media");
    },
    set: function set(v) {
      store.get(this).get(snode).setAttribute("media", v);
    }
  }, {
    key: "node",
    get: function get() {
      return store.get(this).get(snode);
    }
  }, {
    key: "sheet",
    get: function get() {
      return store.get(this).get(snode).sheet;
    }
  }]);

  return Stylesheet;
}(Node_Node);


// CONCATENATED MODULE: ./lib/utils/trait.js
 //TODO strenghten

function trait_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { trait_typeof = function _typeof(obj) { return typeof obj; }; } else { trait_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return trait_typeof(obj); }

function trait_toConsumableArray(arr) { return trait_arrayWithoutHoles(arr) || trait_iterableToArray(arr) || trait_nonIterableSpread(); }

function trait_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function trait_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function trait_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function trait_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function trait_possibleConstructorReturn(self, call) { if (call && (trait_typeof(call) === "object" || typeof call === "function")) { return call; } return trait_assertThisInitialized(self); }

function trait_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function trait_getPrototypeOf(o) { trait_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return trait_getPrototypeOf(o); }

function trait_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) trait_setPrototypeOf(subClass, superClass); }

function trait_setPrototypeOf(o, p) { trait_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return trait_setPrototypeOf(o, p); }

var sparents = Symbol("parents");
/* harmony default export */ var trait = (function () {
  for (var _len = arguments.length, classes = new Array(_len), _key = 0; _key < _len; _key++) {
    classes[_key] = arguments[_key];
  }

  var Class =
  /*#__PURE__*/
  function (_classes$pop) {
    trait_inherits(Class, _classes$pop);

    function Class() {
      trait_classCallCheck(this, Class);

      return trait_possibleConstructorReturn(this, trait_getPrototypeOf(Class).apply(this, arguments));
    }

    return Class;
  }(classes.pop());

  var prototypes = classes.reduce(function (accumulator, Class) {
    var prototypes = [Class.prototype];

    while (Class = Object.getPrototypeOf(Class), Class != Function.prototype) {
      prototypes.unshift(Class.prototype);
    }

    prototypes.forEach(function (prototype) {
      return accumulator.add(prototype);
    });
    return accumulator;
  }, new Set());
  prototypes.forEach(function (prototype) {
    return [].concat(trait_toConsumableArray(Object.getOwnPropertyNames(prototype)), trait_toConsumableArray(Object.getOwnPropertySymbols(prototype))).forEach(function (property) {
      return Object.defineProperty(Class.prototype, property, Object.getOwnPropertyDescriptor(prototype, property));
    });
  });
  Object.defineProperty(Class.prototype, "constructor", {
    configurable: true,
    value: Class
  });
  return Class;
});
// CONCATENATED MODULE: ./lib/graph/Vertex.js


function Vertex_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Vertex_typeof = function _typeof(obj) { return typeof obj; }; } else { Vertex_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Vertex_typeof(obj); }

function Vertex_toConsumableArray(arr) { return Vertex_arrayWithoutHoles(arr) || Vertex_iterableToArray(arr) || Vertex_nonIterableSpread(); }

function Vertex_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Vertex_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Vertex_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Vertex_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Vertex_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Vertex_createClass(Constructor, protoProps, staticProps) { if (protoProps) Vertex_defineProperties(Constructor.prototype, protoProps); if (staticProps) Vertex_defineProperties(Constructor, staticProps); return Constructor; }

function Vertex_possibleConstructorReturn(self, call) { if (call && (Vertex_typeof(call) === "object" || typeof call === "function")) { return call; } return Vertex_assertThisInitialized(self); }

function Vertex_getPrototypeOf(o) { Vertex_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Vertex_getPrototypeOf(o); }

function Vertex_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Vertex_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Vertex_setPrototypeOf(subClass, superClass); }

function Vertex_setPrototypeOf(o, p) { Vertex_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Vertex_setPrototypeOf(o, p); }








var slabel = new Object(Symbol("label"));

var Vertex_Vertex =
/*#__PURE__*/
function (_EventTarget) {
  Vertex_inherits(Vertex, _EventTarget);

  function Vertex(label) {
    var _this;

    Vertex_classCallCheck(this, Vertex);

    _this = Vertex_possibleConstructorReturn(this, Vertex_getPrototypeOf(Vertex).call(this));
    store.set(Vertex_assertThisInitialized(_this), new WeakMap());
    store.get(Vertex_assertThisInitialized(_this)).set(sedges, new Set());
    store.get(Vertex_assertThisInitialized(_this)).set(sgraphs, new Set());
    _this.label = label;
    return _this;
  }

  Vertex_createClass(Vertex, [{
    key: "addEdge",
    value: function addEdge(graph, edge) {
      // shortcut to graph method
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.addEdge(edge);
    }
  }, {
    key: "addEdges",
    value: function addEdges(graph, edges) {
      // shortcut to graph method
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.addEdges(edges);
    }
  }, {
    key: "adjacents",
    value: function adjacents(graph) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.adjacents(this);
    }
  }, {
    key: "adjacentsIn",
    value: function adjacentsIn(graph) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.adjacentsIn(this);
    }
  }, {
    key: "adjacentsOut",
    value: function adjacentsOut(graph) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.adjacentsOut(this);
    }
  }, {
    key: "arcFrom",
    value: function arcFrom(graph, vertex) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.arcFrom(vertex, this);
    } // number of edges not regions in graph

  }, {
    key: "arcs",
    value: function arcs(graph) {
      var _this2 = this;

      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.arcs.filter(function (_ref) {
        var vertices = _ref.vertices;
        return vertices.includes(_this2);
      });
    }
  }, {
    key: "arcTo",
    value: function arcTo(graph, vertex) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.arcTo(vertex, this);
    } // number of edges not regions in graph

  }, {
    key: "connections",
    value: function connections(graph) {
      var _this3 = this;

      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.connections.filter(function (_ref2) {
        var vertices = _ref2.vertices;
        return vertices.includes(_this3);
      });
    } // the number of edges

  }, {
    key: "degree",
    value: function degree(graph) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.degree(this);
    } // list edges related to current vertex in the given graph

  }, {
    key: "edges",
    value: function edges(graph) {
      var _this4 = this;

      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.edges.filter(function (edge) {
        return edge.vertices.includes(_this4);
      });
    }
  }, {
    key: "extravertArcWith",
    value: function extravertArcWith(graph, vertex) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.extravertArcWith(vertex, this);
    }
  }, {
    key: "hyperEdges",
    value: function hyperEdges(graph) {
      var _this5 = this;

      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.hyperarcs.filter(function (edge) {
        return edge.vertices.includes(_this5);
      });
    }
  }, {
    key: "hyperEdgeWith",
    value: function hyperEdgeWith(graph, vertices) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.hyperEdgeWith([this].concat(Vertex_toConsumableArray(vertices)));
    } // inward edges ( vertex <= x ) in the given graph

  }, {
    key: "indegree",
    value: function indegree(graph) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.indegree(this); //return graph.edges.filter(edge => edge.in && edge.in.includes(this))
    }
  }, {
    key: "introvertArcWith",
    value: function introvertArcWith(graph, vertex) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      if (!(vertex instanceof Vertex)) throw new TypeError(ENOTVERTEX);
      return graph.addEdge(new Edge_Edge([this, vertex], "<>"));
    }
  }, {
    key: "lines",
    value: function lines(graph) {
      var _this6 = this;

      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.lines.filter(function (edge) {
        return edge.vertices.includes(_this6);
      });
    }
  }, {
    key: "lineWith",
    value: function lineWith(graph, vertex) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.lineWith(vertex, this);
    }
  }, {
    key: "loop",
    value: function loop(graph, relation) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.loop(this, relation);
    }
  }, {
    key: "loops",
    value: function loops(graph) {
      var _this7 = this;

      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.loops.filter(function (_ref3) {
        var a = _ref3.a;
        return a === _this7;
      });
    } // outward edges ( vertex => x ) in the given graph

  }, {
    key: "outdegree",
    value: function outdegree(graph) {
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.outdegree(this); //return graph.edges.filter(edge => edge.out && edge.out.includes(this))
    }
  }, {
    key: "removeEdge",
    value: function removeEdge(graph, edge) {
      // shortcut to graph method
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.removeEdge(edge);
    }
  }, {
    key: "removeEdges",
    value: function removeEdges(graph, edges) {
      // shortcut to graph method
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      return graph.removeEdges(edges);
    }
  }, {
    key: "graphs",
    get: function get() {
      return Vertex_toConsumableArray(store.get(this).get(sgraphs));
    }
  }, {
    key: "label",
    get: function get() {
      return store.get(this).get(slbabel) || null;
    },
    set: function set() {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      store.get(this).set(slabel, label);
    }
  }]);

  return Vertex;
}(EventTarget_EventTarget);


// CONCATENATED MODULE: ./lib/graph/Edge.js


function Edge_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Edge_typeof = function _typeof(obj) { return typeof obj; }; } else { Edge_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Edge_typeof(obj); }

function Edge_toConsumableArray(arr) { return Edge_arrayWithoutHoles(arr) || Edge_iterableToArray(arr) || Edge_nonIterableSpread(); }

function Edge_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Edge_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Edge_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Edge_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Edge_possibleConstructorReturn(self, call) { if (call && (Edge_typeof(call) === "object" || typeof call === "function")) { return call; } return Edge_assertThisInitialized(self); }

function Edge_getPrototypeOf(o) { Edge_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Edge_getPrototypeOf(o); }

function Edge_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Edge_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Edge_createClass(Constructor, protoProps, staticProps) { if (protoProps) Edge_defineProperties(Constructor.prototype, protoProps); if (staticProps) Edge_defineProperties(Constructor, staticProps); return Constructor; }

function Edge_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Edge_setPrototypeOf(subClass, superClass); }

function Edge_setPrototypeOf(o, p) { Edge_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Edge_setPrototypeOf(o, p); }





var sdirection = new Object(Symbol());
var sedges = new Object(Symbol());
var sextraverted = new Object(Symbol());
var sgraph = new Object(Symbol);
var Edge_slabel = new Object(Symbol());
var srelation = new Object(Symbol());
var svertexa = new Object(Symbol());
var svertexb = new Object(Symbol());
var svertices = new Object(Symbol());
var relations = Object.freeze({
  "-": 1 // A - B
  ,
  LINE: 1,
  "<": 2 // A <- B
  ,
  INOUT: 2,
  "<>": 4 // A <-> B
  ,
  ININ: 4,
  ">": 8 // A -> B
  ,
  OUTIN: 8,
  "><": 16 // A >-< B
  ,
  OUTOUT: 16,
  "@": 32 // < A, B, C,... >
  ,
  REGION: 32,
  HYPERARC: 32
});
var states = Object.freeze({
  CONNECTED: 1,
  DISCONNECTED: 0
});
var types = Object.freeze({
  LINE: 1 // 2 vertices and no direction
  ,
  ARC: 2 // 2 vertices and 1-2 direction
  ,
  HYPERARC: 4 // more than 2 vertices
  ,
  REGION: 4 // more than 2 vertices
  ,
  LOOP: 8 // 1 vertice

});

var Edge_Edge =
/*#__PURE__*/
function (_EventTarget) {
  Edge_inherits(Edge, _EventTarget);

  Edge_createClass(Edge, null, [{
    key: "relations",
    get: function get() {
      return relations;
    }
  }, {
    key: "states",
    get: function get() {
      return states;
    }
  }, {
    key: "types",
    get: function get() {
      return types;
    }
  }]);

  function Edge(vertices, relation, label) {
    var _this;

    Edge_classCallCheck(this, Edge);

    _this = Edge_possibleConstructorReturn(this, Edge_getPrototypeOf(Edge).call(this));
    store.set(Edge_assertThisInitialized(_this), new WeakMap());
    store.get(Edge_assertThisInitialized(_this)).set(svertices, new Set());
    _this.relation = relation;
    _this.label = label;

    var _ref = Edge_toConsumableArray(vertices),
        a = _ref[0],
        b = _ref[1],
        otherVertices = _ref.slice(2);

    if (a) _this.addVertex(a);
    if (b) _this.addVertex(b);
    if (otherVertices.length) _this.addVertices(otherVertices);
    return _this;
  }

  Edge_createClass(Edge, [{
    key: "addVertex",
    value: function addVertex(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      var l = this.vertices.length;
      if (l >= 2 && this.relation !== Edge.relations.REGION) throw new Error(ETOOMANYVERT);
      store.get(this).get(svertices).add(vertex);
      store.get(vertex).get(sedges).add(this);
      return vertex;
    }
  }, {
    key: "addVertices",
    value: function addVertices(vertices) {
      var _this2 = this;

      return Edge_toConsumableArray(vertices).map(function (vertex) {
        return _this2.addVertex(vertex);
      });
    }
  }, {
    key: "removeVertex",
    value: function removeVertex(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      store.get(this).get(svertices)["delete"](vertex);
      store.get(vertex).get(sedges)["delete"](this);
      return vertex;
    }
  }, {
    key: "removeVertices",
    value: function removeVertices(vertices) {
      var _this3 = this;

      return Edge_toConsumableArray(vertices).map(function (vertex) {
        return _this3.removeVertex(vertex);
      });
    }
  }, {
    key: "a",
    get: function get() {
      return this.vertices[0] || null;
    }
  }, {
    key: "b",
    get: function get() {
      return this.vertices[1] || this.vertices[0] || null;
    }
  }, {
    key: "bidirected",
    get: function get() {
      return Boolean(this.relation & (Edge.relations.OUTOUT | Edge.relations.ININ));
    }
  }, {
    key: "directed",
    get: function get() {
      return Boolean(this.relation & (Edge.relations.INOUT | Edge.relations.OUTIN));
    }
  }, {
    key: "extraverted",
    get: function get() {
      return Boolean(this.relation & Edge.relations.ININ);
    }
  }, {
    key: "graph",
    get: function get() {
      return store.get(this).get(sgraph) || null;
    }
  }, {
    key: "in",
    get: function get() {
      if (this.relation & Edge.relations.ININ) return Edge_toConsumableArray(new Set([this.a, this.b]));else if (this.relation & Edge.relations.INOUT) return [this.a];else if (this.relation & Edge.relations.OUTIN) return [this.b];
      return null;
    }
  }, {
    key: "inward",
    get: function get() {
      return this["in"];
    }
  }, {
    key: "intraverted",
    get: function get() {
      return Boolean(this.relation & Edge.relations.ININ);
    }
  }, {
    key: "label",
    get: function get() {
      return store.get(this).get(Edge_slabel) || null;
    },
    set: function set() {
      var label = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      store.get(this).set(Edge_slabel, label);
    }
  }, {
    key: "out",
    get: function get() {
      if (this.relation & Edge.relations.OUTOUT) return Edge_toConsumableArray(new Set([this.a, this.b]));else if (this.relation & Edge.relations.OUTIN) return [this.a];else if (this.relation & Edge.relations.INOUT) return [this.b];
      return null;
    }
  }, {
    key: "outward",
    get: function get() {
      return this.out;
    }
  }, {
    key: "relation",
    get: function get() {
      return store.get(this).get(srelation);
    },
    set: function set() {
      var rel = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "LINE";
      if (!Edge.relations.hasOwnProperty(rel)) throw new ReferenceError(EUNKNWNREL);
      store.get(this).set(srelation, Edge.relations[rel]);
    }
  }, {
    key: "state",
    get: function get() {
      return store.get(this).get(sgraph) ? Edge.states.CONNECTED : Edge.states.DISCONNECTED;
    }
  }, {
    key: "type",
    get: function get() {
      if (this.relation & Edge.relations.LINE) return this.a === this.b ? Edge.types.LOOP : Edge.types.LINE;else if (this.relation & (Edge.relations.INOUT | Edge.relations.OUTIN | Edge.relations.ININ | Edge.relations.OUTOUT)) return this.a === this.b ? Edge.types.LOOP : Edge.types.ARC;else if (this.relation & Edge.relations.REGION) return Edge.types.HYPERARC;
    }
  }, {
    key: "undirected",
    get: function get() {
      return !this.directed && !this.bidirected;
    }
  }, {
    key: "vertices",
    get: function get() {
      return Edge_toConsumableArray(store.get(this).get(svertices));
    }
  }]);

  return Edge;
}(EventTarget_EventTarget);


// CONCATENATED MODULE: ./lib/graph/DepthFirstTree.js


function DepthFirstTree_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function DepthFirstTree_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function DepthFirstTree_createClass(Constructor, protoProps, staticProps) { if (protoProps) DepthFirstTree_defineProperties(Constructor.prototype, protoProps); if (staticProps) DepthFirstTree_defineProperties(Constructor, staticProps); return Constructor; }






var DepthFirstTree_sgraph = new Object(Symbol());
var sroot = new Object(Symbol());
var straversal = new Object(Symbol());

var DepthFirstTree_DepthFirstTree =
/*#__PURE__*/
function () {
  DepthFirstTree_createClass(DepthFirstTree, null, [{
    key: "from",
    value: function from(_ref) {
      var graph = _ref.graph,
          rootVertex = _ref.rootVertex,
          traversal = _ref.traversal;
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      var dft = Object.create({});
      Object.setPrototypeOf(dft, DepthFirstTree.prototype);
      store.set(dft, new WeakMap());
      store.get(dft).set(DepthFirstTree_sgraph, graph);
      store.get(dft).set(sroot, rootVertex);
      store.get(dft).set(straversal, traversal);
      return dft;
    }
  }]);

  function DepthFirstTree() {
    DepthFirstTree_classCallCheck(this, DepthFirstTree);

    throw new Error(EINVALIDCONS);
  }

  DepthFirstTree_createClass(DepthFirstTree, [{
    key: "hasPathTo",
    value: function hasPathTo(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      return store.get(this).get(straversal).has(vertex);
    }
  }, {
    key: "root",
    get: function get() {
      return store.get(this).get(sroot);
    }
  }]);

  return DepthFirstTree;
}();


// CONCATENATED MODULE: ./lib/graph/Traversal.js


function Traversal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Traversal_typeof = function _typeof(obj) { return typeof obj; }; } else { Traversal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Traversal_typeof(obj); }

function Traversal_toConsumableArray(arr) { return Traversal_arrayWithoutHoles(arr) || Traversal_iterableToArray(arr) || Traversal_nonIterableSpread(); }

function Traversal_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Traversal_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Traversal_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Traversal_slicedToArray(arr, i) { return Traversal_arrayWithHoles(arr) || Traversal_iterableToArrayLimit(arr, i) || Traversal_nonIterableRest(); }

function Traversal_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Traversal_iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Traversal_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Traversal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Traversal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Traversal_createClass(Constructor, protoProps, staticProps) { if (protoProps) Traversal_defineProperties(Constructor.prototype, protoProps); if (staticProps) Traversal_defineProperties(Constructor, staticProps); return Constructor; }

function Traversal_possibleConstructorReturn(self, call) { if (call && (Traversal_typeof(call) === "object" || typeof call === "function")) { return call; } return Traversal_assertThisInitialized(self); }

function Traversal_getPrototypeOf(o) { Traversal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Traversal_getPrototypeOf(o); }

function Traversal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Traversal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Traversal_setPrototypeOf(subClass, superClass); }

function Traversal_setPrototypeOf(o, p) { Traversal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Traversal_setPrototypeOf(o, p); }








var Traversal_sgraph = new Object(Symbol());

var Traversal_Traversal =
/*#__PURE__*/
function (_EventTarget) {
  Traversal_inherits(Traversal, _EventTarget);

  function Traversal(graph) {
    var _this;

    Traversal_classCallCheck(this, Traversal);

    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    _this = Traversal_possibleConstructorReturn(this, Traversal_getPrototypeOf(Traversal).call(this));
    store.set(Traversal_assertThisInitialized(_this), new WeakMap());
    store.get(Traversal_assertThisInitialized(_this)).set(Traversal_sgraph, graph);
    return _this;
  }

  Traversal_createClass(Traversal, [{
    key: "depthFirstTree",
    value: function depthFirstTree(rootVertex) {
      var _this2 = this;

      if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      var traversal = new WeakMap();
      var stack = [[null, rootVertex]];

      var _loop = function _loop() {
        var _stack = Traversal_slicedToArray(stack[stack.length - 1], 2),
            parent = _stack[0],
            vertex = _stack[1];

        traversal.set(vertex, parent);
        var nextVertex = [].concat(Traversal_toConsumableArray(_this2.graph.lines.reduce(function (acc, _ref) {
          var a = _ref.a,
              b = _ref.b,
              vertices = _ref.vertices;
          return vertices.includes(vertex) && acc.push(a === vertex ? b : a), acc;
        }, [])), Traversal_toConsumableArray(_this2.graph.adjacentsOut(vertex))).filter(function (child) {
          return !traversal.has(child);
        })[0];
        if (!nextVertex) stack.pop();else stack.push([vertex, nextVertex]);
      };

      while (stack.length) {
        _loop();
      }

      return DepthFirstTree_DepthFirstTree.from({
        graph: this.graph,
        rootVertex: rootVertex,
        traversal: traversal
      });
    }
  }, {
    key: "breadthFirstTree",
    value: function breadthFirstTree(rootVertex) {
      var _this3 = this;

      if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      var traversal = new WeakMap();
      var queue = [[null, rootVertex]];

      var _loop2 = function _loop2() {
        var _queue$shift = queue.shift(),
            _queue$shift2 = Traversal_slicedToArray(_queue$shift, 2),
            parent = _queue$shift2[0],
            vertex = _queue$shift2[1];

        if (traversal.has(vertex)) return "continue";
        traversal.set(vertex, parent); // void [
        //     ...this.graph.lines.reduce((acc, {a, b, vertices}) => (vertices.includes(vertex) && acc.push(a===vertex?b:a), acc), [])
        //   , ...this.graph.adjacentsOut(vertex)
        // ]
        // .filter(child => !traversal.has(child))
        // .forEach(child => queue.push([vertex, child]))

        void [].concat(Traversal_toConsumableArray(_this3.graph.lines.filter(function (_ref2) {
          var vertices = _ref2.vertices;
          return vertices.includes(vertex);
        })), Traversal_toConsumableArray(_this3.graph.arcs.filter(function (_ref3) {
          var vertices = _ref3.vertices;
          return vertices.includes(vertex);
        }))).sort(function (a, b) {
          return (+a.label || 0) - (+b.label || 0);
        }).reduce(function (acc, _ref4) {
          var a = _ref4.a,
              b = _ref4.b;
          return acc.push(a === vertex ? b : a), acc;
        }, []).forEach(function (child) {
          return queue.push([vertex, child]);
        });
      };

      while (queue.length) {
        var _ret = _loop2();

        if (_ret === "continue") continue;
      }

      return BreadthFirstTree_BreadthFirstTree.from({
        graph: this.graph,
        rootVertex: rootVertex,
        traversal: traversal
      });
    }
  }, {
    key: "bft",
    get: function get() {
      return this.breadthFirstTree;
    }
  }, {
    key: "graph",
    get: function get() {
      return store.get(this).get(Traversal_sgraph);
    }
  }]);

  return Traversal;
}(EventTarget_EventTarget);


// CONCATENATED MODULE: ./lib/graph/Graph.js


function Graph_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Graph_typeof = function _typeof(obj) { return typeof obj; }; } else { Graph_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Graph_typeof(obj); }

function Graph_toConsumableArray(arr) { return Graph_arrayWithoutHoles(arr) || Graph_iterableToArray(arr) || Graph_nonIterableSpread(); }

function Graph_nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function Graph_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Graph_arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function Graph_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Graph_possibleConstructorReturn(self, call) { if (call && (Graph_typeof(call) === "object" || typeof call === "function")) { return call; } return Graph_assertThisInitialized(self); }

function Graph_getPrototypeOf(o) { Graph_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Graph_getPrototypeOf(o); }

function Graph_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Graph_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Graph_createClass(Constructor, protoProps, staticProps) { if (protoProps) Graph_defineProperties(Constructor.prototype, protoProps); if (staticProps) Graph_defineProperties(Constructor, staticProps); return Constructor; }

function Graph_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Graph_setPrototypeOf(subClass, superClass); }

function Graph_setPrototypeOf(o, p) { Graph_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Graph_setPrototypeOf(o, p); }








var sallowed = new Object(Symbol("allowed"));
var Graph_sedges = new Object(Symbol("edges"));
var sgraphs = new Object(Symbol("graphs"));
var Graph_svertices = new Object(Symbol("vertices"));
var allowance = Object.freeze({
  PARALLELS: 1024
});
var presets = Object.freeze({
  LINES: 1,
  UNDIRECTED: 1,
  ARCS: 2,
  DIRECTED: 2,
  CONNECTIONS: 11,
  ALL: 15
});

var Graph_Graph =
/*#__PURE__*/
function (_EventTarget) {
  Graph_inherits(Graph, _EventTarget);

  Graph_createClass(Graph, null, [{
    key: "allowance",
    get: function get() {
      return allowance;
    }
  }, {
    key: "presets",
    get: function get() {
      return presets;
    }
  }]);

  function Graph() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref$allows = _ref.allows,
        allows = _ref$allows === void 0 ? 3 : _ref$allows;

    Graph_classCallCheck(this, Graph);

    _this = Graph_possibleConstructorReturn(this, Graph_getPrototypeOf(Graph).call(this));
    store.set(Graph_assertThisInitialized(_this), new WeakMap());
    store.get(Graph_assertThisInitialized(_this)).set(sallowed, allows);
    store.get(Graph_assertThisInitialized(_this)).set(Graph_sedges, new Set());
    store.get(Graph_assertThisInitialized(_this)).set(Graph_svertices, new Set());
    return _this;
  }

  Graph_createClass(Graph, [{
    key: "allows",
    value: function allows(type) {
      return Boolean(store.get(this).get(sallowed) & type);
    }
  }, {
    key: "addEdge",
    value: function addEdge(edge) {
      var _this2 = this;

      if (!(edge instanceof Edge_Edge)) throw new TypeError(ENOTEDGE);
      if (edge.state == Edge_Edge.states.CONNECTED) throw new Error(EALRDYCONN);
      if (!this.allows(edge.type) || edge.vertices.some(function (vertex) {
        return !store.get(_this2).get(Graph_svertices).has(vertex);
      })) throw new TypeError(EUNCOMPEDGE);
      if (edge.type !== Edge_Edge.types.HYPERARC && !this.allows(Graph.allowance.PARALLELS) && (edge.type !== Edge_Edge.types.LOOP && Graph_toConsumableArray(this.connections).filter(function (_ref2) {
        var vertices = _ref2.vertices;
        return vertices.includes(edge.a) && vertices.includes(edge.b);
      }).length || edge.type === Edge_Edge.types.LOOP && Graph_toConsumableArray(this.loops).filter(function (_ref3) {
        var a = _ref3.a;
        return a == edge.a;
      }).length)) throw new Error(EPRLLLNOTALLOW);
      store.get(this).get(Graph_sedges).add(edge);
      store.get(edge).set(sgraph, this);
      return edge;
    }
  }, {
    key: "addEdges",
    value: function addEdges(edges) {
      var _this3 = this;

      void Graph_toConsumableArray(edges).forEach(function (edge) {
        return _this3.addEdge(edge);
      });
    }
  }, {
    key: "adjacents",
    value: function adjacents(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
      return Graph_toConsumableArray(this.connections.reduce(function (acc, _ref4) {
        var a = _ref4.a,
            b = _ref4.b;
        return b === vertex ? (acc.add(a), acc) : a === vertex ? (acc.add(b), acc) : acc;
      }, new Set()));
    }
  }, {
    key: "adjacentsIn",
    value: function adjacentsIn(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
      return Graph_toConsumableArray(this.arcs.reduce(function (acc, _ref5) {
        var inward = _ref5.inward,
            outward = _ref5.outward,
            relation = _ref5.relation;
        if (inward && inward.includes(vertex)) relation !== Edge_Edge.relations.ININ ? outward && outward.forEach(function (outward) {
          return outward !== vertex && acc.add(outward);
        }) : inward.forEach(function (inward) {
          return inward !== vertex && acc.add(inward);
        });
        return acc;
      }, new Set()));
    }
  }, {
    key: "adjacentsOut",
    value: function adjacentsOut(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
      return Graph_toConsumableArray(this.arcs.reduce(function (acc, _ref6) {
        var inward = _ref6.inward,
            outward = _ref6.outward,
            relation = _ref6.relation;
        if (outward && outward.includes(vertex)) relation !== Edge_Edge.relations.OUTOUT ? inward && inward.forEach(function (inward) {
          return inward !== vertex && acc.add(inward);
        }) : outward.forEach(function (outward) {
          return outward !== vertex && acc.add(outward);
        });
        return acc;
      }, new Set()));
    }
  }, {
    key: "addVertex",
    value: function addVertex(vertex, edges) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      store.get(this).get(Graph_svertices).add(vertex);
      store.get(vertex).get(sgraphs).add(this);
      if (edges && edges instanceof Edge_Edge) this.addEdge(edges);else if (edges && edges[Symbol.iterator]) this.addEdges(edges);else if (typeof edges == "function") {
        for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          args[_key - 2] = arguments[_key];
        }

        var edge = this.addEdge(Reflect.construct(edges, [[vertex]].concat(args)));
        return [vertex, edge];
      }
      return vertex;
    }
  }, {
    key: "addVertices",
    value: function addVertices(vertices, edges) {
      var _this4 = this;

      var added = Graph_toConsumableArray(vertices).map(function (vertex) {
        return _this4.addVertex(vertex);
      });

      if (edges && edges instanceof Edge_Edge) this.addEdge(edges);else if (edges && edges[Symbol.iterator]) this.addEdges(edges);else if (typeof edges == "function") {
        for (var _len2 = arguments.length, args = new Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
          args[_key2 - 2] = arguments[_key2];
        }

        var edge = Reflect.construct(edges, [added].concat(args));
        return [added, this.addEdge(edge)];
      }
      return added;
    }
  }, {
    key: "arcFrom",
    value: function arcFrom(a, b) {
      if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      return this.addEdge(new Edge_Edge([a, b], ">"));
    }
  }, {
    key: "arcTo",
    value: function arcTo(a, b) {
      if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      return this.addEdge(new Edge_Edge([a, b], "<"));
    }
  }, {
    key: "breadthFirstTree",
    value: function breadthFirstTree(vertex) {
      return new Traversal_Traversal(this).breadthFirstTree(vertex);
    }
  }, {
    key: "degree",
    value: function degree(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
      return this.connections.reduce(function (acc, _ref7) {
        var vertices = _ref7.vertices,
            type = _ref7.type;
        if (vertices.includes(vertex)) acc += type === Edge_Edge.types.LOOP ? 2 : 1;
        return acc;
      }, 0);
    }
  }, {
    key: "depthFirstTree",
    value: function depthFirstTree(vertex) {
      return new Traversal_Traversal(this).depthFirstTree(vertex);
    }
  }, {
    key: "extravertArcWith",
    value: function extravertArcWith(a, b) {
      if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      return this.addEdge(new Edge_Edge([a, b], "><"));
    }
  }, {
    key: "hyperEdgeWith",
    value: function hyperEdgeWith(vertices) {
      vertices.forEach(function (vertex) {
        if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      });
      return this.addEdge(new Edge_Edge(Graph_toConsumableArray(vertices), "@"));
    }
  }, {
    key: "indegree",
    value: function indegree(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
      return this.arcs.reduce(function (acc, _ref8) {
        var inward = _ref8.inward;
        if (inward.includes(vertex)) acc += 1;
        return acc;
      }, 0);
    }
  }, {
    key: "introvertArcWith",
    value: function introvertArcWith(vertices) {
      if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      return this.addEdge(new Edge_Edge([a, b], "<>"));
    }
  }, {
    key: "lineWith",
    value: function lineWith(a, b) {
      if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      return this.addEdge(new Edge_Edge([a, b]));
    }
  }, {
    key: "loop",
    value: function loop(vertex) {
      var rel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "LINE";
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      if (!Edge_Edge.relations.hasOwnProperty(rel)) throw new ReferenceError(EUNKNWNREL);
      return this.addEdge(new Edge_Edge([vertex], rel));
    }
  }, {
    key: "outdegree",
    value: function outdegree(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
      return this.arcs.reduce(function (acc, _ref9) {
        var outward = _ref9.outward;
        if (outward.includes(vertex)) acc += 1;
        return acc;
      }, 0);
    }
  }, {
    key: "removeEdge",
    value: function removeEdge(edge) {
      if (!(edge instanceof Edge_Edge)) throw new TypeError(ENOTEDGE);
      store.get(this).get(Graph_sedges)["delete"](edge);
      store.get(edge)["delete"](sgraph);
      return edge;
    }
  }, {
    key: "removeEdges",
    value: function removeEdges(edges) {
      var _this5 = this;

      void Graph_toConsumableArray(edges).forEach(function (edge) {
        return _this5.removeEdge(edge);
      });
    }
  }, {
    key: "removeVertex",
    value: function removeVertex(vertex, edges) {
      var _this6 = this;

      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      store.get(this).get(Graph_svertices)["delete"](vertex);
      store.get(vertex).get(sgraphs)["delete"](this);
      edges = edges && edges[Symbol.iterator] ? edges : edges ? [edges] : [];
      void Graph_toConsumableArray(edges).forEach(function (edge) {
        return _this6.removeEdge(edge);
      });
      void Graph_toConsumableArray(this.edges).forEach(function (edge) {
        if (!edge.vertices.includes(vertex)) return; //if ( edge.type != Edge.types.HYPERARC || edge.vertices.length == 1)

        if (edge.vertices.length > 1 && (edge.type == Edge_Edge.types.HYPERARC || _this6.allows(Edge_Edge.types.LOOP))) edge.removeVertex(vertex);else _this6.removeEdge(edge);
      });
      return vertex;
    }
  }, {
    key: "removeVertices",
    value: function removeVertices(vertices, edges) {
      var _this7 = this;

      void Graph_toConsumableArray(vertices).forEach(function (vertex) {
        return _this7.removeVertex(vertex);
      });
      if (edges && !edges[Symbol.iterator]) this.removeEdge(edges);else if (edges && edges[Symbol.iterator]) this.removeEdges(edges);
    }
  }, {
    key: "allowed",
    get: function get() {
      return store.get(this).get("sallowed");
    }
  }, {
    key: "arcs",
    get: function get() {
      return this.edges.filter(function (edge) {
        return edge.type == Edge_Edge.types.ARC;
      });
    }
  }, {
    key: "connections",
    get: function get() {
      return this.edges.filter(function (edge) {
        return edge.type & (Edge_Edge.types.LINE | Edge_Edge.types.ARC | Edge_Edge.types.LOOP);
      });
    }
  }, {
    key: "edges",
    get: function get() {
      return Graph_toConsumableArray(store.get(this).get(Graph_sedges));
    }
  }, {
    key: "hyperarcs",
    get: function get() {
      return this.edges.filter(function (edge) {
        return edge.type == Edge_Edge.types.HYPERARC;
      });
    }
  }, {
    key: "lines",
    get: function get() {
      return this.edges.filter(function (edge) {
        return edge.type == Edge_Edge.types.LINE;
      });
    }
  }, {
    key: "loops",
    get: function get() {
      return this.edges.filter(function (edge) {
        return edge.type == Edge_Edge.types.LOOP;
      });
    }
  }, {
    key: "regions",
    get: function get() {
      return this.hyperarcs;
    }
  }, {
    key: "vertices",
    get: function get() {
      return Graph_toConsumableArray(store.get(this).get(Graph_svertices));
    }
  }, {
    key: "bft",
    get: function get() {
      return this.breadthFirstTree;
    }
  }, {
    key: "dft",
    get: function get() {
      return this.depthFirstTree;
    }
  }]);

  return Graph;
}(EventTarget_EventTarget);


// CONCATENATED MODULE: ./lib/graph/BreadthFirstTree.js


function BreadthFirstTree_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function BreadthFirstTree_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function BreadthFirstTree_createClass(Constructor, protoProps, staticProps) { if (protoProps) BreadthFirstTree_defineProperties(Constructor.prototype, protoProps); if (staticProps) BreadthFirstTree_defineProperties(Constructor, staticProps); return Constructor; }






var BreadthFirstTree_sgraph = new Object(Symbol());
var BreadthFirstTree_sroot = new Object(Symbol());
var BreadthFirstTree_straversal = new Object(Symbol());

var BreadthFirstTree_BreadthFirstTree =
/*#__PURE__*/
function () {
  BreadthFirstTree_createClass(BreadthFirstTree, null, [{
    key: "from",
    value: function from(_ref) {
      var graph = _ref.graph,
          rootVertex = _ref.rootVertex,
          traversal = _ref.traversal;
      if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
      if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      var bft = Object.create({});
      Object.setPrototypeOf(bft, BreadthFirstTree.prototype);
      store.set(bft, new WeakMap());
      store.get(bft).set(BreadthFirstTree_sgraph, graph);
      store.get(bft).set(BreadthFirstTree_sroot, rootVertex);
      store.get(bft).set(BreadthFirstTree_straversal, traversal);
      return bft;
    }
  }]);

  function BreadthFirstTree() {
    BreadthFirstTree_classCallCheck(this, BreadthFirstTree);

    throw new Error(EINVALIDCONS);
  }

  BreadthFirstTree_createClass(BreadthFirstTree, [{
    key: "hasPathTo",
    value: function hasPathTo(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      return store.get(this).get(BreadthFirstTree_straversal).has(vertex);
    }
  }, {
    key: "pathTo",
    value: function pathTo(vertex) {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
      var traversal = store.get(this).get(BreadthFirstTree_straversal);
      if (!traversal.has(vertex)) return null;
      var path = [vertex];
      var parent = vertex;

      while (parent = traversal.get(parent)) {
        path.unshift(parent);
      }

      return path;
    }
  }, {
    key: "root",
    get: function get() {
      return store.get(this).get(BreadthFirstTree_sroot);
    }
  }]);

  return BreadthFirstTree;
}();


// CONCATENATED MODULE: ./lib/graph/HyperGraph.js


function HyperGraph_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { HyperGraph_typeof = function _typeof(obj) { return typeof obj; }; } else { HyperGraph_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return HyperGraph_typeof(obj); }

function HyperGraph_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function HyperGraph_possibleConstructorReturn(self, call) { if (call && (HyperGraph_typeof(call) === "object" || typeof call === "function")) { return call; } return HyperGraph_assertThisInitialized(self); }

function HyperGraph_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function HyperGraph_getPrototypeOf(o) { HyperGraph_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return HyperGraph_getPrototypeOf(o); }

function HyperGraph_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) HyperGraph_setPrototypeOf(subClass, superClass); }

function HyperGraph_setPrototypeOf(o, p) { HyperGraph_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return HyperGraph_setPrototypeOf(o, p); }



var HyperGraph =
/*#__PURE__*/
function (_Graph) {
  HyperGraph_inherits(HyperGraph, _Graph);

  function HyperGraph() {
    HyperGraph_classCallCheck(this, HyperGraph);

    return HyperGraph_possibleConstructorReturn(this, HyperGraph_getPrototypeOf(HyperGraph).call(this, {
      allows: 7
    }));
  }

  return HyperGraph;
}(Graph_Graph);


// CONCATENATED MODULE: ./lib/index.js
/* concated harmony reexport bound */__webpack_require__.d(__webpack_exports__, "bound", function() { return bound; });
/* concated harmony reexport final */__webpack_require__.d(__webpack_exports__, "final", function() { return decorators_final; });
/* concated harmony reexport frozen */__webpack_require__.d(__webpack_exports__, "frozen", function() { return decorators_frozen; });
/* concated harmony reexport cancelAnimationFrames */__webpack_require__.d(__webpack_exports__, "cancelAnimationFrames", function() { return cancelAnimationFrames; });
/* concated harmony reexport Cookie */__webpack_require__.d(__webpack_exports__, "Cookie", function() { return Cookie_Cookie; });
/* concated harmony reexport CookieSync */__webpack_require__.d(__webpack_exports__, "CookieSync", function() { return Cookie_Sync; });
/* concated harmony reexport CSSConditionalRule */__webpack_require__.d(__webpack_exports__, "CSSConditionalRule", function() { return CSSConditionalRule_CSSConditionalRule; });
/* concated harmony reexport CSSHook */__webpack_require__.d(__webpack_exports__, "CSSHook", function() { return CSSHook_CSSHook; });
/* concated harmony reexport CSSMediaRule */__webpack_require__.d(__webpack_exports__, "CSSMediaRule", function() { return CSSMediaRule_CSSMediaRule; });
/* concated harmony reexport CSSRule */__webpack_require__.d(__webpack_exports__, "CSSRule", function() { return CSSRule_CSSRule; });
/* concated harmony reexport CSSRuleTextUpdate */__webpack_require__.d(__webpack_exports__, "CSSRuleTextUpdate", function() { return TextUpdate; });
/* concated harmony reexport CSSRuleSelectorUpdate */__webpack_require__.d(__webpack_exports__, "CSSRuleSelectorUpdate", function() { return SelectorUpdate; });
/* concated harmony reexport CSSRuleReset */__webpack_require__.d(__webpack_exports__, "CSSRuleReset", function() { return Reset; });
/* concated harmony reexport domready */__webpack_require__.d(__webpack_exports__, "domready", function() { return domready; });
/* concated harmony reexport dummy */__webpack_require__.d(__webpack_exports__, "dummy", function() { return utils_dummy; });
/* concated harmony reexport Event */__webpack_require__.d(__webpack_exports__, "Event", function() { return Event_Event; });
/* concated harmony reexport EventDispatcher */__webpack_require__.d(__webpack_exports__, "EventDispatcher", function() { return EventDispatcher_EventDispatcher; });
/* concated harmony reexport EventTarget */__webpack_require__.d(__webpack_exports__, "EventTarget", function() { return EventTarget_EventTarget; });
/* concated harmony reexport isNative */__webpack_require__.d(__webpack_exports__, "isNative", function() { return isNative; });
/* concated harmony reexport isSameDomain */__webpack_require__.d(__webpack_exports__, "isSameDomain", function() { return isSameDomain; });
/* concated harmony reexport Model */__webpack_require__.d(__webpack_exports__, "Model", function() { return Model_Model; });
/* concated harmony reexport Node */__webpack_require__.d(__webpack_exports__, "Node", function() { return Node_Node; });
/* concated harmony reexport ReadyStateFul */__webpack_require__.d(__webpack_exports__, "ReadyStateFul", function() { return ReadyStateFul_ReadyStateFul; });
/* concated harmony reexport ReadyStateChange */__webpack_require__.d(__webpack_exports__, "ReadyStateChange", function() { return ReadyStateFul_ReadyStateChange; });
/* concated harmony reexport requestAnimationFrames */__webpack_require__.d(__webpack_exports__, "requestAnimationFrames", function() { return requestAnimationFrames; });
/* concated harmony reexport Route */__webpack_require__.d(__webpack_exports__, "Route", function() { return Route_Route; });
/* concated harmony reexport RouteDispatcher */__webpack_require__.d(__webpack_exports__, "RouteDispatcher", function() { return RouteDispatcher_RouteDispatcher; });
/* concated harmony reexport Router */__webpack_require__.d(__webpack_exports__, "Router", function() { return Router_Router; });
/* concated harmony reexport Serializer */__webpack_require__.d(__webpack_exports__, "Serializer", function() { return Serializer_Serializer; });
/* concated harmony reexport singleton */__webpack_require__.d(__webpack_exports__, "singleton", function() { return utils_singleton; });
/* concated harmony reexport Stylesheet */__webpack_require__.d(__webpack_exports__, "Stylesheet", function() { return Stylesheet_Stylesheet; });
/* concated harmony reexport store */__webpack_require__.d(__webpack_exports__, "store", function() { return store; });
/* concated harmony reexport trait */__webpack_require__.d(__webpack_exports__, "trait", function() { return trait; });
/* concated harmony reexport toType */__webpack_require__.d(__webpack_exports__, "toType", function() { return toType; });
/* concated harmony reexport UID */__webpack_require__.d(__webpack_exports__, "UID", function() { return UID_UID; });
/* concated harmony reexport View */__webpack_require__.d(__webpack_exports__, "View", function() { return View_View; });
/* concated harmony reexport expression */__webpack_require__.d(__webpack_exports__, "expression", function() { return View_expression; });
/* concated harmony reexport ZParser */__webpack_require__.d(__webpack_exports__, "ZParser", function() { return ZParser_Parser; });
/* concated harmony reexport BreadthFirstTree */__webpack_require__.d(__webpack_exports__, "BreadthFirstTree", function() { return BreadthFirstTree_BreadthFirstTree; });
/* concated harmony reexport DepthFirstTree */__webpack_require__.d(__webpack_exports__, "DepthFirstTree", function() { return DepthFirstTree_DepthFirstTree; });
/* concated harmony reexport Edge */__webpack_require__.d(__webpack_exports__, "Edge", function() { return Edge_Edge; });
/* concated harmony reexport Graph */__webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph_Graph; });
/* concated harmony reexport HyperGraph */__webpack_require__.d(__webpack_exports__, "HyperGraph", function() { return HyperGraph; });
/* concated harmony reexport Traversal */__webpack_require__.d(__webpack_exports__, "Traversal", function() { return Traversal_Traversal; });
/* concated harmony reexport Vertex */__webpack_require__.d(__webpack_exports__, "Vertex", function() { return Vertex_Vertex; });
































































 // graph















/* harmony default export */ var lib = __webpack_exports__["default"] = ("".concat("seithr", "@").concat("0.2.0"));

/***/ })
/******/ ]);
//# sourceMappingURL=seithr.js.map