const express = require('express');
const app = express();

app.set('port', (process.env.PORT || 3006));
app.set('host', (process.env.HOST || 'http://localhost'));

app.use(express.static(__dirname));

app.listen(app.get('port'), () => {
    console.log(`Frontend app running on ${app.get('host')}:${app.get('port')}`);
});