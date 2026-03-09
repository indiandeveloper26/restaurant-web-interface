// Orders fetch karne ke liye
import { NextResponse } from "next/server";
import Restaurant from "../../../../modals/user";
import dbConnect from "../../../../lib/db";

export async function GET(req, { params }) {
    try {
        await dbConnect();
        const { id } = await params;

        // User ka data nikalna aur uske orders ko populate karna
        const user = await Restaurant.findById(id).populate({
            path: 'orders',
            options: { sort: { createdAt: -1 } } // Latest orders upar dikhenge
        });

        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
}