// file: app/api/products/route.js
import { NextResponse } from "next/server";
import dbConnect from "../../../lib/db";

import MenuItem from "../../../modals/menulist";



export async function GET() {
    try {
        // MongoDB se connect
        await dbConnect();

        // Saare products fetch karo
        const products = await MenuItem.find().sort({ createdAt: -1 }); // latest products pehle

        return NextResponse.json({ success: true, data: products }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
            { success: false, error: err.message || "Failed to fetch products" },
            { status: 500 }
        );
    }
}
