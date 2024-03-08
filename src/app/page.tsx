export default function Home() {
  const NEXT_PUBLIC_VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL;
  const url = NEXT_PUBLIC_VERCEL_URL
    ? "https://" + NEXT_PUBLIC_VERCEL_URL
    : "http://localhost:3000";

  return (
    <main>
      <h1 className="text-3xl">Avatars</h1>
      <img src={`${url}/avatars?id=1`} alt="avatar" width={1024} height={1024} />
    </main>
  );
}
