const URL = process.argv[2];
const PATH = process.argv[3];

const request = require("request");
const fs = require("fs");
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Get request
request(URL, (error, response, body) => {
  console.error(error);
  console.log("statusCode:", response && response.statusCode);
  if (!error) {
    fs.access(`${PATH}`, fs.F_OK, (err) => {
      if (err) {
        console.error(err);
        return;
      }
      rl.question("File already exist! Enter Y to overwrite: ", (answer) => {
        if (`${answer}` === `Y`) {
          //write function
          fs.writeFile(`${PATH}`, body, (err) => {
            if (err) {
              console.error(err);
              return;
            }
            console.log(
              `Downloaded and saved ${response.headers["content-length"]} bytes to ${PATH}`
            );
          });
        }
        rl.close();
      });
    });
  }
});
