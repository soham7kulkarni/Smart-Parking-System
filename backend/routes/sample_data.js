var express = require('express');

var router = express.Router();

var database = require('../database');

router.get("/", function(request, response, next){

    var query = "SELECT * FROM users";

    database.query(query, function(error, data){

        if (error)
        {
            throw error;
        } 
        else 
        {
            response.render('users', { users: data});
        }


    });

});

router.post("/register", function(request, response, next){

    var email = request.body.email;
    var password = request.body.password;
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;

    var query = `
    INSERT INTO users 
    (email, password, first_name, last_name)
    VALUES ("${email}", "${password}", "${first_name}", "${last_name}")
    `;

    database.query(query, function(error, data){

        if (error)
        {   
            console.error("Error fetching user data after registration:", error);
            response.status(error.status).send(error.message);

        }
        else
        {
            console.log("Successful registeration");
            var userId = data.insertId;
            var selectQuery = ` 
            SELECT * FROM users WHERE user_id = ?
            `;

            database.query(selectQuery, [userId], function(error, selectResult) {
                if (error) {
                    console.error("Error fetching user data after registration:", error);
                    response.status(error.status).send(error.message);
                } else {
                    console.log("Successful registration:");
                    console.log(selectResult[0]);
                }
            });
        }

    });

});

router.post("/login", function(request, response, next){

    var email = request.body.email;
    var password = request.body.password;

    var query = `
    SELECT * FROM users
    WHERE email = "${email}" AND password = "${password}"
    `;

    database.query(query, function(error, data){
        if (error)
        {
            throw error;
        }
        else 
        {
            if (data.length > 0) 
            {
                response.send({ message: "Successful login", user: data[0] });
            } else 
            {
                response.send("Couldn't find user");
            }
        }
    });
});
router.get("/lots/:lotId", function(request, response, next){

    // Fetching top 3 parking lots which are near to the location (Maps API)

    const { lotId } = request.params;

    var query = `
        SELECT 
            lot_id,
            level,
            COUNT(CASE WHEN status = 'Available' THEN 1 END) AS available_spots_count
        FROM 
            spot
        WHERE
            lot_id = '${lotId}'
        GROUP BY 
            lot_id, level
        ORDER BY 
            lot_id, level;
    `;

     database.query(query, function(error, data){

        if (error) {
            throw error;
        } else {
            // Initialize available spots array
            const availableSpots = [];

            // Loop through data and push available spots count to the array
            data.forEach(row => {
                availableSpots.push(row.available_spots_count);
            });

            // Prepare response object
            const responseObject = {
                numLevels: data.length, // Assuming data.length represents the number of levels
                availableSpots: availableSpots
            };

            response.send(responseObject);
        }

    });

});


router.post("/reserve", function(request, response, next){

    var startTime = request.body.startTime;
    var endTime = request.body.endTime;
    var vehicleType = request.body.vehicleType;
    var license = request.body.license;

    var timeQuery = `
    INSERT INTO reservation
    (reservation_id, lot_id, spot_id, user_id, start_time, end_time, paid, transaction_id, total_amount)
    VALUES(1, "LOT001", 3, 3, ${startTime}, ${endTime}, 1, "TRANS219", 20)
    `;

    var vehicleQuery = `
    INSERT INTO vehicles
    (license, vehcile_type)
    VALUES("${license}", "${vehicleType}") 
    `;

    database.query(timeQuery, function(error, data){

        if (error)
        {
            throw error;
        }
        else
        {
             response.send("successful record of timestamps");
        }

    });

    database.query(vehicleQuery, function(error,data){

        if (error)
        {
            throw error;
        }
        else
        {
            response.send("successful registration");

        }

    });

});


module.exports = router;