const request = require('request'); // using request instead of GET
const fs = require('fs'); // used to write to local file

const args = process.argv.slice(2); // grabbing args from CL and ignoring the paths
const address = args[0]; // identifying first argument as the url
const path = args[1]; // identifying second argument as the local file path to write to

// the function used to fetch the page
const resource = (someURL, locPath) => {
      
  request(someURL, (error, response, body) => {
    if (error) {
      console.log(error); // prints if error getting resource
      throw error;
    }
    fs.appendFile(locPath, body, (error) => {
      if (error) {
        console.log(error); // prints if error writing file
        throw error;
      }
      const stats = fs.statSync(path); // gets the file size
      const fileSize = stats.size;     // once the file has been created
      console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
    });
  });
};
resource(address, path);