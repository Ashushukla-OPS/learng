const JournalModel = require("../model/journal.model");

const searchcontroller = async (req, res) => {
  try {
    let { search, difficultyLevel } = req.query;

    const filter = {
      userId: req.user._id,
    };

    if (search) {
      filter.topicName = {
        $regex: String(search),
        $options: "i",
      };
    }

    if (difficultyLevel) {
      filter.difficultyLevel = difficultyLevel;
    }

    const journals = await JournalModel.find(filter).sort({
      createdAt: -1,
    });

    if (journals.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No journals found",
      });
    }

    return res.status(200).json({
      success: true,
      count: journals.length,
      journals,
    });
  } catch (error) {
    console.log("Search journal error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = searchcontroller;