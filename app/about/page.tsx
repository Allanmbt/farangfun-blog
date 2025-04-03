import { Metadata } from "next";
import { constructMetadata } from "@/lib/seo";
import { AnimateIn } from "@/components/AnimateIn";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = constructMetadata({
    title: "About | FarangFun",
    description: "Learn more about FarangFun blog and our mission.",
});

export default function AboutPage() {
    return (
        <div className="container py-8 md:py-12 max-w-3xl mx-auto">
            <AnimateIn className="mb-6">
                <Breadcrumb />
            </AnimateIn>

            <AnimateIn>
                <h1 className="text-3xl md:text-4xl font-bold mb-6">About FarangFun</h1>
            </AnimateIn>

            <AnimateIn delay={0.1} className="prose dark:prose-invert max-w-none">
                <p>
                    Welcome to FarangFun, a modern blog built with Next.js 14, Contentlayer, and shadcn UI.
                    This platform is designed to showcase the capabilities of modern web technologies while
                    providing valuable content.
                </p>

                <h2>Our Mission</h2>
                <p>
                    FarangFun aims to provide insightful articles and resources on various topics including
                    technology, travel, lifestyle, and more. We believe in creating content that is not only
                    informative but also engaging and accessible.
                </p>

                <h2>Technology Stack</h2>
                <p>
                    This blog is built using cutting-edge technologies to ensure optimal performance and user experience:
                </p>
                <ul>
                    <li>Next.js 14 with App Router for efficient routing and server components</li>
                    <li>Contentlayer for type-safe content management</li>
                    <li>Tailwind CSS and shadcn UI for beautiful, responsive design</li>
                    <li>MDX for rich content authoring</li>
                    <li>Framer Motion for subtle, engaging animations</li>
                </ul>

                <h2>Get in Touch</h2>
                <p>
                    Have questions or suggestions? We&apos;d love to hear from you! Reach out to us via email at
                </p>
            </AnimateIn>
        </div>
    );
}