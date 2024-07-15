import dotenv from 'dotenv';
import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/api/send-emails', async (req, res) => {
  const { template, dataset } = req.body;
  console.log({template, dataset});

  try {
    for (const recipient of dataset) {
      const customMessage = template
        .replace(/{{ recipient_name }}/g, recipient.recipient_name)
        .replace(/{{ company_name }}/g, recipient.company_name)
        .replace(/{{ job_link }}/g, recipient.job_link)
        .replace(/{{ job_type }}/g, recipient.job_type);

      let info = await transporter.sendMail({
        from: `"Shubham Pal" <${process.env.EMAIL_USER}>`,
        to: recipient.recipient_email,
        subject: `Application For ${recipient.job_type} at ${recipient.company_name}`,
        html: customMessage,
      });

      console.log(`Message sent to ${recipient.recipient_email}: %s`, info.messageId);
    }

    res.json({ message: `${dataset.length} emails sent successfully.` });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Error sending emails' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});