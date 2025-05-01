import ReadLine from 'node:readline';

const rl = ReadLine.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const askByQuestion = (question: string): Promise<string> => {
    return new Promise((resolve) => {
        rl.question(question, (answer) => {
            resolve(answer);
        });
    });
};

const close = () => {
    rl.close();
}

export { askByQuestion, close };

