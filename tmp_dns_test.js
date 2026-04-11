const dns = require('dns');
console.log('Node DNS servers:', dns.getServers());
dns.resolveSrv('_mongodb._tcp.wellwigen.lrq8rlk.mongodb.net', (err, res) => {
  console.log('resolveSrv default:', err ? err : res);
  dns.setServers(['8.8.8.8']);
  console.log('Node DNS servers after set:', dns.getServers());
  dns.resolveSrv('_mongodb._tcp.wellwigen.lrq8rlk.mongodb.net', (err2, res2) => {
    console.log('resolveSrv 8.8.8.8:', err2 ? err2 : res2);
  });
});
