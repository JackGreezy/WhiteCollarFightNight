import Link from "next/link"
import Image from "next/image"
import { Instagram, Mail } from "lucide-react"
import EmailSignupForm from "@/components/email-signup-form"
import FightApplicationButton from "@/components/fight-application-button"
import FighterNominationButton from "@/components/fighter-nomination-button"
import { MainNav } from "@/components/main-nav"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold tracking-tight text-red-600">TEXAS FIGHT COLLECTIVE</span>
          </Link>
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          {/* Starry Background */}
          <div className="absolute inset-0 w-full h-full z-0 bg-black">
            <div className="stars-container">
              <div className="stars"></div>
              <div className="stars2"></div>
              <div className="stars3"></div>
            </div>
          </div>

          {/* Video Background */}
          <div className="absolute inset-0 w-full h-full z-0 opacity-30">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
              poster="/placeholder.svg?height=1080&width=1920"
            >
              <source src="https://example.com/your-boxing-video.mp4" type="video/mp4" />
              {/* Add your actual video URL above */}
              Your browser does not support the video tag.
            </video>
            {/* Dark overlay to make text readable */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
          </div>

          <div className="container px-4 md:px-6 relative z-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="flex flex-col items-center justify-center">
                  <h1 className="text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl">
                    <span className="block bg-gradient-to-r from-red-600 via-white to-blue-600 text-transparent bg-clip-text">
                      WHITE COLLAR
                    </span>
                    <span className="block bg-gradient-to-r from-red-600 via-white to-blue-600 text-transparent bg-clip-text">
                      FIGHT NIGHT
                    </span>
                  </h1>
                  <div className="w-24 h-24 relative my-4">
                    <div className="w-full h-full border-4 border-red-500 border-r-blue-600 border-b-blue-600 transform rotate-45"></div>
                  </div>
                  <h2 className="text-xl md:text-2xl font-medium text-white tracking-widest">AUSTIN, TEXAS</h2>
                </div>
                <p className="mx-auto max-w-[700px] text-gray-300 md:text-xl mt-8">
                  First event coming soon, details to follow.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <FightApplicationButton />
                <FighterNominationButton />
              </div>
            </div>
          </div>
        </section>

        {/* Events Section */}
        <section id="events" className="w-full py-12 md:py-24 relative">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-white">EVENTS</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-red-600 via-white to-blue-600 mx-auto"></div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
                <div className="bg-gray-900 p-6 rounded-lg border border-red-600">
                  <h3 className="text-xl font-bold text-red-500 mb-2">LOCATION</h3>
                  <p>Austin, Texas</p>
                  <p>Venue TBA</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-white/30">
                  <h3 className="text-xl font-bold text-white mb-2">DATE</h3>
                  <p>Coming Soon</p>
                </div>
                <div className="bg-gray-900 p-6 rounded-lg border border-blue-600">
                  <h3 className="text-xl font-bold text-blue-500 mb-2">TICKETS</h3>
                  <p>Available Soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 bg-gradient-to-b from-black to-blue-950/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-red-500">ABOUT THE EVENT</h2>
                <p className="text-gray-300">
                  White Collar Fight Night brings together professionals from various industries to step into the ring
                  for charity. Our events showcase the determination and courage of everyday people who train for months
                  to compete in a safe, regulated boxing environment.
                </p>
                <div className="flex items-center space-x-2 text-blue-400">
                  <div className="w-4 h-4 bg-blue-600"></div>
                  <span className="font-medium">Professional Regulation</span>
                </div>
                <div className="flex items-center space-x-2 text-red-400">
                  <div className="w-4 h-4 bg-red-600"></div>
                  <span className="font-medium">Charitable Cause</span>
                </div>
                <div className="flex items-center space-x-2 text-white">
                  <div className="w-4 h-4 bg-white"></div>
                  <span className="font-medium">Community Focus</span>
                </div>
              </div>
              <div className="relative h-[300px] overflow-hidden rounded-lg border-2 border-blue-600">
                <Image src="/placeholder.svg?height=600&width=800" alt="Boxing ring" fill className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Sign Up Section */}
        <section id="signup" className="w-full py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl text-red-500">JOIN THE FIGHT</h2>
                <p className="text-gray-300">
                  Whether you want to step into the ring, nominate a fighter, or just stay updated on event details,
                  we've got you covered. Sign up today to be part of this exciting event.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <FightApplicationButton />
                  <FighterNominationButton />
                </div>
              </div>
              <div className="space-y-4 bg-gradient-to-br from-gray-900 to-blue-950/30 p-6 rounded-lg border border-gray-800">
                <h3 className="text-xl font-bold text-blue-500">STAY UPDATED</h3>
                <p className="text-gray-300">
                  Sign up for our mailing list to receive the latest news about White Collar Fight Night.
                </p>
                <EmailSignupForm />
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t border-gray-800 bg-black text-white py-6">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold tracking-tight text-red-600">TEXAS FIGHT COLLECTIVE</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="mailto:info@texasfightcollective.com"
                className="text-white hover:text-red-500 transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Texas Fight Collective. All rights reserved.
            </div>
          </div>
          <div className="flex justify-center mt-6">
            <div className="h-1 w-full max-w-md bg-gradient-to-r from-red-600 via-white to-blue-600"></div>
          </div>
        </div>
      </footer>
    </div>
  )
}

