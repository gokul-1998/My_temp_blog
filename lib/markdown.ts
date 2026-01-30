import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const contentDirectory = path.join(process.cwd(), 'content');

export type Post = {
    slug: string;
    category: string;
    title: string;
    date: string;
    content: string;
    fileName: string;
};

export function getCategories() {
    return fs.readdirSync(contentDirectory).filter((file) => {
        return fs.statSync(path.join(contentDirectory, file)).isDirectory();
    });
}

export function getPostSlugs(category: string) {
    const categoryPath = path.join(contentDirectory, category);
    if (!fs.existsSync(categoryPath)) return [];
    return fs.readdirSync(categoryPath).filter((file) => file.endsWith('.md'));
}

export async function getPostBySlug(category: string, fileName: string): Promise<Post> {
    const fullPath = path.join(contentDirectory, category, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const { data, content } = matter(fileContents);

    // Use remark to convert markdown into HTML string
    const processedContent = await remark()
        .use(html)
        .process(content);
    const contentHtml = processedContent.toString();

    // If title is not in frontmatter, use filename
    const title = data.title || fileName.replace(/\.md$/, '');
    const date = data.date || fs.statSync(fullPath).mtime.toISOString();

    // Slug for URL (simple filename without extension)
    const slug = fileName.replace(/\.md$/, '');

    return {
        slug,
        category,
        title,
        date,
        content: contentHtml,
        fileName,
    };
}

export async function getAllPosts(): Promise<Post[]> {
    const categories = getCategories();
    const allPosts: Post[] = [];

    for (const category of categories) {
        const fileNames = getPostSlugs(category);
        for (const fileName of fileNames) {
            const post = await getPostBySlug(category, fileName);
            allPosts.push(post);
        }
    }

    // Sort posts by date
    return allPosts.sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
}
