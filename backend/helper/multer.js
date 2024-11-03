import multer from 'multer';

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        
        
        cb(null, `${Date.now()}-${file.originalname}`);
    }
})

const upload = multer({ storage: storage })
    .fields([
        {
            name: 'frontImage',
            maxCount: 1
        },
        {
            name: 'audioFile',
            maxCount: 1
        },
    ]);

export default upload;

// app.post('/upload', upload.single('image'), async (req, res) => {
//     // console.log(req.body)
//     try {
//         return res.status(200).json({
//             status: 'success',
//             message: 'Successfully uploded Img!'
//         })
//     } catch (err) {
//         return res.status(500).json({
//             status: 'failed',
//             message: 'Failed uplode  Img!'
//         })
//     }

// })