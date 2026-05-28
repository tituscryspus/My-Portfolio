export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden>
      <div className="animate-orb absolute -left-32 top-24 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]" />
      <div className="animate-orb-delayed absolute -right-32 top-1/3 h-[32rem] w-[32rem] rounded-full bg-cyan-500/10 blur-[130px]" />
      <div className="animate-orb-slow absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-accent/10 blur-[100px]" />
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.12) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.12) 1px, transparent 1px)`,
          backgroundSize: "72px 72px",
        }}
      />
    </div>
  );
}
