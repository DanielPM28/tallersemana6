
var express = require('express');
var app = express();
const multer = require('multer'); // Para subir imágenes
const path = require('path');
const bodyParser = require('body-parser');

// set the view engine to ejs
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));


// Base de datos de usuarios (solo para fines de demostración)
const users = [
    { id: 1, username: 'usuario1', password: '$2b$10$cl2udNh2b9gIYya2hRcT/uQW0NfzEwKYY4PdEDDqSyZ6GrTqRcxgK' } // Contraseña: password1
];

// Middleware de autenticación

// Middleware de autenticación

// use res.render to load up an ejs view file

// index page
app.get('/', function(req, res) {
    res.render('pages/index');
    
});
app.get('/index',function(req, res) {
    res.render('pages/index');
});
// about page
app.get('/about' ,function(req, res) {
    res.render('pages/about');
});

app.use(bodyParser.urlencoded({ extended: true }));

// contact page
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

app.post('/submit', (req, res) => {
    // Procesar los datos recibidos del formulario
    const nombre = req.body.nombre;
    const email = req.body.email;
    const mensaje = req.body.mensaje;

    // Aquí puedes hacer lo que necesites con los datos, como almacenarlos en una base de datos, enviar un correo electrónico, etc.
    
    // Por ahora, simplemente mostraremos los datos procesados en la consola y enviaremos una respuesta de éxito al cliente
    console.log('Nombre:', nombre);
    console.log('Email:', email);
    console.log('Mensaje:',mensaje)
    res.send('¡Formulario enviado con éxito!');
    
});

// about page
// Configuración de Multer para manejar la carga de archivos
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });


// Ruta para manejar la carga de imágenes
app.post('/subir-imagen', upload.single('imagen'), (req, res) => {
    if (req.file) {
        console.log('Imagen subida:', req.file.filename);
        res.send('Imagen subida con éxito.');
    } else {
        res.status(400).send('No se seleccionó ninguna imagen.');
    }
});

// Ruta para servir las imágenes subidas
app.use('/uploads', express.static('uploads'));


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('¡Algo salió mal!');
});


app.listen(8080);
console.log('8080 is the magic port');