import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, PlusCircle, UserIcon } from "lucide-react"
import Link from "next/link"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent ,
    DropdownMenuItem,
    DropdownMenuLabel, 
    DropdownMenuSeparator} from "@/components/ui/dropdown-menu"

import { prisma } from "@/app/lib/db"
import Image from "next/image"

async function getData(){
    const data = await prisma.product.findMany ({
        orderBy:{
            createdAt:"desc",
        }
    });
    return data;
}

export default async function productsRoute(){
    const data = await getData();
    return(
        <>
        <div className="flex items-center justify-end">
          <Button asChild className="flex items-center gap-x-2">
            <Link href="/dashboard/products/create">
            <PlusCircle className="w-4 h-4"/>
            <span>Add Product</span>
            </Link>
            </Button>  
        </div>
        <Card className="mt-5">
        <CardHeader>
            <CardTitle>Products</CardTitle>
            <CardDescription>
                Manage your products and view thier sales performance
            </CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Image</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                {data.map((item) =>(  
                        <TableRow key={item.id}>
                        <TableCell>
                            <Image alt= "Product Image" src= {item.images[0]} />
                        </TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell> {item.status} </TableCell>
                        <TableCell> {item.price} </TableCell>
                        <TableCell> {new Intl.DateTimeFormat("en-US").format(item.createdAt)} </TableCell>
                        <TableCell className="text-end">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            <DropdownMenuItem asChild><Link href={`/dashboard/products/${item.id}`}>Edit</Link></DropdownMenuItem>
                            <DropdownMenuItem asChild><Link href={`/dashboard/products/${item.id}/delete`}>Delete</Link></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                        
                    </TableRow>))}
                </TableBody>
            </Table>
        </CardContent>
        </Card>
        </>
    )
}