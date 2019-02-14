let fs = require('fs');
const axios = require("axios");

const postsApiUrl = "https://jsonplaceholder.typicode.com/posts";
const usersApiUrl = "https://jsonplaceholder.typicode.com/users";

let boilerplateStart = `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8">
    <title>Posts Table</title>
    <link rel="shortcut icon" href="https://www.pashabank.az/favicon.ico" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="index.css">
    </head>
    <body>
    <table style="width:100%" id="table" cellpadding="0" cellspacing="0" border="0">
    <thead>
        <th>Id</th>
        <th>Title</th>
        <th>Body</th>
    </thead>`;

let boilerPlateEnd = `
           </body> 
           </html>`;
let tablesSeparator = `<br>`;

function fillThePostsTable(posts) {
    let tr = ``;
    for (let i = 0; i < posts.length; i++) {
        let title = posts[i].title;
        let body = posts[i].body;
        let id = posts[i].id;
        tr += `<tr>
    <td>${id}</td>
    <td>${title}</td>
    <td>${body}</td>
    </tr>
    `;
    }
    tr += `</table>`;
    return tr;
}

function fillTheUsersTable(users) {
    let tr = `<table>`;
    for (let i = 0; i < users.length; i++) {
        let name = users[i].name;
        let username = users[i].username;
        let email = users[i].email;
        let phone = users[i].phone;

        tr += `

    <tr>
    <td>${name}</td>
    <td>${username}</td>
    <td>${email}</td>
    <td>${phone}</td> 
    </tr>`;
    }
    tr += `</table>`;
    return tr;
}


Promise.all([axios.get(postsApiUrl), axios.get(usersApiUrl)]).then((result) => {
        let posts = result[0].data;
        let users = result[1].data;

        let postsTableRows = fillThePostsTable(posts);
        let usersTableRows = fillTheUsersTable(users);
        console.log(usersTableRows)

        let dataArray = [boilerplateStart, postsTableRows, tablesSeparator, usersTableRows, boilerPlateEnd];
        fs.writeFile('index.html', '', function () {
            console.log('done')
        })
        fs.writeFileSync('index.html', dataArray.join(""), function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
    }
).catch((error) => {
    console.log(error.message);
})








