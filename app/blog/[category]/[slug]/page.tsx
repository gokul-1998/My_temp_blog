import { getPostBySlug, getPostSlugs, getCategories } from '@/lib/markdown';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import PostActions from '@/components/PostActions';

export async function generateStaticParams() {
    const categories = getCategories();
    const params = [];

    for (const category of categories) {
        const slugs = getPostSlugs(category);
        for (const fileName of slugs) {
            params.push({
                category,
                slug: fileName.replace(/\.md$/, ''),
            });
        }
    }

    return params;
}

export default async function PostPage(props: { params: Promise<{ category: string; slug: string }> }) {
    const { category, slug } = await props.params;
    const decodedSlug = decodeURIComponent(slug);
    const fileName = `${decodedSlug}.md`;

    try {
        const post = await getPostBySlug(category, fileName);

        return (
            <article className="animate">
                <header className="post-header">
                    <div className="container">
                        <div className="post-header-inner">
                            <div className="post-header-info">
                                <span className="post-category-tag">{category.replace('_', ' ')}</span>
                                <h1>{post.title}</h1>
                                <div className="post-date">{format(new Date(post.date), 'MMMM dd, yyyy')}</div>
                            </div>
                            <PostActions slug={decodedSlug} category={category} />
                        </div>
                    </div>
                </header>

                <div className="container">
                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                </div>
            </article>
        );
    } catch (error) {
        console.error(error);
        notFound();
    }
}
