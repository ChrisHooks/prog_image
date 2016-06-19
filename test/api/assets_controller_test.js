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

  describe("POST /assets", () => {
    it('should return 201 when posting file with multipart/form-data', () => {
      var response = postImageToServer();
      expect(response).to.have.status(201)
      return chakram.wait();
    });

    it('should return a json object representing the file', () => {
      var response = postImageToServer();
      expect(JSON.parse(response.body)["path"]).to.eql("/assets/image.jpg");
      return chakram.wait();
    });
  });

  describe("Get /public", () => {
    it("should return the file", () => {
      postImageToServer();
      var response = chakram.get("http://localhost:3000/public/image.jpg")
      expect(response).to.have.status(200)
      return chakram.wait();
    });

    it("should auto convert if the format is different", () => {
      postImageToServer();
      var response = chakram.get("http://localhost:3000/public/image.png")
      expect(response).to.have.status(200)
      return chakram.wait();
    });
  });

});


