// Public: A module that exposes {Keysounds}
/* module */

import { uniq, values } from '../util/lodash'

// Public: A Keysounds is a simple mapping between keysounds ID and the file name.
//
// ## Example
//
// If you have a BMS like this:
//
// ```
// #WAVAA cat.wav
// ```
//
// Having parsed it using a {Compiler} into a {BMSChart},
// you can create a {Keysounds} using `fromBMSChart()`:
//
// ```js
// var keysounds = Keysounds.fromBMSChart(bmsChart)
// ```
//
// Then you can retrieve the filename using `.get()`:
//
// ```js
// keysounds.get('aa') // => 'cat.wav'
// ```
//
/* class Keysounds */
// Public: Constructs an empty {Keysounds} object.
export class Keysounds {
  constructor (map) {
    this._map = map
  }
  // Public: Returns the keysound file at the specified ID.
  //
  // * `id` {String} representing the two-character keysound ID
  //
  // Returns {String} representing the filename
  // Returns undefined if not found
  //
  get (id) {
    return this._map[id.toLowerCase()]
  }
  // Public: Returns an array of unique filenames in this Keysounds object.
  //
  // Returns an {Array} of {String} representing a list of filenames
  //
  files () {
    return uniq(values(this._map))
  }
  // Public: Returns a mapping from keysound ID to keysound filename.
  //
  // Warning: This method returns the internal data structure used in this Keysounds object.
  // Do not mutate!
  //
  // Returns an {Object} that maps from keysound ID to keysound filename
  //
  all () {
    return this._map
  }
  // Public: Constructs a new {Keysounds} object from a {BMSChart}.
  //
  // * `chart` A {BMSChart} to construct a {Keysounds} from
  //
  // Returns a {Keysounds} object
  //
  static fromBMSChart (chart) {
    var map = {}
    chart.headers.each(function (name, value) {
      var match = name.match(/^wav(\S\S)$/i)
      if (!match) return
      map[match[1].toLowerCase()] = value
    })
    return new Keysounds(map)
  }
}
