import Link from 'next/link'
import { ArrowLeft, LockKeyhole } from 'lucide-react'

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground relative font-sans selection:bg-primary/30 overflow-x-hidden">
      
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 mix-blend-screen" />
      </div>

      {/* Dynamic Header */}
      <header className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-surface/50 backdrop-blur-2xl border border-border/50 rounded-full px-6 h-14 flex items-center justify-between w-[90%] max-w-5xl 2xl:max-w-7xl shadow-2xl transition-all duration-300">
        <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group w-24">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-semibold hidden sm:block">Back</span>
        </Link>
        
        <div className="flex items-center gap-2 flex-1 justify-center">
          <LockKeyhole className="w-4 h-4 text-primary" />
          <span className="text-lg font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Privacy Policy
          </span>
        </div>
        
        <div className="w-24"></div> {/* Spacer for balance */}
      </header>

      <main className="flex-1 flex flex-col items-center relative px-4 sm:px-6 z-10 pt-32 pb-20 w-full max-w-4xl mx-auto">
        <div className="w-full mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground text-lg">Last updated: June 14, 2026</p>
        </div>
        
        <div className="w-full bg-surface/30 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-8 prose-headings:text-foreground prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
            
            <p className="text-lg">
              At ArachnidForms, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our service.
            </p>

            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">1</span>
              Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us when you create an account, use our services, or communicate with us. This may include your name, email address, form configurations, and any response data gathered via your deployed forms.
            </p>
            
            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">2</span>
              How We Use Information
            </h2>
            <p>
              We use the information we collect to provide, maintain, and improve our services, to process transactions, to send you related information (including confirmations and technical notices), and to monitor and analyze trends and usage across our platform.
            </p>
            
            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">3</span>
              Data Security
            </h2>
            <p>
              We implement industry-standard security measures designed to protect your personal information from unauthorized access, use, or disclosure. However, no internet transmission or electronic storage is 100% secure, and we cannot guarantee its absolute security.
            </p>
            
            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">4</span>
              Sharing of Information
            </h2>
            <p>
              We do not share, sell, rent, or trade your personal information with third parties for their commercial purposes. We may share information with trusted third-party vendors and hosting partners who assist us in operating our platform, provided they agree to keep this information confidential.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
