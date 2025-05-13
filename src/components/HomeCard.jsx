const HomeCard = (props) => {
  return (
    <div className='absolute top-8 flex flex-col gap-2 left-8 z-10 p-4 w-68 h-78 bg-white shadow-md justify-evenly items-center' >
      <div className="w-64 h-64">
        <img src={`/assets/${props.cover}.jpg`} />
      </div>
      <div>{props.genre}</div>
    </div>
  );
};

export default HomeCard;
