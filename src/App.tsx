import Button from "./components/button";

const App = () => {
  return (
    <main className="min-h-screen w-full bg-neutral-900 text-white flex flex-col gap-12">
      <section className="w-full max-w-screen-md mx-auto px-4 py-12">
        {/* title */}
        <h3 className="text-2xl font-normal tracking-tighter mb-6">
          Recursive Comment Tree:
        </h3>

        <div className="w-full flex items-center gap-6">
          <input className="w-full px-4 py-2 rounded-[1px] bg-neutral-800 border border-neutral-700 focus-visible:outline-none text-sm text-neutral-400" />
          <Button>Comment</Button>
        </div>
      </section>
    </main>
  );
};

export default App;
