import { use } from 'react';

interface BookPageProps {
  params: Promise<{ username: number }>;
}

export default function ProfileByUserName({ params }: BookPageProps) {
  const { username } = use(params);
  return (
    <>
      <h1>{username}</h1>
    </>
  );
}
