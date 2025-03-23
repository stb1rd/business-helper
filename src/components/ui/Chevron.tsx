export const Chevron = ({ isOpen, size = 'btn-m' }: { isOpen: boolean; size?: 'btn-sm' | 'btn-m' }) => {
  return (
    <button className={`btn btn-ghost btn-square ${size}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`size-6 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  );
};
