const Loading = (): JSX.Element => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-16 h-16 border-t-4 border-b-4 border-indigo-500 animate-spin"></div>
    </div>
  );
};

export default Loading;
