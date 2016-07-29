/**
 * Departement model events
 */

'use strict';

import {EventEmitter} from 'events';
import Departement from './departement.model';
var DepartementEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
DepartementEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Departement.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    DepartementEvents.emit(event + ':' + doc._id, doc);
    DepartementEvents.emit(event, doc);
  }
}

export default DepartementEvents;
