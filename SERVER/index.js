const dgram = require('node:dgram');
const dnsPacket = require('dns-packet');

const server = dgram.createSocket('udp4');

const db = {
  'piyushgarg.dev':{
    type:'A',
    data:'1.2.3.4',
  },
  'blog.piyushgarg.dev': {
    type:'CNAME',
    data:'hashnode.network'
  },'paras.com': {
    type: 'CNAME',
    data: 'pallavi.com',
  },
  'pallavi.com': {
    type: 'A',
    data: '1.2.3.4',
  }
};

server.on('error', (err) => {
  console.error('Server error:');
  console.error(err.stack);
  server.close();
});

server.on('message', (msg, rinfo) => {
  try {
    const incomingMessage = dnsPacket.decode(msg);

    console.log(incomingMessage.questions[0]);

    const queryName = incomingMessage.questions[0].name;
    const ipFromDb = db[queryName];

    if (ipFromDb) {
      const answer = dnsPacket.encode({
        type: 'response',
        id: incomingMessage.id,
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions: incomingMessage.questions,
        answers: [{
          type:ipFromDb.type,
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
    console.error('Error handling message:', error);
  }
});

server.on('listening', () => {
  const address = server.address();
  console.log(`DNS Server is running on port 53`);
});

server.bind(53);
