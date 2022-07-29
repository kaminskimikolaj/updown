const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');

const port = 3000;

app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.post('/fileupload', upload.single('filetoupload'), (req, res, next) => {
	try {
        	return res.status(201).json({
			message: 'File uploded successfully'
        	});
	} catch (error) {
		console.error(error);
	}
});

app.get('/', function(req, res) {
	res.send(`
		<form action="fileupload" method="post" enctype="multipart/form-data">
			<input type="file" name="filetoupload"><br>
			<input type="submit">
		</form>
	`)
})
app.listen(port, () => console.log(`app listening on port ${port}!`));
