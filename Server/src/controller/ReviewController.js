import { getAllReviews } from "../services/ReviewService.js";

const handleGetAllReviews = async (req, res) => {
  try {
    const data = await getAllReviews();

    return res.status(data.EC === 1 ? 200 : 404).json({
      EM: data.EM,
      EC: data.EC,
      DT: data.DT,
    });
  } catch (error) {
    console.log("Error at handleGetAllReviews in ReviewController: ", error);
    return res.status(500).json({
      EM: "Error at server",
      EC: -1,
      DT: [],
    });
  }
};

export { handleGetAllReviews };