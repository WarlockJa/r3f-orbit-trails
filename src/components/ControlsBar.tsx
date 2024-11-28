export default function ControlsBar({
  controls,
  setControls,
}: {
  controls: Controls;
  setControls: (newControls: Controls) => void;
}) {
  return (
    <div className="fixed top-0 left-0 right-0 flex gap-4 p-4 z-20">
      <div className="flex flex-col">
        <label htmlFor="nScale">Tail Length: {controls.tailLength}</label>
        <input
          type="range"
          min={10}
          max={60}
          id="nScale"
          value={controls.tailLength}
          onChange={(e) =>
            setControls({
              ...controls,
              tailLength: Number(e.target.value),
            })
          }
        />
      </div>
    </div>
  );
}
