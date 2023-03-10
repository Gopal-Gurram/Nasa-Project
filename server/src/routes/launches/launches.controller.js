const {
  getAllLaunches,
  scheduleNewLaunch,
  existsWithLaunchId,
  abortByLaunchId,
} = require("../../models/launches.model");

async function httpGetAllLaunches(req, res) {
  return res.status(200).json(await getAllLaunches());
}

async function httpAddNewLaunch(req, res) {
  const launch = req.body;
  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: "Invalid launch Date",
    });
  }
  await scheduleNewLaunch(launch);
  return res.status(201).json(launch);
}

async function httpAbortLaunch(req, res) {
  const launchId = req.params.id;

  // if launch id doesn't exist
  const existLaunch = await existsWithLaunchId(launchId);
  if (!existLaunch) {
    return res.status(400).json({
      error: "Launch not found",
    });
  }

  // if launch id  exist
  const aborted = await abortByLaunchId(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch aborted failed",
    });
  }
  return res.status(200).json(aborted);
}

module.exports = { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
