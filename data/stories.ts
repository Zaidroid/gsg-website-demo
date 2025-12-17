export interface Story {
    id: string
    title: string
    client: string
    challenge: string
    solution: string
    result: string
    image: string
}

export const stories: Story[] = [
    {
        id: "startup-scale",
        title: "Scaling a Fintech Startup",
        client: "PayPalestine",
        challenge: "Need for rapid MVP development to secure funding.",
        solution: "Deployed a team of 3 full-stack developers from Code Academy.",
        result: "MVP launched in 2 months; secured $100k seed funding.",
        image: "/placeholder-1.jpg",
    },
    {
        id: "ecommerce-revamp",
        title: "E-commerce Platform Revamp",
        client: "GazaCrafts",
        challenge: "Outdated legacy system causing 40% cart abandonment.",
        solution: "Rebuilt storefront using Next.js and Headless Shopify.",
        result: "Conversion rate increased by 25% in first quarter.",
        image: "/placeholder-2.jpg",
    },
]
