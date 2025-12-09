import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';

/**
 * Robots.txt configuration for search engine crawlers
 * Automatically generates robots.txt at /robots.txt
 * @see https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots
 */
export default function robots(): MetadataRoute.Robots {
    const baseUrl = SITE_CONFIG.url;

    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/api/', '/_next/', '/static/'],
            },
        ],
        sitemap: `${baseUrl}/sitemap.xml`,
    };
}
