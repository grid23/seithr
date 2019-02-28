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


/* harmony default export */ var bound = (({
  kind,
  key,
  placement,
  descriptor
}) => {
  if (kind !== "method") return {
    kind,
    key,
    placement,
    descriptor
  };
  if (descriptor.value) return {
    kind,
    key,
    placement,
    descriptor,
    extras: [{
      kind: "field",
      key,
      placement: "own",
      descriptor: { ...descriptor,
        value: undefined
      },

      initializer() {
        return descriptor.value.bind(this);
      }

    }]
  };else if (descriptor.get) return {
    kind,
    key,
    placement,
    descriptor: { ...descriptor,

      get() {
        return descriptor.get.call(this);
      }

    }
  };
});
// CONCATENATED MODULE: ./lib/decorators/final.js


/* harmony default export */ var decorators_final = (({
  kind,
  key,
  placement,
  descriptor
}) => {
  return {
    kind,
    key,
    placement,
    descriptor: { ...descriptor,
      configurable: false
    }
  };
});
// CONCATENATED MODULE: ./lib/decorators/frozen.js


const frozen = (deep, {
  descriptor,
  key,
  kind,
  placement,
  initializer
}) => {
  if (kind !== "field") return {
    descriptor,
    key,
    kind,
    placement,
    initializer //TODO deep support :D

  };
  return {
    key,
    kind,
    placement,
    descriptor: {
      configurable: false,
      enumerable: descriptor.enumerable,
      writable: false
    },
    initializer: function () {
      return () => Object.freeze(initializer());
    }()
  };
};

/* harmony default export */ var decorators_frozen = ((...args) => {
  if (typeof args[0] === "boolean") return (...args) => frozen(true, ...args);else return frozen(false, ...args);
});
// CONCATENATED MODULE: ./lib/decorators/index.js








// CONCATENATED MODULE: ./lib/store.js


/* harmony default export */ var store = (new WeakMap());
// CONCATENATED MODULE: ./lib/utils/cancelAnimationFrames.js



/* harmony default export */ var cancelAnimationFrames = (generatorFn => {
  if (store.has(generatorFn)) store.set(generatorFn, false);
});
// CONCATENATED MODULE: ./lib/errors.js


const ERR_EVENT_NOT_IMPLEMENTED = "ERR_EVENT_NOT_IMPLEMENTED";
const ERR_EVENT_TARGET_IS_NOT_VALID = "ERR_EVENT_TARGET_IS_NOT_VALID";
const ERR_CANNOT_BE_REUSED = "ERR_CANNOT_BE_REUSED";
const ERR_CSSTEXT = "ERR_CSSTEXT";
const errors_ERR_FN_EXPECTED = "function expected";
const ERR_GENERATOR_EXPECTED = "ERR_GENERATOR_EXPECTED";
const ERR_INVALID_TARGET = "ERR_INVALID_TARGET";
const ERR_NODE_NOT_CHILD = "ERR_NODE_NOT_CHILD";
const ERR_NODE_NOT_IMPLEMENTED = "ERR_NODE_NOT_IMPLEMENTED";
const ERR_READYSTATEFUL_NOT_IMPLEMENTED = "ERR_READYSTATEFUL_NOT_IMPLEMENTED";
const ERR_SAME_OBJ = "ERR_SAME_OBJ";
const ERR_ILLEGAL_CONSTRUCTOR = "ERR_ILLEGAL_CONSTRUCTOR";
const ERR_INVALID_DATA = "ERR_INVALID_DATA";
const ERR_TYPE_UNKNOWN = "ERR_TYPE_UNKNOWN";
const ERR_NOT_ITERABLE = "ERR_NOT_ITERABLE";
const ERR_NOT_A_NODE = "ERR_NOT_A_NODE";
const ERR_RHANDLER = "not a valid route handler";
const ERR_ROUTE_BUSY = "route has already been used";
const ERR_NOTROUTE = "not a valid route object";
const ERR_SS_NOT_WRITABLE = "ERR_SS_NOT_WRITABLE";
const errors_ERR_STRING_EXPECTED = "ERR_STRING_EXPECTED";
const WARN_LATE_NEXT = "WARN_LATE_NEXT"; // graph

const EALRDYCONN = "edge is already connected to a graph";
const EINVALIDCONS = "invalid constructor";
const ENOTEDGE = "object does not implement Edge";
const ENOTGRAPH = "object does not implement Graph";
const ENOTINSET = "object does not belong to the set";
const ENOTVERTEX = "object does not implement Vertex";
const EPRLLLNOTALLOW = "graph doesn't allow parallel edges";
const errors_ETOOMANYVERT = "edges cannot hold more vertices";
const EUNCOMPEDGE = "edge type is not allowed by this graph";
const EUNKNWNREL = "relation is unknown";
// CONCATENATED MODULE: ./lib/events/Event.js


function _decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { _initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = _decorateClass(_coalesceClassElements(r.d.map(_createElementDescriptor)), decorators); _initializeClassElements(r.F, decorated.elements); return _runClassFinishers(r.F, decorated.finishers); }

function _createElementDescriptor(def) { var key = _toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function _coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function _coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (_isDataDescriptor(element.descriptor) || _isDataDescriptor(other.descriptor)) { if (_hasDecorators(element) || _hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (_hasDecorators(element)) { if (_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } _coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function _hasDecorators(element) { return element.decorators && element.decorators.length; }

function _isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function _initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; _defineClassElement(receiver, element); } }); }); }

function _initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { _defineClassElement(O, element); } }); }); }

