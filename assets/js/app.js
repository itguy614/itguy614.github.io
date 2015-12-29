/*!
 * jQuery JavaScript Library v2.1.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-04-28T16:01Z
 */

(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//

var arr = [];

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	// Use the correct document accordingly with window argument (sandbox)
	document = window.document,

	version = "2.1.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray,

	isWindow: function( obj ) {
		return obj != null && obj === obj.window;
	},

	isNumeric: function( obj ) {
		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		return !jQuery.isArray( obj ) && (obj - parseFloat( obj ) + 1) >= 0;
	},

	isPlainObject: function( obj ) {
		// Not plain objects:
		// - Any object or value whose internal [[Class]] property is not "[object Object]"
		// - DOM nodes
		// - window
		if ( jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		if ( obj.constructor &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
			return false;
		}

		// If the function hasn't returned already, we're confident that
		// |obj| is a plain object, created by {} or constructed with new Object
		return true;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		// Support: Android<4.0, iOS<6 (functionish RegExp)
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call(obj) ] || "object" :
			typeof obj;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		var script,
			indirect = eval;

		code = jQuery.trim( code );

		if ( code ) {
			// If the code includes a valid, prologue position
			// strict mode pragma, execute code by injecting a
			// script tag into the document.
			if ( code.indexOf("use strict") === 1 ) {
				script = document.createElement("script");
				script.text = code;
				document.head.appendChild( script ).parentNode.removeChild( script );
			} else {
			// Otherwise, avoid the DOM node creation, insertion
			// and removal by using an indirect global eval
				indirect( code );
			}
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Support: IE9-11+
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var tmp, args, proxy;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: Date.now,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
});

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.0-pre
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2014-12-16
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + characterEncoding + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];
	nodeType = context.nodeType;

	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	if ( !seed && documentIsHTML ) {

		// Try to shortcut find operations when possible (e.g., not under DocumentFragment)
		if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document (jQuery #6963)
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType !== 1 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && testContext( context.parentNode ) || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;
	parent = doc.defaultView;

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent !== parent.top ) {
		// IE11 does not have attachEvent, so all must suffer
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Support tests
	---------------------------------------------------------------------- */
	documentIsHTML = !isXML( doc );

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( doc.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\f]' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.2+, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.7+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (oldCache = outerCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							outerCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context !== document && context;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is no seed and only one group
	if ( match.length === 1 ) {

		// Take a shortcut and set the context if the root selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = (/^<(\w+)\s*\/?>(?:<\/\1>|)$/);



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( indexOf.call( qualifier, elem ) >= 0 ) !== not;
	});
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		}));
};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			len = this.length,
			ret = [],
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},
	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
});


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[0] === "<" && selector[ selector.length - 1 ] === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Support: Blackberry 4.6
					// gEBID returns nodes no longer in the document (#6963)
					if ( elem && elem.parentNode ) {
						// Inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof rootjQuery.ready !== "undefined" ?
				rootjQuery.ready( selector ) :
				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,
	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.extend({
	dir: function( elem, dir, until ) {
		var matched = [],
			truncate = until !== undefined;

		while ( (elem = elem[ dir ]) && elem.nodeType !== 9 ) {
			if ( elem.nodeType === 1 ) {
				if ( truncate && jQuery( elem ).is( until ) ) {
					break;
				}
				matched.push( elem );
			}
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var matched = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				matched.push( n );
			}
		}

		return matched;
	}
});

jQuery.fn.extend({
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter(function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.unique( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.unique(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	while ( (cur = cur[dir]) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return elem.contentDocument || jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.unique( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
});
var rnotwhite = (/\S+/g);



// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// Flag to know if list is currently firing
		firing,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ tuple[ 0 ] + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// Add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// If we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {
	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend({
	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
});

/**
 * The ready event handler and self cleanup method
 */
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed, false );
	window.removeEventListener( "load", completed, false );
	jQuery.ready();
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// We once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		} else {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = jQuery.access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {
			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			len ? fn( elems[0], key ) : emptyGet;
};


/**
 * Determines whether an object can have data
 */
jQuery.acceptData = function( owner ) {
	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	/* jshint -W018 */
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};


function Data() {
	// Support: Android<4,
	// Old WebKit does not have Object.preventExtensions/freeze method,
	// return new empty object instead with no [[set]] accessor
	Object.defineProperty( this.cache = {}, 0, {
		get: function() {
			return {};
		}
	});

	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;
Data.accepts = jQuery.acceptData;

Data.prototype = {
	key: function( owner ) {
		// We can accept data for non-element nodes in modern browsers,
		// but we should not, see #8335.
		// Always return the key for a frozen object.
		if ( !Data.accepts( owner ) ) {
			return 0;
		}

		var descriptor = {},
			// Check if the owner object already has a cache key
			unlock = owner[ this.expando ];

		// If not, create one
		if ( !unlock ) {
			unlock = Data.uid++;

			// Secure it in a non-enumerable, non-writable property
			try {
				descriptor[ this.expando ] = { value: unlock };
				Object.defineProperties( owner, descriptor );

			// Support: Android<4
			// Fallback to a less secure definition
			} catch ( e ) {
				descriptor[ this.expando ] = unlock;
				jQuery.extend( owner, descriptor );
			}
		}

		// Ensure the cache object
		if ( !this.cache[ unlock ] ) {
			this.cache[ unlock ] = {};
		}

		return unlock;
	},
	set: function( owner, data, value ) {
		var prop,
			// There may be an unlock assigned to this node,
			// if there is no entry for this "owner", create one inline
			// and set the unlock as though an owner entry had always existed
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		// Handle: [ owner, key, value ] args
		if ( typeof data === "string" ) {
			cache[ data ] = value;

		// Handle: [ owner, { properties } ] args
		} else {
			// Fresh assignments by object are shallow copied
			if ( jQuery.isEmptyObject( cache ) ) {
				jQuery.extend( this.cache[ unlock ], data );
			// Otherwise, copy the properties one-by-one to the cache object
			} else {
				for ( prop in data ) {
					cache[ prop ] = data[ prop ];
				}
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		// Either a valid cache is found, or will be created.
		// New caches will be created and the unlock returned,
		// allowing direct access to the newly created
		// empty data object. A valid owner object must be provided.
		var cache = this.cache[ this.key( owner ) ];

		return key === undefined ?
			cache : cache[ key ];
	},
	access: function( owner, key, value ) {
		var stored;
		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				((key && typeof key === "string") && value === undefined) ) {

			stored = this.get( owner, key );

			return stored !== undefined ?
				stored : this.get( owner, jQuery.camelCase(key) );
		}

		// [*]When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i, name, camel,
			unlock = this.key( owner ),
			cache = this.cache[ unlock ];

		if ( key === undefined ) {
			this.cache[ unlock ] = {};

		} else {
			// Support array or space separated string of keys
			if ( jQuery.isArray( key ) ) {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = key.concat( key.map( jQuery.camelCase ) );
			} else {
				camel = jQuery.camelCase( key );
				// Try the string as a key before any manipulation
				if ( key in cache ) {
					name = [ key, camel ];
				} else {
					// If a key with the spaces exists, use it.
					// Otherwise, create an array by matching non-whitespace
					name = camel;
					name = name in cache ?
						[ name ] : ( name.match( rnotwhite ) || [] );
				}
			}

			i = name.length;
			while ( i-- ) {
				delete cache[ name[ i ] ];
			}
		}
	},
	hasData: function( owner ) {
		return !jQuery.isEmptyObject(
			this.cache[ owner[ this.expando ] ] || {}
		);
	},
	discard: function( owner ) {
		if ( owner[ this.expando ] ) {
			delete this.cache[ owner[ this.expando ] ];
		}
	}
};
var data_priv = new Data();

var data_user = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			data_user.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend({
	hasData: function( elem ) {
		return data_user.hasData( elem ) || data_priv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return data_user.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		data_user.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to data_priv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return data_priv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		data_priv.remove( elem, name );
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = data_user.get( elem );

				if ( elem.nodeType === 1 && !data_priv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice(5) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					data_priv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				data_user.set( this, key );
			});
		}

		return access( this, function( value ) {
			var data,
				camelKey = jQuery.camelCase( key );

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {
				// Attempt to get data from the cache
				// with the key as-is
				data = data_user.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to get data from the cache
				// with the key camelized
				data = data_user.get( elem, camelKey );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, camelKey, undefined );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each(function() {
				// First, attempt to store a copy or reference of any
				// data that might've been store with a camelCased key.
				var data = data_user.get( this, camelKey );

				// For HTML5 data-* attribute interop, we have to
				// store property names with dashes in a camelCase form.
				// This might not apply to all properties...*
				data_user.set( this, camelKey, value );

				// *... In the case of properties that might _actually_
				// have dashes, we need to also store a copy of that
				// unchanged property.
				if ( key.indexOf("-") !== -1 && data !== undefined ) {
					data_user.set( this, key, value );
				}
			});
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each(function() {
			data_user.remove( this, key );
		});
	}
});


jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = data_priv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = data_priv.access( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return data_priv.get( elem, key ) || data_priv.access( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				data_priv.remove( elem, [ type + "queue", key ] );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = data_priv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var pnum = (/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/).source;

var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {
		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
	};

var rcheckableType = (/^(?:checkbox|radio)$/i);



(function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Safari<=5.1
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari<=5.1, Android<4.2
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<=11+
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
})();
var strundefined = typeof undefined;



support.focusinBubbles = "onfocusin" in window;


var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== strundefined && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = data_priv.hasData( elem ) && data_priv.get( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;
			data_priv.remove( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( data_priv.get( cur, "events" ) || {} )[ event.type ] && data_priv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && jQuery.acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && jQuery.isFunction( elem[ type ] ) && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					elem[ type ]();
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( data_priv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.disabled !== true || event.type !== "click" ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var eventDoc, doc, body,
				button = original.button;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: Cordova 2.5 (WebKit) (#13255)
		// All events should have a target; Cordova deviceready doesn't
		if ( !event.target ) {
			event.target = document;
		}

		// Support: Safari 6.0+, Chrome<28
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && jQuery.nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle, false );
	}
};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&
				// Support: Android<4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && e.preventDefault ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && e.stopPropagation ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// Support: Chrome 15+
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// Support: Firefox, Chrome, Safari
// Create "bubbling" focus and blur events
if ( !support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				data_priv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = data_priv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					data_priv.remove( doc, fix );

				} else {
					data_priv.access( doc, fix, attaches );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var origFn, type;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});


var
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {

		// Support: IE9
		option: [ 1, "<select multiple='multiple'>", "</select>" ],

		thead: [ 1, "<table>", "</table>" ],
		col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		_default: [ 0, "", "" ]
	};

// Support: IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

// Support: 1.x compatibility
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (elem.getAttribute("type") !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );

	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute("type");
	}

	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		data_priv.set(
			elems[ i ], "globalEval", !refElements || data_priv.get( refElements[ i ], "globalEval" )
		);
	}
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( data_priv.hasData( src ) ) {
		pdataOld = data_priv.access( src );
		pdataCur = data_priv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( data_user.hasData( src ) ) {
		udataOld = data_user.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		data_user.set( dest, udataCur );
	}
}

function getAll( context, tag ) {
	var ret = context.getElementsByTagName ? context.getElementsByTagName( tag || "*" ) :
			context.querySelectorAll ? context.querySelectorAll( tag || "*" ) :
			[];

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], ret ) :
		ret;
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var elem, tmp, tag, wrap, contains, j,
			fragment = context.createDocumentFragment(),
			nodes = [],
			i = 0,
			l = elems.length;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || fragment.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;
					tmp.innerHTML = wrap[ 1 ] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[ 2 ];

					// Descend through wrappers to the right content
					j = wrap[ 0 ];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Support: QtWebKit, PhantomJS
					// push.apply(_, arraylike) throws on ancient WebKit
					jQuery.merge( nodes, tmp.childNodes );

					// Remember the top-level container
					tmp = fragment.firstChild;

					// Ensure the created nodes are orphaned (#12392)
					tmp.textContent = "";
				}
			}
		}

		// Remove wrapper from fragment
		fragment.textContent = "";

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( fragment.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		return fragment;
	},

	cleanData: function( elems ) {
		var data, elem, type, key,
			special = jQuery.event.special,
			i = 0;

		for ( ; (elem = elems[ i ]) !== undefined; i++ ) {
			if ( jQuery.acceptData( elem ) ) {
				key = elem[ data_priv.expando ];

				if ( key && (data = data_priv.cache[ key ]) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}
					if ( data_priv.cache[ key ] ) {
						// Discard any remaining `private` data
						delete data_priv.cache[ key ];
					}
				}
			}
			// Discard any remaining `user` data
			delete data_user.cache[ elem[ data_user.expando ] ];
		}
	}
});

jQuery.fn.extend({
	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each(function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				});
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	remove: function( selector, keepData /* Internal Use Only */ ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {
			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map(function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var arg = arguments[ 0 ];

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			arg = this.parentNode;

			jQuery.cleanData( getAll( this ) );

			if ( arg ) {
				arg.replaceChild( elem, this );
			}
		});

		// Force removal if there was no new content (e.g., from empty arguments)
		return arg && (arg.length || arg.nodeType) ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback ) {

		// Flatten any nested arrays
		args = concat.apply( [], args );

		var fragment, first, scripts, hasScripts, node, doc,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[ 0 ],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction ||
				( l > 1 && typeof value === "string" &&
					!support.checkClone && rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[ 0 ] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							// Support: QtWebKit
							// jQuery.merge because push.apply(_, arraylike) throws
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[ i ], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!data_priv.access( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Optional AJAX dependency, but won't run scripts if not present
								if ( jQuery._evalUrl ) {
									jQuery._evalUrl( node.src );
								}
							} else {
								jQuery.globalEval( node.textContent.replace( rcleanScript, "" ) );
							}
						}
					}
				}
			}
		}

		return this;
	}
});

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: QtWebKit
			// .get() because push.apply(_, arraylike) throws
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});


var iframe,
	elemdisplay = {};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */
// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var style,
		elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		// getDefaultComputedStyle might be reliably used only on attached element
		display = window.getDefaultComputedStyle && ( style = window.getDefaultComputedStyle( elem[ 0 ] ) ) ?

			// Use of this method is a temporary fix (more like optimization) until something better comes along,
			// since it was removed from specification and supported only in FF
			style.display : jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = (iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" )).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = iframe[ 0 ].contentDocument;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = (/^margin/);

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {
		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		if ( elem.ownerDocument.defaultView.opener ) {
			return elem.ownerDocument.defaultView.getComputedStyle( elem, null );
		}

		return window.getComputedStyle( elem, null );
	};



function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,
		style = elem.style;

	computed = computed || getStyles( elem );

	// Support: IE9
	// getPropertyValue is only needed for .css('filter') (#12537)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];
	}

	if ( computed ) {

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// Support: iOS < 6
		// A tribute to the "awesome hack by Dean Edwards"
		// iOS < 6 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
		// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
		if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?
		// Support: IE
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {
	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {
				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return (this.get = hookFn).apply( this, arguments );
		}
	};
}


(function() {
	var pixelPositionVal, boxSizingReliableVal,
		docElem = document.documentElement,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	if ( !div.style ) {
		return;
	}

	// Support: IE9-11+
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container.style.cssText = "border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;" +
		"position:absolute";
	container.appendChild( div );

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computePixelPositionAndBoxSizingReliable() {
		div.style.cssText =
			// Support: Firefox<29, Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;-moz-box-sizing:border-box;" +
			"box-sizing:border-box;display:block;margin-top:1%;top:1%;" +
			"border:1px;padding:1px;width:4px;position:absolute";
		div.innerHTML = "";
		docElem.appendChild( container );

		var divStyle = window.getComputedStyle( div, null );
		pixelPositionVal = divStyle.top !== "1%";
		boxSizingReliableVal = divStyle.width === "4px";

		docElem.removeChild( container );
	}

	// Support: node.js jsdom
	// Don't assume that getComputedStyle is a property of the global object
	if ( window.getComputedStyle ) {
		jQuery.extend( support, {
			pixelPosition: function() {

				// This test is executed only once but we still do memoizing
				// since we can use the boxSizingReliable pre-computing.
				// No need to check if the test was already performed, though.
				computePixelPositionAndBoxSizingReliable();
				return pixelPositionVal;
			},
			boxSizingReliable: function() {
				if ( boxSizingReliableVal == null ) {
					computePixelPositionAndBoxSizingReliable();
				}
				return boxSizingReliableVal;
			},
			reliableMarginRight: function() {

				// Support: Android 2.3
				// Check if div with explicit width and no margin-right incorrectly
				// gets computed margin-right based on width of container. (#3333)
				// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
				// This support function is only executed once so no memoizing is needed.
				var ret,
					marginDiv = div.appendChild( document.createElement( "div" ) );

				// Reset CSS: box-sizing; display; margin; border; padding
				marginDiv.style.cssText = div.style.cssText =
					// Support: Firefox<29, Android 2.3
					// Vendor-prefix box-sizing
					"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
					"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
				marginDiv.style.marginRight = marginDiv.style.width = "0";
				div.style.width = "1px";
				docElem.appendChild( container );

				ret = !parseFloat( window.getComputedStyle( marginDiv, null ).marginRight );

				docElem.removeChild( container );
				div.removeChild( marginDiv );

				return ret;
			}
		});
	}
})();


// A method for quickly swapping in/out CSS properties to get correct calculations.
jQuery.swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var
	// Swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + pnum + ")", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[0].toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// Both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// At this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// At this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// At this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// Some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// Check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// Use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = data_priv.get( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = data_priv.access( elem, "olddisplay", defaultDisplay(elem.nodeName) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display !== "none" || !hidden ) {
				data_priv.set( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.extend({

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		"float": "cssFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Support: IE9-11+
			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {
				style[ name ] = value;
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) && elem.offsetWidth === 0 ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

// Support: Android 2.3
jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return jQuery.swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});

jQuery.fn.extend({
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE9
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	}
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*.
					// Use string for doubling so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur(),
				// break the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		} ]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = data_priv.get( elem, "fxshow" );

	// Handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// Ensure the complete handler is called before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// Height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE9-10 do not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			data_priv.get( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {
			style.display = "inline-block";
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always(function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		});
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = data_priv.access( elem, "fxshow", {} );
		}

		// Store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;

			data_priv.remove( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( (display === "none" ? defaultDisplay( elem.nodeName ) : display) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// Don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || data_priv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = data_priv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = data_priv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		});
	}
});

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = setTimeout( next, time );
		hooks.stop = function() {
			clearTimeout( timeout );
		};
	});
};


(function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: iOS<=5.1, Android<=4.2+
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE<=11+
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: Android<=2.3
	// Options inside disabled selects are incorrectly marked as disabled
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<=11+
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
})();


var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend({
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	}
});

jQuery.extend({
	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					elem[ propName ] = false;
				}

				elem.removeAttribute( name );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle;
		if ( !isXML ) {
			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ name ];
			attrHandle[ name ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				name.toLowerCase() :
				null;
			attrHandle[ name ] = handle;
		}
		return ret;
	};
});




var rfocusable = /^(?:input|select|textarea|button)$/i;

jQuery.fn.extend({
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each(function() {
			delete this[ jQuery.propFix[ name ] || name ];
		});
	}
});

jQuery.extend({
	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				return elem.hasAttribute( "tabindex" ) || rfocusable.test( elem.nodeName ) || elem.href ?
					elem.tabIndex :
					-1;
			}
		}
	}
});

if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});




var rclass = /[\t\r\n\f]/g;

jQuery.fn.extend({
	addClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j, finalValue,
			proceed = arguments.length === 0 || typeof value === "string" && value,
			i = 0,
			len = this.length;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = value ? jQuery.trim( cur ) : "";
					if ( elem.className !== finalValue ) {
						elem.className = finalValue;
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// Toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					data_priv.set( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : data_priv.get( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	}
});




var rreturn = /\r/g;

jQuery.fn.extend({
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// Handle most common string cases
					ret.replace(rreturn, "") :
					// Handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					jQuery.trim( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// IE6-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ? !option.disabled : option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( option.value, values ) >= 0) ) {
						optionSet = true;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
});

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});




// Return jQuery for attributes-only inclusion


jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});


var nonce = jQuery.now();

var rquery = (/\?/);



// Support: Android 2.3
// Workaround failure to string-cast null input
jQuery.parseJSON = function( data ) {
	return JSON.parse( data + "" );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE9
	try {
		tmp = new DOMParser();
		xml = tmp.parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = window.location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

		// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,
			// URL without anti-cache param
			cacheURL,
			// Response headers
			responseHeadersString,
			responseHeaders,
			// timeout handle
			timeoutTimer,
			// Cross-domain detection vars
			parts,
			// To know if global events are to be dispatched
			fireGlobals,
			// Loop variable
			i,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// Shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});


jQuery._evalUrl = function( url ) {
	return jQuery.ajax({
		url: url,
		type: "GET",
		dataType: "script",
		async: false,
		global: false,
		"throws": true
	});
};


jQuery.fn.extend({
	wrapAll: function( html ) {
		var wrap;

		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapAll( html.call(this, i) );
			});
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function( i ) {
				jQuery( this ).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});


jQuery.expr.filters.hidden = function( elem ) {
	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return elem.offsetWidth <= 0 && elem.offsetHeight <= 0;
};
jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function() {
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		})
		.map(function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});


jQuery.ajaxSettings.xhr = function() {
	try {
		return new XMLHttpRequest();
	} catch( e ) {}
};

var xhrId = 0,
	xhrCallbacks = {},
	xhrSuccessStatus = {
		// file protocol always yields status code 0, assume 200
		0: 200,
		// Support: IE9
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE9
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]();
		}
	});
}

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport(function( options ) {
	var callback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr(),
					id = ++xhrId;

				xhr.open( options.type, options.url, options.async, options.username, options.password );

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers["X-Requested-With"] ) {
					headers["X-Requested-With"] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							delete xhrCallbacks[ id ];
							callback = xhr.onload = xhr.onerror = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {
								complete(
									// file: protocol always yields status 0; see #8605, #14207
									xhr.status,
									xhr.statusText
								);
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,
									// Support: IE9
									// Accessing binary-data responseText throws an exception
									// (#11426)
									typeof xhr.responseText === "string" ? {
										text: xhr.responseText
									} : undefined,
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				xhr.onerror = callback("error");

				// Create the abort callback
				callback = xhrCallbacks[ id ] = callback("abort");

				try {
					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {
					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {
	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery("<script>").prop({
					async: true,
					charset: s.scriptCharset,
					src: s.url
				}).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
});




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});




// data: string of html
// context (optional): If specified, the fragment will be created in this context, defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[1] ) ];
	}

	parsed = jQuery.buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = jQuery.trim( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
});




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep(jQuery.timers, function( fn ) {
		return elem === fn.elem;
	}).length;
};




var docElem = window.document.documentElement;

/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ? elem : elem.nodeType === 9 && elem.defaultView;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf("auto") > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend({
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each(function( i ) {
					jQuery.offset.setOffset( this, options, i );
				});
		}

		var docElem, win,
			elem = this[ 0 ],
			box = { top: 0, left: 0 },
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// Support: BlackBerry 5, iOS 3 (original iPhone)
		// If we don't have gBCR, just use 0,0 rather than error
		if ( typeof elem.getBoundingClientRect !== strundefined ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top + win.pageYOffset - docElem.clientTop,
			left: box.left + win.pageXOffset - docElem.clientLeft
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// Assume getBoundingClientRect is there when computed position is fixed
			offset = elem.getBoundingClientRect();

		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || docElem;
		});
	}
});

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : window.pageXOffset,
					top ? val : window.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

// Support: Safari<7+, Chrome<37+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://code.google.com/p/chromium/issues/detail?id=229280
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );
				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
});


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});


// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	});
}




var
	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( typeof noGlobal === strundefined ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;

}));

/*!
 * Bootstrap v3.3.6 (http://getbootstrap.com)
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 2)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 3')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.6
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.6
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.6'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.6
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.6'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target)
      if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"]') || $(e.target).is('input[type="checkbox"]'))) e.preventDefault()
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.6
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.6'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.6
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.6'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.6
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.6'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.6
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.6'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.6
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.6'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      that.$element
        .removeAttr('aria-describedby')
        .trigger('hidden.bs.' + that.type)
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var elOffset  = isBody ? { top: 0, left: 0 } : $element.offset()
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.6
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.6'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.6
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.6'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.6
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.6'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.6
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2015 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.6'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/**!
 * @preserve nanoGALLERY v5.9.1
 * Plugin for jQuery by Christophe Brisbois
 * Demo: http://nanogallery.brisbois.fr
 * Sources: https://github.com/Kris-B/nanoGALLERY
 *
 * License: For personal, non-profit organizations, or open source projects (without any kind of fee), you may use nanoGALLERY for jQuery for free.
 * -------- ALL OTHER USES REQUIRE THE PURCHASE OF A PROFESSIONAL LICENSE.
 *
 *
 * Components:
 *  - jQuery (http://www.jquery.com) - version >= 1.7.1
 *  - jQuery Color plugin - is embedded
 *  - imagesloaded (https://github.com/desandro/imagesloaded) - is embebed
 *  - screenfull.js (https://github.com/sindresorhus/screenfull.js) - is embeded
 *  - shifty (https://github.com/jeremyckahn/shifty) - is embeded
 *  - webfont generated by http://fontello.com - based on Font Awesome Copyright (C) 2012 by Dave Gandy (http://fortawesome.github.com/Font-Awesome/)
 *  - javascript minifying: grunt-contrib-uglify (https://github.com/gruntjs/grunt-contrib-uglify)
 *  - css minifying: grunt-contrib-cssmin (https://github.com/gruntjs/grunt-contrib-cssmin)
 */


/*

nanoGALLERY v5.9.1 release notes.

- bugfix: issue #97 - ThumbnailL1 issue  
- bugfix: images incorrectly displayed in some cases


**Visit nanoGALLERY homepage for usage details: [http://nanogallery.brisbois.fr](http://www.nanogallery.brisbois.fr/)**

*/

/*!
 * Shifty
 * By Jeremy Kahn - jeremyckahn@gmail.com
 */

// NG BUILD:
//
// replace "Tweenable" with "NGTweenable"
// replace "define.amd" with "define.amdDISABLED"
/*! shifty - v1.5.0 - 2015-05-31 - http://jeremyckahn.github.io/shifty */
(function(){var t=this,n=function(){"use strict";function n(){}function e(t,n){var e;for(e in t)Object.hasOwnProperty.call(t,e)&&n(e)}function i(t,n){return e(n,function(e){t[e]=n[e]}),t}function r(t,n){e(n,function(e){t[e]===void 0&&(t[e]=n[e])})}function o(t,n,e,i,r,o,u){var s,c,h,p=o>t?0:(t-o)/r;for(s in n)n.hasOwnProperty(s)&&(c=u[s],h="function"==typeof c?c:f[c],n[s]=a(e[s],i[s],h,p));return n}function a(t,n,e,i){return t+(n-t)*e(i)}function u(t,n){var i=h.prototype.filter,r=t._filterArgs;e(i,function(e){i[e][n]!==void 0&&i[e][n].apply(t,r)})}function s(t,n,e,i,r,a,s,c,h,f,p){g=n+e+i,y=Math.min(p||d(),g),v=y>=g,M=i-(g-y),t.isPlaying()&&!v?(t._scheduleId=f(t._timeoutHandler,m),u(t,"beforeTween"),n+e>y?o(1,r,a,s,1,1,c):o(y,r,a,s,i,n+e,c),u(t,"afterTween"),h(r,t._attachment,M)):t.isPlaying()&&v&&(h(s,t._attachment,M),t.stop(!0))}function c(t,n){var i={},r=typeof n;return"string"===r||"function"===r?e(t,function(t){i[t]=n}):e(t,function(t){i[t]||(i[t]=n[t]||l)}),i}function h(t,n){this._currentState=t||{},this._configured=!1,this._scheduleFunction=p,n!==void 0&&this.setConfig(n)}var f,p,l="linear",_=500,m=1e3/60,w=Date.now?Date.now:function(){return+new Date},d="undefined"!=typeof SHIFTY_DEBUG_NOW?SHIFTY_DEBUG_NOW:w;p="undefined"!=typeof window?window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozCancelRequestAnimationFrame&&window.mozRequestAnimationFrame||setTimeout:setTimeout;var g,y,v,M;return h.prototype.tween=function(t){return this._isTweening?this:(void 0===t&&this._configured||this.setConfig(t),this._timestamp=d(),this._start(this.get(),this._attachment),this.resume())},h.prototype.setConfig=function(t){t=t||{},this._configured=!0,this._attachment=t.attachment,this._pausedAtTime=null,this._scheduleId=null,this._delay=t.delay||0,this._start=t.start||n,this._step=t.step||n,this._finish=t.finish||n,this._duration=t.duration||_,this._currentState=i({},t.from)||this.get(),this._originalState=this.get(),this._targetState=i({},t.to)||this.get();var e=this;this._timeoutHandler=function(){s(e,e._timestamp,e._delay,e._duration,e._currentState,e._originalState,e._targetState,e._easing,e._step,e._scheduleFunction)};var o=this._currentState,a=this._targetState;return r(a,o),this._easing=c(o,t.easing||l),this._filterArgs=[o,this._originalState,a,this._easing],u(this,"tweenCreated"),this},h.prototype.get=function(){return i({},this._currentState)},h.prototype.set=function(t){this._currentState=t},h.prototype.pause=function(){return this._pausedAtTime=d(),this._isPaused=!0,this},h.prototype.resume=function(){return this._isPaused&&(this._timestamp+=d()-this._pausedAtTime),this._isPaused=!1,this._isTweening=!0,this._timeoutHandler(),this},h.prototype.seek=function(t){t=Math.max(t,0);var n=d();return 0===this._timestamp+t?this:(this._timestamp=n-t,this.isPlaying()||(this._isTweening=!0,this._isPaused=!1,s(this,this._timestamp,this._delay,this._duration,this._currentState,this._originalState,this._targetState,this._easing,this._step,this._scheduleFunction,n),this.pause()),this)},h.prototype.stop=function(e){return this._isTweening=!1,this._isPaused=!1,this._timeoutHandler=n,(t.cancelAnimationFrame||t.webkitCancelAnimationFrame||t.oCancelAnimationFrame||t.msCancelAnimationFrame||t.mozCancelRequestAnimationFrame||t.clearTimeout)(this._scheduleId),e&&(u(this,"beforeTween"),o(1,this._currentState,this._originalState,this._targetState,1,0,this._easing),u(this,"afterTween"),u(this,"afterTweenEnd"),this._finish.call(this,this._currentState,this._attachment)),this},h.prototype.isPlaying=function(){return this._isTweening&&!this._isPaused},h.prototype.setScheduleFunction=function(t){this._scheduleFunction=t},h.prototype.dispose=function(){var t;for(t in this)this.hasOwnProperty(t)&&delete this[t]},h.prototype.filter={},h.prototype.formula={linear:function(t){return t}},f=h.prototype.formula,i(h,{now:d,each:e,tweenProps:o,tweenProp:a,applyFilter:u,shallowCopy:i,defaults:r,composeEasingObject:c}),"function"==typeof SHIFTY_DEBUG_NOW&&(t.timeoutHandler=s),"object"==typeof exports?module.exports=h:"function"==typeof define&&define.amd?define('ngTweenable', function(){return h}):t.NGTweenable===void 0&&(t.NGTweenable=h),h}();(function(){n.shallowCopy(n.prototype.formula,{easeInQuad:function(t){return Math.pow(t,2)},easeOutQuad:function(t){return-(Math.pow(t-1,2)-1)},easeInOutQuad:function(t){return 1>(t/=.5)?.5*Math.pow(t,2):-.5*((t-=2)*t-2)},easeInCubic:function(t){return Math.pow(t,3)},easeOutCubic:function(t){return Math.pow(t-1,3)+1},easeInOutCubic:function(t){return 1>(t/=.5)?.5*Math.pow(t,3):.5*(Math.pow(t-2,3)+2)},easeInQuart:function(t){return Math.pow(t,4)},easeOutQuart:function(t){return-(Math.pow(t-1,4)-1)},easeInOutQuart:function(t){return 1>(t/=.5)?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeInQuint:function(t){return Math.pow(t,5)},easeOutQuint:function(t){return Math.pow(t-1,5)+1},easeInOutQuint:function(t){return 1>(t/=.5)?.5*Math.pow(t,5):.5*(Math.pow(t-2,5)+2)},easeInSine:function(t){return-Math.cos(t*(Math.PI/2))+1},easeOutSine:function(t){return Math.sin(t*(Math.PI/2))},easeInOutSine:function(t){return-.5*(Math.cos(Math.PI*t)-1)},easeInExpo:function(t){return 0===t?0:Math.pow(2,10*(t-1))},easeOutExpo:function(t){return 1===t?1:-Math.pow(2,-10*t)+1},easeInOutExpo:function(t){return 0===t?0:1===t?1:1>(t/=.5)?.5*Math.pow(2,10*(t-1)):.5*(-Math.pow(2,-10*--t)+2)},easeInCirc:function(t){return-(Math.sqrt(1-t*t)-1)},easeOutCirc:function(t){return Math.sqrt(1-Math.pow(t-1,2))},easeInOutCirc:function(t){return 1>(t/=.5)?-.5*(Math.sqrt(1-t*t)-1):.5*(Math.sqrt(1-(t-=2)*t)+1)},easeOutBounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},easeInBack:function(t){var n=1.70158;return t*t*((n+1)*t-n)},easeOutBack:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},easeInOutBack:function(t){var n=1.70158;return 1>(t/=.5)?.5*t*t*(((n*=1.525)+1)*t-n):.5*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)},elastic:function(t){return-1*Math.pow(4,-8*t)*Math.sin((6*t-1)*2*Math.PI/2)+1},swingFromTo:function(t){var n=1.70158;return 1>(t/=.5)?.5*t*t*(((n*=1.525)+1)*t-n):.5*((t-=2)*t*(((n*=1.525)+1)*t+n)+2)},swingFrom:function(t){var n=1.70158;return t*t*((n+1)*t-n)},swingTo:function(t){var n=1.70158;return(t-=1)*t*((n+1)*t+n)+1},bounce:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?7.5625*(t-=1.5/2.75)*t+.75:2.5/2.75>t?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375},bouncePast:function(t){return 1/2.75>t?7.5625*t*t:2/2.75>t?2-(7.5625*(t-=1.5/2.75)*t+.75):2.5/2.75>t?2-(7.5625*(t-=2.25/2.75)*t+.9375):2-(7.5625*(t-=2.625/2.75)*t+.984375)},easeFromTo:function(t){return 1>(t/=.5)?.5*Math.pow(t,4):-.5*((t-=2)*Math.pow(t,3)-2)},easeFrom:function(t){return Math.pow(t,4)},easeTo:function(t){return Math.pow(t,.25)}})})(),function(){function t(t,n,e,i,r,o){function a(t){return((l*t+_)*t+m)*t}function u(t){return((w*t+d)*t+g)*t}function s(t){return(3*l*t+2*_)*t+m}function c(t){return 1/(200*t)}function h(t,n){return u(p(t,n))}function f(t){return t>=0?t:0-t}function p(t,n){var e,i,r,o,u,c;for(r=t,c=0;8>c;c++){if(o=a(r)-t,n>f(o))return r;if(u=s(r),1e-6>f(u))break;r-=o/u}if(e=0,i=1,r=t,e>r)return e;if(r>i)return i;for(;i>e;){if(o=a(r),n>f(o-t))return r;t>o?e=r:i=r,r=.5*(i-e)+e}return r}var l=0,_=0,m=0,w=0,d=0,g=0;return m=3*n,_=3*(i-n)-m,l=1-m-_,g=3*e,d=3*(r-e)-g,w=1-g-d,h(t,c(o))}function e(n,e,i,r){return function(o){return t(o,n,e,i,r,1)}}n.setBezierFunction=function(t,i,r,o,a){var u=e(i,r,o,a);return u.displayName=t,u.x1=i,u.y1=r,u.x2=o,u.y2=a,n.prototype.formula[t]=u},n.unsetBezierFunction=function(t){delete n.prototype.formula[t]}}(),function(){function t(t,e,i,r,o,a){return n.tweenProps(r,e,t,i,1,a,o)}var e=new n;e._filterArgs=[],n.interpolate=function(i,r,o,a,u){var s=n.shallowCopy({},i),c=u||0,h=n.composeEasingObject(i,a||"linear");e.set({});var f=e._filterArgs;f.length=0,f[0]=s,f[1]=i,f[2]=r,f[3]=h,n.applyFilter(e,"tweenCreated"),n.applyFilter(e,"beforeTween");var p=t(i,s,r,o,h,c);return n.applyFilter(e,"afterTween"),p}}(),function(t){function n(t,n){var e,i=[],r=t.length;for(e=0;r>e;e++)i.push("_"+n+"_"+e);return i}function e(t){var n=t.match(M);return n?(1===n.length||t[0].match(v))&&n.unshift(""):n=["",""],n.join(O)}function i(n){t.each(n,function(t){var e=n[t];"string"==typeof e&&e.match(S)&&(n[t]=r(e))})}function r(t){return s(S,t,o)}function o(t){var n=a(t);return"rgb("+n[0]+","+n[1]+","+n[2]+")"}function a(t){return t=t.replace(/#/,""),3===t.length&&(t=t.split(""),t=t[0]+t[0]+t[1]+t[1]+t[2]+t[2]),b[0]=u(t.substr(0,2)),b[1]=u(t.substr(2,2)),b[2]=u(t.substr(4,2)),b}function u(t){return parseInt(t,16)}function s(t,n,e){var i=n.match(t),r=n.replace(t,O);if(i)for(var o,a=i.length,u=0;a>u;u++)o=i.shift(),r=r.replace(O,e(o));return r}function c(t){return s(T,t,h)}function h(t){for(var n=t.match(F),e=n.length,i=t.match(I)[0],r=0;e>r;r++)i+=parseInt(n[r],10)+",";return i=i.slice(0,-1)+")"}function f(i){var r={};return t.each(i,function(t){var o=i[t];if("string"==typeof o){var a=d(o);r[t]={formatString:e(o),chunkNames:n(a,t)}}}),r}function p(n,e){t.each(e,function(t){for(var i=n[t],r=d(i),o=r.length,a=0;o>a;a++)n[e[t].chunkNames[a]]=+r[a];delete n[t]})}function l(n,e){t.each(e,function(t){var i=n[t],r=_(n,e[t].chunkNames),o=m(r,e[t].chunkNames);i=w(e[t].formatString,o),n[t]=c(i)})}function _(t,n){for(var e,i={},r=n.length,o=0;r>o;o++)e=n[o],i[e]=t[e],delete t[e];return i}function m(t,n){k.length=0;for(var e=n.length,i=0;e>i;i++)k.push(t[n[i]]);return k}function w(t,n){for(var e=t,i=n.length,r=0;i>r;r++)e=e.replace(O,+n[r].toFixed(4));return e}function d(t){return t.match(F)}function g(n,e){t.each(e,function(t){var i,r=e[t],o=r.chunkNames,a=o.length,u=n[t];if("string"==typeof u){var s=u.split(" "),c=s[s.length-1];for(i=0;a>i;i++)n[o[i]]=s[i]||c}else for(i=0;a>i;i++)n[o[i]]=u;delete n[t]})}function y(n,e){t.each(e,function(t){var i=e[t],r=i.chunkNames,o=r.length,a=n[r[0]],u=typeof a;if("string"===u){for(var s="",c=0;o>c;c++)s+=" "+n[r[c]],delete n[r[c]];n[t]=s.substr(1)}else n[t]=a})}var v=/(\d|\-|\.)/,M=/([^\-0-9\.]+)/g,F=/[0-9.\-]+/g,T=RegExp("rgb\\("+F.source+/,\s*/.source+F.source+/,\s*/.source+F.source+"\\)","g"),I=/^.*\(/,S=/#([0-9]|[a-f]){3,6}/gi,O="VAL",b=[],k=[];t.prototype.filter.token={tweenCreated:function(t,n,e){i(t),i(n),i(e),this._tokenData=f(t)},beforeTween:function(t,n,e,i){g(i,this._tokenData),p(t,this._tokenData),p(n,this._tokenData),p(e,this._tokenData)},afterTween:function(t,n,e,i){l(t,this._tokenData),l(n,this._tokenData),l(e,this._tokenData),y(i,this._tokenData)}}}(n)}).call(null);


// ##########################################
// ##### nanoGALLERY as a JQUERY PLUGIN #####
// ##########################################
//;(function ($) {
;(function(factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
		define('jqueryNanoGallery', ['jquery', 'ngTweenable'], factory);
	}
	else {
    // No AMD. Register plugin with global jQuery object.
		factory(jQuery, window.NGTweenable);
	}
})(function($, NGTweenable) {

  jQuery.nanoGallery = function(elt, options){
    // To avoid scope issues, use '_this' instead of 'this'
    // to reference this class from internal events and functions.
    var _this = this;

    // Access to jQuery and DOM versions of element
    _this.$e = $(elt);
    _this.e = elt;

    // Add a reverse reference to the DOM object
    _this.$e.data('nanoGallery', _this);

    _this.init = function(){
      _this.options = $.extend(true, {},$.nanoGallery.defaultOptions, options);
      // Initialization code
      _this.nG= new nanoGALLERY();
      _this.nG.Initiate(_this.e, _this.options );
    };

    // PUBLIC EXPOSED METHODS
    _this.test = function() {
      //alert('test');
      // console.dir(_this.nG.G.I.length);
      // console.dir(_this.nG);
      //privateTest();
    }


    // Run initializer
    _this.init();
  };

  jQuery.nanoGallery.defaultOptions = {
    userID : '',
    kind : '',
    album : '',
    photoset : '',
    blackList : 'scrapbook|profil', whiteList : '', albumList : '',
    RTL : false,
    picasaUseUrlCrossDomain : true,
    flickrSkipOriginal : true,
    galleryToolbarWidthAligned : true, galleryToolbarHideIcons : false,
    galleryFullpageButton : false, galleryFullpageBgColor : '#111',
    galleryEnableKeyboard : false,
    galleryRenderStep : 10,
    breadcrumbAutoHideTopLevel : false,
    displayBreadcrumb : false,
    theme : 'default',
    colorScheme : 'none', colorSchemeViewer : 'default',
    items : null,
    itemsBaseURL : '',
    itemsSelectable : false, showCheckboxes: true, checkboxStyle : 'left:15px; top:15px;',
    keepSelection: false,
    jsonCharset: 'Latin', jsonProvider: '',
    paginationMaxLinesPerPage : 0, paginationDots : false, paginationSwipe : true,
    maxWidth : 0,
    viewer : 'internal',
    viewerFullscreen: false,
    viewerDisplayLogo : false,
    fancyBoxOptions : null,
    imageTransition : 'slide',
    openOnStart : '',
    viewerToolbar : {
      display:true, position : 'bottom', style : 'innerImage', autoMinimize:800,
      standard:'minimizeButton , previousButton, pageCounter ,nextButton,playPauseButton,fullscreenButton,infoButton,linkOriginalButton,closeButton,label',
      minimized:'minimizeButton,label'
    },
    thumbnailAlignment : 'center',
    thumbnailWidth : 230, thumbnailHeight : 154,
    thumbnailGutterWidth : 2, thumbnailGutterHeight : 2,
    thumbnailAdjustLastRowHeight : true,
    thumbnailFeatured : false,
    thumbnailAlbumDisplayImage : false,
    thumbnailHoverEffect : null,
    thumbnailLabel : { position : 'overImageOnBottom', display : true, displayDescription : true, titleMaxLength : 0, descriptionMaxLength : 0, hideIcons : false, title : '', itemsCount : '' },
    thumbnailDisplayInterval : 5, thumbnailDisplayTransition : true,
    thumbnailLazyLoad : false, thumbnailLazyLoadTreshold : 100,
    thumbnailGlobalImageTitle : '', thumbnailGlobalAlbumTitle : '',
    thumbnailOpenImage: true,
    //thumbnailSizeSM : 480, thumbnailSizeME : 992, thumbnailSizeLA : 1200, thumbnailSizeXL : 1800,
    breakpointSizeSM : 480, breakpointSizeME : 992, breakpointSizeLA : 1200, breakpointSizeXL : 1800,
    fnThumbnailInit : null, fnThumbnailHoverInit : null, fnThumbnailHoverResize : null, fnThumbnailHover : null, fnThumbnailHoverOut : null, fnThumbnailDisplayEffect : null,
    fnThumbnailOpen : null,
    fnViewerInfo : null,
    fnImgToolbarCustInit : null, fnImgToolbarCustDisplay : null, fnImgToolbarCustClick : null,
    fnProcessData : null,
    fnChangeSelectMode : null,
    fnInitGallery : null,
    touchAnimation : true, touchAutoOpenDelay : 0,
    useTags : false,
    preset : 'none',
    locationHash : true,
    demoViewportWidth : 0,
    slideshowDelay : 3000, slideshowAutoStart : false,
    photoSorting : '', albumSorting : '', dataSorting : '',
    albumMax: 0,
    lazyBuild : 'none', lazyBuildTreshold : 150,
    debugMode: false,
    i18n : {
      'breadcrumbHome' : 'Galleries', 'breadcrumbHome_FR' : 'Galeries',
      'paginationPrevious' : 'Previous', 'paginationPrevious_FR' : 'Pr&eacute;c&eacute;dent', 'paginationPrevious_DE' : 'Zur&uuml;ck', 'paginationPrevious_IT' : 'Indietro',
      'paginationNext' : 'Next', 'paginationNext_FR' : 'Suivant', 'paginationNext_DE' : 'Weiter', 'paginationNext_IT' : 'Avanti',
      'thumbnailLabelItemsCountPart1' : '', //'| ',
      'thumbnailLabelItemsCountPart2' : '', //' photos', 'thumbnailLabelItemsCountPart2_DE' : ' Fotos',
      'thumbnailImageTitle' : '', 'thumbnailAlbumTitle' : '',
      'thumbnailImageDescription' : '', 'thumbnailAlbumDescription' : '',
      'infoBoxPhoto' : 'Photo', 'infoBoxDate' : 'Date', 'infoBoxAlbum' : 'Album', 'infoBoxDimensions' : 'Dimensions', 'infoBoxFilename' : 'Filename', 'infoBoxFileSize' : 'File size', 'infoBoxCamera' : 'Camera', 'infoBoxFocalLength' : 'Focal length', 'infoBoxExposure' : 'Exposure', 'infoBoxFNumber' : 'F Number', 'infoBoxISO' : 'ISO', 'infoBoxMake' : 'Make', 'infoBoxFlash' : 'Flash', 'infoBoxViews' : 'Views', 'infoBoxComments' : 'Comments'
    }
  };

  jQuery.fn.nanoGallery = function (args, option, value) {
    // jQuery.fn.nanoGallery = function(options){
    // if( typeof(options) !== 'undefined'){
    if( typeof $(this).data('nanoGallery') === 'undefined'){
      return this.each( function(){
        (new $.nanoGallery(this, args));
      });
    }
    else {
      // no options -->
      // This function breaks the chain, but provides some API methods

      switch(args){
        case 'reload':
          $(this).data('nanoGallery').nG.ReloadAlbum();
          return $(this);
          break;
        case 'refreshSize':
          $(this).data('nanoGallery').nG.RefreshSize();
          return $(this);
          break;
        case 'getSelectedItems':
          return $(this).data('nanoGallery').nG.GetSelectedItems();
          break;
        case 'selectItems':
          $(this).data('nanoGallery').nG.SetSelectedItems(option);
          break;
        case 'unselectItems':
          $(this).data('nanoGallery').nG.SetUnselectedItems(option);
          break;
        case 'setSelectMode':
          if(option === true || option === false || option === 'image' || option === 'album'){
            $(this).data('nanoGallery').nG.SetSelectMode(option);
          }
          break;
        case 'getSelectMode':
          return $(this).data('nanoGallery').nG.GetSelectMode();
          break;
        case 'getItem':
          return $(this).data('nanoGallery').nG.GetItem(option);
          break;
        case 'getItems':
          return $(this).data('nanoGallery').nG.GetItems();
          break;
        case 'getItemsIndex':
          return $(this).data('nanoGallery').nG.GetItemsIndex(option);
          break;
        case 'option':
          if(typeof value === 'undefined'){
            return $(this).data('nanoGallery').nG.Get(option);
          }else{
            $(this).data('nanoGallery').nG.Set(option,value);
            if( option == 'demoViewportWidth' ) {
              // force resize event -> for demo purposes
              $(window).trigger('resize');
            }
          }
          break;
        case 'destroy':
          $(this).data('nanoGallery').nG.$E.base.text('');
          $(this).removeData();
          break;
        case 'closeViewer':
          $(this).data('nanoGallery').nG.closeViewer();
          break;
        case 'minimizeToolbar':
          $(this).data('nanoGallery').nG.minimizeToolbar();
          break;
        case 'maximizeToolbar':
          $(this).data('nanoGallery').nG.maximizeToolbar();
          break;
        case 'displayItem':
          $(this).data('nanoGallery').nG.displayItem(option);
          break;
        case 'paginationPreviousPage':
          $(this).data('nanoGallery').nG.paginationPreviousPage();
          break;
        case 'paginationNextPage':
          $(this).data('nanoGallery').nG.paginationNextPage();
          break;
        case 'paginationGotoPage':
          $(this).data('nanoGallery').nG.paginationGotoPage(option);
          break;
        case 'paginationCountPages':
          return $(this).data('nanoGallery').nG.paginationCountPages();
          break;
        case 'getCurrentViewedItem':
          return $(this).data('nanoGallery').nG.GetCurrentViewedItem();
          break;
        case 'getCurrentViewedItemIdx':
          return $(this).data('nanoGallery').nG.GetCurrentViewedItemIdx();
          break;
        case 'moveToNextAlbum':
          return $(this).data('nanoGallery').nG.moveToNextAlbum();
          break;
        case 'moveToPreviousAlbum':
          return $(this).data('nanoGallery').nG.moveToPreviousAlbum();
          break;
        case 'galleryCountImages':
          return $(this).data('nanoGallery').nG.galleryCountImages();
          break;
      }
      return $(this);

    }
  };


  // ##############################
  // ##### nanoGALLERY script #####
  // ##############################

  function privateTest() {
    alert('privateTest');
    console.dir(G);
  }


  function nanoGALLERY() {

    /**
    * Force reload the current album, if provided by Json
    */
    this.ReloadAlbum = function(){
      if( G.O.kind === '' ) {
        throw 'Not supported for this kind.';
      }

      var l=G.I.length;
      var albumIdx =-1;
      // find current album index
      for( var j=0; j<l ; j++) {
        if( G.lastOpenAlbumID == G.I[j].GetID() ) {
          albumIdx=j;
          break;
        }
      }
      if( albumIdx == -1 ) {
        throw ('Current album not found.');
      }

      // unselect everything & remove link to album (=logical delete)
      if(G.O.keepSelection === false){
        G.selectedItems=[];
      }
      for( var i=0; i < l ; i++ ) {
        if(G.O.keepSelection === false){
          G.I[i].selected = false;
        }
        if( G.I[i].albumID == albumIdx ) {
          G.I[i].albumID = -1;    // remove link to parent album
        }
      }

      G.I[albumIdx].contentIsLoaded = false;

      G.lastOpenAlbumID = -1;
      switch(G.O.kind) {
        case 'json':
          return JsonProcessItems(albumIdx, false, -1, false, true);
        case 'flickr':
          return FlickrProcessItems(albumIdx, false, -1, false, true);
        case 'picasa':
        default:
          return PicasaProcessItems(albumIdx, false, -1, false, true);
      }

    };

    /**
    * When in Album view, moves to next album
    */
    this.moveToNextAlbum = function () {
      DisplayNextAlbum();
    }

    /**
    * When in Album view, moves to previous album
    */
    this.moveToPreviousAlbum = function () {
      DisplayPreviousAlbum();
    }


    // Closes the image viewer
    this.closeViewer = function () {
      CloseInternalViewer(true);
      return false;
    };

    // Toggle Toolbar between standard and minimized
    this.minimizeToolbar = function () {
      ToolbarVisibilityMin();
      return false;
    };

    // Toggle Toolbar between standard and minimized
    this.maximizeToolbar = function () {
      ToolbarVisibilityStd();
      return false;
    };

    /**
    * Force recheck of container size and resize accordingly
    */
    this.RefreshSize = function(){
      ResizeGallery();
    }

    // Display one item
    // itemID syntax:
    //    - albumID --> display one album
    //    - albumID/imageID --> display one image
    this.displayItem = function( itemID ){
      return OpenItem( false, itemID, true );
    };


    // manage gallery pagination

    // Pagination - goto previous page
    this.paginationPreviousPage = function () {
      paginationPreviousPage();
    };
    // Pagination - goto next page
    this.paginationNextPage = function () {
      paginationNextPage();
    };
    // Pagination - goto specific page
    this.paginationGotoPage = function ( page ) {
      var aIdx=G.$E.conPagin.data('galleryIdx');
      if( !inViewportVert(G.$E.base, 0) ) {
        $('html, body').animate({scrollTop: G.$E.base.offset().top}, 200);
      }
      if( page > 1 ) { page--; }
      renderGallery(aIdx, page);
    };
    // Pagination - count number of pages
    this.paginationCountPages = function () {
      var aIdx=G.$E.conPagin.data('galleryIdx'),
      n1=0;

      // pagination - max lines per page mode
      if( G.pgMaxLinesPerPage > 0 ) {
        n1=G.I[aIdx].contentLength / (G.pgMaxLinesPerPage * G.pgMaxNbThumbnailsPerRow);
      }
      n2=Math.ceil(n1);
      return n2;
    };

    // Viewer - Count number of images
    this.galleryCountImages = function () {
      return galleryCountImages();
    }

    /**
     * Get an item by its index
     * @param {int} index
     * @returns {object}
     */
    this.GetItem = function(index){
      if(isNaN(index)){
        throw 'index must be a number';
      }
      return G.I[index];
    };

    /**
     * Get an array of every items handled by nanoGallery
     * @returns {nanoGALLERY.G.I|Array}
     */
    this.GetItems = function(){
      return G.I;
    };

    /**
     * Get the index of an item in the G.I array
     * @param {object} items
     * @returns {array}
     */
    this.GetItemsIndex = function( items ){
      var indexes = [];
      var l=items.length;
      for( var j=0; j<l ; j++) {
        if( isNaN(items[j]) ) {
          index = G.I.indexOf(items[j]);
        }
        else {
          index = items[j];
        }
        if( isNaN(index) ){
          throw 'This item does not exists';
        }
        indexes.push(index);
      }
      return indexes;
    };

    /**
     * Set one or several items selected
     * @param {array} items
     */
    this.SetSelectedItems = function(items){
      var l=items.length;
      for( var j=0; j<l ; j++) {
        if( items[j].$elt !== null ) {
          thumbnailSelection(items[j], true);
        }
      }
    };

    /**
     * Set one or several items unselected
     * @param {array} items
     */
    this.SetUnselectedItems = function(items){
      var l=items.length;
      for( var j=0; j<l ; j++) {
        if( items[j].$elt !== null ) {
          thumbnailSelection(items[j], false);
        }
      }
    };

    /**
     * Returns an array of selected items
     * @returns {Array}
     */
    this.GetSelectedItems = function(){
      return G.selectedItems;
    };

    /**
     * Returns current item of image in viewer
     * @returns {int}
     */
    this.GetCurrentViewedItem = function(){
      if( G.containerViewerDisplayed ) {
        return G.I[G.viewerCurrentItemIdx];
      }
      else {
        return null;
      }
    };
    /**
     * Returns current index of image in viewer
     * @returns {int}
     */
    this.GetCurrentViewedItemIdx = function(){
      if( G.containerViewerDisplayed ) {
        return G.viewerCurrentItemIdx;
      }
      else {
        return -1;
      }
    };

    /**
     * Returns the value of an option
     * @param {string} option
     * @returns {nanoGALLERY.G.O}
     */
    this.Get = function(option){
        return G.O[option];
    };

    /**
     * Set a new value for a defined option
     * @param {string} option
     */
    this.Set = function(option,value){
        G.O[option] = value;
    };

    this.SetSelectMode = function(value){
      if(typeof value == 'undefined'){
        if(G.selectModeForce === true){
          value = G.selectMode;
        }
      }
      if(value === true || value === false || value === 'image' ||
                  value === 'album'){
        G.selectModeForce = (value!==false);
        G.selectMode = value;
        if(value === 'album' || value == 'image'){
          G.$E.base.find('.nanoGalleryThumbnailContainer').each(function(){
            if(($(this).hasClass('album') && value === 'image') ||
                (!$(this).hasClass('album') && value === 'album')){
              $(this).addClass('unselectable');
            }else{
              $(this).removeClass('unselectable');
            }
          });
        }else{
          G.$E.base.find('.nanoGalleryThumbnailContainer').removeClass('unselectable');
        }
        if(G.O.keepSelection === false || value === false){
          this.SetUnselectedItems(G.I);
        }
        if (typeof G.O.fnChangeSelectMode === 'function'){
          G.O.fnChangeSelectMode(G.selectMode);
        }
      }
    };

    this.GetSelectMode = function(){
      return G.selectMode;
    };

    // Global data for this nanoGALLERY instance
    var G=this;
    G.I = [];                   // gallery items
    G.O = null;                 // user options
    G.$E = {
      base: null,             // $g_baseControl = null,
      conTnParent: null,      // $g_containerThumbnailsParent
      conLoadingB: null,      // loading bar - nanoGalleryLBarOff
      conConsole: null,       // $g_containerConsole
      conTn: null,            // $g_containerThumbnails
      conTnHid: null,         // $g_containerThumbnailsHidden
      conPagin: null,         // $g_containerPagination
      conBC: null,            // $g_containerBreadcrumb
      conNavB: null,          // $g_containerNavigationbar
      conNavBCon: null,       // $g_containerNavigationbarCont
      conNavBFullpage: null,  // breadcrumb fullpage button
      conVwCon: null,         // $g_containerViewerContainer
      conVw: null,            // $g_containerViewer
      conVwTb: null,          // $g_containerViewerToolbar
      vwImgP: null,           // $g_ViewerImagePrevious
      vwImgN: null,           // $g_ViewerImageNext
      vwImgC: null,           // $g_ViewerImageCurrent
      vwContent: null,        // $g_containerViewerContent
      vwLogo: null            // $g_containerViewerLogo
    };
    G.i18nTranslations = {'paginationPrevious':'Previous', 'paginationNext':'Next', 'breadcrumbHome':'List of Albums', 'thumbnailImageTitle':'', 'thumbnailAlbumTitle':'', 'thumbnailImageDescription':'', 'thumbnailAlbumDescription':'' }
    G.$currentTouchedThumbnail = null;  // currently touched thumbnail
    G.baseEltID = null;
    G.containerTags = null;
    G.containerNavigationbarContDisplayed = false;
    G.containerViewerDisplayed = false;
    G.containerThumbnailsDisplayed = false;
    G.tn = {                          // GENERAL THUMBNAILS PROPERTIES
      displayInterval: 30,            // delay between 2 thumbnails display
      lazyLoadTreshold: 100,          // image lazy load treshold in pixel
      scale: 1,                       // image scale depending of the hover effect
      borderWidth: 0,                 // thumbnail container border width
      borderHeight: 0,                // thumbnail container border height
      imgcBorderHeight: 0,            // image container border height
      imgcBorderWidth:0 ,             // image container border width
      labelHeight: {                  // in case label on bottom, otherwise=0
        l1:0, lN:0,
        get: function() {
          return G.tn.labelHeight[G.curNavLevel];
        }
      },
      outerWidth: {                   // default thumbnail outerWidths (not used in case thumbnailWidth='auto'
        l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 },
        get: function() {
          return G.tn.outerWidth[G.curNavLevel][G.curWidth];
        }
      },
      outerHeight: {                  // default thumbnail outerHeights (not used in case thumbnailHeight='auto'
        l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 },
        get: function() {
          return G.tn.outerHeight[G.curNavLevel][G.curWidth];
        }
      },
      settings: {                     // user defined width/height to display depending on the screen size
        width: {  l1 : { xs:0, sm:0, me:0, la:0, xl:0, xsc:'u', smc:'u', mec:'u', lac:'u', xlc:'u' },
                  lN : { xs:0, sm:0, me:0, la:0, xl:0, xsc:'u', smc:'u', mec:'u', lac:'u', xlc:'u' } },
        height: { l1 : { xs:0, sm:0, me:0, la:0, xl:0, xsc:'u', smc:'u', mec:'u', lac:'u', xlc:'u' },
                  lN : { xs:0, sm:0, me:0, la:0, xl:0, xsc:'u', smc:'u', mec:'u', lac:'u', xlc:'u' } },
        getH: function() {
          return G.tn.settings.height[G.curNavLevel][G.curWidth];
        },
        getW: function() {
          return G.tn.settings.width[G.curNavLevel][G.curWidth];
        }
      },
      getHE: function() {
        if( G.curNavLevel == 'l1' && G.tnL1HE.length !== 0 ) {
          return G.tnL1HE;
        }
        return G.tnHE;
      },
      styleFTitle: '', styleITitle: '', styleDesc: '', styleLabelImage: '',
      styleL1FTitle: '', styleL1ITitle: '', styleL1Desc: '', styleL1LabelImage: ''
    };
    G.tnHE = [];                      // Thumbnail hover effects
    G.tnL1HE = [];                    // Thumbnail hover effects - Level 1
    G.L = {                           // Layout informations
      nbMaxTnPerRow: 0
    };
    G.blackList = null;
    G.whiteList = null;
    G.albumList = null;
    G.galleryItemsCount = 0;
    G.toolbarMode = 'std';            // image toolbar display mode
    G.playSlideshow = false;          // slideshow mode
    G.playSlideshowTimerID = 0;       // slideshow mode timer ID
    G.slideshowDelay = 3000;          // slideshow mode delay
    G.touchAutoOpenDelayTimerID = 0;
    G.supportFullscreenAPI = false;


    G.viewerIsFullscreen = false;
    G.bodyOverflowInitial = null;
    G.i18nLang = '';
    G.timeImgChanged = 0;
    G.timeLastTouchStart = 0;
    G.pgMaxNbThumbnailsPerRow = 1;
    G.pgMaxLinesPerPage = 0;
    G.lastOpenAlbumID = -1;
    G.lastLocationHash = '';
    G.touchSelectTO = null;
    G.viewerImageIsChanged = false;
    G.viewerResizeTimerID = -1;
    G.viewerResizeTimerLastRun = -1;
    G.viewerCurrentItemIdx = -1;
    G.imageSwipePosX = 0;
    G.albumIdxToOpenOnViewerClose = -1;
    G.custGlobals = {};
    G.delayedAlbumIdx = -1;
    G.curAlbumIdx = -1;
    G.delayedSetLocationHash = false;
    G.viewerSwipe = null;
    G.isShiftPressed = false;
    G.isAltPressed = false;
    G.isCtrlPressed = false;
    G.isMetaPressed = false;
    G.selectedItems = [];
    G.aengine = 'animate';      // animation engine
    G.scrollTimeOut = 0;
    G.maxAlbums = 1000000;
    G.maxPhotos = 1000000;
    G.curNavLevel = 'l1';
    G.curWidth = 'me';
    G.gallerySwipeInitDone = false;
    G.emptyGif = 'data:image/gif;base64,R0lGODlhEAAQAIAAAP///////yH5BAEKAAEALAAAAAAQABAAAAIOjI+py+0Po5y02ouzPgUAOw==';
    G.CSStransformName = FirstSupportedPropertyName(["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform"]);
    G.CSStransformStyle = FirstSupportedPropertyName(["transformStyle", "msTransformStyle", "MozTransformStyle", "WebkitTransformStyle", "OTransformStyle"]);
    G.CSSperspective = FirstSupportedPropertyName(["perspective", "msPerspective", "MozPerspective", "WebkitPerspective", "OPerspective"]);
    G.CSSbackfaceVisibilityName = FirstSupportedPropertyName(["backfaceVisibility", "msBackfaceVisibility", "MozBackfaceVisibility", "WebkitBackfaceVisibility", "OBackfaceVisibility"]);
    G.CSStransitionName = FirstSupportedPropertyName(["transition", "msTransition", "MozTransition", "WebkitTransition", "OTransition"]);
    G.CSSanimationName = FirstSupportedPropertyName(["animation", "msAnimation", "MozAnimation", "WebkitAnimation", "OAnimation"]);
    /* IE detection. Copyright Julian Shapiro - Gist: https://gist.github.com/julianshapiro/9098609 */
    G.IE = (function() {
      if (document.documentMode) {
        return document.documentMode;
      }
      else {
        for (var i = 7; i > 4; i--) {
          var div = document.createElement("div");
          div.innerHTML = "<!--[if IE " + i + "]><span></span><![endif]-->";
          if (div.getElementsByTagName("span").length) {
            div = null;
            return i;
          }
        }
      }
      return undefined;
    })();
    G.IOSversion = (function() {
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
          var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
          return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      }
    })();

    G.isIOS = /(iPad|iPhone|iPod)/g.test( navigator.userAgent );
    G.isGingerbread= /Android 2\.3\.[3-7]/i.test(navigator.userAgent),
    G.openNoDelay= false,
    G.startDateTime= new Date(),
    G.toRender= [];

    // ### Picasa/Google+
    // square format : 32, 48, 64, 72, 104, 144, 150, 160 (cropped)
    // details: https://developers.google.com/picasa-web/docs/2.0/reference
    G.picasa = {
      url: function() {
        // return (location.protocol=='https:' ? 'https://picasaweb.google.com/data/feed/api/' : 'https://picasaweb.google.com/data/feed/api/');
        return ( G.O.picasaUseUrlCrossDomain ? 'https://photos.googleapis.com/data/feed/api/' : 'https://picasaweb.google.com/data/feed/api/');
      },
      thumbSize:64,
      thumbAvailableSizes : new Array(32, 48, 64, 72, 94, 104, 110, 128, 144, 150, 160, 200, 220, 288, 320, 400, 512, 576, 640, 720, 800, 912, 1024, 1152, 1280, 1440, 1600),
      thumbAvailableSizesCropped : ' 32 48 64 72 104 144 150 160 '
    };

    // ### Flickr
    // Details: http://www.flickr.com/services/api/misc.urls.html
    G.flickr = {
      url: function() {
        // Flickr API Going SSL-Only on June 27th, 2014
        return 'https://api.flickr.com/services/rest/';
      },
      thumbSize:'sq',
      thumbSizeX2 : 'sq',
      thumbAvailableSizes : new Array(75,100,150,240,500,640),
      thumbAvailableSizesStr : new Array('sq','t','q','s','m','z'),
      photoSize : 'sq',
      photoAvailableSizes : new Array(75,100,150,240,500,640,1024,1024,1600,2048),
      photoAvailableSizesStr : new Array('sq','t','q','s','m','z','b','l','h','k'),
      ApiKey : "2f0e634b471fdb47446abcb9c5afebdc"
    };

    // Color schemes - Gallery
    G.colorScheme_default = {
      navigationbar : { background:'none', borderTop:'1px solid #555', borderBottom:'1px solid #555', borderRight:'', borderLeft:'', color:'#ccc', colorHover:'#fff' },
      thumbnail : { background:'#000', border:'1px solid #000', labelBackground:'rgba(34, 34, 34, 0.75)', titleColor:'#eee', titleShadow:'', descriptionColor:'#ccc', descriptionShadow:'', paginationDotBorder:'2px solid #fff', paginationDotBack:'#444', paginationDotSelBack:'#fff'}    };
    G.colorScheme_darkRed = {
      // #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
      navigationbar : { background:'#a60000', border:'1px dotted #ff0000', color:'#ccc', colorHover:'#fff' },
      thumbnail : { background:'#a60000', border:'1px solid #ff0000', labelBackground:'rgba(134, 0, 0, 0.75)', titleColor:'#eee', titleShadow:'', descriptionColor:'#ccc', descriptionShadow:'', paginationDotBorder:'2px solid #d00', paginationDotBack:'#400', paginationDotSelBack:'#d00'}    };
    G.colorScheme_darkGreen = {
      // #97e697 #67e667 #39e639 #00cc00 #008500
      navigationbar : { background:'#008500', border:'1px dotted #00cc00', color:'#ccc', colorHover:'#fff' },
      thumbnail : { background:'#008500', border:'1px solid #00cc00', labelBackground:'rgba(0, 105, 0, 0.75)', titleColor:'#eee', titleShadow:'', descriptionColor:'#ccc', descriptionShadow:'', paginationDotBorder:'2px solid #0c0', paginationDotBack:'#008500', paginationDotSelBack:'#0c0'}    };
    G.colorScheme_darkBlue = {
      // #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
      navigationbar : { background:'#071871', border:'1px dotted #162ea2', color:'#ccc', colorHover:'#fff' },
      thumbnail : { background:'#071871', border:'1px solid #162ea2', labelBackground:'rgba(7, 8, 81, 0.75)', titleColor:'#eee', titleShadow:'', descriptionColor:'#ccc', descriptionShadow:'', paginationDotBorder:'2px solid #162ea2', paginationDotBack:'#071871', paginationDotSelBack:'#162ea2'}    };
    G.colorScheme_darkOrange = {
      // #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
      navigationbar : { background:'#a67600', border:'1px dotted #ffb600', color:'#ccc', colorHover:'#fff' },
      thumbnail : { background:'#a67600', border:'1px solid #ffb600', labelBackground:'rgba(134, 86, 0, 0.75)', titleColor:'#eee', titleShadow:'', descriptionColor:'#ccc', descriptionShadow:'', paginationDotBorder:'2px solid #ffb600', paginationDotBack:'#a67600', paginationDotSelBack:'#ffb600'}    };
    G.colorScheme_light = {
      navigationbar : { background:'none', borderTop:'1px solid #ddd', borderBottom:'1px solid #ddd', borderRight:'', borderLeft:'', color:'#777', colorHover:'#eee' },
      thumbnail : { background:'#fff', border:'1px solid #fff', labelBackground:'rgba(60, 60, 60, 0.75)', titleColor:'#fff', titleShadow:'none', descriptionColor:'#eee', descriptionShadow:'none', paginationDotBorder:'2px solid #555', paginationDotBack:'#888', paginationDotSelBack:'#555'}    };
    G.colorScheme_lightBackground = {
      navigationbar : { background:'none', border:'', color:'#000', colorHover:'#444' },
      thumbnail : { background:'#000', border:'1px solid #000', labelBackground:'rgba(34, 34, 34, 0.85)', titleColor:'#fff', titleShadow:'', descriptionColor:'#eee', descriptionShadow:'', paginationDotBorder:'2px solid #555', paginationDotBack:'#888', paginationDotSelBack:'#555'}    };

    // Color schemes - lightbox
    G.colorSchemeViewer_default = {
      background:'#000', imageBorder:'4px solid #000', imageBoxShadow:'#888 0px 0px 0px', barBackground:'rgba(4, 4, 4, 0.7)', barBorder:'0px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
      //background:'rgba(1, 1, 1, 0.75)', imageBorder:'4px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'rgba(4, 4, 4, 0.7)', barBorder:'0px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'
    };
    G.colorSchemeViewer_dark = {
      background:'rgba(1, 1, 1, 0.75)', imageBorder:'4px solid #f8f8f8', imageBoxShadow:'#888 0px 0px 20px', barBackground:'rgba(4, 4, 4, 0.7)', barBorder:'0px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'    };
    G.colorSchemeViewer_darkRed = {
      // #ffa3a3 #ff7373 #ff4040 #ff0000 #a60000
      background:'rgba(1, 1, 1, 0.75)', imageBorder:'4px solid #ffa3a3', imageBoxShadow:'#ff0000 0px 0px 20px', barBackground:'#a60000', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'    };
    G.colorSchemeViewer_darkGreen = {
      // #97e697 #67e667 #39e639 #00cc00 #008500
      background:'rgba(1, 1, 1, 0.75)', imageBorder:'4px solid #97e697', imageBoxShadow:'#00cc00 0px 0px 20px', barBackground:'#008500', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'    };
    G.colorSchemeViewer_darkBlue = {
      // #a0b0d7 #7080d7 #4a60d7 #162ea2 #071871
      background:'rgba(1, 1, 1, 0.75)', imageBorder:'4px solid #a0b0d7', imageBoxShadow:'#162ea2 0px 0px 20px', barBackground:'#071871', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'    };
    G.colorSchemeViewer_darkOrange = {
      // #ffd7b7 #ffd773 #ffc840 #ffb600 #a67600
      background:'rgba(1, 1, 1, 0.75)', imageBorder:'4px solid #ffd7b7', imageBoxShadow:'#ffb600 0px 0px 20px', barBackground:'#a67600', barBorder:'2px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'    };
    G.colorSchemeViewer_light = {
      background:'rgba(187, 187, 187, 0.75)', imageBorder:'none', imageBoxShadow:'#888 0px 0px 0px', barBackground:'rgba(4, 4, 4, 0.7)', barBorder:'0px solid #111', barColor:'#eee', barDescriptionColor:'#aaa'    };




    /* ##### THUMBNAIL ELEMENT STRUCTURE #####

    +--------------------------+  -> G.tn.borderHeight/2        -+
    |                          |                                 | G.tn.outerHeight
    |+------------------------+|  -> =0 (always)            -+   | item.thumbFullHeight
    || subcontainer           ||                             |   |
    ||                        ||                             |   |
    || +--------------------+ ||  -> G.tn.imgcBorderHeight/2
    || | imgContainer       | ||
    || |+-------------------+ ||
    || || image             | ||
    || |+-------------------+ ||
    || +--------------------+ ||
    ||                        ||
    || +--------------------+ ||  -+ --> G.tn.labelBorderHeight
    || | labelImage         | ||   | G.tn.labelHeight
    || |+------------------+| ||   | (=0 --> overImage)
    || || labelTitle       || ||   | item.thumbLabelHeight
    || |+------------------+| ||   |
    || || labelDescription || ||
    || |+------------------+| ||
    || +--------------------+ ||
    ||                        ||
    |+------------------------+|
    +--------------------------+

    */
    // **************************************************************************************
    // Class to store one item (= one thumbnail)
    // **************************************************************************************
    var NGItems = (function () {
      var nextId = 1;                   // private static --> all instances

      // constructor
      function NGItems( paramTitle, paramID ) {
        var ID = 0;                     // private

        // public (this instance only)
        if( paramID === undefined || paramID === null ) {
          ID = nextId++;
        }
        else {
          ID = paramID;
        }
        this.GetID = function () { return ID; };

        // public
        this.title = paramTitle;        // image title
        this.description = '';          // image description
        this.src = '';                  // full sized image URL
        this.width = 0;                 // image width
        this.height = 0;                // image height
        this.destinationURL = '';       // thumbnail destination URL --> open URL instead of displaying image
        this.kind = '';                 // 'image' or 'album'
        this.author = '';               // image author
        this.thumbFullWidth = 0;        // thumbnail full width
        this.thumbFullHeight = 0;       // thumbnail full height
        this.thumbLabelWidth = 0;
        this.thumbLabelHeight = 0;
        this.thumbSizes = {};           // store URLs for all available thumbnail sizes (flickr)
        this.thumbs = {                 // URLs and sizes for user defined
          url: { l1 : { xs:'', sm:'', me:'', la:'', xl:'' }, lN : { xs:'', sm:'', me:'', la:'', xl:'' } },
          width: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } },
          height: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } }
        }
        this.picasaThumbs = null;         // store URLs and sizes
        this.hovered = false;           // is the thumbnail currently hovered?
        this.hoverInitDone = false;
        this.contentIsLoaded = false;   // album: are items already loaded?
        this.contentLength = 0;         // album: number of items
        this.imageNumber = 0;           // image number in the album
        this.eltTransform = {};
        this.albumID = 0;               // ID of the parent album
        this.paginationLastPage = 0;
        this.paginationLastWidth = 0;
        this.customData = {};
        this.selected = false;
        this.$elt = null;               // pointer to the corresponding DOM element
        this.$Elts = [];                // cached pointers to the thumbnail content -> to avoid jQuery().find()
      }

      // public static
      NGItems.get_nextId = function () {
        return nextId;
      };

      // public (shared across instances)
      NGItems.prototype = {

        // cached sub elements
        $getElt: function( elt, forceRefresh ) {
          if( this.$Elts[elt] !== undefined && !forceRefresh == true ) {
            return this.$Elts[elt];
          }
          else {
          this.$Elts[elt]=this.$elt.find(elt);
            return this.$Elts[elt];
          }
        },

        // set thumbnail image real height for current level/resolution, and for all others level/resolutions having the same settings
        thumbSetImgHeight: function(h) {
          var lst=['xs','sm','me','la','xl'];
          for( var i=0; i< lst.length; i++ ) {
            if( G.tn.settings.height.l1[lst[i]] == G.tn.settings.getH() && G.tn.settings.width.l1[lst[i]] == G.tn.settings.getW() ) {
              this.thumbs.height.l1[lst[i]]=h;
            }
          }
          for( var i=0; i< lst.length; i++ ) {
            if( G.tn.settings.height.lN[lst[i]] == G.tn.settings.getH() && G.tn.settings.width.l1[lst[i]] == G.tn.settings.getW() ) {
              this.thumbs.height.lN[lst[i]]=h;
            }
          }
        },

        // set thumbnail image real width for current level/resolution, and for all others level/resolutions having the same settings
        thumbSetImgWidth: function(w) {
          var lst=['xs','sm','me','la','xl'];
          for( var i=0; i< lst.length; i++ ) {
            if( G.tn.settings.height.l1[lst[i]] == G.tn.settings.getH() && G.tn.settings.width.l1[lst[i]] == G.tn.settings.getW() ) {
              this.thumbs.width.l1[lst[i]]=w;
            }
          }
          for( var i=0; i< lst.length; i++ ) {
            if( G.tn.settings.height.lN[lst[i]] == G.tn.settings.getH() && G.tn.settings.width.l1[lst[i]] == G.tn.settings.getW() ) {
              this.thumbs.width.lN[lst[i]]=w;
            }
          }
        },

        // Returns Thumbnail image
        thumbImg: function () {
          var tnImg = { src:'', width:0, height:0 };

          if( this.title == 'dummydummydummy' ) {
            tnImg.src=G.emptyGif;
            return tnImg;
          }
          tnImg.src=this.thumbs.url[G.curNavLevel][G.curWidth];
          tnImg.width=this.thumbs.width[G.curNavLevel][G.curWidth];
          tnImg.height=this.thumbs.height[G.curNavLevel][G.curWidth];
          return tnImg;
        },

        // for future use...
        responsiveURL: function () {
          var url = '';
          switch(G.O.kind) {
            case '':
              url = this.src;
              break;
            case 'flickr':
              url = this.src;
              break;
            case 'picasa':
            default:
              url = this.src;
              break;
          }
          return url;
        }
      };
      return NGItems;
    })();


    // ##########################
    // ##### INITIALIZATION #####
    // ##########################
    this.Initiate = function( element, params ) {
      "use strict";


      G.O = params;
      // thumbnails - label
      G.O.thumbnailLabel.get = function( opt ) {
        if( G.curNavLevel == 'l1' && G.O.thumbnailL1Label !== undefined && G.O.thumbnailL1Label[opt] !== undefined ) {
          return G.O.thumbnailL1Label[opt];
        }
        else {
          return G.O.thumbnailLabel[opt];
        }
      };
      G.O.thumbnailLabel.set = function( opt, value ) {
        if( G.curNavLevel == 'l1' && G.O.thumbnailL1Label !== undefined && G.O.thumbnailL1Label[opt] !== undefined ) {
          G.O.thumbnailL1Label[opt]=value;
        }
        else {
          G.O.thumbnailLabel[opt]=value;
        }
      };

      G.$E.base = jQuery(element);
      G.baseEltID = G.$E.base.attr('id');
      G.bodyOverflowInitial=jQuery('body').css('overflow');

      //    [TODO] deep linking support only once per page
      //    if( G.O.locationHash ) {
      //      alert(location.hash);
      //      if( location.hash.length > 0 && location.hash.indexOf('#nanogallery/'+G.baseEltID) === 0 ) {
      //        G.O.locationHash=false;
      //        nanoConsoleLog('locationHash has been disabled in:' + G.baseEltID +'. This option can only be used for one nanoGALLERY per page.');
      //      }
      //    }

      // POLYFILL FOR BIND function --> for older Safari mobile
      // found on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind#Compatibility
      if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
          if (typeof this !== "function") {
            // closest thing possible to the ECMAScript 5
            // internal IsCallable function
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
          }

          var aArgs = Array.prototype.slice.call(arguments, 1),
              fToBind = this,
              fNOP = function () {},
              fBound = function () {
                return fToBind.apply(this instanceof fNOP && oThis
                       ? this
                       : oThis,
                       aArgs.concat(Array.prototype.slice.call(arguments)));
              };

          fNOP.prototype = this.prototype;
          fBound.prototype = new fNOP();

          return fBound;
        };
      }

      String.prototype.replaceAll = function(search, replace) {
      if (replace === undefined) {
          return this.toString();
      }
      return this.split(search).join(replace);
  }
      // Detect the animation engine
      // default is jQuery
      if( toType(jQuery.velocity) == 'object' ) {
        // Velocity.js
        G.aengine='velocity';
      }
      else
        // Transit.js
        // if( jQuery.support.transition ) {    // conflict with bootstrap
        if( toType(jQuery.transit) == 'object' ) {
          G.aengine='transition';
        }

      // Set theme and colorScheme
      jQuery(element).addClass('nanogallery_theme_'+G.O.theme);
      SetColorScheme(element);

      // Hide icons (thumbnails and breadcrumb)
      if( G.O.thumbnailLabel.get('hideIcons') ) {
        var s1 = '.nanogallery_thumbnails_icons_off ',
        s = s1+'.nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImageTitle:before { display:none !important; }'+'\n';
        s += s1+'.nanoGalleryContainer .nanoGalleryThumbnailContainer .labelFolderTitle:before { display:none !important; }'+'\n';
        jQuery('head').append('<style>'+s+'</style>');
        jQuery(element).addClass('nanogallery_thumbnails_icons_off');
      }
      if( G.O.galleryToolbarHideIcons ) {
        var s1 = '.nanogallery_breadcrumb_icons_off ',
        s=s1+'.nanoGalleryNavigationbar .folderHome:before { display:none !important; }'+'\n';
        s += s1+'.nanoGalleryNavigationbar .folder:before { display:none !important; }'+'\n';
        jQuery('head').append('<style>'+s+'</style>');
        jQuery(element).addClass('nanogallery_breadcrumb_icons_off');
      }

      if( G.O.thumbnailLabel.get('align') == 'right' ) {
        var s1 = '.nanogallery_thumbnails_label_align_right ',
        s = s1+'.nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImage { text-align : right !important; }'+'\n';
        jQuery('head').append('<style>'+s+'</style>');
        jQuery(element).addClass('nanogallery_thumbnails_label_align_right');
      }

      if( G.O.thumbnailLabel.get('align') == 'center' ) {
        var s1 = '.nanogallery_thumbnails_label_align_center ',
        s = s1+'.nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImage { text-align : center !important; }'+'\n';
        jQuery('head').append('<style>'+s+'</style>');
        jQuery(element).addClass('nanogallery_thumbnails_label_align_center');
      }

      if( G.O.thumbnailLabel.get('align') == 'left' ) {
        var s1 = '.nanogallery_thumbnails_label_align_left ',
        s = s1+'.nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImage { text-align : left !important; }'+'\n';
        jQuery('head').append('<style>'+s+'</style>');
        jQuery(element).addClass('nanogallery_thumbnails_label_align_left');
      }

      // Build the gallery structure - add the containers
      G.$E.conNavBCon=jQuery('<div class="nanoGalleryNavigationbarContainer"></div>').appendTo(element);
      G.$E.conNavBCon.hide();//css('visibility','hidden');
      G.$E.conNavB=jQuery('<div class="nanoGalleryNavigationbar"></div>').appendTo(G.$E.conNavBCon);

      var sRTL='';
      if( G.O.RTL ) {
        sRTL='style="text-align:right;direction:rtl;"';
      }
      G.$E.conBC=jQuery('<div class="nanoGalleryBreadcrumb" '+sRTL+'></div>').appendTo(G.$E.conNavB);
      G.$E.conLoadingB=jQuery('<div class="nanoGalleryLBarOff"><div></div><div></div><div></div><div></div><div></div></div>').appendTo(element);
      G.$E.conTnParent=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(element);
      G.$E.conTn=jQuery('<div class="nanoGalleryContainer nGEvent"></div>').appendTo(G.$E.conTnParent);
      G.$E.conConsole=jQuery('<div class="nanoGalleryConsoleParent"></div>').appendTo(element);
      switch( G.O.thumbnailAlignment ) {
        case 'left':
          G.$E.conTnParent.css({'text-align':'left'});
          G.$E.conNavBCon.css({'margin-left':0 });
          break;
        case 'right':
          G.$E.conTnParent.css({'text-align':'right'});
          G.$E.conNavBCon.css({ 'margin-right':0});
          break;
      }

      jQuery('head').append('<style>.nanogalleryHideElement {position: absolute !important; top: -9999px !important; left: -9999px !important;}</style>');
      var t1=jQuery('<div class="nanogalleryHideElement '+jQuery(element).attr('class')+'"></div>').appendTo('body'),
      t2=jQuery('<div class="nanoGalleryContainerParent"></div>').appendTo(t1);
      G.$E.conTnHid=jQuery('<div class="nanoGalleryContainer"></div>').appendTo(t2);

      if( G.O.supportIE8 ) {
        // POLYFILL FOR addEventListener/removeEventListener function --> for IE8
        // found on https://gist.github.com/jonathantneal/3748027
        try {
          !window.addEventListener && (function (WindowPrototype, DocumentPrototype, ElementPrototype, addEventListener, removeEventListener, dispatchEvent, registry) {
            WindowPrototype[addEventListener] = DocumentPrototype[addEventListener] = ElementPrototype[addEventListener] = function (type, listener) {
              var target = this;

              registry.unshift([target, type, listener, function (event) {
                event.currentTarget = target;
                event.preventDefault = function () { event.returnValue = false };
                event.stopPropagation = function () { event.cancelBubble = true };
                event.target = event.srcElement || target;

                listener.call(target, event);
              }]);

              this.attachEvent("on" + type, registry[0][3]);
            };

            WindowPrototype[removeEventListener] = DocumentPrototype[removeEventListener] = ElementPrototype[removeEventListener] = function (type, listener) {
              for (var index = 0, register; register = registry[index]; ++index) {
                if (register[0] == this && register[1] == type && register[2] == listener) {
                  return this.detachEvent("on" + type, registry.splice(index, 1)[0][3]);
                }
              }
            };

            WindowPrototype[dispatchEvent] = DocumentPrototype[dispatchEvent] = ElementPrototype[dispatchEvent] = function (eventObject) {
              return this.fireEvent("on" + eventObject.type, eventObject);
            };
          })(Window.prototype, HTMLDocument.prototype, Element.prototype, "addEventListener", "removeEventListener", "dispatchEvent", []);
        }
        catch (e) {
          BrowserNotification();
          return false;
        }
      }
      else {
        if( G.IE <= 8 ) {
          BrowserNotification();
          return false;
        }
      }

      // check parameters consistency
      checkPluginParameters();

      // pagination container
      var sRTL2='';
      if( G.O.RTL ) {
        sRTL2='style="direction:rtl;"';
      }
      G.$E.conPagin=jQuery('<div class="nanoGalleryPagination'+(G.O.paginationDots? 'Dot':'' )+'" '+sRTL2+'></div>').appendTo(G.$E.conTnParent);
      G.$E.conPagin.hide();

      // attach events
      var t= new userEventsGallery(G.$E.conTn[0] );

      // i18n translations
      i18n();

      // fullscreen API support
      if( document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || document.mozFullScreenEnabled) {
        G.supportFullscreenAPI=true;
      } else {
        nanoConsoleLog('Your browser does not support the fullscreen API. Fullscreen button will not be displayed.');
      }

      // cache some thumbnails data (sizes, styles...)
      ThumbnailDefCaches();

      G.L.nbMaxTnPerRow=NbThumbnailsPerRow();

      // display an image on start and in fullscreen
      if( G.O.viewerFullscreen && G.O.openOnStart.indexOf('/') > 0 ) {
        ngscreenfull.request();
      }

      // lazy build the gallery
      if( G.O.lazyBuild != 'loadData' ) { NGFinalize(); }

      // GLOBAL EVENT MANAGEMENT
      // Page resize
      var resizeTimeOut=0;
      jQuery(window).resize( function() {
        if( resizeTimeOut ) clearTimeout(resizeTimeOut);
        if( G.containerViewerDisplayed ) {
            ResizeInternalViewer();
        }
        else {
          resizeTimeOut = setTimeout(function () {
            var nw=RetrieveCurWidth();
            // if( G.curAlbumIdx != -1 && G.curWidth != nw ) {
            if( G.curAlbumIdx != -1 &&
                  ( G.tn.settings.getH() != G.tn.settings.height[G.curNavLevel][nw] ||
                  G.tn.settings.getW() != G.tn.settings.width[G.curNavLevel][nw] ) ) {
              // thumbnail size changed --> render the gallery with the new sizes
              G.curWidth=nw;
              renderGallery( G.curAlbumIdx, 0 );
            }
            else {
              ResizeGallery();
            }
            return;
          }, 50);
        }
      });

      // Event page scrolled
      G.$E.base.on('scroll', function () {
        OnScroll();
      });
      jQuery(window).on('scroll', function () {
        OnScroll();
      });
    }

    function OnScroll() {
      if( G.scrollTimeOut ) clearTimeout(G.scrollTimeOut);
      G.scrollTimeOut = setTimeout(function () {

        if( !G.containerViewerDisplayed ) {
          if( G.O.lazyBuild == 'loadData' ) {
            if( inViewportVert(G.$E.conTnParent,G.O.lazyBuildTreshold) ){
              G.O.lazyBuild='none';
              NGFinalize();
            }
          }

          if( G.delayedAlbumIdx != -1 && inViewportVert(G.$E.conTnParent,G.O.lazyBuildTreshold) ){
            DisplayAlbumFinalize( G.delayedAlbumIdx, G.delayedSetLocationHash );
          }

          thumbnailsLazySetSrc();
          return;
        }
      }, 100);
    }


    function getSpecialKeysPressed(e){
      G.isShiftPressed = e.shiftKey;
      G.isAltPressed = e.altKey;
      G.isCtrlPressed = e.ctrlKey;
      G.isMetaPressed = e.metaKey;
    }

    // exposed objects for callbacks
    function ExposedObjects() {
      return {
        animationEngine:G.aengine,
        t:'test'
      };
    }

    // Message for unsupported browser
    function BrowserNotification() {
      var m='Your browser version is not supported anymore. The image gallery cannot be displayed. <br><br>Please update to a more recent one. Download:<br>';
      m+='&nbsp;&nbsp;&nbsp; <a href="http://www.google.com/chrome/">Chrome</a><br>';
      m+='&nbsp;&nbsp;&nbsp; <a href="http://www.mozilla.com/firefox/">Firefox</a><br>';
      m+='&nbsp;&nbsp;&nbsp; <a href="http://www.microsoft.com/windows/internet-explorer/default.aspx">Internet Explorer</a><br>';
      m+='&nbsp;&nbsp;&nbsp; <a href="http://www.apple.com/safari/download/">Safari</a>';
      nanoAlert(m, false);
    }

    // Original author : John Hrvatin, Lead Program Manager, Internet Explorer - http://blogs.msdn.com/b/ie/archive/2011/10/28/a-best-practice-for-programming-with-vendor-prefixes.aspx
    function FirstSupportedPropertyName(prefixedPropertyNames) {
      var tempDiv = document.createElement("div");
      for (var i = 0; i < prefixedPropertyNames.length; ++i) {
        if (typeof tempDiv.style[prefixedPropertyNames[i]] != 'undefined')
          return prefixedPropertyNames[i];
      }
      return null;
    }

    // #####
    // Finalize initialization
    // #####
    function NGFinalize() {

      var sizeImageMax=Math.max(window.screen.width, window.screen.height);
      if( window.devicePixelRatio != undefined ) {
        if( window.devicePixelRatio > 1 ) {
          sizeImageMax=sizeImageMax*window.devicePixelRatio;
        }
      }

      for( var j=0; j<G.tn.getHE().length; j++) {
        switch(G.tn.getHE()[j].name ) {
          case 'imageScale150':
          case 'imageScale150Outside':
          case 'imageScaleIn80':
          case 'imageSlide2Up':
          case 'imageSlide2Down':
          case 'imageSlide2Left':
          case 'imageSlide2Right':
          case 'imageSlide2UpRight':
          case 'imageSlide2UpLeft':
          case 'imageSlide2DownRight':
          case 'imageSlide2DownLeft':
          case 'imageSlide2Random':
            G.tn.scale=Math.max(G.tn.scale, 1.5);
            break;
          case 'scale120':
            G.tn.scale=Math.max(G.tn.scale, 1.2);
            break;
        }
      }
      var si=0;
      if( G.O.itemsBaseURL.length >0 ) {G.O.itemsBaseURL+='/';}

      switch(G.O.kind) {
        // MARKUP / API
        case '':
          NGAddItem(G.i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', '0', '-1' );

          if( G.O.items !== undefined && G.O.items !== null ) {
            ProcessItemOption();
            if( !ProcessLocationHash(false) ) {
              DisplayAlbum(0,false);
            }
          }
          else {
            var elements=jQuery(G.$E.base).children('a');
            if( elements.length > 0 ) {
              ProcessHREF(elements);
              if( !ProcessLocationHash(false) ) {
                DisplayAlbum(0,false);
              }
            }
            else
              nanoAlert('error: no image to process.');
          }
          break;

        // FLICKR STORAGE
        case 'flickr':
          if( !G.O.flickrSkipOriginal ) {
            G.flickr.photoAvailableSizes.push(10000);
            G.flickr.photoAvailableSizesStr.push('o');
          }
          for( i=0; i<G.flickr.photoAvailableSizes.length; i++) {
            G.flickr.photoSize=i; //G.flickr.photoAvailableSizesStr[i];
            if( sizeImageMax <= G.flickr.photoAvailableSizes[i] ) {
              break;
            }
          }
          NGAddItem(G.i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', G.O.photoset.length > 0 ? G.O.photoset : '0', '-1' );
          FlickrProcessItems(0,true,-1,false);
          break;

        // CUSTOM STORAGE
        case 'json':
          NGAddItem(G.i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', '0', '-1' );
          JsonProcessItems(0,true,-1,false);
          break;


        // PICASA/GOOGLE+ STORAGE
        case 'picasa':
        default:
          if( G.O.album.length > 0 ) {
            var p=G.O.album.indexOf('&authkey=');
            if( p >= 0 ) {
              var albumId=G.O.album.substring(0,p),
              opt=G.O.album.substring(p);
              if( opt.indexOf('Gv1sRg') == -1 ) {
                opt='&authkey=Gv1sRg'+opt.substring(9);
              }
              var newItem=NGAddItem(G.i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', albumId, '-1' );
              newItem.customData.authkey=opt;
            }
            else {
              NGAddItem(G.i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', G.O.album, '-1' );
            }


          }
          else {
            NGAddItem(G.i18nTranslations.breadcrumbHome, '', '', '', '', 'album', '', '0', '-1' );
          }
          PicasaProcessItems(0,true,-1,false);
          break;
      }


      // Keyboard management --> Image Viewer
      // Keyboard management --> Album Viewer (Else section)
      jQuery(document).keyup(function(e) {
        getSpecialKeysPressed(e);
        if( G.containerViewerDisplayed ) {
          switch( e.keyCode) {
            case 27:    // Esc key
              CloseInternalViewer(true);
              break;
            case 32:    // SPACE
            case 13:    // ENTER
              SlideshowToggle();
              break;
            case 38:    // UP
            case 39:    // RIGHT
            case 33:    // PAGE UP
              DisplayNextImagePart1();
              break;
            case 40:    // DOWN
            case 37:    // LEFT
            case 34:    // PAGE DOWN
              DisplayPreviousImage();
              break;
            case 35:    // END
            case 36:    // BEGIN
          }
        } else if ( !G.containerViewerDisplayed && G.curAlbumIdx > 0 && G.O.galleryEnableKeyboard ) {
          switch( e.keyCode) {
            case 27:    // Esc key
              DisplayAlbum(0, 'false');
              break;
            case 38:    // UP
            case 39:    // RIGHT
            case 33:    // PAGE UP
              DisplayNextAlbum();
              break;
            case 40:    // DOWN
            case 37:    // LEFT
            case 34:    // PAGE DOWN
              DisplayPreviousAlbum();
              break;
            case 32:    // SPACE
            case 13:    // ENTER
            case 35:    // END
            case 36:    // BEGIN
          }
        }
      });

      // TODO:
      jQuery(window).click(getSpecialKeysPressed);
      jQuery(window).mousemove(getSpecialKeysPressed);


      // browser back-button to close the image currently displayed
      if( G.O.locationHash ) {
        jQuery(window).bind( 'hashchange', function() {
          ProcessLocationHash(true);
        });
      }

      // gallery fullpage
      if( G.O.galleryFullpageButton ) {
        if( G.O.RTL ) {
          G.$E.conNavBFullpage =jQuery('<div class="nanoGalleryFullpage setFullPageButton"></div>').prependTo(G.$E.conNavB);
        }
        else {
          G.$E.conNavBFullpage =jQuery('<div class="nanoGalleryFullpage setFullPageButton"></div>').appendTo(G.$E.conNavB);
        }
        G.$E.conNavBFullpage.on('click', function(e){
          if( G.$E.conNavBFullpage.hasClass('setFullPageButton') ) {
            // switch to fullpage display mode
            if( G.containerViewerDisplayed ) { return; }
            if( G.O.maxWidth > 0 ) {
              jQuery(G.$E.base).css({'maxWidth':''});
            }
            G.$E.conNavBFullpage.removeClass('setFullPageButton').addClass('removeFullPageButton');
            setElementOnTop('', G.$E.base);

            for( j=0; j<G.tn.getHE().length; j++) {
              if( /scale120|imageScale150Outside|overScaleOutside|imageFlipHorizontal|imageFlipVertical/i.test(G.tn.getHE()[j].name) ) {
                G.$E.base.css({overflow: 'auto'});
              }
            }

            G.$E.base.addClass('fullpage');
            jQuery('body').css({overflow:'hidden'});
            ResizeGallery();
          }
          else {
            // switch off fullpage mode
            if( G.containerViewerDisplayed ) { return; }
            G.$E.conNavBFullpage.removeClass('removeFullPageButton').addClass('setFullPageButton');
            if( G.O.maxWidth > 0 ) {
              jQuery(G.$E.base).css({'maxWidth':G.O.maxWidth});
            }
            G.$E.base.removeClass('fullpage');
            for( j=0; j<G.tn.getHE().length; j++) {
              if( /scale120|imageScale150Outside|overScaleOutside|imageFlipHorizontal|imageFlipVertical/i.test(G.tn.getHE()[j].name) ) {
                G.$E.base.css({overflow: 'visible'});
              }
            }
            ScrollbarSetVisible();
            ResizeGallery();
          }
        });
       }

    }


    function ScrollbarSetVisible() {
      //jQuery('body').css({overflow:'initial'});
     jQuery('body').css({overflow:'visible'});
     return;
      if( G.bodyOverflowInitial != null && G.bodyOverflowInitial != undefined ) {
        jQuery('body').css({overflow:G.bodyOverflowInitial});
      }
      else {
        jQuery('body').css({overflow:'auto'});
      }
    }


    function ElementTranslateX( element, posX ) {
      jQuery(element).css({ 'left': posX });

      // [TODO] - translateX needs some code refactoring...
      //var transformStyle = 'translateX('+posX+'px)';
      //element.style.msTransform = transformStyle;
      //element.style.MozTransform = transformStyle;
      //element.style.webkitTransform = transformStyle;
      //element.style.transform = transformStyle;
    }


    // ##### USER EVENTS HANDLING ON GALLERY (click, hover, swipe, drag)
    // based on "Implement Custom Gestures" from Google
    // https://developers.google.com/web/fundamentals/input/touch-input/touchevents/
    function userEventsGallery(element) {

      var elementToSwipe=element,
      isAnimating=false,
      initialTouchPos=null,
      lastTouchPos=null,
      currentXPosition=0,
      onlyX=false,
      startViewport=null;

      var initialViewport=0;

      function OpenThumbnail( n ) {
        if( n == undefined ) { return; }

        if( G.$currentTouchedThumbnail != null) { ThumbnailHoverOut(G.$currentTouchedThumbnail); }
        G.$currentTouchedThumbnail=null;


        if( typeof G.O.fnThumbnailClicked === 'function'){
          if( !G.O.fnThumbnailClicked(G.I[n].$elt, G.I[n]) ) { return; }
        }

        // open URL
        if( G.I[n].destinationURL !== undefined && G.I[n].destinationURL.length >0 ) {
          window.location = G.I[n].destinationURL;
          return;
        }

        G.openNoDelay=false;
        if( G.I[n].kind == 'album' ) {
          OpenAlbum(n, false, -1, true);
        }
        else {
          // Display image
          DisplayImage(n,false);
        }
      }


      // Handle the start of gestures -->  click event
      this.handleGestureStartNoDelay = function(e) {
        // delay to ignore click event after touchstart event
        var eType=(jQuery(e.target).get(0).tagName).toUpperCase();
        // class customEventHandler --> disable standard event handler
        if( G.containerViewerDisplayed || eType == 'A' || eType == 'INPUT' || jQuery(e.target).hasClass('customEventHandler') ) {     // detect click on custom element
          // selection checkbox clicked
          if( jQuery(e.target).hasClass('ngChekbox') ) {
            var n=jQuery(e.target).parent().data('index');
            if( n != undefined ) {
              thumbnailSelection(G.I[n], undefined, false);
            }
          }
          e.stopPropagation();
          //e.eventDefault();
          return false;
        }

        getSpecialKeysPressed(e);

        // if items are selectable, cannot limit on user speed
        if( (new Date().getTime()) - G.timeLastTouchStart < 400 && G.O.itemsSelectable !== true ) {
          return;
        }
        G.openNoDelay=true;
        this.handleGestureStart(e);
      }.bind(this);

      // Handle the start of gestures
      this.handleGestureStart = function(e) {
        var eType=(jQuery(e.target).get(0).tagName).toUpperCase();
        // class customEventHandler --> disable standard event handler
        if( G.containerViewerDisplayed || eType == 'A' || eType == 'INPUT' || jQuery(e.target).hasClass('customEventHandler') ) {     // detect click on custom element
          e.stopPropagation();
          //e.eventDefault();
          return false;
        }

        if( (new Date().getTime()) - G.timeImgChanged < 400 && G.O.itemsSelectable !== true ) {
          return;
        }

        if( (new Date().getTime()) - G.timeLastTouchStart < 400 && G.O.itemsSelectable !== true ) {
          return;
        }
        G.timeLastTouchStart=new Date().getTime();

        var target = e.target || e.srcElement;
        var found=false;
        while( target != G.$E.conTn[0] ) {       // go element parent up to find the thumbnail element
          // if( target.getAttribute('class') == 'nanoGalleryThumbnailContainer' ) {
          if( jQuery(target).hasClass('nanoGalleryThumbnailContainer') ) {
            if( G.$currentTouchedThumbnail != null && !G.$currentTouchedThumbnail.is(jQuery(target)) ) {
              ThumbnailHoverOutAll();
            }
            G.$currentTouchedThumbnail=jQuery(target);
            found=true;
          }
          target = target.parentNode;
        }

        if( !found ) { return; }

        // handle thumbnail selection
        if(G.O.itemsSelectable === true){
          if(G.isShiftPressed || G.isCtrlPressed || G.isMetaPressed || e.target.nodeName.toLowerCase() === 'input'){
            thumbnailSelection( G.I[G.$currentTouchedThumbnail.data('index')] );
            return false;
          }
          if (G.selectMode === true) {
            thumbnailSelection( G.I[G.$currentTouchedThumbnail.data('index')] );
            return false;
          }
          if (G.I[G.$currentTouchedThumbnail.data('index')].kind === G.selectMode) {
            thumbnailSelection( G.I[G.$currentTouchedThumbnail.data('index')] );
            return false;
          }
          var idxctt = G.$currentTouchedThumbnail.data('index');
          G.touchSelectTO = setTimeout(function(){
            thumbnailSelection( G.I[idxctt] );
          },500);
        }


        initialViewport=getViewport();

        //if(e.touches && e.touches.length > 1) { return; }
        initialTouchPos = getGesturePointFromEvent(e);

        initialOffsetTop=getViewport().t;

        //if( G.gallerySwipeInitDone ) { return; }

        // Add the move and end listeners
        if (window.navigator.msPointerEnabled) {
          // Pointer events are supported.
          document.addEventListener('MSPointerMove', this.handleGestureMove, true);
          document.addEventListener('MSPointerUp', this.handleGestureEnd, true);
        } else {
          // Add Touch Listeners
          document.addEventListener('touchmove', this.handleGestureMove, true);
          document.addEventListener('touchend', this.handleGestureEnd, true);
          document.addEventListener('touchcancel', this.handleGestureEnd, true);

          // Add Mouse Listeners
          document.addEventListener('mousemove', this.handleGestureMove, true);
          document.addEventListener('mouseup', this.handleGestureEnd, true);
        }

        // makes content unselectable --> avoid image drag during 'mouse swipe'
        G.$E.base.addClass('unselectable').find('*').attr('draggable', 'false').attr('unselectable', 'on');
        G.gallerySwipeInitDone=true;

      }.bind(this);

      // Handle move gestures
      this.handleGestureMove = function (e) {
        //e.preventDefault(); // --> uncomment this to avoid viewport scrolling on touchscreen
        lastTouchPos = getGesturePointFromEvent(e);

        if( isAnimating ) { return; }

        if( G.O.paginationSwipe ) {
          if( G.pgMaxLinesPerPage > 0 && G.tn.settings.getH() != 'auto' && G.tn.settings.getW() != 'auto' ) {
            if( Math.abs(initialTouchPos.x - lastTouchPos.x) > 15 || onlyX ) {
              e.preventDefault(); // if swipe horizontaly the gallery, avoid moving page also
              onlyX=true;
              isAnimating = true;
              window.requestAnimationFrame(onAnimFrame);
            }
          }
        }

      }.bind(this);


      // Handle end gestures
      this.handleGestureEnd = function(e) {
        if( e.cancelable ) { e.preventDefault(); }
        e.stopPropagation();

        // if(e.touches && e.touches.length > 0) {
        //   return;
        // }
        isAnimating = false;
        onlyX=false;

        // Remove Event Listeners
        if (window.navigator.msPointerEnabled) {
          // Remove Pointer Event Listeners
          document.removeEventListener('MSPointerMove', this.handleGestureMove, true);
          document.removeEventListener('MSPointerUp', this.handleGestureEnd, true);
        } else {
          // Remove Touch Listeners
          document.removeEventListener('touchmove', this.handleGestureMove, true);
          document.removeEventListener('touchend', this.handleGestureEnd, true);
          document.removeEventListener('touchcancel', this.handleGestureEnd, true);

          // Remove Mouse Listeners
          document.removeEventListener('mousemove', this.handleGestureMove, true);
          document.removeEventListener('mouseup', this.handleGestureEnd, true);
        }

        if(G.O.itemsSelectable === true){
          if((new Date().getTime() - G.timeLastTouchStart) > 500 ){
            return false;
          }else{
            clearTimeout(G.touchSelectTO);
          }
        }

        // allow text + image selection again
        G.$E.base.addClass('unselectable').find('*').attr('draggable', 'true').attr('unselectable', 'off');

        updateSwipeRestPosition();

        initialTouchPos=null;
        lastTouchPos=null;
        currentXPosition=0;
        onlyX=false;
        startViewport=null;

      }.bind(this);


      function OpenTouchedThumbnail() {
        currentXPosition=0;
        initialTouchPos=null;
        lastTouchPos=null;
        ElementTranslateX(G.$E.conTn[0],0);

        if( G.containerViewerDisplayed ) {
          G.$currentTouchedThumbnail=null;
          G.openNoDelay=false;
        }
        else {
          if( G.$currentTouchedThumbnail != null ) {

            if( Math.abs(initialViewport.t-getViewport().t) > 10 ) {
              // viewport has been scrolled (touchscreen)--> open is cancelled
              ThumbnailHoverOut(G.$currentTouchedThumbnail);
              G.$currentTouchedThumbnail=null;
              G.openNoDelay=false;
              return;
            }

            var $t=G.$currentTouchedThumbnail;
            var n=$t.data('index');
            if( n == undefined ) { return; }

            if( ( G.curNavLevel == 'l1' && G.O.touchAnimationL1 !== undefined ? G.O.touchAnimationL1: G.O.touchAnimation) && !G.openNoDelay ) {
              // automatically opens the touched thumbnail (to disply an image or to open an album)
              if( G.O.touchAutoOpenDelay > 0 ) {
                ThumbnailHoverOutAll();
                ThumbnailHover($t);
                window.clearInterval(G.touchAutoOpenDelayTimerID);
                G.touchAutoOpenDelayTimerID=window.setInterval(function(){
                  window.clearInterval(G.touchAutoOpenDelayTimerID);
                  if( Math.abs(initialViewport.t-getViewport().t) > 10 ) {
                    // viewport has been scrolled after hover effect delay (touchscreen)--> open is cancelled
                    G.openNoDelay=false;
                    G.$currentTouchedThumbnail=null;
                    ThumbnailHoverOut($t);
                  }
                  else {
                    OpenThumbnail(n);
                  }
                }, G.O.touchAutoOpenDelay);
              }
              else {
                // 2 touch scenario
                if( !G.I[n].hovered ) {
                  // first touch
                  ThumbnailHoverOutAll();
                  ThumbnailHover($t);
                }
                else {
                  // second touch
                  OpenThumbnail(n);
                }
              }
            }
            else {
              OpenThumbnail(n);
            }

          }
          else {
            G.openNoDelay=false;
          }
        }
        return;
      }

      function updateSwipeRestPosition() {

        if( lastTouchPos == null || initialTouchPos == null ) {      // touchend without touchmove
          // currentXPosition=0;
          // initialTouchPos=null;
          OpenTouchedThumbnail();
          return;
        }

        var differenceInX = initialTouchPos.x - lastTouchPos.x;
        var differenceInY = initialTouchPos.y - lastTouchPos.y;
        currentXPosition = currentXPosition - differenceInX;
        if( G.pgMaxLinesPerPage > 0 && G.tn.settings.getH() != 'auto' && G.tn.settings.getW() != 'auto' ) {
          // pagination
          // if( Math.abs(differenceInX) > 30) {
          if( G.O.paginationSwipe && (Math.abs(differenceInX) > 40 && Math.abs(initialViewport.t-getViewport().t) <= 10) ) {
            G.$currentTouchedThumbnail=null;
            currentXPosition=0;
            initialTouchPos=null;
            lastTouchPos=null;
            ThumbnailHoverOutAll();
            if( differenceInX < -40 ) {
              paginationPreviousPage();
            }
            else {
              paginationNextPage();
            }
          }
          else {
            OpenTouchedThumbnail();
          }
        }
        else {
          // no pagination
          OpenTouchedThumbnail();
        }

        return;
      }

      function getGesturePointFromEvent(e) {
        var point = {};

        if(e.targetTouches) {
          point.x = e.targetTouches[0].clientX;
          point.y = e.targetTouches[0].clientY;
        } else {
          // Either Mouse event or Pointer Event
          point.x = e.clientX;
          point.y = e.clientY;
        }

        return point;
      }

      function onAnimFrame() {
        if(!isAnimating) { return; }

        if( G.pgMaxLinesPerPage > 0 && G.tn.settings.getH() != 'auto' && G.tn.settings.getW() != 'auto'  ) {
          var differenceInX = initialTouchPos.x - lastTouchPos.x;
          ElementTranslateX(elementToSwipe,currentXPosition - differenceInX);
        }

        isAnimating = false;
      }

      function ThumbnailOnMouseenter(e) {
        if( G.containerViewerDisplayed ) { return; }
        var target = e.target || e.srcElement;
        // if( target.getAttribute('class') == 'nanoGalleryThumbnailContainer' ) {
        if( jQuery(target).hasClass('nanoGalleryThumbnailContainer') ) {
          //if( G.$currentTouchedThumbnail == null ) {
            ThumbnailHover(jQuery(target));
          //}
        }
      }

      function ThumbnailOnMouseleave(e) {
        var target = e.target || e.srcElement;
        if( jQuery(target).hasClass('nanoGalleryThumbnailContainer') ) {
        // if( target.getAttribute('class') == 'nanoGalleryThumbnailContainer' ) {
          ThumbnailHoverOut(jQuery(target));
        }
      }


      // Check if MS pointer events are supported.
      if (window.navigator.msPointerEnabled) {
        // Add Pointer Event Listener
        elementToSwipe.addEventListener('MSPointerDown', this.handleGestureStartNoDelay, true);
      }
      else {
        // Add Touch Listener
        elementToSwipe.addEventListener('touchstart', this.handleGestureStart, true);

        // Add Mouse Listener
        if( !G.isIOS ) {
          var thatObject = this;
          elementToSwipe.addEventListener('mousedown', function(e){
              // filter : if the user uses the right click,
              // do not do anything
              if(e.button != 2){
                thatObject.handleGestureStartNoDelay(e);
            }
          }, true);
        }
      }

      // MOUSE OVER
      elementToSwipe.addEventListener('mouseenter', ThumbnailOnMouseenter, true);
      elementToSwipe.addEventListener('mouseleave', ThumbnailOnMouseleave, true);

    }



    // requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
    // http://paulirish.com/2011/requestanimationframe-for-smart-animating/
    // http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
    // MIT license
    (function() {
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
                                       || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                  timeToCall);
                lastTime = currTime + timeToCall;
                return id;
            };

        if (!window.cancelAnimationFrame)
            window.cancelAnimationFrame = function(id) {
                clearTimeout(id);
            };
    }());


    // ##### CHECK PLUGIN PARAMETERS CONSISTENCY
    function checkPluginParameters() {

      if( G.O.viewer == 'fancybox' ) {
        if( typeof(jQuery.fancybox) === 'undefined' ) {
          G.O.viewer = 'internal';
          nanoConsoleLog('Fancybox could not be found. Fallback to internal viewer. Please check the files included in the HTML page.');
        }
      }

      if( G.O.userID.toUpperCase() == 'CBRISBOIS@GMAIL.COM' || G.O.userID == '111186676244625461692' ) {
        if( G.O.blackList == '' || G.O.blackList.toUpperCase() == 'SCRAPBOOK|PROFIL' ) { G.O.blackList='profil|scrapbook|forhomepage'; }
      }

      if( G.O.blackList != '' ) { G.blackList=G.O.blackList.toUpperCase().split('|'); }
      if( G.O.whiteList != '' ) { G.whiteList=G.O.whiteList.toUpperCase().split('|'); }
      if( G.O.albumList != '' ) { G.albumList=G.O.albumList.toUpperCase().split('|'); }

      if( G.O.kind == 'picasa' || G.O.kind == 'flickr' ) {
        G.O.displayBreadcrumb=true;
      }
      // flickr
      if( G.O.photoset !== undefined ) {
        if( G.O.photoset.length > 0) { G.O.displayBreadcrumb=false; }
      }
      else { G.O.photoset=''; }
      // picasa
      if( G.O.album !== undefined ) {
        if( G.O.album.length > 0 ) { G.O.displayBreadcrumb=false; }
      }
      else { G.O.album=''; }

      if( G.O.maxWidth > 0 ) {
        jQuery(G.$E.base).css({'maxWidth':G.O.maxWidth});
        jQuery(G.$E.base).css({'margin-left':'auto'});
        jQuery(G.$E.base).css({'margin-right':'auto'});
      }

      if( toType(G.O.slideshowDelay) == 'number' && G.O.slideshowDelay >= 2000 ) {
        G.slideshowDelay=G.O.slideshowDelay;
      }
      else {
        nanoConsoleLog('Parameter "slideshowDelay" must be an integer >= 2000 ms.');
      }

      if( toType(G.O.thumbnailDisplayInterval) == 'number' && G.O.thumbnailDisplayInterval >= 0 ) {
        G.tn.displayInterval=G.O.thumbnailDisplayInterval;
      }
      else {
        nanoConsoleLog('Parameter "thumbnailDisplayInterval" must be an integer.');
      }

      if( toType(G.O.thumbnailLazyLoadTreshold) == 'number' && G.O.thumbnailLazyLoadTreshold >= 0 ) {
        G.tn.lazyLoadTreshold=G.O.thumbnailLazyLoadTreshold;
      }
      else {
        nanoConsoleLog('Parameter "thumbnailLazyLoadTreshold" must be an integer.');
      }

      if( toType(G.O.paginationMaxLinesPerPage) == 'number' && G.O.paginationMaxLinesPerPage >= 0 ) {
        G.pgMaxLinesPerPage=G.O.paginationMaxLinesPerPage;
      }
      else {
        nanoConsoleLog('Parameter "paginationMaxLinesPerPage" must be an integer.');
      }

      // resolution breakpoints --> convert old syntax to new one
      if( G.O.thumbnailSizeSM !== undefined ) { G.O.breakpointSizeSM=G.O.thumbnailSizeSM; }
      if( G.O.thumbnailSizeME !== undefined ) { G.O.breakpointSizeME=G.O.thumbnailSizeME; }
      if( G.O.thumbnailSizeLA !== undefined ) { G.O.breakpointSizeLA=G.O.thumbnailSizeLA; }
      if( G.O.thumbnailSizeXL !== undefined ) { G.O.breakpointSizeXL=G.O.thumbnailSizeXL; }


      /*
      if( G.tn.settings.getH() == 'auto' || G.tn.settings.getW() == 'auto' ) {
        if( G.O.paginationMaxLinesPerPage >0 ) {
          nanoConsoleLog('Parameters "paginationMaxLinesPerPage" and "thumbnailWidth/thumbnailHeight" value "auto" are not compatible.');
        }
        G.pgMaxLinesPerPage=0;

      }
      */

      // random sorting
      var s1=G.O.albumSorting.toUpperCase();
      if( s1.indexOf('RANDOM') == 0 && s1.length > 6 ) {
        n= parseInt(s1.substring(6));
        if( n > 0 ) {
          G.maxAlbums=n;
        }
        G.O.albumSorting='random';
      }
      var s2=G.O.photoSorting.toUpperCase();
      if( s2.indexOf('RANDOM') == 0 && s2.length > 6 ) {
        n= parseInt(s2.substring(6));
        if( n > 0 ) {
          G.maxPhotos=n;
        }
        G.O.photoSorting='random';
      }
      
      var mA=parseInt(G.O.albumMax);
      if( mA > 0 ) {
        G.maxAlbums=n;
      }


      // thumbnails hover effects - Level1
      var tL1HE=G.O.thumbnailL1HoverEffect;
      if( tL1HE !== undefined ) {
        switch( toType(tL1HE) ) {
          case 'string':
            var tmp=tL1HE.split(',');
            for(var i=0; i<tmp.length; i++) {
              if( tmp[i] != 'none' && isAEngineSupported(tmp[i]) ) {
                var oDef=NewTHoverEffect();
                oDef.name=tmp[i];
                G.tnL1HE.push(oDef);
              }
            }
            break;
          case 'object':
            if( tL1HE.name != 'none' && isAEngineSupported(tL1HE.name) ) {
              var oDef=NewTHoverEffect();
              G.tnL1HE.push(jQuery.extend(oDef,tL1HE));
            }
            break;
          case 'array':
            for(var i=0; i<tL1HE.length; i++) {
              if( tL1HE[i].name != 'none' && isAEngineSupported(tL1HE[i].name) ) {
                var oDef=NewTHoverEffect();
                G.tnL1HE.push(jQuery.extend(oDef,tL1HE[i]));
              }
            }
            break;
          case 'null':
            break;
          default:
            nanoAlert('incorrect parameter for "thumbnailL1HoverEffect".');
        }
      }

      // thumbnails hover effects - other levels
      var tHE=G.O.thumbnailHoverEffect;
      switch( toType(tHE) ) {
        case 'string':
          var tmp=tHE.split(',');
          for(var i=0; i<tmp.length; i++) {
            if( tmp[i] != 'none' && isAEngineSupported(tmp[i]) ) {
              var oDef=NewTHoverEffect();
              oDef.name=tmp[i];
              G.tnHE.push(oDef);
            }
          }
          break;
        case 'object':
          if( tHE.name != 'none' && isAEngineSupported(tHE.name) ) {
            var oDef=NewTHoverEffect();
            G.tnHE.push(jQuery.extend(oDef,tHE));
          }
          break;
        case 'array':
          for(var i=0; i<tHE.length; i++) {
            if( tHE[i].name != 'none' && isAEngineSupported(tHE[i].name) ) {
              var oDef=NewTHoverEffect();
              G.tnHE.push(jQuery.extend(oDef,tHE[i]));
            }
          }
          break;
        case 'null':
          break;
        default:
          nanoAlert('incorrect parameter for "thumbnailHoverEffect".');
      }


      if( G.tnHE.length == 0 ) {
        if( G.tnL1HE.length == 0 ) {
          G.O.touchAnimationL1=false;
        }
        G.O.touchAnimation=false;
      }


      // management of screen width
      G.curWidth=RetrieveCurWidth();

      // RETRIEVE ALL THUMBNAIL SIZES
      if( toType(G.O.thumbnailWidth) == 'number' ) {
        ThumbnailsDefaultSize( 'width', 'l1', G.O.thumbnailWidth, 'u');
        ThumbnailsDefaultSize( 'width', 'lN', G.O.thumbnailWidth, 'u');
      }
      else {
        var ws=G.O.thumbnailWidth.split(' ');
        var v='auto';
        if( ws[0].substring(0,4) != 'auto' ) { v=parseInt(ws[0]); }
        var c='u';
        if( ws[0].charAt(ws[0].length - 1) == 'C' ) { c='c'; }
        ThumbnailsDefaultSize( 'width', 'l1', v, c );   // default value for all resolutions and navigation levels
        ThumbnailsDefaultSize( 'width', 'lN', v, c );
        for( var i=1; i<ws.length; i++ ) {
          var r=ws[i].substring(0,2).toLowerCase();
          if( /xs|sm|me|la|xl/i.test(r) ) {
            var w=ws[i].substring(2);
            var v='auto';
            if( w.substring(0,4) != 'auto' ) { v=parseInt(w); }
            var c='u';
            if( w.charAt(w.length - 1) == 'C' ) { c='c'; }
            G.tn.settings.width['l1'][r]=v;
            G.tn.settings.width['lN'][r]=v;
            G.tn.settings.width['l1'][r+'c']=c;
            G.tn.settings.width['lN'][r+'c']=c;
          }
        }
      }
      if( G.O.thumbnailL1Width != undefined ) {
        if( toType(G.O.thumbnailL1Width) == 'number' ) {
          ThumbnailsDefaultSize( 'width', 'l1', G.O.thumbnailL1Width, 'u');
        }
        else {
          var ws=G.O.thumbnailL1Width.split(' ');
          var v='auto';
          if( ws[0].substring(0,4) != 'auto' ) { v=parseInt(ws[0]); }
          var c='u';
          if( ws[0].charAt(ws[0].length - 1) == 'C' ) { c='c'; }
          ThumbnailsDefaultSize( 'width', 'l1', v, c );
          for( var i=1; i<ws.length; i++ ) {
            var r=ws[i].substring(0,2).toLowerCase();
            if( /xs|sm|me|la|xl/i.test(r) ) {
              var w=ws[i].substring(2);
              var v='auto';
              if( w.substring(0,4) != 'auto' ) { v=parseInt(w); }
              var c='u';
              if( w.charAt(w.length - 1) == 'C' ) { c='c'; }
              G.tn.settings.width['l1'][r]=v;
              G.tn.settings.width['l1'][r+'c']=c;
            }
          }
        }
      }


      if( toType(G.O.thumbnailHeight) == 'number' ) {
        ThumbnailsDefaultSize( 'height', 'l1', G.O.thumbnailHeight, 'u');
        ThumbnailsDefaultSize( 'height', 'lN', G.O.thumbnailHeight, 'u');
      }
      else {
        var ws=G.O.thumbnailHeight.split(' ');
        var v='auto';
        if( ws[0].substring(0,4) != 'auto' ) { v=parseInt(ws[0]); }
        var c='u';
        if( ws[0].charAt(ws[0].length - 1) == 'C' ) { c='c'; }
        ThumbnailsDefaultSize( 'height', 'l1', v, c );   // default value for all resolutions and navigation levels
        ThumbnailsDefaultSize( 'height', 'lN', v, c );
        for( var i=1; i<ws.length; i++ ) {
          var r=ws[i].substring(0,2).toLowerCase();
          if( /xs|sm|me|la|xl/i.test(r) ) {
            var w=ws[i].substring(2);
            var v='auto';
            if( w.substring(0,4) != 'auto' ) { v=parseInt(w); }
            var c='u';
            if( w.charAt(w.length - 1) == 'C' ) { c='c'; }
            G.tn.settings.height['l1'][r]=v;
            G.tn.settings.height['lN'][r]=v;
            G.tn.settings.height['l1'][r+'c']=c;
            G.tn.settings.height['lN'][r+'c']=c;
          }
        }
      }
      if( G.O.thumbnailL1Height != undefined ) {
        if( toType(G.O.thumbnailL1Height) == 'number' ) {
          ThumbnailsDefaultSize( 'height', 'l1', G.O.thumbnailL1Height, 'u');
        }
        else {
          var ws=G.O.thumbnailL1Height.split(' ');
          var v='auto';
          if( ws[0].substring(0,4) != 'auto' ) { v=parseInt(ws[0]); }
          var c='u';
          if( ws[0].charAt(ws[0].length - 1) == 'C' ) { c='c'; }
          ThumbnailsDefaultSize( 'height', 'l1', v, c );
          for( var i=1; i<ws.length; i++ ) {
            var r=ws[i].substring(0,2).toLowerCase();
            if( /xs|sm|me|la|xl/i.test(r) ) {
              var w=ws[i].substring(2);
              var v='auto';
              if( w.substring(0,4) != 'auto' ) { v=parseInt(w); }
              var c='u';
              if( w.charAt(w.length - 1) == 'C' ) { c='c'; }
              G.tn.settings.height['l1'][r]=v;
              G.tn.settings.height['l1'][r+'c']=c;
            }
          }
        }
      }
    }


    // ##### THUMBNAIL SIZE MANAGEMENT
    function ThumbnailsDefaultSize( dir, level, v, crop ) {
      G.tn.settings[dir][level]['xs']=v;
      G.tn.settings[dir][level]['sm']=v;
      G.tn.settings[dir][level]['me']=v;
      G.tn.settings[dir][level]['la']=v;
      G.tn.settings[dir][level]['xl']=v;
      G.tn.settings[dir][level]['xsc']=crop;
      G.tn.settings[dir][level]['smc']=crop;
      G.tn.settings[dir][level]['mec']=crop;
      G.tn.settings[dir][level]['lac']=crop;
      G.tn.settings[dir][level]['xlc']=crop;
    }

    function RetrieveCurWidth() {

      var vpW= getViewport().w;

      if( G.O.breakpointSizeSM > 0 && vpW < G.O.breakpointSizeSM) { return 'xs'; }
      if( G.O.breakpointSizeME > 0 && vpW < G.O.breakpointSizeME) { return 'sm'; }
      if( G.O.breakpointSizeLA > 0 && vpW < G.O.breakpointSizeLA) { return 'me'; }
      if( G.O.breakpointSizeXL > 0 && vpW < G.O.breakpointSizeXL) { return 'la'; }

      return 'xl';
    }

    function RetrieveMaxWidth() {
      var vpW= Math.max(getViewport().w, getViewport().h);

      if( G.O.breakpointSizeSM > 0 && vpW < G.O.breakpointSizeSM) { return 'xs'; }
      if( G.O.breakpointSizeME > 0 && vpW < G.O.breakpointSizeME) { return 'sm'; }
      if( G.O.breakpointSizeLA > 0 && vpW < G.O.breakpointSizeLA) { return 'me'; }
      if( G.O.breakpointSizeXL > 0 && vpW < G.O.breakpointSizeXL) { return 'la'; }

      return 'xl';
    }


    // HOVER EFFECTS
    function NewTHoverEffect() {
      // easing : jQuery supports only 'swing' and 'linear'
      var oDef={'delay':0, 'delayBack':0, 'duration':400, 'durationBack':200, 'easing':'swing', 'easingBack': 'swing', 'animParam':null };
      if( G.aengine != 'animate' ) {
        oDef.easing='ease';
        oDef.easingBack='ease';
      }
      return oDef;
    }


    // check if effect is compatible with the used animation engine
    // check also consistency of thumbnail configuration with hover effect
    function isAEngineSupported( effect ) {

      // var isBasic = /labelOpacity50|borderLighter|borderDarker/i.test(effect),
      var isBasic = /labelOpacity50|borderLighter|borderDarker/i.test(effect),
      // isStd = /imageFlipVertical|imageFlipHorizontal|imageRotateCornerBR|imageRotateCornerBL|rotateCornerBL|rotateCornerBR|imageScale150|overScale|overScaleOutside|imageScaleIn80|imageScale150Outside|scale120|scaleLabelOverImage|slideUp|slideDown|slideLeft|slideRight|imageSlideUp|imageSlideDown|imageSlideLeft|imageSlideRight|labelAppear|labelAppear75|descriptionAppear|labelSlideDown|labelSlideUp|labelSlideUpTop|imageInvisible|imageOpacity50|descriptionSlideUp|labelSplitVert|labelSplit4|labelAppearSplitVert|labelAppearSplit4|imageSplitVert|imageSplit4|imageSlide2Up|imageSlide2Down|imageSlide2Left|imageSlide2Right|imageSlide2Random|imageSlide2UpRight|imageSlide2UpLeft|imageSlide2DownRight|imageSlide2DownLeft/i.test(effect),
      isStd = /imageFlipVertical|imageFlipHorizontal|imageRotateCornerBR|imageRotateCornerBL|rotateCornerBL|rotateCornerBR|imageScale150|overScale|overScaleOutside|imageScaleIn80|imageScale150Outside|scale120|scaleLabelOverImage|slideUp|slideDown|slideLeft|slideRight|imageSlideUp|imageSlideDown|imageSlideLeft|imageSlideRight|labelAppear|labelAppear75|descriptionAppear|labelSlideDown|labelSlideUp|labelSlideUpTop|imageInvisible|imageOpacity50|descriptionSlideUp|labelSplitVert|labelSplit4|labelAppearSplitVert|labelAppearSplit4|imageSplitVert|imageSplit4/i.test(effect),
      // isAdv = /imageScaleIn80|imageScale150|imageScale150Outside|scale120|overScale|overScaleOutside|scaleLabelOverImage|imageFlipHorizontal|imageFlipVertical|rotateCornerBR|rotateCornerBL|imageRotateCornerBR|imageRotateCornerBL|imageExplode/i.test(effect);
      isAdv = /imageExplode/i.test(effect);

      G.O.touchAutoOpenDelay= parseInt(G.O.touchAutoOpenDelay);
      if( G.O.touchAutoOpenDelay == 0 ) {
        G.O.touchAutoOpenDelay=1000;
      }


      if( !isBasic && !isStd && !isAdv ) {
        nanoAlert('Unknow parameter value: thumbnailHoverEffect="'+effect+'".');
        return false;
      }

      if( G.O.thumbnailLabel.get('position') == 'onBottom' && !/borderLighter|borderDarker|imageOpacity50|imageScale150|imageScaleIn80|imageSlide2Up|imageSlide2Down|imageSlide2Left|imageSlide2Right|imageSlide2Random|imageSlide2UpRight|imageSlide2UpLeft|imageSlide2DownRight|imageSlide2DownLeft|imageScale150Outside|scale120/i.test(effect) ) {
        nanoAlert('The parameter combination thumbnailHoverEffect="'+effect+'" and thumbnailLabel.position="onBottom" is not supported.');
        return false;
      }

      if( (isAdv && (G.aengine == 'animate' || G.CSStransformName == null) ) ) {
        nanoConsoleLog('Parameter thumbnailHoverEffect="'+effect+'" requires one of the additionals jQuery plugins "Velocity" or "Transit".');
        return false;
      }

      return true;

    }


    // I18N : define text translations
    function i18n() {

      // browser language
      G.i18nLang = (navigator.language || navigator.userLanguage).toUpperCase();
      if( G.i18nLang === 'UNDEFINED') { G.i18nLang=''; }

      var llang=-('_'+G.i18nLang).length;

      if( toType(G.O.i18n) == 'object' ){

        for( var key in G.O.i18n ) {
          //var value = G.O.i18n[key];
          var s=key.substr(llang);
          if( s == ('_'+G.i18nLang) ) {
            G.i18nTranslations[key.substr(0,key.length-s.length)]=G.O.i18n[key];
          }
          else {
            G.i18nTranslations[key]=G.O.i18n[key];
          }
        }
      }
    }


    // Location Hash
    function ProcessLocationHash(isTriggeredByEvent) {

      // special use case -> openOnStart can be processed like location hash, only once (on start)
      if( G.O.openOnStart != '' ) {
        var ID=G.O.openOnStart;
        G.O.openOnStart='';
        return OpenItem( false, ID, true );
      }

      // standard use case -> location hash processing
      if( !G.O.locationHash ) { return false; }

      var albumID=null,
      imageID=null,
      curGal='#nanogallery/'+G.baseEltID+'/',
      hash=location.hash;

      if( hash == G.lastLocationHash ) { return; }

      if( hash == '' ) {
        if( G.lastOpenAlbumID != -1 ) {
          // back button and no hash --> display first album
          G.lastLocationHash='';
          OpenAlbum(0,false,-1,false);
          return true;
        }
      }

      if( hash.indexOf(curGal) == 0 ) {
        var ID=hash.substring(curGal.length);
        return OpenItem( isTriggeredByEvent, ID, !isTriggeredByEvent );
      }

      //return {albumID:albID, imageID:imgID};
    }

    function OpenItem( isTriggeredByEvent, ID, openAlbumOnViewerClose ) {
      var albumID=null,
      imageID=null,
      p=ID.indexOf('/'),
      albumIdx=-1,
      imageIdx=-1,
      l=G.I.length;

      if( p > 0 ) {
        albumID=ID.substring(0,p);
        imageID=ID.substring(p+1);
        for(var i=0; i<l; i++ ) {
          if( G.I[i].kind == 'image' && G.I[i].GetID() == imageID ) {
            imageIdx=i;
            break;
          }
        }
      }
      else {
        albumID=ID;
      }
      for(var i=0; i<l; i++ ) {
        if( G.I[i].kind == 'album' && G.I[i].GetID() == albumID ) {
          albumIdx=i;
          break;
        }
      }

      if( imageID !== null ) {
        // process IMAGE
        // if( !isTriggeredByEvent ) {
        if( openAlbumOnViewerClose ) {
          G.albumIdxToOpenOnViewerClose=albumIdx;
        }
        if( G.O.kind == '' ) {
          DisplayImage(imageIdx);
        }
        else {
          if( imageIdx == -1 ) {
            // first load the album
            if( G.O.viewerFullscreen ) {
              // activate fullscreen before ajax call, because it can be done only on user interaction
              ngscreenfull.request();
            }
            OpenAlbum(albumIdx,false,imageID,isTriggeredByEvent);
          }
          else {
            // album is already loaded
            DisplayImage(imageIdx);
          }
        }
        return true;

      }
      else {
        // process ALBUM
        OpenAlbum(albumIdx,false,-1,isTriggeredByEvent);
        return true;
      }

    }





    // build a dummy thumbnail to get different sizes and to cache them
    function ThumbnailDefCaches() {
      G.I=[];

      // var desc='';
      // if( G.O.thumbnailLabel.displayDescription ) { desc='d'; }
      // var item=NGAddItem('dummydummydummy', G.emptyGif, G.emptyGif, desc, '', 'image', '', '1', '0' ),
      // $newDiv=thumbnailBuild(item, 0, false).e$;

      // G.tn.borderWidth=$newDiv.outerWidth(true)-$newDiv.width();
      // G.tn.borderHeight=$newDiv.outerHeight(true)-$newDiv.height();

      // G.tn.imgcBorderWidth=$newDiv.find('.imgContainer').outerWidth(true)-$newDiv.find('.imgContainer').width();
      // G.tn.imgcBorderHeight=$newDiv.find('.imgContainer').outerHeight(true)-$newDiv.find('.imgContainer').height();

      // G.tn.labelBorderHeight=$newDiv.find('.labelImage').outerHeight(true)-$newDiv.find('.labelImage').height();
      // G.tn.labelBorderWidth=$newDiv.find('.labelImage').outerWidth(true)-$newDiv.find('.labelImage').width();

      // if( G.O.thumbnailLabel.position == 'onBottom' ) {
        // G.tn.labelHeight=$newDiv.find('.labelImage').outerHeight(true);
      // }

      // var lst=['xs','sm','me','la','xl'];
      // for( var i=0; i< lst.length; i++ ) {
        // var w=G.tn.settings.width['l1'][lst[i]];
        // if( w != 'auto' ) {
          // G.tn.outerWidth['l1'][lst[i]]=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
        // }
        // else {
          // G.tn.outerWidth['l1'][lst[i]]=0;
        // }
        // w=G.tn.settings.width['lN'][lst[i]];
        // if( w != 'auto' ) {
          // G.tn.outerWidth['lN'][lst[i]]=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
        // }
        // else {
          // G.tn.outerWidth['lN'][lst[i]]=0;
        // }
      // }
      // for( var i=0; i< lst.length; i++ ) {
        // var h=G.tn.settings.height['l1'][lst[i]];
        // if( h != 'auto' ) {
          // G.tn.outerHeight['l1'][lst[i]]=h+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight;
        // }
        // else {
          // G.tn.outerHeight['l1'][lst[i]]=0;
        // }
        // h=G.tn.settings.height['lN'][lst[i]];
        // if( h != 'auto' ) {
          // G.tn.outerHeight['lN'][lst[i]]=h+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight;
        // }
        // else {
          // G.tn.outerHeight['lN'][lst[i]]=0;
        // }
      // }



      // Retrieve LN
      G.curNavLevel='lN';
      var desc='';
      if( G.O.thumbnailLabel.get('displayDescription') ) { desc='d'; }
      var item=NGAddItem('dummydummydummy', G.emptyGif, G.emptyGif, desc, '', 'image', '', '1', '0' ),
      $newDiv=thumbnailBuild(item, 0, false).e$;

      G.tn.borderWidth=$newDiv.outerWidth(true)-$newDiv.width();
      G.tn.borderHeight=$newDiv.outerHeight(true)-$newDiv.height();

      G.tn.imgcBorderWidth=$newDiv.find('.imgContainer').outerWidth(true)-$newDiv.find('.imgContainer').width();
      G.tn.imgcBorderHeight=$newDiv.find('.imgContainer').outerHeight(true)-$newDiv.find('.imgContainer').height();

      G.tn.labelBorderHeight=$newDiv.find('.labelImage').outerHeight(true)-$newDiv.find('.labelImage').height();
      G.tn.labelBorderWidth=$newDiv.find('.labelImage').outerWidth(true)-$newDiv.find('.labelImage').width();

      if( G.O.thumbnailLabel.get('position') == 'onBottom' ) {
        G.tn.labelHeight.lN=$newDiv.find('.labelImage').outerHeight(true);
        G.tn.labelHeight.l1=G.tn.labelHeight.lN;
      }

      var lst=['xs','sm','me','la','xl'];
      for( var i=0; i< lst.length; i++ ) {
        //var w=G.tn.settings.width['l1'][lst[i]];
        //if( w != 'auto' ) {
        //  G.tn.outerWidth['l1'][lst[i]]=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
        //}
        //else {
        //  G.tn.outerWidth['l1'][lst[i]]=0;
        //}
        w=G.tn.settings.width['lN'][lst[i]];
        //w=G.tn.settings.width['l1'][lst[i]];
        if( w != 'auto' ) {
          G.tn.outerWidth['lN'][lst[i]]=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
          G.tn.outerWidth['l1'][lst[i]]=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
        }
        else {
          G.tn.outerWidth['lN'][lst[i]]=0;
          G.tn.outerWidth['l1'][lst[i]]=0;
        }
      }
      for( var i=0; i< lst.length; i++ ) {
        //var h=G.tn.settings.height['l1'][lst[i]];
        //if( h != 'auto' ) {
        //  G.tn.outerHeight['l1'][lst[i]]=h+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight;
        //}
        //else {
        //  G.tn.outerHeight['l1'][lst[i]]=0;
        //}
        h=G.tn.settings.height['lN'][lst[i]];
        //h=G.tn.settings.height['l1'][lst[i]];
        if( h != 'auto' ) {
          G.tn.outerHeight['lN'][lst[i]]=h+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight.get();
          G.tn.outerHeight['l1'][lst[i]]=h+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight.get();
        }
        else {
          G.tn.outerHeight['lN'][lst[i]]=0;
          G.tn.outerHeight['l1'][lst[i]]=0;
        }
      }


      // Retrieve L1
      G.I=[];
      G.curNavLevel='l1';
      desc='';
      if( G.O.thumbnailLabel.get('displayDescription') ) { desc='d'; }
      item=NGAddItem('dummydummydummy', G.emptyGif, G.emptyGif, desc, '', 'image', '', '1', '0' );
      $newDiv=thumbnailBuild(item, 0, false).e$;

      G.tn.borderWidth=$newDiv.outerWidth(true)-$newDiv.width();
      G.tn.borderHeight=$newDiv.outerHeight(true)-$newDiv.height();

      G.tn.imgcBorderWidth=$newDiv.find('.imgContainer').outerWidth(true)-$newDiv.find('.imgContainer').width();
      G.tn.imgcBorderHeight=$newDiv.find('.imgContainer').outerHeight(true)-$newDiv.find('.imgContainer').height();

      G.tn.labelBorderHeight=$newDiv.find('.labelImage').outerHeight(true)-$newDiv.find('.labelImage').height();
      G.tn.labelBorderWidth=$newDiv.find('.labelImage').outerWidth(true)-$newDiv.find('.labelImage').width();

      if( G.O.thumbnailLabel.get('position') == 'onBottom' ) {
        G.tn.labelHeight.l1=$newDiv.find('.labelImage').outerHeight(true);
      }

      var lst=['xs','sm','me','la','xl'];
      for( var i=0; i< lst.length; i++ ) {
        var w=G.tn.settings.width['l1'][lst[i]];
        if( w != 'auto' ) {
          G.tn.outerWidth['l1'][lst[i]]=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
        }
        else {
          G.tn.outerWidth['l1'][lst[i]]=0;
        }
        //w=G.tn.settings.width['lN'][lst[i]];
        //if( w != 'auto' ) {
        //  G.tn.outerWidth['lN'][lst[i]]=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
        //}
        //else {
        //  G.tn.outerWidth['lN'][lst[i]]=0;
        //}
      }
      for( var i=0; i< lst.length; i++ ) {
        var h=G.tn.settings.height['l1'][lst[i]];
        if( h != 'auto' ) {
          G.tn.outerHeight['l1'][lst[i]]=h+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight.get();
        }
        else {
          G.tn.outerHeight['l1'][lst[i]]=0;
        }
        //h=G.tn.settings.height['lN'][lst[i]];
        //if( h != 'auto' ) {
        //  G.tn.outerHeight['lN'][lst[i]]=h+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight.get();
        //}
        //else {
        //  G.tn.outerHeight['lN'][lst[i]]=0;
        //}
      }


      // pagination
      G.pgMaxNbThumbnailsPerRow=NbThumbnailsPerRow();

      // backup values used in animations/transitions
      G.custGlobals.oldBorderColor=$newDiv.css('border-color-top');
      if( G.custGlobals.oldBorderColor == '' || G.custGlobals.oldBorderColor == null || G.custGlobals.oldBorderColor == undefined ) { G.custGlobals.oldBorderColor='#000'; }
      G.custGlobals.oldLabelOpacity=$newDiv.find('.labelImage').css('opacity');
      var c=jQuery.Color($newDiv.find('.labelImage'),'backgroundColor');
      if( c == 'transparent' ) {
        G.custGlobals.oldLabelRed=0;
        G.custGlobals.oldLabelGreen=0;
        G.custGlobals.oldLabelBlue=0;
      }
      else {
        G.custGlobals.oldLabelRed=c.red();
        G.custGlobals.oldLabelGreen=c.green();
        G.custGlobals.oldLabelBlue=c.blue();
      }

      G.I=[];

      // thumbnail content CSS styles
      if( G.O.thumbnailLabel.display ) {
        switch( G.O.thumbnailLabel.position ){
          case 'onBottom':
            G.tn.styleLabelImage='top:0; position:relative; left:0; right:0;';
            G.tn.styleL1LabelImage='top:0; position:relative; left:0; right:0;';
            if( G.tn.settings.getH() == 'auto' ) {
              // line break
              G.tn.styleFTitle='white-space:normal;';
              G.tn.styleL1FTitle='white-space:normal;';
              G.tn.styleITitle='white-space:normal;';
              G.tn.styleL1ITitle='white-space:normal;';
              G.tn.styleDesc='white-space:normal;';
              G.tn.styleL1Desc='white-space:normal;';
            }
            else {
              // no line break
              G.tn.styleFTitle='white-space:nowrap;';
              G.tn.styleL1FTitle='white-space:nowrap;';
              G.tn.styleITitle='white-space:nowrap;';
              G.tn.styleL1ITitle='white-space:nowrap;';
              G.tn.styleDesc='white-space:nowrap;';
              G.tn.styleL1Desc='white-space:nowrap;';
            }
            break;
          case 'overImageOnTop':
            G.tn.styleLabelImage='top:0; bottom:0; left:0; right:0;';
            G.tn.styleL1LabelImage='top:0; bottom:0; left:0; right:0;';
            break;
          case 'overImageOnMiddle':
            G.tn.styleLabelImage='top:0; bottom:0; left:0; right:0;';
            G.tn.styleL1LabelImage='top:0; bottom:0; left:0; right:0;';
            G.tn.styleFTitle='left:0; right:0; position:absolute; bottom:50%;';
            G.tn.styleL1FTitle='left:0; right:0; position:absolute; bottom:50%;';
            G.tn.styleITitle='left:0; right:0; position:absolute; bottom:50%;';
            G.tn.styleL1ITitle='left:0; right:0; position:absolute; bottom:50%;';
            G.tn.styleDesc='left:0; right:0; position:absolute; top:50%;';
            G.tn.styleL1Desc='left:0; right:0; position:absolute; top:50%;';
            break;
          case 'custom':
            break;
          case 'overImageOnBottom':
          default :
            G.O.thumbnailLabel.position='overImageOnBottom';
            G.tn.styleLabelImage='bottom:0; left:0; right:0;';
            G.tn.styleL1LabelImage='bottom:0; left:0; right:0;';
            break;
        }
      }
      if( G.O.thumbnailL1Label && G.O.thumbnailL1Label.display ) {
        switch( G.O.thumbnailL1Label.position ){
          case 'onBottom':
            G.tn.styleL1LabelImage='top:0; position:relative; left:0; right:0;';
            if( G.tn.settings.getH() == 'auto' ) {
              // line break
              G.tn.styleL1FTitle='white-space:normal;';
              G.tn.styleL1ITitle='white-space:normal;';
              G.tn.styleL1Desc='white-space:normal;';
            }
            else {
              // no line break
              G.tn.styleL1FTitle='white-space:nowrap;';
              G.tn.styleL1ITitle='white-space:nowrap;';
              G.tn.styleL1Desc='white-space:nowrap;';
            }
            break;
          case 'overImageOnTop':
            G.tn.styleL1LabelImage='top:0; bottom:0; left:0; right:0;';
            break;
          case 'overImageOnMiddle':
            G.tn.styleL1LabelImage='top:0; bottom:0; left:0; right:0;';
            G.tn.styleL1FTitle='left:0; right:0; position:absolute; bottom:50%;';
            G.tn.styleL1ITitle='left:0; right:0; position:absolute; bottom:50%;';
            G.tn.styleL1Desc='left:0; right:0; position:absolute; top:50%;';
            break;
          case 'custom':
            G.tn.styleL1LabelImage='';
            break;
          case 'overImageOnBottom':
          default :
            G.O.thumbnailL1Label.position='overImageOnBottom';
            G.tn.styleL1LabelImage='bottom:0; left:0; right:0;';
            break;
        }
      }
    }

    function GetI18nItem( item, property ) {
      var s='';
      if( G.i18nLang != '' ) {
        if( item[property+'_'+G.i18nLang] !== undefined && item[property+'_'+G.i18nLang].length>0 ) {
          s=item[property+'_'+G.i18nLang];
          return s;
        }
      }
      s=item[property];
      return s;
    }



    // ####################################
    // ##### LIST OF ITEMS IN OPTIONS #####
    // ####################################

    function GetImageTitle( imageSRC ) {
      if( G.O.thumbnailLabel.get('title') == '%filename' ) {
        return (imageSRC.split('/').pop()).replace('_',' ');
      }

      if( G.O.thumbnailLabel.get('title') == '%filenameNoExt' ) {
        var s=imageSRC.split('/').pop();
        return (s.split('.').shift()).replace('_',' ');
      }
      return imageSRC;
    }

    function ProcessItemOption() {

      var foundAlbumID=false;

      if( typeof G.O.dataSorting !== 'undefined' ) {
        if( G.O.dataSorting == 'random' ) {
          G.O.items=AreaShuffle(G.O.items);
        }else if( G.O.dataSorting == 'reversed' ) {
          G.O.items=G.O.items.reverse();
        }
      }

      jQuery.each(G.O.items, function(i,item){

        var title='';
        title=GetI18nItem(item,'title');
        if( title === undefined ) { title=''; }

        var src=G.O.itemsBaseURL;
        if( item['src'+RetrieveMaxWidth().toUpperCase()] !== undefined ) {
          src+=item['src'+RetrieveMaxWidth().toUpperCase()];
        }
        else {
          src+=item.src;
        }

        var thumbsrc='';
        if( item.srct !== undefined && item.srct.length>0 ) {
          thumbsrc=G.O.itemsBaseURL+item.srct;
        }
        else {
          thumbsrc=src;
        }

        var thumbsrcX2='';
        if( item.srct2x !== undefined && item.srct2x.length>0 ) {
          thumbsrcX2=G.O.itemsBaseURL+item.srct2x;
        }
        else {
          if( thumbsrc != '' ) {
            thumbsrcX2=thumbsrc;
          }
          else {
            thumbsrcX2=src;
          }
        }


        if( G.O.thumbnailLabel.get('title') != '' ) {
          title=GetImageTitle(src);
        }

        var description='';     //'&nbsp;';
        description=GetI18nItem(item,'description');
        if( description === undefined ) { description=''; }
        //if( toType(item.description) == 'string' ) {
        //  description=item.description;
        //}

        var destinationURL='';
        if( item.destURL !== undefined && item.destURL.length>0 ) {
          destinationURL=item.destURL;
        }

        //if( item.tags !== undefined && item.tags.length>0 ) {
        //  tags=item.tags;
        //}
        var tags=GetI18nItem(item,'tags');
        if( tags === undefined ) { tags=''; }

        var albumID=0;
        if( item.albumID !== undefined  ) {
          albumID=item.albumID;
          foundAlbumID=true;
        }
        var ID=null;
        if( item.ID !== undefined ) {
          ID=item.ID;
        }
        var kind='image';
        if( item.kind !== undefined && item.kind.length>0 ) {
          kind=item.kind;
        }

        var newItem=NGAddItem(title, thumbsrc, src, description, destinationURL, kind, tags, ID, albumID );

        // thumbnail image size
        var tw=0;
        if( item.imgtWidth !== undefined && item.imgtWidth>0 ) {
          tw=item.imgtWidth;
          //newItem.thumbImgWidth=tw;
        }
        var th=0;
        if( item.imgtHeight !== undefined && item.imgtHeight>0 ) {
          th=item.imgtHeight;
          //newItem.thumbImgHeight=th;
        }

        newItem.thumbs = {
          url: { l1 : { xs:thumbsrc, sm:thumbsrc, me:thumbsrc, la:thumbsrc, xl:thumbsrc }, lN : { xs:thumbsrc, sm:thumbsrc, me:thumbsrc, la:thumbsrc, xl:thumbsrc } },
          width: { l1 : { xs:tw, sm:tw, me:tw, la:tw, xl:tw }, lN : { xs:tw, sm:tw, me:tw, la:tw, xl:tw } },
          height: { l1 : { xs:th, sm:th, me:th, la:th, xl:th }, lN : { xs:th, sm:th, me:th, la:th, xl:th } }
        };

        // custom data
        if( item.customData !== null ) {
          newItem.customData=cloneJSObject(item.customData);
        }

        if( typeof G.O.fnProcessData == 'function' ) {
          G.O.fnProcessData(newItem, 'api', null);
        }
      });

      if( foundAlbumID ) {
        G.O.displayBreadcrumb=true;
      }

      // get the number of images per album for all the items
      var l=G.I.length,
      nb=0,
      nbImages=0;
      for( var i=0; i<l; i++ ){
        nb=0;
        nbImages=0;
        for( var j=0; j<l; j++ ){
          if( i!=j && G.I[i].GetID() == G.I[j].albumID ) {
            nb++;
            if( G.I[j].kind == 'image' ) {
              G.I[j].imageNumber=nbImages++;
            }
          }
        }
        G.I[i].contentLength=nb;
      }

    }

    function cloneJSObject( obj ) {
      if (obj === null || typeof obj !== 'object') {
        return obj;
      }

      var temp = obj.constructor(); // give temp the original obj's constructor
      for (var key in obj) {
          temp[key] = cloneJSObject(obj[key]);
      }
      return temp;
    }


    // ###################################
    // ##### LIST OF HREF ATTRIBUTES #####
    // ###################################

    function ProcessHREF(elements) {
      var foundAlbumID=false;

      if( typeof G.O.dataSorting !== 'undefined' ) {
        if( G.O.dataSorting == 'random' ) {
          elements=AreaShuffle(elements);
        }else if( G.O.dataSorting == 'reversed' ) {
          jQuery.fn.reverse = [].reverse;
          elements=elements.reverse();
        }
      }


      jQuery.each(elements, function(i,item){
        var thumbsrc='';
        if( jQuery(item).attr('data-ngthumb') !== undefined && jQuery(item).attr('data-ngthumb').length>0 ) {
          thumbsrc=G.O.itemsBaseURL+jQuery(item).attr('data-ngthumb');
        }
        if( jQuery(item).attr('data-ngThumb') !== undefined && jQuery(item).attr('data-ngThumb').length>0 ) {
          thumbsrc=G.O.itemsBaseURL+jQuery(item).attr('data-ngThumb');
        }
        var thumbsrcX2='';
        if( jQuery(item).attr('data-ngthumb2x') !== undefined && jQuery(item).attr('data-ngthumb2x').length>0 ) {
          thumbsrcX2=G.O.itemsBaseURL+jQuery(item).attr('data-ngthumb2x');
        }
        if( jQuery(item).attr('data-ngThumb2x') !== undefined && jQuery(item).attr('data-ngThumb2x').length>0 ) {
          thumbsrcX2=G.O.itemsBaseURL+jQuery(item).attr('data-ngThumb2x');
        }

        // responsive image source
        var src='',
        st=RetrieveMaxWidth().toUpperCase();
        if( jQuery(item).attr('data-ngsrc'+st) !== undefined && jQuery(item).attr('data-ngsrc'+st).length>0 ) {
          src=G.O.itemsBaseURL+jQuery(item).attr('data-ngsrc'+st);
        }
        if( jQuery(item).attr('data-ngSrc'+st) !== undefined && jQuery(item).attr('data-ngSrc'+st).length>0 ) {
          src=G.O.itemsBaseURL+jQuery(item).attr('data-ngSrc'+st);
        }
        if( src == '' ) {
          src=G.O.itemsBaseURL+jQuery(item).attr('href');
        }

        //newObj.description=jQuery(item).attr('data-ngdesc');
        var description='';
        if( jQuery(item).attr('data-ngdesc') !== undefined && jQuery(item).attr('data-ngdesc').length>0 ) {
          description=jQuery(item).attr('data-ngdesc');
        }
        if( jQuery(item).attr('data-ngDesc') !== undefined && jQuery(item).attr('data-ngDesc').length>0 ) {
          description=jQuery(item).attr('data-ngDesc');
        }

        var destURL='';
        if( jQuery(item).attr('data-ngdest') !== undefined && jQuery(item).attr('data-ngdest').length>0 ) {
          destURL=jQuery(item).attr('data-ngdest');
        }
        if( jQuery(item).attr('data-ngDest') !== undefined && jQuery(item).attr('data-ngDest').length>0 ) {
          destURL=jQuery(item).attr('data-ngDest');
        }

        var albumID=0;
        if( jQuery(item).attr('data-ngalbumid') !== undefined ) {
          albumID=jQuery(item).attr('data-ngalbumid');
          foundAlbumID=true;
        }
        if( jQuery(item).attr('data-ngAlbumID') !== undefined ) {
          albumID=jQuery(item).attr('data-ngAlbumID');
          foundAlbumID=true;
        }

        var ID=null;
        if( jQuery(item).attr('data-ngid') !== undefined ) {
          ID=jQuery(item).attr('data-ngid');
        }
        if( jQuery(item).attr('data-ngID') !== undefined ) {
          ID=jQuery(item).attr('data-ngID');
        }

        var kind='image';
        if( jQuery(item).attr('data-ngkind') !== undefined && jQuery(item).attr('data-ngkind').length>0 ) {
          kind=jQuery(item).attr('data-ngkind');
        }
        if( jQuery(item).attr('data-ngKind') !== undefined && jQuery(item).attr('data-ngKind').length>0 ) {
          kind=jQuery(item).attr('data-ngKind');
        }

        var title=jQuery(item).text();
        if( !(G.O.thumbnailLabel.get('title') == '' || G.O.thumbnailLabel.get('title') == undefined) ) {
          title=GetImageTitle(src);
        }

        var newItem=NGAddItem(title, thumbsrc, src, description, destURL, kind, '', ID, albumID );

        // thumbnail image size
        var tw=0;
        if( jQuery(item).attr('data-ngthumbImgWidth') !== undefined && jQuery(item).attr('data-ngthumbImgWidth').length>0 ) {
          tw=jQuery(item).attr('data-ngthumbImgWidth');
          //newItem.thumbImgWidth=tw;
        }
        var th=0;
        if( jQuery(item).attr('data-ngthumbImgHeight') !== undefined && jQuery(item).attr('data-ngthumbImgHeight').length>0 ) {
          th=jQuery(item).attr('data-ngthumbImgHeight');
          //newItem.thumbImgHeight=th;
        }

        newItem.thumbs = {
          url: { l1 : { xs:thumbsrc, sm:thumbsrc, me:thumbsrc, la:thumbsrc, xl:thumbsrc }, lN : { xs:thumbsrc, sm:thumbsrc, me:thumbsrc, la:thumbsrc, xl:thumbsrc } },
          width: { l1 : { xs:tw, sm:tw, me:tw, la:tw, xl:tw }, lN : { xs:tw, sm:tw, me:tw, la:tw, xl:tw } },
          height: { l1 : { xs:th, sm:th, me:th, la:th, xl:th }, lN : { xs:th, sm:th, me:th, la:th, xl:th } }
        };

        // custom data
        if( jQuery(item).data('customdata') !== undefined ) {
          newItem.customData=cloneJSObject(jQuery(item).data('customdata'));
        }


        if( typeof G.O.fnProcessData == 'function' ) {
          G.O.fnProcessData(newItem, 'markup', null);
        }

      });

      jQuery.each(elements, function(i,item){ jQuery(item).remove(); });

      if( foundAlbumID ) {
        G.O.displayBreadcrumb=true;
      }

      // get the number of images per album for all the items
      var l=G.I.length,
      nb=0,
      nbImages=0;
      for( var i=0; i<l; i++ ){
        nb=0;
        nbImages=0;
        for( var j=0; j<l; j++ ){
          if( i!=j && G.I[i].GetID() == G.I[j].albumID ) {
            nb++;
            if( G.I[j].kind == 'image' ) {
              G.I[j].imageNumber=nbImages++;
            }
          }
        }
        G.I[i].contentLength=nb;
      }

    }


    // ##########################
    // ##### CUSTOM STORAGE #####
    // ##########################

    function JsonProcessItems( albumIdx, processLocationHash, imageID, setLocationHash ) {

      manageGalleryToolbar(albumIdx);

      if( G.I[albumIdx].contentIsLoaded ) {    // already loaded?
        DisplayAlbum(albumIdx,setLocationHash);
        return;
      }

      var url = G.O.jsonProvider + '?albumID='+encodeURIComponent(G.I[albumIdx].GetID());
      PreloaderShow();

      jQuery.ajaxSetup({ cache: false });
      jQuery.support.cors = true;

      var tId = setTimeout( function() {
        // workaround to handle JSONP (cross-domain) errors
        PreloaderHide();
        nanoAlert('Could not retrieve Custom data...');
      }, 60000 );
      jQuery.getJSON(url, function(data, status, xhr) {
        clearTimeout(tId);
        PreloaderHide();

        JsonParseData(albumIdx, data);

        if( processLocationHash || G.O.openOnStart != '') {
          if( !ProcessLocationHash(false) ) {
            DisplayAlbum(albumIdx,setLocationHash);
          }
        }
        else {
          if( imageID != -1 ) {
            var imageIdx=-1,
            l=G.I.length;
            for(var i=0; i<l; i++ ) {
              if( G.I[i].kind == 'image' && G.I[i].GetID() == imageID ) {
                imageIdx=i;
                break;
              }
            }
            DisplayImage(imageIdx,true);
          }
          else {
            DisplayAlbum(albumIdx,setLocationHash);
          }
        }
      })
      .fail( function(jqxhr, textStatus, error) {
        clearTimeout(tId);
        PreloaderHide();
        var err = textStatus + ', ' + error;
        nanoAlert("Could not retrieve JSON items list (jQuery): " + err);
      });

    }

    function JsonConvertCharset( str ) {
      
      return decodeURIComponent(str);


      // Pb %C3%A9 --> %E9
      // in UTF-8: \u00e9=\xe9 (e9 = hex value)
      switch( G.O.jsonCharset.toUpperCase() ) {
        case 'UTF-8':     // Apache Windows
          return decodeURI(str);      // do not use decodeURIComponent (would convert slash also)
          break;
        case 'Latin':     // Apache Linux
        default :
          return escape(str);
          break;
      }
    }

    function JsonParseData(albumIdx, data) {
      var foundAlbumID=false;
      var nb=0;
      jQuery.each(data, function(i,item){

        var title='';
        title=GetI18nItem(item,'title');
        if( title === undefined ) { title=''; }

        var baseURL=G.O.jsonProvider.substring(0, G.O.jsonProvider.indexOf('nanoPhotosProvider.php'));

        var src=baseURL+JsonConvertCharset(item.src);
        var thumbsrc=baseURL+JsonConvertCharset(item.srct);

        if( G.O.thumbnailLabel.get('title') != '' ) {
          title=GetImageTitle((item.src));
        }

        var description='';     //'&nbsp;';
        description=GetI18nItem(item,'description');
        if( description === undefined ) { description=''; }

        var destinationURL='';

        var albumID=0;
        if( item.albumID !== undefined  ) {
          albumID=(item.albumID);
          foundAlbumID=true;
        }
        var ID=null;
        if( item.ID !== undefined ) {
          ID=(item.ID);
        }

        var kind='image';
        if( item.kind !== undefined && item.kind.length>0 ) {
          kind=item.kind;
        }

        var newItem=NGAddItem(title, thumbsrc, src, description, destinationURL, kind, '', ID, albumID );
        // thumbnail image size
        var tw=item.imgtWidth;
        var th=item.imgtHeight;

        newItem.thumbs = {
          url: { l1 : { xs:thumbsrc, sm:thumbsrc, me:thumbsrc, la:thumbsrc, xl:thumbsrc }, lN : { xs:thumbsrc, sm:thumbsrc, me:thumbsrc, la:thumbsrc, xl:thumbsrc } },
          width: { l1 : { xs:tw, sm:tw, me:tw, la:tw, xl:tw }, lN : { xs:tw, sm:tw, me:tw, la:tw, xl:tw } },
          height: { l1 : { xs:th, sm:th, me:th, la:th, xl:th }, lN : { xs:th, sm:th, me:th, la:th, xl:th } }
        };

        if( typeof G.O.fnProcessData == 'function' ) {
          G.O.fnProcessData(newItem, 'api', null);
        }

        if( kind == 'image' ) {
          newItem.imageNumber=nb;
          nb++;
          if( nb >= G.maxAlbums ) {
            return false;
          }
        }
      });

      if( foundAlbumID ) {
        G.O.displayBreadcrumb=true;
      }

      G.I[albumIdx].contentIsLoaded=true;
      G.I[albumIdx].contentLength=nb;

    }


    // ##########################
    // ##### FLICKR STORAGE #####
    // ##########################

    function FlickrProcessItems( albumIdx, processLocationHash, imageID, setLocationHash) {

      manageGalleryToolbar(albumIdx);

      if( G.I[albumIdx].contentIsLoaded ) {    // already loaded?
        DisplayAlbum(albumIdx,setLocationHash);
        return;
      }

      var url = '',
      kind='album';
      if( G.I[albumIdx].GetID() == 0 ) {
        // albums
        //url = G.flickr.url() + "?&method=flickr.photosets.getList&api_key=" + G.flickr.ApiKey + "&user_id="+G.O.userID+"&primary_photo_extras=url_"+G.flickr.thumbSize+"&format=json&jsoncallback=?";
        url = G.flickr.url() + "?&method=flickr.photosets.getList&api_key=" + G.flickr.ApiKey + "&user_id="+G.O.userID+"&per_page=500&primary_photo_extras=url_o,url_sq,url_t,url_q,url_s,url_m,url_l,url_z,url_b,url_h,url_k&format=json&jsoncallback=?";
      }
      else {
        // photos
        if( G.I[albumIdx].GetID() == 'none' ) {
          // get photos from full photostream
          url = G.flickr.url() + "?&method=flickr.people.getPublicPhotos&api_key=" + G.flickr.ApiKey + "&user_id="+G.O.userID+"&extras=description,views,url_o,url_sq,url_t,url_q,url_s,url_m,url_z,url_b,url_h,url_k&per_page=500&format=json&jsoncallback=?";
        }
        else {
          // photos from one specific photoset
          //url = G.flickr.url() + "?&method=flickr.photosets.getPhotos&api_key=" + G.flickr.ApiKey + "&photoset_id="+G.I[albumIdx].GetID()+"&extras=description,views,url_o,url_z,url_"+G.flickr.photoSize+",url_"+G.flickr.thumbSize+"&format=json&jsoncallback=?";
          url = G.flickr.url() + "?&method=flickr.photosets.getPhotos&api_key=" + G.flickr.ApiKey + "&photoset_id="+G.I[albumIdx].GetID()+"&extras=description,views,url_o,url_sq,url_t,url_q,url_s,url_m,url_l,url_z,url_b,url_h,url_k&format=json&jsoncallback=?";
        }
        kind='image';
      }
      PreloaderShow();

      jQuery.ajaxSetup({ cache: false });
      jQuery.support.cors = true;

      var tId = setTimeout( function() {
        // workaround to handle JSONP (cross-domain) errors
        PreloaderHide();
        nanoAlert('Could not retrieve Flickr data...');
      }, 60000 );
      jQuery.getJSON(url, function(data, status, xhr) {
        clearTimeout(tId);
        PreloaderHide();
        if( kind == 'album' ) {
          FlickrParsePhotoSets(albumIdx, data);
        }
        else {
          FlickrParsePhotos(albumIdx, data);
        }
        if( processLocationHash || G.O.openOnStart != '' ) {
          if( !ProcessLocationHash(false) ) {
            DisplayAlbum(albumIdx,setLocationHash);
          }
        }
        else {
          if( imageID != -1 ) {
            var imageIdx=-1,
            l=G.I.length;
            for(var i=0; i<l; i++ ) {
              if( G.I[i].kind == 'image' && G.I[i].GetID() == imageID ) {
                imageIdx=i;
                break;
              }
            }
            DisplayImage(imageIdx,true);
          }
          else {
            DisplayAlbum(albumIdx,setLocationHash);
          }
        }
      })
      .fail( function(jqxhr, textStatus, error) {
        clearTimeout(tId);
        PreloaderHide();
        var err = textStatus + ', ' + error;
        nanoAlert("Could not retrieve Flickr photoset list (jQuery): " + err);
      });

    }


    function FlickrParsePhotoSets( albumIdx, data ) {
      var ok=true;
      if( data.stat !== undefined ) {
        if( data.stat === 'fail' ) {
          nanoAlert("Could not retrieve Flickr photoset list: " + data.message + " (code: "+data.code+").");
          ok=false;
        }
      }

      if( ok ) {
        var nb=0;

        var source = data.photosets.photoset;
        switch( G.O.albumSorting ) {
          case 'random':
            source = AreaShuffle(source);
            break;
          case 'reversed':
            source = source.reverse();
            break;
          case 'titleAsc':
            source.sort(function (a, b) {
              var x = a.title._content.toUpperCase();
              var y =  b.title._content.toUpperCase();
              return( (x < y) ? -1 : ((x > y) ? 1 : 0) );
            });
            break;
          case 'titleDesc':
            source.sort(function (a, b) {
              var x = a.title._content.toUpperCase();
              var y =  b.title._content.toUpperCase();
              return( (x > y) ? -1 : ((x < y) ? 1 : 0) );
            });
        }

        jQuery.each(source, function(i,item){
          //Get the title
          itemTitle = item.title._content;

          if( CheckAlbumName(itemTitle, item.id) ) {
            itemID=item.id;
            //Get the description
            itemDescription='';
            if (item.description._content != undefined) {
              itemDescription=item.description._content;
            }

            var sizes = {};
            for (var p in item.primary_photo_extras) {
              sizes[p]=item.primary_photo_extras[p];
            }
            tags='';
            if( item.primary_photo_extras !== undefined ) {
              if( item.primary_photo_extras.tags !== undefined ) {
                tags=item.primary_photo_extras.tags;
              }
            }

            var newItem=NGAddItem(itemTitle, '', '', itemDescription, '', 'album', tags, itemID, G.I[albumIdx].GetID() );
            //newItem.thumbImgWidth=item.primary_photo_extras['width_'+G.flickr.thumbSize];
            //newItem.thumbImgHeight=item.primary_photo_extras['height_'+G.flickr.thumbSize];
            newItem.contentLength=item.photos;
            newItem.thumbSizes=sizes;

            var tn = {
              url: { l1 : { xs:'', sm:'', me:'', la:'', xl:'' }, lN : { xs:'', sm:'', me:'', la:'', xl:'' } },
              width: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } },
              height: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } }
            };
            tn=FlickrRetrieveImages(tn, item.primary_photo_extras, 'l1' );
            tn=FlickrRetrieveImages(tn, item.primary_photo_extras, 'lN' );
            newItem.thumbs=tn;

            nb++;
            if( nb >= G.maxAlbums ) {
              return false;
            }
          }
        });

        G.I[albumIdx].contentIsLoaded=true;
        G.I[albumIdx].contentLength=nb;
      }
    }

    function FlickrRetrieveImages(tn, item, level ) {
      var sizes=['xs','sm','me','la','xl'];
      for(var i=0; i<sizes.length; i++ ) {
        if( G.tn.settings.width[level][sizes[i]] == 'auto' ) {
          var sdir='height_';
          var tsize=Math.ceil(G.tn.settings.height[level][sizes[i]]*G.tn.scale);
          var one=FlickrRetrieveOneImage(sdir, tsize, item );
          tn.url[level][sizes[i]]=one.url;
          tn.width[level][sizes[i]]=one.width;
          tn.height[level][sizes[i]]=one.height;
        }
        else
          if( G.tn.settings.height[level][sizes[i]] == 'auto' ) {
            var sdir='width_';
            var tsize=Math.ceil(G.tn.settings.width[level][sizes[i]]*G.tn.scale);
            var one=FlickrRetrieveOneImage(sdir, tsize, item );
            tn.url[level][sizes[i]]=one.url;
            tn.width[level][sizes[i]]=one.width;
            tn.height[level][sizes[i]]=one.height;
          }
          else {
            var sdir='height_';
            var tsize=Math.ceil(G.tn.settings.height[level][sizes[i]]*G.tn.scale);
            if( G.tn.settings.width[level][sizes[i]] > G.tn.settings.height[level][sizes[i]] ) {
              sdir='width_';
              tsize=Math.ceil(G.tn.settings.width[level][sizes[i]]*G.tn.scale);
            }
            var one=FlickrRetrieveOneImage(sdir, tsize, item );
            tn.url[level][sizes[i]]=one.url;
            tn.width[level][sizes[i]]=one.width;
            tn.height[level][sizes[i]]=one.height;
          }
      }
      return tn;
    }

    function FlickrRetrieveOneImage(sdir, tsize, item ) {
      var one={ url:'', width:0, height:0 };
      var tnIndex=0;
      for(var j=0; j<G.flickr.thumbAvailableSizes.length; j++ ) {
        var size=item[sdir+G.flickr.photoAvailableSizesStr[j]];
        if(  size != undefined ) {
          tnIndex=j;
          if( size >= tsize ) {
            break;
          }
        }
      }
      var fSize=G.flickr.photoAvailableSizesStr[tnIndex];
      one.url= item['url_'+fSize];
      one.width= parseInt(item['width_'+fSize]);
      one.height=parseInt(item['height_'+fSize]);
      return one;
    }

    function FlickrParsePhotos( albumIdx, data ) {
      var source = '';
      if( G.I[albumIdx].GetID() == 'none' ) {
        source = data.photos.photo;
      }
      else {
        source = data.photoset.photo;
      }

      switch( G.O.photoSorting ) {
        case 'random':
          source = AreaShuffle(source);
          break;
        case 'reversed':
          source = source.reverse();
          break;
        case 'titleAsc':
          source.sort(function (a, b) {
            // var x = a.title.toUpperCase();
            // var y =  b.title.toUpperCase();
            var x='', y='';
            if( G.O.thumbnailLabel.get('title') != '' ) {
              x=GetImageTitle(a.url_sq);
              y=GetImageTitle(b.url_sq);
            }
            else {
              x = a.title.toUpperCase();
              y =  b.title.toUpperCase();
            }
            return( (x < y) ? -1 : ((x > y) ? 1 : 0) );
          });
          break;
        case 'titleDesc':
          source.sort(function (a, b) {
            // var x = a.title.toUpperCase();
            // var y =  b.title.toUpperCase();
            var x='', y='';
            if( G.O.thumbnailLabel.get('title') != '' ) {
              x=GetImageTitle(a.url_sq);
              y=GetImageTitle(b.url_sq);
            }
            else {
              x = a.title.toUpperCase();
              y =  b.title.toUpperCase();
            }
            return( (x > y) ? -1 : ((x < y) ? 1 : 0) );
          });
          break;
      }

      var albumID=G.I[albumIdx].GetID(),
      nb=0;
      jQuery.each(source, function(i,item){
        //Get the title
        var itemTitle = item.title,
        itemID=item.id,
        itemDescription=item.description._content;    // Get the description

        var imgUrl=item.url_sq;  //fallback size
        for(var i=G.flickr.photoSize; i>=0; i-- ) {
          if( item['url_'+G.flickr.photoAvailableSizesStr[i]] != undefined ) {
            imgUrl=item['url_'+G.flickr.photoAvailableSizesStr[i]];
            break;
          }
        }

        var sizes = {};
        for (var p in item) {
          if( p.indexOf('height_') == 0 || p.indexOf('width_') == 0 || p.indexOf('url_') == 0 ) {
            sizes[p]=item[p];
          }
        }

        if( G.O.thumbnailLabel.get('title') != '' ) {
          itemTitle=GetImageTitle(imgUrl);
        }

        var newItem=NGAddItem(itemTitle, '', imgUrl, itemDescription, '', 'image', '', itemID, albumID );
        newItem.imageNumber=nb;
        if( item.url_o !== undefined ) {
          newItem.width=item.width_o;
          newItem.height=item.height_o;
        }
        else {
          newItem.width=item.width_z;
          newItem.height=item.height_z;
        }
        //newItem.thumbImgWidth=item['width_'+G.flickr.photoAvailableSizesStr[tnIndex]];
        //newItem.thumbImgHeight=item['height_'+G.flickr.photoAvailableSizesStr[tnIndex]];
  //      newItem.thumbSizes=sizes;


          var tn = {
            url: { l1 : { xs:'', sm:'', me:'', la:'', xl:'' }, lN : { xs:'', sm:'', me:'', la:'', xl:'' } },
            width: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } },
            height: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } }
          };
          tn=FlickrRetrieveImages(tn, item, 'l1' );
          tn=FlickrRetrieveImages(tn, item, 'lN' );
          newItem.thumbs=tn;

        nb++;
        if( nb >= G.maxPhotos ) {
          return false;
        }

      });
      G.I[albumIdx].contentIsLoaded=true;
      G.I[albumIdx].contentLength=nb;

    }




    // ##########################
    // ##### PICASA STORAGE #####
    // ##########################

    function AddOneThumbSize(thumbSizes, v1, v2, c1, c2 ) {
      var v=Math.ceil(v2*G.tn.scale)+c2;
      if( v1 == 'auto' ) {
        v=Math.ceil(v2*G.tn.scale)+c2;
      }
      else if( v2 == 'auto' ) {
          v=Math.ceil(v1*G.tn.scale)+c1;
        }
        else if( v1 > v2 ) {
          v=Math.ceil(v1*G.tn.scale)+c1;
        }

      if( thumbSizes.length > 0 ) {
        thumbSizes+=',';
      }
      thumbSizes+=v;
      return thumbSizes;
    }

    function PicasaProcessItems( albumIdx, processLocationHash, imageID, setLocationHash ) {
      manageGalleryToolbar(albumIdx);

      if( G.I[albumIdx].contentIsLoaded ) {    // already loaded?
        //renderGallery(albumIdx,0);
        DisplayAlbum(albumIdx,setLocationHash);
        return;
      }

      var url='',
      kind='album';

      var thumbSizes='';
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.l1.xs, G.tn.settings.height.l1.xs, G.tn.settings.width.l1.xsc, G.tn.settings.height.l1.xsc );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.l1.sm, G.tn.settings.height.l1.sm, G.tn.settings.width.l1.smc, G.tn.settings.height.l1.smc );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.l1.me, G.tn.settings.height.l1.me, G.tn.settings.width.l1.mec, G.tn.settings.height.l1.mec );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.l1.la, G.tn.settings.height.l1.la, G.tn.settings.width.l1.lac, G.tn.settings.height.l1.lac );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.l1.xl, G.tn.settings.height.l1.xl, G.tn.settings.width.l1.xlc, G.tn.settings.height.l1.xlc );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.lN.xs, G.tn.settings.height.lN.xs, G.tn.settings.width.lN.xsc, G.tn.settings.height.lN.xsc );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.lN.sm, G.tn.settings.height.lN.sm, G.tn.settings.width.lN.smc, G.tn.settings.height.lN.smc );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.lN.me, G.tn.settings.height.lN.me, G.tn.settings.width.lN.mec, G.tn.settings.height.lN.mec );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.lN.la, G.tn.settings.height.lN.la, G.tn.settings.width.lN.lac, G.tn.settings.height.lN.lac );
      thumbSizes=AddOneThumbSize(thumbSizes, G.tn.settings.width.lN.xl, G.tn.settings.height.lN.xl, G.tn.settings.width.lN.xlc, G.tn.settings.height.lN.xlc );


      if( G.I[albumIdx].GetID() == 0 ) {
        // albums
        //url = G.picasa.url() + 'user/'+G.O.userID+'?alt=json&kind=album&imgmax=d&thumbsize='+G.picasa.thumbSize;
        // url = G.picasa.url() + 'user/'+G.O.userID+'?alt=json&kind=album&imgmax=d&thumbsize=320';
        // url = G.picasa.url() + 'user/'+G.O.userID+'?alt=json&kind=album&imgmax=d&thumbsize='+thumbSizes;
        // url = G.picasa.url() + 'user/'+G.O.userID+'?alt=json&kind=album&access=public&thumbsize='+thumbSizes+'&rnd=' + (new Date().getTime());
        url = G.picasa.url() + 'user/'+G.O.userID+'?alt=json&kind=album&thumbsize='+thumbSizes+'&rnd=' + (new Date().getTime());
      }
      else {
        // photos
        var opt='';
        if( typeof G.I[albumIdx].customData.authkey !== 'undefined' ) { opt=G.I[albumIdx].customData.authkey; }
        // url = G.picasa.url() + 'user/'+G.O.userID+'/albumid/'+G.I[albumIdx].GetID()+'?alt=json&kind=photo'+opt+'&thumbsize='+G.picasa.thumbSize+'&imgmax=d';
        url = G.picasa.url() + 'user/'+G.O.userID+'/albumid/'+G.I[albumIdx].GetID()+'?alt=json&kind=photo'+opt+'&thumbsize='+thumbSizes+'&imgmax=d';
        // url = G.picasa.url() + 'user/'+G.O.userID+'/albumid/'+G.I[albumIdx].GetID()+'?alt=json&kind=photo'+opt+'&thumbsize=320&imgmax=d';
        kind='image';
      }
      //A    url = url + "&callback=?";
      PreloaderShow();

      // get the content and display it
      jQuery.ajaxSetup({ cache: false });
      jQuery.support.cors = true;
      var tId = setTimeout( function() {
        // workaround to handle JSONP (cross-domain) errors
        PreloaderHide();
        nanoAlert('Could not retrieve Picasa/Google+ data...');
      }, 60000 );
//      jQuery.getJSON(url, 'callback=?', function(data) {

      var gi_getJSONfinished = function(data){
        clearTimeout(tId);
        PreloaderHide();
        PicasaParseData(albumIdx,data,kind);
        //renderGallery(albumIdx,0);
        if( processLocationHash || G.O.openOnStart != '' ) {
          if( !ProcessLocationHash(false) ) {
            DisplayAlbum(albumIdx,setLocationHash);
          }
        }
        else {
          if( imageID != -1 ) {
              var imageIdx=-1,
              l=G.I.length;
              for(var i=0; i<l; i++ ) {
                if( G.I[i].kind == 'image' && G.I[i].GetID() == imageID ) {
                  imageIdx=i;
                  break;
                }
              }
              DisplayImage(imageIdx,true);
            }
            else {
              DisplayAlbum(albumIdx,setLocationHash);
            }
          }
      };

      var gi_data_loaded = null;

      var gi_loadJSON = function(url,start_index){
      jQuery.getJSON(url+"&start-index="+start_index, 'callback=?', function(data) {

				if (gi_data_loaded===null){
					gi_data_loaded = data;
				}else{
					gi_data_loaded.feed.entry=gi_data_loaded.feed.entry.concat(data.feed.entry);
				}

				if (data.feed.openSearch$startIndex.$t+data.feed.openSearch$itemsPerPage.$t>=data.feed.openSearch$totalResults.$t){
					//ok finito
					gi_getJSONfinished(gi_data_loaded);
				}else{
					//ce ne sono ancora da caricare
					//altra chiamata per il rimanente
					gi_loadJSON(url,data.feed.openSearch$startIndex.$t+data.feed.openSearch$itemsPerPage.$t);
				}

			  })
			  .fail( function(jqxhr, textStatus, error) {
				clearTimeout(tId);
				PreloaderHide();


				//alertObject(jqxhr);
				var k=''
				for(var key in jqxhr) {
				  k+= key + '=' + jqxhr[key] +'<br>';

				}
				var err = textStatus + ', ' + error + ' ' + k + '<br><br>URL:'+url;
				nanoAlert("Could not retrieve Picasa/Google+ data. Error: " + err);

			  });
      };

      gi_loadJSON(url,1);


//      })
      // .fail( function(jqxhr, textStatus, error) {
        // clearTimeout(tId);
        // PreloaderHide();

        //alertObject(jqxhr);
        // var k=''
        // for(var key in jqxhr) {
          // k+= key + '=' + jqxhr[key] +'<br>';
        // }
        // var err = textStatus + ', ' + error + ' ' + k + '<br><br>URL:'+url;
        // nanoAlert("Could not retrieve Picasa/Google+ data. Error: " + err);
      // });

    }

    function PicasaParseData( albumIdx, data, kind ) {
      var nb=0,
      albumID=G.I[albumIdx].GetID();

      var source = data.feed.entry;
      var sortOrder=G.O.albumSorting;
      if (kind =='image'){
        sortOrder=G.O.photoSorting;
      }

      switch( sortOrder ) {
        case 'random':
          source = AreaShuffle(source);
          break;
        case 'reversed':
          source = source.reverse();
          break;
        case 'titleAsc':
          source.sort(function (a, b) {
            // var x =  kind == 'image' ? a.media$group.media$description.$t.toUpperCase() : a.media$group.media$title.$t.toUpperCase();
            // var y =  kind == 'image' ? b.media$group.media$description.$t.toUpperCase() : b.media$group.media$title.$t.toUpperCase();
            var x='', y='';
            if( kind == 'image' ) {
              if( G.O.thumbnailLabel.get('title') != '' ) {
                x=GetImageTitle(unescape(unescape(unescape(unescape(a.media$group.media$content[0].url)))));
                y=GetImageTitle(unescape(unescape(unescape(unescape(b.media$group.media$content[0].url)))));
              }
              else {
                x = a.media$group.media$description.$t.toUpperCase();
                y = b.media$group.media$description.$t.toUpperCase();
              }
            }
            else {
              x = a.media$group.media$title.$t.toUpperCase();
              y = b.media$group.media$title.$t.toUpperCase();
            }
            return( (x < y) ? -1 : ((x > y) ? 1 : 0) );
          });
          break;
        case 'titleDesc':
          source.sort(function (a, b) {
            // var x =  kind == 'image' ? a.media$group.media$description.$t.toUpperCase() : a.media$group.media$title.$t.toUpperCase();
            // var y =  kind == 'image' ? b.media$group.media$description.$t.toUpperCase() : b.media$group.media$title.$t.toUpperCase();
            var x='', y='';
            if( kind == 'image' ) {
              if( G.O.thumbnailLabel.get('title') != '' ) {
                x=GetImageTitle(unescape(unescape(unescape(unescape(a.media$group.media$content[0].url)))));
                y=GetImageTitle(unescape(unescape(unescape(unescape(b.media$group.media$content[0].url)))));
              }
              else {
                x = a.media$group.media$description.$t.toUpperCase();
                y = b.media$group.media$description.$t.toUpperCase();
              }
            }
            else {
              x = a.media$group.media$title.$t.toUpperCase();
              y = b.media$group.media$title.$t.toUpperCase();
            }
            return( (x > y) ? -1 : ((x < y) ? 1 : 0) );
          });
          break;
      }

      jQuery.each(source, function(i,data){

        //Get the title
        var itemTitle = data.media$group.media$title.$t;
        //Get the URL of the thumbnail
        var itemThumbURL = data.media$group.media$thumbnail[0].url;
        //Get the ID
        var itemID = data.gphoto$id.$t;
        //Get the description
        var filename='';
        var itemDescription = data.media$group.media$description.$t;
        if( kind == 'image') {
          filename=itemTitle;
          itemTitle=itemDescription;
          itemDescription='';
        }

        var imgUrl=data.media$group.media$content[0].url;

        if( kind == 'image') {
          if( G.O.thumbnailLabel.get('title') != '' ) {
            itemTitle=GetImageTitle(unescape(unescape(unescape(unescape(imgUrl)))));
          }
        }

        var ok=true;
        if( kind == 'album' ) {
          if( !CheckAlbumName(itemTitle, itemID) ) { ok=false; }
        }

        var tags='';

        if( ok ) {

          var picasaThumbBaseURL='';
          // var picasaThumbBaseURL=itemThumbURL.substring(0, itemThumbURL.lastIndexOf('/'));
          // picasaThumbBaseURL=picasaThumbBaseURL.substring(0, picasaThumbBaseURL.lastIndexOf('/')) + '/';

          var src='';
          if( kind == 'album' ) {
            src=itemID;
          }
          else {
            src=imgUrl;
            var s=imgUrl.substring(0, imgUrl.lastIndexOf('/'));
            s=s.substring(0, s.lastIndexOf('/')) + '/';

            if( window.screen.width >  window.screen.height ) {
              src=s+'w'+window.screen.width+'/'+filename;
            }
            else {
              src=s+'h'+window.screen.height+'/'+filename;
              }
          }
          var newItem= NGAddItem(itemTitle, itemThumbURL, src, itemDescription, '', kind, tags, itemID, albumID );
          newItem.picasaThumbBaseURL=picasaThumbBaseURL;
          newItem.imageNumber=nb;
          if( kind == 'album' ) {
            newItem.author=data.author[0].name.$t;
            newItem.contentLength=data.gphoto$numphotos.$t;
          }


          // OLD METHOD
          /*
          if( kind == 'image' ) {
          newItem.width=data.gphoto$width.$t;
            newItem.height=data.gphoto$height.$t;
            newItem.thumbImgWidth=data.media$group.media$thumbnail[0].width;
            newItem.thumbImgHeight=data.media$group.media$thumbnail[0].height;
          }
          else {
            if( G.tn.settings.getH() == 'auto' ) {
              newItem.thumbImgWidth=G.picasa.thumbSize;
            }
            else
              if( G.tn.settings.getW() == 'auto' ) {
                newItem.thumbImgHeight=G.picasa.thumbSize;
              }
              else {
                newItem.thumbImgWidth=G.picasa.thumbSize;
                newItem.thumbImgHeight=G.picasa.thumbSize;
              }
          }
          */

          // NEW METHOD
          var tn = {
            url: { l1 : { xs:'', sm:'', me:'', la:'', xl:'' }, lN : { xs:'', sm:'', me:'', la:'', xl:'' } },
            width: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } },
            height: { l1 : { xs:0, sm:0, me:0, la:0, xl:0 }, lN : { xs:0, sm:0, me:0, la:0, xl:0 } }
          };
          tn=PicasaThumbSetSizes('l1', 0, tn, data, kind );
          tn=PicasaThumbSetSizes('lN', 5, tn, data, kind );
          /* for test purposes
          tn.width.l1.xs=0;
          tn.width.l1.sm=0;
          tn.width.l1.me=0;
          tn.width.l1.la=0;
          tn.width.l1.xl=0;
          tn.width.lN.xs=0;
          tn.width.lN.sm=0;
          tn.width.lN.me=0;
          tn.width.lN.la=0;
          tn.width.lN.xl=0;
          tn.height.l1.xs=0;
          tn.height.l1.sm=0;
          tn.height.l1.me=0;
          tn.height.l1.la=0;
          tn.height.l1.xl=0;
          tn.height.lN.xs=0;
          tn.height.lN.sm=0;
          tn.height.lN.me=0;
          tn.height.lN.la=0;
          tn.height.lN.xl=0;
          */
          newItem.thumbs=tn;

          if( typeof G.O.fnProcessData == 'function' ) {
            G.O.fnProcessData(newItem, 'picasa', data);
          }

          nb++;
          if( nb >= (kind == 'album' ? G.maxAlbums : G.maxPhotos) ) {
            return false;
          }

        }

      });

      G.I[albumIdx].contentIsLoaded=true;
      G.I[albumIdx].contentLength=nb;

    }

    function PicasaThumbSetSizes(level, startI, tn, data, kind ) {
      var sizes=['xs','sm','me','la','xl'];
      for(var i=0; i<sizes.length; i++ ) {
        tn.url[level][sizes[i]]=data.media$group.media$thumbnail[startI+i].url;
        if( kind == 'image' ) {
          tn.width[level][sizes[i]]=data.media$group.media$thumbnail[startI+i].width;
          tn.height[level][sizes[i]]=data.media$group.media$thumbnail[startI+i].height;

          var gw=data.media$group.media$thumbnail[startI+i].width;
          var gh=data.media$group.media$thumbnail[startI+i].height;
          if( G.tn.settings.width[level][sizes[i]] == 'auto' ) {
            if( gh < G.tn.settings.height[level][sizes[i]] ) {
              // calculate new h/w and change URL
              var ratio=gw/gh;
              tn.width[level][sizes[i]]=gw*ratio;
              tn.height[level][sizes[i]]=gh*ratio;
              var url=tn.url[level][sizes[i]].substring(0, tn.url[level][sizes[i]].lastIndexOf('/'));
              url=url.substring(0, url.lastIndexOf('/')) + '/';
              tn.url[level][sizes[i]]=url+'h'+G.tn.settings.height[level][sizes[i]]+'/';
            }
          }
          if( G.tn.settings.height[level][sizes[i]] == 'auto' ) {
            if( gw < G.tn.settings.width[level][sizes[i]] ) {
              // calculate new h/w and change URL
              var ratio=gh/gw;
              tn.height[level][sizes[i]]=gh*ratio;
              tn.width[level][sizes[i]]=gw*ratio;
              var url=tn.url[level][sizes[i]].substring(0, tn.url[level][sizes[i]].lastIndexOf('/'));
              url=url.substring(0, url.lastIndexOf('/')) + '/';
              tn.url[level][sizes[i]]=url+'w'+G.tn.settings.width[level][sizes[i]]+'/';
            }
          }
        }
        else {
          if( G.tn.settings.width[level][sizes[i]] != 'auto' ) {
            tn.width[level][sizes[i]]=data.media$group.media$thumbnail[startI+i].width;
          }
          else {
            var url=tn.url[level][sizes[i]].substring(0, tn.url[level][sizes[i]].lastIndexOf('/'));
            url=url.substring(0, url.lastIndexOf('/')) + '/';
            tn.url[level][sizes[i]]=url+'h'+G.tn.settings.height[level][sizes[i]]+'/';
          }
          if( G.tn.settings.height[level][sizes[i]] != 'auto' ) {
            tn.height[level][sizes[i]]=data.media$group.media$thumbnail[startI+i].height;
          }
          else {
              var url=tn.url[level][sizes[i]].substring(0, tn.url[level][sizes[i]].lastIndexOf('/'));
              url=url.substring(0, url.lastIndexOf('/')) + '/';
              tn.url[level][sizes[i]]=url+'w'+G.tn.settings.width[level][sizes[i]]+'/';
          }
        }
        // if( kind == 'image' || G.tn.settings.width.l1[sizes[i]] != 'auto' ) { tn.width.l1[sizes[i]]=data.media$group.media$thumbnail[i].width; }
        // if( kind == 'image' || G.tn.settings.height.l1[sizes[i]] != 'auto' ) { tn.height.l1[sizes[i]]=data.media$group.media$thumbnail[i].height; }
      }
      return tn;
    }




    // ################################
    // ##### NGITEMS MANIPULATION #####
    // ################################

    function NGAddItem(title, thumbSrc, imageSrc, description, destinationURL, kind, tags, ID, albumID ) {
      var item=GetNGItem(ID);
      var isNew=false;
      if( item === null ){
        item=new NGItems(title,ID);
        isNew=true;
      }else{
          item.title = title;
      }
      item.src=imageSrc;
      item.description=description;
      item.destinationURL=destinationURL;
      item.kind=kind;
      item.albumID=albumID;
      if( tags.length == 0 ) {
        item.tags=null;
      }
      else {
        item.tags=tags.split(' ');
      }

      if( isNew ) {
        item.title=title;
        G.I.push(item);
      }
      return item;
    }

    function GetNGItem( ID ) {
      var l=G.I.length;
      for( var i=0; i<l; i++ ) {
        if( G.I[i].GetID() == ID ) {
          return G.I[i];
        }
      }
      return null;
    }

    // check album name - blackList/whiteList
    function CheckAlbumName( title, ID) {
      var s=title.toUpperCase();

      if( G.albumList !== null ) {
        for( var j=0; j<G.albumList.length; j++) {
          if( s == G.albumList[j].toUpperCase() || ID == G.albumList[j] ) {
            return true;
          }
        }
      }
      else {
        var found=false;
        if( G.whiteList !== null ) {
          //whiteList : authorize only album cointaining one of the specified keyword in the title
          for( var j=0; j<G.whiteList.length; j++) {
            if( s.indexOf(G.whiteList[j]) !== -1 ) {
              found=true;
            }
          }
          if( !found ) { return false; }
        }


        if( G.blackList !== null ) {
          //blackList : ignore album cointaining one of the specified keyword in the title
          for( var j=0; j<G.blackList.length; j++) {
            if( s.indexOf(G.blackList[j]) !== -1 ) {
              return false;
            }
          }
        }

        return true;
      }
    }

    // ###########################
    // ##### GALLERY TOOLBAR #####
    // ###########################

    function DisplayAlbum( albumIdx, setLocationHash ) {
      if( G.O.lazyBuild == 'display' ) {
        if( inViewportVert(G.$E.conTnParent,G.O.lazyBuildTreshold) ){
          DisplayAlbumFinalize( albumIdx, setLocationHash );
        }
        else {
          G.delayedAlbumIdx=albumIdx;
          G.delayedSetLocationHash=setLocationHash;
        }
      }
      else{
        DisplayAlbumFinalize( albumIdx, setLocationHash );
      }
    }


    function DisplayAlbumFinalize( albumIdx, setLocationHash ) {
      G.O.lazyBuild='none';
      G.delayedAlbumIdx=-1;
      G.albumIdxToOpenOnViewerClose=-1;

      if( G.O.thumbnailAlbumDisplayImage && albumIdx != 0 ) {
        // find first image of the album
        var l=G.I.length;
        for( var i=0; i<l; i++ ) {
          if( G.I[i].albumID == G.I[albumIdx].GetID() ) {
            DisplayImage( i );
            break;
          }
        }
        return;
      }

      if( G.containerViewerDisplayed ) {
        CloseInternalViewer(false);
      }

      if( albumIdx == G.lastOpenAlbumID ) {
        return;
      }

      if( G.O.locationHash ) {
        if( setLocationHash ) {
          var s='nanogallery/'+G.baseEltID+'/'+G.I[albumIdx].GetID();
          G.lastLocationHash='#'+s;
          try {
            top.location.hash=s;
          }
          catch(e) {
            G.O.locationHash=false;
          }
        }
      }
      G.lastOpenAlbumID=G.I[albumIdx].GetID();
      manageGalleryToolbar(albumIdx);

      var p=0;
      if( G.I[albumIdx].paginationLastPage > 0 && G.I[albumIdx].paginationLastWidth == G.$E.conTnParent.width()) {
        p=G.I[albumIdx].paginationLastPage;
      }
      renderGallery(albumIdx,p);

    }

    // Display next album
    function DisplayNextAlbum() {
      var newAlbumIdx=GetNextAlbumIdx(G.curAlbumIdx);
      var setLocationHash = newAlbumIdx > 0;

      // DisplayAlbum(newAlbumIdx, setLocationHash);
      OpenAlbum(newAlbumIdx, false, -1, setLocationHash);
    };

    // Display previous album
    function DisplayPreviousAlbum() {
      var newAlbumIdx=GetPreviousAlbumIdx(G.curAlbumIdx);
      var setLocationHash = newAlbumIdx > 0;

      // DisplayAlbum(newAlbumIdx, setLocationHash);
      OpenAlbum(newAlbumIdx, false, -1, setLocationHash);
    };

    function GetNextAlbumIdx( curAlbumIdx ) {
      var l=G.I.length;
      var newAlbumIdx=-1;

      for(var i=curAlbumIdx+1; i<l; i++ ){
        if( G.I[i].albumID == G.I[curAlbumIdx].albumID && G.I[i].kind == 'album' ) {
          newAlbumIdx=i;
          break;
        }
      }
      if( newAlbumIdx == -1 ) {
        for(var i=0; i<=curAlbumIdx; i++ ){
          if( G.I[i].albumID == G.I[curAlbumIdx].albumID && G.I[i].kind == 'album' ) {
            newAlbumIdx=i;
            break;
          }
        }
      }

      return newAlbumIdx;
    }

    function GetPreviousAlbumIdx( curAlbumIdx ) {
      var l=G.I.length;
      var newAlbumIdx=-1;

      for(var i=curAlbumIdx-1; i>=0; i-- ){
        if( G.I[i].albumID == G.I[curAlbumIdx].albumID && G.I[i].kind == 'album' ) {
          newAlbumIdx=i;
          break;
        }
      }
      if( newAlbumIdx == -1 ) {
        for(var i=G.I.length-1; i>=curAlbumIdx; i-- ){
          if( G.I[i].albumID == G.I[curAlbumIdx].albumID && G.I[i].kind == 'album' ) {
            newAlbumIdx=i;
            break;
          }
        }
      }

      return newAlbumIdx;
    }

    // add album to breadcrumb
    function breadcrumbAdd( albumIdx ) {

      var cl="folder";
      if(albumIdx == 0 ) {
        cl="folderHome";
      }
      var $newDiv =jQuery('<div class="'+cl+' oneFolder">'+G.I[albumIdx].title+'</div>').appendTo(G.$E.conBC);
      jQuery($newDiv).data('albumIdx',albumIdx);
      $newDiv.click(function() {
        var cAlbumIdx=jQuery(this).data('albumIdx');
        jQuery(this).nextAll().remove();
        OpenAlbum(cAlbumIdx, false, -1, true);
        return;
      });
    }

    // add separator to breadcrumb
    function breadcrumbAddSeparator( lastAlbumID ) {
      var $newSep=jQuery('<div class="separator'+(G.O.RTL ? 'RTL' : '')+'"></div>').appendTo(G.$E.conBC);
      jQuery($newSep).data('albumIdx',lastAlbumID);
      $newSep.click(function() {
        var sepAlbumIdx=jQuery(this).data('albumIdx');
        jQuery(this).nextAll().remove();
        jQuery(this).remove();
        OpenAlbum(sepAlbumIdx, false, -1, true);
        return;
      });
    }


    function manageGalleryToolbar( albumIdx ) {
      var displayToolbar=false;

      // Breadcrumb
      if( G.O.displayBreadcrumb == true && !G.O.thumbnailAlbumDisplayImage ) {
        if( G.$E.conBC.children().length == 0 ) {
          G.$E.conNavBCon.css({opacity:0, 'max-height':'0px'});
        }

        displayToolbar=true;

        // G.$E.conBC.children().not(':first').remove();
        G.$E.conBC.children().remove();
        breadcrumbAdd(0);
        if( albumIdx != 0 ) {
          var l=G.I.length,
          parentID=0,
          lstItems=[];

          lstItems.push(albumIdx);
          var curIdx=albumIdx;

          while( G.I[curIdx].albumID != 0 && G.I[curIdx].albumID != -1) {
            for(i=1; i < l; i++ ) {
              if( G.I[i].GetID() == G.I[curIdx].albumID ) {
                curIdx=i;
                lstItems.push(curIdx);
                break;
              }
            }
          }

          breadcrumbAddSeparator(0);
          for( i=lstItems.length-1; i>=0 ; i-- ) {
            breadcrumbAdd(lstItems[i]);
            if( i > 0 ) {
              breadcrumbAddSeparator(lstItems[i-1]);
            }
          }
        }

        var bcItems=G.$E.conBC.children(),
        l1=bcItems.length;
        if( l1 == 0 ) {
          G.curNavLevel='l1';
          if( G.O.breadcrumbAutoHideTopLevel ) {
            G.$E.conNavBCon.css({opacity:0, 'max-height':'0px'});
            displayToolbar=false;
          }
          //breadcrumbAdd(0);
        }
        else {
          if( l1 == 1 ) {
            G.curNavLevel='l1';
          }
          else {
            G.curNavLevel='lN';
          }
          if( l1 == 1 && G.O.breadcrumbAutoHideTopLevel ) {
            //G.$E.conNavBCon.animate({'opacity':'0','max-height':'0px'});
            var tweenable = new NGTweenable();
            tweenable.tween({
              from: {'opacity':G.$E.conNavBCon.css('opacity'),'max-height':G.$E.conNavBCon.css('max-height')},
              to: {'opacity':'0','max-height':'0px'},
              attachment: { $e:G.$E.conNavBCon },
              duration: 200,
              step: function (state, att) {
                att.$e.css(state);
              },
              finish: function (state, att) {
                att.$e.css({'opacity':'0','max-height':'0px'});
              }
            });
          }
          else {
            //G.$E.conNavBCon.animate({'opacity':'1','max-height':'50px'});
            if( G.O.breadcrumbAutoHideTopLevel ) {
              var tweenable = new NGTweenable();
              tweenable.tween({
                from: {'opacity':G.$E.conNavBCon.css('opacity'),'max-height':G.$E.conNavBCon.css('max-height')},
                to: {'opacity':'1','max-height':'50px'},
                attachment: { $e:G.$E.conNavBCon },
                duration: 200,
                step: function (state, att) {
                  att.$e.css(state);
                },
                finish: function (state, att) {
                  att.$e.css({'opacity':'1','max-height':'50px'});
                }
              });
            }
            else {
              G.$E.conNavBCon.css({opacity:1, 'max-height':'50px'});
            }
            //G.$E.conBC.children().not(':first').remove();
          }
        }
        G.pgMaxNbThumbnailsPerRow=NbThumbnailsPerRow();
      }

      // Tag-bar
      if( G.O.useTags ) {
        displayToolbar=true;
        if( G.containerTags == null ) {
          G.containerTags =jQuery('<div class="nanoGalleryTags"></div>').appendTo(G.$E.conNavB);
        }
      }

      if( G.O.galleryFullpageButton ) { displayToolbar=true; }

      if( !G.containerNavigationbarContDisplayed && displayToolbar ) {
        G.containerNavigationbarContDisplayed=true;
        G.$E.conNavBCon.show();
      }

    }

    function PreloaderShow() {
      //if( G.O.displayBreadcrumb == true ) { G.$E.conBC.find('.oneFolder').last().addClass('loading'); }
      // G.$E.conLoadingB.css({visibility:'visible'});
      G.$E.conLoadingB.addClass('nanoGalleryLBar').removeClass('nanoGalleryLBarOff');
    }

    function PreloaderHide() {
      //if( G.O.displayBreadcrumb == true ) { G.$E.conBC.find('.oneFolder').last().removeClass('loading'); }
      // G.$E.conLoadingB.css({visibility:'hidden'});
      G.$E.conLoadingB.removeClass('nanoGalleryLBar').addClass('nanoGalleryLBarOff');
    }


    // ##### Open one album
    function OpenAlbum ( albumIdx, processLocationHash, imageID, setLocationHash ) {

      // unselect everything
      if( G.O.itemsSelectable && G.O.keepSelection === false ) {
        G.selectedItems=[];
        var l=G.I.length;
        for( var i=0; i < l ; i++ ) {
          G.I[i].selected=false;
        }
      }

      switch(G.O.kind) {
        case '':
          //renderGallery(albumIdx,0);
          DisplayAlbum(albumIdx,setLocationHash);
          break;
        case 'flickr':
          FlickrProcessItems(albumIdx, processLocationHash, imageID, setLocationHash);
          break;
        case 'json':
          JsonProcessItems(albumIdx, processLocationHash, imageID, setLocationHash);
          break;
        case 'picasa':
        default:
          PicasaProcessItems(albumIdx, processLocationHash, imageID, setLocationHash);
          break;
      }
    }


    // ##### REPOSITION THUMBNAILS ON SCREEN RESIZE EVENT
    function ResizeGallery() {
      if( G.tn.settings.getH() == 'auto' ) {
        ResizeGalleryHeightAuto();
      }
      else
        if ( G.tn.settings.getW() == 'auto' ) {
          ResizeGalleryWidthtAuto();
        }
        else {
          ResizeGalleryGrid();
        }

      thumbnailsLazySetSrc();
      setGalleryToolbarWidth(0);
    }

    // CASCADING LAYOUT
    function ResizeGalleryHeightAuto() {
      var areaW=G.$E.conTnParent.width(),
      curCol=0,
      curRow=0,
      cnt=0,
      colHeight=[],
      maxCol=NbThumbnailsPerRow(),      //parseInt(areaW/G.tn.defaultFullWidth);
      gutterWidth=0,
      gutterHeight=G.O.thumbnailGutterHeight,
      tnW=G.tn.outerWidth.get(),
      $thumbnails=G.$E.conTn.find('.nanoGalleryThumbnailContainer');

      if( G.O.thumbnailAlignment == 'justified' ) {
        maxCol=Math.min(maxCol,$thumbnails.length);
        gutterWidth=(maxCol==1?0:(areaW-(maxCol*tnW))/(maxCol-1));
      }
      else {
        gutterWidth=G.O.thumbnailGutterWidth;
      }

      var nbCol=0;
      // first loop to retrieve the width of the area
      $thumbnails.each(function() {
        var $this=jQuery(this),
        n=$this.data("index");

        if( n !== undefined ) {
          var curPosX=0,
          curPosY=0;

          if( curRow == 0 ) {
            curPosX=curCol*(G.tn.outerWidth.get()+gutterWidth);
            colHeight[curCol]=G.I[n].thumbFullHeight+gutterHeight;

            curCol++;
            nbCol++;
            if( curCol >= maxCol ) {
              curCol=0;
              curRow++;
            }
          }
          else {
            return false;   // exit loop after first row
          }

          cnt++;
        }
      });
      var w=(((colHeight.length)*(tnW+gutterWidth))-gutterWidth);
      curRow=0;
      curCol=0;

      // second loop to position the thumbnails
      $thumbnails.each(function() {
        var $this=jQuery(this),
        n=$this.data("index");

        if( n !== undefined ) {
          if( G.O.thumbnailLabel.get('position') == 'onBottom' ) {
            setThumbnailSize($this,G.I[n]);      // [TODO] remove --> this should not be here but issue on labelHeight
          }
          var curPosX=0,
          curPosY=0;

          if( curRow == 0 ) {
            curPosX=curCol*(G.tn.outerWidth.get()+gutterWidth);
            colHeight[curCol]=G.I[n].thumbFullHeight+gutterHeight;

            curCol++;
            if( curCol >= maxCol ) {
              curCol=0;
              curRow++;
            }
          }
          else {
            var c=0,
            minColHeight=colHeight[0];
            for( i=1; i<maxCol; i++) {
              if( (colHeight[i]+5) < minColHeight ) {     // +5 --> threshold
                minColHeight=colHeight[i];
                c=i;
                break;
              }
            }
            curPosY=colHeight[c];
            curPosX=c*(G.tn.outerWidth.get()+gutterWidth);
            colHeight[c]=curPosY+G.I[n].thumbFullHeight+gutterHeight;
          }

          var x=curPosX;
          if( G.O.RTL) {
            x=w-curPosX-G.tn.outerWidth.get();
          }

          $this.css({ top: curPosY, left: x });
          ThumbnailAppear($this, G.I[n], cnt);

          cnt++;
        }
      });

      var h=colHeight[0];
      for(i=1;i<nbCol;i++) {
        h=Math.max(h, colHeight[i]);
      }
      G.$E.conTn.width(w).height(h);

    }

    // JUSTIFIED LAYOUT
    function ResizeGalleryWidthtAuto() {
      var areaW=G.$E.conTnParent.width(),
      curWidth=0,
      lastPosX=0,
      curPosY=0,
      rowLastItem=[],
      rowNum=0,
      rowHeight=[],
      bNewRow=false,
      cnt=0,
      tnFeaturedH=0,
      tnFeaturedW=0,
      tnFeaturedW2=0,
      gutterWidth=G.O.thumbnailGutterWidth,
      gutterHeight=G.O.thumbnailGutterHeight;
      // by grief-of-these-days
      var maxRowHeightVertical=0;     // max height of a row with vertical thumbs
      var maxRowHeightHorizontal=0;   // max height of a row with horizontal thumbs
      var rowHasVertical=false;       // current row has vertical thumbs
      var rowHasHorizontal=false;     // current row has horizontal thumbs

      var $thumbnails=G.$E.conTn.find('.nanoGalleryThumbnailContainer');
      $thumbnails.each(function() {
        var n=jQuery(this).data("index");
        if( n !== undefined && G.I[n] != undefined ) {
          if( G.I[n].thumbImg().width > 0 && G.I[n].thumbImg().height > 0 ) {
            var item=G.I[n],
            w=Math.floor(item.thumbImg().width/item.thumbImg().height*G.tn.settings.getH())+ G.tn.borderWidth+G.tn.imgcBorderWidth; // +gutterWidth;
            if( G.O.thumbnailFeatured && cnt == 0 ) {
              w=w*2;
              tnFeaturedW=w;
            }

            if( bNewRow ) {
              bNewRow=false;
              rowNum++;
              curWidth=0;
              rowHasVertical=false;
              rowHasHorizontal=false;
              if( rowNum == 1 && tnFeaturedW > 0 ) {
                curWidth=tnFeaturedW;
                tnFeaturedW=0;
              }
            }

            // by grief-of-these-days
            if( item.thumbImg().height > item.thumbImg().width ) {
              rowHasVertical = true;
            }
            else {
              rowHasHorizontal = true;
            }

            // down scale image resolution
            if( (curWidth + w + gutterWidth) < areaW ) {
              // last row
              curWidth+=w+gutterWidth;
              rowHeight[rowNum]=G.tn.settings.getH();
              // rowHeight[rowNum]=item.thumbFullHeight;

              // prevent incomplete row from being heigher than the previous ones.
              // by grief-of-these-days
              var rowHeightLimit=Math.max(rowHasVertical ? maxRowHeightVertical : 0, rowHasHorizontal ? maxRowHeightHorizontal : 0);
              if( G.O.thumbnailAdjustLastRowHeight && rowHeightLimit > 0 ) {
                rowHeight[rowNum]=Math.min(rowHeight[rowNum],rowHeightLimit);
              }

              rowLastItem[rowNum]=n;
            }
            else {
              // new row after current item
              curWidth+=w;
              var rH=Math.floor(G.tn.settings.getH()*areaW/curWidth);
              // var rH=Math.floor(item.thumbFullHeight*areaW/curWidth);
              rowHeight[rowNum]=rH;

              // save the max row height for each thumb orientation.
              // by grief-of-these-days
              if( rowHasVertical ) {
                maxRowHeightVertical=Math.max(maxRowHeightVertical,rH);
              }
              if( rowHasHorizontal ) {
                maxRowHeightHorizontal=Math.max(maxRowHeightHorizontal,rH);
              }

              rowLastItem[rowNum]=n;
              bNewRow=true;
            }

          cnt++;
          }
          else {
            // exit to conserve display order, and avoid displaying thumbnail before an existing one
            return false;
          }
        }

      });

      rowNum=0;
      curPosY=0;
      lastPosX=0;
      cnt=0;
      $thumbnails.each(function() {
        var $this=jQuery(this),
        n=$this.data("index");
        if( n !== undefined && G.I[n] != undefined ) {
          if( G.I[n].thumbImg().width > 0 && G.I[n].thumbImg().height > 0 ) {
            var item=G.I[n],
            // w=Math.ceil(item.thumbImgWidth/item.thumbImg().height*rowHeight[rowNum]);//+G.tn.borderWidth+G.tn.imgContBorderWidth;
            w=Math.floor(item.thumbImg().width/item.thumbImg().height*rowHeight[rowNum]);//+G.tn.borderWidth+G.tn.imgContBorderWidth;

            if( cnt == 0 && G.O.thumbnailFeatured ) {
              w=w*2;
              if( rowHeight.length == 1 ) {
                // only 1 row
                tnFeaturedH=parseInt(rowHeight[0])*2;
              }
              else {
                tnFeaturedH=parseInt(rowHeight[0])+parseInt(rowHeight[1])+G.tn.borderHeight+G.tn.imgcBorderHeight;
              }
            }

            if( n == rowLastItem[rowNum] ) {
              // last row item
              if( rowLastItem.length != (rowNum+1) ) {
                w=areaW-lastPosX- G.tn.borderWidth-G.tn.imgcBorderWidth;//-gutterWidth;
              }
              else {
                // very last item
                if( (lastPosX+w + G.tn.borderWidth+G.tn.imgcBorderWidth +gutterWidth) > areaW ) {
                  // reduce size
                  w=areaW-lastPosX-G.tn.borderWidth-G.tn.imgcBorderWidth;//-gutterWidth;
                }
              }
            }

            var rh=0;
            if( cnt == 0 && G.O.thumbnailFeatured ) {
            //  rh=tnFeaturedH;
            //  tnFeaturedW2= w + G.tn.borderWidth + G.tn.imgcBorderWidth;
            //  item.customData.featured=true;
            //  $this.find('img').attr('src', item.thumbX2src);
            }
            else {
              rh=rowHeight[rowNum];
            }

            rh=parseInt(rh);
            w=parseInt(w);
            $this.width(w+G.tn.imgcBorderWidth).height(rh+G.tn.imgcBorderHeight+G.tn.labelHeight.get());
            item.$getElt('.imgContainer').height(rh).width(w);
            $this.find('img').css({'max-height':rh+2, 'max-width':w+2});
            $this.find('.subcontainer').width(w+G.tn.imgcBorderWidth).height(rh+G.tn.imgcBorderHeight+G.tn.labelHeight.get());
            //$this.find('.labelImage').css({left:0, right:0});
            var x=lastPosX;
            if( G.O.RTL) {
              x=areaW - lastPosX - ( w + G.tn.borderWidth + G.tn.imgcBorderWidth );
            }
            $this.css({ top: curPosY , left: x });
            item.thumbFullWidth=w+G.tn.borderWidth+G.tn.imgcBorderWidth;
            item.thumbFullHeight=rh+G.tn.borderHeight+G.tn.imgcBorderHeight+G.tn.labelHeight.get();
            ThumbnailOverResize($this);
            ThumbnailAppear($this, item, cnt);

            lastPosX+=w+G.tn.borderWidth+G.tn.imgcBorderWidth+gutterWidth;

            if( n == rowLastItem[rowNum] ) {
              // curPosY+=rowHeight[rowNum]+G.tn.outerHeight+G.tn.labelHeight.get()+gutterHeight;
              curPosY+=rowHeight[rowNum]+G.tn.labelHeight.get()+gutterHeight+G.tn.imgcBorderHeight+G.tn.borderHeight;
              rowNum++;
              lastPosX=0;
              if( rowNum == 1 && tnFeaturedW2 > 0 ) {
                lastPosX= tnFeaturedW2;
                tnFeaturedW2=0;
              }
            }
            cnt++;
          }
          else {
            return false;
          }
        }
      });

      if( rowNum > 0 ) {
        curPosY-=gutterHeight;
      }
      tnFeaturedH=tnFeaturedH+G.tn.outerHeight.get()+G.tn.labelHeight.get();
      G.$E.conTn.width(areaW).height(curPosY>tnFeaturedH?curPosY:tnFeaturedH);  //+G.O.thumbnailHeight);
    }


    // Maximum number of thumbnails in one row
    function NbThumbnailsPerRow() {

      var tnW=G.tn.settings.getW()+G.tn.borderWidth+G.tn.imgcBorderWidth;
      var areaW=G.$E.conTnParent.width();

      var nbMaxTn=0;
      if( G.O.thumbnailAlignment == 'justified' ) {
        nbMaxTn=Math.floor((areaW)/(tnW));
      }
      else {
        nbMaxTn=Math.floor((areaW+G.O.thumbnailGutterWidth)/(tnW+G.O.thumbnailGutterWidth));
      }

      if(  G.O.maxItemsPerLine >0 && nbMaxTn >  G.O.maxItemsPerLine ) {
        nbMaxTn=G.O.maxItemsPerLine;
      }

      if( nbMaxTn < 1 ) { nbMaxTn=1; }

      return nbMaxTn
    }


    // GRID LAYOUT
    function ResizeGalleryGrid() {
      var curPosX=0,
      curPosY=0,
      gutterWidth=0,
      gutterHeight=G.O.thumbnailGutterHeight,
      areaW=G.$E.conTnParent.width(),
      maxCol=NbThumbnailsPerRow(),
      cnt=0,
      h=0,
      w=0,
      cols=[],
      curCol=0;

      G.L.nbMaxTnPerRow=NbThumbnailsPerRow();
      var d=new Date();

      // pagination - max lines per page mode
      if( G.pgMaxLinesPerPage > 0 ) {
        if( G.tn.outerWidth.get() > 0 ) {
          if( maxCol != G.pgMaxNbThumbnailsPerRow ) {   // max number of thumbnails per line has changed --> render the gallery again
            G.pgMaxNbThumbnailsPerRow=maxCol;
            var aIdx=G.$E.conPagin.data('galleryIdx');
            renderGallery(aIdx,0);
            return;
          }
        }
      }

      var $thumbnails=G.$E.conTn.find('.nanoGalleryThumbnailContainer'),
      nbTn=$thumbnails.length;

      if( G.O.thumbnailAlignment == 'justified' ) {
        maxCol=Math.min(maxCol,nbTn);
        gutterWidth=(maxCol==1?0:(areaW-(maxCol*G.tn.outerWidth.get()))/(maxCol-1));
      }
      else {
        gutterWidth=G.O.thumbnailGutterWidth;
      }

      if( G.O.RTL ) {
        // first loop to retrieve the width of the area
        $thumbnails.each(function() {
          var $this=jQuery(this);

          var n=$this.data("index");
          if( n !== undefined ) {
            if( curPosY == 0 ) {
              curPosX=curCol*(G.tn.outerWidth.get()+gutterWidth);
              cols[curCol]=curPosX;
              w=curPosX;
            }
            else {
              return false;
            }

            curCol++;
            if( curCol >= maxCol ){
              curCol=0;
              curPosY+=G.tn.outerHeight.get()+gutterHeight;
            }
          }
        });
        areaW=w+G.tn.outerWidth.get();
        curPosY=0;
        curCol=0;
      }


      var batch=[];

      var lastN=0;
      $thumbnails.each(function() {
        var $this=jQuery(this);

        var n=$this.data("index");
        if( n !== undefined ) {
          lastN=n;
          if( curPosY == 0 ) {
            curPosX=curCol*(G.tn.outerWidth.get()+gutterWidth)
            cols[curCol]=curPosX;
            w=curPosX;
          }
          else {
            curPosX=cols[curCol];
            h=curPosY;
          }

          var x=curPosX;
          if( G.O.RTL ) {
            x=parseInt(areaW)-curPosX-G.tn.outerWidth.get();
          }
          batch.push({$e:$this, t:curPosY, l:x, item:G.I[n]});
          // $this.css({ top: curPosY , left: x });
          // ThumbnailAppear($this, G.I[n], cnt);

          curCol++;
          if( curCol >= maxCol ){
            curCol=0;
            curPosY+=G.tn.outerHeight.get()+gutterHeight;
          }
          cnt++;
        }
      });

      // window.requestAnimationFrame( function(d,w) {
        var n=batch.length;
        var h=0
        for( var i=0; i<n; i++ ) {
          batch[i].$e.css({ top: batch[i].t , left: batch[i].l });
          ThumbnailAppear(batch[i].$e, batch[i].item, i);
          h=batch[i].t;
        }
        batch=[];
        G.$E.conTn.width(w+G.tn.outerWidth.get()).height(h+G.tn.outerHeight.get());
        if( G.O.debugMode ) {
          console.log('ResizeGalleryGrid: '+ (new Date()-d));
        }
      // });
    }

    function ThumbnailAppear($this, item, n) {
      // if( $this.css('opacity') == 0 ) {    // ==> DO NOT USE / TOO SLOW
      if( $this.hasClass('nanogalleryHideElement') ) {
        $this.removeClass('nanogalleryHideElement');
        if( G.O.thumbnailDisplayTransition ) {
          if( typeof G.O.fnThumbnailDisplayEffect == 'function' ) {
            G.O.fnThumbnailDisplayEffect($this, item, 0);
          }
          else {
            // $this.delay(n*G.tn.displayInterval).fadeTo(150, 1);
            // $this.fadeTo(200, 1);
             // FadeToAppear($this,1);
            setTimeout(function() {
              window.requestAnimationFrame( function() {
                FadeToAppear($this);
              });
            }, n*G.tn.displayInterval);
          }
        }
        else {
          $this.css({opacity:1});
        }
      }
    }


    function FadeToAppear( $elt ) {
      var tweenable = new NGTweenable();
      tweenable.tween({
        from:     { 'o': 0  },
        to:       { 'o': 1 },
        duration: 200,
        step: function (state) {
          $elt.css({opacity: state.o});
        },
        finish: function (state) {
          $elt.css({opacity: state.o});
        }
      });
    }


    function setGalleryToolbarWidth(pageNumber) {
      if( G.O.galleryToolbarWidthAligned ) {
        if( G.$E.conNavBCon !== undefined ) {
          var w=G.$E.conTn.outerWidth(true);
          //if( pageNumber > 0 ) {
            if( G.$E.conNavBCon.width() < w ) {
              G.$E.conNavBCon.width(w);
            }
          //}
          else {
            G.$E.conNavBCon.width(w);
          }
        }
      }
    }

    // thumbnail image lazy load
    function thumbnailsLazySetSrc() {
      var $eltInViewport=G.$E.conTn.find('.nanoGalleryThumbnailContainer').filter(function() {
         return inViewport(jQuery(this), G.tn.lazyLoadTreshold);
      });

      jQuery($eltInViewport).each(function(){
        var $image=jQuery(this).find('img');
        if( $image.attr('src') == G.emptyGif ) {
          var idx=jQuery(this).data('index');
          if( idx == undefined || G.I[idx] == undefined ) { return; }
          $image.attr('src','');
          $image.attr('src',G.I[idx].thumbImg().src);
        }
      });
    }



    // ###################
    // ##### GALLERY #####
    // ###################

    // Display pagination
    function managePagination( albumIdx, pageNumber ) {
      if( G.$E.conPagin == undefined ) return;

      G.$E.conPagin.children().remove();

      //if( G.tn.settings.getH() == 'auto' || G.tn.settings.getW() == 'auto' ) { return; }
      if( G.pgMaxLinesPerPage == 0 || G.tn.settings.getH() == 'auto' || G.tn.settings.getW() == 'auto' ) {
        // Hide pagination container, if not used.
        G.$E.conPagin.hide();
        return;
      }

      // Must show the container for width calculation to work.
      G.$E.conPagin.show();

      G.$E.conPagin.data('galleryIdx',albumIdx);
      G.$E.conPagin.data('currentPageNumber',pageNumber);
      var n2=0,
      w=0;
      if( !G.O.paginationDots && pageNumber > 0 ) {
        var eltPrev=jQuery('<div class="paginationPrev">'+(G.O.paginationDots? '':G.i18nTranslations.paginationPrevious)+'</div>').appendTo(G.$E.conPagin);
        w+=jQuery(eltPrev).outerWidth(true);
        eltPrev.click(function(e) {
          paginationPreviousPage();
        });
      }

      var firstPage=0;
      // pagination - max lines per page mode
      if( G.pgMaxLinesPerPage > 0 && G.tn.settings.getH() != 'auto' && G.tn.settings.getW() != 'auto' ) {
        n2=Math.ceil(G.I[albumIdx].contentLength/(G.pgMaxLinesPerPage*G.pgMaxNbThumbnailsPerRow));
      }

      // no previous/next
      if( G.O.paginationDots ) {
        firstPage=0;
      }
      else {
        if( pageNumber >= 5 ) {
          firstPage=pageNumber-5;
          if( n2 > pageNumber+6 ) {
            n2=pageNumber+6;
          }
        }
        else {
          if( n2 > 10 ) {
            n2=10;
          }
        }
      }

      // only one page -> do not display anything
      // if( n2==1 ) { return; }
      if( n2==1 ) {
        // Hide pagination container, if not used.
        G.$E.conPagin.hide ();
        return;
      }

      for(var i=firstPage; i < n2; i++ ) {
        var c='';
        if( i == pageNumber ) { c=' currentPage'; }
        var elt$=jQuery('<div class="paginationItem'+c+'">'+(G.O.paginationDots? '':(i+1))+'</div>').appendTo(G.$E.conPagin);
        elt$.data('pageNumber',i);
        w+=elt$.outerWidth(true);
        elt$.click(function(e) {
          var aIdx=G.$E.conPagin.data('galleryIdx'),
          pn=jQuery(this).data('pageNumber');
          if( !inViewportVert(G.$E.base, 0) ) {
            $('html, body').animate({scrollTop: G.$E.base.offset().top}, 200);
          }
          renderGallery(aIdx,pn);
        });

      }

      if( !G.O.paginationDots && (pageNumber+1) < n2 ) {
        var $eltNext=jQuery('<div class="paginationNext">'+(G.O.paginationDots? '':G.i18nTranslations.paginationNext)+'</div>').appendTo(G.$E.conPagin);
        w+=$eltNext.outerWidth(true);
        $eltNext.click(function(e) {
          paginationNextPage();
        });
      }

      G.$E.conPagin.width(w);

    }

    function paginationNextPage() {
      var aIdx=G.$E.conPagin.data('galleryIdx'),
      n1=0;

      // pagination - max lines per page mode
      if( G.pgMaxLinesPerPage > 0 ) {
        n1=G.I[aIdx].contentLength / (G.pgMaxLinesPerPage * G.pgMaxNbThumbnailsPerRow);
      }
      n2=Math.ceil(n1);

      var pn=G.$E.conPagin.data('currentPageNumber');
      if( pn < (n2-1) ) {
        pn++;
      }
      else {
        pn=0;
      }

      if( !inViewportVert(G.$E.base, 0) ) {
        $('html, body').animate({scrollTop: G.$E.base.offset().top }, 200);
      }

      renderGallery(aIdx,pn);
    }

    function paginationPreviousPage() {
      var aIdx=G.$E.conPagin.data('galleryIdx'),
      n1=0;

      // pagination - max lines per page mode
      if( G.pgMaxLinesPerPage > 0 ) {
        n1=G.I[aIdx].contentLength / (G.pgMaxLinesPerPage * G.pgMaxNbThumbnailsPerRow);
      }
      n2=Math.ceil(n1);

      var pn=G.$E.conPagin.data('currentPageNumber');
      if( pn > 0 ) {
        pn--;
      }
      else {
        pn=n2-1;
      }

      if( !inViewportVert(G.$E.base, 0) ) {
        $('html, body').animate({scrollTop: G.$E.base.offset().top }, 250);
      }

      renderGallery(aIdx,pn);
    }

    function galleryCountImages (imageIdx) {
      var l=G.I.length;
      var images = 0;
      var currentItemIdx = imageIdx || G.GetCurrentViewedItemIdx();

      if (currentItemIdx !== -1) {
        for( var i=0; i <  l ; i++ ) {
          if( G.I[i].albumID == G.I[currentItemIdx].albumID && G.I[i].kind == 'image' ) {
            images++;
          }
        }
        return images;
      } else {
        return 0;
      }
    }

    function renderGallery( albumIdx, pageNumber ) {
      G.curAlbumIdx=-1;

      if( G.$E.conPagin == undefined ) {
        G.$E.conPagin.children().remove();
      }

      var $elt=G.$E.conTn.parent();

      var tweenable = new NGTweenable();
      tweenable.tween({
        to:     {'opacity': 0 },
        from:       {'opacity': 1 },
        attachment: { $e:$elt },
        duration: 150,
        step: function (state, att) {
          att.$e.css(state);
        },
        finish: function (state, att) {
          att.$e.css({'opacity': 0 });
          G.containerThumbnailsDisplayed=false;
          //      G.$E.conTn.off().empty();
          G.$E.conTn.hide(0).off().show(0).html('');
          var l=G.I.length;
          for( var i=0; i < l ; i++ ) {

            G.I[i].$Elts = [];
            G.I[i].$elt = null;
            G.I[i].hoverInitDone=false;
            G.I[i].hovered=false;
          }

          G.$E.conTnParent.css({ left:0, opacity:1 });
          ElementTranslateX(G.$E.conTn[0],0);

          renderGallery2(albumIdx, pageNumber, renderGallery2Complete);
        }
      });

      return;


      // TODO: remove following
      $elt.animate({opacity: 0}, 100).promise().done(function(){

        // remove gallery elements
        G.containerThumbnailsDisplayed=false;
        //      G.$E.conTn.off().empty();
        G.$E.conTn.hide(0).off().show(0).html('');
        var l=G.I.length;
        for( var i=0; i < l ; i++ ) {
          G.I[i].hovered=false;
        }

        G.$E.conTnParent.css({ left:0, opacity:1 });
        ElementTranslateX(G.$E.conTn[0],0);

        renderGallery2(albumIdx, pageNumber, renderGallery2Complete);
      });
    }


    function renderGallery2( albumIdx, pageNumber, onComplete ) {
      if( G.O.debugMode && console.timeline ) {
        console.timeline('nanoGALLERY');
      }
      G.startDateTime= new Date();

      if( albumIdx == -1 || G.I[albumIdx] == undefined) { return; }

      G.I[albumIdx].paginationLastPage=pageNumber;
      G.I[albumIdx].paginationLastWidth=G.$E.conTnParent.width();


      var l=G.I.length;
      // if one description is defined then put a value to those without
      var foundDesc=false;
      /*if( G.O.thumbnailLabel.get('position') == 'onBottom'  ) {
        for(var i=0; i<l; i++ ) {
          if( G.I[i].albumID == G.I[albumIdx].albumID && G.I[i].description.length > 0 ) { foundDesc=true; }
        }
      }*/
      // var G.galleryItemsCount=0;
      G.galleryItemsCount=0;
      var currentCounter=0,
      firstCounter=0,
      lastCounter=0;

      if( G.pgMaxLinesPerPage > 0 && G.tn.settings.getH() != 'auto' && G.tn.settings.getW() != 'auto' ) {
        firstCounter=pageNumber*G.pgMaxLinesPerPage*G.pgMaxNbThumbnailsPerRow;
        lastCounter=firstCounter+G.pgMaxLinesPerPage*G.pgMaxNbThumbnailsPerRow;
      }

      PreloaderHide();

      var endInViewportTest=false,
      startInViewportTest=false,
      idx=0;
      (function(){

        G.toRender=[];
        for( var i=0; i<G.O.galleryRenderStep; i++ ) {
          if( idx >= l ) {
            onComplete(albumIdx, pageNumber);
            return;
          }
          var item=G.I[idx];
          if( item.albumID == G.I[albumIdx].GetID() ) {
            currentCounter++;

            // pagination - max lines per page mode
            if( G.pgMaxLinesPerPage > 0 && G.tn.settings.getH() != 'auto' && G.tn.settings.getW() != 'auto' ) {
              if( (G.galleryItemsCount+1) > (G.pgMaxLinesPerPage*G.pgMaxNbThumbnailsPerRow) ) {
                onComplete(albumIdx, pageNumber);
                return;
              }
            }

            if( currentCounter > firstCounter ) {
              G.galleryItemsCount++;

              // If the item is does not exists anymore
              var r=thumbnailBuild(item, idx, foundDesc);
              var $newDiv=r.e$;

              // image lazy load
              if( G.O.thumbnailLazyLoad && !r.cIS ) {
                if( !endInViewportTest ) {
                  if( inViewport($newDiv, G.tn.lazyLoadTreshold) ) {
                    item.$getElt('img').attr('src','');   // firefox bug workaround
                    item.$getElt('img').attr('src',item.thumbImg().src);
                    startInViewportTest=true;
                  }
                  else {
                    if( startInViewportTest ) { endInViewportTest=true; }
                  }
                }
              }
            }
          }
          idx++;
        }

        var n=G.toRender.length;
        if( n > 0 ) {
          for(var i=0; i<n; i++ ) {
            // ThumbnailOverInit(G.toRender[i].$e);     // init hover effects
            // setThumbnailSize(G.toRender[i].$e, G.toRender[i].i);
            // ThumbnailOverResize(G.toRender[i].$e);
          }
        }

        if( idx < l ) {
          //setGalleryToolbarWidth(pageNumber);
          setTimeout(arguments.callee,2);
        }
        else {
          onComplete(albumIdx, pageNumber);
        }
      })();
    }

    function renderGallery2Complete( albumIdx, pageNumber ) {
      //if( G.O.thumbnailHeight == 'auto' || G.O.thumbnailWidth == 'auto' || G.O.thumbnailWidth == 'autoUpScale' ) {
        ResizeGallery();
      //}

      // SetGalleryWidth(pageNumber);
      //setGalleryToolbarWidth(pageNumber);
      managePagination(albumIdx,pageNumber);
      G.containerThumbnailsDisplayed=true;
      G.curAlbumIdx=albumIdx;

      if(typeof G.O.fnInitGallery === 'function'){
          G.O.fnInitGallery(albumIdx, pageNumber);
      }

      if( G.O.debugMode && console.timeline ) {
        console.log('End-render: ' + (new Date() - G.startDateTime));
        console.timelineEnd('nanoGALLERY');
      }

      // Refresh select mode
      G.SetSelectMode();
    }


    function thumbnailBuild( item, idx, foundDesc ) {
      var newElt=[],
      newEltIdx=0;

      item.$Elts=[];

      var pos='';
      var ch=' nanogalleryHideElement'
      if( G.O.thumbnailLazyLoad && G.tn.settings.getW() == 'auto' ) {
        pos='top:0px;left:0px;';
//        ch='';
      }
      newElt[newEltIdx++]='<div class="nanoGalleryThumbnailContainer'+ch+' nGEvent" style="display:block;opacity:0;'+pos+'" ><div class="subcontainer nGEvent" style="display:block;">';

      var checkImageSize=false,
      src=G.emptyGif;
      if( (G.tn.settings.getH() == 'auto' && G.I[idx].thumbImg().height == 0) || (G.tn.settings.getW() == 'auto' && G.I[idx].thumbImg().width == 0) ) { checkImageSize=true; }
      if( !G.O.thumbnailLazyLoad || checkImageSize) {
        src=item.thumbImg().src;
      }
      var sTitle=getThumbnailTitle(item),
      sDesc=getTumbnailDescription(item);

      if( G.tn.settings.getH() == 'auto' ) {
        newElt[newEltIdx++]='<div class="imgContainer nGEvent" style="width:'+G.tn.settings.getW()+'px;"><img class="image nGEvent" src="'+src+'" alt="'+sTitle+'" style="max-width:'+G.tn.settings.getW()+'px;"></div>';
      }
      else if( G.tn.settings.getW() == 'auto' ) {
          newElt[newEltIdx++]='<div class="imgContainer nGEvent" style="height:'+G.tn.settings.getH()+'px;"><img class="image nGEvent" src="'+src+'" alt="'+sTitle+'" style="max-height:'+G.tn.settings.getH()+'px;" ></div>';
        }
        else {
          newElt[newEltIdx++]='<div class="imgContainer nGEvent" style="width:'+G.tn.settings.getW()+'px;height:'+G.tn.settings.getH()+'px;"><img class="image nGEvent" src="'+src+'" alt="'+sTitle+'" style="max-width:'+G.tn.settings.getW()+'px;max-height:'+G.tn.settings.getH()+'px;" ></div>';
        }

      if( item.kind == 'album' ) {
        // ALBUM
        if( G.O.thumbnailLabel.get('display') == true ) {
          var imageCount='';
          if( item.contentLength > 0 ) {
            // display content counter
            switch( G.O.thumbnailLabel.get('itemsCount') ) {
              case 'title':
                sTitle +=  ' ' + G.i18nTranslations.thumbnailLabelItemsCountPart1 + '<span class="nGEvent">' +item.contentLength + '</span>' +G.i18nTranslations.thumbnailLabelItemsCountPart2;
                break;
              case 'description':
                sDesc += ' ' + G.i18nTranslations.thumbnailLabelItemsCountPart1 + '<span class="nGEvent">' + item.contentLength + '</span>' + G.i18nTranslations.thumbnailLabelItemsCountPart2;
                break;
            }
          }
          newElt[newEltIdx++]='<div class="labelImage nGEvent" style="width:'+G.tn.settings.getW()+'px;'+(G.O.RTL ? "direction:RTL;" :"")+(G.curNavLevel == 'l1' ? G.tn.styleL1LabelImage : G.tn.styleLabelImage)+'"><div class="labelFolderTitle labelTitle nGEvent" style="'+(G.curNavLevel == 'l1' ? G.tn.styleL1FTitle:G.tn.styleFTitle)+'">'+sTitle+'</div><div class="labelDescription nGEvent" style="'+(G.curNavLevel == 'l1' ? G.tn.styleL1Desc:G.tn.styleDesc)+'">'+sDesc+'</div></div>';
        }
      }
      else {
        // IMAGE
        if( G.O.thumbnailLabel.get('display') == true ) {
          if( foundDesc && sDesc.length == 0 && G.O.thumbnailLabel.get('position') == 'onBottom' ) { sDesc='&nbsp;'; }
          newElt[newEltIdx++]='<div class="labelImage nGEvent" style="width:'+G.tn.settings.getW()+'px;'+(G.O.RTL ? "direction:RTL;" :"")+(G.curNavLevel == 'l1' ? G.tn.styleL1LabelImage:G.tn.styleLabelImage)+'"><div class="labelImageTitle labelTitle nGEvent" style="'+(G.curNavLevel == 'l1' ? G.tn.styleL1ITitle:G.tn.styleITitle)+'">'+sTitle+'</div><div class="labelDescription nGEvent" style="'+(G.curNavLevel == 'l1' ? G.tn.styleL1Desc:G.tn.styleDesc)+'">'+sDesc+'</div></div>';
        }
      }

      newElt[newEltIdx++]='</div>';

      // checkbox for selection
      if( G.O.itemsSelectable ){

        item.selected = false;
        if(G.O.keepSelection === true){
            for (it in G.selectedItems){
                if(G.selectedItems[it].GetID() === item.GetID()){
                  item.selected = true;
                }
            }
        }
        if(G.O.showCheckboxes){
          checked = '';
          if(item.selected){
              checked = 'checked';
          }
          newElt[newEltIdx++]='<input class="ngChekbox" type="checkbox" '+checked+' style="position:absolute;z-index:999;'+G.O.checkboxStyle+'">';
        }
      }

      newElt[newEltIdx++]='</div>';

      // var $newDiv =jQuery(newElt.join('')).appendTo(G.$E.conTnHid); //.animate({ opacity: 1},1000, 'swing');  //.show('slow'); //.fadeIn('slow').slideDown('slow');
      var $newDiv =jQuery(newElt.join('')).appendTo(G.$E.conTnHid); //.animate({ opacity: 1},1000, 'swing');  //.show('slow'); //.fadeIn('slow').slideDown('slow');
      if(typeof item.selected !== 'undefined' && item.selected === true){
          $newDiv.find('.subcontainer').addClass('selected');
      }
      item.$elt=$newDiv;
      $newDiv.data('index',idx);
      item.$getElt('img').data('index',idx);


      // Custom init function
      if( typeof G.O.fnThumbnailInit == 'function' ) {
        G.O.fnThumbnailInit($newDiv, item, ExposedObjects());
      }

      var $p=$newDiv.detach();
      $p.appendTo( G.$E.conTn );



      if( checkImageSize ) {
        // ThumbnailOverInit($newDiv);     // init hover effects
        var gi_imgLoad = ngimagesLoaded( $newDiv );
        //$newDiv.ngimagesLoaded().always( function( instance ) {
        gi_imgLoad.on( 'always', function( instance ) {
          var item=G.I[jQuery(instance.images[0].img).data('index')];
          if( item == undefined || instance.images[0].img.src == G.emptyGif ) { return; }    // warning: also fired for blank image --> ignore
          var b=false;
          if( item.thumbImg().height != instance.images[0].img.naturalHeight ) {
            item.thumbSetImgHeight(instance.images[0].img.naturalHeight);
            item.thumbSetImgWidth(instance.images[0].img.naturalWidth);
            b=true;
          }
          if( item.thumbImg().width != instance.images[0].img.naturalWidth ) {
            item.thumbSetImgHeight(instance.images[0].img.naturalHeight);
            item.thumbSetImgWidth(instance.images[0].img.naturalWidth);
            b=true;
          }

          if( b ) {
            ThumbnailOverInit(item.$elt);     // init hover effects
            setThumbnailSize(item.$elt, item);
            ThumbnailOverResize(item.$elt);
            ResizeGallery();      // [TODO] optimization to avoid too much resizing
          }
        });
      }
      else {
        //G.toRender.push({ $e:$newDiv, i:item });
        ThumbnailOverInit($newDiv);     // init hover effects
        setThumbnailSize($newDiv, item);
        ThumbnailOverResize($newDiv);
      }

      return { e$:$newDiv, cIS:checkImageSize };
    }

    function getThumbnailTitle( item ) {

      var sTitle=item.title;
      if( G.O.thumbnailLabel.get('display') == true ) {
        if( sTitle === undefined || sTitle.length == 0 ) { sTitle='&nbsp;'; }

        if( G.i18nTranslations.thumbnailImageTitle != '' ) {
          sTitle=G.i18nTranslations.thumbnailImageTitle;
        }
        if( G.O.thumbnailLabel.get('titleMaxLength') > 3 && sTitle.length > G.O.thumbnailLabel.get('titleMaxLength') ){
          sTitle=sTitle.substring(0,G.O.thumbnailLabel.get('titleMaxLength'))+'...';
        }
      }

      return sTitle;
    }

    function getTumbnailDescription( item ) {
      var sDesc='';
      if( G.O.thumbnailLabel.get('displayDescription') == true ) {
        if( item.kind == 'album' ) {
          if( G.i18nTranslations.thumbnailImageDescription != '' ) {
            sDesc=G.i18nTranslations.thumbnailAlbumDescription;
          }
          else {
            sDesc=item.description;
          }
        }
        else {
          if( G.i18nTranslations.thumbnailImageDescription != '' ) {
            sDesc=G.i18nTranslations.thumbnailImageDescription;
          }
          else {
            sDesc=item.description;
          }
        }
        if( G.O.thumbnailLabel.get('descriptionMaxLength') > 3 && sDesc.length > G.O.thumbnailLabel.get('descriptionMaxLength') ){
          sDesc=sDesc.substring(0,G.O.thumbnailLabel.get('descriptionMaxLength'))+'...';
        }
      }

      return sDesc;
    }


    function thumbnailSelection(item, forceValue, refrehElt){
      var $e=item.$elt;
      var thumbnailCheckbox = $e.find('input[type=checkbox]');

      if((G.selectMode === 'image' || G.selectMode === 'album') && item.kind !== G.selectMode ){
          item.selected = false;
          thumbnailCheckbox.prop('checked',false );
          item.$getElt('.subcontainer').removeClass('selected');
      }else{
        if( typeof forceValue === 'undefined' ){
          item.selected=!item.selected;
        }else{
          item.selected = forceValue;
        }
        if( refrehElt !== false ) {
          thumbnailCheckbox.prop('checked',item.selected );
        }
        if( item.selected ) {
          item.$getElt('.subcontainer').addClass('selected');
        } else {
          item.$getElt('.subcontainer').removeClass('selected');
        }
      }
      thumbnailSelectionEnd();
      if(typeof G.O.fnThumbnailSelection === 'function'){
        G.O.fnThumbnailSelection($e, item);
      }
    }

    function thumbnailSelectionEnd(){
      var oldSelection;
      if(G.O.keepSelection === true){
        oldSelection = G.selectedItems.slice(0);
      }
      G.selectedItems = [];
      var l=G.I.length;
      for( var j=0; j<l ; j++) {
        if(G.I[j].selected === true) {
          G.selectedItems.push(G.I[j]);
        }
      }
      if(G.O.keepSelection === true){
        for(j in oldSelection) {
          alreadyExists = false;
          for( var k=0; k<l ; k++) {
            if(G.I[k].GetID() === oldSelection[j].GetID()) {
              alreadyExists = true;
            }
          }
          if(alreadyExists === false){
            G.selectedItems.push(oldSelection[j]);
          }
        }
        oldSelection = [];
      }

      if (G.selectedItems.length > 0 || G.selectModeForce == true) {
        G.I.forEach(function (it) {
          if(it.$elt !== null && !it.$elt.hasClass('selectable')){
            if((G.selectModeForce == true && it.kind === G.selectMode) || G.selectMode == true){
                it.$elt.addClass('selectable');
            }
          }
        });
        if(G.selectMode !== true && G.selectMode !== 'image' &&
                G.selectMode !== 'album'){
          G.selectMode = true;
        }
      }else {
        G.I.forEach(function (it) {
          if(it.$elt !== null){
            it.$elt.removeClass('selectable');
          }
        });
        G.selectMode = false;
      }

      if (typeof G.O.fnChangeSelectMode === 'function'){
        G.O.fnChangeSelectMode(G.selectMode);
      }
    }

    function setThumbnailSize( $elt, item ) {

      if( G.tn.settings.getH() == 'auto' ) {
        // CASCADING LAYOUT
        if( item.thumbImg().height > 0 ) {
          var ratio=item.thumbImg().height/item.thumbImg().width;
          item.$getElt('.imgContainer').height(G.tn.settings.getW()*ratio); //.css({'overflow':'hidden'});
          if( G.O.thumbnailLabel.get('position') == 'onBottom' ) {
            item.thumbLabelHeight=item.$getElt('.labelImage').outerHeight(true);
            item.thumbFullHeight=G.tn.settings.getW()*ratio + item.thumbLabelHeight + G.tn.borderHeight+G.tn.imgcBorderHeight;
            $elt.width(G.tn.outerWidth.get()-G.tn.borderWidth).height(item.thumbFullHeight-G.tn.borderHeight);
            item.$getElt('.labelImage').css({'position':'absolute', 'top':'', 'bottom':'0px'});
          }
          else {
            item.thumbFullHeight=G.tn.settings.getW()*ratio + item.thumbLabelHeight + G.tn.borderHeight+G.tn.imgcBorderHeight;
            $elt.width(G.tn.outerWidth.get() - G.tn.borderWidth).height(item.thumbFullHeight-G.tn.borderHeight);
          }
        }
        item.thumbFullWidth=G.tn.outerWidth.get();
        item.$getElt('.subcontainer').width(G.tn.outerWidth.get()-G.tn.borderWidth).height(item.thumbFullHeight-G.tn.borderHeight); //.css({'overflow':'hidden'});
      }
      else

        // JUSTIFIED LAYOUT
        if( G.tn.settings.getW() == 'auto' ) {
          return;

          // everything is done in ResizeGalleryWidthtAuto()
          if( item.thumbImg().width > 0 ) {
            // var ratio=item.thumbImg().height/item.thumbImg().width;
            var ratio=item.thumbImg().width/item.thumbImg().height;
            item.$getElt('.imgContainer').width(G.tn.settings.getH()*ratio).css({overflow:'hidden'});
            if( G.O.thumbnailLabel.get('position') == 'onBottom' ) {
              item.thumbFullWidth=G.tn.settings.getH()*ratio + G.tn.borderWidth+G.tn.imgcBorderWidth ;
              $elt.width(item.thumbFullWidth).height(G.tn.outerHeight.get()+G.tn.labelHeight.get()-G.tn.outerHeight.get());
            }
            else {
            }
          }
          item.thumbFullHeight=G.tn.outerHeight.get()+G.tn.labelHeight.get();
          $elt.find('.subcontainer').width(item.thumbFullWidth-G.tn.borderWidth).height(G.tn.outerHeight.get()-G.tn.borderHeight); //.css({'overflow':'hidden'});
        }

        else {
          // GRID LAYOUT
          item.thumbFullHeight=G.tn.outerHeight.get();  //+G.tn.labelHeight.get();  //G.tn.defaultFullHeight;
          item.thumbFullWidth=G.tn.outerWidth.get();   //G.tn.defaultFullWidth;
          if( G.O.thumbnailLabel.get('position') == 'onBottom' ) {
            $elt.width(item.thumbFullWidth-G.tn.borderWidth).height(item.thumbFullHeight-G.tn.borderHeight);
            //item.$getElt('.labelImage').height(G.tn.labelHeight.get()-G.tn.labelBorderHeight).css({overflow:'hidden'});
          }
          else {
            $elt.width(item.thumbFullWidth-G.tn.borderWidth).height(item.thumbFullHeight-G.tn.borderHeight);
          }
          item.$getElt('.subcontainer').width(item.thumbFullWidth-G.tn.borderWidth).height(item.thumbFullHeight-G.tn.borderHeight); //.css({'overflow':'hidden'});
        }
    }


    // TODO --> REMOVE
    function thumbnailPositionContentOLD( $e, item ) {

      if(G.O.itemsSelectable === true && G.O.showCheckboxes === true){
        thumbnailCheckbox = $('<input>')
          .attr('type', 'checkbox')
          .css({
            'position' : 'absolute',
            'top' : G.O.checkboxPosition.top,
            'left' : G.O.checkboxPosition.left,
            'z-index' : 999
          }).click(function(){
            thumbnailSelection(item);
          });
        $e.append(thumbnailCheckbox);
        $e.data('selected',false);
      }

      if( typeof G.O.fnThumbnailInit == 'function' ) {
        G.O.fnThumbnailInit($e, item, ExposedObjects());
        return;
      }

      return;

      if( !G.O.thumbnailLabel.get('display') ) { return; }


      switch( G.O.thumbnailLabel.get('position') ){
        case 'onBottom':
          item.$getElt('.labelImage').css({top:0, position:'relative', left:0, right:0});
          if( G.tn.settings.getH() == 'auto' ) {
            // line break
            if( item.kind == 'album' ) {
              item.$getElt('.labelFolderTitle').css({'white-space':'normal'});
            }
            else {
              item.$getElt('.labelImageTitle').css({'white-space':'normal'});
            }
            item.$getElt('.labelDescription').css({'white-space':'normal'});
          }
          else {
            // no line break
            if( item.kind == 'album' ) {
              item.$getElt('.labelFolderTitle').css({'white-space':'nowrap'});
            }
            else {
              item.$getElt('.labelImageTitle').css({'white-space':'nowrap'});
            }
            item.$getElt('.labelDescription').css({'white-space':'nowrap'});
          }
          break;
        case 'overImageOnTop':
          item.$getElt('.labelImage').css({top:0, bottom:0, left:0, right:0 });
          break;
        case 'overImageOnMiddle':
          item.$getElt('.labelImage').css({top:0, bottom:0, left:0, right:0});
          if( item.kind == 'album' ) {
            item.$getElt('.labelFolderTitle').css({left:0, right:0, position:'absolute', bottom:'50%'});
          }
          else {
            item.$getElt('.labelImageTitle').css({left:0, right:0, position:'absolute', bottom:'50%'});
          }
          item.$getElt('.labelDescription').css({left:0, right:0, position:'absolute', top:'50%'});
          break;
        case 'custom':
          // Don't apply any style
          break;
        case 'overImageOnBottom':
        default :
          G.O.thumbnailLabel.set('position', 'overImageOnBottom');
          item.$getElt('.labelImage').css({bottom:0, left:0, right:0});
          break;
      }
    }

    function ThumbnailHoverOutAll() {
    // [TODO] --> only check displayed items
      var l=G.I.length;
      for( var i=0; i < l ; i++ ) {
        if( G.I[i].hovered ) {
          ThumbnailHoverOut(G.I[i].$elt);
        }
      }
    }

    // init hover effects
    function ThumbnailOverInit( $e ) {
      var n=$e.data("index");
      if( n == undefined ) { return; }    // required because can be fired on ghost elements
      var item=G.I[n];
      if( typeof G.O.fnThumbnailHoverInit == 'function' ) {
        G.O.fnThumbnailHoverInit($e, item, ExposedObjects() );
      }
      removeCSSTransform(item);

      for( j=0; j<G.tn.getHE().length; j++) {
        switch( G.tn.getHE()[j].name ) {

          case 'imageSplit4':
            var $subCon=item.$getElt('.subcontainer'),
            $lI=item.$getElt('.labelImage'),
            $iC=item.$getElt('.imgContainer');
            $iC.css({position:'absolute'});
            $subCon.css({overflow:'hidden', position:'relative', width:'100%', height:'100%'});
            $subCon.prepend($iC.clone());
            $subCon.prepend(item.$getElt('.imgContainer', true).clone());
            $iC=item.$getElt('.imgContainer', true);
            setElementOnTop('', $iC);

            newCSSTransform(item, 'imgContainer0', $iC.eq(0));
            SetCSSTransform(item, 'imgContainer0');
            newCSSTransform(item, 'imgContainer1', $iC.eq(1));
            SetCSSTransform(item, 'imgContainer1');
            newCSSTransform(item, 'imgContainer2', $iC.eq(2));
            SetCSSTransform(item, 'imgContainer2');
            newCSSTransform(item, 'imgContainer3', $iC.eq(3));
            SetCSSTransform(item, 'imgContainer3');
            break;

          case 'imageSplitVert':
            var $subCon=item.$getElt('.subcontainer'),
            $iC=item.$getElt('.imgContainer');
            $iC.css({position:'absolute'});
            $subCon.css({overflow:'hidden', position:'relative'});  //, width:'100%', height:'100%'});
            $subCon.prepend($iC.clone());
            $iC=item.$getElt('.imgContainer', true);
            setElementOnTop('', $iC);

            newCSSTransform(item, 'imgContainer0', $iC.eq(0));
            SetCSSTransform(item, 'imgContainer0');
            newCSSTransform(item, 'imgContainer1', $iC.eq(1));
            SetCSSTransform(item, 'imgContainer1');
            break;

          case 'labelSplit4':
            var $subCon=item.$getElt('.subcontainer'),
            $lI=item.$getElt('.labelImage').css({top:0, bottom:0});
            $subCon.css({overflow:'hidden', position:'relative'});
            $lI.clone().appendTo($subCon);
            item.$getElt('.labelImage',true).clone().appendTo($subCon);
            $lI=item.$getElt('.labelImage',true);

            newCSSTransform(item, 'labelImage0', $lI.eq(0));
            SetCSSTransform(item, 'labelImage0');
            newCSSTransform(item, 'labelImage1', $lI.eq(1));
            SetCSSTransform(item, 'labelImage1');
            newCSSTransform(item, 'labelImage2', $lI.eq(2));
            SetCSSTransform(item, 'labelImage2');
            newCSSTransform(item, 'labelImage3', $lI.eq(3));
            SetCSSTransform(item, 'labelImage3');

            break;

          case 'labelSplitVert':
            var $subCon=item.$getElt('.subcontainer'),
            $lI=item.$getElt('.labelImage');
            $subCon.css({overflow:'hidden', position:'relative'});
            $lI.clone().appendTo($subCon);
            $lI=item.$getElt('.labelImage',true);

            newCSSTransform(item, 'labelImage0', $lI.eq(0));
            SetCSSTransform(item, 'labelImage0');
            newCSSTransform(item, 'labelImage1', $lI.eq(1));
            SetCSSTransform(item, 'labelImage1');
            break;

          case 'labelAppearSplit4':
            var $subCon=item.$getElt('.subcontainer');
            $lI=item.$getElt('.labelImage'),
            $lI.css({left:0, top:0, right:0, bottom:0});
            $subCon.css({overflow:'hidden', position:'relative'});
            $lI.clone().appendTo($subCon);
            item.$getElt('.labelImage',true).clone().appendTo($subCon);
            $lI=item.$getElt('.labelImage',true);

            var o=newCSSTransform(item, 'labelImage0', $lI.eq(0));
            o.translateX=-item.thumbFullWidth/2;
            o.translateY=-item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage0');
            o=newCSSTransform(item, 'labelImage1', $lI.eq(1));
            o.translateX=item.thumbFullWidth/2;
            o.translateY=-item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage1');
            o=newCSSTransform(item, 'labelImage2', $lI.eq(2));
            o.translateX=item.thumbFullWidth/2;
            o.translateY=item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage2');
            o=newCSSTransform(item, 'labelImage3', $lI.eq(3));
            o.translateX=-item.thumbFullWidth/2;
            o.translateY=item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage3');

            break;

          case 'labelAppearSplitVert':
            var $subCon=item.$getElt('.subcontainer'),
            $lI=item.$getElt('.labelImage');
            $subCon.css({overflow:'hidden', position:'relative'});
            $lI.clone().appendTo($subCon);
            $lI=item.$getElt('.labelImage',true);

            newCSSTransform(item, 'labelImage0', $lI.eq(0)).translateX=-item.thumbFullWidth/2;
            SetCSSTransform(item, 'labelImage0');
            newCSSTransform(item, 'labelImage1', $lI.eq(1)).translateX=item.thumbFullWidth/2;
            SetCSSTransform(item, 'labelImage1');
            break;

          case 'imageScale150Outside':
            G.$E.base.css({overflow: 'visible'});
            G.$E.conTn.css({overflow: 'visible'});
            $e.css({overflow: 'visible'});
            item.$getElt('.subcontainer').css({overflow: 'visible'});
            item.$getElt('.imgContainer').css({overflow: 'visible'});
            newCSSTransform(item, 'img0', item.$getElt('img'));
            SetCSSTransform(item, 'img0');
            setElementOnTop(item.$getElt('.imgContainer'), item.$getElt('.labelImage'));
            break;

          case 'scale120':
            if( !G.$E.base.hasClass('fullpage') ) {
              G.$E.base.css({overflow: 'visible'});
            }
            G.$E.conTn.css({overflow: 'visible'});
            newCSSTransform(item, 'base', $e);
            SetCSSTransform(item, 'base');
            break;

          case 'scaleLabelOverImage':
            var $t=item.$getElt('.imgContainer');
            var $l=item.$getElt('.labelImage');
            setElementOnTop($t, $l);
            $l.css({opacity:0});

            newCSSTransform(item, 'labelImage0', $l).scale=50;
            SetCSSTransform(item, 'labelImage0');
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'overScale':
            $e.css({overflow: 'hidden'});
            var $t=item.$getElt('.imgContainer');
            var $l=item.$getElt('.labelImage');
            setElementOnTop('', $l);
            $l.css({opacity:0});
            $t.css({ opacity: 1});

            newCSSTransform(item, 'labelImage0', $l).scale=150;
            SetCSSTransform(item, 'labelImage0');
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'overScaleOutside':
            if( !G.$E.base.hasClass('fullpage') ) {
              G.$E.base.css({overflow: 'visible'});
            }
            G.$E.conTn.css({overflow: 'visible'});
            $e.css({overflow: 'visible'});
            var $t=item.$getElt('.imgContainer');
            var $l=item.$getElt('.labelImage');
            setElementOnTop('', $l);
            $l.css({opacity:0 });
            $t.css({ opacity: 1});

            newCSSTransform(item, 'labelImage0', $l).scale=150;
            SetCSSTransform(item, 'labelImage0');
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'rotateCornerBL':
            $e.css({overflow: 'hidden'});
            var $t=item.$getElt('.labelImage');
            $t.css({opacity:1});
            $t[0].style[G.CSStransformName+'Origin'] = '100% 100%';
            newCSSTransform(item, 'labelImage0', $t).rotateZ=-90;
            SetCSSTransform(item, 'labelImage0');
            $t=item.$getElt('.imgContainer');
            $t[0].style[G.CSStransformName+'Origin'] = '100% 100%';;
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'rotateCornerBR':
            $e.css({overflow: 'hidden'});
            var $t=item.$getElt('.labelImage');
            $t.css({opacity:1});
            $t[0].style[G.CSStransformName+'Origin'] = '0% 100%';
            newCSSTransform(item, 'labelImage0', $t).rotateZ=90;
            SetCSSTransform(item, 'labelImage0');
            $t=item.$getElt('.imgContainer');
            $t[0].style[G.CSStransformName+'Origin'] = '0 100%';
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'imageRotateCornerBL':
            var $t=item.$getElt('.imgContainer');
            setElementOnTop($e, $t);
            $e.css({overflow: 'hidden'});
            item.$getElt('.labelImage').css({opacity: 1});
            $t[0].style[G.CSStransformName+'Origin'] = 'bottom right';
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'imageRotateCornerBR':
            var $t=item.$getElt('.imgContainer');
            setElementOnTop($e, $t);
            $e.css({overflow: 'hidden'});
            item.$getElt('.labelImage').css({opacity: 1});
            $t[0].style[G.CSStransformName+'Origin'] = '0 100%';
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'slideUp':
            $e.css({overflow: 'hidden'});
            $t=item.$getElt('.labelImage');
            $t.css({opacity:1, top:0});
            newCSSTransform(item, 'labelImage0',$t).translateY=item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            $t=item.$getElt('.imgContainer');
            $t.css({left:0, top:0});
            newCSSTransform(item, 'imgContainer0',$t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'slideDown':
            $e.css({overflow: 'hidden'});
            $t=item.$getElt('.labelImage');
            $t.css({opacity:1, top:0});
            newCSSTransform(item, 'labelImage0',$t).translateY=-item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            $t=item.$getElt('.imgContainer');
            $t.css({left:0, top:0});
            newCSSTransform(item, 'imgContainer0',$t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'slideRight':
            $e.css({overflow: 'hidden'});
            $t=item.$getElt('.labelImage');
            $t.css({opacity:1, top:0});
            newCSSTransform(item, 'labelImage0',$t).translateX=-item.thumbFullWidth;
            SetCSSTransform(item, 'labelImage0');
            $t=item.$getElt('.imgContainer');
            $t.css({left:0, top:0});
            newCSSTransform(item, 'imgContainer0',$t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'slideLeft':
            $e.css({overflow: 'hidden'});
            $t=item.$getElt('.labelImage');
            $t.css({opacity:1, top:0});
            newCSSTransform(item, 'labelImage0',$t).translateX=item.thumbFullWidth;
            SetCSSTransform(item, 'labelImage0');
            $t=item.$getElt('.imgContainer');
            $t.css({left:0, top:0});
            newCSSTransform(item, 'imgContainer0',$t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'imageSlideUp':
          case 'imageSlideDown':
          case 'imageSlideRight':
          case 'imageSlideLeft':
            $t=item.$getElt('.imgContainer');
            setElementOnTop($e, $t);
            $e.css({overflow: 'visible'});
            item.$getElt('.labelImage').css({opacity: 1});
            $t.css({left:0, top:0});
            newCSSTransform(item, 'imgContainer0',$t);
            SetCSSTransform(item, 'imgContainer0');
            break;

          case 'labelAppear':
          case 'labelAppear75':
            var c='rgb('+G.custGlobals.oldLabelRed+','+G.custGlobals.oldLabelGreen+','+G.custGlobals.oldLabelBlue+',0.01)';
            item.$getElt('.labelImage').css({backgroundColor: c});
            //item.$getElt('.labelImage')[0].style.setProperty( 'backgroundColor',c, 'important' );
            if( item.kind == 'album' ) {
              item.$getElt('.labelFolderTitle').css({opacity: 0});
            }
            else {
              item.$getElt('.labelImageTitle').css({opacity: 0});
            }
            item.$getElt('.labelDescription').css({opacity: 0});
            break;

          case 'descriptionAppear':
            item.$getElt('.labelDescription').css({opacity: 0});
            break;

          case 'labelSlideUpTop':
            $e.css({overflow: 'hidden'});
            item.$getElt('.labelImage').css({top:0, bottom:0});
            newCSSTransform(item, 'labelImage0',item.$getElt('.labelImage')).translateY=item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'labelSlideUp':
            $e.css({overflow: 'hidden'});
            newCSSTransform(item, 'labelImage0',item.$getElt('.labelImage')).translateY=item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'labelSlideDown':
            $e.css({overflow: 'hidden'});
            newCSSTransform(item, 'labelImage0',item.$getElt('.labelImage')).translateY=-item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'descriptionSlideUp':
            $e.css({overflow: 'hidden'});
            var lh=(item.kind == 'album' ? item.$getElt('.labelFolderTitle').outerHeight(true) : item.$getElt('.labelImageTitle').outerHeight(true));
            item.$getElt('.labelDescription').css({opacity:0});
            item.$getElt('.labelImage').css({height:lh});
            newCSSTransform(item, 'labelImage0',item.$getElt('.labelImage'));//.translateY=-lh;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'imageExplode':
            // G.$E.base.css('overflow', 'visible');
            // G.$E.conTn.css('overflow', 'visible');
            // $e.css('overflow', 'visible');

            setElementOnTop( '', $e);
            setElementOnTop( item.$getElt('.labelImage'), item.$getElt('.imgContainer'));
            var $subCon=item.$getElt('.subcontainer'),
            n=7,
            th=item.thumbFullHeight,      //$e.outerHeight(true);
            $iC=item.$getElt('.imgContainer'),
            w=$iC.outerWidth(true)/n,
            h=$iC.outerHeight(true),
            h=$iC.outerHeight(true)/n;
            for(var r=0; r<n; r++ ) {
              for(var c=0; c<n; c++ ) {
                var s='rect('+h*r+'px, '+w*(c+1)+'px, '+h*(r+1)+'px, '+w*c+'px)';
                $iC.clone().appendTo($subCon).css({top:0, scale:1, clip:s, left:0, position:'absolute'}).data('ngScale',1);
              }
            }
            $iC.remove();
            break;

          case 'imageFlipHorizontal':
            switch( G.O.thumbnailLabel.get('position') ){
              case 'overImageOnTop':
                item.$getElt('.labelImage').css({top:-G.tn.imgcBorderHeight/2, bottom:G.tn.imgcBorderWidth/2, left:0, right:0 });
                break;
              case 'overImageOnMiddle':
                item.$getElt('.labelImage').css({top:-G.tn.imgcBorderHeight/2, bottom:G.tn.imgcBorderWidth/2, left:0, right:0});
                break;
              case 'overImageOnBottom':
              default :
                item.$getElt('.labelImage').css({bottom:G.tn.imgcBorderWidth/2, left:0, right:0});
                break;
            }
            if( !G.$E.base.hasClass('fullpage') ) {
              G.$E.base.css({overflow: 'visible'});
            }
            G.$E.conTn.css({overflow: 'visible'});
            $e.css({overflow: 'visible'});
            setElementOnTop( '', $e);
            setElementOnTop( item.$getElt('.labelImage'), item.$getElt('.imgContainer'));
            var $t=item.$getElt('.subcontainer');
            $t.css({overflow: 'visible'});
            $t[0].style[G.CSStransformStyle] = 'preserve-3d'
            var n= Math.round(item.thumbFullHeight*1.2) + 'px';
            $t[0].style[G.CSSperspective] = n;


            // item.$getElt('.imgContainer').data('ngRotateX','0');
            $t=item.$getElt('.imgContainer');
            $t[0].style[G.CSSbackfaceVisibilityName]= 'hidden';
            // $t[0].style[G.CSStransformName]= 'rotateX:(0deg)';
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');

            $e.find('.image')[0].style[G.CSSbackfaceVisibilityName] = 'hidden';

            // item.$getElt('.labelImage').data('ngRotateX','180');
            $t=item.$getElt('.labelImage');
            $t[0].style[G.CSSbackfaceVisibilityName] = 'hidden';
            // $t[0].style[G.CSStransformName] = 'rotateX(180deg)';
            newCSSTransform(item, 'labelImage0',$t).rotateX=180;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'imageFlipVertical':
            switch( G.O.thumbnailLabel.get('position') ){
              case 'overImageOnTop':
                item.$getElt('.labelImage').css({top:-G.tn.imgcBorderHeight/2, bottom:G.tn.imgcBorderWidth/2, left:0, right:0 });
                break;
              case 'overImageOnMiddle':
                item.$getElt('.labelImage').css({top:-G.tn.imgcBorderHeight/2, bottom:G.tn.imgcBorderWidth/2, left:0, right:0});
                break;
              case 'overImageOnBottom':
              default :
                item.$getElt('.labelImage').css({bottom:G.tn.imgcBorderWidth/2, left:0, right:0});
                break;
            }
            if( !G.$E.base.hasClass('fullpage') ) {
              G.$E.base.css({overflow: 'visible'});
            }
            G.$E.conTn.css({overflow: 'visible'});
            $e.css({overflow: 'visible'});
            setElementOnTop( '', $e);
            setElementOnTop( item.$getElt('.labelImage'), item.$getElt('.imgContainer'));
            var $t=item.$getElt('.subcontainer');
            $t.css({overflow: 'visible'});
            $t[0].style[G.CSStransformStyle] = 'preserve-3d'
            var n= Math.round(item.thumbFullWidth*1.2) + 'px';
            $t[0].style[G.CSSperspective] = n;

            $t=item.$getElt('.imgContainer');
            $t[0].style[G.CSSbackfaceVisibilityName]= 'hidden';
            newCSSTransform(item, 'imgContainer0', $t);
            SetCSSTransform(item, 'imgContainer0');

            $e.find('.image')[0].style[G.CSSbackfaceVisibilityName] = 'hidden';

            $t=item.$getElt('.labelImage');
            $t[0].style[G.CSSbackfaceVisibilityName] = 'hidden';
            newCSSTransform(item, 'labelImage0',$t).rotateY=180;
            SetCSSTransform(item, 'labelImage0');

            break;

          // case 'flipHorizontal':  // ONLY TO TEST --> hover issue
            // var n= Math.round(item.thumbFullHeight*1.2) + 'px';
            // item.$getElt('.labelImage').css({ perspective: n, rotateX: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
            // break;

          // case 'flipVertical':  // OONLY TO TEST --> hover issue
            // var n= Math.round(item.thumbFullWidth*1.2) + 'px';
            // item.$getElt('.subcontainer').css({ perspective: n, rotateY: '0deg'});
            // item.$getElt('.labelImage').css({ perspective: n, rotateY: '180deg', 'backface-visibility': 'hidden', 'opacity':'1', 'height':'100%' });
            // break;

          case 'imageScale150':
            $e.css({overflow: 'hidden'});
            newCSSTransform(item, 'img0', item.$getElt('img'));
            SetCSSTransform(item, 'img0');
            break;

          case 'imageScaleIn80':
            $e.css({overflow: 'hidden'});
            newCSSTransform(item, 'img0', item.$getElt('img')).scale=120;
            SetCSSTransform(item, 'img0');
            break;

          case 'imageSlide2Up':
          case 'imageSlide2Down':
          case 'imageSlide2Left':
          case 'imageSlide2Right':
          case 'imageSlide2UpRight':
          case 'imageSlide2UpLeft':
          case 'imageSlide2DownRight':
          case 'imageSlide2DownLeft':
            $e.css({overflow:'hidden'});
            item.customData.hoverEffectRDir=G.tn.getHE()[j].name;
            ThumbnailInitImageSlide($e, item);
            break;

          case 'imageSlide2Random':
            $e.css({overflow:'hidden'});
            var dir= ['imageSlide2Up','imageSlide2Down','imageSlide2Left','imageSlide2Left','imageSlide2UpRight','imageSlide2UpLeft','imageSlide2DownRight','imageSlide2DownLeft'];
            item.customData.hoverEffectRDir=dir[Math.floor(Math.random()*dir.length)];
            ThumbnailInitImageSlide($e, item);
            break;
        }
      }
      item.hoverInitDone=true;

    }

    function ThumbnailInitImageSlide( $e, item ) {
      // var w=item.thumbImgWidth;    //$e.outerWidth(true),
      // h=item.thumbImg().height,       //$e.outerHeight(true);
      var w=item.thumbFullWidth,    //$e.outerWidth(true),
      h=item.thumbFullHeight,       //$e.outerHeight(true);
      c=null;
      var t=newCSSTransform(item, 'img0', item.$getElt('img'));
      t.scale=140;
      switch( item.customData.hoverEffectRDir ){
        case 'imageSlide2Up':
          // c={top:h*.1, left: -w*.1};
          // t.translateY=h*.1;
          // t.translateX=-w*.1;
          t.translateY= item.thumbFullHeight < (item.thumbImg().height*1.4) ? ((item.thumbImg().height*1.4)-item.thumbFullHeight)/2 : 0;
          t.translateX= item.thumbFullWidth < (item.thumbImg().width*1.4) ? -((item.thumbImg().width*1.4)-item.thumbFullWidth)/2 : 0;
          break;
        case 'imageSlide2Down':
          // c={top:-h*.1, left: -w*.1};
          // t.translateY=-h*.1;
          var tY=item.thumbFullHeight < (item.thumbImg().height*1.4) ? Math.min(((item.thumbImg().height*1.4)-item.thumbFullHeight)/2*.1,h*.1) : 0;
          t.translateY = -tY;
          var tX=item.thumbFullWidth < (item.thumbImg().width*1.4) ? Math.min(((item.thumbImg().width*1.4)-item.thumbFullWidth)/2*.1,w*.1) : 0;
          t.translateX = tX;
          break;
        case 'imageSlide2Left':
          // c={top:-h*.1, left: w*.1};
          t.translateY=-h*.1;
          t.translateX=w*.1;
          break;
        case 'imageSlide2Right':
          // c={top:-h*.1, left: -w*.1};
          t.translateY=-h*.1;
          t.translateX=-w*.1;
          break;

        case 'imageSlide2UpRight':
          // c={top:h*.05, left: -w*.05};
          t.translateY=h*.05;
          t.translateX=-w*.05;
          break;
        case 'imageSlide2UpLeft':
          // c={top:h*.05, left: w*.05};
          t.translateY=h*.05;
          t.translateX=w*.05;
          break;
        case 'imageSlide2DownRight':
          // c={top:-h*.05, left: -w*.05};
          t.translateY=-h*.05;
          t.translateX=-w*.05;
          break;
        case 'imageSlide2DownLeft':
          // c={top:-h*.05, left: w*.05};
          t.translateY=-h*.05;
          t.translateX=w*.05;
          break;
      }
      SetCSSTransform(item, 'img0');
      //item.$getElt('.subcontainer').width(w).height(h);
      // $e.find('img').css({'max-width':w*1.5, 'max-height':h*1.5});
      // $e.find('img')[0].style[G.CSStransformName] = 'scale(1.4)';
      // $e.find('img').css(c);  //.css({'width':w*1.5, 'height':h*1.5});
      //item.$getElt('.imgContainer').css(c).css({'width':w*1.5, 'height':h*1.5});
    }


    function ThumbnailOverResize( $e ) {
      var n=$e.data("index");
      if( n == undefined ) { return; }    // required because can be fired on ghost elements
      var item=G.I[n];
      if( !item.hoverInitDone ) {
        ThumbnailOverInit($e);
        return;
      }
      if( typeof G.O.fnThumbnailHoverResize == 'function' ) {
        G.O.fnThumbnailHoverResize($e, item, ExposedObjects() );
      }
      for( j=0; j<G.tn.getHE().length; j++) {
        switch( G.tn.getHE()[j].name ) {
          case 'imageSplit4':
            var w=item.thumbFullWidth-G.tn.borderWidth-G.tn.imgcBorderWidth,
            h=item.thumbFullHeight-G.tn.borderHeight-G.tn.imgcBorderHeight,
            $iC=item.$getElt('.imgContainer'),
            s='rect(0px, '+Math.ceil(w/2)+'px, '+Math.ceil(h/2)+'px, 0px)';
            $iC.eq(0).css({ clip:s});
            s='rect(0px, '+w+'px, '+Math.ceil(h/2)+'px, '+Math.ceil(w/2)+'px)';
            $iC.eq(1).css({ clip:s });
            s='rect('+Math.ceil(h/2)+'px, '+w+'px, '+h+'px, '+Math.ceil(w/2)+'px)';
            $iC.eq(2).css({ clip:s });
            s='rect('+Math.ceil(h/2)+'px, '+Math.ceil(w/2)+'px, '+h+'px, 0px)';
            $iC.eq(3).css({ clip:s });
            break;

          case 'imageSplitVert':
            var $iC=item.$getElt('.imgContainer'),
            w=item.thumbFullWidth-G.tn.borderWidth-G.tn.imgcBorderWidth,
            h=item.thumbFullHeight-G.tn.borderHeight-G.tn.imgcBorderHeight,
            s='rect(0px, '+Math.ceil(w/2)+'px, '+h+'px, 0px)';
            $iC.eq(0).css({ clip:s });
            s='rect(0px, '+w+'px, '+h+'px, '+Math.ceil(w/2)+'px)';
            $iC.eq(1).css({clip:s });
            break;

          case 'labelSplit4':
            var w=item.thumbFullWidth-G.tn.borderWidth-G.tn.imgcBorderWidth,
            h=item.thumbFullHeight-G.tn.borderHeight-G.tn.imgcBorderHeight,
            $lI=item.$getElt('.labelImage');
            s='rect(0px, '+Math.ceil(w/2)+'px, '+Math.ceil(h/2)+'px, 0px)',
            $lI.eq(0).css({ clip:s });
            s='rect(0px, '+w+'px, '+Math.ceil(h/2)+'px, '+Math.ceil(w/2)+'px)';
            $lI.eq(1).css({ clip:s });
            s='rect('+Math.ceil(h/2)+'px, '+w+'px, '+h+'px, '+Math.ceil(w/2)+'px)';
            $lI.eq(2).css({ clip:s });
            s='rect('+Math.ceil(h/2)+'px, '+Math.ceil(w/2)+'px, '+h+'px, 0px)';
            $lI.eq(3).css({ clip:s });
            break;

          case 'labelSplitVert':
            var w=item.thumbFullWidth-G.tn.borderWidth-G.tn.imgcBorderWidth,
            h=item.thumbFullHeight-G.tn.borderHeight-G.tn.imgcBorderHeight,
            $lI=item.$getElt('.labelImage');
            var s='rect(0px, '+Math.ceil(w/2)+'px, '+h+'px, 0px)';
            $lI.eq(0).css({ clip:s});
            s='rect(0px, '+w+'px, '+h+'px, '+Math.ceil(w/2)+'px)';
            $lI.eq(1).css({ clip:s});
            break;

          case 'labelAppearSplit4':
            var w=item.thumbFullWidth-G.tn.borderWidth-G.tn.imgcBorderWidth,
            h=item.thumbFullHeight-G.tn.borderHeight-G.tn.imgcBorderHeight;
            $lI=item.$getElt('.labelImage');
            var s='rect(0px, '+Math.ceil(w/2)+'px, '+Math.ceil(h/2)+'px, 0px)';
            $lI.eq(0).css({ clip:s });
            s='rect(0px, '+w+'px, '+Math.ceil(h/2)+'px, '+Math.ceil(w/2)+'px)';
            $lI.eq(1).css({ clip:s });
            s='rect('+Math.ceil(h/2)+'px, '+w+'px, '+h+'px, '+Math.ceil(w/2)+'px)';
            $lI.eq(2).css({ clip:s });
            s='rect('+Math.ceil(h/2)+'px, '+Math.ceil(w/2)+'px, '+h+'px, 0px)';
            $lI.eq(3).css({ clip:s });


            item.eltTransform['labelImage0'].translateX=-item.thumbFullWidth/2;
            item.eltTransform['labelImage0'].translateY=-item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage0');
            item.eltTransform['labelImage1'].translateX=item.thumbFullWidth/2;
            item.eltTransform['labelImage1'].translateY=-item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage1');
            item.eltTransform['labelImage2'].translateX=item.thumbFullWidth/2;
            item.eltTransform['labelImage2'].translateY=item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage2');
            item.eltTransform['labelImage3'].translateX=-item.thumbFullWidth/2;
            item.eltTransform['labelImage3'].translateY=item.thumbFullHeight/2;
            SetCSSTransform(item, 'labelImage3');
            break;

          case 'labelAppearSplitVert':
            var w=item.thumbFullWidth-G.tn.borderWidth-G.tn.imgcBorderWidth,
            h=item.thumbFullHeight-G.tn.borderHeight-G.tn.imgcBorderHeight;
            $lI=item.$getElt('.labelImage');
            var s='rect(0px, '+Math.ceil(w/2)+'px, '+h+'px, 0px)';
            $lI.eq(0).css({ clip:s});
            s='rect(0px, '+w+'px, '+h+'px, '+Math.ceil(w/2)+'px)';
            $lI.eq(1).css({ clip:s});
            item.eltTransform['labelImage0'].translateX=-item.thumbFullWidth/2;
            SetCSSTransform(item, 'labelImage0');
            item.eltTransform['labelImage1'].translateX=item.thumbFullWidth/2;
            SetCSSTransform(item, 'labelImage1');

            break;
            item.transformLabelImage[0].translateX=-item.thumbFullWidth/2;
            SetCSSTransform($lI.eq(0),item.transformLabelImage[0]);
            item.transformLabelImage[1].translateX=item.thumbFullWidth/2;
            SetCSSTransform($lI.eq(1),item.transformLabelImage[1]);
            break;

          case 'slideUp':
            // item.$getElt('.labelImage').css({top:item.thumbFullHeight});
            item.eltTransform['labelImage0'].translateY=item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'slideDown':
            // item.$getElt('.labelImage').css({bottom:item.thumbFullHeight});  //, 'background':'none'});
            item.eltTransform['labelImage0'].translateY=-item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'slideRight':
            // item.$getElt('.labelImage').css({left:-item.thumbFullWidth});
            item.eltTransform['labelImage0'].translateX=-item.thumbFullWidth;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'slideLeft':
            // item.$getElt('.labelImage').css({left:item.thumbFullWidth});
            item.eltTransform['labelImage0'].translateX=item.thumbFullWidth;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'imageExplode':
            var $subCon=item.$getElt('.subcontainer'),
            $iC=item.$getElt('.imgContainer'),
            n=Math.sqrt($iC.length),
            w=$iC.eq(0).outerWidth(true)/n,
            h=$iC.eq(0).outerHeight(true)/n,
            i=0;
            for(var r=0; r<n; r++ ) {
              for(var c=0; c<n; c++ ) {
                var s='rect('+h*r+'px, '+w*(c+1)+'px, '+h*(r+1)+'px, '+w*c+'px)';
                //$iC.eq(i++).css({ 'clip':s });
              }
            }
            break;

          case 'imageFlipHorizontal':
            var $t=item.$getElt('.subcontainer');
            var n= Math.round(item.thumbFullHeight*1.2) + 'px';
            $t[0].style[G.CSSperspective] = n;
            // item.$getElt('.imgContainer').css({perspective: n, rotateX: '0deg', 'backface-visibility': 'hidden'});
            // item.$getElt('.labelImage').css({ perspective: n, rotateX: '180deg', 'backface-visibility': 'hidden','height':item.thumbFullHeight,'opacity':'1' });
            break;

          case 'imageFlipVertical':
            var $t=item.$getElt('.subcontainer');
            var n= Math.round(item.thumbFullWidth*1.2) + 'px';
            $t[0].style[G.CSSperspective] = n;
            //item.$getElt('.imgContainer').css({perspective: n, rotateY: '0deg', 'backface-visibility': 'hidden'});
            //item.$getElt('.labelImage').css({ perspective: n, rotateY: '180deg', 'backface-visibility': 'hidden','height':item.thumbFullHeight,'opacity':'1' });
            break;

          case 'imageSlide2Up':
          case 'imageSlide2Down':
          case 'imageSlide2Left':
          case 'imageSlide2Right':
          case 'imageSlide2UpRight':
          case 'imageSlide2UpLeft':
          case 'imageSlide2DownRight':
          case 'imageSlide2DownLeft':
          case 'imageSlide2Random':
            ThumbnailInitImageSlide($e, item );
            break;

          case 'slideUp':
            item.eltTransform['labelImage0'].translateY=item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;
          case 'slideDown':
            item.eltTransform['labelImage0'].translateY=-item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;
          case 'slideRight':
            item.eltTransform['labelImage0'].translateX=-item.thumbFullWidth;
            SetCSSTransform(item, 'labelImage0');
            break;
          case 'slideLeft':
            item.eltTransform['labelImage0'].translateX=item.thumbFullWidth;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'labelSlideUpTop':
          case 'labelSlideUp':
            item.eltTransform['labelImage0'].translateY=item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'labelSlideDown':
            $e.css({overflow: 'hidden'});
            // item.$getElt('.labelImage').css({top:-item.thumbFullHeight, bottom:''});
            item.eltTransform['labelImage0'].translateY=-item.thumbFullHeight;
            SetCSSTransform(item, 'labelImage0');
            break;

          case 'descriptionSlideUp':
            // var lh=(item.kind == 'album' ? item.$getElt('.labelFolderTitle').outerHeight(true) : item.$getElt('.labelImageTitle').outerHeight(true));
            // var p=item.thumbFullHeight - lh -G.tn.borderHeight-G.tn.imgcBorderHeight;
            // var lh2=item.$getElt('.labelDescription').outerHeight(true);
            //item.eltTransform['labelImage0'].translateY=lh2;
            //SetCSSTransform(item, 'labelImage0');


        }
      }

    };



    function newCSSTransform(item, eltClass, $e) {
      if( item.eltTransform[eltClass] == undefined ) {
        item.eltTransform[eltClass]=InitCSSTransform();
        item.eltTransform[eltClass].$elt=$e;
      }
      return item.eltTransform[eltClass];
    }

    function removeCSSTransform(item) {
       for (var p in item.eltTransform) {
          delete item.eltTransform[p];
       }
    }

    function InitCSSTransform() {
      var obj={translateX:0, translateY:0, rotateX:0, rotateY:0, rotateZ:0, scale:100};
      return obj;
    }

    function SetCSSTransform(item, objClass) {
      var obj=item.eltTransform[objClass];
      // var v = 'translateX('+obj.translateX+'px) translateY('+obj.translateY+'px)  scale('+obj.scale/100+')';
      var v = 'translateX('+obj.translateX+'px) translateY('+obj.translateY+'px) scale('+obj.scale/100+')';
      if( !(G.IE <= 9) && !G.isGingerbread ) {
        v += ' rotateX('+obj.rotateX+'deg) rotateY('+obj.rotateY+'deg) rotateZ('+obj.rotateZ+'deg)';
      }
      else {
        v += ' rotate('+obj.rotateZ+'deg)';
      }
      if( obj.$elt[0] != undefined ) {
        obj.$elt[0].style[G.CSStransformName]= v;
      }
    }


    // ANIMATION OF ONE THUMBNAIL ELEMENT
    function TnAni( $e, n, anime, item, eltClass) {

      // STEP 1: animate CSS transform
      var transform=['translateX','translateY', 'scale', 'rotateX', 'rotateY', 'rotateZ'];
      if( G.aengine == 'animate' ) {
        for( var i=0; i<transform.length; i++ ) {
          var tf=transform[i];
          if( typeof  anime[tf] !== 'undefined' ) {
            var tweenable = new NGTweenable();
            var to=parseInt(anime[tf]);
            tweenable.tween({
              attachment: { it: item, eC: eltClass, t:tf, f:to},
              from: { 'v': parseInt(item.eltTransform[eltClass][tf])  },
              to: { 'v': to },
              duration: G.tn.getHE()[n].duration,
              delay: G.tn.getHE()[n].delay,
              step: function (state, att) {
                if( att.it.hovered ) {
                  att.it.eltTransform[att.eC][att.t]=state.v;
                  SetCSSTransform(att.it, att.eC);
                }
              },
              finish: function (state, att) {
                if( att.it.hovered ) {
                  att.it.eltTransform[att.eC][att.t]=att.f;
                  SetCSSTransform(att.it, att.eC);
                }
              }
            });
            delete anime[tf];
          }
        }
      }

      // is there something else to animate?
      var l = 0;
      for( var key in anime ) {
        if( anime.hasOwnProperty(key) ) {
          l++;
          break;
        }
      }
      if( l == 0 ) {
        return;
      }

      // STEP 2: remaining animations
      if( G.aengine != 'transition' ) {
        // retrieve the 'from' values
        var fr={};
        for( var key in anime) {
          if( key == 'borderColor' ) {
            // borderColor is not supported in Firefox
            fr[key]=$e.css('borderTopColor');
          }
          else {
            fr[key]=$e.css(key);
          }
          if( fr[key] == 'transparent' ) {  // some browser return "transparent" as rgba(0,0,0,0),
            if( $e.hasClass('labelImage') ) {
              fr[key]='rgb('+G.custGlobals.oldLabelRed+','+G.custGlobals.oldLabelGreen+','+G.custGlobals.oldLabelBlue+',0.01)';
            }
            else {
              fr[key]='rgba(0,0,0,0)';
            }
          }
        }
        var tweenable = new NGTweenable();
        tweenable.tween({
          attachment: { $e:$e, it:item, to:anime},
          from: fr,
          to: anime,
          duration: G.tn.getHE()[n].duration,
          delay: G.tn.getHE()[n].delay,
          step: function (state, att) {
            if( att.it.hovered ) {
              att.$e.css(state);
            }
          },
          finish: function (state, att) {
            if( att.it.hovered ) {
              att.$e.css(anime);
            }
          }
        });
      }
      else {
        if( G.tn.getHE()[n].delay > 0 ) {
          // transit has a bug on queue --> we do not use it
          $e.delay(G.tn.getHE()[n].delay)[G.aengine](anime, G.tn.getHE()[n].duration , G.tn.getHE()[n].easing );
        }
        else {
          // transit has a bug on queue --> we do not use it
          //anime.queue=false;
          //anime.duration=5000;
          $e[G.aengine](anime, G.tn.getHE()[n].duration, G.tn.getHE()[n].easing );
        }
      }
    }


    function ThumbnailHover( $e ) {

      var n=$e.data('index');
      if( n == undefined ) { return; }    // required because can be fired on ghost elements
      if( G.aengine == 'velocity' ) {
        $e.find('*').velocity('stop', true);
      }
      else {
        $e.find('*').stop(true,false);
      }
      var item=G.I[n];
      item.hovered=true;
      var dscale=(G.aengine == 'animate' ? 1 : 100);

      if( typeof G.O.fnThumbnailHover == 'function' ) {
        G.O.fnThumbnailHover($e, item, ExposedObjects());
      }

      try {
        for( j=0; j<G.tn.getHE().length; j++) {
          switch(G.tn.getHE()[j].name ) {
            case 'imageSplit4':
              var $t=item.$getElt('.imgContainer');
              TnAni($t.eq(0), j, {translateX:-item.thumbFullWidth/2, translateY:-item.thumbFullHeight/2}, item, 'imgContainer0' );
              TnAni($t.eq(1), j, {translateX:item.thumbFullWidth/2, translateY:-item.thumbFullHeight/2}, item, 'imgContainer1' );
              TnAni($t.eq(2), j, {translateX:item.thumbFullWidth/2, translateY:item.thumbFullHeight/2}, item, 'imgContainer2' );
              TnAni($t.eq(3), j, {translateX:-item.thumbFullWidth/2, translateY:item.thumbFullHeight/2}, item, 'imgContainer3' );
              break;

            case 'imageSplitVert':
              var $t=item.$getElt('.imgContainer');
              TnAni($t.eq(0), j, {translateX:-item.thumbFullWidth/2}, item, 'imgContainer0' );
              TnAni($t.eq(1), j, {translateX:item.thumbFullWidth/2}, item, 'imgContainer1' );
              break;

            case 'labelSplit4':
              var $t=item.$getElt('.labelImage');
              TnAni($t.eq(0), j, {translateX:-item.thumbFullWidth/2, translateY:-item.thumbFullHeight/2}, item, 'labelImage0' );
              TnAni($t.eq(1), j, {translateX:item.thumbFullWidth/2, translateY:-item.thumbFullHeight/2}, item, 'labelImage1' );
              TnAni($t.eq(2), j, {translateX:item.thumbFullWidth/2, translateY:item.thumbFullHeight/2}, item, 'labelImage2' );
              TnAni($t.eq(3), j, {translateX:-item.thumbFullWidth/2, translateY:item.thumbFullHeight/2}, item, 'labelImage3' );
              break;

            case 'labelSplitVert':
              var $t=item.$getElt('.labelImage');
              TnAni($t.eq(0), j, {translateX:-item.thumbFullWidth/2}, item, 'labelImage0' );
              TnAni($t.eq(1), j, {translateX:item.thumbFullWidth/2}, item, 'labelImage1' );
              break;

            case 'labelAppearSplit4':
              var $t=item.$getElt('.labelImage');
              TnAni($t.eq(0), j, {translateX:0, translateY:0}, item, 'labelImage0' );
              TnAni($t.eq(1), j, {translateX:0, translateY:0}, item, 'labelImage1' );
              TnAni($t.eq(2), j, {translateX:0, translateY:0}, item, 'labelImage2' );
              TnAni($t.eq(3), j, {translateX:0, translateY:0}, item, 'labelImage3' );
              break;

            case 'labelAppearSplitVert':
              var $t=item.$getElt('.labelImage');
              TnAni($t.eq(0), j, {translateX:0}, item, 'labelImage0' );
              TnAni($t.eq(1), j, {translateX:0}, item, 'labelImage1' );
              break;

            case 'scaleLabelOverImage':
              TnAni(item.$getElt('.labelImage'), j, { scale:100/dscale, opacity: '1'}, item, 'labelImage0' );
              TnAni(item.$getElt('.imgContainer'), j, { scale:50/dscale}, item, 'imgContainer0' );
              break;

            case 'overScale':
            case 'overScaleOutside':
              TnAni(item.$getElt('.labelImage'), j, { opacity: '1', scale:100/dscale}, item, 'labelImage0' );
              TnAni(item.$getElt('.imgContainer'), j, { opacity: '0', scale:50/dscale}, item, 'imgContainer0' );
              break;

            case 'imageInvisible':
              TnAni(item.$getElt('.imgContainer'), j, { opacity: '0'}, item );
              break;

            case 'rotateCornerBL':
              var r=(G.aengine=='transition'?{rotate:'0deg'}:{rotateZ:'0'});
              TnAni(item.$getElt('.labelImage'), j, r, item, 'labelImage0' );
              r=(G.aengine=='transition'?{rotate:'90deg'}:{rotateZ:'90'});
              TnAni(item.$getElt('.imgContainer'), j, r, item, 'imgContainer0' );
              break;

            case 'rotateCornerBR':
              var r=(G.aengine=='transition'?{rotate:'0deg'}:{rotateZ:'0'});
              TnAni(item.$getElt('.labelImage'), j, r, item, 'labelImage0' );
              r=(G.aengine=='transition'?{rotate:'-90deg'}:{rotateZ:'-90'});
              TnAni(item.$getElt('.imgContainer'), j, r, item, 'imgContainer0' );
              break;

            case 'imageRotateCornerBL':
              var r=(G.aengine=='transition'?{rotate:'90deg'}:{rotateZ:'90'});
              TnAni(item.$getElt('.imgContainer'), j, r, item, 'imgContainer0' );
              break;

            case 'imageRotateCornerBR':
              var r=(G.aengine=='transition'?{rotate:'-90deg'}:{rotateZ:'-90'});
              TnAni(item.$getElt('.imgContainer'), j, r, item, 'imgContainer0' );
              break;

            case 'slideUp':
              TnAni(item.$getElt('.imgContainer'), j, { translateY: -item.thumbFullHeight}, item, 'imgContainer0' );
              TnAni(item.$getElt('.labelImage'), j, { translateY: 0}, item, 'labelImage0' );
              break;

            case 'slideDown':
              TnAni(item.$getElt('.imgContainer'), j, { translateY: item.thumbFullHeight}, item, 'imgContainer0' );
              TnAni(item.$getElt('.labelImage'), j, { translateY: 0}, item, 'labelImage0' );
              break;

            case 'slideRight':
              TnAni(item.$getElt('.imgContainer'), j, { translateX: item.thumbFullWidth}, item, 'imgContainer0' );
              TnAni(item.$getElt('.labelImage'), j, { translateX: 0}, item, 'labelImage0' );
              break;

            case 'slideLeft':
              TnAni(item.$getElt('.imgContainer'), j, { translateX: -item.thumbFullWidth}, item, 'imgContainer0' );
              TnAni(item.$getElt('.labelImage'), j, { translateX: 0}, item, 'labelImage0' );
              break;

            case 'imageSlideUp':
              TnAni(item.$getElt('.imgContainer'), j, { translateY: -item.thumbFullHeight }, item, 'imgContainer0' );
              break;

            case 'imageSlideDown':
              TnAni(item.$getElt('.imgContainer'), j, { translateY: item.thumbFullHeight }, item, 'imgContainer0' );
              break;

            case 'imageSlideLeft':
              TnAni(item.$getElt('.imgContainer'), j, { translateX: -item.thumbFullWidth }, item, 'imgContainer0' );
              break;

            case 'imageSlideRight':
              TnAni(item.$getElt('.imgContainer'), j, { translateX: item.thumbFullWidth }, item, 'imgContainer0' );
              break;

            case 'labelAppear':
              if( G.aengine == 'velocity' ) {
                TnAni(item.$getElt('.labelImage'), j, { backgroundColorRed:G.custGlobals.oldLabelRed, backgroundColorGreen:G.custGlobals.oldLabelGreen, backgroundColorBlue:G.custGlobals.oldLabelBlue, backgroundColorAlpha:1 }, item );
              }
              else {
                var c='rgba('+G.custGlobals.oldLabelRed+','+G.custGlobals.oldLabelGreen+','+G.custGlobals.oldLabelBlue+',0.99)';    // use 0.99 instead of 1 for opacity because 1=no transparency so jQuery would return RGB instead of RGBA
                TnAni(item.$getElt('.labelImage'), j, { backgroundColor: c}, item );
              }
              if( item.kind == 'album' ) {
                 TnAni(item.$getElt('.labelFolderTitle'), j, { opacity: '1'}, item );
              }
              else {
                TnAni(item.$getElt('.labelImageTitle'), j, { opacity: '1'}, item );
              }
              TnAni(item.$getElt('.labelDescription'), j, { opacity: '1'}, item );
              break;

            case 'labelAppear75':
              if( G.aengine == 'velocity' ) {
                TnAni(item.$getElt('.labelImage'), j, { backgroundColorRed:G.custGlobals.oldLabelRed, backgroundColorGreen:G.custGlobals.oldLabelGreen, backgroundColorBlue:G.custGlobals.oldLabelBlue, backgroundColorAlpha:0.75 }, item );
              }
              else {
                var c='rgba('+G.custGlobals.oldLabelRed+','+G.custGlobals.oldLabelGreen+','+G.custGlobals.oldLabelBlue+',0.75)';
                TnAni(item.$getElt('.labelImage'), j, { backgroundColor: c}, item );
              }
              if( item.kind == 'album' ) {
                TnAni(item.$getElt('.labelFolderTitle'), j, { opacity: '1'}, item );
              }
              else {
                TnAni(item.$getElt('.labelImageTitle'), j, { opacity: '1'}, item );
              }
              TnAni(item.$getElt('.labelDescription'), j, { opacity: '1'}, item );
              break;

            case 'descriptionAppear':
              TnAni(item.$getElt('.labelDescription'), j, { opacity: '1'}, item );
              break;

            case 'labelSlideDown':
              TnAni(item.$getElt('.labelImage'), j, { translateY: 0}, item, 'labelImage0' );
              break;

            case 'labelSlideUpTop':
            case 'labelSlideUp':
              TnAni(item.$getElt('.labelImage'), j, { translateY: 0}, item, 'labelImage0' );
              break;

            case 'descriptionSlideUp':
              var lh=(item.kind == 'album' ? item.$getElt('.labelFolderTitle').outerHeight(true) : item.$getElt('.labelImageTitle').outerHeight(true));
              var lh2=item.$getElt('.labelDescription').outerHeight(true);
              var p=item.thumbFullHeight - lh -lh2;
              if( p<0 ) { p=0; }
              TnAni(item.$getElt('.labelImage'), j, { translateY:0, height:lh+lh2 }, item, 'labelImage0' );
              TnAni(item.$getElt('.labelDescription'), j, { opacity: '1'}, item );
              break;

            case 'labelOpacity50':
              TnAni(item.$getElt('.labelImage'), j, { opacity: '0.5' }, item );
              break;

            case 'imageOpacity50':
              TnAni(item.$getElt('.imgContainer'), j, { opacity: '0.5' }, item );
              break;

            case 'borderLighter':
              if( G.aengine == 'velocity' ) {
                var colorString=lighterColor(G.custGlobals.oldBorderColor,0.5),
                co = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
                TnAni($e, j, { borderColorRed:co[0], borderColorGreen:co[1], borderColorBlue:co[2], colorAlpha:co[3] }, item );
              }
              else {
                // TnAni($e, j, { borderColor: lighterColor(G.custGlobals.oldBorderColor,0.5) }, item );
                var c=$e.css('borderTopColor');
                $e.data('ngcache_borderColor',c);
                TnAni($e, j, { borderColor: lighterColor(c,0.5) }, item );
              }
              break;

            case 'borderDarker':
              if( G.aengine == 'velocity' ) {
                var colorString=darkerColor(G.custGlobals.oldBorderColor,0.5),
                co = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
                TnAni($e, j, { borderColorRed:co[0], borderColorGreen:co[1], borderColorBlue:co[2], colorAlpha:co[3] }, item );
              }
              else {
                // TnAni($e, j, { borderColor: darkerColor(G.custGlobals.oldBorderColor,0.5) }, item );
                var c=$e.css('borderTopColor');
                $e.data('ngcache_borderColor',c);
                TnAni($e, j, { borderColor: darkerColor(c,0.5) }, item );
              }
              break;

            case 'imageScale150':
              TnAni(item.$getElt('img'), j, { scale: 150/dscale }, item, 'img0' );
              break;

            case 'imageScaleIn80':
              TnAni(item.$getElt('img'), j, { scale: 100/dscale }, item, 'img0' );
              break;

            case 'imageSlide2Up':
            case 'imageSlide2Down':
            case 'imageSlide2Left':
            case 'imageSlide2Right':
            case 'imageSlide2UpRight':
            case 'imageSlide2UpLeft':
            case 'imageSlide2DownRight':
            case 'imageSlide2DownLeft':
            case 'imageSlide2Random':
              switch(item.customData.hoverEffectRDir) {
                case 'imageSlide2Up':
                  var tY=item.thumbFullHeight < (item.imgHeight*1.4) ? ((item.imgHeight*1.4)-item.thumbFullHeight)/2 : 0;
                  TnAni(item.$getElt('img'), j, { translateY: -tY }, item, 'img0' );
                  break;
                case 'imageSlide2Down':
                  var tY=item.thumbFullHeight < (item.imgHeight*1.4) ? ((item.imgHeight*1.4)-item.thumbFullHeight)/2 : 0;
                  TnAni(item.$getElt('img'), j, { translateY: tY }, item, 'img0' );
                  break;
                case 'imageSlide2Left':
                  TnAni(item.$getElt('img'), j, { translateX: -item.thumbFullWidth*.1 }, item, 'img0' );
                  break;
                case 'imageSlide2Right':
                  TnAni(item.$getElt('img'), j, { translateX: item.thumbFullWidth*.1 }, item, 'img0' );
                  break;

                case 'imageSlide2UpRight':
                  TnAni(item.$getElt('img'), j, { translateY: -item.thumbFullHeight*.05, translateX: item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
                case 'imageSlide2UpLeft':
                  TnAni(item.$getElt('img'), j, { translateY: -item.thumbFullHeight*.05, translateX: -item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
                case 'imageSlide2DownRight':
                  TnAni(item.$getElt('img'), j, { translateY: item.thumbFullHeight*.05, translateX: item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
                case 'imageSlide2DownLeft':
                  TnAni(item.$getElt('img'), j, { translateY: item.thumbFullHeight*.05, translateX: -item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
              }
              break;

            case 'imageScale150Outside':
              setElementOnTop('', $e);
              TnAni(item.$getElt('img'), j, { scale: 150/dscale }, item, 'img0');
              break;

            case 'scale120':
              setElementOnTop('', $e);
              TnAni($e, j, { scale: 120/dscale }, item, 'base' );
              break;

            case 'imageExplode':
              setElementOnTop('', $e);
              var $iC=item.$getElt('.imgContainer');
              n=Math.sqrt($iC.length);
              var l = [];
              for(var i=0; i<=Math.PI; i+=Math.PI/(n-1) ){
                l.push(Math.sin(i));
              }
              var w=$iC.outerWidth(true)/n,
              h=$iC.outerHeight(true)/n,
              i=0;
              for(var r=0; r<n; r++ ) {
               for(var c=0; c<n; c++ ) {
                  TnAni($iC.eq(i++), j, { top:((-h*n/3)+h*r-h)*l[c], left:((-w*n/3)+w*c-w)*l[r], scale:1.5, opacity:0}, item );
                }
              }
              break;

            case 'imageFlipHorizontal':
              setElementOnTop('', $e);
              TnAni(item.$getElt('.imgContainer'), j, { rotateX: 180}, item, 'imgContainer0' );
              TnAni(item.$getElt('.labelImage'), j, { rotateX: 360}, item, 'labelImage0' );
              break;

            case 'imageFlipVertical':
              setElementOnTop('', $e);
              TnAni(item.$getElt('.imgContainer'), j, { rotateY: 180}, item, 'imgContainer0' );
              TnAni(item.$getElt('.labelImage'), j, { rotateY: 360}, item, 'labelImage0' );
              break;

            // case 'flipHorizontal':
              // setElementOnTop('', $e);
              // var n= Math.round(item.thumbFullHeight*1.2) + 'px';
              // TnAni($e, j, { perspective: n, rotateX: '180deg'}, item );
              // break;

            // case 'flipVertical':
              // setElementOnTop('', $e);
              // var n= Math.round(item.thumbFullWidth*1.2) + 'px';
              // TnAni($e, j, { perspective: n, rotateY: '180deg'}, item );
              // break;

            case 'TEST':
              //item.$getElt('img').stop(true, true);
              // TnAni(item.$getElt('.subcontainer'), j, { scale: 80//dscale }, item );
              break;
          }
        }
      }
      catch (e) {
        nanoAlert( 'error on hover ' +e.message );
      }
    };



    function TnAniO( $e, n, anime, item, eltClass) {

      // STEP 1: animate CSS transform
      var transform=['translateX', 'translateY', 'scale', 'rotateX', 'rotateY', 'rotateZ'];
      if( G.aengine == 'animate' ) {
        for( var i=0; i<transform.length; i++ ) {
          var tf=transform[i];
          if( typeof  anime[tf] !== 'undefined' ) {
            var tweenable = new NGTweenable();
            var to=parseInt(anime[tf]);
            tweenable.tween({
              attachment: { it: item, eC: eltClass, t:tf, f:to},
              from: { 'v': parseInt(item.eltTransform[eltClass][tf])  },
              to: { 'v': to },
              duration: G.tn.getHE()[n].durationBack,
              delay: G.tn.getHE()[n].delayBack,
              step: function (state, att) {
                att.it.eltTransform[att.eC][att.t]=state.v;
                SetCSSTransform(att.it, att.eC);
              },
              finish: function (state, att) {
                att.it.eltTransform[att.eC][att.t]=att.f;
                SetCSSTransform(att.it, att.eC);
              }
            });
            delete anime[tf];
          }
        }
      }

      // is there something else to animate?
      var l = 0;
      for( var key in anime ) {
        if( anime.hasOwnProperty(key) ) {
          l++;
          break;
        }
      }
      if( l == 0 ) {
        return;
      }

      // STEP 2: remaining animations
       if( G.aengine != 'transition' ) {
        // retrieve the 'from' values
        var fr={};
        for( var key in anime) {
          if( key == 'borderColor' ) {
            // borderColor is not supported in Firefox
            fr[key]=$e.css('borderTopColor');
          }
          else {
            fr[key]=$e.css(key);
            if( fr[key] == 'transparent' ) {  // some browser return "transparent" as rgba(0,0,0,0)
              fr[key]='rgba(0,0,0,0.01)';
            }
          }
        }
        var tweenable = new NGTweenable();
        tweenable.tween({
          attachment: { $e:$e, it:item, to:anime},
          from: fr,
          to: anime,
          duration: G.tn.getHE()[n].durationBack,
          delay: G.tn.getHE()[n].delayBack,
          step: function (state, att) {
            att.$e.css(state);
          },
          finish: function (state, att) {
            att.$e.css(att.to);
          }
        });
      }
      else {
        if( G.tn.getHE()[n].delay > 0 ) {
          // transit has a bug on queue --> we do not use it
          $e.delay(G.tn.getHE()[n].delay)[G.aengine](anime, G.tn.getHE()[n].durationBack , G.tn.getHE()[n].easingBack );
        }
        else {
          // transit has a bug on queue --> we do not use it
          //anime.queue=false;
          //anime.duration=5000;
          $e[G.aengine](anime, G.tn.getHE()[n].durationBack, G.tn.getHE()[n].easingBack );
        }
      }
    }


    function ThumbnailHoverOut( $e ) {
      if( G.containerViewerDisplayed ) { return; }

      var n=$e.data("index");
      if( n == undefined ) { return; }    // required because can be fired on ghost elements

      if( G.aengine == 'velocity' ) {
        $e.find('*').velocity('stop', true);
      }
      else {
        $e.find('*').filter(":animated").stop(true,false);
      }
      var item=G.I[n];

      item.hovered=false;
      var dscale=(G.aengine == 'animate' ? 1 : 100);

      if( typeof G.O.fnThumbnailHoverOut == 'function' ) {
        G.O.fnThumbnailHoverOut($e, item, ExposedObjects());
      }

      try {
        for( j=0; j<G.tn.getHE().length; j++) {
          switch(G.tn.getHE()[j].name ) {
            case 'imageSplit4':
              var $t=item.$getElt('.imgContainer');
              TnAniO($t.eq(0), j, {translateX:0, translateY:0}, item, 'imgContainer0' );
              TnAniO($t.eq(1), j, {translateX:0, translateY:0}, item, 'imgContainer1' );
              TnAniO($t.eq(2), j, {translateX:0, translateY:0}, item, 'imgContainer2' );
              TnAniO($t.eq(3), j, {translateX:0, translateY:0}, item, 'imgContainer3' );
              break;
              TnAniO($t.eq(0), j, {right:'0%', top:'0%'} );
              TnAniO($t.eq(1), j, {left:'0%', top:'0%'} );
              TnAniO($t.eq(2), j, {left:'0%', bottom:'0%'} );
              TnAniO($t.eq(3), j, {right:'0%', bottom:'0%'} );
              break;

            case 'imageSplitVert':
              var $t=item.$getElt('.imgContainer');
              TnAniO($t.eq(0), j, {translateX:0}, item, 'imgContainer0' );
              TnAniO($t.eq(1), j, {translateX:0}, item, 'imgContainer1' );
              break;

            case 'labelSplit4':
              var $t=item.$getElt('.labelImage');
              TnAniO($t.eq(0), j, {translateX:0, translateY:0}, item, 'labelImage0' );
              TnAniO($t.eq(1), j, {translateX:0, translateY:0}, item, 'labelImage1' );
              TnAniO($t.eq(2), j, {translateX:0, translateY:0}, item, 'labelImage2' );
              TnAniO($t.eq(3), j, {translateX:0, translateY:0}, item, 'labelImage3' );
              break;

            case 'labelSplitVert':
              var $t=item.$getElt('.labelImage');
              TnAniO($t.eq(0), j, {translateX:0}, item, 'labelImage0' );
              TnAniO($t.eq(1), j, {translateX:0}, item, 'labelImage1' );
              break;

            case 'labelAppearSplit4':
              var $t=item.$getElt('.labelImage');
              TnAniO($t.eq(0), j, {translateX:-item.thumbFullWidth/2, translateY:-item.thumbFullHeight/2}, item, 'labelImage0' );
              TnAniO($t.eq(1), j, {translateX:item.thumbFullWidth/2, translateY:-item.thumbFullHeight/2}, item, 'labelImage1' );
              TnAniO($t.eq(2), j, {translateX:item.thumbFullWidth/2, translateY:item.thumbFullHeight/2}, item, 'labelImage2' );
              TnAniO($t.eq(3), j, {translateX:-item.thumbFullWidth/2, translateY:item.thumbFullHeight/2}, item, 'labelImage3' );
              break;

            case 'labelAppearSplitVert':
              var $t=item.$getElt('.labelImage');
              TnAniO($t.eq(0), j, {translateX:-item.thumbFullWidth/2}, item, 'labelImage0' );
              TnAniO($t.eq(1), j, {translateX:item.thumbFullWidth/2}, item, 'labelImage1' );
              break;

            case 'scaleLabelOverImage':
              TnAniO(item.$getElt('.labelImage'), j, { opacity: '0', scale: 50/dscale}, item, 'labelImage0' );
              TnAniO(item.$getElt('.imgContainer'), j, { scale: 100/dscale }, item, 'imgContainer0' );
              break;

            case 'overScale':
            case 'overScaleOutside':
              TnAniO(item.$getElt('.labelImage'), j, { opacity: '0', scale:150/dscale}, item, 'labelImage0' );
              TnAniO(item.$getElt('.imgContainer'), j, { opacity: '1', scale:100/dscale}, item, 'imgContainer0' );
              break;

            case 'imageInvisible':
              TnAniO(item.$getElt('.imgContainer'), j, { opacity: '1'} );
              break;

            case 'rotateCornerBL':
              var r=(G.aengine=='transition'?{rotate:'-90deg'}:{rotateZ:'-90'});
              TnAniO(item.$getElt('.labelImage'), j, r, item, 'labelImage0' );
              r=(G.aengine=='transition'?{rotate:'0deg'}:{rotateZ:'0'});
              TnAniO(item.$getElt('.imgContainer'), j, r, item, 'imgContainer0' );
              break;

            case 'rotateCornerBR':
              var r=(G.aengine=='transition'?{rotate:'90deg'}:{rotateZ:'90'});
              TnAniO(item.$getElt('.labelImage'), j, r, item, 'labelImage0' );
              r=(G.aengine=='transition'?{rotate:'0deg'}:{rotateZ:'0'});
              TnAniO(item.$getElt('.imgContainer'), j, r, item, 'imgContainer0' );
              break;

            case 'imageRotateCornerBL':
            case 'imageRotateCornerBR':
              var r=(G.aengine=='transition'?{rotate:'0deg'}:{rotateZ:'0'});
              TnAniO(item.$getElt('.imgContainer'), j, r, item, 'imgContainer0' );
              break;

            case 'slideUp':
              TnAniO(item.$getElt('.imgContainer'), j, { translateY: 0}, item, 'imgContainer0' );
              TnAniO(item.$getElt('.labelImage'), j, { translateY: item.thumbFullHeight}, item, 'labelImage0' );
              break;

            case 'slideDown':
              TnAniO(item.$getElt('.imgContainer'), j, { translateY: 0}, item, 'imgContainer0' );
              TnAniO(item.$getElt('.labelImage'), j, { translateY: -item.thumbFullHeight}, item, 'labelImage0' );
              break;

            case 'slideRight':
              TnAniO(item.$getElt('.imgContainer'), j, { translateX: 0}, item, 'imgContainer0' );
              TnAniO(item.$getElt('.labelImage'), j, { translateX: -item.thumbFullWidth}, item, 'labelImage0' );
              break;

            case 'slideLeft':
              TnAniO(item.$getElt('.imgContainer'), j, { translateX: 0}, item, 'imgContainer0' );
              TnAniO(item.$getElt('.labelImage'), j, { translateX: item.thumbFullWidth}, item, 'labelImage0' );
              break;

            case 'imageSlideUp':
            case 'imageSlideDown':
              TnAniO(item.$getElt('.imgContainer'), j, { translateY: 0 }, item, 'imgContainer0' );
              break;

            case 'imageSlideLeft':
            case 'imageSlideRight':
              TnAniO(item.$getElt('.imgContainer'), j, { translateX: 0 }, item, 'imgContainer0' );
              break;

            case 'labelAppear':
            case 'labelAppear75':
              if( G.aengine == 'velocity' ) {
                TnAniO(item.$getElt('.labelImage'), j, { backgroundColorRed:G.custGlobals.oldLabelRed, backgroundColorGreen:G.custGlobals.oldLabelGreen, backgroundColorBlue:G.custGlobals.oldLabelBlue, backgroundColorAlpha:0 } );
              }
              else {
                var c='rgba('+G.custGlobals.oldLabelRed+','+G.custGlobals.oldLabelGreen+','+G.custGlobals.oldLabelBlue+',0.01)';
                TnAniO(item.$getElt('.labelImage'), j, { backgroundColor: c} );
              }
              if( item.kind == 'album' ) {
                TnAniO(item.$getElt('.labelFolderTitle'), j, { opacity: '0' } );
              }
              else {
                TnAniO(item.$getElt('.labelImageTitle'), j, { opacity: '0' } );
              }
              TnAniO(item.$getElt('.labelDescription'), j, { opacity: '0' } );
              break;

            case 'descriptionAppear':
              TnAniO(item.$getElt('.labelDescription'), j, { opacity: '0' } );
              break;

            case 'labelSlideDown':
              TnAniO(item.$getElt('.labelImage'), j, { translateY:-item.thumbFullHeight}, item, 'labelImage0' );
              break;

            case 'labelSlideUpTop':
            case 'labelSlideUp':
              TnAniO(item.$getElt('.labelImage'), j, { translateY: item.thumbFullHeight}, item, 'labelImage0' );
              break;

            case 'descriptionSlideUp':
              var lh=(item.kind == 'album' ? item.$getElt('.labelFolderTitle').outerHeight(true) : item.$getElt('.labelImageTitle').outerHeight(true));
              var p=item.thumbFullHeight - lh -G.tn.borderHeight-G.tn.imgcBorderHeight;
              TnAniO(item.$getElt('.labelImage'), j, {translateY:0, height:lh}, item, 'labelImage0' );
              break;


            case 'labelOpacity50':
              TnAniO(item.$getElt('.labelImage'), j, { opacity: G.custGlobals.oldLabelOpacity } );
              break;

            case 'imageOpacity50':
              TnAniO(item.$getElt('.imgContainer'), j, { opacity: '1' } );
              break;

            case 'borderLighter':
            case 'borderDarker':
              if( G.aengine == 'velocity' ) {
                var colorString=G.custGlobals.oldBorderColor;
                var co = colorString.substring(colorString.indexOf('(') + 1, colorString.lastIndexOf(')')).split(/,\s*/);
                TnAniO($e, j, { borderColorRed:co[0], borderColorGreen:co[1], borderColorBlue:co[2], colorAlpha:co[3] } );
              }
              else {
                // TnAniO($e, j, { borderColor: G.custGlobals.oldBorderColor } );
                TnAniO($e, j, { borderColor: $e.data('ngcache_borderColor') } );
              }
              break;

            case 'imageScale150':
            case 'imageScale150Outside':
              TnAniO(item.$getElt('img'), j, { scale: 100/dscale }, item, 'img0');
              break;

            case 'imageScaleIn80':
              TnAniO(item.$getElt('img'), j, { scale: 120/dscale }, item, 'img0');
              break;

            case 'imageSlide2Up':
            case 'imageSlide2Down':
            case 'imageSlide2Left':
            case 'imageSlide2Right':
            case 'imageSlide2UpRight':
            case 'imageSlide2UpLeft':
            case 'imageSlide2DownRight':
            case 'imageSlide2DownLeft':
            case 'imageSlide2Random':
              switch(item.customData.hoverEffectRDir) {
                case 'imageSlide2Up':
                  var tY=item.thumbFullHeight < (item.imgHeight*1.4) ? ((item.imgHeight*1.4)-item.thumbFullHeight)/2 : 0;
                  TnAniO(item.$getElt('img'), j, { translateY: tY }, item, 'img0' );
                  break;
                case 'imageSlide2Down':
                  var tY=item.thumbFullHeight < (item.imgHeight*1.4) ? ((item.imgHeight*1.4)-item.thumbFullHeight)/2 : 0;
                  TnAniO(item.$getElt('img'), j, { translateY: -tY }, item, 'img0' );
                  break;
                case 'imageSlide2Left':
                  TnAniO(item.$getElt('img'), j, { translateX: item.thumbFullWidth*.1 }, item, 'img0' );
                  break;
                case 'imageSlide2Right':
                  TnAniO(item.$getElt('img'), j, { translateX: -item.thumbFullWidth*.1 }, item, 'img0' );
                  break;

                case 'imageSlide2UpRight':
                  TnAniO(item.$getElt('img'), j, { translateY: item.thumbFullHeight*.05, translateX: -item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
                case 'imageSlide2UpLeft':
                  TnAniO(item.$getElt('img'), j, { translateY: item.thumbFullHeight*.05, translateX: item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
                case 'imageSlide2DownRight':
                  TnAniO(item.$getElt('img'), j, { translateY: -item.thumbFullHeight*.05, translateX: -item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
                case 'imageSlide2DownLeft':
                  TnAniO(item.$getElt('img'), j, { translateY: -item.thumbFullHeight*.05, translateX: item.thumbFullWidth*.05 }, item, 'img0' );
                  break;
              }
              break;



            case 'scale120':
              TnAniO($e, j, { scale: 100/dscale }, item, 'base' );
              break;

            case 'imageExplode':
              var $iC=item.$getElt('.imgContainer');
              n=Math.sqrt($iC.length);
              var i=0;
              for(var r=0; r<n; r++ ) {
                for(var c=0; c<n; c++ ) {
                  TnAniO($iC.eq(i++), j, { top:'0', left:'0', scale:'1', opacity:'1'} );
                }
              }
              break;


            case 'imageFlipHorizontal':
              // var n= Math.round(item.thumbFullHeight*1.2) + 'px';
              TnAniO(item.$getElt('.imgContainer'), j, { rotateX: 0}, item, 'imgContainer0' );
              TnAniO(item.$getElt('.labelImage'), j, { rotateX: 180}, item, 'labelImage0' );
              break;

            case 'imageFlipVertical':
              // var n= Math.round(item.thumbFullWidth*1.2) + 'px';
              TnAniO(item.$getElt('.imgContainer'), j, { rotateY: 0}, item, 'imgContainer0' );
              TnAniO(item.$getElt('.labelImage'), j, { rotateY: 180}, item, 'labelImage0' );
              break;

            // case 'flipHorizontal':
              // var n= Math.round(item.thumbFullHeigh*1.2) + 'px';
              // TnAniO($e, j, { rotateX: '0deg'} );
              // break;

            // case 'flipVertical':
              // var n= Math.round(item.thumbFullWidth*1.2) + 'px';
              // TnAniO($e, j, { rotateY: '0deg'} );
              // break;

            case 'TEST':
              // TnAniO(item.$getElt('.subcontainer'), j, { scale: 0.85 } );
              break;
          }
        }
      }
      catch (e) {
        nanoAlert( 'error on hoverOut ' +e.message );
      }
    };



    // #########################
    // ##### IMAGE DISPLAY #####
    // #########################

    function DisplayImage( imageIdx ) {

      if( !G.O.thumbnailOpenImage ) { return; }

      if( typeof G.O.fnThumbnailOpen == 'function' ) {
        OpenImageCustomViewer(imageIdx);
        return;
      }

      if( G.O.viewer == 'fancybox' ) {
        OpenFancyBox(imageIdx);
      }
      else {
        if( !G.containerViewerDisplayed ) {
          OpenInternalViewer(imageIdx);
        }
        else {
          DisplayInternalViewer(imageIdx, '');
        }
      }
    };

    function OpenInternalViewer( imageIdx ) {

      //if( !G.O.locationHash ) {
      //  top.location.hash='nanogallery/'+G.baseEltID+'/v';
      //}
      // if( G.O.viewerScrollBarHidden ) {
        jQuery('body').css({overflow:'hidden'});  //avoid scrollbars
      // }

      G.containerViewerDisplayed=true;

      G.$E.conVwCon=jQuery('<div  class="nanoGalleryViewerContainer" style="visibility:visible"></div>').appendTo('body');
      G.$E.conVwCon.addClass('nanogallery_theme_'+G.O.theme);
      SetColorSchemeViewer(G.$E.conVwCon);

      G.$E.conVw=jQuery('<div  id="nanoGalleryViewer" class="nanoGalleryViewer" style="visibility:visible" itemscope itemtype="http://schema.org/ImageObject"></div>').appendTo(G.$E.conVwCon);
      G.$E.conVw.css({
        visibility:'visible',
        position: 'fixed'    //"absolute",
      });

      // avoid pinch zoom
      G.$E.conVw.css({msTouchAction:'none', touchAction:'none'});

      var sImg='',
      l=G.I.length;

      sImg+='<img class="image nGEvent" src="'+G.I[imageIdx].responsiveURL()+'" alt=" " style="visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';
      sImg+='<img class="image nGEvent" src="'+G.I[imageIdx].responsiveURL()+'" alt=" " style="visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';
      sImg+='<img class="image nGEvent" src="'+G.I[imageIdx].responsiveURL()+'" alt=" " style="visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';
// sImg+='<img class="image nGEvent" src="" alt=" " style="background-image:url('+G.I[imageIdx].responsiveURL()+');visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';
// sImg+='<img class="image nGEvent" src="" alt=" " style="background-image:url('+G.I[imageIdx].responsiveURL()+');visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';
// sImg+='<img class="image nGEvent" src="" alt=" " style="background-image:url('+G.I[imageIdx].responsiveURL()+');visibility:visible;opacity:0;position:absolute;top:0;bottom:0;left:0;right:0;margin:auto;zoom:1;" itemprop="contentURL">';

      G.$E.vwContent=jQuery('<div class="content nGEvent">'+sImg+'<div class="contentAreaPrevious nGEvent"></div><div class="contentAreaNext nGEvent"></div></div>').appendTo(G.$E.conVw);
      G.$E.vwImgP=G.$E.conVw.find('.image').eq(0);
      G.$E.vwImgC=G.$E.conVw.find('.image').eq(1);
      G.$E.vwImgN=G.$E.conVw.find('.image').eq(2);

      // makes content unselectable --> avoid image drag effect during 'mouse swipe'
      G.$E.conVwCon.find('*').attr('draggable', 'false').attr('unselectable', 'on');

      var $closeB=jQuery('<div class="closeButtonFloating nGEvent"></div>').appendTo(G.$E.conVw);
      $closeB.on("touchstart click",function(e){
      // $closeB.on( (G.isIOS ? "touchstart" : "click") ,function(e){     // IPAD
        e.preventDefault();
        e.stopPropagation();
        if( (new Date().getTime()) - G.timeImgChanged < 400 ) { return; }
        CloseInternalViewer(true);
        return false;
      });

      // build image toolbar
      var sTB='<div class="toolbarContainer nGEvent" style="visibility:'+(G.O.viewerToolbar.display ? "visible" : "hidden")+';"><div class="toolbar nGEvent">';
      var tstd = G.O.viewerToolbar.standard.split(',');
      for( var i=0, lstd=tstd.length; i<lstd; i++) {
        sTB+=ToolbarAddElt( tstd[i] );
      }
      var tmin = G.O.viewerToolbar.minimized.split(',');
      for( var i=0, lmin=tmin.length; i<lmin; i++) {
        if( G.O.viewerToolbar.standard.indexOf(tmin[i]) == -1 ) {
          sTB+=ToolbarAddElt( tmin[i] );
        }
      }
      sTB+='</div></div>';
      G.$E.conVwTb=jQuery(sTB).appendTo(G.$E.conVw);

      if( G.toolbarMode == 'min' || (G.O.viewerToolbar.autoMinimize > 0 && G.O.viewerToolbar.autoMinimize >= getViewport().w) ) {
        ToolbarVisibilityMin();
      }
      else {
        ToolbarVisibilityStd();
      }

      if( G.O.viewerFullscreen ) {
        G.viewerIsFullscreen=true;
        G.$E.conVwTb.find('.fullscreenButton').removeClass('setFullscreenButton').addClass('removeFullscreenButton');
        ngscreenfull.request();
      }


      if( G.O.viewerDisplayLogo ) {
        G.$E.vwLogo=jQuery('<div class="nanoLogo"></div>').appendTo(G.$E.conVw);
      }

      setElementOnTop('',G.$E.conVw);
      setElementOnTop(G.$E.conVw,$closeB);
      ResizeInternalViewer();

      G.timeImgChanged=new Date().getTime();

      G.$E.conVwTb.find('.closeButton').on("touchstart click",function(e){
        e.preventDefault();
        e.stopPropagation();
        if( (new Date().getTime()) - G.timeImgChanged < 400 ) { return; }
        CloseInternalViewer(true);
      });


      G.$E.conVwTb.find('.playPauseButton').on("touchstart click",function(e){
        e.stopPropagation();
        SlideshowToggle();
      });

      G.$E.conVwTb.find('.minimizeButton').on("touchstart click",function(e){
        e.stopPropagation();
        ToolbarVisibilityToggle();
      });

      G.$E.conVwTb.find('.fullscreenButton').on("touchstart click",function(e){
        e.stopPropagation();
        ViewerFullscreenToggle();
      });

      G.$E.conVwTb.find('.infoButton').on("touchstart click",function(e){
        e.stopPropagation();
        if( typeof G.O.fnViewerInfo == 'function' ) {
          G.O.fnViewerInfo(G.I[G.viewerCurrentItemIdx], ExposedObjects());
        }
      });


      // custom button click
      G.$E.conVwTb.find('.ngCustomBtn').on("touchstart click",function(e){

        e.stopPropagation();
        if( typeof G.O.fnImgToolbarCustClick == 'function' ) {
          var target = e.target || e.srcElement;
          while( target == null || target.getAttribute('class') == null || target.getAttribute('class').indexOf('ngCustomBtn') == -1 ) {       // go element parent up to find the custom element
            target = target.parentNode;
          }
          var v=target.getAttribute('class');
          if( v.indexOf('ngCustomBtn') >=0 ) {
            var vs=v.split(' ');
            for( var i=0, l=vs.length; i<l; i++) {
              if( vs[i].indexOf('custom') == 0 ) {
                G.O.fnImgToolbarCustClick(vs[i], jQuery(target), G.I[G.viewerCurrentItemIdx], ExposedObjects())
              }
            }
          }
        }
      });


      G.$E.conVwTb.find('.linkOriginalButton').on("touchstart click",function(e){
        e.stopPropagation();
        if( G.O.kind == 'picasa') {
          var sU='https://plus.google.com/photos/'+G.O.userID+'/albums/'+G.I[G.viewerCurrentItemIdx].albumID+'/'+G.I[G.viewerCurrentItemIdx].GetID();
          window.open(sU,'_blank');
        }

        if( G.O.kind == 'flickr') {
          var sU='https://www.flickr.com/photos/'+G.O.userID+'/'+G.I[G.viewerCurrentItemIdx].GetID();
          window.open(sU,'_blank');
        }
      });

      G.$E.conVwTb.find('.nextButton').on("touchstart click",function(e){ e.stopPropagation(); DisplayNextImagePart1(); });
      G.$E.conVwTb.find('.previousButton').on("touchstart click",function(e){ e.stopPropagation(); DisplayPreviousImage(); });
      G.$E.vwContent.find('.contentAreaNext').on("touchstart click",function(e){ e.stopPropagation(); DisplayNextImagePart1(); });
      G.$E.vwContent.find('.contentAreaPrevious').on("touchstart click",function(e){ e.stopPropagation(); DisplayPreviousImage(); });

      G.$E.vwContent.on("click",function(e){
        if( (new Date().getTime()) - G.timeImgChanged < 400 ) { return; }
        e.preventDefault();
        e.stopPropagation();
        CloseInternalViewer(true);
        return false;
      });

      // makes images unselectable (avoid blue overlay)
      G.$E.conVw.find('.image').attr('draggable', 'false').attr('unselectable', 'on').css({ '-moz-user-select':'none', '-khtml-user-select': 'none', '-webkit-user-select': 'none', '-o-user-select': 'none', 'user-select': 'none'});

      DisplayInternalViewer(imageIdx, '');

      if( G.viewerSwipe == null ) {
        G.viewerSwipe = new ViewerSwipeSupport(G.$E.conVwCon[0]);
      }

      if( G.O.slideshowAutoStart ) {
        G.playSlideshow=true;
        G.$E.conVwTb.find('.playPauseButton').removeClass('playButton').addClass('pauseButton');
        DisplayNextImage();
        G.playSlideshowTimerID=window.setInterval(function(){DisplayNextImage();},G.slideshowDelay);
      }

    };


    function ToolbarAddElt( elt ) {
      var r='',
      e=elt.replace(/^\s+|\s+$/g, '');    // remove trailing/leading whitespace
      switch( e ) {
        case 'minimizeButton':
          r='<div class="ngbt minimizeButton hideToolbarButton nGEvent"></div>';
          break;
        case 'previousButton':
          r='<div class="ngbt previousButton nGEvent"></div>';
          break;
        case 'pageCounter':
          r='<div class="pageCounter nGEvent"></div>';
          break;
        case 'nextButton':
          r='<div class="ngbt nextButton nGEvent"></div>';
          break;
        case 'playPauseButton':
          r='<div class="ngbt playButton playPauseButton nGEvent"></div>';
          break;
        case 'fullscreenButton':
          if( G.supportFullscreenAPI ) {
            r='<div class="ngbt setFullscreenButton fullscreenButton nGEvent"></div>';
          }
          break;
        case 'infoButton':
          if( typeof G.O.fnViewerInfo == 'function' ) {
            r='<div class="ngbt infoButton nGEvent"></div>';
          }
          break;
        case 'linkOriginalButton':
          if( G.O.kind == 'flickr' || G.O.kind == 'picasa' ) {
            r='<div class="ngbt linkOriginalButton nGEvent"></div>';
          }
          break;
        case 'closeButton':
          r='<div class="ngbt closeButton nGEvent"></div>';
          break;
        case 'label':
          r='<div class="label"><div class="title nGEvent" itemprop="name"></div><div class="description nGEvent" itemprop="description"></div></div>';
          break;
        default:
          if( e.indexOf('custom') == 0 ) {
            r='<div class="ngbt ngCustomBtn '+e+' nGEvent">' + (typeof G.O.fnImgToolbarCustInit == 'function' ? G.O.fnImgToolbarCustInit(e) : '') + '</div>';
          }
          break;
      }
      return r;
    }

    // based on "Implement Custom Gestures" from Google
    // https://developers.google.com/web/fundamentals/input/touch-input/touchevents/
    function ViewerSwipeSupport(element) {
      var elementToSwipe=element,
      isAnimating=false,
      initialTouchPos=null,
      lastTouchPos=null,
      currentXPosition=0,
      me=this;



      function handleGestureStart(e) {
        if( !G.containerViewerDisplayed ) { return; }

        G.timeLastTouchStart=new Date().getTime();
        e.preventDefault();

        if(e.touches && e.touches.length > 1) { return; }

        initialTouchPos = getGesturePointFromEvent(e);

        // Add the move and end listeners
        if (window.navigator.msPointerEnabled) {
          // Pointer events are supported.
          document.addEventListener('MSPointerMove', handleGestureMove, true);
          document.addEventListener('MSPointerUp', handleGestureEnd, true);
        } else {
          // Add Touch Listeners
          document.addEventListener('touchmove', handleGestureMove, true);
          document.addEventListener('touchend', handleGestureEnd, true);
          document.addEventListener('touchcancel', handleGestureEnd, true);

          // Add Mouse Listeners
          document.addEventListener('mousemove', handleGestureMove, true);
          document.addEventListener('mouseup', handleGestureEnd, true);
        }
      }

      function handleGestureMove(e) {
        e.preventDefault();

        lastTouchPos = getGesturePointFromEvent(e);

        if(isAnimating) { return; }

        isAnimating = true;

        // window.requestAnimFrame(onAnimFrame);
        window.requestAnimationFrame(onAnimFrame);
      }


      // Handle end gestures
      function handleGestureEnd(e) {
        if( e.cancelable ) { e.preventDefault(); }
        if(e.touches && e.touches.length > 0) { return; }

        isAnimating = false;

        // Remove Event Listeners
        if (window.navigator.msPointerEnabled) {
          // Remove Pointer Event Listeners
          document.removeEventListener('MSPointerMove', handleGestureMove, true);
          document.removeEventListener('MSPointerUp', handleGestureEnd, true);
        } else {
        // Remove Touch Listeners
          document.removeEventListener('touchmove', handleGestureMove, true);
          document.removeEventListener('touchend', handleGestureEnd, true);
          document.removeEventListener('touchcancel', handleGestureEnd, true);

          // Remove Mouse Listeners
          document.removeEventListener('mousemove', handleGestureMove, true);
          document.removeEventListener('mouseup', handleGestureEnd, true);
        }

        updateSwipeRestPosition();
      }

      // function updateSwipeRestPositionOLD(me) {
      function updateSwipeRestPosition() {
        if( lastTouchPos == null ) {      // touchend without touchmove
          currentXPosition=0;
          initialTouchPos=null;
          return;
        }

        var differenceInX = initialTouchPos.x - lastTouchPos.x;
        currentXPosition = currentXPosition - differenceInX;

        if( differenceInX < -50 ) {
          DisplayPreviousImage();
        }
        if( differenceInX > 50 ) {
          DisplayNextImagePart1();
        }
        currentXPosition=0;
        initialTouchPos=null;
        lastTouchPos=null;

        if(Math.abs(differenceInX) < 50) {
          ImageSwipeTranslateX(currentXPosition);
        }
        return;
      }


      function getGesturePointFromEvent(e) {
        var point = {};

        if(e.targetTouches) {
          point.x = e.targetTouches[0].clientX;
          point.y = e.targetTouches[0].clientY;
        } else {
          // Either Mouse event or Pointer Event
          point.x = e.clientX;
          point.y = e.clientY;
        }

        return point;
      }


      function onAnimFrame() {
        if(!isAnimating) { return; }

        var differenceInX = initialTouchPos.x - lastTouchPos.x;

        ImageSwipeTranslateX(currentXPosition - differenceInX);

        isAnimating = false;
      }

      this.removeEventListeners = function() {
        // we need to remove all the event listeners (becauase of an issue with the close button)
        if (window.navigator.msPointerEnabled) {
          elementToSwipe.removeEventListener('MSPointerDown', handleGestureStart, true);
          document.removeEventListener('MSPointerMove', handleGestureMove, true);
          document.removeEventListener('MSPointerUp', handleGestureEnd, true);
        }
        else {
          // Remove Touch Listeners
          elementToSwipe.removeEventListener('touchstart', handleGestureStart, true);
          document.removeEventListener('touchmove', handleGestureMove, true);
          document.removeEventListener('touchend', handleGestureEnd, true);
          document.removeEventListener('touchcancel', handleGestureEnd, true);

          // Remove Mouse Listeners
          document.removeEventListener('mousemove', handleGestureMove, true);
          document.removeEventListener('mouseup', handleGestureEnd, true);
          //elementToSwipe.removeEventListener('mousedown', this.handleGestureStart, true);
        }
      }

      // Check if pointer events are supported.
      if (window.navigator.msPointerEnabled) {
        // Add Pointer Event Listener
        // elementToSwipe.addEventListener('MSPointerDown', this.handleGestureStart, true);
        elementToSwipe.addEventListener('MSPointerDown', handleGestureStart, true);
      }
      else {
        // Add Touch Listener
        // elementToSwipe.addEventListener('touchstart', this.handleGestureStart, true);
        elementToSwipe.addEventListener('touchstart', handleGestureStart, true);

        // Add Mouse Listener
        //elementToSwipe.addEventListener('mousedown', this.handleGestureStart, true);
      }

    }

    function ImageSwipeTranslateX( posX ) {
      G.imageSwipePosX=posX;
      if( G.CSStransformName == null ) {
        G.$E.vwImgC.css({ left: posX });
      }
      else {
        G.$E.vwImgC[0].style[G.CSStransformName]= 'translateX('+posX+'px)';
        if(  G.O.imageTransition == 'slide' ) {
          if( posX > 0 ) {
            var $new=G.$E.vwImgP;
            var dir=getViewport().w;
            G.$E.vwImgP.css({visibility:'visible', left:0, opacity:1});
            G.$E.vwImgP[0].style[G.CSStransformName]= 'translateX('+(-dir+posX)+'px) '
            G.$E.vwImgN[0].style[G.CSStransformName]= 'translateX('+(-dir)+'px) '
          }
          else {
            var $new=G.$E.vwImgN;
            var dir=-getViewport().w;
            G.$E.vwImgN.css({visibility:'visible', left:0, opacity:1});
            G.$E.vwImgN[0].style[G.CSStransformName]= 'translateX('+(-dir+posX)+'px) '
            G.$E.vwImgP[0].style[G.CSStransformName]= 'translateX('+(-dir)+'px) '
          }
        }
      }
    }

    // Toggle viewer fullscreen mode on/off
    function ViewerFullscreenToggle(){
      if( ngscreenfull.enabled ) {
        // ngscreenfull.toggle(G.$E.conVwCon[0]);    // --> issue on scrollbar visibility
        ngscreenfull.toggle();
        if( G.viewerIsFullscreen ) {
          G.viewerIsFullscreen=false;
          G.$E.conVwTb.find('.fullscreenButton').removeClass('removeFullscreenButton').addClass('setFullscreenButton');
        }
        else {
          G.viewerIsFullscreen=true;
          G.$E.conVwTb.find('.fullscreenButton').removeClass('setFullscreenButton').addClass('removeFullscreenButton');
        }
      }
    }


    // toggle slideshow mode on/off
    function SlideshowToggle(){
      if( G.playSlideshow ) {
        window.clearInterval(G.playSlideshowTimerID);
        G.playSlideshow=false;
        G.$E.conVwTb.find('.playPauseButton').removeClass('pauseButton').addClass('playButton');
      }
      else {
        G.playSlideshow=true;
        G.$E.conVwTb.find('.playPauseButton').removeClass('playButton').addClass('pauseButton');
        DisplayNextImage();
        G.playSlideshowTimerID=window.setInterval(function(){DisplayNextImage();},G.slideshowDelay);
      }
    }

    // toggle toolbar visibility
    function ToolbarVisibilityToggle(){
      if( G.toolbarMode == 'std' ) {
        ToolbarVisibilityMin();
      }
      else {
        ToolbarVisibilityStd();
      }
    }

    function ToolbarVisibilityStd() {
      G.toolbarMode='std';
      G.$E.conVwTb.find('.minimizeButton').removeClass('viewToolbarButton').addClass('hideToolbarButton');
      ToolbarSetItemsVisibility('std');
      ResizeInternalViewer();
    }
    function ToolbarVisibilityMin() {
      G.toolbarMode='min';
      G.$E.conVwTb.find('.minimizeButton').removeClass('hideToolbarButton').addClass('viewToolbarButton');
      ToolbarSetItemsVisibility('min');
      ResizeInternalViewer();
    }

    function ToolbarSetItemsVisibility( curMode ) {
      var t=G.O.viewerToolbar;
      var t= ( curMode == 'std' ? G.O.viewerToolbar.standard : G.O.viewerToolbar.minimized);

      // standard elements
      var v=['minimizeButton', 'previousButton', 'pageCounter', 'nextButton', 'playPauseButton', 'fullscreenButton', 'infoButton', 'linkOriginalButton', 'closeButton', 'label'];
      for( var i=0, l=v.length; i<l; i++) {
        if( v[i] == 'label' ) {
          if( G.$E.conVwTb.find('.title').text() == '' && G.$E.conVwTb.find('.description').text() == '' ) {
            G.$E.conVwTb.find('.'+v[i]).css({ display: 'none' });
          }
          else {
            G.$E.conVwTb.find('.'+v[i]).css({ display:( t.indexOf(v[i]) >= 0 ? 'table-cell' : 'none') });
          }
        }
        else {
          G.$E.conVwTb.find('.'+v[i]).css({ display:( t.indexOf(v[i]) >= 0 ? 'table-cell' : 'none') });
        }
      }

      // custom elements
      G.$E.conVwTb.find('.ngCustomBtn').css({ display: 'none' });
      var vC=t.split(',');
      for( var i=0, l=vC.length; i<l; i++) {
        var vCT=vC[i].replace(/^\s+|\s+$/g, '');     // remove trailing/leading whitespace
        if( vCT.indexOf('custom') == 0 ) {
          G.$E.conVwTb.find('.'+vCT).css({ display: 'table-cell' });
        }
      }
    }


    // Display next image
    function DisplayNextImagePart1() {
      if( G.playSlideshow ) {
        window.clearInterval(G.playSlideshowTimerID);
        G.playSlideshowTimerID=window.setInterval(function(){DisplayNextImage();},G.slideshowDelay);
      }
      DisplayNextImage();
    }
    function DisplayNextImage() {
      if( G.viewerImageIsChanged ) { return; }
      if( (new Date().getTime()) - G.timeImgChanged < 300 ) { return; }
      var l=G.I.length;

      var newImageIdx=GetNextImageIdx(G.viewerCurrentItemIdx);
      DisplayInternalViewer(newImageIdx, 'nextImage');
    };

    // Display previous image
    function DisplayPreviousImage() {
      if( G.viewerImageIsChanged ) { return; }
      if( (new Date().getTime()) - G.timeImgChanged < 300 ) { return; }
      if( G.playSlideshow ) {
        SlideshowToggle();
      }

      var newImageIdx=GetPreviousImageIdx(G.viewerCurrentItemIdx);
      DisplayInternalViewer(newImageIdx, 'previousImage');
    };

    // Display image (and run animation)
    function DisplayInternalViewer( imageIdx, displayType ) {
      G.timeImgChanged=new Date().getTime();
      G.viewerImageIsChanged=true;
      var displayNext=true;

      if( G.O.locationHash ) {
        var s ='nanogallery/'+G.baseEltID+'/'+G.I[imageIdx].albumID+"/"+G.I[imageIdx].GetID();
        if( ('#'+s) != location.hash ) {
          G.lastLocationHash='#'+s;
          try {
            top.location.hash=s;
          }
          catch(e) {
            G.O.locationHash=false;
          }
        }
        else {
          try {
            G.lastLocationHash=top.location.hash;
          }
          catch(e) {
            G.O.locationHash=false;
          }
        }
      }

      if( G.O.debugMode && console.timeline ) {
        console.timeline('nanoGALLERYviewer');
      }

      // G.viewerResizeTimerID=window.setInterval( function() { ResizeInternalViewer() }, 100);
      G.viewerResizeTimerID=window.setTimeout( ResizeInternalViewer, 100);

      G.viewerCurrentItemIdx=imageIdx;

      if( displayType == '' ) {
        // first image --> just appear / no slide animation
        G.$E.vwImgC.css({ opacity:0, left:0, visibility: 'visible'}).attr('src',G.emptyGif).attr('src',G.I[imageIdx].responsiveURL());
        // G.$E.vwImgC.css({ opacity:0, left:0, visibility: 'visible', 'background-image':'url('+G.I[imageIdx].responsiveURL()+')'}).attr('src',G.emptyGif);
        var tweenable = new NGTweenable();
        tweenable.tween({
          from: { o: 0  },
          to: { o: 1 },
          attachment: { idx:imageIdx, dT:displayType },
          duration: 400,
          step: function (state, att) {
            G.$E.vwImgC.css({ opacity: state.o });
          },
          finish: function (state, att) {
            G.$E.vwImgC.css({ opacity: 1});
            DisplayInternalViewerComplete(att.idx, att.dT);
          }
        });
      }
      else {
        // animate image change
        switch( G.O.imageTransition ) {
          case 'fade':
            var $new=(displayType == 'nextImage' ? G.$E.vwImgN : G.$E.vwImgP);
            $new.css({ opacity:0, left:0, visibility:'visible'});
            var tweenable = new NGTweenable();
            tweenable.tween({
              from: { o: 0  },
              to: { o: 1 },
              attachment: { idx:imageIdx, dT:displayType, $e:$new },
              duration: 300,
              step: function (state, att) {
                G.$E.vwImgC.css({ opacity: 1-state.o });
                att.$e.css({ opacity: state.o });
              },
              finish: function (state, att) {
                G.$E.vwImgC.css({ opacity: 0 });
                att.$e.css({ opacity: 1 });
                DisplayInternalViewerComplete(att.idx, att.dT);
              }
            });
            break;

          case 'slideBETA':
            var $new=(displayType == 'nextImage' ? G.$E.vwImgN : G.$E.vwImgP);
            $new.css({ opacity:1, left:0, visibility:'visible'});
            if( G.CSStransformName == null ) {
              // animate LEFT
              jQuery.when(
                G.$E.vwImgC.animate({ left: (displayType == 'nextImage' ? -getViewport().w : getViewport().w)+'px', opacity: 0 }, 500),
                $new.animate({ opacity: 1 }, 300)
              ).done(function () {
                DisplayInternalViewerComplete(imageIdx, displayType);
              });
            }
            else {
              // animate TRANSLATEX
              var dir=(displayType == 'nextImage' ? - getViewport().w : getViewport().w);
              $new[0].style[G.CSStransformName]= 'translateX('+(-dir)+'px) '
              var from = {v: G.imageSwipePosX };
              var to = {v: (displayType == 'nextImage' ? - getViewport().w : getViewport().w)};
              jQuery(from).animate(to, { duration:500, step: function(currentValue) {
                  G.$E.vwImgC[0].style[G.CSStransformName]= 'translateX('+currentValue+'px)';
                  G.$E.vwImgC.css({ opacity: (1-Math.abs(currentValue/dir)) });
                  $new[0].style[G.CSStransformName]= 'translateX('+(-dir+currentValue)+'px) '
                }, complete: function() {
                  G.$E.vwImgC[0].style[G.CSStransformName]= '';
                  G.$E.vwImgC.css({ opacity:0 });
                  DisplayInternalViewerComplete(imageIdx, displayType);
                }
              });
            }
            break;

          case 'slideOLD':
            var $new=(displayType == 'nextImage' ? G.$E.vwImgN : G.$E.vwImgP);
            // if( G.CSStransformName == null || ( G.isIOS && G.IOSversion < 6 ) ) {
            if( G.CSStransformName == null  ) {
              // animate LEFT
              $new.css({ opacity:0, left:0, visibility:'visible'});
              jQuery.when(
                G.$E.vwImgC.animate({ left: (displayType == 'nextImage' ? -getViewport().w : getViewport().w)+'px' }, 500),
                $new.animate({ opacity: 1 }, 300)
              ).done(function () {
                DisplayInternalViewerComplete(imageIdx, displayType);
              });
            }
            else {
              // animate using TRANSLATEX
              $new.css({ opacity:1, left:0, visibility:'visible'});
              var dir=(displayType == 'nextImage' ? - getViewport().w : getViewport().w);
              $new[0].style[G.CSStransformName]= 'translateX('+(-dir)+'px) '
              var from = {v: G.imageSwipePosX };
              var to = {v: (displayType == 'nextImage' ? - getViewport().w : getViewport().w)};
              jQuery(from).animate(to, { duration:400, easing:'linear', step: function(currentValue) {
                  window.requestAnimationFrame( function() {
                    G.$E.vwImgC[0].style[G.CSStransformName]= 'translateX('+currentValue+'px)';
                    //G.$E.vwImgC.css({ opacity: (1-Math.abs(currentValue/dir)) });
                    $new[0].style[G.CSStransformName]= 'translateX('+(-dir+currentValue)+'px) '
                  });
                }, complete: function() {
                  window.requestAnimationFrame( function() {
                    G.$E.vwImgC[0].style[G.CSStransformName]= '';
                    //G.$E.vwImgC.css({ opacity:0 });
                    DisplayInternalViewerComplete(imageIdx, displayType);
                  });
                }
              });
            }
            break;

          case 'slide':
            var $new=(displayType == 'nextImage' ? G.$E.vwImgN : G.$E.vwImgP);
            // if( G.CSStransformName == null || ( G.isIOS && G.IOSversion < 6 ) ) {
            if( G.CSStransformName == null  ) {
              // animate LEFT
              $new.css({ opacity:0, left:0, visibility:'visible'});
              jQuery.when(
                G.$E.vwImgC.animate({ left: ((displayType == 'nextImage' ? -getViewport().w : getViewport().w)*2)+'px' }, 500),
                $new.animate({ opacity: 1 }, 300)
              ).done(function () {
                DisplayInternalViewerComplete(imageIdx, displayType);
              });
            }
            else {
              // animate using TRANSLATEX
              var dir=(displayType == 'nextImage' ? - getViewport().w : getViewport().w);
              $new.css({ opacity:1, left:0, visibility:'visible'});
              $new[0].style[G.CSStransformName]= 'translateX('+(-dir)+'px) '
              var tweenable = new NGTweenable();
              tweenable.tween({
                from: { t: G.imageSwipePosX  },
                to: { t: (displayType == 'nextImage' ? - getViewport().w : getViewport().w) },
                attachment: { idx:imageIdx, dT:displayType, $e:$new, dir:dir },
                duration: 300,
                step: function (state, att) {
                  G.$E.vwImgC[0].style[G.CSStransformName]= 'translateX('+state.t+'px)';
                  att.$e[0].style[G.CSStransformName]= 'translateX('+(-att.dir+state.t)+'px) ';
                },
                finish: function (state, att) {
                  G.$E.vwImgC[0].style[G.CSStransformName]= '';
                  att.$e[0].style[G.CSStransformName]= '';
                  DisplayInternalViewerComplete(att.idx, att.dT);
                }
              });
            }
            break;

          case 'slideAppear':
          default:
            var dir= getViewport().w+'px';
            var $new=G.$E.vwImgP;
            if( displayType == 'nextImage' ) {
              dir='-'+dir;
              $new=G.$E.vwImgN;
            }
            $new.css({ opacity:0, left:0, visibility:'visible'});
            jQuery.when(
              G.$E.vwImgC.animate({ left: dir, opacity: 0 }, 500),
              $new.animate({ opacity: 1 }, 300)
            ).done(function () {
              ImageSwipeTranslateX(0);
              DisplayInternalViewerComplete(imageIdx, displayType);
            });
            break;
        }
      }
    }


    function DisplayInternalViewerComplete( imageIdx, displayType ) {
      DisplayInternalViewerToolbar(imageIdx);
      if( G.O.debugMode && console.timeline ) {
        console.timelineEnd('nanoGALLERYviewer');
      }

      if( typeof G.O.fnImgDisplayed === 'function'){
        if( !G.O.fnImgDisplayed(G.I[imageIdx].$elt, G.I[imageIdx]) ) { return; }
      }

      G.imageSwipePosX=0;

      G.$E.vwImgC.off("click");
      G.$E.vwImgC.removeClass('imgCurrent');

      var $tmp=G.$E.vwImgC;
      switch( displayType ) {
        case 'nextImage':
          G.$E.vwImgC=G.$E.vwImgN;
          G.$E.vwImgN=$tmp;
          break;
        case 'previousImage':
          G.$E.vwImgC=G.$E.vwImgP;
          G.$E.vwImgP=$tmp;
          break;
      }
      G.$E.vwImgC.addClass('imgCurrent');

      G.$E.vwImgN.css({ opacity:0, left:0, visibility:'hidden' }).attr('src',G.emptyGif).attr('src',G.I[GetNextImageIdx(imageIdx)].responsiveURL());
      // G.$E.vwImgN.css({ opacity:0, left:0, visibility:'hidden', 'background-image':'url('+G.I[GetNextImageIdx(imageIdx)].responsiveURL()+')' }).attr('src',G.emptyGif);
      G.$E.vwImgP.css({ opacity:0, left:0, visibility:'hidden'}).attr('src',G.emptyGif).attr('src',G.I[GetPreviousImageIdx(imageIdx)].responsiveURL());
      // G.$E.vwImgP.css({ opacity:0, left:0, visibility:'hidden', 'background-image':'url('+G.I[GetPreviousImageIdx(imageIdx)].responsiveURL()+')'}).attr('src',G.emptyGif);

      G.$E.vwImgC.on("click",function(e){
        e.stopPropagation();
        if( e.pageX < (jQuery(window).width()/2) ) {
          DisplayPreviousImage();
        }
        else {
          DisplayNextImagePart1();
        }
      });

      ResizeInternalViewer();

      // TODO: this code does not work
      //jQuery(G.containerViewerContent).item.$getElt('img').on('resize', function(){
      //  ResizeInternalViewer('.imgCurrent');
      //  console.log('resized');
      //});

      G.viewerImageIsChanged=false;
    }

    function GetNextImageIdx( imageIdx ) {
      var l=G.I.length;
      var newImageIdx=-1;

      for(var i=imageIdx+1; i<l; i++ ){
        if( G.I[i].albumID == G.I[imageIdx].albumID && G.I[i].kind == 'image' ) {
          newImageIdx=i;
          break;
        }
      }
      if( newImageIdx == -1 ) {
        for(var i=0; i<=imageIdx; i++ ){
          if( G.I[i].albumID == G.I[imageIdx].albumID && G.I[i].kind == 'image' ) {
            newImageIdx=i;
            break;
          }
        }
      }

      return newImageIdx;
    }

    function GetPreviousImageIdx( imageIdx ) {
      var newImageIdx=-1;
      for(var i=imageIdx-1; i>=0; i-- ){
        if( G.I[i].albumID == G.I[imageIdx].albumID && G.I[i].kind == 'image' ) {
          newImageIdx=i;
          break;
        }
      }
      if( newImageIdx == -1 ) {
        for(var i=G.I.length-1; i>=imageIdx; i-- ){
          if( G.I[i].albumID == G.I[imageIdx].albumID && G.I[i].kind == 'image' ) {
            newImageIdx=i;
            break;
          }
        }
      }

      return newImageIdx;
    }

    function HideInternalViewerToolbar() {
      G.$E.conVwTb.css({'visibility':'hidden'});
    }

    function DisplayInternalViewerToolbar( imageIdx ) {

      if( !G.O.viewerToolbar.display ) { return; }

      G.$E.conVwTb.css({'visibility':'visible'});
      var setTxt=false;
      // set title
      if( G.I[imageIdx].title !== undefined && G.I[imageIdx].title != '' ) {
        G.$E.conVwTb.find('.title').html(G.I[imageIdx].title);
        setTxt=true;
      }
      else {
        G.$E.conVwTb.find('.title').html('');
      }
      // set description
      if( G.I[imageIdx].description !== undefined && G.I[imageIdx].description != '' ) {
        G.$E.conVwTb.find('.description').html(G.I[imageIdx].description);
        setTxt=true;
      }
      else {
        G.$E.conVwTb.find('.description').html('');
      }

      // custom elements
      var $cu=G.$E.conVwTb.find('.ngCustomBtn');
      if( $cu.length > 0 && typeof G.O.fnImgToolbarCustDisplay == 'function' ) {
        G.O.fnImgToolbarCustDisplay( $cu, G.I[imageIdx], ExposedObjects());
      }

      // if( setTxt && (G.O.viewerToolbar.label == 'always' || G.O.viewerToolbar.label == G.toolbarMode) ) {
      if( setTxt && (G.toolbarMode == 'std' ? G.O.viewerToolbar.standard : G.O.viewerToolbar.minimized).indexOf('label') >= 0 ) {
        G.$E.conVwTb.find('.label').show();
      }
      else {
        G.$E.conVwTb.find('.label').hide();
      }

      // set page number
      var viewerMaxImages= galleryCountImages();
      if( viewerMaxImages > 0 ) {
        G.$E.conVwTb.find('.pageCounter').html((G.I[imageIdx].imageNumber+1)+'/'+viewerMaxImages);
      }

      //ResizeInternalViewer();
    }

    function CloseInternalViewer( setLocationHash ) {

      if( G.viewerImageIsChanged ) {
        G.$E.vwContent.find('*').stop(true,true);
        //return;
      }
      G.viewerImageIsChanged=false;

      if( G.containerViewerDisplayed ) {

        // window.clearInterval(G.viewerResizeTimerID);
        window.clearTimeout(G.viewerResizeTimerID);

        if( G.playSlideshow ) {
          window.clearInterval(G.playSlideshowTimerID);
          G.playSlideshow=false;
        }

        G.viewerSwipe.removeEventListeners();
        G.viewerSwipe=null;

        if( !(G.O.galleryFullpageButton && G.$E.base.hasClass('fullpage')) ) {      // avoid displaying scrollbar when gallery is in fullpage mode
          ScrollbarSetVisible();
        }

        if( G.viewerIsFullscreen ) {
          G.viewerIsFullscreen=false;
          ngscreenfull.exit();
        }

        G.$E.conVwCon.hide(0).off().show(0).html('').remove();

        G.containerViewerDisplayed=false;
        if( G.albumIdxToOpenOnViewerClose != -1 ) {
          DisplayAlbum(G.albumIdxToOpenOnViewerClose,true);
        }
        else {
          if( G.O.locationHash && setLocationHash ) {
            var albumID=G.I[G.viewerCurrentItemIdx].albumID,
            s='nanogallery/'+G.baseEltID+'/'+albumID;
            G.lastLocationHash='#'+s;
            try {
              top.location.hash=s;
            }
            catch(e) {
              G.O.locationHash=false;
            }
          }
          ThumbnailHoverOutAll();
        }
        G.timeImgChanged=new Date().getTime();
      }
    };


    function ResizeInternalViewer() {

      if( !G.containerViewerDisplayed ) { return; }

      if( (new Date().getTime()) - G.viewerResizeTimerLastRun < 100 ) { return; }


      //window.clearInterval(G.viewerResizeTimerID);
      //G.viewerResizeTimerID=window.setInterval(function(){ResizeInternalViewer()},200);

      window.requestAnimationFrame( function() {
        var windowsW=G.$E.conVw.width();
        var windowsH=G.$E.conVw.height();

        var $elt=G.$E.vwImgC,
        vwImgC_H=$elt.height(),
        vwImgC_W=$elt.width(),
        vwImgC_OHt=$elt.outerHeight(true),
        vwImgC_OHf=$elt.outerHeight(false);

        var $tb=G.$E.conVwTb.find('.toolbar'),
        tb_OHt=$tb.outerHeight(true);

        if( vwImgC_H <= 40 || !G.O.viewerToolbar.display ) {
          G.$E.conVwTb.css({visibility:'hidden'});
        }
        else {
          G.$E.conVwTb.css({visibility:'visible'});
        }

        var contentOuterWidthV=Math.abs(G.$E.vwContent.outerHeight(true)-G.$E.vwContent.height()),  // vertical margin+border+padding
        contentOuterWidthH=Math.abs(G.$E.vwContent.outerWidth(true)-G.$E.vwContent.width()),  // horizontal margin+border+padding
        imgBorderV=vwImgC_OHf-$elt.innerHeight(),
        imgBorderH=Math.abs($elt.outerWidth(false)-$elt.innerWidth()),
        imgPaddingV=Math.abs($elt.innerHeight()-vwImgC_H),
        imgPaddingH=Math.abs($elt.innerWidth()-vwImgC_W),
        tV=imgBorderV+imgPaddingV,  //+tmargin;
        tH=imgBorderH+imgPaddingH,  //+tmargin;
        toolbarH=0;
        if( G.O.viewerToolbar.style != 'innerImage' ) {
          toolbarH=tb_OHt;
        }
        var h=windowsH-toolbarH-contentOuterWidthV,
        w=windowsW-contentOuterWidthH;

        switch( G.O.viewerToolbar.position ) {
          case 'top':
            G.$E.vwContent.css({height:h, width:w, top:toolbarH  });
            var posY=0;
            if( G.O.viewerToolbar.style == 'innerImage' ) {
              posY= Math.abs(vwImgC_OHt-vwImgC_H)/2 +5;
            }
            if( G.O.viewerToolbar.style == 'stuckImage' ) {
              posY= Math.abs(vwImgC_OHt-vwImgC_H)/2 -tV;
            }
            G.$E.conVwTb.css({top: posY});
            break;

          case 'bottom':
          default:
            G.$E.vwContent.css({height:h, width:w });
            var posY=0;
            if( G.O.viewerToolbar.style == 'innerImage' ) {
              posY= Math.abs(vwImgC_OHt-vwImgC_H)/2 +5;//- G.$E.conVwTb.outerHeight(true) ;
            }
            if( G.O.viewerToolbar.style == 'stuckImage' ) {
              posY= Math.abs(vwImgC_OHt-vwImgC_H)/2 -tV;
            }
            G.$E.conVwTb.css({bottom: posY});
            break;
        }

        if( G.O.viewerToolbar.style == 'innerImage' ) {
          $tb.css({'max-width': vwImgC_W});
        }

        if( G.O.viewerToolbar.style == 'fullWidth' ) {
          $tb.css({width: w});
        }

        G.$E.conVwTb.css({ height: tb_OHt });   // resize toolbar container to toolbar size
        
        
        G.$E.vwContent.children('img').css({'max-width':(w-tH), 'max-height':(h-tV) });
        // G.$E.vwContent.children('img').css({'width':'100%', 'height':'100%' });
        // G.$E.vwContent.children('img').css({'background-size':'contain', 'background-position':'center', 'background-repeat':'no-repeat' });
        G.$E.vwContent.children('img').css({'object-fit':'contain' });

        G.viewerResizeTimerID=window.setTimeout( ResizeInternalViewer, 100);
        G.viewerResizeTimerLastRun=new Date().getTime();

      });
    }



    function OpenImageCustomViewer( imageIdx ) {
      var n=imageIdx,
      items=[],
      current=0;

      items.push(G.I[n]);

      var l=G.I.length;
      for( var j=n+1; j<l ; j++) {
        if( G.I[j].kind == 'image' && G.I[j].albumID == G.I[imageIdx].albumID && G.I[j].destinationURL == '' ) {
          current++;
          items.push(G.I[j]);
        }
      }
      for( var j=0; j<n; j++) {
        if( G.I[j].kind == 'image' && G.I[j].albumID == G.I[imageIdx].albumID && G.I[j].destinationURL == '' ) {
          current++;
          items.push(G.I[j]);
        }
      }
      G.O.fnThumbnailOpen(items);
    }


    function OpenFancyBox( imageIdx ) {
      var n=imageIdx,
      lstImages=[],
      current=0;

      lstImages[current]=new Object;
      lstImages[current].href=G.I[n].responsiveURL();
      lstImages[current].title=G.I[n].title;

      var l=G.I.length;
      for( var j=n+1; j<l ; j++) {
        if( G.I[j].kind == 'image' && G.I[j].albumID == G.I[imageIdx].albumID && G.I[j].destinationURL == '' ) {
          current++;
          lstImages[current]=new Object;
          lstImages[current].href=G.I[j].responsiveURL();
          lstImages[current].title=G.I[j].title;
        }
      }
      for( var j=0; j<n; j++) {
        if( G.I[j].kind == 'image' && G.I[j].albumID == G.I[imageIdx].albumID && G.I[j].destinationURL == '' ) {
          current++;
          lstImages[current]=new Object;
          lstImages[current].href=G.I[j].responsiveURL();
          lstImages[current].title=G.I[j].title;
        }
      }
      if( G.O.fancyBoxOptions != null ) {
        jQuery.fancybox(lstImages, G.O.fancyBoxOptions);
      }
      else {
        jQuery.fancybox(lstImages,{'autoPlay':false, 'nextEffect':'fade', 'prevEffect':'fade','scrolling':'no',
          helpers    : {  buttons  : { 'position' : 'bottom'} }
        });
      }
    };

    // ##### BREADCRUMB/THUMBNAIL COLOR SCHEME #####
    function SetColorScheme( element ) {
      var cs=null;
      switch(toType(G.O.colorScheme)) {
        case 'object':    // user custom color scheme object
          cs=G.colorScheme_default;
          jQuery.extend(true,cs,G.O.colorScheme);
          G.colorSchemeLabel='nanogallery_colorscheme_custom_'+G.baseEltID;
          break;
        case 'string':    // name of an internal defined color scheme
          switch( G.O.colorScheme ) {
            case 'none':
              return;
              break;
            case 'light':
              cs=G.colorScheme_light;
              G.colorSchemeLabel='nanogallery_colorscheme_light';
              break;
            case 'lightBackground':
              cs=G.colorScheme_lightBackground;
              G.colorSchemeLabel='nanogallery_colorscheme_lightBackground';
              break;
            case 'darkRed':
              cs=G.colorScheme_darkRed;
              G.colorSchemeLabel='nanogallery_colorscheme_darkred';
              break;
            case 'darkGreen':
              cs=G.colorScheme_darkGreen;
              G.colorSchemeLabel='nanogallery_colorscheme_darkgreen';
              break;
            case 'darkBlue':
              cs=G.colorScheme_darkBlue;
              G.colorSchemeLabel='nanogallery_colorscheme_darkblue';
              break;
            case 'darkOrange':
              cs=G.colorScheme_darkOrange;
              G.colorSchemeLabel='nanogallery_colorscheme_darkorange';
              break;
            case 'default':
            case 'dark':
            default:
              cs=G.colorScheme_default;
              G.colorSchemeLabel='nanogallery_colorscheme_default';
          }
          break;
        default:
          nanoAlert('Error in colorScheme parameter.');
          return;
      }




      //var s1='.nanogallery_theme_'+G.O.theme+' ';
      var s1='.' + G.colorSchemeLabel + ' ';
      var s=s1+'.nanoGalleryNavigationbar { background:'+cs.navigationbar.background+' !important; }'+'\n';
      if( cs.navigationbar.border !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border:'+cs.navigationbar.border+' !important; }'+'\n'; }
      if( cs.navigationbar.borderTop !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-top:'+cs.navigationbar.borderTop+' !important; }'+'\n'; }
      if( cs.navigationbar.borderBottom !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-bottom:'+cs.navigationbar.borderBottom+' !important; }'+'\n'; }
      if( cs.navigationbar.borderRight !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-right:'+cs.navigationbar.borderRight+' !important; }'+'\n'; }
      if( cs.navigationbar.borderLeft !== undefined ) { s+=s1+'.nanoGalleryNavigationbar { border-left:'+cs.navigationbar.borderLeft+' !important; }'+'\n'; }
      s+=s1+'.nanoGalleryNavigationbar .oneFolder  { color:'+cs.navigationbar.color+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .separator  { color:'+cs.navigationbar.color+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .separatorRTL  { color:'+cs.navigationbar.color+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .nanoGalleryTags { color:'+cs.navigationbar.color+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .setFullPageButton { color:'+cs.navigationbar.color+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .removeFullPageButton { color:'+cs.navigationbar.color+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .oneFolder:hover { color:'+cs.navigationbar.colorHover+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .separatorRTL:hover { color:'+cs.navigationbar.colorHover+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .nanoGalleryTags:hover { color:'+cs.navigationbar.colorHover+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .setFullPageButton:hover { color:'+cs.navigationbar.colorHover+' !important; }'+'\n';
      s+=s1+'.nanoGalleryNavigationbar .removeFullPageButton:hover { color:'+cs.navigationbar.colorHover+' !important; }'+'\n';

      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer { background:'+cs.thumbnail.background+' !important; border:'+cs.thumbnail.border+' !important; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .imgContainer { background:'+cs.thumbnail.background+' !important; }'+'\n';
      // s+=s1+'.nanoGalleryContainer .nanoGalleryThumbnailContainer .labelImage { background:'+cs.thumbnail.labelBackground+' !important; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelImage{ background:'+cs.thumbnail.labelBackground+' ; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelImageTitle  { color:'+cs.thumbnail.titleColor+' !important; Text-Shadow:'+cs.thumbnail.titleShadow+' !important; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelImageTitle:before { color:'+cs.thumbnail.titleColor+' !important; Text-Shadow:'+cs.thumbnail.titleShadow+' !important; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelFolderTitle { color:'+cs.thumbnail.titleColor+' !important; Text-Shadow:'+cs.thumbnail.titleShadow+' !important; }'+'\n';
      var c=cs.thumbnail.labelBackground;
      if( c == 'transparent' ) { c=''; }
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelFolderTitle > span { background-color:'+cs.thumbnail.titleColor+' !important; color:'+c+' !important; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelFolderTitle:before { color:'+cs.thumbnail.titleColor+' !important; Text-Shadow:'+cs.thumbnail.titleShadow+' !important; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelDescription { color:'+cs.thumbnail.descriptionColor+' !important; Text-Shadow:'+cs.thumbnail.descriptionShadow+' !important; }'+'\n';
      s+=s1+'.nanoGalleryContainer > .nanoGalleryThumbnailContainer .labelDescription > span { background-color:'+cs.thumbnail.titleColor+' !important; color:'+c+' !important; }'+'\n';
      // s+='.' + G.colorSchemeLabel +'.fullpage { background:'+G.O.galleryFullpageBgColor+' !important; }'+'\n';

      // pagination dot based
      if( G.O.paginationDots ) {
        s+=s1+'.nanoGalleryPaginationDot > .paginationItem { border:'+cs.thumbnail.paginationDotBorder+' !important; background:'+cs.thumbnail.paginationDotBack+' !important;}'+'\n';
        s+=s1+'.nanoGalleryPaginationDot > .currentPage { background:'+cs.thumbnail.paginationDotSelBack+' !important;}'+'\n';
      }

      // gallery fullpage background color
      var gbg='nanogallery_galleryfullpage_bgcolor_'+G.baseEltID;
      s+='.' + gbg +'.fullpage { background:'+G.O.galleryFullpageBgColor+' !important; }'+'\n';

      jQuery('head').append('<style>'+s+'</style>');
      jQuery(element).addClass(G.colorSchemeLabel);
      jQuery(element).addClass(gbg);

    };

    // ##### VIEWER COLOR SCHEME #####
    function SetColorSchemeViewer( element ) {

      var cs=null;
      switch(toType(G.O.colorSchemeViewer)) {
        case 'object':    // user custom color scheme object
          cs=G.colorSchemeViewer_default;
          jQuery.extend(true,cs,G.O.colorSchemeViewer);
          G.colorSchemeLabel='nanogallery_colorschemeviewer_custom';
          break;
        case 'string':    // name of an internal defined color scheme
          switch( G.O.colorSchemeViewer ) {
            case 'none':
              return;
              break;
            case 'light':
              cs=G.colorSchemeViewer_light;
              G.colorSchemeLabel='nanogallery_colorschemeviewer_light';
              break;
            case 'darkRed':
              cs=G.colorSchemeViewer_darkRed;
              G.colorSchemeLabel='nanogallery_colorschemeviewer_darkred';
              break;
            case 'darkGreen':
              cs=G.colorSchemeViewer_darkGreen;
              G.colorSchemeLabel='nanogallery_colorschemeviewer_darkgreen';
              break;
            case 'darkBlue':
              cs=G.colorSchemeViewer_darkBlue;
              G.colorSchemeLabel='nanogallery_colorschemeviewer_darkblue';
              break;
            case 'darkOrange':
              cs=G.colorSchemeViewer_darkOrange;
              G.colorSchemeLabel='nanogallery_colorschemeviewer_darkorange';
              break;
            case 'dark':
              cs=G.colorSchemeViewer_dark;
              G.colorSchemeLabel='nanogallery_colorschemeviewer_dark';
              break;
            case 'default':
            default:
              cs=G.colorSchemeViewer_default;
              G.colorSchemeLabel='nanogallery_colorschemeviewer_default';
          }
          break;
        default:
          nanoAlert('Error in colorSchemeViewer parameter.');
          return;
      }


      //var s1='.nanogallery_theme_'+G.O.theme+' ';
      var s1='.' + G.colorSchemeLabel + ' ';
      var s=s1+'.nanoGalleryViewer { background:'+cs.background+' !important; }'+'\n';
      //s+=s1+'.nanoGalleryViewer { background:'+cs.viewer.background+'; color:'+cs.viewer.color+'; }'+'\n';
      s+=s1+'.nanoGalleryViewer .content img { border:'+cs.imageBorder+' !important; box-shadow:'+cs.imageBoxShadow+' !important; }'+'\n';
      s+=s1+'.nanoGalleryViewer .toolbar { background:'+cs.barBackground+' !important; border:'+cs.barBorder+' !important; color:'+cs.barColor+' !important; }'+'\n';
      s+=s1+'.nanoGalleryViewer .toolbar .previousButton:after { color:'+cs.barColor+' !important; }'+'\n';
      s+=s1+'.nanoGalleryViewer .toolbar .nextButton:after { color:'+cs.barColor+' !important; }'+'\n';
      s+=s1+'.nanoGalleryViewer .toolbar .closeButton:after { color:'+cs.barColor+' !important; }'+'\n';
      //s+=s1+'.nanoGalleryViewer .toolbar .label { background:'+cs.barBackground+'; }'+'\n';
      s+=s1+'.nanoGalleryViewer .toolbar .label .title { color:'+cs.barColor+' !important; }'+'\n';
      s+=s1+'.nanoGalleryViewer .toolbar .label .description { color:'+cs.barDescriptionColor+' !important; }'+'\n';
      jQuery('head').append('<style>'+s+'</style>');
      jQuery(element).addClass(G.colorSchemeLabel);
    };



    // #################
    // ##### TOOLS #####
    // #################

    // Display a message
    function nanoAlert( msg, verbose ) {
      nanoConsoleLog(msg);
      if( G.$E.conConsole != null ) {
        G.$E.conConsole.css({visibility:'visible', height:'auto'});
        if( verbose == false ) {
          G.$E.conConsole.append('<p>'+ msg + '</p>');
        }
        else {
          G.$E.conConsole.append('<p>nanoGALLERY: '+msg+ ' ['+G.baseEltID+']</p>');
        }
        //alert('nanoGALLERY: ' + msg);
      }
    };

    // write to console log
    function nanoConsoleLog( msg ) {
      if (window.console) { console.log('nanoGALLERY: ' + msg + ' ['+G.baseEltID+']'); }
    };

    // get viewport coordinates and size
    function getViewport() {
      var $win = jQuery(window);

      // to simulate smaller device screen width
      vpW=$win.width();
      if( G.O.demoViewportWidth > 0 ) {
        if( G.O.demoViewportWidth < vpW) {
          vpW=G.O.demoViewportWidth;
        }
        G.O.maxWidth=vpW;
        jQuery(G.$E.base).css({'width':G.O.maxWidth});
        jQuery(G.$E.base).css({'margin-left':'auto'});
        jQuery(G.$E.base).css({'margin-right':'auto'});
      }


      return {
        l: $win.scrollLeft(),
        t: $win.scrollTop(),
        w: vpW,
        h: $win.height()
      }
    }


    function inViewport( $elt, threshold ) {
      var wp=getViewport(),
      eltOS=$elt.offset(),
      th=$elt.outerHeight(true),
      tw=$elt.outerWidth(true);
      if( eltOS.top >= (wp.t-threshold)
        && (eltOS.top+th) <= (wp.t+wp.h+threshold)
        && eltOS.left >= (wp.l-threshold)
        && (eltOS.left+tw) <= (wp.l+wp.w+threshold) ) {
        return true;
      }
      else {
        return false;
      }
    }

    function inViewportVert( $elt, threshold ) {
      var wp=getViewport(),
      eltOS=$elt.offset(),
      th=$elt.outerHeight(true),
      tw=$elt.outerWidth(true);

      if( wp.t == 0 && (eltOS.top) <= (wp.t+wp.h ) ) { return true; }

      if( eltOS.top >= (wp.t)
        && (eltOS.top+th) <= (wp.t+wp.h-threshold) ) {
          return true;
      }
      else {
        return false;
      }
    }


    // set z-index to display element on top of all others
    function setElementOnTop( start, elt ) {
      var highest_index = 0;
      if( start=='' ) { start= '*'; }
      jQuery(start).each(function() {
        var cur = parseInt(jQuery(this).css('z-index'));
        highest_index = cur > highest_index ? cur : highest_index;
      });
      highest_index++;
      jQuery(elt).css('z-index',highest_index);
    };

    // set z-index to display 2 elements on top of all others
    function set2ElementsOnTop( start, elt1, elt2 ) {
      var highest_index = 0;
      if( start=='' ) { start= '*'; }
      jQuery(start).each(function() {
        var cur = parseInt(jQuery(this).css('z-index'));
        highest_index = cur > highest_index ? cur : highest_index;
      });
      highest_index++;
      jQuery(elt2).css('z-index',highest_index+1);
      jQuery(elt1).css('z-index',highest_index);
    };


    // return the real type of the object
    var toType = function( obj ) {
      // by Angus Croll - http://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
      return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
    };


    // return true if current jQuery version match the minimum required
    function jQueryMinVersion( version ) {
      var $vrs = window.jQuery.fn.jquery.split('.'),
      min = version.split('.');
      for (var i=0, len=$vrs.length; i<len; i++) {
        if (min[i] && (+$vrs[i]) < (+min[i])) {
          return false;
        }
      }
      return true;
    };


    //+ Jonas Raoni Soares Silva
    //@ http://jsfromhell.com/array/shuffle [v1.0]
    function AreaShuffle(o){ //v1.0
        for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
    };


    // color lighter or darker
    // found on http://stackoverflow.com/questions/1507931/generate-lighter-darker-color-in-css-using-javascript/5747818#5747818
    // Ratio is between 0 and 1
    var changeColor = function( color, ratio, darker ) {
      // Trim trailing/leading whitespace
      color = color.replace(/^\s*|\s*$/, '');

      // Expand three-digit hex
      color = color.replace(
        /^#?([a-f0-9])([a-f0-9])([a-f0-9])$/i,
        '#$1$1$2$2$3$3'
      );

      // Calculate ratio
      var difference = Math.round(ratio * 256) * (darker ? -1 : 1),
        // Determine if input is RGB(A)
        rgb = color.match(new RegExp('^rgba?\\(\\s*' +
          '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
          '\\s*,\\s*' +
          '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
          '\\s*,\\s*' +
          '(\\d|[1-9]\\d|1\\d{2}|2[0-4][0-9]|25[0-5])' +
          '(?:\\s*,\\s*' +
          '(0|1|0?\\.\\d+))?' +
          '\\s*\\)$'
        , 'i')),
        alpha = !!rgb && rgb[4] != null ? rgb[4] : null,

        // Convert hex to decimal
        decimal = !!rgb? [rgb[1], rgb[2], rgb[3]] : color.replace(
          /^#?([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])([a-f0-9][a-f0-9])/i,
          function() {
            return parseInt(arguments[1], 16) + ',' +
              parseInt(arguments[2], 16) + ',' +
              parseInt(arguments[3], 16);
          }
        ).split(/,/),
        returnValue;

      // Return RGB(A)
      return !!rgb ?
        'rgb' + (alpha !== null ? 'a' : '') + '(' +
          Math[darker ? 'max' : 'min'](
            parseInt(decimal[0], 10) + difference, darker ? 0 : 255
          ) + ', ' +
          Math[darker ? 'max' : 'min'](
            parseInt(decimal[1], 10) + difference, darker ? 0 : 255
          ) + ', ' +
          Math[darker ? 'max' : 'min'](
            parseInt(decimal[2], 10) + difference, darker ? 0 : 255
          ) +
          (alpha !== null ? ', ' + alpha : '') +
          ')' :
        // Return hex
        [
          '#',
          pad(Math[darker ? 'max' : 'min'](
            parseInt(decimal[0], 10) + difference, darker ? 0 : 255
          ).toString(16), 2),
          pad(Math[darker ? 'max' : 'min'](
            parseInt(decimal[1], 10) + difference, darker ? 0 : 255
          ).toString(16), 2),
          pad(Math[darker ? 'max' : 'min'](
            parseInt(decimal[2], 10) + difference, darker ? 0 : 255
          ).toString(16), 2)
        ].join('');
    };
    var lighterColor = function(color, ratio) {
      return changeColor(color, ratio, false);
    };
    var darkerColor = function(color, ratio) {
      return changeColor(color, ratio, true);
    };
    var pad = function(num, totalChars) {
      var pad = '0';
      num = num + '';
      while (num.length < totalChars) {
        num = pad + num;
      }
      return num;
    };

  }

// END NANOGALLERY
//}( jQuery ));
});

// ##########################################
// #####        END NANOGALLERY         #####
// ##########################################










/*!
 * jQuery Color Animations v2.1.2
 * https://github.com/jquery/jquery-color
 *
 * Copyright 2013 jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 *
 * Date: Wed Jan 16 08:47:09 2013 -0600
 */
(function( jQuery, undefined ) {

  var stepHooks = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor",

  // plusequals test for += 100 -= 100
  rplusequals = /^([\-+])=\s*(\d+\.?\d*)/,
  // a set of RE's that can match strings and generate color tuples.
  stringParsers = [{
      re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
      parse: function( execResult ) {
        return [
          execResult[ 1 ],
          execResult[ 2 ],
          execResult[ 3 ],
          execResult[ 4 ]
        ];
      }
    }, {
      re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
      parse: function( execResult ) {
        return [
          execResult[ 1 ] * 2.55,
          execResult[ 2 ] * 2.55,
          execResult[ 3 ] * 2.55,
          execResult[ 4 ]
        ];
      }
    }, {
      // this regex ignores A-F because it's compared against an already lowercased string
      re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
      parse: function( execResult ) {
        return [
          parseInt( execResult[ 1 ], 16 ),
          parseInt( execResult[ 2 ], 16 ),
          parseInt( execResult[ 3 ], 16 )
        ];
      }
    }, {
      // this regex ignores A-F because it's compared against an already lowercased string
      re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
      parse: function( execResult ) {
        return [
          parseInt( execResult[ 1 ] + execResult[ 1 ], 16 ),
          parseInt( execResult[ 2 ] + execResult[ 2 ], 16 ),
          parseInt( execResult[ 3 ] + execResult[ 3 ], 16 )
        ];
      }
    }, {
      re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
      space: "hsla",
      parse: function( execResult ) {
        return [
          execResult[ 1 ],
          execResult[ 2 ] / 100,
          execResult[ 3 ] / 100,
          execResult[ 4 ]
        ];
      }
    }],

  // jQuery.Color( )
  color = jQuery.Color = function( color, green, blue, alpha ) {
    return new jQuery.Color.fn.parse( color, green, blue, alpha );
  },
  spaces = {
    rgba: {
      props: {
        red: {
          idx: 0,
          type: "byte"
        },
        green: {
          idx: 1,
          type: "byte"
        },
        blue: {
          idx: 2,
          type: "byte"
        }
      }
    },

    hsla: {
      props: {
        hue: {
          idx: 0,
          type: "degrees"
        },
        saturation: {
          idx: 1,
          type: "percent"
        },
        lightness: {
          idx: 2,
          type: "percent"
        }
      }
    }
  },
  propTypes = {
    "byte": {
      floor: true,
      max: 255
    },
    "percent": {
      max: 1
    },
    "degrees": {
      mod: 360,
      floor: true
    }
  },
  support = color.support = {},

  // element for support tests
  supportElem = jQuery( "<p>" )[ 0 ],

  // colors = jQuery.Color.names
  colors,

  // local aliases of functions called often
  each = jQuery.each;

// determine rgba support immediately
supportElem.style.cssText = "background-color:rgba(1,1,1,.5)";
support.rgba = supportElem.style.backgroundColor.indexOf( "rgba" ) > -1;

// define cache name and alpha properties
// for rgba and hsla spaces
each( spaces, function( spaceName, space ) {
  space.cache = "_" + spaceName;
  space.props.alpha = {
    idx: 3,
    type: "percent",
    def: 1
  };
});

function clamp( value, prop, allowEmpty ) {
  var type = propTypes[ prop.type ] || {};

  if ( value == null ) {
    return (allowEmpty || !prop.def) ? null : prop.def;
  }

  // ~~ is an short way of doing floor for positive numbers
  value = type.floor ? ~~value : parseFloat( value );

  // IE will pass in empty strings as value for alpha,
  // which will hit this case
  if ( isNaN( value ) ) {
    return prop.def;
  }

  if ( type.mod ) {
    // we add mod before modding to make sure that negatives values
    // get converted properly: -10 -> 350
    return (value + type.mod) % type.mod;
  }

  // for now all property types without mod have min and max
  return 0 > value ? 0 : type.max < value ? type.max : value;
}

function stringParse( string ) {
  var inst = color(),
    rgba = inst._rgba = [];

  string = string.toLowerCase();

  each( stringParsers, function( i, parser ) {
    var parsed,
      match = parser.re.exec( string ),
      values = match && parser.parse( match ),
      spaceName = parser.space || "rgba";

    if ( values ) {
      parsed = inst[ spaceName ]( values );

      // if this was an rgba parse the assignment might happen twice
      // oh well....
      inst[ spaces[ spaceName ].cache ] = parsed[ spaces[ spaceName ].cache ];
      rgba = inst._rgba = parsed._rgba;

      // exit each( stringParsers ) here because we matched
      return false;
    }
  });

  // Found a stringParser that handled it
  if ( rgba.length ) {

    // if this came from a parsed string, force "transparent" when alpha is 0
    // chrome, (and maybe others) return "transparent" as rgba(0,0,0,0)
    if ( rgba.join() === "0,0,0,0" ) {
      jQuery.extend( rgba, colors.transparent );
    }
    return inst;
  }

  // named colors
  return colors[ string ];
}

color.fn = jQuery.extend( color.prototype, {
  parse: function( red, green, blue, alpha ) {
    if ( red === undefined ) {
      this._rgba = [ null, null, null, null ];
      return this;
    }
    if ( red.jquery || red.nodeType ) {
      red = jQuery( red ).css( green );
      green = undefined;
    }

    var inst = this,
      type = jQuery.type( red ),
      rgba = this._rgba = [];

    // more than 1 argument specified - assume ( red, green, blue, alpha )
    if ( green !== undefined ) {
      red = [ red, green, blue, alpha ];
      type = "array";
    }

    if ( type === "string" ) {
      return this.parse( stringParse( red ) || colors._default );
    }

    if ( type === "array" ) {
      each( spaces.rgba.props, function( key, prop ) {
        rgba[ prop.idx ] = clamp( red[ prop.idx ], prop );
      });
      return this;
    }

    if ( type === "object" ) {
      if ( red instanceof color ) {
        each( spaces, function( spaceName, space ) {
          if ( red[ space.cache ] ) {
            inst[ space.cache ] = red[ space.cache ].slice();
          }
        });
      } else {
        each( spaces, function( spaceName, space ) {
          var cache = space.cache;
          each( space.props, function( key, prop ) {

            // if the cache doesn't exist, and we know how to convert
            if ( !inst[ cache ] && space.to ) {

              // if the value was null, we don't need to copy it
              // if the key was alpha, we don't need to copy it either
              if ( key === "alpha" || red[ key ] == null ) {
                return;
              }
              inst[ cache ] = space.to( inst._rgba );
            }

            // this is the only case where we allow nulls for ALL properties.
            // call clamp with alwaysAllowEmpty
            inst[ cache ][ prop.idx ] = clamp( red[ key ], prop, true );
          });

          // everything defined but alpha?
          if ( inst[ cache ] && jQuery.inArray( null, inst[ cache ].slice( 0, 3 ) ) < 0 ) {
            // use the default of 1
            inst[ cache ][ 3 ] = 1;
            if ( space.from ) {
              inst._rgba = space.from( inst[ cache ] );
            }
          }
        });
      }
      return this;
    }
  },
  is: function( compare ) {
    var is = color( compare ),
      same = true,
      inst = this;

    each( spaces, function( _, space ) {
      var localCache,
        isCache = is[ space.cache ];
      if (isCache) {
        localCache = inst[ space.cache ] || space.to && space.to( inst._rgba ) || [];
        each( space.props, function( _, prop ) {
          if ( isCache[ prop.idx ] != null ) {
            same = ( isCache[ prop.idx ] === localCache[ prop.idx ] );
            return same;
          }
        });
      }
      return same;
    });
    return same;
  },
  _space: function() {
    var used = [],
      inst = this;
    each( spaces, function( spaceName, space ) {
      if ( inst[ space.cache ] ) {
        used.push( spaceName );
      }
    });
    return used.pop();
  },
  transition: function( other, distance ) {
    var end = color( other ),
      spaceName = end._space(),
      space = spaces[ spaceName ],
      startColor = this.alpha() === 0 ? color( "transparent" ) : this,
      start = startColor[ space.cache ] || space.to( startColor._rgba ),
      result = start.slice();

    end = end[ space.cache ];
    each( space.props, function( key, prop ) {
      var index = prop.idx,
        startValue = start[ index ],
        endValue = end[ index ],
        type = propTypes[ prop.type ] || {};

      // if null, don't override start value
      if ( endValue === null ) {
        return;
      }
      // if null - use end
      if ( startValue === null ) {
        result[ index ] = endValue;
      } else {
        if ( type.mod ) {
          if ( endValue - startValue > type.mod / 2 ) {
            startValue += type.mod;
          } else if ( startValue - endValue > type.mod / 2 ) {
            startValue -= type.mod;
          }
        }
        result[ index ] = clamp( ( endValue - startValue ) * distance + startValue, prop );
      }
    });
    return this[ spaceName ]( result );
  },
  blend: function( opaque ) {
    // if we are already opaque - return ourself
    if ( this._rgba[ 3 ] === 1 ) {
      return this;
    }

    var rgb = this._rgba.slice(),
      a = rgb.pop(),
      blend = color( opaque )._rgba;

    return color( jQuery.map( rgb, function( v, i ) {
      return ( 1 - a ) * blend[ i ] + a * v;
    }));
  },
  toRgbaString: function() {
    var prefix = "rgba(",
      rgba = jQuery.map( this._rgba, function( v, i ) {
        return v == null ? ( i > 2 ? 1 : 0 ) : v;
      });

    if ( rgba[ 3 ] === 1 ) {
      rgba.pop();
      prefix = "rgb(";
    }

    return prefix + rgba.join() + ")";
  },
  toHslaString: function() {
    var prefix = "hsla(",
      hsla = jQuery.map( this.hsla(), function( v, i ) {
        if ( v == null ) {
          v = i > 2 ? 1 : 0;
        }

        // catch 1 and 2
        if ( i && i < 3 ) {
          v = Math.round( v * 100 ) + "%";
        }
        return v;
      });

    if ( hsla[ 3 ] === 1 ) {
      hsla.pop();
      prefix = "hsl(";
    }
    return prefix + hsla.join() + ")";
  },
  toHexString: function( includeAlpha ) {
    var rgba = this._rgba.slice(),
      alpha = rgba.pop();

    if ( includeAlpha ) {
      rgba.push( ~~( alpha * 255 ) );
    }

    return "#" + jQuery.map( rgba, function( v ) {

      // default to 0 when nulls exist
      v = ( v || 0 ).toString( 16 );
      return v.length === 1 ? "0" + v : v;
    }).join("");
  },
  toString: function() {
    return this._rgba[ 3 ] === 0 ? "transparent" : this.toRgbaString();
  }
});
color.fn.parse.prototype = color.fn;

// hsla conversions adapted from:
// https://code.google.com/p/maashaack/source/browse/packages/graphics/trunk/src/graphics/colors/HUE2RGB.as?r=5021

function hue2rgb( p, q, h ) {
  h = ( h + 1 ) % 1;
  if ( h * 6 < 1 ) {
    return p + (q - p) * h * 6;
  }
  if ( h * 2 < 1) {
    return q;
  }
  if ( h * 3 < 2 ) {
    return p + (q - p) * ((2/3) - h) * 6;
  }
  return p;
}

spaces.hsla.to = function ( rgba ) {
  if ( rgba[ 0 ] == null || rgba[ 1 ] == null || rgba[ 2 ] == null ) {
    return [ null, null, null, rgba[ 3 ] ];
  }
  var r = rgba[ 0 ] / 255,
    g = rgba[ 1 ] / 255,
    b = rgba[ 2 ] / 255,
    a = rgba[ 3 ],
    max = Math.max( r, g, b ),
    min = Math.min( r, g, b ),
    diff = max - min,
    add = max + min,
    l = add * 0.5,
    h, s;

  if ( min === max ) {
    h = 0;
  } else if ( r === max ) {
    h = ( 60 * ( g - b ) / diff ) + 360;
  } else if ( g === max ) {
    h = ( 60 * ( b - r ) / diff ) + 120;
  } else {
    h = ( 60 * ( r - g ) / diff ) + 240;
  }

  // chroma (diff) == 0 means greyscale which, by definition, saturation = 0%
  // otherwise, saturation is based on the ratio of chroma (diff) to lightness (add)
  if ( diff === 0 ) {
    s = 0;
  } else if ( l <= 0.5 ) {
    s = diff / add;
  } else {
    s = diff / ( 2 - add );
  }
  return [ Math.round(h) % 360, s, l, a == null ? 1 : a ];
};

spaces.hsla.from = function ( hsla ) {
  if ( hsla[ 0 ] == null || hsla[ 1 ] == null || hsla[ 2 ] == null ) {
    return [ null, null, null, hsla[ 3 ] ];
  }
  var h = hsla[ 0 ] / 360,
    s = hsla[ 1 ],
    l = hsla[ 2 ],
    a = hsla[ 3 ],
    q = l <= 0.5 ? l * ( 1 + s ) : l + s - l * s,
    p = 2 * l - q;

  return [
    Math.round( hue2rgb( p, q, h + ( 1 / 3 ) ) * 255 ),
    Math.round( hue2rgb( p, q, h ) * 255 ),
    Math.round( hue2rgb( p, q, h - ( 1 / 3 ) ) * 255 ),
    a
  ];
};


each( spaces, function( spaceName, space ) {
  var props = space.props,
    cache = space.cache,
    to = space.to,
    from = space.from;

  // makes rgba() and hsla()
  color.fn[ spaceName ] = function( value ) {

    // generate a cache for this space if it doesn't exist
    if ( to && !this[ cache ] ) {
      this[ cache ] = to( this._rgba );
    }
    if ( value === undefined ) {
      return this[ cache ].slice();
    }

    var ret,
      type = jQuery.type( value ),
      arr = ( type === "array" || type === "object" ) ? value : arguments,
      local = this[ cache ].slice();

    each( props, function( key, prop ) {
      var val = arr[ type === "object" ? key : prop.idx ];
      if ( val == null ) {
        val = local[ prop.idx ];
      }
      local[ prop.idx ] = clamp( val, prop );
    });

    if ( from ) {
      ret = color( from( local ) );
      ret[ cache ] = local;
      return ret;
    } else {
      return color( local );
    }
  };

  // makes red() green() blue() alpha() hue() saturation() lightness()
  each( props, function( key, prop ) {
    // alpha is included in more than one space
    if ( color.fn[ key ] ) {
      return;
    }
    color.fn[ key ] = function( value ) {
      var vtype = jQuery.type( value ),
        fn = ( key === "alpha" ? ( this._hsla ? "hsla" : "rgba" ) : spaceName ),
        local = this[ fn ](),
        cur = local[ prop.idx ],
        match;

      if ( vtype === "undefined" ) {
        return cur;
      }

      if ( vtype === "function" ) {
        value = value.call( this, cur );
        vtype = jQuery.type( value );
      }
      if ( value == null && prop.empty ) {
        return this;
      }
      if ( vtype === "string" ) {
        match = rplusequals.exec( value );
        if ( match ) {
          value = cur + parseFloat( match[ 2 ] ) * ( match[ 1 ] === "+" ? 1 : -1 );
        }
      }
      local[ prop.idx ] = value;
      return this[ fn ]( local );
    };
  });
});

// add cssHook and .fx.step function for each named hook.
// accept a space separated string of properties
color.hook = function( hook ) {
  var hooks = hook.split( " " );
  each( hooks, function( i, hook ) {
    jQuery.cssHooks[ hook ] = {
      set: function( elem, value ) {
        var parsed, curElem,
          backgroundColor = "";

        if ( value !== "transparent" && ( jQuery.type( value ) !== "string" || ( parsed = stringParse( value ) ) ) ) {
          value = color( parsed || value );
          if ( !support.rgba && value._rgba[ 3 ] !== 1 ) {
            curElem = hook === "backgroundColor" ? elem.parentNode : elem;
            while (
              (backgroundColor === "" || backgroundColor === "transparent") &&
              curElem && curElem.style
            ) {
              try {
                backgroundColor = jQuery.css( curElem, "backgroundColor" );
                curElem = curElem.parentNode;
              } catch ( e ) {
              }
            }

            value = value.blend( backgroundColor && backgroundColor !== "transparent" ?
              backgroundColor :
              "_default" );
          }

          value = value.toRgbaString();
        }
        try {
          elem.style[ hook ] = value;
        } catch( e ) {
          // wrapped to prevent IE from throwing errors on "invalid" values like 'auto' or 'inherit'
        }
      }
    };
    jQuery.fx.step[ hook ] = function( fx ) {
      if ( !fx.colorInit ) {
        fx.start = color( fx.elem, hook );
        fx.end = color( fx.end );
        fx.colorInit = true;
      }
      jQuery.cssHooks[ hook ].set( fx.elem, fx.start.transition( fx.end, fx.pos ) );
    };
  });

};

color.hook( stepHooks );

jQuery.cssHooks.borderColor = {
  expand: function( value ) {
    var expanded = {};

    each( [ "Top", "Right", "Bottom", "Left" ], function( i, part ) {
      expanded[ "border" + part + "Color" ] = value;
    });
    return expanded;
  }
};

// Basic color names only.
// Usage of any of the other color names requires adding yourself or including
// jquery.color.svg-names.js.
colors = jQuery.Color.names = {
  // 4.1. Basic color keywords
  aqua: "#00ffff",
  black: "#000000",
  blue: "#0000ff",
  fuchsia: "#ff00ff",
  gray: "#808080",
  green: "#008000",
  lime: "#00ff00",
  maroon: "#800000",
  navy: "#000080",
  olive: "#808000",
  purple: "#800080",
  red: "#ff0000",
  silver: "#c0c0c0",
  teal: "#008080",
  white: "#ffffff",
  yellow: "#ffff00",

  // 4.2.3. "transparent" color keyword
  transparent: [ null, null, null, 0 ],

  _default: "#ffffff"
};

})( jQuery );



/*!
 * imagesLoaded PACKAGED v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */


/*!
 * EventEmitter v4.2.6 - git.io/ee
 * Oliver Caldwell
 * MIT license
 * @preserve
 */

(function () {


	/**
	 * Class for managing events.
	 * Can be extended to provide event functionality in other classes.
	 *
	 * @class ngEventEmitter Manages event registering and emitting.
	 */
	function ngEventEmitter() {}

	// Shortcuts to improve speed and size
	var proto = ngEventEmitter.prototype;
	var exports = this;
	var originalGlobalValue = exports.ngEventEmitter;

	/**
	 * Finds the index of the listener for the event in it's storage array.
	 *
	 * @param {Function[]} listeners Array of listeners to search through.
	 * @param {Function} listener Method to look for.
	 * @return {Number} Index of the specified listener, -1 if not found
	 * @api private
	 */
	function indexOfListener(listeners, listener) {
		var i = listeners.length;
		while (i--) {
			if (listeners[i].listener === listener) {
				return i;
			}
		}

		return -1;
	}

	/**
	 * Alias a method while keeping the context correct, to allow for overwriting of target method.
	 *
	 * @param {String} name The name of the target method.
	 * @return {Function} The aliased method
	 * @api private
	 */
	function alias(name) {
		return function aliasClosure() {
			return this[name].apply(this, arguments);
		};
	}

	/**
	 * Returns the listener array for the specified event.
	 * Will initialise the event object and listener arrays if required.
	 * Will return an object if you use a regex search. The object contains keys for each matched event. So /ba[rz]/ might return an object containing bar and baz. But only if you have either defined them with defineEvent or added some listeners to them.
	 * Each property in the object response is an array of listener functions.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Function[]|Object} All listener functions for the event.
	 */
	proto.getListeners = function getListeners(evt) {
		var events = this._getEvents();
		var response;
		var key;

		// Return a concatenated array of all matching events if
		// the selector is a regular expression.
		if (typeof evt === 'object') {
			response = {};
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					response[key] = events[key];
				}
			}
		}
		else {
			response = events[evt] || (events[evt] = []);
		}

		return response;
	};

	/**
	 * Takes a list of listener objects and flattens it into a list of listener functions.
	 *
	 * @param {Object[]} listeners Raw listener objects.
	 * @return {Function[]} Just the listener functions.
	 */
	proto.flattenListeners = function flattenListeners(listeners) {
		var flatListeners = [];
		var i;

		for (i = 0; i < listeners.length; i += 1) {
			flatListeners.push(listeners[i].listener);
		}

		return flatListeners;
	};

	/**
	 * Fetches the requested listeners via getListeners but will always return the results inside an object. This is mainly for internal use but others may find it useful.
	 *
	 * @param {String|RegExp} evt Name of the event to return the listeners from.
	 * @return {Object} All listener functions for an event in an object.
	 */
	proto.getListenersAsObject = function getListenersAsObject(evt) {
		var listeners = this.getListeners(evt);
		var response;

		if (listeners instanceof Array) {
			response = {};
			response[evt] = listeners;
		}

		return response || listeners;
	};

	/**
	 * Adds a listener function to the specified event.
	 * The listener will not be added if it is a duplicate.
	 * If the listener returns true then it will be removed after it is called.
	 * If you pass a regular expression as the event name then the listener will be added to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListener = function addListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var listenerIsWrapped = typeof listener === 'object';
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key) && indexOfListener(listeners[key], listener) === -1) {
				listeners[key].push(listenerIsWrapped ? listener : {
					listener: listener,
					once: false
				});
			}
		}

		return this;
	};

	/**
	 * Alias of addListener
	 */
	proto.on = alias('addListener');

	/**
	 * Semi-alias of addListener. It will add a listener that will be
	 * automatically removed after it's first execution.
	 *
	 * @param {String|RegExp} evt Name of the event to attach the listener to.
	 * @param {Function} listener Method to be called when the event is emitted. If the function returns true then it will be removed after calling.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addOnceListener = function addOnceListener(evt, listener) {
		return this.addListener(evt, {
			listener: listener,
			once: true
		});
	};

	/**
	 * Alias of addOnceListener.
	 */
	proto.once = alias('addOnceListener');

	/**
	 * Defines an event name. This is required if you want to use a regex to add a listener to multiple events at once. If you don't do this then how do you expect it to know what event to add to? Should it just add to every possible match for a regex? No. That is scary and bad.
	 * You need to tell it what event names should be matched by a regex.
	 *
	 * @param {String} evt Name of the event to create.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvent = function defineEvent(evt) {
		this.getListeners(evt);
		return this;
	};

	/**
	 * Uses defineEvent to define multiple events.
	 *
	 * @param {String[]} evts An array of event names to define.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.defineEvents = function defineEvents(evts) {
		for (var i = 0; i < evts.length; i += 1) {
			this.defineEvent(evts[i]);
		}
		return this;
	};

	/**
	 * Removes a listener function from the specified event.
	 * When passed a regular expression as the event name, it will remove the listener from all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to remove the listener from.
	 * @param {Function} listener Method to remove from the event.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListener = function removeListener(evt, listener) {
		var listeners = this.getListenersAsObject(evt);
		var index;
		var key;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				index = indexOfListener(listeners[key], listener);

				if (index !== -1) {
					listeners[key].splice(index, 1);
				}
			}
		}

		return this;
	};

	/**
	 * Alias of removeListener
	 */
	proto.off = alias('removeListener');

	/**
	 * Adds listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can add to multiple events at once. The object should contain key value pairs of events and listeners or listener arrays. You can also pass it an event name and an array of listeners to be added.
	 * You can also pass it a regular expression to add the array of listeners to all events that match it.
	 * Yeah, this function does quite a bit. That's probably a bad thing.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add to multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.addListeners = function addListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(false, evt, listeners);
	};

	/**
	 * Removes listeners in bulk using the manipulateListeners method.
	 * If you pass an object as the second argument you can remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be removed.
	 * You can also pass it a regular expression to remove the listeners from all events that match it.
	 *
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeListeners = function removeListeners(evt, listeners) {
		// Pass through to manipulateListeners
		return this.manipulateListeners(true, evt, listeners);
	};

	/**
	 * Edits listeners in bulk. The addListeners and removeListeners methods both use this to do their job. You should really use those instead, this is a little lower level.
	 * The first argument will determine if the listeners are removed (true) or added (false).
	 * If you pass an object as the second argument you can add/remove from multiple events at once. The object should contain key value pairs of events and listeners or listener arrays.
	 * You can also pass it an event name and an array of listeners to be added/removed.
	 * You can also pass it a regular expression to manipulate the listeners of all events that match it.
	 *
	 * @param {Boolean} remove True if you want to remove listeners, false if you want to add.
	 * @param {String|Object|RegExp} evt An event name if you will pass an array of listeners next. An object if you wish to add/remove from multiple events at once.
	 * @param {Function[]} [listeners] An optional array of listener functions to add/remove.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.manipulateListeners = function manipulateListeners(remove, evt, listeners) {
		var i;
		var value;
		var single = remove ? this.removeListener : this.addListener;
		var multiple = remove ? this.removeListeners : this.addListeners;

		// If evt is an object then pass each of it's properties to this method
		if (typeof evt === 'object' && !(evt instanceof RegExp)) {
			for (i in evt) {
				if (evt.hasOwnProperty(i) && (value = evt[i])) {
					// Pass the single listener straight through to the singular method
					if (typeof value === 'function') {
						single.call(this, i, value);
					}
					else {
						// Otherwise pass back to the multiple function
						multiple.call(this, i, value);
					}
				}
			}
		}
		else {
			// So evt must be a string
			// And listeners must be an array of listeners
			// Loop over it and pass each one to the multiple method
			i = listeners.length;
			while (i--) {
				single.call(this, evt, listeners[i]);
			}
		}

		return this;
	};

	/**
	 * Removes all listeners from a specified event.
	 * If you do not specify an event then all listeners will be removed.
	 * That means every event will be emptied.
	 * You can also pass a regex to remove all events that match it.
	 *
	 * @param {String|RegExp} [evt] Optional name of the event to remove all listeners for. Will remove from every event if not passed.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.removeEvent = function removeEvent(evt) {
		var type = typeof evt;
		var events = this._getEvents();
		var key;

		// Remove different things depending on the state of evt
		if (type === 'string') {
			// Remove all listeners for the specified event
			delete events[evt];
		}
		else if (type === 'object') {
			// Remove all events matching the regex.
			for (key in events) {
				if (events.hasOwnProperty(key) && evt.test(key)) {
					delete events[key];
				}
			}
		}
		else {
			// Remove all listeners in all events
			delete this._events;
		}

		return this;
	};

	/**
	 * Alias of removeEvent.
	 *
	 * Added to mirror the node API.
	 */
	proto.removeAllListeners = alias('removeEvent');

	/**
	 * Emits an event of your choice.
	 * When emitted, every listener attached to that event will be executed.
	 * If you pass the optional argument array then those arguments will be passed to every listener upon execution.
	 * Because it uses `apply`, your array of arguments will be passed as if you wrote them out separately.
	 * So they will not arrive within the array on the other side, they will be separate.
	 * You can also pass a regular expression to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {Array} [args] Optional array of arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emitEvent = function emitEvent(evt, args) {
		var listeners = this.getListenersAsObject(evt);
		var listener;
		var i;
		var key;
		var response;

		for (key in listeners) {
			if (listeners.hasOwnProperty(key)) {
				i = listeners[key].length;

				while (i--) {
					// If the listener returns true then it shall be removed from the event
					// The function is executed either with a basic call or an apply if there is an args array
					listener = listeners[key][i];

					if (listener.once === true) {
						this.removeListener(evt, listener.listener);
					}

					response = listener.listener.apply(this, args || []);

					if (response === this._getOnceReturnValue()) {
						this.removeListener(evt, listener.listener);
					}
				}
			}
		}

		return this;
	};

	/**
	 * Alias of emitEvent
	 */
	proto.trigger = alias('emitEvent');

	/**
	 * Subtly different from emitEvent in that it will pass its arguments on to the listeners, as opposed to taking a single array of arguments to pass on.
	 * As with emitEvent, you can pass a regex in place of the event name to emit to all events that match it.
	 *
	 * @param {String|RegExp} evt Name of the event to emit and execute listeners for.
	 * @param {...*} Optional additional arguments to be passed to each listener.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.emit = function emit(evt) {
		var args = Array.prototype.slice.call(arguments, 1);
		return this.emitEvent(evt, args);
	};

	/**
	 * Sets the current value to check against when executing listeners. If a
	 * listeners return value matches the one set here then it will be removed
	 * after execution. This value defaults to true.
	 *
	 * @param {*} value The new value to check for when executing listeners.
	 * @return {Object} Current instance of EventEmitter for chaining.
	 */
	proto.setOnceReturnValue = function setOnceReturnValue(value) {
		this._onceReturnValue = value;
		return this;
	};

	/**
	 * Fetches the current value to check against when executing listeners. If
	 * the listeners return value matches this one then it should be removed
	 * automatically. It will return true by default.
	 *
	 * @return {*|Boolean} The current value to check for or the default, true.
	 * @api private
	 */
	proto._getOnceReturnValue = function _getOnceReturnValue() {
		if (this.hasOwnProperty('_onceReturnValue')) {
			return this._onceReturnValue;
		}
		else {
			return true;
		}
	};

	/**
	 * Fetches the events object and creates one if required.
	 *
	 * @return {Object} The events storage object.
	 * @api private
	 */
	proto._getEvents = function _getEvents() {
		return this._events || (this._events = {});
	};

	/**
	 * Reverts the global {@link ngEventEmitter} to its previous value and returns a reference to this version.
	 *
	 * @return {Function} Non conflicting ngEventEmitter class.
	 */
	ngEventEmitter.noConflict = function noConflict() {
		exports.ngEventEmitter = originalGlobalValue;
		return ngEventEmitter;
	};

	// Expose the class either via AMD, CommonJS or the global object
	if (typeof define === 'function' && define.amd) {
		define('ngEventEmitter/ngEventEmitter',[],function () {
			return ngEventEmitter;
		});
	}
	else if (typeof module === 'object' && module.exports){
		module.exports = ngEventEmitter;
	}
	else {
		this.ngEventEmitter = ngEventEmitter;
	}
}.call(this));

/*!
 * eventie v1.0.4
 * event binding helper
 *   eventie.bind( elem, 'click', myFn )
 *   eventie.unbind( elem, 'click', myFn )
 */

/*jshint browser: true, undef: true, unused: true */
/*global define: false */

( function( window ) {



var docElem = document.documentElement;

var bind = function() {};

function getIEEvent( obj ) {
  var event = window.event;
  // add event.target
  event.target = event.target || event.srcElement || obj;
  return event;
}

if ( docElem.addEventListener ) {
  bind = function( obj, type, fn ) {
    obj.addEventListener( type, fn, false );
  };
} else if ( docElem.attachEvent ) {
  bind = function( obj, type, fn ) {
    obj[ type + fn ] = fn.handleEvent ?
      function() {
        var event = getIEEvent( obj );
        fn.handleEvent.call( fn, event );
      } :
      function() {
        var event = getIEEvent( obj );
        fn.call( obj, event );
      };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  };
}

var unbind = function() {};

if ( docElem.removeEventListener ) {
  unbind = function( obj, type, fn ) {
    obj.removeEventListener( type, fn, false );
  };
} else if ( docElem.detachEvent ) {
  unbind = function( obj, type, fn ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    try {
      delete obj[ type + fn ];
    } catch ( err ) {
      // can't delete window object properties
      obj[ type + fn ] = undefined;
    }
  };
}

var eventie = {
  bind: bind,
  unbind: unbind
};

// transport
if ( typeof define === 'function' && define.amd ) {
  // AMD
  define( 'eventie/eventie',eventie );
} else {
  // browser global
  window.eventie = eventie;
}

})( this );

/*!
 * imagesLoaded v3.1.8
 * JavaScript is all like "You images are done yet or what?"
 * MIT License
 */

( function( window, factory ) {
  // universal module definition

  /*global define: false, module: false, require: false */

  if ( typeof define === 'function' && define.amd ) {
    // AMD
    define( [
      'ngEventEmitter/ngEventEmitter',
      'eventie/eventie'
    ], function( ngEventEmitter, eventie ) {
      return factory( window, ngEventEmitter, eventie );
    });
  } else if ( typeof exports === 'object' ) {
    // CommonJS
    module.exports = factory(
      window,
      require('wolfy87-eventemitter'),
      require('eventie')
    );
  } else {
    // browser global
    window.ngimagesLoaded = factory(
      window,
      window.ngEventEmitter,
      window.eventie
    );
  }

})( window,

// --------------------------  factory -------------------------- //

function factory( window, ngEventEmitter, eventie ) {



var $ = window.jQuery;
var console = window.console;
var hasConsole = typeof console !== 'undefined';

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

var objToString = Object.prototype.toString;
function isArray( obj ) {
  return objToString.call( obj ) === '[object Array]';
}

// turn element or nodeList into an array
function makeArray( obj ) {
  var ary = [];
  if ( isArray( obj ) ) {
    // use object if already an array
    ary = obj;
  } else if ( typeof obj.length === 'number' ) {
    // convert nodeList to array
    for ( var i=0, len = obj.length; i < len; i++ ) {
      ary.push( obj[i] );
    }
  } else {
    // array of single index
    ary.push( obj );
  }
  return ary;
}

  // -------------------------- imagesLoaded -------------------------- //

  /**
   * @param {Array, Element, NodeList, String} elem
   * @param {Object or Function} options - if function, use as callback
   * @param {Function} onAlways - callback function
   */
  function ngImagesLoaded( elem, options, onAlways ) {
    // coerce ImagesLoaded() without new, to be new ImagesLoaded()
    if ( !( this instanceof ngImagesLoaded ) ) {
      return new ngImagesLoaded( elem, options );
    }
    // use elem as selector string
    if ( typeof elem === 'string' ) {
      elem = document.querySelectorAll( elem );
    }

    this.elements = makeArray( elem );
    this.options = extend( {}, this.options );

    if ( typeof options === 'function' ) {
      onAlways = options;
    } else {
      extend( this.options, options );
    }

    if ( onAlways ) {
      this.on( 'always', onAlways );
    }

    this.getImages();

    if ( $ ) {
      // add jQuery Deferred object
      this.jqDeferred = new $.Deferred();
    }

    // HACK check async to allow time to bind listeners
    var _this = this;
    setTimeout( function() {
      _this.check();
    });
  }

  ngImagesLoaded.prototype = new ngEventEmitter();

  ngImagesLoaded.prototype.options = {};

  ngImagesLoaded.prototype.getImages = function() {
    this.images = [];

    // filter & find items if we have an item selector
    for ( var i=0, len = this.elements.length; i < len; i++ ) {
      var elem = this.elements[i];
      // filter siblings
      if ( elem.nodeName === 'IMG' ) {
        this.addImage( elem );
      }
      // find children
      // no non-element nodes, #143
      var nodeType = elem.nodeType;
      if ( !nodeType || !( nodeType === 1 || nodeType === 9 || nodeType === 11 ) ) {
        continue;
      }
      var childElems = elem.querySelectorAll('img');
      // concat childElems to filterFound array
      for ( var j=0, jLen = childElems.length; j < jLen; j++ ) {
        var img = childElems[j];
        this.addImage( img );
      }
    }
  };

  /**
   * @param {Image} img
   */
  ngImagesLoaded.prototype.addImage = function( img ) {
    var loadingImage = new LoadingImage( img );
    this.images.push( loadingImage );
  };

  ngImagesLoaded.prototype.check = function() {
    var _this = this;
    var checkedCount = 0;
    var length = this.images.length;
    this.hasAnyBroken = false;
    // complete if no images
    if ( !length ) {
      this.complete();
      return;
    }

    function onConfirm( image, message ) {
      if ( _this.options.debug && hasConsole ) {
        console.log( 'confirm', image, message );
      }

      _this.progress( image );
      checkedCount++;
      if ( checkedCount === length ) {
        _this.complete();
      }
      return true; // bind once
    }

    for ( var i=0; i < length; i++ ) {
      var loadingImage = this.images[i];
      loadingImage.on( 'confirm', onConfirm );
      loadingImage.check();
    }
  };

  ngImagesLoaded.prototype.progress = function( image ) {
    this.hasAnyBroken = this.hasAnyBroken || !image.isLoaded;
    // HACK - Chrome triggers event before object properties have changed. #83
    var _this = this;
    setTimeout( function() {
      _this.emit( 'progress', _this, image );
      if ( _this.jqDeferred && _this.jqDeferred.notify ) {
        _this.jqDeferred.notify( _this, image );
      }
    });
  };

  ngImagesLoaded.prototype.complete = function() {
    var eventName = this.hasAnyBroken ? 'fail' : 'done';
    this.isComplete = true;
    var _this = this;
    // HACK - another setTimeout so that confirm happens after progress
    setTimeout( function() {
      _this.emit( eventName, _this );
      _this.emit( 'always', _this );
      if ( _this.jqDeferred ) {
        var jqMethod = _this.hasAnyBroken ? 'reject' : 'resolve';
        _this.jqDeferred[ jqMethod ]( _this );
      }
    });
  };

  // -------------------------- jquery -------------------------- //

  if ( $ ) {
    $.fn.ngimagesLoaded = function( options, callback ) {
      var instance = new ngImagesLoaded( this, options, callback );
      return instance.jqDeferred.promise( $(this) );
    };
  }


  // --------------------------  -------------------------- //

  function LoadingImage( img ) {
    this.img = img;
  }

  LoadingImage.prototype = new ngEventEmitter();

  LoadingImage.prototype.check = function() {
    // first check cached any previous images that have same src
    var resource = cache[ this.img.src ] || new Resource( this.img.src );
    if ( resource.isConfirmed ) {
      this.confirm( resource.isLoaded, 'cached was confirmed' );
      return;
    }

    // If complete is true and browser supports natural sizes,
    // try to check for image status manually.
    if ( this.img.complete && this.img.naturalWidth !== undefined ) {
      // report based on naturalWidth
      this.confirm( this.img.naturalWidth !== 0, 'naturalWidth' );
      return;
    }

    // If none of the checks above matched, simulate loading on detached element.
    var _this = this;
    resource.on( 'confirm', function( resrc, message ) {
      _this.confirm( resrc.isLoaded, message );
      return true;
    });

    resource.check();
  };

  LoadingImage.prototype.confirm = function( isLoaded, message ) {
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  // -------------------------- Resource -------------------------- //

  // Resource checks each src, only once
  // separate class from LoadingImage to prevent memory leaks. See #115

  var cache = {};

  function Resource( src ) {
    this.src = src;
    // add to cache
    cache[ src ] = this;
  }

  Resource.prototype = new ngEventEmitter();

  Resource.prototype.check = function() {
    // only trigger checking once
    if ( this.isChecked ) {
      return;
    }
    // simulate loading on detached element
    var proxyImage = new Image();
    eventie.bind( proxyImage, 'load', this );
    eventie.bind( proxyImage, 'error', this );
    proxyImage.src = this.src;
    // set flag
    this.isChecked = true;
  };

  // ----- events ----- //

  // trigger specified handler for event type
  Resource.prototype.handleEvent = function( event ) {
    var method = 'on' + event.type;
    if ( this[ method ] ) {
      this[ method ]( event );
    }
  };

  Resource.prototype.onload = function( event ) {
    this.confirm( true, 'onload' );
    this.unbindProxyEvents( event );
  };

  Resource.prototype.onerror = function( event ) {
    this.confirm( false, 'onerror' );
    this.unbindProxyEvents( event );
  };

  // ----- confirm ----- //

  Resource.prototype.confirm = function( isLoaded, message ) {
    this.isConfirmed = true;
    this.isLoaded = isLoaded;
    this.emit( 'confirm', this, message );
  };

  Resource.prototype.unbindProxyEvents = function( event ) {
    eventie.unbind( event.target, 'load', this );
    eventie.unbind( event.target, 'error', this );
  };

  // -----  ----- //

  return ngImagesLoaded;

});





// screenfull.js
// v1.1.0
// by sindresorhus - https://github.com/sindresorhus
// from: https://github.com/sindresorhus/screenfull.js

(function () {
	'use strict';

	var isCommonjs = typeof module !== 'undefined' && module.exports;
	var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

	var fn = (function () {
		var val;
		var valLength;

		var fnMap = [
			[
				'requestFullscreen',
				'exitFullscreen',
				'fullscreenElement',
				'fullscreenEnabled',
				'fullscreenchange',
				'fullscreenerror'
			],
			// new WebKit
			[
				'webkitRequestFullscreen',
				'webkitExitFullscreen',
				'webkitFullscreenElement',
				'webkitFullscreenEnabled',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			// old WebKit (Safari 5.1)
			[
				'webkitRequestFullScreen',
				'webkitCancelFullScreen',
				'webkitCurrentFullScreenElement',
				'webkitCancelFullScreen',
				'webkitfullscreenchange',
				'webkitfullscreenerror'

			],
			[
				'mozRequestFullScreen',
				'mozCancelFullScreen',
				'mozFullScreenElement',
				'mozFullScreenEnabled',
				'mozfullscreenchange',
				'mozfullscreenerror'
			],
			[
				'msRequestFullscreen',
				'msExitFullscreen',
				'msFullscreenElement',
				'msFullscreenEnabled',
				'MSFullscreenChange',
				'MSFullscreenError'
			]
		];

		var i = 0;
		var l = fnMap.length;
		var ret = {};

		for (; i < l; i++) {
			val = fnMap[i];
			if (val && val[1] in document) {
				for (i = 0, valLength = val.length; i < valLength; i++) {
					ret[fnMap[0][i]] = val[i];
				}
				return ret;
			}
		}

		return false;
	})();

	var ngscreenfull = {
		request: function (elem) {
			var request = fn.requestFullscreen;

			elem = elem || document.documentElement;

			// Work around Safari 5.1 bug: reports support for
			// keyboard in fullscreen even though it doesn't.
			// Browser sniffing, since the alternative with
			// setTimeout is even worse.
			if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
				elem[request]();
			} else {
				elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
			}
		},
		exit: function () {
			document[fn.exitFullscreen]();
		},
		toggle: function (elem) {
			if (this.isFullscreen) {
				this.exit();
			} else {
				this.request(elem);
			}
		},
		onchange: function () {},
		onerror: function () {},
		raw: fn
	};

	if (!fn) {
		if (isCommonjs) {
			module.exports = false;
		} else {
			window.ngscreenfull = false;
		}

		return;
	}

	Object.defineProperties(ngscreenfull, {
		isFullscreen: {
			get: function () {
				return !!document[fn.fullscreenElement];
			}
		},
		element: {
			enumerable: true,
			get: function () {
				return document[fn.fullscreenElement];
			}
		},
		enabled: {
			enumerable: true,
			get: function () {
				// Coerce to boolean in case of old WebKit
				return !!document[fn.fullscreenEnabled];
			}
		}
	});

	document.addEventListener(fn.fullscreenchange, function (e) {
		ngscreenfull.onchange.call(ngscreenfull, e);
	});

	document.addEventListener(fn.fullscreenerror, function (e) {
		ngscreenfull.onerror.call(ngscreenfull, e);
	});

	if (isCommonjs) {
		module.exports = ngscreenfull;
	} else {
		window.ngscreenfull = ngscreenfull;
	}
})();








//# sourceMappingURL=app.js.map
