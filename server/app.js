const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");
const port = 3001;
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "pass123",
  database: "db2",
});

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let email = '';

//this is to auto-fill the out-pass form with those details
app.get("/select",(req,res)=>{
    email = req.query.email;
    const select = "SELECT name, regno, branch, image, hostel_no, room_no, year FROM student where email = ?";
    db.query(select, [email], (err,result)=>{
        if(err){
            console.error(err);
            res.send("An error occurred");
        }
        else{
            console.log(result);
            res.send(result);
        }
    })
});

//this is to fetch the already existing leave dates and return dates for that email so later you can check if the dates entered overlap with existing records
app.get("/dates",(req,res)=>{
  email = req.query.email;
  const select = "SELECT go_date,return_date FROM outpass where email = ? and status not in ('Cancelled','Denied')";
  db.query(select, [email], (err,result)=>{
      if(err){
          console.error(err);
          res.send("An error occurred");
      }
      else{
          console.log(result);
          res.send(result);
      }
  })
});

//to get warden details
app.get("/warden",(req,res)=>{
  hostel_no = req.query.hostel_no;
  const query = "SELECT * from Warden where hostel=?";
  db.query(query,[hostel_no],(err,result)=>{
    if(err){
      console.error(err);
      res.send("An error occurred");
    }
    else{
      res.send(result);
    }
  })
});

//this is to handle the data entered in the form
app.post("/insert", (req, res) => {
  email = req.query.email;
  const goDate = new Date(req.body.goDate);
  const returnDate = new Date(req.body.returnDate);
  const reason = req.body.reason;
  const transport = req.body.transport;
  goDate.setDate(goDate.getDate()+1);
  returnDate.setDate(returnDate.getDate() + 1);
  const insert =
    "INSERT INTO outpass (go_date, return_date, reason, email, transport) VALUES (?, ?, ?, ?, ?)";
  db.query(insert, [goDate, returnDate, reason, email, transport], (err, result) => {
    if (err) {
      console.error(err);
      res.send("An error occurred.");
    } else {
      res.send("Hello shama");
      console.log(goDate, returnDate, reason,email, transport);
    }
  });
});

//this is to post the extended outpass return date
app.post('/extend',(req,res)=>{
  outno = req.query.out_no;
  const returnDate = new Date(req.body.returnDate);
  const query = "UPDATE outpass set return_date = ? where out_no=?";
  db.query(query, [returnDate,outno],(err,results)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(returnDate);
      res.send(results);
    }
  })
})

//this is to cancel the outpass
app.put('/cancel',(req,res)=>{
  outno = req.query.out_no;
  const query = "UPDATE outpass set status = 'Cancelled' where out_no=?";
  db.query(query, [outno],(err,results)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(results);
    }
  })
})



//this api will fetch all the outpass details that have not been approved
app.get("/waiting",(req,res)=>{
    email = req.query.email;
    const select = "SELECT * from outpass where email = ? and status= 'Waiting'";
    db.query(select, [email], (err,results)=>{
      if(err){
        console.log(err);
      }
      else{
        console.log(results);
        res.send(results);
      }
    })
})

//this api will fetch all the outpass details that have been approved
app.get("/approved",(req,res)=>{
  email = req.query.email;
  const select = "SELECT * from outpass where email = ? and (status= 'Approved' or status='In-use')";
  db.query(select, [email], (err,results)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(results);
      res.send(results);
    }
  })
})

//this will fetch all the outpass details that need to be in view history
app.get("/history",(req,res)=>{
  email = req.query.email;
  const select = "SELECT * from outpass where email = ? and status in ('Cancelled','Expired','Denied')";
  db.query(select, [email], (err,results)=>{
    if(err){
      console.log(err);
    }
    else{
      console.log(results);
      res.send(results);
    }
  })
})

//this is to display all details of the outpass based on the out_no
app.get('/everything',(req,res)=>{
  out_no = req.query.out_no;
  const select = "SELECT * from outpass where out_no = ?";
  db.query(select, [out_no], (err,results)=>{
    if(err){
      console.log(err);
    }
    else{
      res.send(results);
    }
  })
})


app.listen(port, () => {
  console.log("listening on port " + port);
});
