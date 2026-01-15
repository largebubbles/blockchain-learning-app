export default function Footer() {
  return (
    <footer className="mt-20 py-12 border-t" style={{
      background: 'var(--background-elevated)',
      borderColor: 'var(--border)'
    }}>
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="text-2xl font-bold mb-3" style={{
          fontFamily: 'Crimson Pro, Georgia, serif',
          color: 'var(--primary)'
        }}>
          Learn Blockchain
        </div>
        <p className="text-sm mb-2" style={{ color: 'var(--foreground-muted)' }}>
          Your journey to understanding Bitcoin and blockchain technology
        </p>
        <p className="text-xs mb-6" style={{ color: 'var(--foreground-muted)', opacity: 0.7 }}>
          Educational purposes only. Not financial advice.
        </p>
        <p className="text-xs" style={{ color: 'var(--foreground-muted)', opacity: 0.5 }}>
          Made with vibe-coding by Jason Lee
        </p>
      </div>
    </footer>
  );
}
