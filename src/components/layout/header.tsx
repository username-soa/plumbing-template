"use client"

import Link from "next/link"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { SITE_CONFIG } from "@/lib/site-config"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "motion/react"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle
} from "@/components/ui/sheet"

export function Header() {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header className="absolute top-0 left-0 w-full z-[60] flex items-center justify-between px-6 md:px-12 xl:h-24 sm:h-20 h-16">
      
      <div className="flex h-full absolute top-0 left-0">
         {/* Logo placeholder - using text to match reference style */}
         <div className="relative flex items-center">
           <div className="absolute top-0 bottom-0 left-[-50px] w-[calc(100%+50px)] bg-primary -skew-x-20 rounded-br-xl" />
           <div className="relative z-10 xl:pl-10 pl-6 xl:pr-16 pr-8 py-6 font-bold 2xl:text-[2vw] sm:text-3xl text-2xl text-primary-foreground leading-none select-none">
             {SITE_CONFIG.brand.name}
           </div>
         </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center xl:gap-8 gap-4 text-white font-medium shadow-sm bg-white/10 backdrop-blur-sm xl:px-8 px-6 py-3 rounded-full border border-white/20">
        {SITE_CONFIG.navLinks.map((link) => (
          <Link 
            key={link.href + link.label} 
            href={link.href} 
            className="hover:text-primary transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="ml-auto flex items-center gap-4">
        {/* Call Button - Hidden on very small screens, shown on sm+ */}
        <div className="hidden sm:block">
           <Button size={"lg"} className="rounded-full bg-primary text-primary-foreground hover:opacity-90 font-bold py-6">
             <span className="xl:flex hidden">Call Now</span> {SITE_CONFIG.contact.phone}
           </Button>
        </div>

        {/* Mobile Menu Trigger - Shown on LG and below (when desktop nav is hidden) */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-primary text-primary-foreground hover:opacity-90 relative w-[48px] h-[48px] cursor-pointer"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-8 h-8" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-8 h-8" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent 
              side="right" 
              className="w-screen max-w-none bg-neutral-950 border-none p-0"
              style={{ width: "100%", maxWidth: "none" }}
            >
              <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
              <div className="flex flex-col h-full px-6 pb-6 pt-24">
                
                <div className="flex items-center justify-between mb-8 sr-only">
                    {/* Hidden internal header since main header is visible */}
                </div>

                <nav className="flex flex-col gap-4 text-left mt-24 items-start">
                  {SITE_CONFIG.navLinks.map((link) => (
                    <Link 
                      key={link.href + link.label} 
                      href={link.href} 
                      className="text-4xl font-semibold text-white hover:text-primary transition-colors py-2"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>

                <div className="mt-auto sm:hidden flex flex-col gap-4">
                  <Button size={"lg"} className="w-full rounded-full bg-primary text-primary-foreground hover:opacity-90 font-bold py-6 text-lg">
                    Call Now {SITE_CONFIG.contact.phone}
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
