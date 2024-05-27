import { z } from 'zod';

export const updateUserSchema = z.object({
    name: z.string().nullable(),
    email: z.string().email(),
});

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
