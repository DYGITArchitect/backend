import nodemailer from "nodemailer";

class MailService {
  constructor() {
    // this.transporter = nodemailer.createTransport({
    //   host: process.env.SMTP_HOST,
    //   port: process.env.SMTP_PORT,
    //   secure: false,
    //   auth: {
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS,
    //   },
    // });
  }

  async sendActivationMail(email, activationLink) {
    // await this.transporter.sendMail({
    //   from: process.env.SMTP_USER,
    //   to: email,
    //   subject: "Activation link: " + process.env.API_URL,
    //   text: "",
    //   html: `
    //     <div>
    //       <h1>Activation link here</h1>
    //       <a href="${activationLink}">${activationLink}</a>
    //     </div>
    //   `,
    // });
  }
}

export default new MailService();
