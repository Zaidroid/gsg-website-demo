export interface Course {
    id: string
    title: string
    description: string
    category: string
    level: string
    duration: string
    startDate: string
    status: "Open" | "Closed" | "Coming Soon"
}

export const courses: Course[] = [
    {
        id: "fs-101",
        title: "Full Stack Web Development",
        description: "Master React, Node.js, and modern web development practices in this intensive bootcamp.",
        category: "Development",
        level: "Intermediate",
        duration: "16 Weeks",
        startDate: "2025-11-01",
        status: "Open",
    },
    {
        id: "ui-foundations",
        title: "UI/UX Design Foundations",
        description: "Learn the principles of user interface and user experience design using Figma.",
        category: "Design",
        level: "Beginner",
        duration: "8 Weeks",
        startDate: "2025-10-15",
        status: "Coming Soon",
    },
    {
        id: "freelance-kickstart",
        title: "Freelance Kickstart",
        description: "Learn how to build your profile on Upwork and land your first international job.",
        category: "Freelance",
        level: "Beginner",
        duration: "4 Weeks",
        startDate: "2025-09-01",
        status: "Closed",
    },
    {
        id: "react-adv",
        title: "Advanced React Patterns",
        description: "Deep dive into performance optimization, state management, and custom hooks.",
        category: "Development",
        level: "Advanced",
        duration: "6 Weeks",
        startDate: "2025-12-01",
        status: "Open",
    },
]
