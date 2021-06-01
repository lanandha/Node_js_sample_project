/*

GEREKLİ PAKETLER YÜKLENİYOR...

*/
var http = require('http');
var express = require('express');
const scanner = require('node-wifi-scanner');
var wifi = require('node-wifi');

var app = express();

app.set('port', process.env.PORT || 3005); // GİRİŞ PORTU AYARLANDI
app.set('views', __dirname + '/app/server/views'); // VIEW KLASÖRÜ TANITILDI
app.set('view engine', 'ejs'); // VIEW ENGINE AYARLANDI
app.use(express.static(__dirname + '/app/public')); // KULLANICILAR TARAFINDAN ERİŞİLEBİLEN KLASÖR TANIMLANDI

require('./app/routes')(app); // ROUTE DOSYASI ÇAĞIRILDI

//https://www.npmjs.com/package/node-wifi-scanner
app.get('/get',(req,res)=>{
scanner.scan((err, networks) => {
	if (err) {
	  console.error(err);
	  return;
	}
	console.log(networks);
	res.send({" wifi list successful":networks});
  });
});

//https://www.npmjs.com/package/node-wifi

app.get('/list',(req,res)=>{
	wifi.init({
		iface: null // network interface, choose a random wifi interface if set to null
	  });
	wifi.scan((error, networks) => {
		if (error) {
		  console.log(error);
		} else {
		  console.log(networks);
		res.send({" wifi list successful":networks});
		}
	  });
	});

/*

HTTP SERVER OLUŞTURULDU

*/
http.createServer(app).listen(app.get('port'), function(){
	console.log('Lisening on port address ' + app.get('port'));
});
