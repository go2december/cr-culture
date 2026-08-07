import { redirect } from 'next/navigation'

export default async function DistrictSlugRedirectPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params
    redirect(`/cultural-networks/districts/${slug}`)
}
