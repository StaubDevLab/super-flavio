import prisma from "@/lib/db";
import {NextResponse} from "next/server";

export const GET = async (res: Request, {params}: { params: { slug: string } }) => {

    try {
        const {slug} = params

        const service = await prisma.service.findUnique({
            where: {
                active: true,
                slug: slug
            },

        })

        if (!service) {

            return NextResponse.json({error: 'Service not found'},
                {status: 404, headers: {'Content-Type': 'application/json'}});
        }
        return NextResponse.json(service, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error},
            {status: 404, headers: {'Content-Type': 'application/json'}});
    }

}