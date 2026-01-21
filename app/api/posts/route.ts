import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
    try {
        const { title, category, content } = await request.json();

        if (!title || !category || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const slug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

        const categoryDir = path.join(process.cwd(), 'content', category);

        if (!fs.existsSync(categoryDir)) {
            fs.mkdirSync(categoryDir, { recursive: true });
        }

        const filePath = path.join(categoryDir, `${slug}.md`);

        if (fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Post with this title already exists in this category' }, { status: 400 });
        }

        const fileContent = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
---

${content}
`;

        fs.writeFileSync(filePath, fileContent, 'utf-8');

        return NextResponse.json({ success: true, slug, category });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { title, category, content, oldSlug, oldCategory } = await request.json();

        if (!title || !category || !content || !oldSlug || !oldCategory) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const newSlug = title
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');

        const oldFilePath = path.join(process.cwd(), 'content', oldCategory, `${oldSlug}.md`);
        const newCategoryDir = path.join(process.cwd(), 'content', category);
        const newFilePath = path.join(newCategoryDir, `${newSlug}.md`);

        if (!fs.existsSync(oldFilePath)) {
            return NextResponse.json({ error: 'Original post not found' }, { status: 404 });
        }

        if (!fs.existsSync(newCategoryDir)) {
            fs.mkdirSync(newCategoryDir, { recursive: true });
        }

        const fileContent = `---
title: "${title}"
date: "${new Date().toISOString().split('T')[0]}"
---

${content}
`;

        // If slug or category changed, delete the old file
        if (oldFilePath !== newFilePath) {
            fs.unlinkSync(oldFilePath);
        }

        fs.writeFileSync(newFilePath, fileContent, 'utf-8');

        return NextResponse.json({ success: true, slug: newSlug, category });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { slug, category } = await request.json();

        if (!slug || !category) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const filePath = path.join(process.cwd(), 'content', category, `${slug}.md`);

        if (!fs.existsSync(filePath)) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        fs.unlinkSync(filePath);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
    }
}
