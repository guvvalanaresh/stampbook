import Image from "next/image"

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Image
        src="/logo.png"
        alt="StampBook Logo"
        width={40}
        height={40}
        className="h-10 w-10 object-contain"
        priority
      />
      <span className="font-bold text-xl font-nunito">StampBook</span>
    </div>
  )
} 