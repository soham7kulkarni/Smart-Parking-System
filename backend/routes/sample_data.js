var express = require('express');
const axios = require('axios')
var router = express.Router();

var database = require('../database');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token.split(' ')[1], process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    console.log(err);
    if (err) {
    
      return res.status(403).json({ message: 'Failed to authenticate token' });
    }
    req.user = decoded;
    console.log(decoded);
    next();
  });
};

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

router.post("/signup", function(request, response, next){

    var email = request.body.email;
    var password = request.body.password;
    var first_name = request.body.first_name;
    var last_name = request.body.last_name;

    console.log("Hello",request.body.email)

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

    database.query(query, async function(error, data){
        if (error)
        {
            throw error;
        }
        else 
        {
            if (data.length > 0) 
            {
                const user = data[0];
                const token = jwt.sign({
                            user_id: user.user_id,
                            email: user.email
                        }, process.env.ACCESS_TOKEN_SECRET
                        // { expiresIn: '24h' }
                        );
                    response.send({ message: "Successful login", token: token, user: user });
            } else 
            {
                response.status(404).send("Couldn't find user");
            }
        }
    });
});


router.get("/lots/:id", verifyToken, function(request, response, next){

    // Fetching top 3 parking lots which are near to the location (Maps API)

    const id  = request.params.id; // Extracting id from params directly
    console.log(id);
    console.log("Authenticated user:", request.user);

    var query = `
        SELECT 
            s.lot_id,
            s.level,
            COUNT(CASE WHEN s.status = 'Available' THEN 1 END) AS available_spots_count,
            l.image
        FROM 
            spot s
        JOIN
            lot l ON s.lot_id = l.lot_id
        WHERE
            s.lot_id = '${id}'
        GROUP BY 
            s.lot_id, s.level, l.image
        ORDER BY 
            s.lot_id, s.level;
    `;
    
    console.log(query);

    database.query(query, function(error, data){

        if (error) {
            throw error;
        } else {
            console.log(data);
            // Initialize available spots array
            const availableSpots = [];

            // Loop through data and push available spots count to the array
            data.forEach(row => {
                availableSpots.push(row.available_spots_count);
            });

            // Prepare response object
            const responseObject = {
                numLevels: data.length, // Assuming data.length represents the number of levels
                availableSpots: availableSpots,
                image: data.length > 0 ? data[0].image : null // Assuming there's only one image per lot
            };

            response.send(responseObject);
        }

    });

});

router.post("/create-checkout-session",async(req,res)=>{
    const {products} = req.body;

    console.log("Product", products);

    const lineItems = products.map((product) => ({
        price_data: {
            currency:"usd",
            product_data:{
                name:product.id
            },
            unit_amount:product.totalPrice * 100,
        },
        quantity:1
    }));

        const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:lineItems,
        mode:"payment",
        success_url:"http://localhost:3000/success",
        cancel_url:"http://localhost:3000/cancel",
    });

    res.json({id:session.id});
})


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


router.post('/api/fetchNearbyParking', async (req, res) => {
  const { lat, lng } = req.body;
  console.log(req.body)
  try {
    const response = await axios.get('https://maps.googleapis.com/maps/api/place/nearbysearch/json', {
      params: {
        location: `${lat},${lng}`,
        key: process.env.GOOGLE_MAPS_API_KEY, // Replace with your actual API key
        type: 'parking',
        radius: 1600,
      },
    });
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;