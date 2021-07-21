const express = require('express');
const path = require('path');
const index = require('./index.html')
const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'assets')))

app.use(index)

app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`)
})