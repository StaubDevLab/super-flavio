import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export const GET = async (req: Request, {params}: { params: { slug: string } }) => {
    try {
        const slug = decodeURIComponent(params.slug);

        const service = await prisma.service.findFirst({
            where: {
                active: true,
                slug: slug
            },
        });

        if (!service) {
            return NextResponse.json(
                {error: 'Service not found'},
                {status: 404, headers: {'Content-Type': 'application/json'}}
            );
        }
        return NextResponse.json(service, {status: 200});

    } catch (error) {
        console.error('Error fetching service by slug:', error);
        return NextResponse.json(
            {error: 'Internal server error'},
            {status: 500, headers: {'Content-Type': 'application/json'}}
        );
    }
};