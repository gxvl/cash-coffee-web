export default function ReportCard({
  title,
  items
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="flex flex-col rounded-xl border">
      <div className="flex w-full items-center justify-center rounded-t-xl bg-[#B35326] px-4 py-2">
        <p className="text-[10px] font-semibold text-white">{title}</p>
      </div>
      {items.map((item, index) => (
        <div
          className="flex w-full items-center justify-center border-b border-dashed py-2"
          key={index}
        >
          <p className="text-center text-xs font-semibold text-[#54361A]">
            {item}
          </p>
        </div>
      ))}
    </div>
  );
}
