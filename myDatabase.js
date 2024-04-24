const Data = require('./data');

let myDatabase = function() {
    this.data = [];
}

let dataIndex = 0;

myDatabase.prototype.displayData = function() {
    for (let i=0;i<this.data.length;i++) {
        console.log(this.data[i]);
    }
}

myDatabase.prototype.postData = function(_data) {
  for (let i=0;i<this.data.length;i++) {
    if (this.data[i] && this.data[i].user == _data.user) {
      return false;
    }
  }
  this.data[dataIndex++] = new Data(_data.user, _data.passw)
  return true;
}

myDatabase.prototype.getData = function(user) { //1st

  for (let i=0;i<this.data.length;i++) {
    if (this.data[i] && this.data[i].user == user) {
      return (new Data(this.data[i].user, this.data[i].passw));
    }
  }
  return null;
}


myDatabase.prototype.deleteData = function(user) { //3rd

   for (let i=0;i<this.data.length;i++) {
    if (this.data[i] && this.data[i].user == user) {
      this.data[i] = null;
      return true;
    }
  }
  return null;
}

module.exports = myDatabase;
