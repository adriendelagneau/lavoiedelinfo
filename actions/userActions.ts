'use server'

import { dbConnect } from "@/lib/dbConnect"
import User from "@/lib/models/User"

export const getUserById = async (id: string) => {
    try {
        await dbConnect()
        const user = await User.findById(id)
        return JSON.parse(JSON.stringify(user)) ;
    } catch (err) {
        console.error("Error fetching categories with subcategories:", err);
        throw err;
    }
}
