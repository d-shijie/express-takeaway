const redis=require('redis')
const client=redis.createClient({
  url: 'redis://127.0.0.1:6379',
})
client.on('error', (err) => {
  console.error("Error connecting to redis", err);
})


module.exports=client
