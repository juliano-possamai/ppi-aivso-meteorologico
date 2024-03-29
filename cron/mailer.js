const nodemailer = require('nodemailer');

class Mailer {

	constructor() {
		this.transporter = this.initTransporter();
		this.mailOptions = this.initMailOptions();
	}

	initTransporter() {
		return nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: 'trabs.juliano@gmail.com',
				pass: 'jmsh llwh mgyd tnzr'
			}
		})
	}

	initMailOptions() {
		return {
			from: 'trabs.juliano@gmail.com',
			to: '',
			subject: '',
			text: '',
		}
	}

	setMailOptions(to, subject, text) {
		this.mailOptions.to = to;
		this.mailOptions.subject = subject;
		this.mailOptions.text = text;
	}

	send() {
		console.log(this.mailOptions);
		if (!this.mailOptions.to || !this.mailOptions.subject || !this.mailOptions.text) {
			throw('Missing email parameters');
		}

		this.transporter.sendMail(this.mailOptions, (error, info) => {
			if (error) {
				console.error('Error sending email:', error);
			} else {
				console.log('Email sent successfully:', info.response);
			}
		});
	}

}

module.exports = Mailer;