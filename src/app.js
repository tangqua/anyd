const http=require('http')
const conf=require('./config/defaultconfig')
const path=require('path')
const chalk=require('chalk')
const route=require('./helper/route')

const server=http.createServer((req,res)=>{
	const filePath=path.join(conf.root,req.url);
	route(req,res,filePath)

})

server.listen(conf.port,conf.hostname,()=>{
	const str=`http://${conf.hostname}:${conf.port}`;
	console.info(`服务启动：${chalk.red(str)}`);
	
})
