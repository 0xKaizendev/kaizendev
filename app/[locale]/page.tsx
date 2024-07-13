import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations('Index');
  return <div className="">
    {/* Radial gradient for the container to give a faded look */}
    {/* <div className="absolute pointer-events-none inset-0 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 to-neutral-200 py-8">
      Backgrounds
    </p> */}
  </div>
}