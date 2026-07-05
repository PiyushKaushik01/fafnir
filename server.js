const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();

const PORT = 3000;

app.use(express.json());

app.use(express.static(__dirname));

const membersFile = path.join(__dirname,"members.json");



// =========================
// GET MEMBERS
// =========================

app.get("/api/members",(req,res)=>{

    fs.readFile(membersFile,"utf8",(err,data)=>{

        if(err){

            return res.status(500).json({error:"Couldn't read members.json"});

        }

        res.json(JSON.parse(data));

    });

});



// =========================
// ADD MEMBER
// =========================

app.post("/api/add-member",(req,res)=>{

    const newMember=req.body;

    fs.readFile(membersFile,"utf8",(err,data)=>{

        if(err){

            return res.status(500).json({error:"Read error"});

        }

        const members=JSON.parse(data);

        members.push(newMember);

        fs.writeFile(

            membersFile,

            JSON.stringify(members,null,4),

            err=>{

                if(err){

                    return res.status(500).json({error:"Write error"});

                }

                res.json({

                    success:true

                });

            }

        );

    });

});



app.listen(PORT,()=>{

    console.log("Server running:");

    console.log(`http://localhost:${PORT}`);

});