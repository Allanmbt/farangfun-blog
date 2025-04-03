import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import remarkGfm from 'remark-gfm';

export const Blog = defineDocumentType(() => ({
    name: 'Blog',
    filePathPattern: `blog/**/*.mdx`,
    contentType: 'mdx',
    fields: {
        title: {
            type: 'string',
            required: true,
        },
        description: {
            type: 'string',
            required: true,
        },
        date: {
            type: 'date',
            required: true,
        },
        lastUpdated: { type: 'date', required: false },
        image: {
            type: 'string',
            required: false,
        },
        author: {
            type: 'string',
            required: true,
        },
        tags: {
            type: 'list',
            of: { type: 'string' },
            required: false,
        },
        viewCount: {
            type: 'number',
            required: false,
            default: 0,
        },
    },
    computedFields: {
        slug: {
            type: 'string',
            resolve: (doc) => doc._raw.flattenedPath.replace(/^blog\//, ''),
        },
        url: {
            type: 'string',
            resolve: (post) => `/blog/${post._raw.flattenedPath.replace(/^blog\//, '')}`,
        },
    },
}));

const rehypePrettyCodeOptions = {
    theme: 'github-dark',
    onVisitLine(node) {
        if (node.children.length === 0) {
            node.children = [{ type: 'text', value: ' ' }];
        }
    },
    onVisitHighlightedLine(node) {
        node.properties.className.push('highlighted');
    },
    onVisitHighlightedWord(node) {
        node.properties.className = ['word'];
    },
};

export default makeSource({
    contentDirPath: 'content',
    documentTypes: [Blog],
    mdx: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, rehypePrettyCodeOptions],
            [
                rehypeAutolinkHeadings,
                {
                    properties: {
                        className: ['anchor'],
                    },
                },
            ],
        ],
    },
});