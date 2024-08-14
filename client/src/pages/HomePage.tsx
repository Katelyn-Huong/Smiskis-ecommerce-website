export function HomePage() {
  return (
    <div className="grid gap-4 bg-purple-200">
      <img
        src="/images/smiskisglow.webp"
        alt="smiskis glow"
        className="mx-auto mb-4 rounded-xl"
      />
      <p className="text-2xl text-center text-white">
        Smiskis are little creatures in blind boxes...
      </p>
      <p className="text-2xl text-center text-white">
        That hides everywhere...
      </p>
      <p className="text-2xl text-center text-white">And appears at night!</p>
      <div className="grid grid-cols-2 gap-4 mt-8 md:grid-cols-2 lg:grid-cols-2">
        <img
          src="/images/yogapose.png"
          alt="yoga pose"
          className="mx-auto md:w-28 max-h-28"
        />

        <img
          src="/images/fightingpose.png"
          alt="fighting pose"
          className="mx-auto md:w-28 max-h-28 "
        />
        <img
          src="/images/cheerpose.png"
          alt="cheer pose"
          className="mx-auto md:w-28 max-h-28"
        />
        <img
          src="/images/meditatepose.png"
          alt="meditate pose"
          className="mx-auto md:w-28 max-h-28"
        />
      </div>
    </div>
  );
}
