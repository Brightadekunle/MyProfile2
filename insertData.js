// we use pg library to
// request connection pool from postgres database
// psql -h traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com -d postgres -U traineeUser password is traineePassword
const { Pool } = require('pg')

// we connect to pg using pool we requested
const pool = new Pool({
  user: 'traineeUser',
  host: 'traineedb.cgq0reqixqsd.us-east-1.rds.amazonaws.com',
  password: 'traineePassword',
  database: 'postgres',
  port: 5432,
  multipleStatements: true
})

// the pool emits an error on behalf of any idle clients
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

// if no error on idel client, pool connects to database
pool.connect((err, client, done) => {
    //if there is an error with our database connection strings
    if (err) {
        console.error('Database connection failed: ' + err.stack);
        return;
    }
    //if no error then we have successfully connected 
    console.log('Connected to database');
    // do not call done(); - because we want to use this connection 
    // to create/insert/delete or select records from our database
    // sometime we might also want to export this connection for other resources
});

// insert a record into our table
pool.query(
    `INSERT INTO userbright2021
                 (id, fields, datatype, sampledata)
                 VALUES 
                 ('1', 'Country', 'String', 'Nigeria'),
                 ('2', 'Business', 'String', 'Skillella'),
                 ('3', 'Email Address', 'String', 'brightaverix@gmail.com'),
                 ('4', 'Password', 'String', '!@#$%^^&*'),
                 ('5', 'Firstname', 'String', 'Bright'),
                 ('6', 'Lastname', 'String', 'Adegoke'),
                 ('7', 'Technical skill', 'Boolean', 'Yes'),
                 ('8', 'Description', 'Text', 'I write code'),
                 ('9', 'Staff size', 'String', '1-6'),
                 ('10', 'Industry', 'String', 'Technology'),
                 ('11', 'Category', 'String', 'Business'),
                 ('12', 'Business type', 'String', 'Scale'),
                 ('13', 'City', 'String', 'Ibadan'),
                 ('14', 'Street address', 'String', 'Challenge road.'),
                 ('15', 'State', 'String', 'Oyo state'),
                 ('16', 'Phone Number', 'String', '09038370144'),
                 ('17', 'Website', 'String', 'www.skillella.com'),
                 ('18', 'Nationality', 'String', 'Nigerian'),
                 ('19', 'Identification Doc', 'String', 'identification.doc'),
                 ('20', 'Identification Number', 'Integer', '287'),
                 ('21', 'Proof of Adress', 'String', 'Management'),
                 ('22', 'Account Provider', 'String', 'UBA Bank'),
                 ('23', 'Account Number', 'String', '2078715064'),
                 ('24', 'Account Name', 'String', 'Bright Adegoke')
                 `,
    (err, res) => {
      if(err) {
        console.log('Error or issue with table creation');
    } else {
        console.log('Inserted data into table successfully')
        console.log(res);
   }
  } 
);

pool.end();


// export connection
module.exports = pool;