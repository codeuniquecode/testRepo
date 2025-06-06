const express = require('express');
const { renderLoginPage, validateAdmin, renderRegisterPage, saveAdmin, renderAdminDashboard, logout, handleContact, renderAllContacts, markAsRead, renderActivity, renderAddActivityPage, addActivity, deleteActivity, renderEditActivity, updateActivity, renderAccountPage, updateAccountInfo, renderSettings, updateSettings, renderNoticePage, postNotice, renderAllNotice, deleteNotice, updateNotice, updateStatus, renderVacancyPage, postVacancy, renderAllVacancy, deleteVacancy, updateVacancy, renderEditVacancyPage } = require('../controller/adminController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const router = express.Router();
// const multer = require('../middleware/multerConfig').multer;
const upload = require('../middleware/multerConfig');

const storage = require('../middleware/multerConfig').storage;
// const upload = multer({storage:storage});
router.route('/login').get(renderLoginPage).post(validateAdmin);
router.route('/adminRegister').get(renderRegisterPage).post(saveAdmin);
router.route('/adminDashboard').get(isAuthenticated,renderAdminDashboard);
router.route('/logout').get(isAuthenticated,logout);
router.route('/contacts').post(handleContact).get(isAuthenticated,renderAllContacts);
router.route('/isRead/:id').post(isAuthenticated,markAsRead);
router.route('/viewActivity').get(isAuthenticated,renderActivity);
router.route('/addActivity').get(isAuthenticated,renderAddActivityPage).post(isAuthenticated,upload.single('image'),addActivity);
router.route('/activity/:id').delete(isAuthenticated,deleteActivity).get(isAuthenticated,renderEditActivity).patch(isAuthenticated,upload.single('image'),updateActivity);
router.route('/viewAccount').get(isAuthenticated,renderAccountPage).patch(isAuthenticated,upload.single('image'),updateAccountInfo);
router.route('/setting').get(isAuthenticated,renderSettings).post(isAuthenticated,updateSettings);
router.route('/addNotice').get(isAuthenticated,renderNoticePage).post(isAuthenticated,upload.single('noticeFile'),postNotice);
router.route('/viewNotice').get(isAuthenticated,renderAllNotice);
router.route('/notice/:id').delete(isAuthenticated,deleteNotice).patch(isAuthenticated,updateStatus);
router.route('/postVacancy').get(isAuthenticated,renderVacancyPage).post(isAuthenticated,postVacancy);
router.route('/viewVacancy').get(isAuthenticated,renderAllVacancy);
router.route('/vacancy/:id').delete(isAuthenticated,deleteVacancy).patch(isAuthenticated,updateVacancy).get(isAuthenticated,renderEditVacancyPage);

module.exports= router;
