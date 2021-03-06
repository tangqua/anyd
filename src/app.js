const http=require('http')
const conf=require('./config/defaultconfig')
const path=require('path')
const chalk=require('chalk')
const route=require('./helper/route')
const openUrl=require('./helper/openUrl')

class Server {
	constructor (config) {
		this.conf=Object.assign({},conf,config);
	}
	start () {
		const server=http.createServer((req,res)=>{
			const filePath=path.join(this.conf.root,req.url);
			route(req,res,filePath,this.conf)

		})

		server.listen(this.conf.port,this.conf.hostname,()=>{
			const str=`http://${this.conf.hostname}:${this.conf.port}`;
			console.info(`服务启动：${chalk.red(str)}`);
			openUrl(str)
		})
	}
}

module.exports=Server
