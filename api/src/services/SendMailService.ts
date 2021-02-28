import nodemailer from 'nodemailer'


class SendMailSerrvice {

    constructor() {
        nodemailer.createTestAccount()
    }

    async execute() {

    }

}

export { SendMailSerrvice }