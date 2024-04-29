# Smart-Parking-System

The "SPS" is a web app which allows users to book Parking Spot acorss the university campus of Cal State Fullerton. It is aimed at students, faculties and visitors of CSUF campus. The app let user enter the destination on campus and then it locates top 3 parking spots near the destination with the number of available spots at each level. User can select particular spot at the parking lot and can proceed to make secure payment. This helps user effectively navigate the availability across the campus and aids in decision making even before arriving at the campus. The web app uses React front-end and nodeJS and ExpressJS backend with MySQL database. Google Maps API and Stripe API has been used for essential functionalities within the app.


## Features

- Secure JWT Authentication
- Responsive layout, compatible with both mobile and desktop
- Entering the location to view top 3 parking lots
- Displaying spot functionality across levels for every parking lot
- Secure Payments
- Stripe webhook feature to automatically update transaction IDs with payment intent IDs
- View previous transactions in the dashboard


## Installation

To install frontend dependencies

```bash
  cd frontend
  npm install
```

To install backend dependencies

```bash
  cd backend
  npm install
```

To run frontend

```bash
  cd frontend
  npm start
```

To run backend

```bash
  cd backend
  npm start
```

To view the results
```bash
http://localhost:3000
```



    
## Tech Stack

**Client:** React, Chakra UI, CSS

**Server:** Node, Express

**DatabaseL:** MySQL

**API:** Google Maps Javascript API, Google Maps Geocoding API, Google Maps Places API, Stripe API
