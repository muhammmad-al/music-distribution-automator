import express, { Request, Response } from 'express';
import multer from 'multer'; 
import path from 'path';

const app = express();
const port = 3000; 

app.use(express.static(path.join(__dirname))); 

// configure multer for .wav files
const upload = multer({
    dest: 'uploads/', 
    fileFilter: (req, file, cb) => {
        console.log('Incoming file:', file);
        const ext = path.extname(file.originalname).toLowerCase();
        console.log('File extension:', ext);

        if (ext === '.wav') {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Only .wav files allowed')); 
        }
    }
});

// serve test HTML file
app.get('/upload-test', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'test.html'));
});

// file upload route
app.post('/upload', upload.single('beat'), (req: Request & { file?: Express.Multer.File }, res: Response) => {
    if(!req.file) {
        return; 
    }
    res.json({
        message: 'File uploaded successfuly',
        file: req.file
    });
});

app.listen(port, () => {
    console.log(`Server is running at port: ${port}`); 
});