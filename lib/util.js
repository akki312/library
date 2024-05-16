async function errorHandler(err) {
    try {
      let errJson = await JSON.parse(
        await err.toString().split("\n")[0].split("Error:")[1]
      );
      // if (errJson.Error.Error) {
      //     errJson.Error = errJson.Error.Error;
      // }
      // console.log(errJson, "errJson");
      return errJson;
    } catch (error) {
      // console.log(error, "err---");
      return await { error: err.toString().split("\n")[0] };
    }
  }
  exports.errorHandler = errorHandler;
