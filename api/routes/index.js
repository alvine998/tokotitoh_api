const { middlewareHere, middlewarePackageName } = require('../middleware/index.js');
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../../upload'))
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file?.originalname}`)
    }
})
const upload = multer({
    storage: storage
})

module.exports = (app) => {
    const cPartner = require('../controllers/partner.js');
    const cUpload = require('../controllers/upload.js');
    const cCategory = require('../controllers/category.js');
    const cSubCategory = require('../controllers/subcategory.js');
    const cBrand = require('../controllers/brand.js');
    const cType = require('../controllers/type.js');
    const cUser = require('../controllers/user.js');
    const cGeolocation = require('../controllers/geolocation.js');
    const cReport = require('../controllers/report.js');
    const cAds = require('../controllers/ads.js');
    const cNotification = require('../controllers/notification.js');
    const cMailer = require('../controllers/mailer.js');

    app.get('/partners', middlewareHere, cPartner.list);
    app.post('/partner', middlewareHere, cPartner.create);
    app.patch('/partner', middlewareHere, cPartner.update);
    app.delete('/partner', middlewareHere, cPartner.delete);

    app.post('/file-upload', upload.single('file'), cUpload.upload);
    app.post('/sendmail', middlewareHere, cMailer.sendEmail);
    app.post('/sendmail/verification/registration', middlewareHere, cMailer.sendEmailVerificationRegister);

    app.get('/provinces', middlewareHere, cGeolocation.listProvince);
    app.get('/cities', middlewareHere, cGeolocation.listCity);
    app.get('/districts', middlewareHere, cGeolocation.listDistrict);
    app.get('/villages', middlewareHere, cGeolocation.listVillage);

    app.get('/categories', middlewareHere, middlewarePackageName, cCategory.list);
    app.post('/category', middlewareHere, middlewarePackageName, cCategory.create);
    app.patch('/category', middlewareHere, middlewarePackageName, cCategory.update);
    app.delete('/category', middlewareHere, middlewarePackageName, cCategory.delete);

    app.get('/subcategories', middlewareHere, middlewarePackageName, cSubCategory.list);
    app.post('/subcategory', middlewareHere, middlewarePackageName, cSubCategory.create);
    app.patch('/subcategory', middlewareHere, middlewarePackageName, cSubCategory.update);
    app.delete('/subcategory', middlewareHere, middlewarePackageName, cSubCategory.delete);

    app.get('/brands', middlewareHere, middlewarePackageName, cBrand.list);
    app.post('/brand', middlewareHere, middlewarePackageName, cBrand.create);
    app.patch('/brand', middlewareHere, middlewarePackageName, cBrand.update);
    app.delete('/brand', middlewareHere, middlewarePackageName, cBrand.delete);

    app.get('/types', middlewareHere, middlewarePackageName, cType.list);
    app.post('/type', middlewareHere, middlewarePackageName, cType.create);
    app.patch('/type', middlewareHere, middlewarePackageName, cType.update);
    app.delete('/type', middlewareHere, middlewarePackageName, cType.delete);

    app.get('/users', middlewareHere, middlewarePackageName, cUser.list);
    app.post('/user', middlewareHere, middlewarePackageName, cUser.create);
    app.patch('/user', middlewareHere, middlewarePackageName, cUser.update);
    app.delete('/user', middlewareHere, middlewarePackageName, cUser.delete);
    app.post('/user/login', middlewareHere, middlewarePackageName, cUser.login);
    app.post('/user/verification', middlewareHere, middlewarePackageName, cUser.verificationResetPassword);
    app.post('/user/verification/registration', middlewareHere, middlewarePackageName, cUser.verificationRegistration);
    app.post('/user/login/by/google', middlewareHere, middlewarePackageName, cUser.loginbygoogle);

    app.get('/reports', middlewareHere, middlewarePackageName, cReport.list);
    app.post('/report', middlewareHere, middlewarePackageName, cReport.create);
    app.patch('/report', middlewareHere, middlewarePackageName, cReport.update);
    app.delete('/report', middlewareHere, middlewarePackageName, cReport.delete);

    app.get('/notifications', middlewareHere, middlewarePackageName, cNotification.list);
    app.post('/notification', middlewareHere, middlewarePackageName, cNotification.create);
    app.patch('/notification', middlewareHere, middlewarePackageName, cNotification.update);
    app.delete('/notification', middlewareHere, middlewarePackageName, cNotification.delete);

    app.get('/ads', middlewareHere, middlewarePackageName, cAds.list);
    app.post('/ads', middlewareHere, middlewarePackageName, cAds.create);
    app.post('/ads/calls', middlewareHere, middlewarePackageName, cAds.updateCalls);
    app.post('/ads/views', middlewareHere, middlewarePackageName, cAds.updateViews);
    app.patch('/ads', middlewareHere, middlewarePackageName, cAds.update);
    app.delete('/ads', middlewareHere, middlewarePackageName, cAds.delete);
}