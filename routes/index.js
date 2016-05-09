var _ = require('underscore');
exports.onReady = function(req, res) {
   res.render('index', {})
};
exports.indexPost = function(req, res) {
var object = {};
object.message= '';
object.success = false;
global.pool.getConnection(function(err,connection){
        if (err) {
          connection.release();
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }  

        console.log('connected as id ' + connection.threadId);
       
        connection.query("SELECT count(1) as user, m.mem_code as memCode,m.mem_user as memUser,m.mem_fname as firstName ,m.mem_lname as lastName "+ 
        "from member m where m.mem_user= ? and m.mem_pass= ? limit 1",
        [req.body.user, req.body.pass] , function(err, rows, fields) {
            connection.release();
            if(!err) {
              if(rows[0].user==0){
                object.message = 'Data Wrong!!';
              }else{
                object.success = true;
              }
              object.rows =rows;
              res.json(object);
            }          
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;    
        });
  });
};

