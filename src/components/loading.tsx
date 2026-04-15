export default function Loading() {
  return (
    <div className="flex fixed inset-0 z-[9999] justify-center items-center w-full h-full ">
      <div className="h-10 w-10 animate-spin border-[5px] border-sky-400 rounded-full  border-t-transparent"></div>
      <p className="text-[30px] font-weight">Loading</p>
    </div>
  );
}
