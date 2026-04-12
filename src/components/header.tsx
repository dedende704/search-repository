import Link from "next/link";

export default function Header() {
  return (
    <header
      className="flex w-full max-w-3xl flex-col items-left h-auto py-4 px-4 
            bg-gray-100 dark:bg-black sm:items-start"
    >
      <Link href="/">タイトル</Link>
    </header>
  );
}
