# Parcel-Tracking Test Website:
Small website (React.js/Node.js) that has 2 pages:
- http://localhost:3000/: Contains part 1, where the front-end calls the /jwt endpoint of the Node.js back-end to receive a sample JWT, which it displays on the page.
- http://localhost:3000/track: Contains part 2. The front-end calls the /exampleparcel endpoint of the back-end. That endpoint returns the data returned by the Bringer API after fetching it via node-fetch.

# How to Run:
Start the back-end:
1. Change directory to /node-backend
2. Run: npm install
3. Run: node index.js    (will be running on http://localhost:8080/)
    
Start the front-end:
1. Open another terminal and change directory to /parcel-tracking
2. Run: npm install
3. Run: npm start     (will be running on http://localhost:3000/)
    
(Once both are running, you can navigate to http://localhost:3000/ and http://localhost:3000/track)
