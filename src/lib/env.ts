import { z } from "zod";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    MAIL_HOST: z.string(),
    MAIL_PORT: z.coerce.number(),
    MAIL_USER: z.string(),
    MAIL_PASS: z.string(),
    MAIL_FROM: z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success)
    throw new Error(`Invalid environment variables:  ${JSON.stringify(_env.error.format())}`);

export const env = _env.data;