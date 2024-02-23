import prisma from "@/lib/db";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {authOptions} from "@/lib/auth-options";
import slugify from "slugify";

export const GET = async (res: Request) => {

    try {

        const services = await prisma.service.findMany()
        return NextResponse.json(services, {status: 200});

    } catch (error) {
        console.log(error)
        return NextResponse.json({error: error},
            {status: 500, headers: {'Content-Type': 'application/json'}});
    }

}


// export const POST = async (req: Request, res: Request) => {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//         return NextResponse.json({error: 'Unauthorized'},
//             {status: 401, headers: {'Content-Type': 'application/json'}});
//     }
//     try {
//         const body = req ? await req.json() : null
//         const service = await prisma.service.create(
//             {
//                 data: {
//                     title: body.title,
//                     description: body.description,
//                     price: body.price,
//                     shortDescription: body.shortDescription,
//                     public: body.public,
//                     duration: body.duration,
//                     image: body.image,
//                     categoryId: body.categoryId,
//                     slug: slugify(body.title, {
//                         replacement: '-',
//                         remove: undefined,
//                         lower: false,
//                         strict: true,
//                         locale: 'fr',
//                         trim: true
//                     }),
//                 }
//             }
//         )
//         return NextResponse.json({message: 'Service ajouté avec succès'}, {status: 200});
//
//     } catch (error) {
//         console.log(error)
//         return NextResponse.json({error: error},
//             {status: 500, headers: {'Content-Type': 'application/json'}});
//     }
//
// }

