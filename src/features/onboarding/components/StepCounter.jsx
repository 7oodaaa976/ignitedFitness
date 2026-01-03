export default function StepCounter({ current, total }) {
  return (
    <div className="text-gray-300 text-sm">
      {current} / {total}
    </div>
  );
}
