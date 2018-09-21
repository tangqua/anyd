const fs= require('fs')
const path=require('path')
const handlebars=require('handlebars')
const promisify=require('util').promisify
const stat=promisify(fs.stat);
const readdir=promisify(fs.readdir);
const config=require('../config/defaultconfig')
const mime=require('./mime')
const compress=require('./compress')

const tplPath=path.join(__dirname, '../template/dir.tpl')
const source=fs.readFileSync(tplPath)
const template=handlebars.compile(source.toString())

module.exports=async function (req,res,filePath) {
	try {
		const stats = await stat(filePath)
		if(stats.isFile()){
			const contentType=mime(filePath)
			res.statusCode=200;
			res.setHeader('Content-Type',contentType);
			let rs=fs.createReadStream(filePath)
			if(filePath.match(config.compress)){
				rs=compress(rs,req,res) 
			}
			rs.pipe(res);

		}else if(stats.isDirectory()){
			const files=await readdir(filePath)
			res.statusCode=200;
			res.setHeader('Content-Type','text/html');
			const dir=path.relative(config.root,filePath)
			const data={
				title:path.basename(filePath),
				dir:dir ? `/${dir}` : '',
				files:files.map(file=>{
					return {
						file,
						icon:mime(file)
					}
				})
			}
			res.end(template(data))
		}
	} catch (err) {
		
		console.error(err)
		
		res.statusCode=200;
		res.setHeader('Content-Type','text/plain');
		res.end(`${filePath} is not a file or directory`)
	}
}
