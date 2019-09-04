import fs from 'fs';
import csvtojson from 'csvtojson';

const filePath = __dirname + '../../../../uploads/uploads.csv';

let adder = (sum, element) => {
  let p = new Promise((resolve) => {
    resolve(sum + element);
  });

  return p;
}

const handleFileUpload = file => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, file, err => {
       if (err) {
        reject(err);
       }
       resolve({ message: 'Upload successfully!' })
    });
  });
 };

 const deleteFile = filePath => {

 };


export let loop = (request, h) => {
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let sum = 0;
  return new Promise(resolve => {
    numbers.forEach(n => {
      adder(sum, n)
        .then(res => {
          console.log(`Trying to add ${n}`);
          sum += res;
          console.log(`Current sum is ${sum}`);
          if(n === numbers[numbers.length-1])
            resolve(sum);
        });
    });
  });
};

export let csv2json = async (request, h) => {
  const arr = Object.keys(request.payload);
  const fileName = arr[0];
  handleFileUpload(request.payload[fileName]);
  const jsonArray = csvtojson().fromFile(filePath);
  return jsonArray;
};