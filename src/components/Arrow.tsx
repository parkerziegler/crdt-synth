const Arrow = () => {
  return (
    <div className="flex items-center relative">
      <span className="text-neon-white text-2xl absolute -top-8 font-bold">
        Time
      </span>
      <div className="h-2 bg-outline w-full" />
      <svg viewBox="0 0 16 16" width="16" height="16">
        <polygon points="0,0 12,8 0,16" className="fill-outline" />
      </svg>
    </div>
  );
};

export default Arrow;
