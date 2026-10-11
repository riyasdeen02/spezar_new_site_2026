/**
 * Shared title + lead block used by most sections.
 */
export default function SectionHeading({ title, lead, className = "" }) {
  return (
    <div className={`flex flex-col gap-space-xs max-w-2xl ${className}`}>
      <h2 className="text-headline-xl-mobile lg:text-headline-xl font-headline-xl text-on-surface font-semibold tracking-tight">
        {title}
      </h2>
      {lead && (
        <p className="text-body-lg font-body-lg text-on-surface-variant">{lead}</p>
      )}
    </div>
  );
}
