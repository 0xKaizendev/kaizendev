"use client";
import { usePathname } from "next/navigation";
import * as React from "react";
// import { i18n } from '@/config/i18n-config'
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Icons } from "@/components/icons";
import Link from "next/link";
export function LangToggle() {
  const pathName = usePathname();
  //   const redirectedPathName = (locale: typeof i18n['locales'][number],) => {
  //     if (!pathName) return '/'
  //     const segments = pathName.split('/')
  //     segments[1] = locale
  //     return segments.join('/')
  //   }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className=" gap-3">
          <Icons.lang className=" " />
          <span className="sr-only">Toggle Language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {/* {i18n.locales.map((locale, index) => <DropdownMenuItem key={index} >
        <Link href={redirectedPathName(locale)}>{locale==='en'?"English":"Français"}</Link>
        </DropdownMenuItem>)} */}
        <DropdownMenuItem>
          <Link href={""}>English</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={""}>Français</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
