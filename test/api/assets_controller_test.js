'use-strict'

require('../test_helper.js');
const fs = require('fs');

describe("POST /assets", () => {
  var postImageToServer = () => {
    return chakram.post("http://localhost:3000/assets", undefined, {
      formData: {
        file: fs.createReadStream('/Users/chrish/source/prog_image/test/fixtures/image.jpg')
      }
    });
  }

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


