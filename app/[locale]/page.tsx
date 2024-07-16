import IndexContents from '@/components/content/home/home';
import { useTranslations } from 'next-intl';

export default function Index() {
  const t = useTranslations('Index');
  return <div className="">
  <IndexContents/>
  </div>
}