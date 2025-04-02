const cors = require('cors');
const express = require('express');

const app = express();
app.use(cors());  // ✅ CORS Enable karo

app.use(express.json());

app.get('/api/test', (req, res) => {
    res.json({ message: "Backend Connected Successfully!" });
});

app.listen(5000, () => console.log('Backend running on port 5000'));
