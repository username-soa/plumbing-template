import { Facebook, Instagram, Linkedin, Twitter, Phone, MapPin, Mail } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { 
  TypographyH4, 
  TypographyMuted, 
  TypographySmall
} from "@/components/ui/typography"
import { cn } from "@/lib/utils"
import { SITE_CONFIG } from "@/lib/site-config"

const SOCIAL_ICONS: Record<string, any> = {
  facebook: Facebook,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter
}

export function Footer() {
  return (
    <footer className="w-full bg-muted/30 pt-16 pb-8 border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-6 mb-10">
          
          {/* Column 1: Brand & Socials */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2 w-fit">
              <span className="text-xl font-bold tracking-tight text-primary">
                {SITE_CONFIG.brand.name}
              </span>
            </Link>
            <TypographyMuted className="text-base">
              {SITE_CONFIG.brand.description}
            </TypographyMuted>
             <div className="flex gap-2">
              {SITE_CONFIG.socials.map((social) => {
                const Icon = SOCIAL_ICONS[social.platform] || Facebook
                return (
                  <SocialButton 
                    key={social.platform} 
                    icon={Icon} 
                    label={social.label} 
                    href={social.href} 
                  />
                )
              })}
            </div>
          </div>

          {/* Column 2: Top Links */}
          <div className="lg:pl-8">
            <TypographyH4 className="mb-4 text-foreground font-semibold">
              Top Links
            </TypographyH4>
            <div className="flex flex-col items-start gap-1.5">
              {SITE_CONFIG.navLinks.map((link) => (
                <FooterLink key={link.label} href={link.href}>
                  {link.label}
                </FooterLink>
              ))}
            </div>
          </div>

          {/* Column 3: Contact Us */}
          <div>
            <TypographyH4 className="mb-5 text-foreground font-semibold">
              Contact Us
            </TypographyH4>
            <ul className="space-y-2 mb-3">
              <ContactItem icon={Phone} text={SITE_CONFIG.contact.phone} />
              <ContactItem icon={Mail} text={SITE_CONFIG.contact.email} />
              <ContactItem icon={MapPin} text={SITE_CONFIG.contact.address} />
            </ul>
          </div>

           {/* Column 4: Working Hours */}
          <div>
            <TypographyH4 className="mb-5 text-foreground font-semibold">Working Hours</TypographyH4>
               <div className="space-y-3">
                 {SITE_CONFIG.workingHours.map((schedule) => (
                   <ScheduleRow 
                     key={schedule.day} 
                     day={schedule.day} 
                     time={schedule.time} 
                   />
                 ))}
               </div>
          </div>
        </div>

        <Separator className="mb-3" />

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <TypographyMuted>
            © Copyright 2025 {SITE_CONFIG.brand.name}. All Rights Reserved.
          </TypographyMuted>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Button variant="link" className="text-muted-foreground hover:text-primary h-auto p-0 font-normal" asChild>
              <Link href="#">Privacy Policy</Link>
            </Button>
             <Button variant="link" className="text-muted-foreground hover:text-primary h-auto p-0 font-normal" asChild>
              <Link href="#">Terms & Conditions</Link>
            </Button>
          </div>
        </div>
      </div>

    </footer>
  )
}

function SocialButton({ icon: Icon, label, href }: { icon: any, label: string, href: string }) {
  return (
    <Button variant="ghost" size="icon" className="rounded-full hover:bg-primary hover:text-primary-foreground transition-colors" asChild>
      <a href={href} aria-label={label}>
        <Icon className="w-5 h-5" />
      </a>
    </Button>
  )
}

function ScheduleRow({ day, time, }: { day: string, time: string }) {
  return (
    <div className="flex justify-between items-center text-muted-foreground md:max-w-xs border-b pb-3">
      <TypographySmall className="font-medium">{day}</TypographySmall>
      <TypographySmall className={ "font-normal"}>{time}</TypographySmall>
    </div>
  )
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
  return (
    <Button variant="link" className="h-auto p-0 text-muted-foreground hover:text-primary justify-start font-normal transition-colors text-base" asChild>
      <Link href={href}>
        {children}
      </Link>
    </Button>
  )
}

function ContactItem({ icon: Icon, text }: { icon: any, text: string }) {
  return (
    <li className="flex items-start gap-3 text-muted-foreground group">
      <div className="p-2 rounded-full bg-accent/10 text-accent mt-[-4px]">
        <Icon className="w-4 h-4" />
      </div>
      <TypographyMuted>{text}</TypographyMuted>
    </li>
  )
}
