const Ping = () => {
  return (
    <div>
      <span className="flex size-[11px]">
        <span className="absolute inline-flex h-full w-full rounded-full bg-btu_secondary animate-ping opacity-75"></span>
        <span className="relative inline-flex size-[11px] rounded-full bg-btu_secondary"></span>
      </span>
    </div>
  );
};

export default Ping;
