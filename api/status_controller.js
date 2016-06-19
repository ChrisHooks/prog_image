'use-strict'

const StatusController = {
  show: (req, res, next) => {
    res.status(200).send({name: "ProgImage"});
  }
}

module.exports = StatusController;
