/******************************************************************************
 *
 * Bold Leads Serverless AWS Lambda & MySQL Boilerplate
 * v0.1 by @iDoMeteor
 *
 * ***************************************************************************/

'use strict';
const debug = (
  ('string' == typeof process.env.DEBUG)
    && ('true' == process.env.DEBUG)
) ? true : false;

// Database connection details
const conn = {
    connectTimeout: 3000,
    // DB name
    database: '',
    // Endpoint
    host: '',
    password: '',
    ssl: 'Amazon RDS', // seems to work, should verify
    user: '',
};

// Imports
const mysql = require('mysql'); // Required, obviously
const x = require('');

// Table to select from, will be properly escaped by script
const tableName = 'XXX';

// Whitelisted parameters
const fields = [
  'x',
  'y',
];

// Columns to select from table
const columns = [
  'a',
  'b',
];

/**
 *
 * @Description Parse query string parameters and return matches
 * @Method      read
 * @Param       event				The request event from API Gateway
 * @Param       context     The AWS execution context of the Node environment
 * @Param       callback    Function which sends response data to the client
 * @Returns     undefined   Anything returned goes into the void
 *
 */
module.exports.read = (event, context, callback) => {

  if (debug) console.log('Bold Leads XXX API call initiated');
  if (debug) console.log(`Event: ${JSON.stringify(event, null, 2)}`);
  if (debug) console.log(`Context: ${JSON.stringify(context, null, 2)}`);

  // Validate parameter types
  if (!validEvent(event, callback)) return;

  // Sanatize data
  let {x, y} = sanitizeQueryString(event.queryStringParameters);

  // Validate data
  if (!x) return;

  // Instantiate database connection
  const db = mysql.createConnection(conn);

  // Format table name
  const table = db.escapeId(tableName);
  if (debug) console.log('Table: ', JSON.stringify(table, null, 2));

  // Formulate where clause
  let array = new Array();
  let clause = 'where (`XXX` like ' + db.escape(x)
  if (array.size) {
    array.forEach(variant => {
      if (variant != x) {
        clause += ' or `YYY` like ' + db.escape(variant)
      }
    });
  }
  clause += ')';
  clause += ' and `z`='
    + db.escape(z)
    + ' limit 0;';

  // Formulate SQL
  const sql = 'select ' + columns.join() + ' from ' + table + ' ' + clause;
  if (debug) console.log('Query: ', JSON.stringify(sql, null, 2));

  // Connect to DB
  db.connect(error => {
    if (debug) {
      if (error) {
        let message = 'Could not connect to database: ' + error.stack;
        console.error(message);
        if ('function' == typeof callback) callback (new Error (message));
        return;
      } else {
        console.log ('Connected to database on thread: ' + db.threadId);
      }
    }
  });

  // Execute query
  db.query(sql, (error, result) => {

    if (debug) console.log('Query result: ', JSON.stringify(result, null, 2));

    // Error checking
    if (error && !result) {
      const message = 'Query error: ' + JSON.stringify(error, null, 2);
      if (debug) console.error(message);
      if ('function' == typeof callback) callback (new Error (error));
      return;
    }

    // Instantiate return payload
    const payload = {
      x: x,
      y: y,
      z: z,
    }
    if (debug) console.info(`Initial payload: ${JSON.stringify(payload, null, 2)}`);

    // Additional processing...

    // Formulate return object
    if (debug) console.info(`Final payload: ${JSON.stringify(payload, null, 2)}`);

    const response = {
      statusCode: 200,
      body: (debug)
        ? JSON.stringify(payload, null, 2)
        : JSON.stringify(payload),
    };

    // Send response
    callback(null, response);

  });

  // Close connection
  db.end();

};

function escapeQueryValues (value, cb) {
  if (debug) console.log(`Unescaped: ${JSON.stringify(value, null, 2)}`);
  const safe = {}
  fields.forEach(field => {
    safe[field] = mysql.escape(value[field]);
  });

  if (debug) console.log(`Escaped: ${JSON.stringify(safe, null, 2)}`);
  return safe;
}

function sanitizeQueryString (value, cb) {
  if (debug) console.log(`Unsanitized: ${JSON.stringify(value, null, 2)}`);
  const safe = {}
  fields.forEach(field => {
    const len = value[field].length;
    if (
      (600 < len)
      || (-1 != value[field].indexOf('--'))
      || (-1 != value[field].indexOf(';'))
    ) {
      const message = 'API called with suspicious ' + field;
      if (debug) {
        console.error(message);
        if ('function' == typeof callback) callback (new Error (message));
      }
      if ('function' == typeof callback) callback (new Error('Error 002'));
      return;
    }
    // Numeric fields like this
    // safe[field] = ('number' == field) ? parseInt(value[field]) : value[field];
  });

  if (debug) console.log(`Sanitized: ${JSON.stringify(safe, null, 2)}`);
  return safe;
}

function validEvent (value, cb) {
  let message;
  if (
    ('object' != typeof value)
    || ('object' != typeof value.queryStringParameters)
  ) {
    message = 'Invalid API call';
  }
  if (debug) console.log
    (`Get params: ${JSON.stringify(value.queryStringParameters, null, 2)}`);

  fields.forEach(field => {
    if ('string' != typeof field) {
    message = 'API called with invalid parameter: '
      + JSON.stringify(value, null, 2);
    }
  });
  if (!message) return true;
  if (debug) {
    console.error(message);
    if ('function' == typeof cb) cb (new Error (message));
  }
  if ('function' == typeof cb) cb (new Error('Error 001'));
  return false;
}
