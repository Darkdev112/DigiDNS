const dgram = require('node:dgram');
const dnsPacket = require('dns-packet');
const axios = require('axios');

const server = dgram.createSocket('udp4');

server.on('error', (err) => {
  console.error('Server error:');
  console.error(err.stack);
  server.close();
});

server.on('message', async (msg, rinfo) => {
  try {
    const incomingMessage = dnsPacket.decode(msg);

    console.log(incomingMessage.questions[0]);

    const queryName = incomingMessage.questions[0].name;

    try {
      const response = await axios.get('http://localhost:5000/dnsQuery', {
        params: { hostname: queryName }
      });

      const ipFromDb = response.data;

      // console.log("data",ipFromDb);

      if (ipFromDb) {
        const answer = dnsPacket.encode({
          type: 'response',
          id: incomingMessage.id,
          flags: dnsPacket.AUTHORITATIVE_ANSWER,
          questions: incomingMessage.questions,
          answers: [{
            type: ipFromDb.type,
            class: 'IN',
            name: queryName,
            data: ipFromDb.data,
          }]
        });

        server.send(answer, rinfo.port, rinfo.address);
      } else {
        console.log(`Domain not found: ${queryName}`);
      }

    } catch (error) {
      console.error('Error fetching DNS record:', error);
    }

  } catch (error) {
    console.error('Error handling message:', error);
  }
});

// server.on('message',(msg,rinfo)=>{
//     console.log('Incoming message',msg.toString())
// })

server.on('listening', () => {
  const address = server.address();
  console.log(`DNS Server is running on port 53`);
});

console.log("server is up and running");

server.bind(53);