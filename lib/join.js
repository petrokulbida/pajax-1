import def from './def.js';

// Merges multiple request options
export default function join(...inits) {
  let result = {};
  const assign = def.request.assign;
  const merge = def.request.merge;
  inits.forEach(init=>{
    Object.keys(init || {}).forEach(key=>{
      if(init[key]!==undefined) {
        let prop = typeof assign[key]==='string' ? assign[key] : key;
        // Merge options
        if(typeof merge[key]==='function') {
          result[key] = merge[key](init[key], result[prop]);
        } else {
          result[prop] = init[key];
        }
      }
    });
  });
  return result;
}