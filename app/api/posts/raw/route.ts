import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category');
        const slug = searchParams.get('slug');

        if (!category || !slug) {
            return NextResponse.json({ error: 'Missing category or slug' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'content', category, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data, content } = matter(fileContents);

        return NextResponse.json({
            success: true,
            title: data.title,
            content: content.trim()
        });
    } catch (error) {
        console.error('Error fetching raw post:', error);
        return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 });
    }
}
