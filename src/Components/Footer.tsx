import { useState } from 'react'
import type { FormEvent } from 'react'
import logoSrc from '../assets/textlogogenerator.svg'

function Footer() {
    const [email, setEmail] = useState('')

    function handleSubscribe(e: FormEvent) {
        e.preventDefault()
        // placeholder behaviour: in a real app you'd POST to an API
        // keep UI friendly: clear input and show a tiny confirmation
        // using alert is acceptable here as a placeholder
        if (!email) return
        // eslint-disable-next-line no-alert
        alert(`Thanks for subscribing, ${email}`)
        setEmail('')
    }

    return (
        <footer className="w-full mt-12 border-t border-white/10 bg-gradient-to-t from-black/60 to-transparent py-10 text-gray-300">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">

                {/* Brand / About */}
                <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                        <img src={logoSrc} alt="Movie App" className="w-[110px] sm:w-[130px]" />
                    </div>
                    <p className="text-sm text-gray-400 max-w-sm">
                        Discover and stream the best of movies, TV shows and live sports. Curated picks and trending lists to keep you entertained.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">© {new Date().getFullYear()} Movie App. All rights reserved.</div>
                </div>

                {/* Navigation groups */}
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-3">Explore</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#top" className="hover:text-blue-400">Home</a></li>
                            <li><a href="#movies" className="hover:text-blue-400">Movies</a></li>
                            <li><a href="#tv" className="hover:text-blue-400">TV</a></li>
                            <li><a href="#sports" className="hover:text-blue-400">Sports</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-semibold text-gray-200 mb-3">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400">About</a></li>
                            <li><a href="#" className="hover:text-blue-400">Support</a></li>
                            <li><a href="#" className="hover:text-blue-400">Privacy</a></li>
                            <li><a href="#" className="hover:text-blue-400">Terms</a></li>
                        </ul>
                    </div>
                </div>

                {/* Newsletter & Social */}
                <div className="flex flex-col items-start gap-4">
                    <h4 className="text-sm font-semibold text-gray-200">Join our newsletter</h4>
                    <p className="text-sm text-gray-400">Get weekly updates on new releases and curated collections.</p>

                    <form onSubmit={handleSubscribe} className="w-full flex gap-2">
                        <label htmlFor="footer-email" className="sr-only">Email address</label>
                        <input
                            id="footer-email"
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            className="flex-1 bg-white/5 border border-white/10 px-3 py-2 rounded-lg text-sm placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            aria-label="Email address"
                        />
                        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600">Subscribe</button>
                    </form>

                    <div className="flex items-center gap-3 mt-2">
                        <a href="https://x.com" aria-label="Follow on X" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
                            {/* New X (Twitter) logo SVG */}
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-400" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.472 3.975h4.285l-7.294 8.36 8.584 10.002h-6.771l-5.351-6.195-6.119 6.195H1.167l7.802-8.89L.666 3.975h6.868l4.615 5.397 5.323-5.397Zm-1.487 16.012h1.746L6.886 5.863H5.045l10.94 14.124Z" />
                            </svg>
                        </a>


                        <a href="https://instagram.com/08mdsaif" aria-label="Follow on Instagram" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-pink-400" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="12" cy="12" r="5" stroke="currentColor" strokeWidth="1.5" />
                                <circle cx="17" cy="7" r="1" fill="currentColor" />
                            </svg>
                        </a>

                        <a href="https://www.linkedin.com/in/08mdsaif/" aria-label="Follow on LinkedIn" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-blue-600" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                <rect x="2" y="2" width="20" height="20" rx="3" fill="currentColor" className="text-blue-600/90" />
                                <path d="M6.5 9.5h2.5V18H6.5zM7.75 6.75a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5zM11.5 9.5h2.2v1.1h.03c.31-.59 1.06-1.2 2.18-1.2 2.34 0 2.77 1.54 2.77 3.55V18h-2.5v-3.4c0-.81-.01-1.86-1.13-1.86-1.13 0-1.3.88-1.3 1.78V18h-2.5V9.5z" fill="#fff" />
                            </svg>
                        </a>

                        <a href="https://youtube.com" aria-label="YouTube" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-red-500" xmlns="http://www.w3.org/2000/svg">
                                <rect x="2" y="6" width="20" height="12" rx="3" fill="currentColor" />
                                <polygon points="10,9 16,12 10,15" fill="#fff" />
                            </svg>
                        </a>

                        <a href="https://github.com/08mdsaif" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="p-2 rounded-md bg-white/5 hover:bg-white/10">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-gray-200" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.48 2 2 6.58 2 12.21c0 4.5 2.87 8.32 6.84 9.67.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.35-3.37-1.35-.45-1.17-1.1-1.48-1.1-1.48-.9-.62.07-.6.07-.6 1 .07 1.52 1.04 1.52 1.04.89 1.56 2.33 1.11 2.9.85.09-.66.35-1.12.63-1.37-2.22-.26-4.56-1.13-4.56-5.02 0-1.11.38-2.01 1.03-2.72-.1-.26-.45-1.29.1-2.68 0 0 .84-.28 2.75 1.05A9.38 9.38 0 0112 8.16c.86.004 1.73.117 2.54.34 1.91-1.33 2.74-1.05 2.74-1.05.55 1.39.2 2.42.1 2.68.65.71 1.03 1.61 1.03 2.72 0 3.9-2.34 4.76-4.57 5.01.36.31.68.93.68 1.88v2.8c0 .27.18.58.69.48A10.23 10.23 0 0022 12.21C22 6.58 17.52 2 12 2z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    )
}

export default Footer
