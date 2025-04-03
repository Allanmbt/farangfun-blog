import { Metadata } from "next";

interface SEOProps {
    title: string;
    description: string;
    url?: string;
    ogImage?: string;
    canonical?: string;
    publishDate?: string;     // 发布日期
    lastUpdated?: string;     // 最后更新日期
}

export function constructMetadata({
    title,
    description,
    url = "https://farangfun.com",
    ogImage = "/og-image.jpg",
    canonical,
    publishDate,
    lastUpdated,
}: SEOProps): Metadata {
    // 基础元数据
    const metadata: Metadata = {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: "FarangFun",
            locale: "en_US",
            type: "website",
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [ogImage],
        },
        alternates: {
            canonical: canonical || url,
        },
        metadataBase: new URL(url),
    };

    // 添加日期相关元数据（如果存在）
    if (publishDate) {
        if (!metadata.openGraph) metadata.openGraph = {};
        metadata.openGraph.publishedTime = publishDate;
    }

    if (lastUpdated) {
        if (!metadata.openGraph) metadata.openGraph = {};
        metadata.openGraph.modifiedTime = lastUpdated;
    }

    return metadata;
}

export function generateBlogJsonLd(post: any) {
    // 确保所有日期格式正确（ISO 8601格式）
    const formatDate = (dateString: string): string => {
        if (!dateString) return '';
        // 尝试解析日期，如果已经是ISO格式则不变
        const date = new Date(dateString);
        return isNaN(date.getTime()) ? dateString : date.toISOString();
    };

    const publishDate = formatDate(post.date);
    const modifiedDate = formatDate(post.lastUpdated || post.date);

    return {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        author: {
            "@type": "Person",
            name: post.author || "FarangFun",
        },
        datePublished: publishDate,
        dateModified: modifiedDate,
        image: post.image || "/images/og-image.jpg",
        url: `https://farangfun.com/blog/${post.slug}`,
        publisher: {
            "@type": "Organization",
            name: "FarangFun",
            logo: {
                "@type": "ImageObject",
                url: "https://farangfun.com/logo.png",
            },
        },
        // 添加更多可选的SEO优化字段
        mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `https://farangfun.com/blog/${post.slug}`
        },
        // 如果有标签，添加关键词
        keywords: post.tags ? (Array.isArray(post.tags) ? post.tags.join(', ') : post.tags) : undefined,
    };
}