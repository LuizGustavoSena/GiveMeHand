import { filesToExportProps, readFileByPathName } from '@src/domain/models/fs-model';
import { readdir, readFile, readFileSync } from "fs";
import { z } from "zod";
import { formatDateNow } from './moment';

const readFileByPathName = async (pathName: string): Promise<readFileByPathName> => {
    const file = await new Promise<Buffer>((resolve) => {
        readFile(`./docs/type-emails/${pathName}.json`, (err, data) => {
            if (err) {
                console.error(err);;
                return;
            }

            resolve(data);
        });
    });

    const fileSchema = z.object({
        MAIL_SUBJECT: z.string(),
        MAIL_TEXT: z.string(),
        MAILS_TO: z.array(z.string()),
        MAILS_CC: z.array(z.string())
    });

    const fileProps = fileSchema.safeParse(JSON.parse(file.toString()));

    if (!fileProps.success)
        throw new Error(`File ${pathName} is not valid.`);

    const data = fileProps.data;
    const decrementMonth = data.MAIL_SUBJECT.includes('${-1}') ? 1 : 0;

    if (data.MAIL_SUBJECT.includes('${Date}'))
        data.MAIL_SUBJECT = data.MAIL_SUBJECT.replace('${Date}', formatDateNow(decrementMonth)).replace('${-1}', '');

    if (data.MAIL_TEXT.includes('${Date}'))
        data.MAIL_TEXT = data.MAIL_TEXT.replace('${Date}', formatDateNow(decrementMonth)).replace('${-1}', '');

    return data;
};

const filesToExport = async (): Promise<filesToExportProps[]> => {
    const nameFiles: filesToExportProps[] = [];

    const files = await filesByPath('./docs/attachments');

    files.forEach(file => {
        const base64content = readFileSync(`docs/attachments/${file}`, { encoding: 'base64' });
        nameFiles.push({
            filename: file,
            content: base64content,
            encoding: 'base64'
        });
    });

    return nameFiles;
}

export const filesByPath = async (path: string): Promise<string[]> => {
    return await new Promise((resolve) => {
        readdir(path, (err, files) => {
            if (err) {
                console.error('Error reading directory:', err);
                return;
            }

            resolve(files)
        });
    });
}

export { filesToExport, readFileByPathName };

