var express = require('express');
const axios = require('axios')
var router = express.Router();

var database = require('../database');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)
const bodyParser = require('body-parser');
router.use(bodyParser.raw({ type: 'application/json' }));

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
    (email, password, first_name, last_name, phone, address, birth_date)
    VALUES ("${email}", "${password}", "${first_name}", "${last_name}", "+1234567890", "123 Main St, Fullerton, USA", "1990-01-01")
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
                    const user = selectResult[0];
                    const token = jwt.sign({
                            user_id: user.user_id,
                            email: user.email 
                        }, process.env.ACCESS_TOKEN_SECRET
                        // { expiresIn: '24h' }
                        );
                    response.send({ message: "User created successfully", token: token, user: user });

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
                response.status(404).send("Please enter correct email and password");
            }
        }
    });
});

router.get("/fetch-user-data/:userID", function(request, response, next){
  const user_id = request.params.userID;
  console.log(user_id);
  var query = `
  SELECT * FROM users WHERE user_id = ${user_id}
  `

  database.query(query, function(error, data){
    if (error) {
            throw error;
      } else {
        console.log(data);
        const user = data[0];
        response.send({ message: "Successfully fetched user data", user: user });
      }
  })
})


router.get("/lots/:id", verifyToken, function(request, response, next){

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

router.get("/spots/:id", function(request, response, next){
    const id = request.params.id;
    console.log("spot", id);

    var query = `
    SELECT spot_id FROM spot
    WHERE status = "Available" AND lot_id = '${id}'
    LIMIT 1;`;

    console.log(query);

    database.query(query, function(error, data){
        if (error) {
            console.error(error);
            response.status(500).send("Internal Server Error");
        } else {
            console.log(data);
            if (data.length > 0) {
                response.status(200).send({ spotID: data[0].spot_id });
            } else {
                response.status(404).send("Spot not found");
            }
        }
    });
});

router.get("/previous-bookings/:id", async (request, response, next) => {
  const userId = request.params.id;
  console.log("user", userId);

  var query = `
  SELECT * FROM reservation WHERE user_id = ${userId} AND transaction_id != 'pending';`;

  console.log(query);

  database.query(query, function(error, data){
    if (error) {
      console.error("Error fetching previous bookings of user:", error);
      response.status(error.status).send(error.message);
    } else {
      console.log(data);
      response.json(data);
    }
  })
});
 
router.post("/create-checkout-session", async (req, res) => {
  try {
    const { products, reservation } = req.body;

    console.log("Products:", products);
    console.log("Reservation:", reservation);

    // Insert reservation details into the database
    const query = `
      INSERT INTO reservation (lot_id, spot_id, user_id, start_time, end_time, transaction_id, total_amount, type_of_vehicle, license)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const { lot_id, spot_id, user_id, start_time, end_time, total_price, type_of_vehicle, license } = reservation[0];
    const values = [lot_id, spot_id, user_id, start_time, end_time, "pending", total_price, type_of_vehicle, license];
    console.log("user", user_id);
    database.query(query, values, (error, result) => {
      console.log(query);
      if (error) {
        console.error("Error storing booking details:", error);
        return res.status(500).json({ error: "Failed to store booking details" });
      }

      // Fetch the last inserted ID
      database.query('SELECT LAST_INSERT_ID() as reservation_id', (selectError, selectResult) => {
        if (selectError) {
          console.error("Error fetching reservation ID:", selectError);
          return res.status(500).json({ error: "Failed to fetch reservation ID" });
        }

        const reservationID = selectResult[0].reservation_id;
        console.log("reservation",reservationID);
        console.log("Booking details stored successfully!");

        // Create Stripe checkout session
        const lineItems = products.map((product) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: product.id.toString(),
            },
            unit_amount: product.totalPrice * 100,
          },
          quantity: 1,
        }));

        stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: lineItems,
          mode: "payment",
          success_url: "http://localhost:3000/success",
          cancel_url: "http://localhost:3000/cancel",
          metadata: {
            reservation_id: reservationID
          },
        }).then((session) => {
          res.json({ id: session.id, reservation_id: reservationID }); // Send reservation_id in the response
        }).catch((stripeError) => {
          console.error("Error creating Stripe checkout session:", stripeError);
          res.status(500).json({ error: "Failed to create checkout session" });
        });
      });
    });
  } catch (error) {
    console.error("Error in /create-checkout-session:", error);
    res.status(500).json({ error: "Internal server error" });
  }
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

const endpointSecret = process.env.REACT_APP_ENDPOINT_SECRET;

router.post('/webhook', function(request, response) {
  const sig = request.headers['stripe-signature'];
  const body = request.body;  
  console.log("body:",body)  
  //console.log(sig)
//   console.log(request.body.payload);

  let event = null;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    console.log("event:",event);
  } catch (err) {
    console.log("err", err);
    // invalid signature
    response.status(400).end();
    return;
  }

  let intent = null;
  switch (event['type']) {
    case 'checkout.session.completed':
      intent = event.data.object;
      console.log("Succeeded:", intent.id);
      const pid = intent.id;
      console.log(pid)
      updateTransactionId(pid, intent.metadata.reservation_id);
      console.log("Transaction ID updated SUCCESSFULLY!!!!!!");
      updateSpotStatus(intent.metadata.reservation_id);
      console.log("Successfully updated spot Status");
      break;
    case 'payment_intent.payment_failed':
      intent = event.data.object;
      const message = intent.last_payment_error && intent.last_payment_error.message;
      console.log('Failed:', intent.id, message);
      break;
  }

  response.sendStatus(200);
});


function updateTransactionId(transactionId, reservationId) {
    const query = `UPDATE reservation SET transaction_id = ? WHERE reservation_id = ?`;
    database.query(query, [transactionId, reservationId], (error, result) => {
      console.log(query);
      console.log(transactionId);
      console.log("reservation id is", reservationId);
        if (error) {
            console.error("Error updating transaction ID:", error);
        } else {
            console.log("Transaction ID updated successfully!");
        }
    });
    console.log("exiting function!!");
}

function updateSpotStatus(reservationId) {
  const query = `UPDATE spot 
    SET status = "Occupied" 
    WHERE spot_id = (
    SELECT spot_id 
    FROM reservation 
    WHERE reservation_id = ?
    );`;
    database.query(query, [reservationId], (error, result) => {
    
    console.log("Starting to update status")
    if (error) {
            console.error("Error updating spot table:", error);
        } else {
            console.log("spot table updated successfully!");
        }
  });
  console .log("existing spot func");
}

module.exports = router;