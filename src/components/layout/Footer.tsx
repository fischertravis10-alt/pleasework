/**
 * Footer - Multi-column footer with contact info and quick links.
 * Visual refresh: warm sand background and forest-green accents to match the logo.
 */

import { Mail, MapPin, Phone } from 'lucide-react'
import Brand from '../common/Brand'

/** Footer with strong contrast and accessible link targets. */
export default function Footer() {
  return (
    <footer id="contact" className="border-t border-[#E6D8B8] bg-[#FBF7ED]">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 md:grid-cols-4">
        <div>
          <Brand size={28} />
          <p className="mt-3 text-sm text-[#2D3A2D]">
            Denver-based outfitter providing trail-tested gear for the Rockies and beyond.
          </p>
          <div className="mt-4 space-y-2 text-sm text-[#2D3A2D]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#2F5D3A]" />
              <span>1234 Blake St, Denver, CO 80202</span>
            </div>
            <a href="tel:+13035551234" className="flex items-center gap-2 hover:underline">
              <Phone className="h-4 w-4 text-[#2F5D3A]" />
              <span>(303) 555-1234</span>
            </a>
            <a href="mailto:info@highcountrygear.shop" className="flex items-center gap-2 hover:underline">
              <Mail className="h-4 w-4 text-[#2F5D3A]" />
              <span>info@highcountrygear.shop</span>
            </a>
          </div>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-[#1F3D2B]">Shop</h5>
          <ul className="mt-3 space-y-2 text-sm text-[#2D3A2D]">
            <li><a className="hover:underline" href="#categories">All Categories</a></li>
            <li><a className="hover:underline" href="#featured">Featured</a></li>
            <li><a className="hover:underline" href="#newsletter">Deals</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-[#1F3D2B]">Company</h5>
          <ul className="mt-3 space-y-2 text-sm text-[#2D3A2D]">
            <li><a className="hover:underline" href="#features">Our Promise</a></li>
            <li><a className="hover:underline" href="#support">Support</a></li>
            <li><a className="hover:underline" href="#contact">Contact</a></li>
            <li><a className="hover:underline" href="#newsletter">Newsletter</a></li>
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-semibold text-[#1F3D2B]">Assurance</h5>
          <ul className="mt-3 space-y-2 text-sm text-[#2D3A2D]">
            <li>30-day free returns</li>
            <li>Warranty-backed products</li>
            <li>Carbon-neutral shipping</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#E6D8B8] py-6">
        <p className="mx-auto max-w-7xl px-4 text-xs text-[#2D3A2D]">
          © {new Date().getFullYear()} highcountrygear.shop — Built in Denver, CO
        </p>
      </div>
    </footer>
  )
}
