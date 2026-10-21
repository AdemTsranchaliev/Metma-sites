import Link from "next/link";
import { contact, socialLinks } from "@/data/content";
import { InquiryForm } from "./InquiryForm";
import { SocialIcon } from "./Icons";

export function SiteFooter() {
  return (
    <footer id="contacts" className="relative scroll-mt-24 bg-[rgba(223,82,255,0.29)] pt-[82px]">
      <div className="pointer-events-none absolute inset-0 opacity-70 [background-image:radial-gradient(rgba(0,0,0,0.08)_0.6px,transparent_0.6px)] [background-size:8px_8px]" />
      <div className="relative mx-auto grid max-w-[1080px] gap-12 px-6 pb-10 md:grid-cols-3">
        <div>
          <div className="mb-5 flex items-center gap-3 text-black">
            <svg viewBox="0 0 24 24" className="h-8 w-8 shrink-0" fill="currentColor" aria-hidden="true">
              <path d="M12 12a4.2 4.2 0 1 0-4.2-4.2A4.2 4.2 0 0 0 12 12zm0 2.1c-3.6 0-8 1.8-8 5.1V21h16v-1.8c0-3.3-4.4-5.1-8-5.1z" />
            </svg>
            <p className="font-serif text-[26px] font-bold text-black">METMA USA LTD.</p>
          </div>
          <Link
            href="/products"
            className="inline-block rounded-[50px] bg-[#0d0c0f] px-11 py-4 font-serif text-[15px] font-semibold tracking-[2px] text-white"
          >
            Our products
          </Link>
        </div>

        <div>
          <h3 className="font-serif text-[26px] font-bold uppercase text-black">Contacts</h3>
          <p className="mt-4 font-serif text-base leading-7 text-black">
            Location: {contact.location}
          </p>
          <p className="mt-3 font-serif text-base text-black">
            Email:{" "}
            <a className="hover:underline" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </p>
          <p className="mt-3 font-serif text-base text-black">
            Phone no:{" "}
            <a className="hover:underline" href={contact.phoneHref}>
              {contact.phone}
            </a>
          </p>
          <ul className="mt-5 flex gap-2">
            {socialLinks.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={item.label}
                  className="flex h-8 w-8 items-center justify-center rounded-[3px] text-white"
                  style={{ backgroundColor: item.color }}
                >
                  <SocialIcon name={item.icon} />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-serif text-[26px] font-bold uppercase text-black">
            Send inquiry
          </h3>
          <InquiryForm />
        </div>
      </div>
      <p className="relative border-t border-black/10 py-6 text-center font-serif text-sm text-[#30353b]">
        Copyright © 2022 METMA USA LTD. All Rights Reserved.
      </p>
    </footer>
  );
}
