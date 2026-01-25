
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, LucideGithub } from "lucide-react";
import {Card,CardContent,CardDescription,CardHeader,CardTitle, CardFooter } from '@/components/ui/card'
import type {BlogCardProps} from '@/lib/utils'


export  function BlogCard({data}: {data: BlogCardProps}) {
  return (
    <Card className=" relative py-5 min-h-[20vh] w-full" >
        {/* <div>

            <img
        src={data.imageUrl}
        alt="Event cover"
        className=" rounded-t-xl  top-0 relative z-20 aspect-video w-full object-cover brightness-60 grayscale dark:brightness-40"
      />
      {data.sourceUrl &&
      <a href={data.sourceUrl} target="_blank" rel="noreferrer">
      <Badge className=" absolute  top-3 right-3 z-30 ">
        <LucideGithub  />
        Source</Badge> </a> 
    }
        </div> */}
            <CardHeader>
                <div className="flex gap-2 justify-start items-center text-xs">

                <CardDescription className="text-xs"> {data.pubdate}</CardDescription>
                <div className="border border-buffer border-neutral-300 bg-muted-foreground w-1 h-1 rounded-full"></div>
                <CardDescription className="text-xs">{data.readtime}</CardDescription>
                </div>
                <CardTitle className="flex w-full justify-between items-center gap-2">{data.title}  
                   <a href={data.projectUrl} target="_blank" rel="noreferrer">
                    <ArrowUpRight className="dark:bg-amber-500 dark:rounded-full" color="#000"/>  
                   </a>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="overflow-hidden  text-ellipsis line-clamp-3">
                {data.description}
                </CardDescription>
            </CardContent>
            <CardFooter >
                <div className="flex flex-wrap min-w-full  overflow-hidden text-ellipsis line-clamp-2">
                    {data.tags?.map((tech)=>
                    <Badge key={tech} className="m-1 text-xs"  variant={'outline'}>{tech}</Badge>
                    )}
                    
                </div>
            </CardFooter>
        </Card>
  )
}
