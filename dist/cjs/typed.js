/*! @ryanmorr/typed v2.0.1 | https://github.com/ryanmorr/typed */
"use strict";function e(e,n,t){throw new TypeError(`Invalid value assignment on "${e}", expected: ${n}, actual: ${t}`)}function n(e){const n=null===e?"null":typeof e;return"string"==n||"number"==n||"boolean"==n||"undefined"==n||"null"==n?n[0].toUpperCase()+n.slice(1):e.constructor.name}function t(t,o,r){let u;const c=function(t,o){const r=o.name;return o===String||o===Number||o===Boolean?o=>(typeof o!==r.toLowerCase()&&e(t,r,n(o)),!0):u=>(u instanceof o||e(t,r,n(u)),!0)}(o,r);Object.defineProperty(t,o,{enumerable:!0,configurable:!0,get:()=>u,set(e){c(e)&&(u=e)}})}module.exports=function(e){const n={};return Object.keys(e).forEach((o=>t(n,o,e[o]))),n};
