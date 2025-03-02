import {Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { deleteProduct } from "@/app/actions";
import { SubmitButton } from "@/app/components/SubmitButton";

export default function DeleteRoute( {params}:{params:{id:string}} ){
    return(
        <div className="h-[80vh] w-full flex items-center justify-center">
            <Card className="max-w-xl">
            <CardHeader>
                <CardTitle>Are you absolutely sure?</CardTitle>
                <CardDescription>
                    This action cannot be undone.This will permanently delete this
                    product and remove all data.
                </CardDescription>
            </CardHeader>
            <CardFooter className="w-full flex justify-between">
                <Button variant= "secondary" asChild> <Link href="/dashboard/products">Cancel</Link> </Button>
                <form action={deleteProduct}>
                    <input type="hidden" name="ProductId" value={params.id}/>
                <SubmitButton variant= "destructive" text="Delete Product"/>
                </form>
            </CardFooter>
            </Card>
            </div>
    )
}