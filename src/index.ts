import { FilenameEnum } from "./domain/enums/filename-enum";
import { InformationInfo } from "./domain/information-info";
import { filesToExport, readFileByPathName } from "./lib/fs";
import { sendEmail } from "./lib/nodemailer";
import { askByQuestion, close } from "./lib/readline";

async function execute() {
  const typeEmail = (await askByQuestion('Is a Measurement(m) ou Invoicing(i)?')).toUpperCase() as keyof typeof FilenameEnum;

  if (!FilenameEnum[typeEmail])
    throw new Error('Invalid type of email. Please use "m" or "i" to proceed.');

  const extraInfo = await readFileByPathName(FilenameEnum[typeEmail]);
  const attachments = await filesToExport()

  const informations = new InformationInfo({
    TYPE_EMAIL: FilenameEnum[typeEmail],
    attachments: attachments.map(el => el.filename).join(', '),
    ...extraInfo
  });

  console.table(informations);

  const affirmative = await askByQuestion('Proceed with this informations? (y/n)');

  if (affirmative.toLowerCase() !== 'y') {
    console.log('Please alter the information in env file and try again.');
    return close();
  }

  sendEmail({
    to: extraInfo.MAILS_TO.join(', '),
    subject: extraInfo.MAIL_SUBJECT,
    text: extraInfo.MAIL_TEXT,
    attachments
  });

  close();
}

execute();

