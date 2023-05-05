const fastify = require('fastify')
const dotenv = require('dotenv');
const user = require('./models/user');
const connection = require('./db');
const env = dotenv.config()
const csvParser = require('csv-parser')
const fs = require('fs')

//  db connection
connection()

const app = fastify()

// parse requests of content-type - application/json
app.addContentTypeParser('application/json', { parseAs: 'string' }, function (req, body, done) {
  console.log("body++", body);
  try {
    var json = JSON.parse(body)
    done(null, json)
  } catch (err) {
    err.statusCode = 400
    done(err, undefined)
  }
})

// app.get('/unmatchednumlist', async function (request, reply) {
//   try {
//     const results = [];
//     fs.createReadStream('./RCF Revised Contact Number data.csv')
//       .pipe(csvParser())
//       .on('data', (data) => results.push(data))
//       .on('end', async () => {
//         let notmatchedlist = await results.filter(
//           (mobile) => !results.some((correctmobileno) => correctmobileno.correct_contact_no === mobile.mobile_no)
//         );
//         getvalue(notmatchedlist)

//       });
//     const data = getvalue()
//     console.log("ppp", await data);
//   } catch (error) {
//   }
// })


//routes///
const route = require('./routes/user');
const { parse } = require('path');
const rcf = require('./models/rcf');
app.register(route)


app.get('/', async function (request, reply) {
  try {
    // const data =  await user.find()
    const results = await new Promise((resolve, reject) => {
      rcf.find({}, (err, res) => {

        if (err) {
          reject(err)
          return;
        }
        // console.log('res', res);
        resolve(res);
        return
      })
    })
    let notmatchedlist = await results.filter(
      (mobile) => !results.some((correctmobileno) => correctmobileno.correct_contact_no === mobile.mobile_no)
    );
    reply.send({ message: "server started", data: notmatchedlist })

  } catch (error) {
    console.log("data===", error);

  }

})
const os = require('os');
const cron = require('node-cron');

const currentIpAddress = (function() {
  const ifaces = os.networkInterfaces();
  let ipAddress;

  Object.keys(ifaces).forEach(function(ifname) {
    ifaces[ifname].forEach(function(iface) {
      if (iface.family !== 'IPv4' || iface.internal !== false) {
        // skip over internal (i.e. 127.0.0.1) and non-IPv4 addresses
        return;
      }

      ipAddress = iface.address;
    });
  });

  return ipAddress;
})();
const expectedIpAddress = '192.168.0.167';

console.log('IP Address:', currentIpAddress);
if (currentIpAddress !== expectedIpAddress) {

}else{
  console.log("not done!")

}




// Start the server
app.listen(8000, function (err, address) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening on ${address}`)
})