import ApiError from "../exeptions/api-error.js";

export default function (err, req, res, next) {
  console.log(err);

  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.erorrs });
  }

  return res.status(500).json({ message: "Unhandled error" });
}
