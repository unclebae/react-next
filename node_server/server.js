const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors());

app.get('/api/users', (req, res, next) => {
    userList = [
        {
            "id":1,
            "name":"kido",
            "email":"kido@kido.com"
        },
        {
            "id":2,
            "name":"skt",
            "email":"skt@skt.com"
        },
        {
            "id":3,
            "name":"skb",
            "email":"skb@skb.com"
        },
        {
            "id":4,
            "name":"IronMan",
            "email":"ironMan@marvel.com"
        },
    ]

    res.send(userList);
});


const port = process.env.NODE_ENV === 'production' ? 80 : 9000

const server = app.listen(port, function() {
    console.log('Server listening on port ' + port)
})