const express = require('express');
const { google } = require('googleapis');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Load credentials
const credentials = JSON.parse(fs.readFileSync('./credentials.json'));

// Google Sheets API setup
const sheets = google.sheets({ version: 'v4', auth: getAuth() });

function getAuth() {
    const { client_email, private_key } = credentials;
    return new google.auth.JWT(
        client_email,
        null,
        private_key.replace(/\\n/g, '\n'),
        ['https://www.googleapis.com/auth/spreadsheets']
    );
}

// Your Google Sheet ID
const spreadsheetId = '1N2qXUlpejJuK8ehzJGBJn0Cd8-UKO8HnSkIXqQFUWrQ'; // Replace with your actual Google Sheet ID

// Endpoint to save meal data
app.post('/save-data', async (req, res) => {
    console.log('Request received:', req.body);
    const { day, data } = req.body;
    try {
        const row = [day, JSON.stringify(data)];
        await sheets.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:B',
            valueInputOption: 'RAW',
            resource: { values: [row] }
        });
        res.send('Data saved successfully to Google Sheets');
    } catch (error) {
        console.error('Error saving data to Google Sheets:', error.message);
        console.error(JSON.stringify(error, null, 2));
        res.status(500).send('Error saving data: ' + error.message);
    }
});

// Endpoint to delete all meal data
app.delete('/delete-data', async (req, res) => {
    try {
        await sheets.spreadsheets.values.clear({
            spreadsheetId,
            range: 'Sheet1!A:B' // Adjust range to include the relevant columns
        });
        res.send('All meal data deleted successfully from Google Sheets');
    } catch (error) {
        console.error('Error deleting data from Google Sheets:', error.message);
        res.status(500).send('Error deleting data: ' + error.message);
    }
});

// Endpoint to get weekly data
app.get('/get-weekly-data', async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range: 'Sheet1!A:B' // Adjust the range as needed
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return res.json({
                calorieData: [0, 0, 0, 0, 0, 0, 0],
                proteinData: [0, 0, 0, 0, 0, 0, 0]
            });
        }

        const calorieData = [];
        const proteinData = [];

        rows.forEach(row => {
            try {
                const data = JSON.parse(row[1]);
                calorieData.push(data.totalCalories || 0);
                proteinData.push(data.totalProtein || 0);
            } catch (error) {
                console.error('Error parsing row data:', error);
            }
        });

        res.json({
            calorieData,
            proteinData
        });
    } catch (error) {
        console.error('Error fetching data from Google Sheets:', error.message);
        res.status(500).send('Error fetching data: ' + error.message);
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
