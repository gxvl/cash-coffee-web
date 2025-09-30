"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function PolicyPage() {
  const router = useRouter();
  return (
    <div className="flex h-screen w-full flex-col gap-10 px-10 pt-12">
      <div className="flex w-full justify-between">
        <div />
        <div
          onClick={() => router.back()}
          className="flex w-max items-center justify-center place-self-end rounded-full bg-[#55351A] p-2"
        >
          <X className="h-3 w-3 text-white" />
        </div>
      </div>
      <h2 className="text-center text-xl text-[#AD4C24]">
        Política de Privacidade
      </h2>
      <p className="text-center text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin efficitur
        urna vel lorem interdum maximus. Quisque porttitor in ligula sed
        malesuada. Vivamus mollis nisl fringilla rutrum auctor. Nunc eleifend
        dolor ac quam commodo, sit amet tincidunt justo finibus. Aliquam id ex
        eu libero tempus lobortis non id mi. Vivamus at erat vitae velit dapibus
        hendrerit varius quis lorem. Etiam lobortis, nunc eu consectetur
        rhoncus, magna risus venenatis ligula, hendrerit aliquet justo justo nec
        purus. Vivamus condimentum tempor maximus. Curabitur sit amet enim
        rutrum, molestie nulla nec, laoreet nunc. Phasellus ut efficitur lectus.
        Vestibulum felis diam, mollis quis sollicitudin eget, pulvinar non
        turpis. Nunc mattis faucibus odio, ornare dictum enim fringilla eget,
        hendrerit aliquet justo justo nec purus. Vivamus condimentum tempor
        maximus. Curabitur sit amet enim rutrum, molestie nulla nec, laoreet
        nunc. Phasellus ut efficitur lectus. Vestibulum felis diam, mollis quis
        sollicitudin eget, pulvinar non turpis. Nunc mattis faucibus odio,
        ornare dictum enim fringilla eget.
      </p>
      <Image
        src="/marca.png"
        width={160}
        className="place-self-center"
        height={160}
        alt="cashcoffee"
      />
    </div>
  );
}
