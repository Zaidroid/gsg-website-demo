import { useTranslations } from 'next-intl';

export default function TermsPage() {
    const t = useTranslations('Terms');

    return (
        <div className="container mx-auto py-12 px-4">
            <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
            <div className="prose max-w-none">
                <p>Content coming soon...</p>
            </div>
        </div>
    );
}
