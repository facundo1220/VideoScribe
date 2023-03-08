function header({ content }) {
  return (
    <nav className="pt-3 min-w-full bg-[#111827] p-2 sticky top-0 z-50">
      <div>{content}</div>
    </nav>
  );
}

export default header;