function _defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function _decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { _addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = _decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = _decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function _addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function _decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = _fromElementDescriptor(element); var elementFinisherExtras = _toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; _addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { _addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function _decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = _fromClassDescriptor(elements); var elementsAndFinisher = _toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function _fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function _toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return _toArray(elementObjects).map(function (elementObject) { var element = _toElementDescriptor(elementObject); _disallowProperty(elementObject, "finisher", "An element descriptor"); _disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function _toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = _toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; _disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { _disallowProperty(elementObject, "initializer", "A method descriptor"); } else { _disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); _disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function _toElementFinisherExtras(elementObject) { var element = _toElementDescriptor(elementObject); var finisher = _optionalCallableProperty(elementObject, "finisher"); var extras = _toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function _fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function _toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } _disallowProperty(obj, "key", "A class descriptor"); _disallowProperty(obj, "placement", "A class descriptor"); _disallowProperty(obj, "descriptor", "A class descriptor"); _disallowProperty(obj, "initializer", "A class descriptor"); _disallowProperty(obj, "extras", "A class descriptor"); var finisher = _optionalCallableProperty(obj, "finisher"); var elements = _toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function _disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function _optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function _runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




const sdetail = new Object(Symbol("detail"));
const sevent = new Object(Symbol(""));
const sondom = new Object(Symbol());
const soriginaltarget = new Object(Symbol());
const sphase = new Object(Symbol());

let Event_Event = _decorate(null, function (_initialize) {
  class Event {
    // static from(event){
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
    constructor(type, {
      bubbles = true,
      cancelable = true,
      composed = false,
      detail = null
    } = {}) {
      _initialize(this);

      const event = document.createEvent("Event");
      event.initEvent(type, bubbles, cancelable);
      store.set(this, new WeakMap());
      store.get(this).set(sdetail, Object.seal(detail));
      store.get(this).set(sevent, event);
      store.set(event, this); // x-reference
    }

  }

  return {
    F: Event,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "NONE",

      value() {
        return window.Event.NONE;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "CAPTURING_PHASE",

      value() {
        return window.Event.CAPTURING_PHASE;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "AT_TARGET",

      value() {
        return window.Event.AT_TARGET;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "BUBBLING_PHASE",

      value() {
        return window.Event.BUBBLING_PHASE;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "BROADCAST_PHASE",

      value() {
        return window.Event.BUBBLING_PHASE + 1;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "originalEvent",

      value() {
        return store.get(this).get(sevent);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "bubbles",

      value() {
        return this.originalEvent.bubbles;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "cancelable",

      value() {
        return this.originalEvent.cancelable;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "currentTarget",

      value() {
        const domnode = this.originalEvent.currentTarget;
        return store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "deepPath",

      value() {
        const dompath = this.originalEvent.deepPath;
        return !dompath ? dompath : store.get(this).get(sondom) ? dompath.map(node => store.get(node)) : dompath;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "defaultPrevented",

      value() {
        return this.originalEvent.defaultPrevented;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "detail",

      value() {
        return store.get(this).get(sdetail) || (this.originalEvent.detail ? this.originalEvent.detail : null);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "eventPhase",

      value() {
        return store.get(this).get(sphase) || this.originalEvent.eventPhase;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "explicitOriginalTarget",

      value() {
        return this.originalTarget;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "originalTarget",

      value() {
        const domnode = this.originalEvent.originalTarget;
        return store.get(this).has(soriginaltarget) ? store.get(this).get(soriginaltarget) : store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "relatedTarget",

      value() {
        const domnode = this.originalEvent.relatedTarget;
        return store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "target",

      value() {
        const domnode = this.originalEvent.target;
        return store.get(this).get(sondom) ? store.get(domnode) : domnode;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "type",

      value() {
        return this.originalEvent.type;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "preventDefault",

      value() {
        return this.originalEvent.preventDefault();
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "stop",

      value() {
        return this.originalEvent.stopPropagation();
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "stopImmediate",

      value() {
        return this.originalEvent.stopImmediatePropagation();
      }

    }]
  };
});


// CONCATENATED MODULE: ./lib/models/ModelChange.js





class ModelChange_ModelChange extends Event_Event {
  static get TYPE() {
    return "model:change";
  }

  constructor(path) {
    super(ModelChange_ModelChange.TYPE, {
      bubbles: false
    });
    store.get(this).set(Model_Model, path);
  }

  get path() {
    return store.get(this).get(Model_Model);
  }

  get toString() {
    return this.path.join(".");
  }

}
// CONCATENATED MODULE: ./lib/env.js


const BUBBLES = (() => {
  let bubbles = false;
  const a = document.createElement("div");
  const b = a.appendChild(document.createElement("div"));
  a.addEventListener("bubblestest", e => bubbles = true);
  const e = document.createEvent("Event");
  e.initEvent("bubblestest", true, true);
  b.dispatchEvent(e);
  return bubbles;
})();
// CONCATENATED MODULE: ./lib/utils/dummy.js


/* harmony default export */ var utils_dummy = (() => document.createElement("div"));
// CONCATENATED MODULE: ./lib/events/EventDispatcher.js


function EventDispatcher_decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { EventDispatcher_initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = EventDispatcher_decorateClass(EventDispatcher_coalesceClassElements(r.d.map(EventDispatcher_createElementDescriptor)), decorators); EventDispatcher_initializeClassElements(r.F, decorated.elements); return EventDispatcher_runClassFinishers(r.F, decorated.finishers); }

function EventDispatcher_createElementDescriptor(def) { var key = EventDispatcher_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function EventDispatcher_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function EventDispatcher_coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (EventDispatcher_isDataDescriptor(element.descriptor) || EventDispatcher_isDataDescriptor(other.descriptor)) { if (EventDispatcher_hasDecorators(element) || EventDispatcher_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (EventDispatcher_hasDecorators(element)) { if (EventDispatcher_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } EventDispatcher_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function EventDispatcher_hasDecorators(element) { return element.decorators && element.decorators.length; }

function EventDispatcher_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function EventDispatcher_initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; EventDispatcher_defineClassElement(receiver, element); } }); }); }

function EventDispatcher_initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { EventDispatcher_defineClassElement(O, element); } }); }); }

function EventDispatcher_defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function EventDispatcher_decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { EventDispatcher_addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!EventDispatcher_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = EventDispatcher_decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = EventDispatcher_decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function EventDispatcher_addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function EventDispatcher_decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = EventDispatcher_fromElementDescriptor(element); var elementFinisherExtras = EventDispatcher_toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; EventDispatcher_addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { EventDispatcher_addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function EventDispatcher_decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = EventDispatcher_fromClassDescriptor(elements); var elementsAndFinisher = EventDispatcher_toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function EventDispatcher_fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function EventDispatcher_toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return EventDispatcher_toArray(elementObjects).map(function (elementObject) { var element = EventDispatcher_toElementDescriptor(elementObject); EventDispatcher_disallowProperty(elementObject, "finisher", "An element descriptor"); EventDispatcher_disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function EventDispatcher_toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = EventDispatcher_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; EventDispatcher_disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { EventDispatcher_disallowProperty(elementObject, "initializer", "A method descriptor"); } else { EventDispatcher_disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); EventDispatcher_disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); EventDispatcher_disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function EventDispatcher_toElementFinisherExtras(elementObject) { var element = EventDispatcher_toElementDescriptor(elementObject); var finisher = EventDispatcher_optionalCallableProperty(elementObject, "finisher"); var extras = EventDispatcher_toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function EventDispatcher_fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(EventDispatcher_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function EventDispatcher_toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } EventDispatcher_disallowProperty(obj, "key", "A class descriptor"); EventDispatcher_disallowProperty(obj, "placement", "A class descriptor"); EventDispatcher_disallowProperty(obj, "descriptor", "A class descriptor"); EventDispatcher_disallowProperty(obj, "initializer", "A class descriptor"); EventDispatcher_disallowProperty(obj, "extras", "A class descriptor"); var finisher = EventDispatcher_optionalCallableProperty(obj, "finisher"); var elements = EventDispatcher_toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function EventDispatcher_disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function EventDispatcher_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function EventDispatcher_runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function EventDispatcher_toPropertyKey(arg) { var key = EventDispatcher_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function EventDispatcher_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function EventDispatcher_toArray(arr) { return EventDispatcher_arrayWithHoles(arr) || EventDispatcher_iterableToArray(arr) || EventDispatcher_nonIterableRest(); }

function EventDispatcher_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function EventDispatcher_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function EventDispatcher_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }









let EventDispatcher_EventDispatcher = EventDispatcher_decorate(null, function (_initialize) {
  class EventDispatcher {
    constructor() {
      _initialize(this);

      store.set(this, new WeakMap());
    }

  }

  return {
    F: EventDispatcher,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "BUBBLES",

      value() {
        return BUBBLES;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "broadcast",

      value(event, targets) {
        return this.dispatch(event, targets, true);
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "dispatch",

      value(event, {
        target,
        relatedTarget,
        originalTarget
      } = {}, broadcast = false) {
        if (!(event instanceof Event_Event) && !(event instanceof window.Event) || !store.has(event)) throw new Error(ERR_EVENT_NOT_IMPLEMENTED);
        relatedTarget && store.get(event).set(srelatedtarget, relatedTarget);
        originalTarget && store.get(event).set(soriginaltarget, originalTarget || target);

        if (target instanceof window.Node) {
          store.get(event).set(sondom, false);
          return target.dispatchEvent(store.get(event).get(event.originalEvent));
        }

        if (!store.has(target)) throw new Error(ERR_EVENT_TARGET_IS_NOT_VALID);
        store.get(event).set(sondom, true);

        if (!BUBBLES) {
          const root = store.get(store.get(target).rootNode).get(sdummy);
          if (!document.head.contains(root)) document.head.appendChild(root);
        }

        const r_value = store.get(target).get(sdummy).dispatchEvent(event.originalEvent);

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








const sbroadcastChannel = new Object(Symbol("broadcastchannel"));
const sdummy = new Object(Symbol("dummy"));
store.set(sbroadcastChannel, utils_dummy());
class EventTarget_EventTarget {
  constructor() {
    store.set(this, new WeakMap());
    store.get(this).set(sdummy, utils_dummy());
    store.set(store.get(this).get(sdummy), this); //cross-reference
  }

  addBroadcastListener(...args) {
    const nhandler = args[1];

    const handler = function (e) {
      if (store.has(e)) e = store.get(e);
      return nhandler(e);
    };

    store.set(args[1], handler);
    return store.get(sbroadcastChannel).addEventListener(args[0], handler, ...args.slice(2));
  }

  addEventListener(...args) {
    const nhandler = args[1];

    const handler = function (e) {
      if (store.has(e)) e = store.get(e);
      return nhandler(e);
    };

    store.set(args[1], handler);
    return store.get(this).get(sdummy).addEventListener(args[0], handler, ...args.slice(2));
  }

  broadcastEvent(event, {
    relatedTarget,
    originalTarget
  } = {}) {
    return this.dispatchEvent(event, {
      target: store.get(sbroadcastChannel),
      relatedTarget,
      originalTarget: this
    }, true);
  }

  dispatchEvent(event, {
    relatedTarget,
    originalTarget
  } = {}, broadcast = false) {
    if (event && event.eventPhase > Event_Event.NONE || event instanceof window.Event && !(event instanceof Event_Event)) event = Event_Event.from(event);
    return new EventDispatcher_EventDispatcher().dispatch(event, {
      target: this,
      relatedTarget,
      originalTarget
    }, broadcast);
  }

  removeBroadcastListener(...args) {
    const nhandler = args[1];
    const handler = store.get(nhandler);
    return store.get(sbroadcastChannel).removeEventListener(args[0], handler, ...args.slice(2));
  }

  removeEventListener(...args) {
    const nhandler = args[1];
    const handler = store.get(nhandler);
    return store.get(this).get(sdummy).removeEventListener(args[0], handler, ...args.slice(2));
  }

}
// CONCATENATED MODULE: ./lib/utils/isNative.js


const known_exceptions = ["[object CSSMediaRule]"];
const rnative = /\s*\[native code\]\s*/i;
/* harmony default export */ var isNative = (fn => {
  try {
    const toString = fn.toString() || "";
    return typeof fn == "function" ? !!toString.match(rnative) : known_exceptions.indexOf(toString) > -1 ? true : false;
  } catch (e) {
    return null;
  }
});
// CONCATENATED MODULE: ./lib/utils/toType.js



/* harmony default export */ var toType = (o => {
  if (Array.isArray(o)) return "array";
  const ntype = typeof o;
  return ntype !== "object" ? o === o ? ntype : "nan" : o && o.constructor && isNative(o.next) ? "generator" : o && o.constructor && !isNative(o.constructor) ? "instance" : o && typeof o.prototype == "function" ? "function" : o && typeof o.constructor == Map ? "map" : o && typeof o.constructor == WeakMap ? "weakmap" : o && typeof o.constructor == Set ? "set" : o && typeof o.constructor == WeakSet ? "weakset" : Reflect.apply(Object.prototype.toString, o, []).slice(8, -1).toLowerCase();
});
// CONCATENATED MODULE: ./lib/uids/UID.js


function UID_decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { UID_initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = UID_decorateClass(UID_coalesceClassElements(r.d.map(UID_createElementDescriptor)), decorators); UID_initializeClassElements(r.F, decorated.elements); return UID_runClassFinishers(r.F, decorated.finishers); }

function UID_createElementDescriptor(def) { var key = UID_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function UID_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function UID_coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (UID_isDataDescriptor(element.descriptor) || UID_isDataDescriptor(other.descriptor)) { if (UID_hasDecorators(element) || UID_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (UID_hasDecorators(element)) { if (UID_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } UID_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function UID_hasDecorators(element) { return element.decorators && element.decorators.length; }

function UID_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function UID_initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; UID_defineClassElement(receiver, element); } }); }); }

function UID_initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { UID_defineClassElement(O, element); } }); }); }

function UID_defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function UID_decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { UID_addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!UID_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = UID_decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = UID_decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function UID_addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function UID_decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = UID_fromElementDescriptor(element); var elementFinisherExtras = UID_toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; UID_addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { UID_addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function UID_decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = UID_fromClassDescriptor(elements); var elementsAndFinisher = UID_toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function UID_fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function UID_toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return UID_toArray(elementObjects).map(function (elementObject) { var element = UID_toElementDescriptor(elementObject); UID_disallowProperty(elementObject, "finisher", "An element descriptor"); UID_disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function UID_toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = UID_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; UID_disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { UID_disallowProperty(elementObject, "initializer", "A method descriptor"); } else { UID_disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); UID_disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); UID_disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function UID_toElementFinisherExtras(elementObject) { var element = UID_toElementDescriptor(elementObject); var finisher = UID_optionalCallableProperty(elementObject, "finisher"); var extras = UID_toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function UID_fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(UID_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function UID_toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } UID_disallowProperty(obj, "key", "A class descriptor"); UID_disallowProperty(obj, "placement", "A class descriptor"); UID_disallowProperty(obj, "descriptor", "A class descriptor"); UID_disallowProperty(obj, "initializer", "A class descriptor"); UID_disallowProperty(obj, "extras", "A class descriptor"); var finisher = UID_optionalCallableProperty(obj, "finisher"); var elements = UID_toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function UID_disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function UID_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function UID_runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function UID_toPropertyKey(arg) { var key = UID_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function UID_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function UID_toArray(arr) { return UID_arrayWithHoles(arr) || UID_iterableToArray(arr) || UID_nonIterableRest(); }

function UID_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function UID_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function UID_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }



const def_chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
const def_map = "Fxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
const def_radix = 16;
const def_regexp = /[xy]/g;
const schars = new Object(Symbol());
const smap = new Object(Symbol());
const sradix = new Object(Symbol());
const sregexp = new Object(Symbol());

let UID_UID = UID_decorate(null, function (_initialize) {
  class UID {
    constructor({
      chars = UID.CHARS,
      map = UID.MAP,
      radix = UID.RADIX,
      regexp = UID.REGEXP
    } = {}) {
      _initialize(this);

      store.set(this, new WeakMap());
      store.get(this).set(schars, chars);
      store.get(this).set(smap, map);
      store.get(this).set(sradix, radix);
      store.get(this).set(sregexp, regexp);
    }

  }

  return {
    F: UID,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "CHARS",

      value() {
        return def_chars;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "MAP",

      value() {
        return def_map;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "RADIX",

      value() {
        return def_radix;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "REGEXP",

      value() {
        return def_regexp;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      static: true,
      key: "uid",

      value({
        chars = UID.CHARS,
        map = UID.MAP,
        radix = UID.RADIX,
        regexp = UID.REGEXP
      } = {}) {
        return new UID({
          chars,
          map,
          radix,
          regexp
        }).generate();
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "chars",

      value() {
        return store.get(this).get(schars);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "map",

      value() {
        return store.get(this).get(smap);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "radix",

      value() {
        return store.get(this).get(sradix);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "regexp",

      value() {
        return store.get(this).get(sregexp);
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "generate",

      value() {
        return this.map.replace(this.regexp, (c, r) => {
          r = (Date.now() + Math.random() * this.radix) % this.radix | 0;
          if (c === "y") r = r & 0x3 | 0x8;
          return this.chars[r];
        });
      }

    }]
  };
});


// CONCATENATED MODULE: ./lib/nodes/Node.js


function Node_decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { Node_initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = Node_decorateClass(Node_coalesceClassElements(r.d.map(Node_createElementDescriptor)), decorators); Node_initializeClassElements(r.F, decorated.elements); return Node_runClassFinishers(r.F, decorated.finishers); }

function Node_createElementDescriptor(def) { var key = Node_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function Node_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function Node_coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (Node_isDataDescriptor(element.descriptor) || Node_isDataDescriptor(other.descriptor)) { if (Node_hasDecorators(element) || Node_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (Node_hasDecorators(element)) { if (Node_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } Node_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function Node_hasDecorators(element) { return element.decorators && element.decorators.length; }

function Node_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function Node_initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; Node_defineClassElement(receiver, element); } }); }); }

function Node_initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { Node_defineClassElement(O, element); } }); }); }

function Node_defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function Node_decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { Node_addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!Node_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = Node_decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = Node_decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function Node_addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function Node_decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = Node_fromElementDescriptor(element); var elementFinisherExtras = Node_toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; Node_addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { Node_addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function Node_decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = Node_fromClassDescriptor(elements); var elementsAndFinisher = Node_toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function Node_fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function Node_toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return Node_toArray(elementObjects).map(function (elementObject) { var element = Node_toElementDescriptor(elementObject); Node_disallowProperty(elementObject, "finisher", "An element descriptor"); Node_disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function Node_toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = Node_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; Node_disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { Node_disallowProperty(elementObject, "initializer", "A method descriptor"); } else { Node_disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); Node_disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); Node_disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function Node_toElementFinisherExtras(elementObject) { var element = Node_toElementDescriptor(elementObject); var finisher = Node_optionalCallableProperty(elementObject, "finisher"); var extras = Node_toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function Node_fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(Node_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function Node_toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } Node_disallowProperty(obj, "key", "A class descriptor"); Node_disallowProperty(obj, "placement", "A class descriptor"); Node_disallowProperty(obj, "descriptor", "A class descriptor"); Node_disallowProperty(obj, "initializer", "A class descriptor"); Node_disallowProperty(obj, "extras", "A class descriptor"); var finisher = Node_optionalCallableProperty(obj, "finisher"); var elements = Node_toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function Node_disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function Node_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function Node_runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function Node_toPropertyKey(arg) { var key = Node_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function Node_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function Node_toArray(arr) { return Node_arrayWithHoles(arr) || Node_iterableToArray(arr) || Node_nonIterableRest(); }

function Node_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Node_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Node_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







const snodename = new Object(Symbol("nodename"));
const snodetype = new Object(Symbol("nodetype"));
const snodevalue = new Object(Symbol("nodevalue"));
const stextnode = new Object(Symbol("textnode"));
const suid = new Object(Symbol("uid"));
let registerIDX = 13;

let Node_Node = Node_decorate(null, function (_initialize, _EventTarget) {
  class Node extends _EventTarget {
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
    constructor({
      name = "",
      type = "OBJECT_NODE",
      value = null
    } = {}) {
      super();

      _initialize(this);

      store.get(this).set(snodename, name && name.toString ? name.toString() : "");
      store.get(this).set(snodetype, typeof Node[type] == "number" ? Node[type] : Node.OBJECT_NODE);
      this.nodeValue = value;
    }

  }

  return {
    F: Node,
    d: [{
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "OBJECT_NODE",

      value() {
        return 13;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      static: true,
      key: "lca",

      value() {
        return Node.leastCommonAncestor;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      static: true,
      key: "leastCommonAncestor",

      value(iterable) {
        if (!iterable[Symbol.iterator]) throw new TypeError(ERR_NOT_ITERABLE);
        const nodes = new Set([...iterable]);
        if (![...nodes].every(node => node instanceof Node)) throw new TypeError(ERR_NOT_A_NODE);
        if (nodes.size == 1) return [...nodes][0];
        const paths = [];
        nodes.forEach(node => {
          const path = [];

          while (node) {
            path.push(node);
            node = node.parentNode;
          }

          paths.push(path);
        });
        let last = null,
            candidates;

        while (candidates = new Set([...paths.map(path => path.pop())].filter(v => !!v)), candidates.size == 1) last = [...candidates][0];

        return last;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      static: true,
      key: "registerType",

      value(type) {
        Object.defineProperty(Node, type, {
          value: ++registerIDX
        });
        return Node[type];
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "childNodes",

      value() {
        const domchildren = [...store.get(this).get(sdummy).childNodes];
        return domchildren && domchildren.map(dummy => store.get(dummy));
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "children",

      value() {
        return this.childNodes;
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "firstChild",

      value() {
        const domnode = store.get(this).get(sdummy).firstChild;
        return domnode && store.get(domnode);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "lastChild",

      value() {
        const domnode = store.get(this).get(sdummy).lastChild;
        return domnode && store.get(domnode);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nextSibling",

      value() {
        const domnode = store.get(this).get(sdummy).nextSibling;
        return domnode && store.get(domnode);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nodeName",

      value() {
        return store.get(this).get(snodename);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nodeType",

      value() {
        return store.get(this).get(snodetype);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "nodeValue",

      value() {
        return store.get(this).get(snodevalue);
      }

    }, {
      kind: "set",
      key: "nodeValue",

      value(v) {
        if (this.nodeValue === null) return; // cannot change a null value //TODO throw error ?

        store.get(this).get(sdummy).setAttribute("type", toType(v));
        if (v != null) store.get(this).get(sdummy).setAttribute("value", v && v.toString && v.toString());else store.get(this).get(sdummy).removeAttribute("value");
        store.get(this).set(snodevalue, v);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "parentNode",

      value() {
        const domnode = store.get(this).get(sdummy).parentNode;
        return domnode && store.get(domnode);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "previousSibling",

      value() {
        const domnode = store.get(this).get(sdummy).previousSibling;
        return domnode && store.get(domnode);
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "rootNode",

      value() {
        return this.getRootNode();
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "siblings",

      value() {
        const domsiblings = store.get(this).get(sdummy).siblings;
        return domsiblings && domsiblings.map(dummy => store.get(dummy));
      }

    }, {
      kind: "get",
      decorators: [decorators_final],
      key: "uid",

      value() {
        if (!store.get(this).has(suid)) store.get(this).set(suid, UID_UID.uid());
        return store.get(this).get(suid);
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "appendChild",

      value(node) {
        const parent = store.get(this).get(sdummy);
        const child = store.get(node).get(sdummy);
        return store.get(parent.appendChild(child));
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "comparePosition",

      value(node) {
        const a = store.get(this).get(sdummy);
        const b = store.get(node).get(sdummy);
        return a.comparePosition(b);
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "contains",

      value(node) {
        const a = store.get(this).get(sdummy);
        const b = store.get(node).get(sdummy);
        return a.contains(b);
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "getRootNode",

      value() {
        let top = store.get(target).get(sdummy);

        while (top.parentNode && store.has(top)) top = top.parentNode;

        return store.get(top);
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "hasChildNodes",

      value() {
        return store.get(this).get(sdummy).hasChildNodes();
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "insertBefore",

      value(node, referenceNode) {
        const parent = store.get(this).get(sdummy);
        const child = store.get(node).get(sdummy);
        const referenceChild = store.get(referenceNode).get(sdummy);
        return store.get(parent.insertBefore(child, referenceChild));
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "isEqualNode",

      value(node) {
        //check if node is an instance of the same class as this
        return node instanceof this.constructor;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "isSameNode",

      value(node) {
        return this === node;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "removeChild",

      value(node) {
        const parent = store.get(this).get(sdummy);
        const child = store.get(node).get(sdummy);
        return store.get(parent.removeChild(child));
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "replaceChild",

      value(node, referenceNode) {
        const parent = store.get(this).get(sdummy);
        const child = store.get(node).get(sdummy);
        const referenceChild = store.get(referenceNode).get(sdummy);
        return store.get(parent.replaceChild(child, referenceChild));
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "valueOf",

      value() {
        return this.nodeValue;
      }

    }]
  };
}, EventTarget_EventTarget);


// CONCATENATED MODULE: ./lib/models/Model.js


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const sdata = new Object(Symbol("data"));
const soverflow = new Object(Symbol("overflow"));
const spath = new Object(Symbol("path"));
const sseal = new Object(Symbol("seal"));
const sstrictseal = new Object(Symbol("strictseal"));
const ssymbol = new Object(Symbol("symbol"));
const starget = new Object(Symbol("target"));
const sproxy = new Object(Symbol("proxy"));

const dispatchUpdate = (model, path) => model.dispatchEvent(new ModelChange_ModelChange(path)); //sync event


const xref = new Map();
const proxies = new WeakMap();
let revocable = null;

const noop = strictlySealed => () => !strictlySealed;

const revocableMeta = (model, target, path, opts = {}) => {
  const traps = {
    get: (target, key) => {
      if (Reflect.apply(Object.prototype.hasOwnProperty, target, [key])) return target[key];
      return revocableMeta(model, target, [...path, key], opts);
    } // TODO make the following compatible with proxy-polyfill
    // , defineProperty:noop(true), deleteProperty:noop(true)
    // , preventExtensions:noop(true)
    ,
    set: noop(true)
  };
  const {
    revoke,
    proxy
  } = Proxy.revocable(Object.create({}, {
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
  }), traps);
  if (revocable) revocable();

  revocable = () => setTimeout(revoke, 4);

  return proxy;
};

const revocableProxy = (model, target, path, opts = {}) => {
  const traps = {
    get: (target, key) => {
      // if the requested property is object like, return a proxy to that object
      if (target[key] instanceof Object && !target[key].hook) return revocableProxy(model, target[key], [...path, key], opts); // if requested property is a function, return the result of that function
      else if (typeof target[key] == "function") return Reflect.apply(target[key], model, []); // if the requested property is primitive value, return the primitive (no proxy)
        else if (Reflect.apply(Object.prototype.hasOwnProperty, target, [key])) return target[key]; // if the current value is object like, and the requested property doesn't exist and the node has a parent
          // push the request to the parent
          else if (target instanceof Object && model.overflow && model.parentNode) try {
              let candidate = model.parentNode.io;

              for (const curr of [...path, key]) candidate = candidate[curr];

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
    set: (target, key, value) => {
      if (opts.hook) {
        if (typeof value !== "function") return false;
        Object.defineProperties(value, {
          toJSON: {
            value: () => undefined
          },
          hook: {
            value: true
          }
        });
      }

      target[key] = value;
      !opts.silent && dispatchUpdate(model, [...path, key]);
      return true; // return true/false depending on success/failure
    }
  };
  if (model.sealed) // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions =
    traps.set = noop(model.strictlySealed);
  const {
    revoke,
    proxy
  } = Proxy.revocable(target, traps);
  proxies.set(proxy, new WeakMap([[starget, target], [sproxy, proxy]]));
  if (revocable) revocable();

  revocable = () => setTimeout(() => {
    proxies.delete(proxy);
    revoke();
  }, 4);

  return proxy;
}; // export const events = {
//     modelchange: ModelChange.TYPE
// }


class Model_Model extends Node_Node {
  static async from() {} // get from a service/ajax call


  static ref(ref) {
    return xref.get(Symbol.for(ref));
  }

  static get io() {
    const {
      proxy,
      revoke
    } = Proxy.revocable({}, {
      get: (target, key) => {
        const model = xref.get(Symbol.for(key));
        return model.io;
      }
    });
    if (revocable) revocable();

    revocable = () => setTimeout(revoke, 4);

    return proxy;
  }

  static unmask(proxy) {
    if (!proxies.has(proxy)) return null;
    return proxies.get(proxy).get(starget);
  }

  constructor({
    ref,
    overflow = true,
    seal = false,
    strictseal = false
  } = {}) {
    // ref can be anything compatible with a map key
    super(); // define a symbol(uid) ( uid comes from seithr.Node
    // save symbol to model link
    // if a ref is passed, save ref to model link

    store.get(this).set(ssymbol, Symbol.for(this.uid));
    store.get(this).set(soverflow, overflow);
    xref.set(this.valueOf(), this);
    xref.set(store.get(this).get(ssymbol), this);
    if (ref) xref.set(Symbol.for(ref), this);
    store.get(this).set(sdata, null);
    if (seal || strictseal) this.seal(strictseal);
  }

  async fetch() {} //fetch data from a XMLHttpRequest ( Service )


  get hook() {
    if (store.get(this).get(sdata) instanceof Object) return revocableProxy(this, store.get(this).get(sdata), [], {
      hook: true
    });
    return store.get(this).get(sdata);
  }
  /* proxy */


  get io() {
    if (store.get(this).get(sdata) instanceof Object) return revocableProxy(this, store.get(this).get(sdata), []);
    return store.get(this).get(sdata);
  }

  set io(v) {
    store.get(this).set(sdata, v);
    dispatchUpdate(this, []);
  }
  /* proxy */


  get m() {
    return revocableMeta(this, store.get(this).get(sdata), [], {});
  }
  /* proxy */


  get meta() {
    return this.m;
  }
  /* proxy */


  get silentio() {
    return revocableProxy(this, store.get(this).get(sdata), [], {
      silent: true
    });
  }

  set silentio(v) {
    store.get(this).set(sdata, v);
  }

  get overflow() {
    return store.get(this).get(soverflow);
  }

  set overflow(bool) {
    store.get(this).set(soverflow, !!bool);
  }

  seal(strict) {
    store.get(this).set(sseal, true);
    store.get(this).set(sstrictseal, !!strict);
  }

  get sealed() {
    return !!store.get(this).get(sseal);
  }

  get strictlySealed() {
    return this.sealed && !!store.get(this).get(sstrictseal);
  }

  toJSON() {
    return JSON.parse(JSON.stringify(store.get(this).get(sdata)));
  } //prevent access to raw object via toJSON()


  toString() {
    return this.valueOf();
  }

  valueOf() {
    return Symbol.keyFor(store.get(this).get(ssymbol));
  }

}

_defineProperty(Model_Model, "events", {
  change: ModelChange_ModelChange.TYPE,
  modelchange: ModelChange_ModelChange.TYPE // static get events(){ return events }

});
// CONCATENATED MODULE: ./lib/cookies/Cookie.js


function Cookie_decorate(decorators, factory, superClass) { var r = factory(function initialize(O) { Cookie_initializeInstanceElements(O, decorated.elements); }, superClass); var decorated = Cookie_decorateClass(Cookie_coalesceClassElements(r.d.map(Cookie_createElementDescriptor)), decorators); Cookie_initializeClassElements(r.F, decorated.elements); return Cookie_runClassFinishers(r.F, decorated.finishers); }

function Cookie_createElementDescriptor(def) { var key = Cookie_toPropertyKey(def.key); var descriptor; if (def.kind === "method") { descriptor = { value: def.value, writable: true, configurable: true, enumerable: false }; Object.defineProperty(def.value, "name", { value: typeof key === "symbol" ? "" : key, configurable: true }); } else if (def.kind === "get") { descriptor = { get: def.value, configurable: true, enumerable: false }; } else if (def.kind === "set") { descriptor = { set: def.value, configurable: true, enumerable: false }; } else if (def.kind === "field") { descriptor = { configurable: true, writable: true, enumerable: true }; } var element = { kind: def.kind === "field" ? "field" : "method", key: key, placement: def.static ? "static" : def.kind === "field" ? "own" : "prototype", descriptor: descriptor }; if (def.decorators) element.decorators = def.decorators; if (def.kind === "field") element.initializer = def.value; return element; }

function Cookie_coalesceGetterSetter(element, other) { if (element.descriptor.get !== undefined) { other.descriptor.get = element.descriptor.get; } else { other.descriptor.set = element.descriptor.set; } }

function Cookie_coalesceClassElements(elements) { var newElements = []; var isSameElement = function (other) { return other.kind === "method" && other.key === element.key && other.placement === element.placement; }; for (var i = 0; i < elements.length; i++) { var element = elements[i]; var other; if (element.kind === "method" && (other = newElements.find(isSameElement))) { if (Cookie_isDataDescriptor(element.descriptor) || Cookie_isDataDescriptor(other.descriptor)) { if (Cookie_hasDecorators(element) || Cookie_hasDecorators(other)) { throw new ReferenceError("Duplicated methods (" + element.key + ") can't be decorated."); } other.descriptor = element.descriptor; } else { if (Cookie_hasDecorators(element)) { if (Cookie_hasDecorators(other)) { throw new ReferenceError("Decorators can't be placed on different accessors with for " + "the same property (" + element.key + ")."); } other.decorators = element.decorators; } Cookie_coalesceGetterSetter(element, other); } } else { newElements.push(element); } } return newElements; }

function Cookie_hasDecorators(element) { return element.decorators && element.decorators.length; }

function Cookie_isDataDescriptor(desc) { return desc !== undefined && !(desc.value === undefined && desc.writable === undefined); }

function Cookie_initializeClassElements(F, elements) { var proto = F.prototype; ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { var placement = element.placement; if (element.kind === kind && (placement === "static" || placement === "prototype")) { var receiver = placement === "static" ? F : proto; Cookie_defineClassElement(receiver, element); } }); }); }

function Cookie_initializeInstanceElements(O, elements) { ["method", "field"].forEach(function (kind) { elements.forEach(function (element) { if (element.kind === kind && element.placement === "own") { Cookie_defineClassElement(O, element); } }); }); }

function Cookie_defineClassElement(receiver, element) { var descriptor = element.descriptor; if (element.kind === "field") { var initializer = element.initializer; descriptor = { enumerable: descriptor.enumerable, writable: descriptor.writable, configurable: descriptor.configurable, value: initializer === void 0 ? void 0 : initializer.call(receiver) }; } Object.defineProperty(receiver, element.key, descriptor); }

function Cookie_decorateClass(elements, decorators) { var newElements = []; var finishers = []; var placements = { static: [], prototype: [], own: [] }; elements.forEach(function (element) { Cookie_addElementPlacement(element, placements); }); elements.forEach(function (element) { if (!Cookie_hasDecorators(element)) return newElements.push(element); var elementFinishersExtras = Cookie_decorateElement(element, placements); newElements.push(elementFinishersExtras.element); newElements.push.apply(newElements, elementFinishersExtras.extras); finishers.push.apply(finishers, elementFinishersExtras.finishers); }); if (!decorators) { return { elements: newElements, finishers: finishers }; } var result = Cookie_decorateConstructor(newElements, decorators); finishers.push.apply(finishers, result.finishers); result.finishers = finishers; return result; }

function Cookie_addElementPlacement(element, placements, silent) { var keys = placements[element.placement]; if (!silent && keys.indexOf(element.key) !== -1) { throw new TypeError("Duplicated element (" + element.key + ")"); } keys.push(element.key); }

function Cookie_decorateElement(element, placements) { var extras = []; var finishers = []; for (var decorators = element.decorators, i = decorators.length - 1; i >= 0; i--) { var keys = placements[element.placement]; keys.splice(keys.indexOf(element.key), 1); var elementObject = Cookie_fromElementDescriptor(element); var elementFinisherExtras = Cookie_toElementFinisherExtras((0, decorators[i])(elementObject) || elementObject); element = elementFinisherExtras.element; Cookie_addElementPlacement(element, placements); if (elementFinisherExtras.finisher) { finishers.push(elementFinisherExtras.finisher); } var newExtras = elementFinisherExtras.extras; if (newExtras) { for (var j = 0; j < newExtras.length; j++) { Cookie_addElementPlacement(newExtras[j], placements); } extras.push.apply(extras, newExtras); } } return { element: element, finishers: finishers, extras: extras }; }

function Cookie_decorateConstructor(elements, decorators) { var finishers = []; for (var i = decorators.length - 1; i >= 0; i--) { var obj = Cookie_fromClassDescriptor(elements); var elementsAndFinisher = Cookie_toClassDescriptor((0, decorators[i])(obj) || obj); if (elementsAndFinisher.finisher !== undefined) { finishers.push(elementsAndFinisher.finisher); } if (elementsAndFinisher.elements !== undefined) { elements = elementsAndFinisher.elements; for (var j = 0; j < elements.length - 1; j++) { for (var k = j + 1; k < elements.length; k++) { if (elements[j].key === elements[k].key && elements[j].placement === elements[k].placement) { throw new TypeError("Duplicated element (" + elements[j].key + ")"); } } } } } return { elements: elements, finishers: finishers }; }

function Cookie_fromElementDescriptor(element) { var obj = { kind: element.kind, key: element.key, placement: element.placement, descriptor: element.descriptor }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); if (element.kind === "field") obj.initializer = element.initializer; return obj; }

function Cookie_toElementDescriptors(elementObjects) { if (elementObjects === undefined) return; return Cookie_toArray(elementObjects).map(function (elementObject) { var element = Cookie_toElementDescriptor(elementObject); Cookie_disallowProperty(elementObject, "finisher", "An element descriptor"); Cookie_disallowProperty(elementObject, "extras", "An element descriptor"); return element; }); }

function Cookie_toElementDescriptor(elementObject) { var kind = String(elementObject.kind); if (kind !== "method" && kind !== "field") { throw new TypeError('An element descriptor\'s .kind property must be either "method" or' + ' "field", but a decorator created an element descriptor with' + ' .kind "' + kind + '"'); } var key = Cookie_toPropertyKey(elementObject.key); var placement = String(elementObject.placement); if (placement !== "static" && placement !== "prototype" && placement !== "own") { throw new TypeError('An element descriptor\'s .placement property must be one of "static",' + ' "prototype" or "own", but a decorator created an element descriptor' + ' with .placement "' + placement + '"'); } var descriptor = elementObject.descriptor; Cookie_disallowProperty(elementObject, "elements", "An element descriptor"); var element = { kind: kind, key: key, placement: placement, descriptor: Object.assign({}, descriptor) }; if (kind !== "field") { Cookie_disallowProperty(elementObject, "initializer", "A method descriptor"); } else { Cookie_disallowProperty(descriptor, "get", "The property descriptor of a field descriptor"); Cookie_disallowProperty(descriptor, "set", "The property descriptor of a field descriptor"); Cookie_disallowProperty(descriptor, "value", "The property descriptor of a field descriptor"); element.initializer = elementObject.initializer; } return element; }

function Cookie_toElementFinisherExtras(elementObject) { var element = Cookie_toElementDescriptor(elementObject); var finisher = Cookie_optionalCallableProperty(elementObject, "finisher"); var extras = Cookie_toElementDescriptors(elementObject.extras); return { element: element, finisher: finisher, extras: extras }; }

function Cookie_fromClassDescriptor(elements) { var obj = { kind: "class", elements: elements.map(Cookie_fromElementDescriptor) }; var desc = { value: "Descriptor", configurable: true }; Object.defineProperty(obj, Symbol.toStringTag, desc); return obj; }

function Cookie_toClassDescriptor(obj) { var kind = String(obj.kind); if (kind !== "class") { throw new TypeError('A class descriptor\'s .kind property must be "class", but a decorator' + ' created a class descriptor with .kind "' + kind + '"'); } Cookie_disallowProperty(obj, "key", "A class descriptor"); Cookie_disallowProperty(obj, "placement", "A class descriptor"); Cookie_disallowProperty(obj, "descriptor", "A class descriptor"); Cookie_disallowProperty(obj, "initializer", "A class descriptor"); Cookie_disallowProperty(obj, "extras", "A class descriptor"); var finisher = Cookie_optionalCallableProperty(obj, "finisher"); var elements = Cookie_toElementDescriptors(obj.elements); return { elements: elements, finisher: finisher }; }

function Cookie_disallowProperty(obj, name, objectType) { if (obj[name] !== undefined) { throw new TypeError(objectType + " can't have a ." + name + " property."); } }

function Cookie_optionalCallableProperty(obj, name) { var value = obj[name]; if (value !== undefined && typeof value !== "function") { throw new TypeError("Expected '" + name + "' to be a function"); } return value; }

function Cookie_runClassFinishers(constructor, finishers) { for (var i = 0; i < finishers.length; i++) { var newConstructor = (0, finishers[i])(constructor); if (newConstructor !== undefined) { if (typeof newConstructor !== "function") { throw new TypeError("Finishers must return a constructor."); } constructor = newConstructor; } } return constructor; }

function Cookie_toPropertyKey(arg) { var key = Cookie_toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }

function Cookie_toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }

function Cookie_toArray(arr) { return Cookie_arrayWithHoles(arr) || Cookie_iterableToArray(arr) || Cookie_nonIterableRest(); }

function Cookie_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Cookie_iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function Cookie_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }







const sdomain = new Object(Symbol("domain"));
const sexpires = new Object(Symbol("expires"));
const sfrombrowser = new Object(Symbol("frombrowser"));
const Cookie_spath = new Object(Symbol("path"));
const sname = new Object(Symbol("name"));
const ssession = new Object(Symbol("session"));
const LIFESPAN = 15552000000;
const TOP_DOMAIN = (() => {
  const cookiestr = "__seithrtest=testcookie";

  const cookie = domain => {
    document.cookie = cookiestr + "; domain=" + domain;

    if (document.cookie.indexOf(cookiestr) != -1) {
      document.cookie = cookiestr + "; domain=" + domain + "; expires=" + new Date(+new Date() - 1000).toUTCString();
      return true;
    }

    return false;
  };

  const split = location.hostname.split(".");
  let curr = "";
  let i = split.length;
  let hit = false;

  while (i--) if (curr == split.slice(i).join("."), hit = cookie(curr), hit) return curr;
})();
class Cookie_Sync extends Event_Event {
  static get TYPE() {
    return "cookiesync";
  }

  constructor(from_browser = false) {
    super(Cookie_Sync.TYPE);
    store.get(this).set(sfrombrowser, from_browser);
  }

  get source() {
    return store.get(this).get(sfrombrowser) ? "browser" : "model";
  }

}

let Cookie_Cookie = Cookie_decorate(null, function (_initialize, _Model) {
  class Cookie extends _Model {
    constructor({
      name = null,
      path = "/",
      domain = Cookie.TOP_DOMAIN,
      expires,
      maxAge,
      session = false
    } = {}) {
      super();

      _initialize(this);

      if (toType(name) != "string") throw new Error(errors_ERR_STRING_EXPECTED);
      store.get(this).set(sdomain, toType(domain) == "string" ? domain : Cookie.TOP_DOMAIN);
      store.get(this).set(sexpires, !!session ? "" : !isNaN(+new Date(expires)) ? new Date(expires).toUTCString() : new Date(+new Date() + (+maxAge || LIFESPAN)).toUTCString());
      store.get(this).set(sname, name);
      store.get(this).set(Cookie_spath, toType(path) == "string" ? path : "/");
      store.get(this).set(ssession, !!session);
      this.sync(true);
      window.addEventListener("focus", e => this.sync(true));
      this.addEventListener(Model_Model.events.change, () => this.sync(false));
    }

  }

  return {
    F: Cookie,
    d: [{
      kind: "field",
      decorators: [decorators_frozen],
      static: true,
      key: "events",

      value() {
        return {
          sync: Cookie_Sync.TYPE //static get events(){ return { Sync } }

        };
      }

    }, {
      kind: "get",
      static: true,
      key: "COOKIE_ENABLED",

      value() {
        return navigator.cookieEnabled;
      }

    }, {
      kind: "get",
      static: true,
      key: "TOP_DOMAIN",

      value() {
        return TOP_DOMAIN;
      }

    }, {
      kind: "get",
      key: "COOKIE_ENABLED",

      value() {
        return Cookie.COOKIE_ENABLED;
      }

    }, {
      kind: "get",
      key: "TOP_DOMAIN",

      value() {
        return Cookie.TOP_DOMAIN;
      }

    }, {
      kind: "get",
      key: "domain",

      value() {
        return store.get(this).get(sdomain);
      }

    }, {
      kind: "get",
      key: "expires",

      value() {
        return store.get(this).get(sexpires);
      }

    }, {
      kind: "get",
      key: "path",

      value() {
        return store.get(this).get(Cookie_spath);
      }

    }, {
      kind: "get",
      key: "name",

      value() {
        return store.get(this).get(sname);
      }

    }, {
      kind: "get",
      key: "session",

      value() {
        return store.get(this).set(ssession);
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "clear",

      value() {
        this.io = null;
      }

    }, {
      kind: "method",
      decorators: [decorators_final],
      key: "sync",

      value(from_browser = false) {
        if (from_browser) {
          const exists = document.cookie.match(store.get(this).get(sname) + "=([^;]*)");
          let data;

          if (exists) {
            try {
              data = JSON.parse(unescape(exists[1]));
            } catch (e) {
              console.error(e);
              data = {};
            }
          }

          this.io = data;
          this.dispatchEvent(new Cookie_Sync(true));
          return;
        }

        const string = escape(JSON.stringify(this));
        if (string.length) document.cookie = [this.name, "=", string, "; domain=", this.domain, "; path=", this.path, ";", this.session ? "" : "expires=" + this.expires + ";"].join("");else document.cookie = [this.name, "=0; domain=", this.domain, "; path=", this.path, "; expires=", new Date(+new Date() - 1000).toUTCString(), ";"].join("");
        this.dispatchEvent(new Cookie_Sync(false));
        return;
      }

    }]
  };
}, Model_Model);


// CONCATENATED MODULE: ./lib/css/CSSHook.js



const hookedprops = new WeakMap();

const defaulthandler = function (v) {
  return [{
    property: this.property,
    value: v
  }];
};

class CSSHook_CSSHook {
  static getHook(property) {
    if (hookedprops.has(property)) return [...hookedprops.get(property)];else return [{
      transform: defaulthandler.bind({
        property
      })
    }];
  }

  constructor(property, propertyHandler = defaulthandler) {
    if (typeOf(property) !== "string") throw new TypeError(ERR_STRING_EXPECTED);
    if (typeOf(prophandler) !== "function") throw new TypeError(ERR_FN_EXPECTED);
    store.set(this, new WeakMap());
    store.get(this).set(sproperty, property);
    store.get(this).set(sprophandler, propertyHandler);
  }

  get property() {
    return store.get(this).get(sproperty);
  }

  transform(v) {
    return Reflect.apply(store.get(this).get(sprophandler), this, v);
  }

}
// CONCATENATED MODULE: ./lib/serializers/Serializer.js



const def_delimiter = "=";
const def_separator = "&";
const def_key_separator = ".";
const rspacetoplus = /%20/g;
const rplustospace = /\+/g;
const sdelimiter = new Object(Symbol());
const sseparator = new Object(Symbol());
class Serializer_Serializer {
  static objectify(string = "") {
    const object = {};
    const del = this && this.delimiter || def_delimiter;
    const sep = this && this.separator || def_separator;
    void (string.search(sep) != -1 ? string.split(sep) : string.length ? [string] : []).forEach(pair => {
      pair = pair.replace(rplustospace, "%20");
      const idx = pair.indexOf(del);
      const key = unescape(pair.split(del, 1)[0]);
      const value = decodeURIComponent(pair.slice(idx + 1));
      object[key.trim()] = idx != -1 ? value : true;
    });
    return object;
  }

  static serialize(object) {
    const del = this && this.delimiter || def_delimiter;
    const sep = this && this.separator || def_separator;
    return [...Object.keys(object).map(key => `${escape(key)}${del}${encodeURIComponent(object[key])}`)].join(sep).replace(rspacetoplus, "+");
  }

  static stringify(object) {
    const del = this && this.delimiter || def_delimiter;
    const sep = this && this.separator || def_separator;
    return [...Object.keys(object).map(key => `${key}${del}${object[key]}`)].join(sep);
  }

  constructor({
    delimiter = def_delimiter,
    separator = def_separator
  } = {}) {
    store.set(this, new WeakMap());
    store.get(this).set(sdelimiter, delimiter);
    store.get(this).set(sseparator, separator);
  }

  get delimiter() {
    return store.get(this).get(sdelimiter);
  }

  get separator() {
    return store.get(this).get(sseparator);
  }

  objectify(string) {
    return Reflect.apply(Serializer_Serializer.objectify, this, [string]);
  }

  serialize(object) {
    return Reflect.apply(Serializer_Serializer.serialize, this, [object]);
  }

  stringify(object) {
    return Reflect.apply(Serializer_Serializer.stringify, this, [object]);
  }

}
// CONCATENATED MODULE: ./lib/css/CSSRule.js


function CSSRule_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }









const scssrule = new Object(Symbol());
const CSSRule_sproperty = new Object(Symbol());
const CSSRule_sprophandler = new Object(Symbol());
const sselectortext = new Object(Symbol());

class CSSRule_CSSRuleEvent extends Event_Event {
  static get TYPE() {
    return "cssruleevent";
  }

  constructor(type, {
    cssRule,
    from,
    to
  }) {
    super(type || CSSRule_CSSRuleEvent.TYPE);
    store.get(this).set(scssrule, cssRule);
  }

  get cssRule() {
    return store.get(this).get(scssrule);
  }

}

class Reset extends CSSRule_CSSRuleEvent {
  static get TYPE() {
    return "reset";
  }

  constructor({
    cssRule,
    from,
    to
  }) {
    super(Reset.TYPE, {
      cssRule,
      from,
      to
    });
  }

}
class TextUpdate extends CSSRule_CSSRuleEvent {
  static get TYPE() {
    return "textupdate";
  }

  constructor({
    cssRule,
    from,
    to
  }) {
    super(TextUpdate.TYPE, {
      cssRule,
      from,
      to
    });
  }

}
class SelectorUpdate extends CSSRule_CSSRuleEvent {
  static get TYPE() {
    return "selectorupdate";
  }

  constructor({
    cssRule,
    from,
    to
  }) {
    super(SelectorUpdate.TYPE, {
      cssRule,
      from,
      to
    });
  }

}
const rcssparse = /(?:\s|$)*([^{]*)(?:\s|$)*{(.*)}(?:\s|$)*/;
const serializer = new Serializer_Serializer({
  delimiter: ":",
  separator: ";"
});
class CSSRule_CSSRule extends Node_Node {
  static objectifyCssText(string) {
    return serializer.objectify(string);
  }

  static serializeCssText(object) {
    return serializer.stringify(object);
  }

  static hook(property, propertyHandler) {
    return new CSSHook_CSSHook(property, propertyHandler);
  }

  constructor(...args) {
    super();
    let fromstr = false;
    store.get(this).set(sselectortext, args.length > 1 && toType(args[0]) == "string" && isNaN(+args[0]) ? args.shift() : args.length == 1 && toType(args[0]) == "string" ? (fromstr = true, (rcssparse.exec(args[0]) || [])[1] || "") : (fromstr = true, args.shift(), (rcssparse.exec(args[0]) || [])[1] || ""));
    this.cssText = fromstr ? (rcssparse.exec(args.pop()) || [])[2] || "" : toType(args[args.length - 1]) == "string" ? args.pop() : toType(args[args.length - 1]) == "object" ? CSSRule_CSSRule.serializeCssText(args.pop()) : "";
  }

  get cssText() {
    return store.get(this).get(sdummy).style.cssText;
  }

  set cssText(v) {
    const from = store.get(this).get(sdummy).style.cssText;
    store.get(this).get(sdummy).style.cssText = "";
    const props = CSSRule_CSSRule.objectifyCssText(v);
    Object.keys(props).forEach(k => this.setProperty(k, props[k]));
    const to = store.get(this).get(sdummy).style.cssText;
    if (from !== to) this.dispatchEvent(new Reset({
      cssRule: this,
      from,
      to
    }));
  }

  get selectorText() {
    return store.get(this).get(sselectortext);
  }

  set selectorText(to) {
    const from = this.selectorText;
    store.get(this).set(sselectortext, to);
    if (from && from !== "null" && from !== to) this.dispatchEvent(new SelectorUpdate({
      cssRule: this,
      from,
      to
    }));
  }

  getProperty(...args) {
    return Reflect.apply(CSSStyleDeclaration.prototype.getPropertyValue, store.get(this).get(sdummy).style, args);
  }

  setProperty(prop, value) {
    const from = this.getProperty(prop);
    CSSHook_CSSHook.getHook(prop).forEach(({
      transform
    }) => {
      transform(value).forEach(({
        property,
        value
      }) => {
        store.get(this).get(sdummy).style.setProperty(property, value);
        const to = this.getProperty(prop);
        if (from !== to) this.dispatchEvent(new TextUpdate({
          cssRule: this,
          from,
          to
        }));
      });
    });
  }

  toString() {
    return `${this.selectorText}{${this.cssText}}`;
  }

}

CSSRule_defineProperty(CSSRule_CSSRule, "events", {
  reset: Reset.TYPE,
  textupdate: TextUpdate.TYPE,
  SelectorUpdate: SelectorUpdate.TYPE //static get events(){ return { Reset, TextUpdate, SelectorUpdate} }

});
// CONCATENATED MODULE: ./lib/css/CSSConditionalRule.js







const rconditional = /^\@(document|supports|media)([^\{]*)\{(.*)\}/i;
const updaters_text = new WeakMap();
const sactive = new Object(Symbol());
const sadd = new Object(Symbol());
const satsheet = new Object(Symbol());
const sbasecsstext = new Object(Symbol());
const sbufferrules = new Object(Symbol());
const sconditiontext = new Object(Symbol());
const sremove = new Object(Symbol());
const srules = new Object(Symbol());
const ssync = new Object(Symbol());
const stype = new Object(Symbol());
class CSSConditionalRule_CSSConditionalRule extends Node_Node {
  constructor(condition = "") {
    super();
    const atrule = rconditional.exec(condition);
    const type = atrule[1];
    const conditionText = atrule[2];
    const cssText = atrule[3];
    if (!type || !conditionText) throw new TypeError(ERR_CSSTEXT);
    store.set(this, new WeakMap());
    store.get(this).set(stype, type);
    store.get(this).set(sconditiontext, conditionText);
    store.get(this).set(sbasecsstext, cssText.trim());
    store.get(this).set(ssync, false);
    store.get(this).set(srules, []);
    store.get(this).set(sbufferrules, []);
    store.get(this).set(satsheet, []);
    store.get(this).set(sadd, rule => {
      store.get(this).get(satsheet).push(rule);
      store.get(this).set(sactive, true);
      this.insertRule(store.get(this).get(sbufferrules));
    });
    store.get(this).set(sremove, rule => {
      let idx = store.get(this).get(satsheet);
      if (idx !== -1) store.get(this).get(satsheet).splice(idx, 1);
      if (!store.get(this).get(satsheet).length) store.get(this).set(sactive, false);
    });
  }

  get condition() {
    return store.get(this).get(stype);
  }

  get conditionText() {
    return store.get(this).get(sconditiontext);
  }

  get cssText() {
    if (store.get(this).get(sactive)) return store.get(this).get(satsheet)[0].cssText;
    return store.get(this).get(sbasecsstext);
  }

  deleteRule(...args) {
    const rules = args && args[0][Symbol.iterator] ? args.shift() : args.length ? args : [];
    rules.forEach(rule => {
      let is_rule = false;
      let is_conditional = false;
      rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule_CSSConditionalRule ? (is_conditional = true, rule) : null;
      if (!rule) return;

      if (!store.get(this).get(sactive)) {
        let idx;

        while (idx = store.get(this).get(sbufferrules).indexOf(rule), idx !== -1) store.get(this).get(sbufferrules).splice(idx, 1);
      } else {
        if (is_rule) {
          store.get(this).get(satsheet).forEach(cond_rule => {
            let idx = -1;

            while (idx = store.get(this).get(srules).indexOf(rule), idx != -1) cond_rule.deleteRule(idx), store.get(this).get(srules).splice(idx, 1);

            while (idx = store.get(this).buffer_rules.indexOf(rule), idx != -1) store.get(this).get(sbufferrules).splice(idx, 1);
          });
          if (updaters_text.has(rule)) rule.removeEventListener(cssRule.events.textupdate, updaters_text.get(rule)), updaters_text.delete(rule);
        } else if (is_conditional) {
          store.get(this).get(satsheet).forEach(cond_rule => {
            let idx = -1;

            while (idx = store.get(this).get(srules).indexOf(rule), idx != -1) {
              store.get(rule).get(sremove)(cond_rule.cssRules[idx]);
              cond_rule.deleteRule(idx);
              store.get(this).get(srules).splice(idx, 1);
            }

            while (idx = store.get(this).get(sbufferrules).indexOf(rule), idx != -1) store.get(this).get(sbufferrules).splice(idx, 1);
          });
        }
      }
    });
  }

  insertRule(...args) {
    const rules = args && args[0][Symbol.iterator] ? args.shift() : args.length ? args : [];
    rules.forEach(rule => {
      let is_rule = false;
      let is_conditional = false;
      rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule_CSSConditionalRule ? (is_conditional = true, rule) : (is_rule = true, new CSSRule_CSSRule(rule));
      store.get(this).get(sbufferrules).push(rule);

      if (store.get(this).get(sactive)) {
        if (is_rule) {
          let idx = -1;
          store.get(this).get(satsheet).forEach(cond_rule => {
            if (idx == -1) idx = cond_rule.cssRules.length, store.get(this).get(srules)[idx] = rule;
            cond_rule.insertRule(rule.toString(), idx);
          });
          if (!updaters_text.has(rule)) updaters_text.set(rule, ({
            cssRule
          }) => {
            store.get(this).get(satsheet).forEach(cond_rule => {
              let idxs = [];
              store.get(this).get(srules).forEach((rule, idx) => {
                if (rule === cssRule) idxs.push(idx);
              });
              idxs.forEach(idx => cond_rule.cssRules[idx].style.cssText = cssRule.cssText);
            });
          });
          rule.addEventListener(CSSRule_CSSRule.events.textupdate, updaters_text.get(rule));
        } else if (is_conditional) {
          let idx = -1;
          store.get(this).get(satsheet).forEach(cond_rule => {
            if (idx == -1) idx = cond_rule.cssRules.length, store.get(this).get(srules)[idx] = rule;
            cond_rule.insertRule(rule.toString(), idx);
            store.get(rule).get(sadd)(cond_rule.cssRules[idx]);
          });
        }
      }
    });
  }

  toString() {
    return `@${this.condition}${this.conditionText}{${this.cssText}}`;
  }

}
// CONCATENATED MODULE: ./lib/css/CSSMediaRule.js




const CSSMediaRule_rconditional = /^\@media([^\{]*)\{(.*)\}/i;
class CSSMediaRule_CSSMediaRule extends CSSConditionalRule_CSSConditionalRule {
  constructor(condition = "") {
    if (!CSSMediaRule_rconditional.exec(condition)) throw new TypeError(ERR_CSSTEXT);
    super(condition);
  }

}
// CONCATENATED MODULE: ./lib/utils/domready.js


const gather = () => Object.seal({
  nodes: {
    documentElement: document.documentElement,
    head: document.head,
    title: function () {
      const node = document.head.getElementsByTagName("title")[0];
      if (node) return node;
      return document.head.appendChild(document.createElement("title"));
    }(),
    viewport: function () {
      let node = document.head.querySelector("meta[name=viewport]");
      if (node) return node;
      node = document.createElement("meta");
      node.setAttribute("name", "viewport");
      node.setAttribute("content", "");
      return document.head.appendChild(node);
    }(),
    body: document.body
  }
});

const ready = new Promise(resolve => {
  let ready = false;

  const onready = () => {
    if (ready) return;
    if (!document.body) return setTimeout(onready, 4);
    ready = true;
    resolve(gather());
  };

  const isready = () => "interactive, complete".indexOf(document.readyState) != -1 ? (onready(), true) : false;

  if (!isready()) window.addEventListener("DOMContentLoaded", onready, true), window.addEventListener("load", onready, true), document.addEventListener("readystatechange", isready, true);
});
/* harmony default export */ var domready = ((async () => await ready)());
// CONCATENATED MODULE: ./lib/utils/isSameDomain.js


const isSameDomain_dummy = document.createElement("a");
/* harmony default export */ var isSameDomain = (path => {
  isSameDomain_dummy.href = path;
  return isSameDomain_dummy.hostname === location.hostname ? true : !isSameDomain_dummy.hostname ? true // ie/edge doesn't set the hostname if not "necessary"
  : false;
});
// CONCATENATED MODULE: ./lib/utils/ReadyStateFul.js


function ReadyStateFul_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




const sfrom = new Object(Symbol("from"));
const sreadystate = new Object(Symbol("readystate"));
const sto = new Object(Symbol("to"));
class ReadyStateFul_ReadyStateChange extends Event_Event {
  constructor({
    from,
    to
  }) {
    super(ReadyStateFul_ReadyStateChange.type, {
      bubbles: true,
      cancelable: false
    });
    store.get(this).set(sfrom, from);
    store.get(this).set(sto, to);
  }

  get from() {
    return store.get(this).get(sfrom);
  }

  get to() {
    return store.get(this).get(sto);
  }

}

ReadyStateFul_defineProperty(ReadyStateFul_ReadyStateChange, "TYPE", "readystatechange");

class ReadyStateFul_ReadyStateFul {
  static get UNINITIALIZED() {
    return 0b0;
  }

  static get [0b0]() {
    return "UNINITIALIZED";
  }

  static readyStateChange(rsf, to) {
    if (!(rsf instanceof ReadyStateFul_ReadyStateFul)) throw new TypeError(ERR_READYSTATEFUL_NOT_IMPLEMENTED);
    const from = rsf.readyState || ReadyStateFul_ReadyStateFul.UNINITIALIZED;
    store.get(rsf).set(sreadystate, to);
    rsf.dispatchEvent(new ReadyStateFul_ReadyStateChange({
      from,
      to
    }));
  }

  get readyState() {
    return store.get(this).get(sreadystate) || ReadyStateFul_ReadyStateFul.UNINITIALIZED;
  }

}

ReadyStateFul_defineProperty(ReadyStateFul_ReadyStateFul, "events", {
  readystatechange: ReadyStateFul_ReadyStateChange.TYPE
});
// CONCATENATED MODULE: ./lib/utils/requestAnimationFrames.js




/* harmony default export */ var requestAnimationFrames = (async generatorFn => {
  const typeOf = Reflect.apply(Object.prototype.toString, generatorFn, []).slice(8, -1);
  const generator = typeOf === "GeneratorFunction" ? generatorFn() : typeOf === "Generator" ? generatorFn : new TypeError(ERR_GENERATOR_EXPECTED);
  return new Promise(resolve => {
    if (generator instanceof Error) throw generator;
    store.set(generatorFn, true);

    const onframe = () => {
      if (store.get(generatorFn) === false) {
        store.delete(generatorFn);
        return resolve(null);
      }

      const {
        value,
        done
      } = generator.next();
      if (!done) requestAnimationFrame(onframe);else {
        resolve(value);
        store.delete(generatorFn);
      }
    };

    requestAnimationFrame(onframe);
  });
});
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



/* harmony default export */ var utils_singleton = (Class => {
  const Singleton = function () {
    return function (...args) {
      if (store.has(Class)) return store.get(Class);
      const singleton = new Class(...args);
      store.set(Class, singleton);
      return singleton;
    };
  }(Class);

  void [...Object.getOwnPropertyNames(Class), ...Object.getOwnPropertySymbols(Class)].forEach(staticProperty => {
    if ((Object.getOwnPropertyDescriptor(Singleton, staticProperty) || {
      configurable: true
    }).configurable) Object.defineProperty(Singleton, staticProperty, Object.getOwnPropertyDescriptor(Class, staticProperty));
  });
  return Singleton;
});
// CONCATENATED MODULE: ./lib/views/View.js








const sargs = new Object(Symbol("args"));
const sconstructor = new Object(Symbol("constructor"));
const sexpression = new Object(Symbol("expression"));
const sfragment = new Object(Symbol("fragment"));
const sprops = new Object(Symbol("props"));
const ssubviewAsChild = new Object(Symbol("subview_as_child"));
const stemplate = new Object(Symbol("template"));
const View_suid = new Object(Symbol("uid"));
const supdates = new Object(Symbol("updates"));
const xmap = new Map();
let View_revocable = null;

const View_noop = strictlySealed => () => !strictlySealed;

const revocableNodeProxy = (view, target, path, opts = {}) => {
  const traps = {
    get: (target, key) => {
      if (Array.isArray(target[key])) {
        if (opts.all) return [...target[key]];else return target[key][0];
      }

      return undefined;
    } // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions = traps.set =
    // noop(true)

  };
  const {
    revoke,
    proxy
  } = Proxy.revocable(target, traps);
  if (View_revocable) View_revocable();

  View_revocable = () => setTimeout(revoke, 4);

  return proxy;
};

const revocablePropProxy = (view, target, path, opts = {}) => {
  const traps = {
    get: (target, key) => target[key] // TODO make the following compatible with proxy-polyfill
    // traps.defineProperty = traps.deleteProperty =
    // traps.preventExtensions = traps.set =
    // noop(true)

  };
  const {
    revoke,
    proxy
  } = Proxy.revocable(target, traps);
  if (View_revocable) View_revocable();

  View_revocable = () => setTimeout(revoke, 4);

  return proxy;
};

const transformPath = path => path.reduce((acc, step) => {
  if (isNaN(parseFloat(step))) return acc += `.${step}`;else return acc += `["${step}"]`;
}, "");

const View_expression = (parts = ["div"], ...values) => {
  parts = toType(parts) == "array" ? parts : [parts];
  return parts.reduce((acc, current, i) => {
    const value = i < values.length && (() => {
      if (!(values[i] instanceof Object)) return;
    })();

    acc += current;
    if (i < values.length) if (!(values[i] instanceof Object)) return acc += values[i]; // case: inherits from View
    else if (typeof values[i] == "function" && View_View.isPrototypeOf(values[i])) return acc += `|${Reflect.apply(View_View.toString, values[i], [])}|`; // case: describes a view and a set of args
      else if (Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["View"]) && Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["args"])) return acc += `|${Reflect.apply(View_View.toString, values[i].View, [])}:${values[i].args}|`; // case: describes a model and a value path
        else if (Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["model"]) && Reflect.apply(Object.prototype.hasOwnProperty, values[i], ["path"])) return acc += `⌊${transformPath(values[i].path)}∈${values[i].model}⌉`; // default
          else return acc += Reflect.apply(Object.prototype.toString, values[i], []);
    return acc;
  }, "");
};
class View_View extends Node_Node {
  static get expression() {
    return View_expression;
  }

  static expressWith(...args) {
    // generate an entry
    if (!store.has(this)) this.toString();
    const uid = UID_UID.uid();
    store.get(this).get(sargs).set(uid, args);
    return {
      View: this,
      args: uid
    };
  }

  static toString() {
    if (!store.has(this)) store.set(this, new WeakMap()), store.get(this).set(View_suid, Symbol.for(UID_UID.uid())), store.get(this).set(sconstructor, this), store.get(this).set(sargs, new Map());
    xmap.set(store.get(this).get(View_suid), store.get(this));
    return Symbol.keyFor(store.get(this).get(View_suid));
  }

  static get x() {
    return View_expression;
  }

  static get xw() {
    return this.expressWith;
  }

  constructor(...args) {
    super();
    const conf = args[0] instanceof Object ? args[0] : {};
    const {
      expression,
      props,
      subviewAsChild = true
    } = conf;
    store.get(this).set(sprops, {});
    if (props) Object.keys(props).forEach(prop => store.get(this).get(sprops)[prop] = props[prop]);
    store.get(this).set(ssubviewAsChild, !!subviewAsChild);
    store.get(this).set(sexpression, ZParser_Parser.parse(expression || this.template, this));
    store.get(this).set(supdates, store.get(this).get(sexpression).updates.reduce((acc, {
      updaters,
      handler
    }) => (updaters.forEach(updater => {
      if (!acc.has(updater)) acc.set(updater, new Set());
      acc.get(updater).add(handler);
    }), acc), new Map()));
    store.get(this).get(supdates).forEach((handlers, updater) => updater.addEventListener(Model_Model.events.modelchange, () => handlers.forEach(handler => handler()), true));
  }

  get fragment() {
    return store.get(this).get(sexpression).fragment;
  }

  get node() {
    return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], {
      all: false
    });
  }

  get nodes() {
    return revocableNodeProxy(this, store.get(this).get(sexpression).refs, [], {
      all: true
    });
  }

  get props() {
    return revocablePropProxy(this, store.get(this).get(sprops), []);
  }

}
// CONCATENATED MODULE: ./lib/views/ZParser.js





const auto_vars = Object.seal(["A", "INPUT", "SUBMIT", "BUTTON"]);

const CLASS_LIST_COMPAT = (Element.prototype.hasOwnProperty("classList") || HTMLElement.prototype.hasOwnProperty("classList")) && function () {
  // to be compatible, browser must be able to use classlist on a svg element
  try {
    document.createElementNS("http://www.w3.org/2000/svg", "svg").classList.add("x");
    return true;
  } catch (e) {}

  return false;
}(); // const escapeDummy = document.createTextNode("")
// const escapeHTML = string => (escapeDummy.nodeValue = string, escapeDummy.nodeValue)


const evaluate = value => {
  if (typeof value !== "string" || value instanceof String) return value;else if (value === "true") return true;else if (value === "false") return false;else if (value.indexOf(".") == -1) {
    const candidate = parseInt(value);
    if (!isNaN) return candidate;
    return value;
  } else if (value.indexOf(".") != -1) {
    const candidate = parseFloat(value);
    if (!isNaN) return candidate;
    return value;
  } else return value;
};

const setAttributeExceptions = ["muted", "value"];
const namespaces = Object.seal({
  html: "http://www.w3.org/1999/xhtml",
  svg: "http://www.w3.org/2000/svg",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
  xlink: "http://www.w3.org/1999/xlink"
});
const sbuffer = new Object(Symbol("buffer"));
const scontext = new Object(Symbol("context"));
const ZParser_sexpression = new Object(Symbol("expression"));
const ZParser_sfragment = new Object(Symbol("fragment"));
const slength = new Object(Symbol("length"));
const sowner = new Object(Symbol("owner"));
const spile = new Object(Symbol("pile"));
const spointer = new Object(Symbol("pointer"));
const srefs = new Object(Symbol("refs"));
const ZParser_supdates = new Object(Symbol("updates"));
const svars = new Object(Symbol("svars"));
const rextractsvars = /(⌊([^∈]*∈[^∈]*)⌉)/;
const rpathmodel = /(.*)∈(.*)/;

const extractVars = input => {
  const output = [];
  const updaters = new Set();
  let hit;

  while (hit = rextractsvars.exec(input)) {
    const [, match, data] = hit;
    const idx = input.indexOf(match);
    if (idx) output.push(input.slice(0, idx));
    input = input.slice(idx + match.length);
    const [, path, ref] = rpathmodel.exec(data);
    const model = Model_Model.ref(ref);

    if (!model) {
      output.push(match);
      continue;
    }

    updaters.add(model);
    output.push(function (path, model, match) {
      return function () {
        try {
          return new Function("model", "path", `"use strict"; return model.io${path}`)(model, path);
        } catch (e) {
          return match;
        }
      };
    }(path, model, match));
  }

  output.push(input);

  const handler = function (input) {
    return function () {
      return input.reduce((acc, curr) => acc += typeof curr == "function" ? curr() : curr, "");
    };
  }(output);

  return {
    updaters: updaters.size ? [...updaters] : null,
    handler
  };
};

const operators = new Map();
operators.set("@", {
  name: "@",

  handler(captured) {
    this.refs[captured] = this.refs[captured] || [];
    this.refs[captured].push(this.buffer);
  },

  capture() {
    do {
      const {
        done,
        value
      } = this.lookAhead();
      if (done || ZParser_Parser.traversals.has(value) || ZParser_Parser.operators.has(value)) break;
      this.pile += this.next().value;
    } while (true);

    const capture = this.pile.trim();
    this.pile = "";
    return [capture];
  }

});
operators.set("[", {
  name: "[",

  handler(captured) {
    if (this.buffer.nodeType != Node.ELEMENT_NODE) return;
    const idx = captured.search("=");
    let attr = idx == -1 ? captured : captured.split("=")[0];
    let ns;

    if (attr.indexOf(":") != -1) {
      const split = attr.split(":");
      attr = split[1];
      ns = ZParser_Parser.namespaces[split[0].toLowerCase()] || null;
    }

    const {
      updaters,
      handler
    } = idx == -1 ? {
      handler() {
        return true;
      }

    } : extractVars(captured.slice(idx + 1));
    const update = {
      updaters,
      handler: function (node, ns, attr, handler) {
        return function () {
          const value = evaluate(handler());
          if (setAttributeExceptions.indexOf(attr) != -1) node[attr] = value;else if (ns) node.setAttributeNS(ns, attr, value);else node.setAttribute(attr, value);
        };
      }(this.buffer, ns, attr, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },

  capture() {
    let bracket = false;

    do {
      const {
        done,
        value
      } = this.lookAhead();
      if (done) break;

      if (!bracket && value === "]") {
        this.next();
        break;
      }

      if (value === "⌊") bracket = true;
      if (value === "⌉") bracket = false;
      this.pile += this.next().value;
    } while (true);

    const capture = this.pile.trim();
    return [capture];
  }

});
operators.set("#", {
  name: "#",

  handler(captured) {
    if (this.buffer.nodeType != Node.ELEMENT_NODE) return;
    const {
      updaters,
      handler
    } = extractVars(captured);
    const update = {
      updaters,
      handler: function (node, handler) {
        return function () {
          node.setAttribute("id", handler());
        };
      }(this.buffer, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },

  capture() {
    let bracket = false;

    do {
      const {
        done,
        value
      } = this.lookAhead();
      if (done) break;
      if (!bracket && (ZParser_Parser.traversals.has(value) || ZParser_Parser.operators.has(value))) break;
      if (value === "⌊") bracket = true;
      if (value === "⌉") bracket = false;
      this.pile += this.next().value;
    } while (true);

    const capture = this.pile.trim();
    this.pile = "";
    return [capture];
  }

});
operators.set(".", {
  name: ".",

  handler(captured) {
    if (this.buffer.nodeType != Node.ELEMENT_NODE) return;
    const {
      updaters,
      handler
    } = extractVars(captured);
    const update = {
      updaters,
      handler: function (node, handler) {
        const was = [];
        return function () {
          const requested = handler().split(" ");
          const remove = !was.length ? [] : was.reduce((acc, classname) => (requested.indexOf(classname) == -1 && acc.push(classname), acc), []);
          const add = !was.length ? requested : requested.reduce((acc, classname) => (was.indexOf(classname) == -1 && acc.push(classname), acc), []);

          if (CLASS_LIST_COMPAT) {
            remove.forEach(classname => node.classList.remove(classname));
            add.forEach(classname => node.classList.add(classname));
          } else {
            node.setAttribute("class", (node.getAttribute("class") || "").split(" ").filter(classname => remove.indexOf(classname) !== -1).concat(add).join(" "));
          }

          was.splice(0, was.length, ...requested);
        };
      }(this.buffer, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },

  capture() {
    let bracket = false;

    do {
      const {
        done,
        value
      } = this.lookAhead();
      if (done) break;
      if (!bracket) if (ZParser_Parser.traversals.has(value) || ZParser_Parser.operators.has(value)) break;
      if (value === "⌊") bracket = true;
      if (value === "⌉") bracket = false;
      this.pile += this.next().value;
    } while (true);

    const capture = this.pile.trim();
    this.pile = "";
    return [capture];
  }

});
operators.set("{", {
  name: "{",

  handler(captured, {
    safe = true
  } = {}) {
    const node = !safe || this.buffer.nodeType === Node.TEXT_NODE ? this.buffer : this.buffer.appendChild(document.createTextNode(""));
    const {
      updaters,
      handler
    } = extractVars(captured);
    const update = {
      updaters,
      handler: safe ? function (node, handler) {
        return function () {
          node.nodeValue = handler();
        };
      }(node, handler) : function (node, handler) {
        let was = "";
        return function () {
          const textNodes = Reflect.apply(Array.prototype.slice, node.childNodes, []).filter(node => node.nodeType === Node.TEXT_NODE);
          if (textNodes.length) console.warn("unsafe variable will provoke a node.normalize()");
          const onnode = node.textContent;
          const position = !onnode.length ? 0 : was.length ? onnode.length : onnode.indexOf(was);
          const change = handler();
          const to = [...onnode];
          to.splice(position, was.length, ...change);
          node.innerHTML = to.join("");
        };
      }(node, handler)
    };
    if (updaters) this.updates.push(update);
    update.handler();
  },

  capture() {
    const safe = this.lookAhead().value === "{" ? (this.next(), false) : true;
    let remains = safe ? 1 : 2;
    let ignore = 0;

    do {
      const {
        done,
        value
      } = this.lookAhead();
      if (done) break;

      if (value !== "}") {
        const {
          done,
          value
        } = this.next();
        if (value == "{") ignore + 1;
        if (!done) this.pile += value;
      } else if (ignore) {
        ignore -= 1;

        if (ignore) {
          const {
            done,
            value
          } = this.next();
          if (!done) this.pile += value;
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

    const capture = this.pile; //don't trim

    this.pile = "";
    return [capture, {
      safe
    }];
  }

});
operators.set("(", {
  name: "(",

  handler(capture) {
    if (ZParser_Parser.debug) console.log(`OP ( => captured: ${capture}`);
    const {
      fragment,
      refs,
      updates
    } = ZParser_Parser.parse(capture);
    Object.keys(refs).filter(ref => ref !== "root").forEach(ref => this.refs[ref] = this.refs[ref] ? [...this.refs[ref], ...refs[ref]] : [...refs[ref]]);
    this.updates = [...this.updates, ...updates];
    this.buffer = fragment;
  },

  capture() {
    let ignore = 0;

    do {
      const {
        done,
        value
      } = this.lookAhead();
      if (done) break;

      if (value !== ")") {
        const {
          done,
          value
        } = this.next();
        if (value == "(") ignore += 1;
        if (!done) this.pile += value;
      } else {
        if (ignore) {
          ignore -= 1;
          const {
            done,
            value
          } = this.next();
          if (!done) this.pile += value;
        } else {
          this.next();
          break;
        }
      }
    } while (true);

    const capture = this.pile;
    this.pile = "";
    return [capture];
  }

});
operators.set("|", {
  name: "|",

  handler(capture) {
    if (ZParser_Parser.debug) console.log(`OP |, capture: ${capture} => ${xmap.get(Symbol.for(capture))}`);
    const idx = capture.search(":");
    const symbol = Symbol.for(idx == -1 ? capture : capture.split(":")[0]);
    const Constructor = xmap.get(symbol).get(sconstructor);
    const args = idx == -1 ? [] : xmap.get(symbol).get(sargs).get(capture.slice(idx + 1));
    const instance = new Constructor(...args);
    instance.nodes.root.forEach(node => this.context.appendChild(node));
    this.buffer = instance.nodes.root[instance.nodes.root.length - 1];
    if (this.owner instanceof View_View && store.get(this.owner).get(ssubviewAsChild)) this.owner.appendChild(instance);
  },

  capture() {
    do {
      const {
        done,
        value
      } = this.lookAhead();
      if (done) break;

      if (value !== "|") {
        const {
          done,
          value
        } = this.next();
        if (!done) this.pile += value;
      } else {
        this.next();
        break;
      }
    } while (true);

    const capture = this.pile;
    this.pile = "";
    return [capture];
  }

});
const traversals = new Map();
traversals.set(">", {
  name: "child",

  handler() {
    if (ZParser_Parser.debug) console.log("OP >, buffer", this.buffer, "context", this.context);
    this.context.appendChild(this.buffer);
    this.context = this.buffer;
    this.buffer = null;
  }

});
traversals.set("+", {
  name: "siblings",

  handler() {
    this.context.appendChild(this.buffer);
    this.buffer = null;
  }

});
let debug = false;
class ZParser_Parser {
  static get auto_vars() {
    return auto_vars;
  }

  static get debug() {
    return debug;
  }

  static set debug(bool) {
    debug = !!bool;
  }

  static get namespaces() {
    return namespaces;
  }

  static get operators() {
    return operators;
  }

  static get traversals() {
    return traversals;
  } // static escapeHTML(string){
  //     escapeDummy.nodeValue = string
  //     return escapeDummy.nodeValue
  // }


  static parse(expression, owner) {
    return new ZParser_Parser().parse(expression, owner);
  }

  constructor() {
    store.set(this, new WeakMap());
  }

  get buffer() {
    return store.get(this).get(sbuffer);
  }

  set buffer(any) {
    store.get(this).set(sbuffer, any);
  }

  get context() {
    return store.get(this).get(scontext);
  }

  set context(node) {
    store.get(this).set(scontext, node);
  }

  get done() {
    return this.pointer >= this.length;
  }

  get expression() {
    return store.get(this).get(ZParser_sexpression);
  }

  set expression(string) {
    store.get(this).set(ZParser_sexpression, string);
  }

  get fragment() {
    return store.get(this).get(ZParser_sfragment);
  }

  set fragment(fragment) {
    store.get(this).set(ZParser_sfragment, fragment);
  }

  get glyph() {
    if (ZParser_Parser.debug) console.log(`glyph => ${this.expression[this.pointer]} (pointer:${this.pointer}/length:${this.length} done:${this.done})`);
    return this.expression[this.pointer];
  }

  get length() {
    return store.get(this).get(slength);
  }

  set length(int) {
    return store.get(this).set(slength, int | 0);
  }

  get owner() {
    return store.get(this).get(sowner);
  }

  set owner(any) {
    store.get(this).set(sowner, any);
  }

  get pile() {
    return store.get(this).get(spile);
  }

  set pile(string) {
    store.get(this).set(spile, string);
  }

  get pointer() {
    return store.get(this).get(spointer);
  }

  set pointer(uint) {
    store.get(this).set(spointer, uint | 0);
  }

  get refs() {
    return store.get(this).get(srefs);
  }

  set refs(object) {
    store.get(this).set(srefs, object);
  }

  get updates() {
    return store.get(this).get(ZParser_supdates);
  }

  set updates(set) {
    store.get(this).set(ZParser_supdates, set);
  }

  get vars() {
    return store.get(this).get(svars);
  }

  set vars(set) {
    store.get(this).set(svars, set);
  }

  lookAhead() {
    return {
      done: this.pointer + 1 >= this.length,
      value: this.expression[this.pointer + 1]
    };
  }

  next() {
    this.pointer += 1;
    return {
      value: this.glyph,
      done: this.done
    };
  }

  operate(operator) {
    Reflect.apply(ZParser_Parser.operator.get(operator), this, []);
  }

  parse(expression = "", owner) {
    if (ZParser_Parser.debug) console.log(`parse(${expression})`);
    this.expression = [...expression];
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
      if (ZParser_Parser.traversals.has(this.glyph)) {
        const {
          handler
        } = ZParser_Parser.traversals.get(this.glyph);
        this.unpile();
        Reflect.apply(handler, this, []);
      } else if (ZParser_Parser.operators.has(this.glyph)) {
        const {
          capture,
          handler,
          name
        } = ZParser_Parser.operators.get(this.glyph);
        this.unpile({
          handler,
          name
        });
        Reflect.apply(handler, this, Reflect.apply(capture, this, []));
      } else this.pile += this.glyph;
    } while (!this.next().done); // empty pile


    if (this.pile.length) this.unpile(); // last traversal

    Reflect.apply(ZParser_Parser.traversals.get(">").handler, this, []);
    return this;
  }

  unpile({
    handler,
    name
  } = {}) {
    this.pile = this.pile.trim();

    if (!this.buffer) {
      if (!this.pile.length) this.buffer = document.createElement("div");else if (this.pile === "§") this.buffer = document.createTextNode("div");else if (this.pile.indexOf(":") != -1) {
        const split = this.pile.split(":");
        this.buffer = document.createElementNS(ZParser_Parser.namespaces[split[0].toLowerCase()] || ZParser_Parser.namespaces.html, split[1]);
      } else this.buffer = document.createElement(this.pile);
      if (ZParser_Parser.auto_vars.indexOf(this.buffer.nodeName) != -1) Reflect.apply(operators.get("@").handler, this, [this.buffer.nodeName]); // node is root ( direct childNode of fragment )

      if (this.context === this.fragment) Reflect.apply(operators.get("@").handler, this, ["root"]);
    }

    this.pile = "";
  }

}
// CONCATENATED MODULE: ./lib/css/Stylesheet.js














const Stylesheet_suid = new Object(Symbol());
const snode = new Object(Symbol());
const sready = new Object(Symbol());
const Stylesheet_srules = new Object(Symbol());
const ssheet = new Object(Symbol());
const swritable = new Object(Symbol());
const Stylesheet_updaters_text = new WeakMap();
class Stylesheet_Ready extends Event_Event {
  static get TYPE() {
    return "ready";
  }

  constructor(sheet) {
    super(Stylesheet_Ready.TYPE);
    store.get(this).set(ssheet, sheet);
  }

  get sheet() {
    return store.get(this).get(ssheet);
  }

}
class Stylesheet_Stylesheet extends Node_Node {
  static get isLocalFile() {
    return isSameDomain;
  }

  constructor(...args) {
    super();
    const rules = toType(args[args.length - 1]) == "array" ? [].concat(args.pop()) : [];
    const dict = toType(args[args.length - 1]) == "object" ? args.pop() : {
      node: args.pop()
    };
    args = null;
    store.get(this).set(Stylesheet_suid, toType(dict.id) == "string" ? dict.id : UID_UID.uid());
    store.get(this).set(swritable, true);
    store.get(this).set(Stylesheet_srules, []);
    store.get(this).set(snode, function (node) {
      if (node && node.nodeType === window.Node.ELEMENT_NODE && ["STYLE", "LINK"].includes(node.nodeName)) return node;

      if (toType(node) == "string") {
        if (!Stylesheet_Stylesheet.isLocalFile(node)) store.get(this).set(swritable, false);
        const href = node;
        node = ZParser_Parser.parse(`link#${store.get(this).get(Stylesheet_suid)}[rel=stylesheet][href=${href}]`).fragment.childNodes[0];
      } else {
        node = ZParser_Parser.parse(`style#${store.get(this).get(Stylesheet_suid)}`).fragment.childNodes[0];
        node.appendChild(document.createTextNode(rules.splice(0).join("\n")));
      }

      if (dict.media) node.setAttribute("media", dict.media);
      domready.then(({
        nodes
      }) => {
        nodes.head.appendChild(node);
        requestAnimationFrame(hrt => {
          if (!!dict.disabled) node.disabled = true;
        });
      });
      return node;
    }.call(this, dict.node || dict.href || void 0));
    store.get(this).set(sready, new Promise((resolve, reject) => {
      const onload = e => {
        if (store.get(this).get(swritable) && rules && !!rules.length) this.insertRule(rules);
        resolve(store.get(this).get(swritable));
        store.get(this).set(ssheet, store.get(this).get(snode).sheet);
        this.dispatchEvent(new Stylesheet_Ready(store.get(this).get("sheet")));
      };

      if ("msSetImmediate" in window) // no events for <style> on ie
        msSetImmediate(onload); //TODO test on edge
      else store.get(this).get(snode).addEventListener("load", onload), store.get(this).get(snode).addEventListener("error", function (e) {
          console.error(e);
          reject(e);
        });
    }));
  }

  get media() {
    return store.get(this).get(snode).getAttribute("media");
  }

  set media(v) {
    store.get(this).get(snode).setAttribute("media", v);
  }

  get node() {
    return store.get(this).get(snode);
  }

  get sheet() {
    return store.get(this).get(snode).sheet;
  }

  async deleteRule(...args) {
    const rules = toType(args[0]) == "array" ? args.shift() : args.length ? args : [];
    const writable = await store.get(this).get(sready);
    rules.forEach(rule => {
      let is_rule = false;
      let is_conditional = false;
      rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule_CSSConditionalRule ? (is_conditional = true, rule) : null;
      if (!rule) return;

      if (is_rule) {
        if (Stylesheet_updaters_text.has(rule)) rule.removeEventListener(CSSRule_CSSRule.events.textupdate, Stylesheet_updaters_text.get(rule)), Stylesheet_updaters_text.delete(rule);
        let idx = -1;

        while (idx = store.get(this).get(Stylesheet_srules).indexOf(rule), idx != -1) store.get(this).get(ssheet).deleteRule(idx), store.get(this).get(Stylesheet_srules).splice(idx, 1);
      } else if (is_conditional) {
        let idx = -1;

        while (idx = store.get(this).get(Stylesheet_srules).indexOf(rule), idx != -1) {
          store.get(rule).get(sremove)(store.get(this).get(ssheet).cssRules[idx]);
          store.get(this).get(ssheet).deleteRule(idx);
          store.get(this).get(Stylesheet_srules).splice(idx, 1);
        }
      }
    });
  }

  async insertRule(...args) {
    const rules = toType(args[0]) == "array" ? args.shift() : args.length ? args : [];
    const writable = await store.get(this).get(sready);
    if (!writable) throw new Error(ERR_SS_NOT_WRITABLE);
    rules.forEach(rule => {
      let is_rule = false;
      let is_conditional = false;
      rule = rule instanceof CSSRule_CSSRule ? (is_rule = true, rule) : rule instanceof CSSConditionalRule_CSSConditionalRule ? (is_conditional = true, rule) : (is_rule = true, new CSSRule_CSSRule(rule));
      const idx = store.get(this).get(ssheet).cssRules.length;
      store.get(this).get(Stylesheet_srules)[idx] = rule;

      if (is_rule) {
        store.get(this).get(ssheet).insertRule(rule.toString(), idx);
        if (!Stylesheet_updaters_text.has(rule)) Stylesheet_updaters_text.set(rule, ({
          cssRule
        }) => {
          let idxs = [];
          store.get(this).get(Stylesheet_srules).forEach((rule, idx) => {
            if (rule === cssRule) idxs.push(idx);
          });
          idxs.forEach(idx => store.get(this).get(ssheet).cssRules[idx].style.cssText = cssRule.cssText);
        });
        rule.addEventListener(CSSRule_CSSRule.events.textupdate, Stylesheet_updaters_text.get(rule));
      } else if (is_conditional) {
        store.get(this).get(ssheet).insertRule(rule.toString(), idx);
        store.get(rule).get(sadd)(store.get(this).get(ssheet).cssRules[idx]);
      }
    });
  }

}
// CONCATENATED MODULE: ./lib/utils/trait.js
 //TODO strenghten

const sparents = Symbol("parents");
/* harmony default export */ var trait = ((...classes) => {
  const Class = class extends classes.pop() {};
  const prototypes = classes.reduce((accumulator, Class) => {
    const prototypes = [Class.prototype];

    while (Class = Object.getPrototypeOf(Class), Class != Function.prototype) prototypes.unshift(Class.prototype);

    prototypes.forEach(prototype => accumulator.add(prototype));
    return accumulator;
  }, new Set());
  prototypes.forEach(prototype => [...Object.getOwnPropertyNames(prototype), ...Object.getOwnPropertySymbols(prototype)].forEach(property => Object.defineProperty(Class.prototype, property, Object.getOwnPropertyDescriptor(prototype, property))));
  Object.defineProperty(Class.prototype, "constructor", {
    configurable: true,
    value: Class
  });
  return Class;
});
// CONCATENATED MODULE: ./lib/graph/Vertex.js









const slabel = new Object(Symbol("label"));
class Vertex_Vertex extends EventTarget_EventTarget {
  constructor(label) {
    super();
    store.set(this, new WeakMap());
    store.get(this).set(sedges, new Set());
    store.get(this).set(sgraphs, new Set());
    this.label = label;
  }

  get graphs() {
    return [...store.get(this).get(sgraphs)];
  }

  get label() {
    return store.get(this).get(slbabel) || null;
  }

  set label(label = null) {
    store.get(this).set(slabel, label);
  }

  addEdge(graph, edge) {
    // shortcut to graph method
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.addEdge(edge);
  }

  addEdges(graph, edges) {
    // shortcut to graph method
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.addEdges(edges);
  }

  adjacents(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.adjacents(this);
  }

  adjacentsIn(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.adjacentsIn(this);
  }

  adjacentsOut(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.adjacentsOut(this);
  }

  arcFrom(graph, vertex) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.arcFrom(vertex, this);
  } // number of edges not regions in graph


  arcs(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.arcs.filter(({
      vertices
    }) => vertices.includes(this));
  }

  arcTo(graph, vertex) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.arcTo(vertex, this);
  } // number of edges not regions in graph


  connections(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.connections.filter(({
      vertices
    }) => vertices.includes(this));
  } // the number of edges


  degree(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.degree(this);
  } // list edges related to current vertex in the given graph


  edges(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.edges.filter(edge => edge.vertices.includes(this));
  }

  extravertArcWith(graph, vertex) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.extravertArcWith(vertex, this);
  }

  hyperEdges(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.hyperarcs.filter(edge => edge.vertices.includes(this));
  }

  hyperEdgeWith(graph, vertices) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.hyperEdgeWith([this, ...vertices]);
  } // inward edges ( vertex <= x ) in the given graph


  indegree(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.indegree(this); //return graph.edges.filter(edge => edge.in && edge.in.includes(this))
  }

  introvertArcWith(graph, vertex) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return graph.addEdge(new Edge_Edge([this, vertex], "<>"));
  }

  lines(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.lines.filter(edge => edge.vertices.includes(this));
  }

  lineWith(graph, vertex) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.lineWith(vertex, this);
  }

  loop(graph, relation) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.loop(this, relation);
  }

  loops(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.loops.filter(({
      a
    }) => a === this);
  } // outward edges ( vertex => x ) in the given graph


  outdegree(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.outdegree(this); //return graph.edges.filter(edge => edge.out && edge.out.includes(this))
  }

  removeEdge(graph, edge) {
    // shortcut to graph method
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.removeEdge(edge);
  }

  removeEdges(graph, edges) {
    // shortcut to graph method
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    return graph.removeEdges(edges);
  }

}
// CONCATENATED MODULE: ./lib/graph/Edge.js






const sdirection = new Object(Symbol());
const sedges = new Object(Symbol());
const sextraverted = new Object(Symbol());
const sgraph = new Object(Symbol);
const Edge_slabel = new Object(Symbol());
const srelation = new Object(Symbol());
const svertexa = new Object(Symbol());
const svertexb = new Object(Symbol());
const svertices = new Object(Symbol());
const relations = Object.freeze({
  "-": 0b1 // A - B
  ,
  LINE: 0b1,
  "<": 0b10 // A <- B
  ,
  INOUT: 0b10,
  "<>": 0b100 // A <-> B
  ,
  ININ: 0b100,
  ">": 0b1000 // A -> B
  ,
  OUTIN: 0b1000,
  "><": 0b10000 // A >-< B
  ,
  OUTOUT: 0b10000,
  "@": 0b100000 // < A, B, C,... >
  ,
  REGION: 0b100000,
  HYPERARC: 0b100000
});
const states = Object.freeze({
  CONNECTED: 0b1,
  DISCONNECTED: 0b0
});
const types = Object.freeze({
  LINE: 0b1 // 2 vertices and no direction
  ,
  ARC: 0b10 // 2 vertices and 1-2 direction
  ,
  HYPERARC: 0b100 // more than 2 vertices
  ,
  REGION: 0b100 // more than 2 vertices
  ,
  LOOP: 0b1000 // 1 vertice

});
class Edge_Edge extends EventTarget_EventTarget {
  static get relations() {
    return relations;
  }

  static get states() {
    return states;
  }

  static get types() {
    return types;
  }

  constructor(vertices, relation, label) {
    super();
    store.set(this, new WeakMap());
    store.get(this).set(svertices, new Set());
    this.relation = relation;
    this.label = label;
    const [a, b, ...otherVertices] = [...vertices];
    if (a) this.addVertex(a);
    if (b) this.addVertex(b);
    if (otherVertices.length) this.addVertices(otherVertices);
  }

  get a() {
    return this.vertices[0] || null;
  }

  get b() {
    return this.vertices[1] || this.vertices[0] || null;
  }

  get bidirected() {
    return Boolean(this.relation & (Edge_Edge.relations.OUTOUT | Edge_Edge.relations.ININ));
  }

  get directed() {
    return Boolean(this.relation & (Edge_Edge.relations.INOUT | Edge_Edge.relations.OUTIN));
  }

  get extraverted() {
    return Boolean(this.relation & Edge_Edge.relations.ININ);
  }

  get graph() {
    return store.get(this).get(sgraph) || null;
  }

  get in() {
    if (this.relation & Edge_Edge.relations.ININ) return [...new Set([this.a, this.b])];else if (this.relation & Edge_Edge.relations.INOUT) return [this.a];else if (this.relation & Edge_Edge.relations.OUTIN) return [this.b];
    return null;
  }

  get inward() {
    return this.in;
  }

  get intraverted() {
    return Boolean(this.relation & Edge_Edge.relations.ININ);
  }

  get label() {
    return store.get(this).get(Edge_slabel) || null;
  }

  set label(label = null) {
    store.get(this).set(Edge_slabel, label);
  }

  get out() {
    if (this.relation & Edge_Edge.relations.OUTOUT) return [...new Set([this.a, this.b])];else if (this.relation & Edge_Edge.relations.OUTIN) return [this.a];else if (this.relation & Edge_Edge.relations.INOUT) return [this.b];
    return null;
  }

  get outward() {
    return this.out;
  }

  get relation() {
    return store.get(this).get(srelation);
  }

  set relation(rel = "LINE") {
    if (!Edge_Edge.relations.hasOwnProperty(rel)) throw new ReferenceError(EUNKNWNREL);
    store.get(this).set(srelation, Edge_Edge.relations[rel]);
  }

  get state() {
    return store.get(this).get(sgraph) ? Edge_Edge.states.CONNECTED : Edge_Edge.states.DISCONNECTED;
  }

  get type() {
    if (this.relation & Edge_Edge.relations.LINE) return this.a === this.b ? Edge_Edge.types.LOOP : Edge_Edge.types.LINE;else if (this.relation & (Edge_Edge.relations.INOUT | Edge_Edge.relations.OUTIN | Edge_Edge.relations.ININ | Edge_Edge.relations.OUTOUT)) return this.a === this.b ? Edge_Edge.types.LOOP : Edge_Edge.types.ARC;else if (this.relation & Edge_Edge.relations.REGION) return Edge_Edge.types.HYPERARC;
  }

  get undirected() {
    return !this.directed && !this.bidirected;
  }

  get vertices() {
    return [...store.get(this).get(svertices)];
  }

  addVertex(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    const l = this.vertices.length;
    if (l >= 2 && this.relation !== Edge_Edge.relations.REGION) throw new Error(ETOOMANYVERT);
    store.get(this).get(svertices).add(vertex);
    store.get(vertex).get(sedges).add(this);
    return vertex;
  }

  addVertices(vertices) {
    return [...vertices].map(vertex => this.addVertex(vertex));
  }

  removeVertex(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    store.get(this).get(svertices).delete(vertex);
    store.get(vertex).get(sedges).delete(this);
    return vertex;
  }

  removeVertices(vertices) {
    return [...vertices].map(vertex => this.removeVertex(vertex));
  }

}
// CONCATENATED MODULE: ./lib/graph/DepthFirstTree.js







const DepthFirstTree_sgraph = new Object(Symbol());
const sroot = new Object(Symbol());
const straversal = new Object(Symbol());
class DepthFirstTree_DepthFirstTree {
  static from({
    graph,
    rootVertex,
    traversal
  }) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    const dft = Object.create({});
    Object.setPrototypeOf(dft, DepthFirstTree_DepthFirstTree.prototype);
    store.set(dft, new WeakMap());
    store.get(dft).set(DepthFirstTree_sgraph, graph);
    store.get(dft).set(sroot, rootVertex);
    store.get(dft).set(straversal, traversal);
    return dft;
  }

  constructor() {
    throw new Error(EINVALIDCONS);
  }

  get root() {
    return store.get(this).get(sroot);
  }

  hasPathTo(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return store.get(this).get(straversal).has(vertex);
  }

}
// CONCATENATED MODULE: ./lib/graph/Traversal.js









const Traversal_sgraph = new Object(Symbol());
class Traversal_Traversal extends EventTarget_EventTarget {
  constructor(graph) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    super();
    store.set(this, new WeakMap());
    store.get(this).set(Traversal_sgraph, graph);
  }

  get bft() {
    return this.breadthFirstTree;
  }

  get graph() {
    return store.get(this).get(Traversal_sgraph);
  }

  depthFirstTree(rootVertex) {
    if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    const traversal = new WeakMap();
    const stack = [[null, rootVertex]];

    while (stack.length) {
      const [parent, vertex] = stack[stack.length - 1];
      traversal.set(vertex, parent);
      const nextVertex = [...this.graph.lines.reduce((acc, {
        a,
        b,
        vertices
      }) => (vertices.includes(vertex) && acc.push(a === vertex ? b : a), acc), []), ...this.graph.adjacentsOut(vertex)].filter(child => !traversal.has(child))[0];
      if (!nextVertex) stack.pop();else stack.push([vertex, nextVertex]);
    }

    return DepthFirstTree_DepthFirstTree.from({
      graph: this.graph,
      rootVertex,
      traversal
    });
  }

  breadthFirstTree(rootVertex) {
    if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    const traversal = new WeakMap();
    const queue = [[null, rootVertex]];

    while (queue.length) {
      const [parent, vertex] = queue.shift();
      if (traversal.has(vertex)) continue;
      traversal.set(vertex, parent); // void [
      //     ...this.graph.lines.reduce((acc, {a, b, vertices}) => (vertices.includes(vertex) && acc.push(a===vertex?b:a), acc), [])
      //   , ...this.graph.adjacentsOut(vertex)
      // ]
      // .filter(child => !traversal.has(child))
      // .forEach(child => queue.push([vertex, child]))

      void [...this.graph.lines.filter(({
        vertices
      }) => vertices.includes(vertex)), ...this.graph.arcs.filter(({
        vertices
      }) => vertices.includes(vertex))].sort((a, b) => (+a.label || 0) - (+b.label || 0)).reduce((acc, {
        a,
        b
      }) => (acc.push(a === vertex ? b : a), acc), []).forEach(child => queue.push([vertex, child]));
    }

    return BreadthFirstTree_BreadthFirstTree.from({
      graph: this.graph,
      rootVertex,
      traversal
    });
  }

}
// CONCATENATED MODULE: ./lib/graph/Graph.js









const sallowed = new Object(Symbol("allowed"));
const Graph_sedges = new Object(Symbol("edges"));
const sgraphs = new Object(Symbol("graphs"));
const Graph_svertices = new Object(Symbol("vertices"));
const allowance = Object.freeze({
  PARALLELS: 1024
});
const presets = Object.freeze({
  LINES: 0b0001,
  UNDIRECTED: 0b0001,
  ARCS: 0b0010,
  DIRECTED: 0b0010,
  CONNECTIONS: 0b1011,
  ALL: 0b1111
});
class Graph_Graph extends EventTarget_EventTarget {
  static get allowance() {
    return allowance;
  }

  static get presets() {
    return presets;
  }

  constructor({
    allows = 3
  } = {}) {
    super();
    store.set(this, new WeakMap());
    store.get(this).set(sallowed, allows);
    store.get(this).set(Graph_sedges, new Set());
    store.get(this).set(Graph_svertices, new Set());
  }

  get allowed() {
    return store.get(this).get("sallowed");
  }

  get arcs() {
    return this.edges.filter(edge => edge.type == Edge_Edge.types.ARC);
  }

  get connections() {
    return this.edges.filter(edge => edge.type & (Edge_Edge.types.LINE | Edge_Edge.types.ARC | Edge_Edge.types.LOOP));
  }

  get edges() {
    return [...store.get(this).get(Graph_sedges)];
  }

  get hyperarcs() {
    return this.edges.filter(edge => edge.type == Edge_Edge.types.HYPERARC);
  }

  get lines() {
    return this.edges.filter(edge => edge.type == Edge_Edge.types.LINE);
  }

  get loops() {
    return this.edges.filter(edge => edge.type == Edge_Edge.types.LOOP);
  }

  get regions() {
    return this.hyperarcs;
  }

  get vertices() {
    return [...store.get(this).get(Graph_svertices)];
  }

  allows(type) {
    return Boolean(store.get(this).get(sallowed) & type);
  }

  addEdge(edge) {
    if (!(edge instanceof Edge_Edge)) throw new TypeError(ENOTEDGE);
    if (edge.state == Edge_Edge.states.CONNECTED) throw new Error(EALRDYCONN);
    if (!this.allows(edge.type) || edge.vertices.some(vertex => !store.get(this).get(Graph_svertices).has(vertex))) throw new TypeError(EUNCOMPEDGE);
    if (edge.type !== Edge_Edge.types.HYPERARC && !this.allows(Graph_Graph.allowance.PARALLELS) && (edge.type !== Edge_Edge.types.LOOP && [...this.connections].filter(({
      vertices
    }) => vertices.includes(edge.a) && vertices.includes(edge.b)).length || edge.type === Edge_Edge.types.LOOP && [...this.loops].filter(({
      a
    }) => a == edge.a).length)) throw new Error(EPRLLLNOTALLOW);
    store.get(this).get(Graph_sedges).add(edge);
    store.get(edge).set(sgraph, this);
    return edge;
  }

  addEdges(edges) {
    void [...edges].forEach(edge => this.addEdge(edge));
  }

  adjacents(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
    return [...this.connections.reduce((acc, {
      a,
      b
    }) => {
      return b === vertex ? (acc.add(a), acc) : a === vertex ? (acc.add(b), acc) : acc;
    }, new Set())];
  }

  adjacentsIn(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
    return [...this.arcs.reduce((acc, {
      inward,
      outward,
      relation
    }) => {
      if (inward && inward.includes(vertex)) relation !== Edge_Edge.relations.ININ ? outward && outward.forEach(outward => outward !== vertex && acc.add(outward)) : inward.forEach(inward => inward !== vertex && acc.add(inward));
      return acc;
    }, new Set())];
  }

  adjacentsOut(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
    return [...this.arcs.reduce((acc, {
      inward,
      outward,
      relation
    }) => {
      if (outward && outward.includes(vertex)) relation !== Edge_Edge.relations.OUTOUT ? inward && inward.forEach(inward => inward !== vertex && acc.add(inward)) : outward.forEach(outward => outward !== vertex && acc.add(outward));
      return acc;
    }, new Set())];
  }

  addVertex(vertex, edges, ...args) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    store.get(this).get(Graph_svertices).add(vertex);
    store.get(vertex).get(sgraphs).add(this);
    if (edges && edges instanceof Edge_Edge) this.addEdge(edges);else if (edges && edges[Symbol.iterator]) this.addEdges(edges);else if (typeof edges == "function") {
      const edge = this.addEdge(Reflect.construct(edges, [[vertex], ...args]));
      return [vertex, edge];
    }
    return vertex;
  }

  addVertices(vertices, edges, ...args) {
    const added = [...vertices].map(vertex => this.addVertex(vertex));
    if (edges && edges instanceof Edge_Edge) this.addEdge(edges);else if (edges && edges[Symbol.iterator]) this.addEdges(edges);else if (typeof edges == "function") {
      const edge = Reflect.construct(edges, [added, ...args]);
      return [added, this.addEdge(edge)];
    }
    return added;
  }

  arcFrom(a, b) {
    if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return this.addEdge(new Edge_Edge([a, b], ">"));
  }

  arcTo(a, b) {
    if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return this.addEdge(new Edge_Edge([a, b], "<"));
  }

  get bft() {
    return this.breadthFirstTree;
  }

  breadthFirstTree(vertex) {
    return new Traversal_Traversal(this).breadthFirstTree(vertex);
  }

  degree(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
    return this.connections.reduce((acc, {
      vertices,
      type
    }) => {
      if (vertices.includes(vertex)) acc += type === Edge_Edge.types.LOOP ? 2 : 1;
      return acc;
    }, 0);
  }

  get dft() {
    return this.depthFirstTree;
  }

  depthFirstTree(vertex) {
    return new Traversal_Traversal(this).depthFirstTree(vertex);
  }

  extravertArcWith(a, b) {
    if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return this.addEdge(new Edge_Edge([a, b], "><"));
  }

  hyperEdgeWith(vertices) {
    vertices.forEach(vertex => {
      if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    });
    return this.addEdge(new Edge_Edge([...vertices], "@"));
  }

  indegree(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
    return this.arcs.reduce((acc, {
      inward
    }) => {
      if (inward.includes(vertex)) acc += 1;
      return acc;
    }, 0);
  }

  introvertArcWith(vertices) {
    if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return this.addEdge(new Edge_Edge([a, b], "<>"));
  }

  lineWith(a, b) {
    if (!(a instanceof Vertex_Vertex) || !(b instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return this.addEdge(new Edge_Edge([a, b]));
  }

  loop(vertex, rel = "LINE") {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    if (!Edge_Edge.relations.hasOwnProperty(rel)) throw new ReferenceError(EUNKNWNREL);
    return this.addEdge(new Edge_Edge([vertex], rel));
  }

  outdegree(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    if (!store.get(this).get(Graph_svertices).has(vertex)) throw new ReferenceError(ENOTINSET);
    return this.arcs.reduce((acc, {
      outward
    }) => {
      if (outward.includes(vertex)) acc += 1;
      return acc;
    }, 0);
  }

  removeEdge(edge) {
    if (!(edge instanceof Edge_Edge)) throw new TypeError(ENOTEDGE);
    store.get(this).get(Graph_sedges).delete(edge);
    store.get(edge).delete(sgraph);
    return edge;
  }

  removeEdges(edges) {
    void [...edges].forEach(edge => this.removeEdge(edge));
  }

  removeVertex(vertex, edges) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    store.get(this).get(Graph_svertices).delete(vertex);
    store.get(vertex).get(sgraphs).delete(this);
    edges = edges && edges[Symbol.iterator] ? edges : edges ? [edges] : [];
    void [...edges].forEach(edge => this.removeEdge(edge));
    void [...this.edges].forEach(edge => {
      if (!edge.vertices.includes(vertex)) return; //if ( edge.type != Edge.types.HYPERARC || edge.vertices.length == 1)

      if (edge.vertices.length > 1 && (edge.type == Edge_Edge.types.HYPERARC || this.allows(Edge_Edge.types.LOOP))) edge.removeVertex(vertex);else this.removeEdge(edge);
    });
    return vertex;
  }

  removeVertices(vertices, edges) {
    void [...vertices].forEach(vertex => this.removeVertex(vertex));
    if (edges && !edges[Symbol.iterator]) this.removeEdge(edges);else if (edges && edges[Symbol.iterator]) this.removeEdges(edges);
  }

}
// CONCATENATED MODULE: ./lib/graph/BreadthFirstTree.js







const BreadthFirstTree_sgraph = new Object(Symbol());
const BreadthFirstTree_sroot = new Object(Symbol());
const BreadthFirstTree_straversal = new Object(Symbol());
class BreadthFirstTree_BreadthFirstTree {
  static from({
    graph,
    rootVertex,
    traversal
  }) {
    if (!(graph instanceof Graph_Graph)) throw new TypeError(ENOTGRAPH);
    if (!(rootVertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    const bft = Object.create({});
    Object.setPrototypeOf(bft, BreadthFirstTree_BreadthFirstTree.prototype);
    store.set(bft, new WeakMap());
    store.get(bft).set(BreadthFirstTree_sgraph, graph);
    store.get(bft).set(BreadthFirstTree_sroot, rootVertex);
    store.get(bft).set(BreadthFirstTree_straversal, traversal);
    return bft;
  }

  constructor() {
    throw new Error(EINVALIDCONS);
  }

  get root() {
    return store.get(this).get(BreadthFirstTree_sroot);
  }

  hasPathTo(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    return store.get(this).get(BreadthFirstTree_straversal).has(vertex);
  }

  pathTo(vertex) {
    if (!(vertex instanceof Vertex_Vertex)) throw new TypeError(ENOTVERTEX);
    const traversal = store.get(this).get(BreadthFirstTree_straversal);
    if (!traversal.has(vertex)) return null;
    const path = [vertex];
    let parent = vertex;

    while (parent = traversal.get(parent)) path.unshift(parent);

    return path;
  }

}
// CONCATENATED MODULE: ./lib/graph/HyperGraph.js



class HyperGraph_HyperGraph extends Graph_Graph {
  constructor() {
    super({
      allows: 7
    });
  }

}
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
/* concated harmony reexport View */__webpack_require__.d(__webpack_exports__, "View", function() { return View_View; });
/* concated harmony reexport expression */__webpack_require__.d(__webpack_exports__, "expression", function() { return View_expression; });
/* concated harmony reexport ZParser */__webpack_require__.d(__webpack_exports__, "ZParser", function() { return ZParser_Parser; });
/* concated harmony reexport BreadthFirstTree */__webpack_require__.d(__webpack_exports__, "BreadthFirstTree", function() { return BreadthFirstTree_BreadthFirstTree; });
/* concated harmony reexport DepthFirstTree */__webpack_require__.d(__webpack_exports__, "DepthFirstTree", function() { return DepthFirstTree_DepthFirstTree; });
/* concated harmony reexport Edge */__webpack_require__.d(__webpack_exports__, "Edge", function() { return Edge_Edge; });
/* concated harmony reexport Graph */__webpack_require__.d(__webpack_exports__, "Graph", function() { return Graph_Graph; });
/* concated harmony reexport HyperGraph */__webpack_require__.d(__webpack_exports__, "HyperGraph", function() { return HyperGraph_HyperGraph; });
/* concated harmony reexport Traversal */__webpack_require__.d(__webpack_exports__, "Traversal", function() { return Traversal_Traversal; });
/* concated harmony reexport Vertex */__webpack_require__.d(__webpack_exports__, "Vertex", function() { return Vertex_Vertex; });






























































 // graph















/* harmony default export */ var lib = __webpack_exports__["default"] = (`${"seithr"}@${"0.1.5"}`);

/***/ })
/******/ ]);
//# sourceMappingURL=seithr.js.map