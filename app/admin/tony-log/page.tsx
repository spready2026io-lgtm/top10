import TonyLogClient from './TonyLogClient';

export const metadata = {
  title: 'Tony Q&A Log',
  robots: { index: false, follow: false },
};

export default function TonyLogPage() {
  return <TonyLogClient />;
}
