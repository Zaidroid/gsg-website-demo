export interface Event {
    id: string
    title: string
    date: string
    location: string
    type: "Workshop" | "Meetup" | "Hackathon"
    status: "Open" | "Registration Required" | "Finished"
    description: string
}

export const events: Event[] = [
    {
        id: "hackathon-2025",
        title: "Gaza Tech Hackathon",
        date: "2025-12-10",
        location: "Gaza Sky Geeks Hub",
        type: "Hackathon",
        status: "Open",
        description: "Join us for a 48-hour coding challenge to solve local problems with tech.",
    },
    {
        id: "freelance-meetup",
        title: "Freelancers Monthly Meetup",
        date: "2025-11-20",
        location: "Online (Zoom)",
        type: "Meetup",
        status: "Registration Required",
        description: "Network with other freelancers and share tips on landing clients.",
    },
    {
        id: "react-workshop",
        title: "React Server Components Workshop",
        date: "2025-10-05",
        location: "Hebron Hub",
        type: "Workshop",
        status: "Finished",
        description: "A deep dive into Next.js App Router and Server Components.",
    },
]
