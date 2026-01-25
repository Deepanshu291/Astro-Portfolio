import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders'

import { z } from 'astro/zod';

const blogcollection = defineCollection({
    schema:z.object({
        title:z.string(),
        description:z.string().optional(),
        pubdate:z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        tags:z.array(z.string()).optional(),
        readtime:z.string().optional(),
        imageUrl:z.string().optional(),
    })
})

export const collections = {blog:blogcollection}