const multer = require('multer');

// Configuration de Multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/') // Dossier où les fichiers téléchargés seront enregistrés
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Nom du fichier sauvegardé
    }
});

const upload = multer({ storage: storage });

module.exports = upload;