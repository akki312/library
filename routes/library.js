const sendResponse = require("../lib/sendResponse");
const logger = require("../loaders/logger")

const {libraryService} = require("../services/library")

const routes = (module.exports = require("express")());

routes.post("/insertBooks", async function (req, res, next) {
try{
    console.log(process.env.MONGODB_CONNECTIONSTRING || CONFIG.MONGODB_CONNECTIONSTRING,"-----------mongo")
    console.log(req.body,"into routes=======")
    logger.info("into routes----------")
    let data = await libraryService.createBooks(req.body);
    res.status(200).send(data);

}catch(err){
    await sendResponse(err, res);
}
});
module.exports = router;