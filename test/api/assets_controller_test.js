'use-strict'

require('../test_helper.js');
const fs = require('fs');

describe("AssetController", () => {
  var postImageToServer = () => {
    return chakram.post("http://localhost:3000/assets", undefined, {
      formData: {
        file: fs.createReadStream('/Users/chrish/source/prog_image/test/fixtures/image.jpg')
      }
    });
  }

  var cleanUpFiles = () => {
    fs.readdirSync(process.cwd() + "/uploads").map((file) => {
      fs.unlinkSync(process.cwd() + "/uploads/" + file);
    });

    fs.readdirSync(process.cwd() + "/public").map((file) => {
      if(file !== ".gitignore") {
        fs.unlinkSync(process.cwd() + "/public/" + file);
      }
    });
  }

  afterEach(() => {
    cleanUpFiles();
  })

  describe("POST /assets", () => {
    it('should return 201 when posting file with multipart/form-data', () => {
      var response = postImageToServer();
      expect(response).to.have.status(201)
      return chakram.wait();
    });

    it('should return a json object representing the file', () => {
      var response = postImageToServer();
      expect(response).to.comprise.of.json({
        path: "/public/image.jpg"
      });
      return chakram.wait();
    });
  });

  describe("Get /public", () => {
    beforeEach(() => {
      fs.createReadStream("./test/fixtures/image.jpg").pipe(fs.createWriteStream("./public/image.jpg"));
    })
    it("should return the file", () => {
      var response = chakram.get("http://localhost:3000/public/image.jpg")
      expect(response).to.have.status(200)
      return chakram.wait();
    });

    it("should auto convert if the format is different", () => {
      var response = chakram.get("http://localhost:3000/public/image.png")
      expect(response).to.have.status(200)
      return chakram.wait();
    });
  });

});


