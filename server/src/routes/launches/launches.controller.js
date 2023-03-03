const {
  getAllLaunches,
  addNewLaunches,
  existsWithLaunchId,
  abortByLaunchId,
} = require("../../models/launches.model");

function httpGetAllLaunches(req, res) {
  res.sendStatus(200).json(getAllLaunches());
}

function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.sendStatus(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.sendStatus(400).json({
      error: "Invalid launch Date",
    });
  }
  addNewLaunches(launch);
  return res.sendStatus(201).json(launch);
}

function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  // if launch id doesn't exist
  if (!existsWithLaunchId(launchId)) {
    res.sendStatus(400).json({
      error: "Launch not found",
    });
  }

  // if launch id  exist
  const aborted = abortByLaunchId(launchId);
  res.sendStatus(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
