export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="animate-ambient-one absolute top-[-12%] left-[-7%] w-[680px] h-[680px] rounded-full bg-gradient-to-br from-blue-500/25 via-indigo-400/15 to-transparent blur-[130px]" />
      <div className="animate-ambient-two absolute top-[28%] right-[-12%] w-[640px] h-[640px] rounded-full bg-gradient-to-bl from-cyan-400/25 via-sky-500/15 to-transparent blur-[145px]" />
      <div className="animate-ambient-one absolute bottom-[4%] left-[7%] w-[620px] h-[620px] rounded-full bg-gradient-to-tr from-sky-400/15 via-blue-500/15 to-transparent blur-[155px]" />    </div>
  );
}
