const venom = require('venom-bot');
const cron = require('cron')
const CronJob = cron.CronJob;

venom.defaultLogger.level = 'silly';

const createVenomClient = async () => {
  console.log('CRIANDO CLIENT')
  const client = await venom.create()
  return client
}

const sendMessage = (number, message, client) => {
  console.log('ENVIANDO MENSAGEM')
  client.sendText(number, message)
  .then((result) => {
    console.log('Result: ', result);
  })
  .catch((erro) => {
    console.error('Error when sending: ', erro);
  });
}

const creatLogs = (client) => {
  console.log('CRIANDO LOGS')
  client.onMessage((message) => {
    console.log('MENSAGEM RECEBIDA')
    console.log(message)
    if (message.body === 'oi') {
      client
        .sendText(message.from, 'Abacate')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}

const createJob = (client) => {
  console.log('CRIANDO JOB')
  const job = new CronJob('*/15 * * * * *', function() {
    console.log('EXECUTANDO JOB')
    //sendMessage('554399813475@c.us', `Teste do Robô do Diogo. Agora são: ${new Date().toLocaleTimeString()}`, client)
    sendMessage('5543933000663-1611408684@g.us', `Teste do Robô do Diogo. Agora são: ${new Date().toLocaleTimeString()}`, client)
  }, null, true, 'America/Sao_Paulo');
  return job;
}

const run = async () => {
  const client = await createVenomClient();
  creatLogs(client)
  //const job = createJob(client)
  //job.start()
}

run();