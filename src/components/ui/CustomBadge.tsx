import React from 'react'
import { Badge } from '@/components/ui/badge'
import { ShineBorder } from '@/components/ui/shine-border';

interface CustomBadgeProps {
  skill: {
    url: string;
    name: string;
  }
}

export function CustomBadge({ skill }: CustomBadgeProps) {
  return (
    <Badge variant={"outline"} className="relative text-sm px-7 py-4 h-10 w-40 rounded-full  mx-2 bg-card">
                       
                        <ShineBorder  borderWidth={2} shineColor={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />                
                        <img src={skill.url} alt={skill.name} width={28} height={28} className="inline-block mr-2 align-middle"/>
                        {skill.name.charAt(0).toUpperCase() + skill.name.slice(1)}
                    </Badge>
  )
}
