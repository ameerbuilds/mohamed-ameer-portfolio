export default function Background() {
  return (
    <>
      <div className="fixed inset-0 -z-10 grid-overlay [mask-image:radial-gradient(ellipse_80%_60%_at_50%_10%,black_20%,transparent_75%)]" />
      <div className="fixed inset-0 -z-10 bg-grid-fade" />
    </>
  );
}
