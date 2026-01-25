import {defineCollection} from 'astro:content';
import {glob} from 'astro/loaders'

import { z } from 'astro/zod';

const blogcollection = defineCollection({
    loader: glob({pattern: '**/*.md', base: './src/content/blogs'}),
    schema:z.object({
        title:z.string(),
        description:z.string().optional(),
        pubDate:z.string().refine((date) => !isNaN(Date.parse(date)), {
            message: "Invalid date format",
        }),
        tags:z.array(z.string()).optional(),
        readtime:z.string().optional(),
        heroImage:z.string().optional(),
    })
})

const profiledata = defineCollection({
    loader: glob({ pattern: 'profile.yml', base: './src/content/' }),
    schema: z.object({
        profile: z.object({
            name: z.string(),
            title: z.string(),
            greeting: z.string(),
            tagline: z.string(),
            description: z.string(),
            email: z.string().email(),
            location: z.string(),
            roles: z.array(z.string()),
            image: z.object({
                src: z.string(),
            }),
            skills: z.array(z.string()),
        }),
    }),
});


const projectscollection = defineCollection({
    loader: glob({pattern: '**/projects.yml', base: './src/content/'}),
    schema:z.object({
        title:z.string(),
        heading:z.string(),
        description:z.string().optional(),
        projects:z.array(z.object({
            title:z.string(),
            dates:z.string().optional(),
            sourceUrl:z.string(),
            description:z.string().optional(),
            imageUrl:z.string().optional(),
            projectUrl:z.string(),
            techStack:z.array(z.string()).optional(),
            
        }))
    }),
})

const experiencecollection = defineCollection({
    loader: glob({pattern: '**/workexp.yaml', base: './src/content/'}),
    schema:z.object({
        experience:z.object({
            heading:z.string(),
            jobs: z.array(z.object({
                company:z.string(),
                position:z.string(),
                location:z.string().optional(),
                startDate:z.string(),
                endDate:z.string().optional(),
                description:z.string().optional(),
                responsibilities:z.array(z.string()),
                techStack:z.array(z.string()).optional(),
                highlights:z.array(z.string()).optional(),
            }))
        })
    })
})

export const collections = {blog:blogcollection, profile:profiledata, projects:projectscollection, experience:experiencecollection};