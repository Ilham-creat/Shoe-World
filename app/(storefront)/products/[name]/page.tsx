import { ProductCard } from "@/app/components/storefront/ProductCard";
import { prisma } from "@/app/lib/db"
import { notFound } from "next/navigation";


async function getData(productCategory:string){
switch(productCategory){
    case "all" :{
        const data = await prisma.product.findMany({
            select:{
                name:true,
                images:true,
                price:true,
                id:true,
                description:true,
            },
        where:{
            status:"published",
        }
        });
        
        return{
            title:"All Products",
            data:data,
        }
    } case "men":{
        const data = await prisma.product.findMany({
            where:{
                category:"men",
            },
        select:{
            name:true,
            id:true,
            description:true,
            images:true,
            price:true,
        },
        });
    return{
        title:"Products for Men",
        data:data,
    }
    } case "women":{
        const data = await prisma.product.findMany({
            where:{
                status:"published",
                category:"women",
            },
            select:{
                id:true,
                images:true,
                description:true,
                price:true,
                name:true,
            },
        });
        return{
            title:"products for women",
            data:data,
        }
    } case "kids" :{
        const data = await prisma.product.findMany({
            where:{
                status:"published",
                category:"kid",
            },
            select:{
                id:true,
                description:true,
                name:true,
                images:true,
                price:true,
            }
        })
        return{
            title:"products for kids",
            data:data,
        }
    } default:{
        return notFound();
    }
}
}

export default async function CategoriesPage({params}:{params:{name:string}}){
    const {title,data} = await getData(params.name)
    return(
    <section>
        <h1 className="font-semibold text-3xl my-5">{title}</h1>
        <div>
            {data.map((item) =>(
                <ProductCard item={item} key={item.id}/>
            ))}
        </div>
    </section>
    )
}