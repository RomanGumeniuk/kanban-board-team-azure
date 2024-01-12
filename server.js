const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const port = 5173;

const app = express()
app.use(cors())

const db =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "project_kanban"
})


app.get('/', (re, res)=> {
    return res.json("BACKEND");
})

app.get('/notes', (req, res)=>{
    const sql = "SELECT * FROM note";
    db.query(sql, (err, data)=>{
        if(err) return res.json(err);
        return res.json(data);
    })
})

app.listen(port, ()=> {
    console.log("listenin");
})