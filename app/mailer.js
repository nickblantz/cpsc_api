const mailjet = require ('node-mailjet')
  .connect('9a552e57683f59f035f4db107520db35', '6e6ef04db0e92a03e89b812db77f63c2')

const Mailer = function() {};

Mailer.sendViolationEmail = (recipientEmail, recipientName, recipientPassword, recallNumber, violationLink, responseLink)  => {
  var request = mailjet
    .post("send", {'version': 'v3.1'})
    .request({
      "Messages":[
        {
          "From": {
            "Email": "nblantz@vt.edu",
            "Name": "Nick"
          },
          "To": [
            {
              "Email": recipientEmail,
              "Name": recipientName
            }
          ],
          "Subject": "[ACTION REQUIRED] Listing was Flagged as Recalled Product",
          "TextPart": "",
          "HTMLPart": `<h4>Your listing <a href="${violationLink}">here</a> was flagged for violating this recall number ${recallNumber}<br />Go to the link provided below to respond</h4><p><a href="${responseLink}">${responseLink}</a></p><p>Email: <span style="font-weight:bold;">${recipientEmail}</span></p><p>Password: <span style="font-weight:bold;">${recipientPassword}</span></p>`,
          "CustomID": "AppGettingStartedTest"
        }
      ]
    });

  request
    .then((result) => {
      console.log(result.body)
    })
    .catch((err) => {
      console.log(err.statusCode)
    })
};

module.exports = Mailer;
