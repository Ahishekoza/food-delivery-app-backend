import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join('D:', 'FoodDelivery', 'Backend', 'public', 'temp'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const uploadImage = multer({ storage: storage });
