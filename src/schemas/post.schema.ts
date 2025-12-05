import z from 'zod';

export const uploadPostSchema = z
  .object({
    image: z
      .custom<File | undefined>()
      .refine(
        (image) => !image || image.size <= 5 * 1024 * 1024,
        'Max 5Mb allowed'
      )
      .refine(
        (file) =>
          !file || ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type),
        'Only PNG/JPG allowed'
      )
      .optional(),
    caption: z.string().max(300, 'Max 300 characters').optional(),
  })
  .refine(
    (data) => {
      const hasCaption = Boolean(data.caption && data.caption.trim() !== '');
      const hasFile = Boolean(data.image);

      return hasCaption || hasFile;
    },
    {
      message: 'you can not upload an empty Post',
      path: ['caption'],
    }
  );

export type UploadPostPayload = z.infer<typeof uploadPostSchema>;
