import * as handlers from './handlers';

let routes = [
  {
    method: 'GET',
    path: '/loop',
    handler: handlers.loop
  },
  {
    method: 'POST',
    path: '/csv2json',
    handler: handlers.csv2json
  },
  {
    method: 'GET',
    path: '/dynamicdelay',
    handler: handlers.dynamicdelay
  }
];



export default routes;
