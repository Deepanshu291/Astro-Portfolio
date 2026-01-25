
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, LucideGithub } from "lucide-react";
import {Card,CardContent,CardDescription,CardHeader,CardTitle, CardFooter } from '@/components/ui/card'
import type {ProjectCardProps} from '@/lib/utils'


export  function ProjectCard({data}: {data: ProjectCardProps}) {
  return (
    <Card className="  w-80 relative pb-5 min-h-[45vh]" >
        <div>

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
        </div>
            <CardHeader>
                <CardTitle className="flex w-full justify-between items-center gap-2">{data.title}  
                   <a href={data.projectUrl} target="_blank" rel="noreferrer">
                    <ArrowUpRight className="dark:bg-amber-500 dark:rounded-full" color="#000"/>  
                   </a>
                </CardTitle>
                <CardDescription>{data.dates}</CardDescription>
            </CardHeader>
            <CardContent>
                <CardDescription className="overflow-hidden  text-ellipsis line-clamp-3">
                {data.description}
                </CardDescription>
            </CardContent>
            <CardFooter >
                <div className="flex flex-wrap min-w-full  overflow-hidden text-ellipsis line-clamp-2">
                    {data.technologies.map((tech)=>
                    <Badge key={tech} className="m-1 text-xs"  variant={'outline'}>{tech}</Badge>
                    )}
                    
                </div>
            </CardFooter>
        </Card>
  )
}
