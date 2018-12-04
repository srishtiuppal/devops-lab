
const express = require ( 'express' );
const app = express();
app.listen( 3000 , function () {
console .log( 'Example app listening on port 3000!' );
});
const mysql = require ( 'mysql' );
const bodyParser = require ( 'body-parser' );
app.use(bodyParser.urlencoded({ extended: true }));
var db = mysql.createConnection({
host: "localhost" ,
user: "root" ,
password: "" ,
database: "test"
});

app.use(function(req, res, next) {
    if ("key" in req.query) {
        var key = req.query["key"];
        var query = "SELECT * FROM users WHERE apikey='" + key + "'";
        db.query(query, function(err, result, fields) {
            if (err) throw err;
            if (result.length > 0) {
                next();
            }
            else {
                res.status(403).send("Access denied").end();
            }
        });
    } else {
        res.status(403).send("Access denied").end();
    }
});
// // CREATE NEW ELEMENT
app.post( '/food' ,  function (req, res) {
    var name = req.body.name;
    var quantity = req.body.quantity;
    var id_animal = req.body.id_animal;
    var query =  "INSERT INTO `food` (`name`, `quantity`, `id_animal`) VALUES ('"+name+"'," + quantity +  ","+id_animal+")";
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
});
//
// UPDATE EXISITING ELEMENT
app.put( '/food/:id' ,  function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var quantity = req.body.quantity;
    var id_animal = req.body.id_animal;
    var updates="";
    if(name)
    {updates +=" "+"`name`='"+name+"' ,"}
    if(quantity)
    {updates +=" "+"`quantity`="+quantity+" ,"}
    if(id_animal)
    {updates +=" "+"`id_animal`="+id_animal+" ,"}
    updates=updates.substr(0, updates.length-1);
    var query =  "UPDATE `food` SET "+updates+" WHERE ID="+id;
    // var query =  "UPDATE `food` SET `name`='"+name+"', `quantity`='"+quantity+"', `id_animal`='"+id_animal+"' WHERE id="+id;
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
});
//
// // SHOW BY ID
app.get('/food/:id' , function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM `food` WHERE id=" + id;
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    db.query(query, function(err, result, fields) {
        if(err) throw err;
        if (result.length >  0  ) {
            res.send(JSON.stringify(result));
        }
        else{
            res.send( "Access denied ===> ID NOT FOUND :::> TRY ANOTHER" );
        }
        // res.send(JSON.stringify(result));
    });
});
//
// //DELETE ALL ELEMETS
app.delete( '/food' ,  function (req, res) {
    var query =  "DELETE FROM `food`" ;
    db.query(query,  function (err, result, fields) {
        if(err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});
//
// //DELETE SELECTED ELEMENT
app.delete('/food/:id' ,  function (req, res) {
    var id = req.params.id;
    var query =  "DELETE FROM `food` WHERE id=" + id;
    db.query(query,  function (err, result, fields) {
        if (err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});
//
// // SELECTION
app.get( '/food' ,  function (req, res) {
    var query =  "SELECT * FROM food" ;
    var conditions = [ "name" , "quantity","id_animal" ];
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
            query +=  " DESC," ;
            else
            query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query,  function (err, result, fields) {
        if(err) throw err;
        res.send( JSON.stringify(result));
    });
});
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// CREATE NEW ELEMENT
app.post( '/staff' ,  function (req, res) {
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var wage = req.body.wage;
    var query =  "INSERT INTO `staff` (`firstname`, `lastname`, `wage`) VALUES ('"+firstname+"','" + lastname +  "',"+wage+")";
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
});

// SHOW BY ID
app.get('/staff/:id' , function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM `staff` WHERE id=" + id;
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    db.query(query, function(err, result, fields) {
        if(err) throw err;
        if (result.length >  0  ) {
            // next();
            res.send(JSON.stringify(result));
        }
        else{
            res.send( "Access denied ===> ID NOT FOUND :::> TRY ANOTHER" );
        }
        // res.send(JSON.stringify(result));
    });
});

// UPDATE EXISITING ELEMENT
app.put( '/staff/:id' ,  function (req, res) {
    var id = req.params.id;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var wage = req.body.wage;
    var updates="";
    if(firstname)
    {updates +=" "+"`firstname`='"+firstname+"' ,"}
    if(lastname)
    {updates +=" "+"`lastname`='"+lastname+"' ,"}
    if(wage)
    {updates +=" "+"`wage`="+wage+" ,"}
    updates=updates.substr(0, updates.length-1);
    var query =  "UPDATE `staff` SET "+updates+" WHERE ID="+id;
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
});

//DELETE ALL ELEMETS
app.delete( '/staff' ,  function (req, res) {
    var query =  "DELETE FROM `staff`" ;
    db.query(query,  function (err, result, fields) {
        if(err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});
//DELETE SELECTED ELEMENT
app.delete('/staff/:id' ,  function (req, res) {
    var id = req.params.id;
    var query =  "DELETE FROM `staff` WHERE id=" + id;
    db.query(query,  function (err, result, fields) {
        if (err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});







// SELECTION
app.get( '/staff' ,  function (req, res) {
    var query =  "SELECT * FROM staff" ;
    var conditions = [ "firstname","lastname" , "wage" ];
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query,  function (err, result, fields) {
        if(err) throw err;
        res.send( JSON.stringify(result));
    });
});
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// //
// CREATE NEW ELEMENT
app.post( '/cages' ,  function (req, res) {
    var name = req.body.name;
    var description = req.body.description;
    var area = req.body.area;
    var query =  "INSERT INTO `cages` (`name`, `description`, `area`) VALUES ('"+name+"','" + description +  "',"+area+")";
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
});

// SHOW BY ID
app.get('/cages/:id' , function (req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM `cages` WHERE id=" + id;
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    db.query(query, function(err, result, fields) {
        if(err) throw err;
        if (result.length >  0  ) {
            // next();
            res.send(JSON.stringify(result));
        }
        else{
            res.send( "Access denied ===> ID NOT FOUND :::> TRY ANOTHER" );
        }
        // res.send(JSON.stringify(result));
    });
});

// UPDATE EXISITING ELEMENT
app.put( '/cages/:id' ,  function (req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var description = req.body.description;
    var area = req.body.area;
    var updates="";
    if(name)
    {updates +=" "+"`name`='"+name+"' ,"}
    if(description)
    {updates +=" "+"`description`='"+description+"' ,"}
    if(area)
    {updates +=" "+"`area`='"+area+"' ,"}
    updates=updates.substr(0, updates.length-1);
    var query =  "UPDATE `cages` SET "+updates+" WHERE ID="+id;
    db.query(query,  function (err, result, fields) {
        if (err) throw err;
        res.send( JSON.stringify( "Success" ));
    });
});
//
// //DELETE ALL ELEMETS
app.delete( '/cages' ,  function (req, res) {
    var query =  "DELETE FROM `cages`" ;
    db.query(query,  function (err, result, fields) {
        if(err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});
//DELETE SELECTED ELEMENT
app.delete('/cages/:id' ,  function (req, res) {
    var id = req.params.id;
    var query =  "DELETE FROM `cages` WHERE id=" + id;
    db.query(query,  function (err, result, fields) {
        if (err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});
//
//
//
//
//
//
//
// // SELECTION
app.get( '/cages' ,  function (req, res) {
    var query =  "SELECT * FROM cages" ;
    var conditions = [ "name","description" , "area" ];
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query,  function (err, result, fields) {
        if(err) throw err;
        res.send( JSON.stringify(result));
    });
});
//



// // SELECTION
app.get( '/animals' ,  function (req, res) {
    var query =  "SELECT * FROM animals" ;
    var conditions = [ "name","breed" , "food_per_day" , "birthday" , "entry_date" , "id_cage"];
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query,  function (err, result, fields) {
        if(err) throw err;
        res.send( JSON.stringify(result));
    });
});

//Show by id
app.get('/animals/:id', function(req, res) {
    var id = req.params.id;
    var query = "SELECT * FROM animals WHERE id=" + id;
    if("fields" in req.query)
    {
        query = query.replace("*", req.query["fields"]);
    }
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});
// //Delete 1
app.delete('/animals/:id' ,  function (req, res) {
    var id = req.params.id;
    var query =  "DELETE FROM animals WHERE id=" + id;
    db.query(query,  function (err, result, fields) {
        if (err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});
// //Delete all
app.delete('/animals' ,  function (req, res) {

    var query =  "DELETE FROM animals";
    db.query(query,  function (err, result, fields) {
        if (err)  throw err;
        res.send(JSON.stringify( "Success" ));
    });
});
//
//
//
// //Insert
app.post('/animals', function(req, res) {
    var name = req.body.name;
    var breed = req.body.breed;
    var food_per_day = req.body.food_per_day;
    var birthday = req.body.birthday;
    var entry_date = req.body.entry_date;
    var id_cage = req.body.id_cage;

    var query = "INSERT INTO `animals` (`name`, `breed`, `food_per_day`, `birthday`, `entry_date`, `id_cage`) VALUES ('" + name + "','"+breed+"',"+food_per_day+", '"+birthday+"','"+entry_date+"',"+id_cage+")";
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify("Success"));
    });
});
//
//
//
// //Modificate
//
app.put('/animals/:id', function(req, res) {
    var id = req.params.id;
    var name = req.body.name;
    var breed = req.body.breed;
    var food_per_day = req.body.food_per_day;
    var birthday = req.body.birthday;
    var entry_date = req.body.entry_date;
    var id_cage = req.body.id_cage;
    var updates="";
    if(name)
    {updates +=" "+"`name`='"+name+"' ,"}
    if(breed)
    {updates +=" "+"`breed`='"+breed+"' ,"}
    if(food_per_day)
    {updates +=" "+"`food_per_day`="+food_per_day+" ,"}
    if(birthday)
    {updates +=" "+"`birthday`='"+birthday+"' ,"}
    if(entry_date)
    {updates +=" "+"`entry_date`='"+entry_date+"' ,"}
    if(id_cage)
    {updates +=" "+"`id_cage`="+id_cage+" ,"}
    updates=updates.substr(0, updates.length-1);
    var query = "UPDATE animals SET "+ updates + " WHERE id="+ id;
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify("Success"));
    });
});
app.get('/animals/:id/cages', function(req, res) {
    var id = req.params.id;
    var query = "SELECT cages.id,cages.name,cages.description,cages.area FROM animals INNER JOIN cages ON animals.id_cage = cages.id WHERE animals.id=" + id;
    var conditions = [ "name","description" , "area" ];
    if("fields" in req.query)
    {
        var query = "SELECT * FROM animals INNER JOIN cages ON animals.id_cage = cages.id WHERE animals.id=" + id;
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});
app.get('/cages/:id/animals', function(req, res) {
    var id = req.params.id;
    var query = "SELECT animals.id,animals.name,animals.food_per_day,animals.birthday,animals.entry_date,animals.id_cage FROM animals INNER JOIN cages ON cages.id = animals.id_cage WHERE cages.id=" + id;
    var conditions = [ "name","breed" , "food_per_day" , "birthday" , "entry_date" , "id_cage"];
    if("fields" in req.query)
    {
        var query = "SELECT * FROM animals INNER JOIN cages ON cages.id = animals.id_cage WHERE cages.id=" + id;
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});
app.get('/food/:id/animals', function(req, res) {
    var id = req.params.id;
    var query = "SELECT animals.id,animals.name,animals.food_per_day,animals.birthday,animals.entry_date,animals.id_cage FROM animals INNER JOIN food ON animals.id = food.id_animal WHERE food.id=" + id;
    var conditions = [ "id","name","breed" , "food_per_day" , "birthday" , "entry_date" , "id_cage"];
    if("fields" in req.query)
    {
        var query = "SELECT * FROM animals INNER JOIN food ON animals.id = food.id_animal WHERE food.id=" + id;
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});
app.get('/animals/:id/food', function(req, res) {
    var id = req.params.id;
    var query = "SELECT food.id,food.name,food.quantity FROM animals INNER JOIN food ON animals.id = food.id_animal WHERE animals.id=" + id;
    var conditions = [ "name","quantity" , "id_animal" ];
    if("fields" in req.query)
    {
        var query = "SELECT * FROM animals INNER JOIN food ON animals.id = food.id_animal WHERE animals.id=" + id;
        query = query.replace("*", req.query["fields"]);
    }
    for ( var index in conditions) {
        if (conditions[index]  in req.query) {
            if (query.indexOf( "WHERE" ) <  0  ) {
                query +=  " WHERE";
            }  else {
                query +=  " AND";
            }
            query +=  " " + conditions[index] +  "='" +
                req.query[conditions[index]] +  "'" ;
        }
    }

    // sorting
    if( "sort" in req.query){
        var sort = req.query[ "sort" ].split( "," );
        query +=  " ORDER BY" ;
        for ( var index  in sort) {
            var direction = sort[index].substr( 0  ,  1  );
            var field = sort[index].substr( 1  );
            query+=  " " + field;
            if (direction ==  "-")
                query +=  " DESC," ;
            else
                query +=  " ASC," ;
        }
        query = query.slice( 0  ,  -1 );
    }
    // limit offset on query
    if ( "limit" in req.query) {
        query +=  " LIMIT " + req.query[ "limit" ];
        if ( "offset" in req.query) {
            query += " OFFSET " + req.query[ "offset" ];
        }
    }
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.get('/food-stats',function(req, res) {
    var query = "SELECT animals.id,IFNULL(quantity/food_per_day,0) as days_left FROM food join animals where food.id_animal=animals.id";
    db.query(query ,  function(err, result, fields) {
        if(err) throw err;
        res.send(JSON.stringify(result));
    });
});

app.get('/animals/:id_animal/cages/:id_cage', function(req, res) {
    var id_cage = req.params.id_cage;
    var id_animal = req.params.id_animal;
    var query = "SELECT cages.id,cages.name,cages.description,cages.area FROM cages INNER JOIN animals ON animals.id_cage = cages.id WHERE animals.id=" + id_animal+" and cages.id="+id_cage;
    if("fields" in req.query)
    {
        var query = "SELECT * FROM cages INNER JOIN animals ON animals.id_cage = cages.id WHERE animals.id=" + id_animal+" and cages.id="+id_cage;
        query = query.replace("*", req.query["fields"]);
    }
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});
app.get('/food/:id_food/animals/:id_animal', function(req, res) {
    var id_food = req.params.id_food;
    var id_animal = req.params.id_animal;
    var query = "SELECT animals.id,animals.name,animals.food_per_day,animals.birthday,animals.entry_date,animals.id_cage FROM animals INNER JOIN food ON animals.id = food.id_animal WHERE food.id=" + id_food+" and animals.id="+id_animal;
    if("fields" in req.query)
    {
        var query = "SELECT * FROM animals INNER JOIN food ON animals.id = food.id_animal WHERE food.id=" + id_food+" and animals.id="+id_animal;
        query = query.replace("*", req.query["fields"]);
    }
    db.query(query, function(err, result, fields) {
        if (err) throw err;
        res.send(JSON.stringify(result));
    });
});