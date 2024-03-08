import Image from "next/image";

export default function Home() {
  return (
    <main>
      <h1 className="text-3xl">Avatars</h1>
      <img src="http://localhost:3000/avatars?gender=MALE&key=danielsss" alt="avatar" />
    </main>
  );
}
