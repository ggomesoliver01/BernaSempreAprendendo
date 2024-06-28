const { ImapFlow } = require("imapflow");
//
var teste;
const client = new ImapFlow({
  host: "outlook.office365.com",
  port: 993,
  secure: true,
  auth: {
    user: "planalbot@outlook.com",
    pass: "Planaltec@2675TI",
  },
  logger: false, 
});


const main = async () => {
  
    await client.connect();

    
    let lock = await client.getMailboxLock('INBOX');
    try {
        let message = await client.fetchOne(client.mailbox.exists, { source: true });
        teste = message.source.toString().split("<br>");
        console.log(teste[5])
        console.log(teste[6])
    } finally {
       
        lock.release();
    }

    await client.logout();
};

main().catch(err => console.error(err));