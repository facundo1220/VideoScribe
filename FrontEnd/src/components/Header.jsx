function header({ content }) {
  return (
    <div className="fixed pt-3 min-w-full bg-[#111827]">
      <nav className=" p-2">
        <div>{content}</div>
      </nav>
    </div >
  );
}

export default header;
