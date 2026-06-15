import Link from 'next/link'
import { ArrowLeft, ShieldCheck } from 'lucide-react'

export default function TermsOfService() {
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
          <ShieldCheck className="w-4 h-4 text-primary" />
          <span className="text-lg font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Terms of Service
          </span>
        </div>
        
        <div className="w-24"></div> {/* Spacer for balance */}
      </header>

      <main className="flex-1 flex flex-col items-center relative px-4 sm:px-6 z-10 pt-32 pb-20 w-full max-w-4xl mx-auto">
        <div className="w-full mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50">
            Terms of Service
          </h1>
          <p className="text-muted-foreground text-lg">Last updated: June 14, 2026</p>
        </div>
        
        <div className="w-full bg-surface/30 backdrop-blur-md border border-border/50 rounded-3xl p-8 md:p-12 shadow-2xl">
          <div className="prose prose-invert max-w-none text-muted-foreground space-y-8 prose-headings:text-foreground prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed prose-a:text-primary hover:prose-a:text-primary/80 transition-colors">
            
            <p className="text-lg">
              Welcome to ArachnidForms. By accessing or using our service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our platform.
            </p>

            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">1</span>
              Acceptance of Terms
            </h2>
            <p>
              By accessing or using ArachnidForms, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our service. We reserve the right to update or modify these terms at any time without prior notice.
            </p>
            
            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">2</span>
              Use License
            </h2>
            <p>
              Permission is granted to temporarily use ArachnidForms for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4 text-foreground/80">
              <li>Modify or copy the materials;</li>
              <li>Use the materials for any commercial purpose, or for any public display;</li>
              <li>Attempt to decompile or reverse engineer any software contained on ArachnidForms;</li>
              <li>Remove any copyright or other proprietary notations from the materials; or</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
            </ul>
            
            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">3</span>
              Disclaimer
            </h2>
            <p>
              The materials on ArachnidForms are provided on an 'as is' basis. ArachnidForms makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            
            <h2 className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary text-sm">4</span>
              Limitations
            </h2>
            <p>
              In no event shall ArachnidForms or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use ArachnidForms, even if ArachnidForms or a ArachnidForms authorized representative has been notified orally or in writing of the possibility of such damage.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
