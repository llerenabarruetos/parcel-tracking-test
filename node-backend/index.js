const app = require("express")();
const jwt = require("jsonwebtoken");
const fetch = require('node-fetch');
const cors = require("cors");
app.use(cors());

// Bearer token (could also be an environment variable)
const bearerToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6ImFjY2VzcyJ9.eyJpYXQiOjE2NzIzMjY1NTUsImV4cCI6MTcwMzg2MjU1NSwiYXVkIjoiaHR0cHM6Ly9icmluZ2VycGFyY2VsLmNvbSIsImlzcyI6ImZlYXRoZXJzIiwic3ViIjoiNTI1eXM2YWh4d3UyIiwianRpIjoiZDdlZGE3NDgtNzMxOS00YWIzLWI2MGEtMDEzMzI0NmVkNmY2In0.uJi6d6-E2zDWj24wryh2sVWKs4ceny4QllbrHrzK5L0";

// Simple JWT endpoint:
app.get('/jwt', (req, res) => {
    // generate JWT with sample data:
    const token = jwt.sign({someUserData: 1}, "secretKey");

    res.status(200).json({ // JSON response
        token: token
    });
});

// Endpoint that fetches parcel tracking information from Bringer's API:
app.get('/exampleparcel', async (req, res) => {
    try {
        // GET request to Bringer's API:
        const data = await fetch("https://bps.bringer.io/public/api/v2/get/parcel/tracking.json?tracking_number=BPS1EP58YI5SKBR",
            {
                method: 'GET',
                headers: {"Authorization" : `Bearer ${bearerToken}`}
            }
        );

        const jsonObj = await data.json();
        res.status(200).json(jsonObj);
    } catch(error) {
        console.log(error);
    }
})

app.listen(8080, () => {
    console.log("Server is running on: 8080");
})