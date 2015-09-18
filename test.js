var fetchData = function() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve({
        users: [
          { name: 'Jack', age: 22 },
          { name: 'Tom', age: 21 },
        ]
      });
    }, 50);
  });
}


var prepareDataForCsv = function(data) {
  return new Promise(function(resolve, reject) {
    // imagine this did something with the data
    resolve(data);
  });
};

var writeToCsv = function(data) {
  return new Promise(function(resolve, reject) {
    // write to CSV
    resolve();
  });
};

fetchData().then(function(data) {
  return prepareDataForCsv(data);
}).then(function(data) {
  return writeToCsv(data);
}).then(function() {
  console.log('your csv has been saved');
});