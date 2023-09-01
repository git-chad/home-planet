import StoryTimeline from "./components/story-timeline";

export default function Home() {
  return (
    <main className="w-screen min-h-screen fixed top-0 left-0 flex flex-col justify-center items-center">
      <StoryTimeline/>
    </main>
  );
}
