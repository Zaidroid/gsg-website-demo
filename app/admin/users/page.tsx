"use client"

import { useEffect, useState } from "react"
import {
    Users,
    Shield,
    UserCheck,
    UserCog,
    MoreVertical,
    Mail,
    Calendar,
    Loader2,
    X,
    Plus
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface User {
    id: string
    name: string | null
    email: string | null
    role: string
    image: string | null
    createdAt: string
}

export default function UsersPage() {
    const [users, setUsers] = useState<User[]>([])
    const [loading, setLoading] = useState(true)
    const { toast } = useToast()

    useEffect(() => {
        fetchUsers()
    }, [])

    const fetchUsers = async () => {
        try {
            setLoading(true)
            const res = await fetch("/api/admin/users")
            const data = await res.json()
            if (Array.isArray(data)) {
                setUsers(data)
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to fetch users",
                variant: "destructive"
            })
        } finally {
            setLoading(false)
        }
    }

    const updateRole = async (userId: string, newRole: string) => {
        try {
            const res = await fetch("/api/admin/users", {
                method: "PATCH",
                body: JSON.stringify({ id: userId, role: newRole })
            })

            if (res.ok) {
                toast({
                    title: "Success",
                    description: `User role updated to ${newRole}`
                })
                fetchUsers()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update user role",
                variant: "destructive"
            })
        }
    }

    const deleteUser = async (userId: string) => {
        if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return

        try {
            const res = await fetch(`/api/admin/users?id=${userId}`, {
                method: "DELETE"
            })

            if (res.ok) {
                toast({
                    title: "User Deleted",
                    description: "User account has been removed."
                })
                fetchUsers()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete user",
                variant: "destructive"
            })
        }
    }

    const createUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const name = formData.get("name") as string
        const email = formData.get("email") as string
        const role = formData.get("role") as string

        try {
            const res = await fetch("/api/admin/users", {
                method: "POST",
                body: JSON.stringify({ name, email, role })
            })

            if (res.ok) {
                toast({
                    title: "User Created",
                    description: `${name || email} has been added.`
                })
                fetchUsers()
                // @ts-ignore
                e.target.reset()
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to create user",
                variant: "destructive"
            })
        }
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-10 h-10 animate-spin text-gsg-teal" />
            </div>
        )
    }

    return (
        <div className="space-y-8 max-w-7xl mx-auto p-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-gsg-navy tracking-tight">Admin Users</h1>
                    <p className="text-gray-500 font-medium mt-1">Manage platform access and roles</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="px-4 py-2 bg-gsg-teal/10 rounded-xl border border-gsg-teal/20 text-gsg-teal text-sm font-bold flex items-center gap-2">
                        <Users className="w-4 h-4" />
                        {users.length} Total Users
                    </div>
                </div>
            </div>

            {/* Quick Add User */}
            <div className="bg-white/40 backdrop-blur-md rounded-[2.5rem] border border-gray-100 p-8">
                <h2 className="text-lg font-black text-gsg-navy mb-6 flex items-center gap-2">
                    <UserCog className="w-5 h-5 text-gsg-teal" />
                    Quick Add New User
                </h2>
                <form onSubmit={createUser} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <input
                        name="name"
                        placeholder="Full Name"
                        className="bg-white/60 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-gsg-teal transition-all outline-none text-sm font-medium"
                    />
                    <input
                        name="email"
                        type="email"
                        required
                        placeholder="Email Address"
                        className="bg-white/60 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-gsg-teal transition-all outline-none text-sm font-medium"
                    />
                    <select
                        name="role"
                        className="bg-white/60 border border-gray-100 px-4 py-3 rounded-xl focus:ring-2 focus:ring-gsg-teal transition-all outline-none text-sm font-bold text-gray-500 appearance-none cursor-pointer"
                    >
                        <option value="viewer">Viewer</option>
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                    </select>
                    <button
                        type="submit"
                        className="bg-gsg-navy text-white font-black py-3 rounded-xl hover:bg-gsg-teal transition-all shadow-lg shadow-gsg-navy/10 active:scale-95 text-sm"
                    >
                        Provision Account
                    </button>
                </form>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white/60 backdrop-blur-md rounded-[2rem] border border-gray-100 p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden group"
                    >
                        <button
                            onClick={() => deleteUser(user.id)}
                            className="absolute top-6 right-6 p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all opacity-0 group-hover:opacity-100"
                            title="Delete User"
                        >
                            <X className="w-4 h-4" />
                        </button>

                        <div className="flex items-start gap-4 relative z-10">
                            <div className="relative">
                                {user.image ? (
                                    <img src={user.image} alt={user.name || ""} className="w-16 h-16 rounded-2xl border-2 border-gsg-teal/20" />
                                ) : (
                                    <div className="w-16 h-16 rounded-2xl bg-gsg-teal/10 flex items-center justify-center text-gsg-teal text-2xl font-black italic">
                                        {user.name?.charAt(0) || user.email?.charAt(0)}
                                    </div>
                                )}
                                <div className="absolute -bottom-2 -right-2 p-1.5 bg-white rounded-lg shadow-md border border-gray-100">
                                    {user.role === 'admin' ? (
                                        <Shield className="w-4 h-4 text-gsg-navy" />
                                    ) : (
                                        <UserCheck className="w-4 h-4 text-gsg-teal" />
                                    )}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg font-black text-gsg-navy truncate">
                                    {user.name || "Anonymous User"}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium flex items-center gap-1.5 truncate">
                                    <Mail className="w-3.5 h-3.5" />
                                    {user.email}
                                </p>
                            </div>
                        </div>

                        <div className="mt-8 space-y-4 relative z-10">
                            <div className="flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                                <span>Platform Role</span>
                                <span className={
                                    user.role === 'admin' ? 'text-gsg-navy' :
                                        user.role === 'editor' ? 'text-gsg-teal' : 'text-gray-400'
                                }>
                                    {user.role}
                                </span>
                            </div>
                            <div className="grid grid-cols-3 gap-2">
                                {['admin', 'editor', 'viewer'].map((role) => (
                                    <button
                                        key={role}
                                        onClick={() => updateRole(user.id, role)}
                                        className={`py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${user.role === role
                                            ? 'bg-gsg-navy text-white shadow-lg'
                                            : 'bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gsg-navy'
                                            }`}
                                    >
                                        {role}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between text-[11px] font-bold text-gray-400">
                            <div className="flex items-center gap-1.5">
                                <Calendar className="w-3.5 h-3.5" />
                                Joined {new Date(user.createdAt).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
