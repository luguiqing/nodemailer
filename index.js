var http = require('./lib/http');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
	//https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
	service: 'qq',
	port: 465, // SMTP 端口
	secureConnection: true, // 使用 SSL
	auth: {
		user: '1465941725@qq.com',
		//这里密码不是qq密码，是你设置的smtp密码
		pass: 'aqvxgnluohxvhdih'
	}
});


let url = "http://bm.scs.gov.cn/pp/gkweb/core-web-app/api/gkhome/result/checkWritten/20180011";

let inter;
inter = setInterval(function(){
	let data = {
		_: new Date().getTime()
	}
	http.get(url, data).then(result => {
		console.log(result);
		if(result != 0){
			// NB! No need to recreate the transporter object. You can use
			// the same transporter object for all e-mails

			// setup e-mail data with unicode symbols
			var mailOptions = {
				from: '1465941275@qq.com', // 发件地址
				to: 'luguiqing@qq.com', // 收件列表
				subject: '查成绩啦', // 标题
				//text和html两者只支持一种
				text: '查成绩啦', // 标题
				html: '<b>good luck for myself!</b>' // html 内容
			};

			// send mail with defined transport object
			transporter.sendMail(mailOptions, function(error, info) {
				if (error) {
					return console.log(error);
				}
				console.log('Message sent: ' + info.response);

			});
			clearInterval(inter);
		}
	});
}, 1000*60*10)
