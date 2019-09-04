import fs from 'fs';
import csvtojson from 'csvtojson';
import requestIp from 'request-ip';

const filePath = __dirname + '../../../../uploads/uploads.csv';
const ipObj = [];

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
}

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
          if (n === numbers[numbers.length - 1])
            resolve(sum);
        });
    });
  });
}

export let csv2json = async (request, h) => {
  const arr = Object.keys(request.payload);
  const fileName = arr[0];
  handleFileUpload(request.payload[fileName]);
  const jsonArray = csvtojson().fromFile(filePath);
  return jsonArray;
}

export let dynamicdelay = (request, h) => {
  const curTime = new Date();
  const curIp = requestIp.getClientIp(request);
  let index = ipObj.findIndex(e => e.ip === curIp);
  if (index != -1) {
    if (curTime - ipObj[index].time > 300000) {
      ipObj[index].count = 0;
      ipObj[index].time = curTime;
    }
    ++ipObj[index].count;
    let count = ipObj[index].count;
    return new Promise(resolve => {
      setTimeout(() => resolve(Math.pow(2, count)), ((count * 2) - 1) * 1000);
    });
  }
  const obj = {
    ip: curIp,
    count: 1,
    time: curTime
  }
  ipObj.push(obj);
  return new Promise(resolve => {
    setTimeout(() => resolve(2), 1000);
  });
}