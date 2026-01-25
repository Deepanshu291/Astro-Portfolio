import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface ProjectCardProps {
  title: string;
  dates: string;
  sourceUrl?: string;
  description: string;
  imageUrl: string;
  projectUrl: string;
  technologies: string[];
}

export interface BlogCardProps {
  title: string;
  pubdate: string;
  readtime: string;
  description: string;
  imageUrl?: string;
  projectUrl?: string;
  tags?: string[];
}