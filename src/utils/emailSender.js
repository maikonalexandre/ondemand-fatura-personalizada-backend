require("dotenv").config();
const client = require("@sendgrid/mail");

const sendEmail = async (emailFrom, emailTo, subject, body, attachments) => {
  const sendgridAppKey = process.env.SENDGRID_API_KEY;
  client.setApiKey(sendgridAppKey);

  //verificar e remover emails duplicados
  emailTo = emailTo
      .split(",")
      .map((email) => email.trim())
      .filter((email, index, self) => email && self.indexOf(email) === index)
      .join(",");

  const message = {
    personalizations: [
      {
        to: emailTo.split(",").map((email) => ({
          email: email.trim(),
        })),
      },
    ],
    from: {
      email: emailFrom.email,
      name: emailFrom.nome,
    },
    subject: subject,
    content: [
      {
        type: "text/html",
        value: body,
      },
    ],
    attachments: attachments.map(({ filename, fileBuffer }) => ({
      content: fileBuffer.toString("base64"),
      filename: filename,
      disposition: "attachment",
    })),
  };

  try {
    return await client.send(message);
  } catch (error) {
    throw new Error("Erro ao enviar e-mail");
  }
};

module.exports = { sendEmail };
